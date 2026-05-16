import { Loader2 } from "lucide-react";

const variants = {
  primary: "bg-sky-400 text-slate-950 hover:bg-sky-300 shadow-glow",
  secondary: "bg-white/10 text-white hover:bg-white/16 border border-white/15",
  ghost: "bg-transparent text-slate-300 hover:bg-white/10"
};

const Button = ({ children, className = "", variant = "primary", loading = false, icon: Icon, ...props }) => (
  <button
    className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
    disabled={loading || props.disabled}
    {...props}
  >
    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : Icon ? <Icon className="h-4 w-4" /> : null}
    {children}
  </button>
);

export default Button;
