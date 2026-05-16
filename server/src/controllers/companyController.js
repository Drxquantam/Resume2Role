import {
  analyzeCompany,
  deleteCompanyById,
  getCompanies,
  getCompanyById
} from "../services/companyService.js";
import { extractResumeSkills } from "../services/resumeExtractionService.js";

export const createAnalysis = async (req, res, next) => {
  try {
    const { companyName, role, extractedSkills, resumeText, resumeFileName } = req.body;

    if (!companyName?.trim() || !role?.trim()) {
      return res.status(400).json({ message: "Company name and role are required." });
    }

    const analysis = await analyzeCompany({ companyName, role, extractedSkills, resumeText, resumeFileName });
    return res.status(201).json(analysis);
  } catch (error) {
    return next(error);
  }
};

export const extractResume = async (req, res, next) => {
  try {
    const result = await extractResumeSkills(req.file);
    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const listCompanies = async (_req, res, next) => {
  try {
    const companies = await getCompanies();
    return res.json(companies);
  } catch (error) {
    return next(error);
  }
};

export const readCompany = async (req, res, next) => {
  try {
    const company = await getCompanyById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Company analysis not found." });
    }

    return res.json(company);
  } catch (error) {
    return next(error);
  }
};

export const removeCompany = async (req, res, next) => {
  try {
    const deleted = await deleteCompanyById(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Company analysis not found." });
    }

    return res.json({ message: "Company analysis deleted." });
  } catch (error) {
    return next(error);
  }
};
