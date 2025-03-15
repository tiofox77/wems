import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  FileText,
  Image,
  Users,
  Settings,
  Edit,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated
  useEffect(() => {
    let isMounted = true;

    const checkAuth = () => {
      try {
        const isAuthenticated =
          localStorage.getItem("wemsAdminAuth") === "true";
        if (!isAuthenticated && isMounted) {
          navigate("/wemsadmin");
          return;
        }
        if (isMounted) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        if (isMounted) {
          setError(
            "Erro ao verificar autenticação. Por favor, faça login novamente.",
          );
          setIsLoading(false);
        }
      }
    };

    // Add a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (isMounted && isLoading) {
        console.warn("Dashboard loading timeout - forcing completion");
        setIsLoading(false);
      }
    }, 2000);

    checkAuth();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  const stats = [
    {
      title: "Seções",
      value: "10",
      description: "Seções do site",
      icon: <FileText className="h-8 w-8 text-primary" />,
      link: "/wemsadmin/sections",
    },
    {
      title: "Imagens",
      value: "24",
      description: "Imagens gerenciadas",
      icon: <Image className="h-8 w-8 text-primary" />,
      link: "/wemsadmin/images",
    },
    {
      title: "Serviços",
      value: "12",
      description: "Serviços cadastrados",
      icon: <Settings className="h-8 w-8 text-primary" />,
      link: "/wemsadmin/services",
    },
    {
      title: "Clientes",
      value: "20",
      description: "Clientes cadastrados",
      icon: <Users className="h-8 w-8 text-primary" />,
      link: "/wemsadmin/clients",
    },
  ];

  const recentEdits = [
    { section: "Hero Slider", user: "Admin", date: "Hoje, 14:30" },
    { section: "Serviços", user: "Admin", date: "Ontem, 10:15" },
    { section: "Clientes", user: "Admin", date: "22/05/2024, 16:45" },
    { section: "Parceiros", user: "Admin", date: "20/05/2024, 09:30" },
  ];

  const handleRetryLogin = () => {
    localStorage.removeItem("wemsAdminAuth");
    navigate("/wemsadmin");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">
            Carregando painel administrativo...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 p-4">
        <div className="w-full max-w-md">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button onClick={handleRetryLogin} className="w-full">
            Voltar para o login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Painel de Controle</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(stat.link)}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-medium">
                  {stat.title}
                </CardTitle>
                <div className="p-2 bg-primary/10 rounded-full">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
              <CardDescription>Últimas alterações no site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEdits.map((edit, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b pb-2 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Edit className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{edit.section}</p>
                        <p className="text-sm text-muted-foreground">
                          por {edit.user}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {edit.date}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Analytics Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas do Site</CardTitle>
              <CardDescription>Resumo de desempenho</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-[250px]">
              <div className="flex flex-col items-center justify-center text-center">
                <BarChart className="h-16 w-16 text-primary/50 mb-4" />
                <p className="text-muted-foreground">
                  Estatísticas detalhadas estarão disponíveis em breve
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
