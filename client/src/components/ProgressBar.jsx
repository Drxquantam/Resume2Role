const ProgressBar = ({ value = 0, label = "Fit score" }) => (
  <div>
    <div className="mb-2 flex items-center justify-between text-sm">
      <span className="text-slate-300">{label}</span>
      <span className="font-semibold text-white">{value}%</span>
    </div>
    <div className="h-3 overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-sky-300 to-amber-200 transition-all duration-700"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  </div>
);

export default ProgressBar;
