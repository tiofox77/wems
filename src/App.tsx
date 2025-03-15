import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./pages/admin/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import routes from "tempo-routes";
import { Loader2 } from "lucide-react";

// Lazy load admin components to improve performance
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const SectionsManager = lazy(
  () => import("./pages/admin/sections/SectionsManager"),
);
const HeroEditor = lazy(() => import("./pages/admin/sections/HeroEditor"));
const AboutEditor = lazy(() => import("./pages/admin/sections/AboutEditor"));
const MissionVisionEditor = lazy(
  () => import("./pages/admin/sections/MissionVisionEditor"),
);
const ContactEditor = lazy(
  () => import("./pages/admin/sections/ContactEditor"),
);
const ServicesManager = lazy(
  () => import("./pages/admin/services/ServicesManager"),
);
const ClientsManager = lazy(
  () => import("./pages/admin/clients/ClientsManager"),
);
const PartnersManager = lazy(
  () => import("./pages/admin/partners/PartnersManager"),
);
const ImagesManager = lazy(() => import("./pages/admin/images/ImagesManager"));
const SiteSettings = lazy(() => import("./pages/admin/settings/SiteSettings"));

// Loading fallback for lazy-loaded components
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
    <div className="flex flex-col items-center">
      <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
      <p className="text-muted-foreground">Carregando...</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      {/* Tempo routes */}
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wemsadmin" element={<Login />} />
        <Route
          path="/wemsadmin/dashboard"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <Dashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/wemsadmin/sections"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <SectionsManager />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/wemsadmin/sections/hero"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <HeroEditor />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/wemsadmin/sections/about"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <AboutEditor />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/wemsadmin/sections/mission"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <MissionVisionEditor />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/wemsadmin/sections/contact"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <ContactEditor />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/wemsadmin/services"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <ServicesManager />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/wemsadmin/clients"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <ClientsManager />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/wemsadmin/partners"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <PartnersManager />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/wemsadmin/images"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <ImagesManager />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/wemsadmin/settings"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <SiteSettings />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {/* Add this before any catchall route */}
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
