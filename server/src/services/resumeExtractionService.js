import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";
import { extractSkillsFromText } from "./skillExtractionService.js";

const getExtension = (filename = "") => filename.split(".").pop()?.toLowerCase() || "";

const extractPdfText = async (buffer) => {
  const parser = new PDFParse({ data: new Uint8Array(buffer) });

  try {
    const result = await parser.getText();
    return result.text || "";
  } finally {
    await parser.destroy();
  }
};

const extractDocxText = async (buffer) => {
  const result = await mammoth.extractRawText({ buffer });
  return result.value || "";
};

const parseSkillJson = (text) => {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    return [];
  }

  try {
    const parsed = JSON.parse(text.slice(start, end + 1));
    return Array.isArray(parsed.skills) ? parsed.skills.filter(Boolean) : [];
  } catch (_error) {
    return [];
  }
};

const extractSkillsWithGemini = async (text) => {
  if (!process.env.GEMINI_API_KEY || !text.trim()) {
    return [];
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Extract technical skills, tools, frameworks, programming languages, databases, cloud platforms, and core CS subjects from this resume text.
Return only JSON like {"skills":["React","Python"]}. Do not include markdown.

Resume text:
${text.slice(0, 12000)}`
              }
            ]
          }
        ],
        generationConfig: {
          response_mime_type: "application/json",
          temperature: 0.2,
          maxOutputTokens: 800
        }
      })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return [];
  }

  const responseText = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("") || "";
  return parseSkillJson(responseText);
};

export const extractResumeSkills = async (file) => {
  if (!file) {
    const error = new Error("Resume file is required.");
    error.statusCode = 400;
    throw error;
  }

  const extension = getExtension(file.originalname);
  let text = "";

  if (extension === "pdf" || file.mimetype === "application/pdf") {
    text = await extractPdfText(file.buffer);
  } else if (extension === "docx" || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    text = await extractDocxText(file.buffer);
  } else if (["txt", "md", "csv"].includes(extension) || file.mimetype?.startsWith("text/")) {
    text = file.buffer.toString("utf8");
  } else {
    const error = new Error("Unsupported resume type. Upload a PDF, DOCX, TXT, MD, or CSV file.");
    error.statusCode = 400;
    throw error;
  }

  if (text.trim().length < 30) {
    const error = new Error("Resume text could not be extracted. If this is a scanned PDF, upload a text-based PDF or DOCX.");
    error.statusCode = 400;
    throw error;
  }

  const keywordSkills = extractSkillsFromText(text);
  const aiSkills = await extractSkillsWithGemini(text);
  const extractedSkills = Array.from(new Set([...keywordSkills, ...aiSkills])).slice(0, 24);

  return {
    extractedSkills,
    resumeFileName: file.originalname,
    textLength: text.length
  };
};
