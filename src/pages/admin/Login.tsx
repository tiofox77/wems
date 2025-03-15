import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, User, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLogo } from "@/components/LogoProvider";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const { logoUrl } = useLogo();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check if already authenticated via localStorage
  useEffect(() => {
    let isMounted = true;

    const checkAuth = () => {
      try {
        const isLocalAuth = localStorage.getItem("wemsAdminAuth") === "true";
        if ((isLocalAuth || isAuthenticated) && isMounted) {
          const from =
            (location.state as any)?.from?.pathname || "/wemsadmin/dashboard";
          navigate(from, { replace: true });
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        if (isMounted) {
          setCheckingAuth(false);
        }
      }
    };

    // Add a timeout to ensure the check completes
    const timeoutId = setTimeout(() => {
      if (isMounted && checkingAuth) {
        console.warn("Auth check timeout - forcing completion");
        setCheckingAuth(false);
      }
    }, 2000);

    checkAuth();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [isAuthenticated, navigate, location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // For demo purposes, hardcode the admin credentials
      if (username === "admin" && password === "wems2024") {
        try {
          // Store authentication state
          localStorage.setItem("wemsAdminAuth", "true");
          // Navigate to dashboard or the page they were trying to access
          const from =
            (location.state as any)?.from?.pathname || "/wemsadmin/dashboard";
          navigate(from, { replace: true });
          return;
        } catch (storageError) {
          console.error("Error storing auth in localStorage:", storageError);
          // Continue to try the context login as fallback
        }
      }

      // Try using the auth context login
      try {
        const success = await login(username, password);
        if (success) {
          // Navigate to dashboard or the page they were trying to access
          const from =
            (location.state as any)?.from?.pathname || "/wemsadmin/dashboard";
          navigate(from, { replace: true });
          return;
        }
      } catch (loginErr) {
        console.error("Auth context login error:", loginErr);
        // Continue to error handling below
      }

      // If we get here, login failed
      setError("Credenciais inválidas. Por favor, tente novamente.");
    } catch (err) {
      setError("Ocorreu um erro durante o login. Por favor, tente novamente.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a timeout for the loading state
  useEffect(() => {
    let isMounted = true;

    const timeoutId = setTimeout(() => {
      if (isMounted && authLoading) {
        console.warn("Auth loading timeout - forcing completion");
        // Instead of forcing a reload, just complete the loading state
        setCheckingAuth(false);
      }
    }, 3000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [authLoading]);

  // Helper function to show login credentials for demo purposes
  const fillDemoCredentials = () => {
    setUsername("admin");
    setPassword("wems2024");
  };

  if (authLoading || checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <img
                src={logoUrl || "/wems-logo.png"}
                alt="WEMS Logo"
                className="h-12"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/wems-logo.png";
                }}
              />
            </div>
            <CardTitle className="text-2xl font-bold">
              Painel Administrativo
            </CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar o painel
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuário</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Digite seu usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
              <div className="text-center mt-2">
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="text-xs text-primary hover:underline"
                >
                  Usar credenciais de demonstração
                </button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Painel exclusivo para administradores do site WEMS
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
