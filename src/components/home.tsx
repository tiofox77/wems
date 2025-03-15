import React, { useEffect, useState } from "react";
import { LogoProvider } from "./LogoProvider";
import Navbar from "./layout/Navbar";
import HeroSlider from "./sections/HeroSlider";
import ServicesSection from "./sections/ServicesSection";
import AboutSection from "./sections/AboutSection";
import MissionVisionSection from "./sections/MissionVisionSection";
import StrategicConsultingSection from "./sections/StrategicConsultingSection";
import ServiceExamplesSection from "./sections/ServiceExamplesSection";
import ClientsSection from "./ClientsSection";
import PartnersSection from "./sections/PartnersSection";
import ContactSection from "./sections/ContactSection";
import Footer from "./layout/Footer";
import { Loader2 } from "lucide-react";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data from JSON file
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch data from JSON file
        const response = await fetch("/data.json");

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        // Successfully loaded data
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Erro ao carregar dados. Por favor, recarregue a página.");
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Carregando dados do site...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <div className="flex flex-col items-center text-center max-w-md p-6">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-4">Erro ao carregar dados</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <LogoProvider>
      <div className="w-full min-h-screen bg-background">
        <Navbar />
        <HeroSlider />
        <AboutSection />
        <MissionVisionSection />
        <ServicesSection />
        <ServiceExamplesSection />
        <ClientsSection />
        <StrategicConsultingSection />
        <PartnersSection />
        <ContactSection />
        <Footer />
      </div>
    </LogoProvider>
  );
}

export default Home;
