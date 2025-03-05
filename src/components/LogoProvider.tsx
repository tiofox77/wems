import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { loadSiteLogo } from "@/lib/localDb";

interface LogoContextType {
  logoUrl: string;
  refreshLogo: () => void;
}

const LogoContext = createContext<LogoContextType>({
  logoUrl: "/wems-logo.png",
  refreshLogo: () => {},
});

export const useLogo = () => useContext(LogoContext);

interface LogoProviderProps {
  children: ReactNode;
}

export const LogoProvider = ({ children }: LogoProviderProps) => {
  const [logoUrl, setLogoUrl] = useState("/wems-logo.png");

  const refreshLogo = () => {
    const savedLogo = loadSiteLogo("/wems-logo.png");
    setLogoUrl(savedLogo);
  };

  useEffect(() => {
    refreshLogo();

    // Check for localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "wems_site_logo") {
        refreshLogo();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <LogoContext.Provider value={{ logoUrl, refreshLogo }}>
      {children}
    </LogoContext.Provider>
  );
};
