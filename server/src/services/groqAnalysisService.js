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
  products: analysis.products?.slice(0, 5) || [],
  services: analysis.services?.slice(0, 5) || [],
  requiredSkills: analysis.requiredSkills?.slice(0, 8) || [],
  suggestedProjects: analysis.suggestedProjects?.slice(0, 5) || [],
  interviewTopics: analysis.interviewTopics?.slice(0, 8) || [],
  onlineAssessment: analysis.onlineAssessment?.slice(0, 6) || [],
  interviewQuestionTypes: analysis.interviewQuestionTypes?.slice(0, 8) || [],
  recentNews: analysis.recentNews?.slice(0, 4) || [],
  missingSkills: analysis.missingSkills?.slice(0, 5) || [],
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
  const prompt = `Create a concise preparation dashboard.

Company: ${payload.companyName}
Target role: ${payload.role}
Resume skills extracted: ${extractedSkills}

Requirements:
- Make the company overview specific to this company, not generic.
- Explain what the company actually does in simple language with 3 to 5 sentences.
- Explain why the founder or founding team started the company; if uncertain, say what public company history suggests.
- Include the company mission, motto, or practical purpose in simple words.
- Recommend role-specific skills and interview topics.
- Include online assessment patterns and interview question types students should expect for this company/role.
- Compare extracted resume skills with role requirements.
- Keep overview, whatCompanyDoes, founderStory, missionOrMotto, and reviewSummary under 90 words each.
- Arrays must contain 3 to 5 short items.
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
            "You generate company and role preparation dashboards for students. Be specific to the company and role. Avoid generic template language. If public facts are uncertain, say so briefly instead of inventing exact news. Always return valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.4,
      max_tokens: 4096
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
