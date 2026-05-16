import { Bot, Boxes, Cloud, Database, Layers, Repeat, Server, Zap } from "lucide-react";
import GlassCard from "../components/GlassCard.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

const pipeline = [
  { label: "Frontend", icon: Cloud },
  { label: "API Gateway", icon: Server },
  { label: "Company Service", icon: Boxes },
  { label: "AI Summarization Service", icon: Bot },
  { label: "MongoDB", icon: Database },
  { label: "Cache Layer", icon: Zap },
  { label: "Background Worker", icon: Repeat }
];

const explanations = [
  { title: "Caching", copy: "Cache repeated company lookups, role templates, and news responses to reduce latency and external API cost." },
  { title: "Async Processing", copy: "Long-running web search, resume parsing, and AI summarization can move to a queue-backed worker." },
  { title: "Database Design", copy: "CompanyAnalysis stores generated results with timestamps, role context, skills, and placeholders for future enrichment." },
  { title: "API Layer", copy: "Express routes keep request validation, controller logic, and service orchestration separated for maintainability." },
  { title: "Scalability", copy: "The app can evolve toward stateless API instances, shared MongoDB, distributed cache, and background jobs." },
  { title: "AI Integration", copy: "The analysis service can use Gemini, search APIs, embeddings, and resume scoring pipelines for richer preparation dashboards." }
];

const SystemArchitecturePage = () => (
  <div className="space-y-10">
    <SectionTitle
      eyebrow="System design"
      title="Resume2Role architecture"
      description="A modular flow designed for a MERN MVP today and AI-powered enrichment later."
    />

    <GlassCard>
      <div className="grid gap-4 lg:grid-cols-7">
        {pipeline.map((step, index) => (
          <div key={step.label} className="relative">
            <div className="flex h-full flex-col items-center justify-center rounded-xl border border-white/10 bg-white/7 p-5 text-center">
              <step.icon className="mb-3 h-7 w-7 text-sky-200" />
              <p className="text-sm font-bold text-white">{step.label}</p>
            </div>
            {index < pipeline.length - 1 ? (
              <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-sky-200/50 lg:block" />
            ) : null}
          </div>
        ))}
      </div>
    </GlassCard>

    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {explanations.map((item) => (
        <GlassCard key={item.title}>
          <Layers className="mb-4 h-7 w-7 text-emerald-200" />
          <h2 className="text-lg font-bold text-white">{item.title}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">{item.copy}</p>
        </GlassCard>
      ))}
    </div>
  </div>
);

export default SystemArchitecturePage;
