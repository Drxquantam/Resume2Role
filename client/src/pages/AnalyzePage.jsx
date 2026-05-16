import { FileText, Sparkles, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import GlassCard from "../components/GlassCard.jsx";
import LoadingSkeleton from "../components/LoadingSkeleton.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import Badge from "../components/Badge.jsx";
import { analyzeCompany, extractResumeSkills } from "../services/api.js";

const AnalyzePage = () => {
  const navigate = useNavigate();
  const resumeInputRef = useRef(null);
  const [form, setForm] = useState({ companyName: "", role: "", extractedSkills: [], resumeFileName: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resumeStatus, setResumeStatus] = useState("");

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const uploadResume = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setResumeStatus("Reading resume...");

    try {
      const result = await extractResumeSkills(file);
      const extractedSkills = result.extractedSkills || [];

      setForm((current) => ({
        ...current,
        extractedSkills,
        resumeFileName: result.resumeFileName || file.name
      }));
      setResumeStatus(
        extractedSkills.length
          ? `${extractedSkills.length} skills extracted.`
          : "Resume parsed, but no known skills were detected yet."
      );
    } catch (fileError) {
      setForm((current) => ({
        ...current,
        extractedSkills: [],
        resumeFileName: file.name
      }));
      setResumeStatus(fileError.response?.data?.message || "Resume selected, but text could not be read from this file.");
    }
  };

  const removeResume = () => {
    if (resumeInputRef.current) {
      resumeInputRef.current.value = "";
    }

    setForm((current) => ({
      ...current,
      extractedSkills: [],
      resumeFileName: ""
    }));
    setResumeStatus("");
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await analyzeCompany(form);
      navigate(`/dashboard/${result.id || result._id}`);
    } catch (apiError) {
      if (apiError.code === "ECONNABORTED") {
        setError("Analysis took too long. Gemini may be slow right now; try again in a moment.");
      } else if (apiError.response?.data?.message) {
        setError(apiError.response.data.message);
      } else if (apiError.request) {
        setError("Cannot reach the backend API. Check VITE_API_URL, CLIENT_URL, and the backend port.");
      } else {
        setError(apiError.message || "Unable to generate analysis.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <SectionTitle
        eyebrow="Analyze"
        title="Generate a company research dashboard"
        description="Enter your target company and role. Resume2Role will save the result and take you straight to the dashboard."
      />

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <GlassCard>
          <form className="space-y-5" onSubmit={submit}>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="companyName">
                Company name
              </label>
              <input
                id="companyName"
                name="companyName"
                value={form.companyName}
                onChange={updateField}
                placeholder="Google, Infosys, TCS..."
                className="w-full rounded-xl border border-white/12 bg-white/8 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="role">
                Job role
              </label>
              <input
                id="role"
                name="role"
                value={form.role}
                onChange={updateField}
                placeholder="Software Engineer, Data Analyst..."
                className="w-full rounded-xl border border-white/12 bg-white/8 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="resume">
                Upload resume
              </label>
              <label className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/8 px-5 py-6 text-center transition hover:border-sky-300 hover:bg-white/10">
                <Upload className="mb-3 h-8 w-8 text-sky-200" />
                <span className="font-semibold text-white">
                  {form.resumeFileName || "Choose resume file"}
                </span>
                <span className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                  Upload a PDF, DOCX, or text resume. Resume2Role will extract skills automatically for the fit score.
                </span>
                <input
                  ref={resumeInputRef}
                  id="resume"
                  type="file"
                  accept=".txt,.md,.pdf,.doc,.docx"
                  className="sr-only"
                  onChange={uploadResume}
                />
              </label>
              {form.resumeFileName ? (
                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-2 rounded-lg border border-red-300/25 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-500/15"
                  onClick={removeResume}
                >
                  <Trash2 className="h-4 w-4" />
                  Remove resume
                </button>
              ) : null}
              {resumeStatus ? (
                <p className="mt-3 flex items-center gap-2 text-sm text-slate-300">
                  <FileText className="h-4 w-4 text-emerald-200" />
                  {resumeStatus}
                </p>
              ) : null}
              {form.extractedSkills.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {form.extractedSkills.map((skill) => (
                    <Badge key={skill} tone="mint">
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>

            {error ? <p className="rounded-xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p> : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" loading={loading} icon={Sparkles} className="w-full sm:w-auto">
                Analyze Company
              </Button>
            </div>
          </form>
        </GlassCard>

        <div>{loading ? <LoadingSkeleton /> : <PreviewPanel />}</div>
      </div>
    </div>
  );
};

const PreviewPanel = () => (
  <div className="grid gap-5">
    {[
      "Company overview and business model",
      "Role requirements and technical skills",
      "Suggested projects and interview topics",
      "Resume skill extraction, missing skills, and fit score"
    ].map((item, index) => (
      <GlassCard key={item} className="flex items-center gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-sm font-bold text-sky-100">
          {index + 1}
        </span>
        <p className="font-medium text-slate-100">{item}</p>
      </GlassCard>
    ))}
  </div>
);

export default AnalyzePage;
