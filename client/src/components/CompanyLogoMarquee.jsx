const companies = [
  { name: "Google", logo: "google" },
  { name: "Microsoft", logo: "microsoft" },
  { name: "Amazon", logo: "amazon" },
  { name: "Meta", logo: "meta" },
  { name: "Netflix", logo: "netflix" },
  { name: "Adobe", logo: "adobe" },
  { name: "Salesforce", logo: "salesforce" },
  { name: "IBM", logo: "ibm" },
  { name: "Infosys", logo: "infosys" },
  { name: "TCS", logo: "tcs" },
  { name: "HCL", logo: "hcl"},
  { name: "Jane Street", logo: "janestreet"},
  { name: "Stripe", logo: "stripe"},
  { name: "Quadeye", logo: "quadeye"},
  { name: "JP Morgan", logo: "jpmorgan"},
  { name: "Goldman Sachs", logo: "goldman"},
  { name: "Cisco", logo: "cisco"},
  { name: "Intuit", logo: "intuit"},
  { name: "De Shaw", logo: "deshaw"},
  { name: "Uber", logo: "uber"},
  { name: "ByteDance", logo: "bytedance"}
];

const LogoMark = ({ type }) => {
  const commonText = {
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: 800,
    dominantBaseline: "middle"
  };

  const logos = {
    google: (
      <img src="/logos/google.png" alt="Google" />
    ),
    microsoft: (
      <svg viewBox="0 0 190 48" aria-hidden="true">
        <rect x="0" y="8" width="15" height="15" fill="#f25022" />
        <rect x="18" y="8" width="15" height="15" fill="#7fba00" />
        <rect x="0" y="26" width="15" height="15" fill="#00a4ef" />
        <rect x="18" y="26" width="15" height="15" fill="#ffb900" />
        <text x="45" y="25" fontSize="23" {...commonText} fill="#f8fafc">Microsoft</text>
      </svg>
    ),
    amazon: (
      <img src="/logos/amazon.png"  alt="Amazon" />
    ),
   meta: (
  <img src="/logos/meta.png" alt="Meta" />
),
    netflix: (
  <img src="/logos/netflix.png" alt="Netflix" />
),
    adobe: (
      <img src= "/logos/adobe.png" alt="Adobe" />
    ),
    salesforce: (
      <img src="/logos/salesforce.png" alt="Salesforce" />
    ),
    ibm: (
      <svg viewBox="0 0 110 48" aria-hidden="true">
        <text x="0" y="25" fontSize="31" {...commonText} fill="#8ab4f8" letterSpacing="2">IBM</text>
        {[12, 18, 24, 30].map((y) => <line key={y} x1="0" x2="70" y1={y} y2={y} stroke="#07111f" strokeWidth="2" opacity="0.75" />)}
      </svg>
    ),
    infosys: (
      <svg viewBox="0 0 145 48" aria-hidden="true">
        <text x="0" y="25" fontSize="29" {...commonText} fill="#00a3e0">Infosys</text>
      </svg>
    ),
    tcs: (
     <img src= "/logos/tcs.png" alt="TCS" />
    ),
    hcl: (
      <img src="/logos/hcl.png" alt="HCL" />
    ),
    janestreet: (
      <img src="/logos/janestreet.png"  alt="Jane Street" />
    ),
    stripe: (
      <img src="/logos/stripe.png" alt="Stripe" />
    ),
    quadeye: (
      <img src="/logos/quadeye.png" alt="Quadeye" />
    ),
    jpmorgan: (
      <img src ="/logos/jpmorgan.png" alt="JP Morgan" />
    ),
    goldman: (
      <img src="/logos/goldman.png" alt="Goldman Sachs" />
    ),
     cisco: (
      <img src="/logos/cisco.png" alt="Cisco" />
    ),
     deshaw: (
      <img src="/logos/deshaw.png" alt="De Shaw" />
    ),
     intuit: (
      <img src="/logos/intuit.png" alt="Intuit" />
    ),
     uber: (
      <img src="/logos/uber.png" alt="Uber" />
    ),
     bytedance: (
      <img src="/logos/bytedance.png" alt="ByteDance" />
    ),
  };

  return logos[type];
};

const CompanyLogoMarquee = () => {
  const repeatedCompanies = [...companies, ...companies];

  return (
    <section className="overflow-hidden py-5">
      <div className="mb-4 flex items-center justify-between px-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-200">Research top hiring companies</p>
      </div>
      <div className="company-marquee">
        <div className="company-marquee-track">
          {repeatedCompanies.map((company, index) => (
            <div
              className="company-logo-card"
              key={`${company.name}-${index}`}
              title={company.name}
            >
              <span className={`company-logo-mark company-logo-mark-${company.logo}`}>
                <LogoMark type={company.logo} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyLogoMarquee;
