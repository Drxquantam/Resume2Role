import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import AnalyzePage from "./pages/AnalyzePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import SavedCompaniesPage from "./pages/SavedCompaniesPage.jsx";
import SystemArchitecturePage from "./pages/SystemArchitecturePage.jsx";

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/analyze" element={<AnalyzePage />} />
      <Route path="/dashboard/:id" element={<DashboardPage />} />
      <Route path="/saved" element={<SavedCompaniesPage />} />
      <Route path="/architecture" element={<SystemArchitecturePage />} />
    </Route>
  </Routes>
);

export default App;
