import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { loadSiteLogo } from "@/lib/localDb";
import { Skeleton } from "@/components/ui/skeleton";

interface LogoContextType {
  logoUrl: string;
  refreshLogo: () => void;
  isLoading: boolean;
}

const LogoContext = createContext<LogoContextType>({
  logoUrl: "/wems-logo.png",
  refreshLogo: () => {},
  isLoading: false,
});

export const useLogo = () => useContext(LogoContext);

interface LogoProviderProps {
  children: ReactNode;
}

export const LogoProvider = ({ children }: LogoProviderProps) => {
  const [logoUrl, setLogoUrl] = useState("/wems-logo.png");
  const [isLoading, setIsLoading] = useState(true);

  const refreshLogo = async () => {
    setIsLoading(true);
    try {
      const savedLogo = await loadSiteLogo("/wems-logo.png");
      setLogoUrl(savedLogo);
    } catch (error) {
      console.error("Error loading logo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshLogo();

    // Listen for logo updates
    const handleLogoUpdate = (e: CustomEvent) => {
      if (e.detail && e.detail.url) {
        setLogoUrl(e.detail.url);
      }
    };

    // Listen for data import events
    const handleDataImport = () => {
      refreshLogo();
    };

    window.addEventListener("logo-updated", handleLogoUpdate as EventListener);
    window.addEventListener("wems-data-imported", handleDataImport);

    return () => {
      window.removeEventListener(
        "logo-updated",
        handleLogoUpdate as EventListener,
      );
      window.removeEventListener("wems-data-imported", handleDataImport);
    };
  }, []);

  return (
    <LogoContext.Provider value={{ logoUrl, refreshLogo, isLoading }}>
      {children}
    </LogoContext.Provider>
  );
};

// Logo component with loading state
export const Logo = ({ className = "h-10" }: { className?: string }) => {
  const { logoUrl, isLoading } = useLogo();

  if (isLoading) {
    return <Skeleton className={`${className} rounded-md`} />;
  }

  return (
    <img
      src={logoUrl}
      alt="WEMS Logo"
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).src = "/wems-logo.png";
      }}
    />
  );
};
