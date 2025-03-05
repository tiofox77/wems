import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, FileText, Image, Users, Settings, Edit } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("wemsAdminAuth") === "true";
    if (!isAuthenticated) {
      navigate("/wemsadmin");
    }
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
