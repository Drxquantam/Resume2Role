import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  timeout: 30000
});

export const analyzeCompany = async (payload) => {
  const { data } = await api.post("/api/company/analyze", payload, {
    timeout: 60000
  });
  return data;
};

export const extractResumeSkills = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const { data } = await api.post("/api/company/resume/extract", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    timeout: 30000
  });

  return data;
};

export const getCompanies = async () => {
  const { data } = await api.get("/api/company");
  return data;
};

export const getCompany = async (id) => {
  const { data } = await api.get(`/api/company/${id}`);
  return data;
};

export const deleteCompany = async (id) => {
  const { data } = await api.delete(`/api/company/${id}`);
  return data;
};
