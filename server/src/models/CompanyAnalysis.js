import mongoose from "mongoose";

const companyAnalysisSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    overview: {
      type: String,
      required: true
    },
    whatCompanyDoes: {
      type: String,
      required: true
    },
    founderStory: {
      type: String,
      default: ""
    },
    missionOrMotto: {
      type: String,
      default: ""
    },
    products: {
      type: [String],
      default: []
    },
    services: {
      type: [String],
      default: []
    },
    requiredSkills: {
      type: [String],
      default: []
    },
    suggestedProjects: {
      type: [String],
      default: []
    },
    interviewTopics: {
      type: [String],
      default: []
    },
    onlineAssessment: {
      type: [String],
      default: []
    },
    interviewQuestionTypes: {
      type: [String],
      default: []
    },
    reviewSummary: {
      type: String,
      default: ""
    },
    recentNews: {
      type: [String],
      default: []
    },
    fitScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 72
    },
    missingSkills: {
      type: [String],
      default: []
    },
    extractedSkills: {
      type: [String],
      default: []
    },
    resumeFileName: {
      type: String,
      default: ""
    },
    generationSource: {
      type: String,
      enum: ["groq", "demo"],
      default: "demo"
    },
    generatedBy: {
      type: String,
      default: ""
    },
    fallbackReason: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: true }
  }
);

const CompanyAnalysis = mongoose.model("CompanyAnalysis", companyAnalysisSchema);

export default CompanyAnalysis;
