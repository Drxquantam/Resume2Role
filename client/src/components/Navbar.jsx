import { BarChart3, BrainCircuit, Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Button from "./Button.jsx";

const links = [
  { href: "/analyze", label: "Analyze" },
  { href: "/saved", label: "Saved" },
  { href: "/architecture", label: "Architecture" }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? "bg-white/12 text-white" : "text-slate-300 hover:bg-white/8 hover:text-white"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-midnight/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-300 text-slate-950 shadow-glow">
            <BrainCircuit className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-lg font-bold tracking-tight text-white">Resume2Role</span>
            <span className="block text-xs text-slate-400">Placement intelligence</span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink key={link.href} to={link.href} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <Link to="/analyze" className="ml-2">
            <Button icon={BarChart3}>Research</Button>
          </Link>
        </div>

        <button
          aria-label="Toggle navigation"
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/12 bg-white/8 text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/10 px-5 pb-5 md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <NavLink key={link.href} to={link.href} className={linkClass} onClick={() => setOpen(false)}>
                {link.label}
              </NavLink>
            ))}
            <Link to="/analyze" onClick={() => setOpen(false)}>
              <Button className="w-full" icon={BarChart3}>
                Research
              </Button>
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
