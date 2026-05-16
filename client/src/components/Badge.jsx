const Badge = ({ children, tone = "sky" }) => {
  const tones = {
    sky: "border-sky-300/25 bg-sky-300/12 text-sky-100",
    mint: "border-emerald-300/25 bg-emerald-300/12 text-emerald-100",
    amber: "border-amber-300/25 bg-amber-300/12 text-amber-100",
    slate: "border-white/15 bg-white/8 text-slate-200"
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
};

export default Badge;
