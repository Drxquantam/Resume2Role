import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";

const Layout = () => (
  <div className="min-h-screen bg-app-gradient text-white">
    <div className="soft-grid pointer-events-none fixed inset-0 opacity-60" />
    <Navbar />
    <main className="relative z-10 mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <Outlet />
    </main>
  </div>
);

export default Layout;
