const normalizeText = (value) => String(value || "").trim();

const getBalancedJsonObject = (text) => {
  const start = text.indexOf("{");

  if (start === -1) {
    return "";
  }

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = start; index < text.length; index += 1) {
    const char = text[index];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      continue;
    }

    if (char === "\"") {
      inString = !inString;
      continue;
    }

    if (inString) {
      continue;
    }

    if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;

      if (depth === 0) {
        return text.slice(start, index + 1);
      }
    }
  }

  return "";
};

const parseGroqJson = (data) => {
  const responseText = data.choices?.[0]?.message?.content?.trim() || "";

  if (!responseText) {
    throw new Error("Groq returned no text.");
  }

  const jsonObject = getBalancedJsonObject(responseText);

  if (!jsonObject) {
    throw new Error(`Groq returned incomplete JSON. Response started with: ${responseText.slice(0, 160)}`);
  }

  try {
    return JSON.parse(jsonObject);
  } catch (_error) {
    throw new Error(`Groq returned invalid JSON. Response started with: ${responseText.slice(0, 160)}`);
  }
};

const cleanAnalysis = (analysis, payload) => ({
  ...analysis,
  companyName: normalizeText(analysis.companyName) || payload.companyName,
  role: normalizeText(analysis.role) || payload.role,
  founderStory: normalizeText(analysis.founderStory),
  missionOrMotto: normalizeText(analysis.missionOrMotto),
  products: analysis.products?.slice(0, 7) || [],
  services: analysis.services?.slice(0, 7) || [],
  requiredSkills: analysis.requiredSkills?.slice(0, 10) || [],
  suggestedProjects: analysis.suggestedProjects?.slice(0, 7) || [],
  interviewTopics: analysis.interviewTopics?.slice(0, 10) || [],
  onlineAssessment: analysis.onlineAssessment?.slice(0, 8) || [],
  interviewQuestionTypes: analysis.interviewQuestionTypes?.slice(0, 10) || [],
  recentNews: analysis.recentNews?.slice(0, 6) || [],
  missingSkills: analysis.missingSkills?.slice(0, 7) || [],
  fitScore: Math.min(100, Math.max(0, Math.round(Number(analysis.fitScore) || 70))),
  extractedSkills: payload.extractedSkills || [],
  resumeFileName: payload.resumeFileName || "",
  generationSource: "groq",
  generatedBy: process.env.GROQ_MODEL || "llama-3.3-70b-versatile"
});

export const generateGroqAnalysis = async (payload) => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    const error = new Error("GROQ_API_KEY is not configured. Add it to server/.env and restart the backend.");
    error.statusCode = 503;
    throw error;
  }

  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
  const extractedSkills = payload.extractedSkills?.length ? payload.extractedSkills.join(", ") : "No resume skills extracted";
  const prompt = `Create a detailed but easy-to-understand placement preparation dashboard.

Company: ${payload.companyName}
Target role: ${payload.role}
Resume skills extracted: ${extractedSkills}

Requirements:
- Write for students who may not know business jargon.
- Make the company overview specific to this company, not generic. Use 3 to 4 simple sentences.
- Explain what the company actually does in simple language with 5 to 7 useful sentences. Mention customers/users, main products/services, and how it makes money or creates value.
- Explain why the founder or founding team started the company in 3 to 5 simple sentences. If uncertain, say what public company history suggests instead of pretending.
- Explain the company mission, motto, or practical purpose in 3 to 4 simple sentences.
- Employee review summary should explain work culture, learning, pressure, management, and what students should be ready for in 4 to 6 simple sentences.
- Recommend role-specific skills and interview topics based on the target role.
- Include online assessment patterns and interview question types students should expect for this company/role.
- Compare extracted resume skills with role requirements and calculate fitScore realistically.
- Arrays must contain 5 to 8 short but useful items.
- recentNews can include broad public developments or research prompts, but must not fabricate exact dates or fake headlines.

Return only valid JSON with exactly these keys:
companyName, role, overview, whatCompanyDoes, founderStory, missionOrMotto, products, services, requiredSkills, suggestedProjects, interviewTopics, onlineAssessment, interviewQuestionTypes, reviewSummary, recentNews, fitScore, missingSkills.
Array fields must be arrays of strings. fitScore must be a number from 0 to 100.`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "You generate detailed, student-friendly company and role preparation dashboards. Use simple language, explain ideas clearly, and avoid tiny one-line answers. Be specific to the company and role. Avoid generic template language. If public facts are uncertain, say so briefly instead of inventing exact news. Always return valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.4,
      max_tokens: 6000
    })
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error?.message || "Groq analysis failed.");
    error.statusCode = response.status;
    throw error;
  }

  return cleanAnalysis(parseGroqJson(data), payload);
};
