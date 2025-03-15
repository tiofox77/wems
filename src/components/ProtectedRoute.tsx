import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const location = useLocation();
  const [isLocalAuth, setIsLocalAuth] = useState(false);
  const [isCheckingLocal, setIsCheckingLocal] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Check localStorage directly as a fallback
  useEffect(() => {
    let isMounted = true;

    const checkLocalAuth = () => {
      try {
        const token = localStorage.getItem("wemsAdminAuth");
        if (isMounted) {
          setIsLocalAuth(token === "true");
        }
      } catch (error) {
        console.error("Error checking local auth:", error);
        if (isMounted) {
          setIsLocalAuth(false);
        }
      } finally {
        if (isMounted) {
          setIsCheckingLocal(false);
          setIsLoading(false);
        }
      }
    };

    // Add a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (isMounted && isCheckingLocal) {
        console.warn("Auth check timeout - forcing completion");
        setIsCheckingLocal(false);
        setIsLoading(false);
      }
    }, 2000);

    checkLocalAuth();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  // Add a timeout for the entire auth process
  useEffect(() => {
    let isMounted = true;

    const timeoutId = setTimeout(() => {
      if (isMounted && authLoading && isCheckingLocal) {
        console.warn("Auth loading timeout - forcing completion");
        // Instead of forcing a redirect, just complete the loading state
        setIsCheckingLocal(false);
        setIsLoading(false);
      }
    }, 3000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [authLoading, isCheckingLocal]);

  // Update loading state when auth context loading changes
  useEffect(() => {
    if (!authLoading && !isCheckingLocal) {
      setIsLoading(false);
    }
  }, [authLoading, isCheckingLocal]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Check both auth context and localStorage
  if (!isAuthenticated && !isLocalAuth) {
    // Redirect to login page with the return url
    return <Navigate to="/wemsadmin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
