import {
  Building2,
  MessageSquareText,
  Newspaper,
  Network,
  Search,
  Sparkles,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";
import Badge from "../components/Badge.jsx";
import Button from "../components/Button.jsx";
import CompanyLogoMarquee from "../components/CompanyLogoMarquee.jsx";
import GlassCard from "../components/GlassCard.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

const features = [
  { title: "Company Insights", icon: Building2, copy: "Understand the business, products, and market context before applying." },
  { title: "Role-Based Skill Analysis", icon: Target, copy: "Map your target role to the skills interviewers are likely to test." },
  { title: "Interview Preparation", icon: MessageSquareText, copy: "Get focused topics for technical, behavioral, and project rounds." },
  { title: "Employee Review Summary", icon: Sparkles, copy: "Review culture signals and expectations in one concise summary." },
  { title: "Recent News", icon: Newspaper, copy: "Track a placeholder-ready news section for future API integrations." },
  { title: "System Design Architecture", icon: Network, copy: "Explore how the platform is structured for scale and AI upgrades." }
];

const LandingPage = () => (
  <div className="space-y-24">
    <section className="grid min-h-[calc(100vh-140px)] items-center gap-12 py-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <Badge tone="mint">AI research workspace for students</Badge>
        <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
          Resume2Role
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-200">
          Research companies smarter before you apply.
        </p>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
          Turn a company name and job role into a focused interview dashboard with skill gaps, project ideas, culture signals, and preparation topics.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/analyze">
            <Button icon={Search} className="w-full sm:w-auto">
              Start Research
            </Button>
          </Link>
        </div>
      </div>

      <GlassCard className="relative overflow-hidden p-0">
        <div className="border-b border-white/10 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Live analysis preview</p>
              <h2 className="text-xl font-bold text-white">Placement Readiness</h2>
            </div>
            <Badge>Demo</Badge>
          </div>
        </div>
        <div className="space-y-5 p-6">
          {["Company overview", "Required skills", "Interview topics", "Resume fit"].map((item, index) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/7 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold text-white">{item}</span>
                <span className="text-xs text-slate-400">{86 - index * 7}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-sky-300" style={{ width: `${86 - index * 7}%` }} />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>

    <CompanyLogoMarquee />

    <section>
      <SectionTitle
        eyebrow="Platform features"
        title="A research dashboard that feels ready for real placement prep"
        description="Every section is designed to help students move from vague company research to a targeted preparation plan."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <GlassCard key={feature.title} className="group">
            <feature.icon className="mb-5 h-8 w-8 text-sky-200 transition group-hover:scale-110" />
            <h3 className="text-lg font-bold text-white">{feature.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{feature.copy}</p>
          </GlassCard>
        ))}
      </div>
    </section>

    <section className="flex justify-center pb-10">
      <p className="typing-signature">Built by - Dhruv Rai</p>
    </section>
  </div>
);

export default LandingPage;
