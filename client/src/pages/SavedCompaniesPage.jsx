import { Calendar, ExternalLink, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../components/Badge.jsx";
import Button from "../components/Button.jsx";
import GlassCard from "../components/GlassCard.jsx";
import LoadingSkeleton from "../components/LoadingSkeleton.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { deleteCompany, getCompanies } from "../services/api.js";

const SavedCompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getCompanies();
      setCompanies(result);
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to load saved companies. Start the backend and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    await deleteCompany(id);
    setCompanies((current) => current.filter((company) => (company.id || company._id) !== id));
  };

  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Saved"
        title="Saved company research"
        description="Review previously generated analyses and jump back into preparation."
      />

      {loading ? <LoadingSkeleton /> : null}

      {error && !loading ? (
        <GlassCard>
          <p className="text-red-100">{error}</p>
          <Link to="/analyze" className="mt-5 inline-block">
            <Button>Analyze a Company</Button>
          </Link>
        </GlassCard>
      ) : null}

      {!loading && !error && companies.length === 0 ? (
        <GlassCard>
          <p className="text-slate-300">No saved company analyses yet.</p>
          <Link to="/analyze" className="mt-5 inline-block">
            <Button>Start Research</Button>
          </Link>
        </GlassCard>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => {
          const id = company.id || company._id;
          return (
            <GlassCard key={id} className="flex flex-col">
              <Badge tone="mint">{company.role}</Badge>
              <h2 className="mt-4 text-2xl font-bold text-white">{company.companyName}</h2>
              <p className="mt-3 line-clamp-4 flex-1 text-sm leading-6 text-slate-300">{company.overview}</p>
              <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="h-4 w-4" />
                {company.createdAt ? new Date(company.createdAt).toLocaleDateString() : "Demo date"}
              </div>
              <div className="mt-5 flex gap-2">
                <Link to={`/dashboard/${id}`} className="flex-1">
                  <Button variant="secondary" icon={ExternalLink} className="w-full">
                    Open
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  icon={Trash2}
                  aria-label={`Delete ${company.companyName}`}
                  onClick={() => remove(id)}
                  className="px-3"
                />
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};

export default SavedCompaniesPage;
