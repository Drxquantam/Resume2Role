const GlassCard = ({ children, className = "" }) => (
  <div className={`glass-panel rounded-2xl p-6 transition duration-200 hover:border-white/22 ${className}`}>{children}</div>
);

export default GlassCard;
