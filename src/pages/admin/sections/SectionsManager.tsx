import React from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";

const SectionsManager = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: "hero",
      title: "Hero Slider",
      description: "Gerenciar slides do carrossel principal",
      lastUpdated: "Hoje, 14:30",
      path: "/wemsadmin/sections/hero",
    },
    {
      id: "about",
      title: "Quem Somos",
      description: "Editar informações sobre a empresa",
      lastUpdated: "20/05/2024",
      path: "/wemsadmin/sections/about",
    },
    {
      id: "mission",
      title: "Missão e Visão",
      description: "Atualizar missão e visão da empresa",
      lastUpdated: "15/05/2024",
      path: "/wemsadmin/sections/mission",
    },
    {
      id: "services",
      title: "Serviços",
      description: "Gerenciar serviços oferecidos",
      lastUpdated: "Ontem, 10:15",
      path: "/wemsadmin/services",
    },
    {
      id: "examples",
      title: "Exemplos de Projetos",
      description: "Editar exemplos de projetos realizados",
      lastUpdated: "18/05/2024",
      path: "/wemsadmin/sections/examples",
    },
    {
      id: "clients",
      title: "Clientes",
      description: "Gerenciar lista de clientes",
      lastUpdated: "22/05/2024",
      path: "/wemsadmin/clients",
    },
    {
      id: "consulting",
      title: "Consultoria Estratégica",
      description: "Editar seção de consultoria estratégica",
      lastUpdated: "10/05/2024",
      path: "/wemsadmin/sections/consulting",
    },
    {
      id: "partners",
      title: "Parceiros",
      description: "Gerenciar parceiros da empresa",
      lastUpdated: "20/05/2024",
      path: "/wemsadmin/partners",
    },
    {
      id: "contact",
      title: "Contato",
      description: "Atualizar informações de contato",
      lastUpdated: "05/05/2024",
      path: "/wemsadmin/sections/contact",
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gerenciador de Seções</h1>
          <Button onClick={() => navigate("/wemsadmin/dashboard")}>
            Voltar ao Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Card
              key={section.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-2">
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Última atualização: {section.lastUpdated}
                </p>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    asChild
                  >
                    <a href="/" target="_blank">
                      <Eye className="h-4 w-4" />
                      <span>Visualizar</span>
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => navigate(section.path)}
                  >
                    <Edit className="h-4 w-4" />
                    <span>Editar</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default SectionsManager;
