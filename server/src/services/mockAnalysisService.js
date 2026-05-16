import { extractSkillsFromText } from "./skillExtractionService.js";

const normalize = (value) => value.trim().replace(/\s+/g, " ");

const roleSkillMap = {
  frontend: ["React", "JavaScript", "TypeScript", "CSS architecture", "Accessibility", "State management"],
  backend: ["Node.js", "Express", "REST APIs", "MongoDB", "Authentication", "System design"],
  fullstack: ["React", "Node.js", "MongoDB", "API design", "Deployment", "Testing"],
  data: ["SQL", "Python", "Statistics", "Dashboards", "Data cleaning", "Business metrics"],
  analyst: ["SQL", "Excel", "Storytelling", "Data visualization", "Problem solving", "Stakeholder communication"],
  devops: ["Linux", "Docker", "CI/CD", "Cloud fundamentals", "Monitoring", "Networking"]
};

const inferSkills = (role) => {
  const lowerRole = role.toLowerCase();
  const match = Object.entries(roleSkillMap).find(([key]) => lowerRole.includes(key));
  return match ? match[1] : ["Problem solving", "Communication", "Core CS fundamentals", "Project ownership", "Analytical thinking"];
};

export const generateMockAnalysis = ({ companyName, role, extractedSkills = [], resumeText = "", resumeFileName = "" }, fallbackReason = "") => {
  const cleanCompany = normalize(companyName);
  const cleanRole = normalize(role);
  const baseSkills = inferSkills(cleanRole);
  const userSkills = extractedSkills.length ? extractedSkills : extractSkillsFromText(resumeText);

  const requiredSkills = Array.from(new Set([...baseSkills, "Git", "Interview communication"]));
  const missingSkills = requiredSkills
    .filter((skill) => !userSkills.some((entry) => entry.toLowerCase().includes(skill.toLowerCase())))
    .slice(0, 4);

  const fitScore = Math.min(94, Math.max(58, 64 + userSkills.length * 5 + Math.floor(cleanCompany.length % 9)));

  return {
    companyName: cleanCompany,
    role: cleanRole,
    overview: `${cleanCompany} is profiled as a high-growth organization with multiple business lines, cross-functional teams, and a strong emphasis on measurable product impact. This analysis is generated in demo mode and is designed to help students structure their preparation before applying.`,
    whatCompanyDoes: `${cleanCompany} works across technology, operations, data, and user experience to deliver useful products or services. In simple terms, the company solves business problems by building systems, serving customers, and improving workflows. For a ${cleanRole} role, expect interviewers to check whether you understand both the technical work and the business value behind it.`,
    founderStory: `${cleanCompany}'s exact founding motivation should be verified from official sources, but most companies begin by spotting a customer problem, market gap, or technology opportunity that existing solutions did not handle well.`,
    missionOrMotto: `${cleanCompany}'s practical mission can be understood as creating reliable value for customers while growing teams, products, and services in a sustainable way.`,
    products: [
      `${cleanCompany} digital platform`,
      "Customer analytics and engagement tools",
      "Mobile and web product experiences",
      "Internal productivity systems"
    ],
    services: [
      "Technology consulting and implementation",
      "Customer support and success operations",
      "Data-driven business optimization",
      "Cloud-enabled product delivery"
    ],
    requiredSkills,
    suggestedProjects: [
      `Build a ${cleanRole} portfolio project that solves a measurable user problem`,
      "Create a dashboard that tracks funnel, usage, or operational metrics",
      "Document one project with architecture, tradeoffs, testing, and deployment notes"
    ],
    interviewTopics: [
      "Company mission, products, and competitors",
      `${cleanRole} fundamentals and practical project discussion`,
      "Behavioral questions using STAR format",
      "Problem-solving under constraints",
      "System design or workflow design at role-appropriate depth"
    ],
    onlineAssessment: [
      "Aptitude or logical reasoning questions",
      "Role-specific coding or case questions",
      "Communication and work-style screening"
    ],
    interviewQuestionTypes: [
      "Resume and project deep dive",
      "Technical fundamentals for the target role",
      "Scenario-based problem solving",
      "Behavioral questions about teamwork and ownership"
    ],
    reviewSummary: `Employees commonly value learning opportunities, fast-paced execution, and ownership. Preparation should include examples of adaptability, collaboration, and handling ambiguous requirements.`,
    recentNews: [
      "Demo news placeholder: product expansion and hiring updates",
      "Demo news placeholder: partnerships, funding, or quarterly performance",
      "Demo news placeholder: leadership, market, or technology initiatives"
    ],
    fitScore,
    missingSkills,
    extractedSkills: userSkills,
    resumeFileName,
    generationSource: "demo",
    generatedBy: "Mock analysis fallback",
    fallbackReason
  };
};
