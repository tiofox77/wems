import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import { LogoProvider } from "./components/LogoProvider";
import Home from "./components/home";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import SectionsManager from "./pages/admin/sections/SectionsManager";
import HeroEditor from "./pages/admin/sections/HeroEditor";
import AboutEditor from "./pages/admin/sections/AboutEditor";
import MissionVisionEditor from "./pages/admin/sections/MissionVisionEditor";
import ContactEditor from "./pages/admin/sections/ContactEditor";
import ServicesManager from "./pages/admin/services/ServicesManager";
import ClientsManager from "./pages/admin/clients/ClientsManager";
import PartnersManager from "./pages/admin/partners/PartnersManager";
import ImagesManager from "./pages/admin/images/ImagesManager";
import SiteSettings from "./pages/admin/settings/SiteSettings";

function App() {
  return (
    <LogoProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wemsadmin" element={<Login />} />
        <Route path="/wemsadmin/dashboard" element={<Dashboard />} />
        <Route path="/wemsadmin/sections" element={<SectionsManager />} />
        <Route path="/wemsadmin/sections/hero" element={<HeroEditor />} />
        <Route path="/wemsadmin/sections/about" element={<AboutEditor />} />
        <Route
          path="/wemsadmin/sections/mission"
          element={<MissionVisionEditor />}
        />
        <Route path="/wemsadmin/sections/contact" element={<ContactEditor />} />
        <Route path="/wemsadmin/services" element={<ServicesManager />} />
        <Route path="/wemsadmin/clients" element={<ClientsManager />} />
        <Route path="/wemsadmin/partners" element={<PartnersManager />} />
        <Route path="/wemsadmin/images" element={<ImagesManager />} />
        <Route path="/wemsadmin/settings" element={<SiteSettings />} />
      </Routes>
    </LogoProvider>
  );
}

export default App;
