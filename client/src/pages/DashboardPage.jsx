import {
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  ExternalLink,
  Factory,
  Flag,
  Layers3,
  Lightbulb,
  Newspaper,
  Save,
  Sparkles,
  Target,
  Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Badge from "../components/Badge.jsx";
import Button from "../components/Button.jsx";
import GlassCard from "../components/GlassCard.jsx";
import LoadingSkeleton from "../components/LoadingSkeleton.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import { demoAnalysis } from "../data/demoAnalysis.js";
import { getCompany } from "../services/api.js";

const DashboardPage = () => {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");

      if (id === "demo") {
        setAnalysis(demoAnalysis);
        setLoading(false);
        return;
      }

      try {
        const result = await getCompany(id);
        setAnalysis(result);
      } catch (apiError) {
        setError(apiError.response?.data?.message || "Unable to load this dashboard.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <GlassCard>
        <p className="text-red-100">{error}</p>
        <Link to="/analyze" className="mt-5 inline-block">
          <Button>Generate New Analysis</Button>
        </Link>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-8">
      <GlassCard className="overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="mint">{analysis.role}</Badge>
              <Badge tone={analysis.generationSource === "groq" ? "sky" : "amber"}>
                {analysis.generationSource === "groq" ? `AI generated: ${analysis.generatedBy}` : "Demo fallback"}
              </Badge>
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-white md:text-5xl">{analysis.companyName}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{analysis.overview}</p>
            {analysis.fallbackReason ? (
              <p className="mt-3 max-w-3xl rounded-xl border border-amber-300/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                AI fallback reason: {analysis.fallbackReason}
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button icon={Save}>Save company</Button>
              <Link to="/saved">
                <Button variant="secondary" icon={ExternalLink}>
                  View saved
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/7 p-5">
            <div className="mb-6 flex items-center gap-3">
              <Target className="h-6 w-6 text-emerald-200" />
              <div>
                <p className="text-sm text-slate-400">Resume fit</p>
                <p className="text-xl font-bold text-white">{analysis.fitScore}% ready</p>
              </div>
            </div>
            <ProgressBar value={analysis.fitScore} />
            <div className="mt-5 flex flex-wrap gap-2">
              {analysis.missingSkills?.map((skill) => (
                <Badge key={skill} tone="amber">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-5 lg:grid-cols-2">
        <TextCard icon={Factory} title="What the company does" text={analysis.whatCompanyDoes} />
        <TextCard icon={Lightbulb} title="Why it was founded" text={analysis.founderStory} />
        <TextCard icon={Flag} title="Mission or motto" text={analysis.missionOrMotto} />
        <TextCard icon={Users} title="Employee review summary" text={analysis.reviewSummary} />
        <ListCard icon={Layers3} title="Products" items={analysis.products} />
        <ListCard icon={BriefcaseBusiness} title="Services" items={analysis.services} />
        <ListCard icon={CheckCircle2} title="Skills extracted from resume" items={analysis.extractedSkills} badgeTone="mint" />
        <ListCard icon={Code2} title="Required technical skills" items={analysis.requiredSkills} badgeTone="sky" />
        <ListCard icon={Sparkles} title="Suggested projects" items={analysis.suggestedProjects} badgeTone="mint" />
        <ListCard icon={Target} title="Online assessment patterns" items={analysis.onlineAssessment} badgeTone="amber" />
        <ListCard icon={Users} title="Interview question types" items={analysis.interviewQuestionTypes} />
        <ListCard icon={CheckCircle2} title="Interview preparation topics" items={analysis.interviewTopics} />
        <ListCard icon={Newspaper} title="Recent news and research prompts" items={analysis.recentNews} badgeTone="amber" />
      </div>
    </div>
  );
};

const CardTitle = ({ icon: Icon, title }) => (
  <div className="mb-4 flex items-center gap-3">
    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-sky-100">
      <Icon className="h-5 w-5" />
    </span>
    <h2 className="text-lg font-bold text-white">{title}</h2>
  </div>
);

const TextCard = ({ icon, title, text }) => (
  <GlassCard>
    <CardTitle icon={icon} title={title} />
    <p className="leading-7 text-slate-300">{text || "No details available yet."}</p>
  </GlassCard>
);

const ListCard = ({ icon, title, items = [], badgeTone = "slate" }) => (
  <GlassCard>
    <CardTitle icon={icon} title={title} />
    {items.length ? (
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge key={item} tone={badgeTone}>
            {item}
          </Badge>
        ))}
      </div>
    ) : (
      <p className="text-sm leading-6 text-slate-400">No items found yet.</p>
    )}
  </GlassCard>
);

export default DashboardPage;
