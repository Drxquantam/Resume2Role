export const skillKeywords = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Redux",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "SQL",
  "Python",
  "Java",
  "C++",
  "Git",
  "REST APIs",
  "GraphQL",
  "Docker",
  "Linux",
  "AWS",
  "Testing",
  "Accessibility",
  "Data visualization",
  "Excel",
  "Communication",
  "Problem solving",
  "Machine Learning",
  "Deep Learning",
  "Artificial Intelligence",
  "Pandas",
  "NumPy",
  "SciPy",
  "Scikit-learn",
  "TensorFlow",
  "PyTorch",
  "Keras",
  "OpenCV",
  "NLP",
  "LLM",
  "Flask",
  "Django",
  "Spring Boot",
  "C",
  "C#",
  "R",
  "MATLAB",
  "Go",
  "Rust",
  "PHP",
  "Laravel",
  "Angular",
  "Vue",
  "PostgreSQL",
  "MySQL",
  "SQLite",
  "Oracle",
  "Redis",
  "Tailwind",
  "Bootstrap",
  "Firebase",
  "Azure",
  "Google Cloud",
  "Kubernetes",
  "Jenkins",
  "CI/CD",
  "Power BI",
  "Tableau",
  "Figma",
  "Jira",
  "Agile",
  "Scrum",
  "Data Structures",
  "Algorithms",
  "Object Oriented Programming",
  "OOP",
  "DBMS",
  "Operating Systems",
  "Computer Networks",
  "Quantitative Analysis",
  "Statistics",
  "Probability"
];

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const normalizeForMatching = (value) =>
  value
    .toLowerCase()
    .replace(/node\.js/g, "nodejs")
    .replace(/next\.js/g, "nextjs")
    .replace(/c\+\+/g, "cplusplus")
    .replace(/c#/g, "csharp")
    .replace(/ci\/cd/g, "cicd");

export const extractSkillsFromText = (text = "") => {
  const normalizedText = normalizeForMatching(text);

  return skillKeywords.filter((skill) => {
    const normalizedSkill = normalizeForMatching(skill);
    const skillPattern = new RegExp(`(^|[^a-z0-9+#])${escapeRegExp(normalizedSkill)}([^a-z0-9+#]|$)`);
    return skillPattern.test(normalizedText);
  });
};
