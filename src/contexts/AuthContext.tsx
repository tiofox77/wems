import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { api } from "../lib/apiService";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { username: string; role: string } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

// Using a named function component for Fast Refresh compatibility
export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string; role: string } | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  // Check if user is already authenticated on mount
  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("wemsAdminAuth");
        if (token === "true" && isMounted) {
          setIsAuthenticated(true);
          setUser({ username: "admin", role: "admin" });
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        // Always set loading to false to prevent infinite loading
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Add a timeout to ensure loading state is resolved
    const timeoutId = setTimeout(() => {
      if (isMounted && loading) {
        console.warn("Auth check timeout - forcing completion");
        setLoading(false);
      }
    }, 2000);

    checkAuth();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      // For demo purposes, hardcode the admin credentials
      if (username === "admin" && password === "wems2024") {
        localStorage.setItem("wemsAdminAuth", "true");
        setIsAuthenticated(true);
        setUser({ username, role: "admin" });
        setLoading(false);
        return true;
      }

      // Fallback to API login if hardcoded credentials don't match
      try {
        const response = await api.login(username, password);

        if (response.success) {
          localStorage.setItem("wemsAdminAuth", "true");
          setIsAuthenticated(true);
          setUser({ username, role: "admin" });
          setLoading(false);
          return true;
        }
      } catch (apiError) {
        console.error("API login error:", apiError);
      }

      setLoading(false);
      return false;
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("wemsAdminAuth");
    } catch (error) {
      console.error("Error during logout:", error);
    }
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
