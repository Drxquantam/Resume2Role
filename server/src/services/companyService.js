import crypto from "crypto";
import { isDatabaseConnected } from "../config/db.js";
import CompanyAnalysis from "../models/CompanyAnalysis.js";
import { generateGroqAnalysis } from "./groqAnalysisService.js";
import { generateMockAnalysis } from "./mockAnalysisService.js";

const memoryStore = new Map();

const toClientShape = (record) => {
  const raw = record.toObject ? record.toObject() : record;
  return {
    ...raw,
    id: raw._id?.toString?.() || raw.id,
    _id: raw._id?.toString?.() || raw.id
  };
};

export const analyzeCompany = async (payload) => {
  let analysis;

  try {
    analysis = await generateGroqAnalysis(payload);
  } catch (error) {
    if (process.env.ALLOW_DEMO_FALLBACK === "true") {
      console.error("Groq analysis failed. Falling back to demo analysis:", error.message);
      analysis = generateMockAnalysis(payload, error.message);
    } else {
      throw error;
    }
  }

  if (isDatabaseConnected()) {
    const created = await CompanyAnalysis.create(analysis);
    return toClientShape(created);
  }

  const id = crypto.randomUUID();
  const record = {
    ...analysis,
    id,
    _id: id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  memoryStore.set(id, record);
  return record;
};

export const getCompanies = async () => {
  if (isDatabaseConnected()) {
    const companies = await CompanyAnalysis.find().sort({ createdAt: -1 });
    return companies.map(toClientShape);
  }

  return Array.from(memoryStore.values()).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getCompanyById = async (id) => {
  if (isDatabaseConnected()) {
    const company = await CompanyAnalysis.findById(id);
    return company ? toClientShape(company) : null;
  }

  return memoryStore.get(id) || null;
};

export const deleteCompanyById = async (id) => {
  if (isDatabaseConnected()) {
    return CompanyAnalysis.findByIdAndDelete(id);
  }

  const existing = memoryStore.get(id);
  memoryStore.delete(id);
  return existing;
};
