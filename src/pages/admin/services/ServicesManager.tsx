import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Edit,
  Plus,
  Save,
  Trash2,
  Server,
  Code,
  Shield,
  Network,
  Database,
  Mail,
  Laptop,
  Radio,
  Lock,
} from "lucide-react";
import { loadServices, saveServices, Service } from "@/lib/localDb";
import { useToast } from "@/components/ui/use-toast";

const ServicesManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Initial services data
  const initialServices = [
    {
      id: 1,
      title: "Consultoria",
      description:
        "Consultoria estratégica para otimização de processos e tecnologias",
      icon: "Server",
      detailedInfo:
        "Nossa consultoria ajuda empresas a otimizar sua infraestrutura tecnológica, melhorar a eficiência e reduzir custos. Fornecemos soluções personalizadas para atender às suas necessidades específicas.",
      features: [
        "Levantamento de Requisitos",
        "Análise Funcional",
        "Reengenharia de Processos",
        "Formação e Gestão Documental",
      ],
    },
    {
      id: 2,
      title: "Desenvolvimento de Software",
      description: "Soluções personalizadas para gestão documental e web",
      icon: "Code",
      detailedInfo:
        "Desenvolvemos software personalizado para gestão documental, páginas web e soluções de email corporativo que atendem às necessidades específicas do seu negócio.",
      features: [
        "Desenvolvimento de software de gestão documental",
        "Desenvolvimento de páginas WEB",
        "Email corporativo",
        "Soluções personalizadas",
      ],
    },
    {
      id: 3,
      title: "Antenas e Telecomunicações",
      description:
        "Soluções completas para comunicação sem fio e transmissão de dados",
      icon: "Radio",
      detailedInfo:
        "Implementamos soluções de antenas e telecomunicações para garantir conectividade confiável e de alta performance em qualquer ambiente ou localização.",
      features: [
        "Instalação e manutenção de antenas",
        "Sistemas de comunicação via satélite",
        "Redes de telecomunicações corporativas",
        "Soluções para áreas remotas",
      ],
    },
    {
      id: 4,
      title: "Soluções de Cibersegurança",
      description: "Proteção abrangente contra ameaças digitais",
      icon: "Lock",
      detailedInfo:
        "Oferecemos soluções completas de cibersegurança para proteger sua empresa contra ameaças digitais, garantindo a integridade e confidencialidade dos seus dados.",
      features: [
        "Análise de vulnerabilidades e testes de penetração",
        "Implementação de firewalls e sistemas de proteção",
        "Monitoramento contínuo e resposta a incidentes",
        "Treinamento de conscientização em segurança",
      ],
    },
  ];

  const [services, setServices] = useState<Service[]>([]);

  // Load services from localStorage on component mount
  useEffect(() => {
    const savedServices = loadServices(initialServices);
    setServices(savedServices);
  }, []);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Server":
        return <Server className="h-5 w-5 text-primary" />;
      case "Code":
        return <Code className="h-5 w-5 text-primary" />;
      case "Shield":
        return <Shield className="h-5 w-5 text-primary" />;
      case "Network":
        return <Network className="h-5 w-5 text-primary" />;
      case "Database":
        return <Database className="h-5 w-5 text-primary" />;
      case "Mail":
        return <Mail className="h-5 w-5 text-primary" />;
      case "Laptop":
        return <Laptop className="h-5 w-5 text-primary" />;
      case "Radio":
        return <Radio className="h-5 w-5 text-primary" />;
      case "Lock":
        return <Lock className="h-5 w-5 text-primary" />;
      default:
        return <Server className="h-5 w-5 text-primary" />;
    }
  };

  const handleEditService = (service: Service) => {
    setCurrentService({
      ...service,
      features: service.features.join("\n"),
    });
    setIsEditing(true);
  };

  const handleNewService = () => {
    setCurrentService({
      id: services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1,
      title: "",
      description: "",
      icon: "Server",
      detailedInfo: "",
      features: "",
    });
    setIsEditing(true);
  };

  const handleSaveService = () => {
    if (!currentService) return;

    setIsSaving(true);

    // Process the features from textarea to array
    const processedService = {
      ...currentService,
      features: currentService.features
        .split("\n")
        .filter((feature: string) => feature.trim() !== ""),
    };

    // Check if it's a new service or editing existing one
    let updatedServices: Service[];
    if (services.find((s) => s.id === processedService.id)) {
      updatedServices = services.map((service) =>
        service.id === processedService.id ? processedService : service,
      );
    } else {
      updatedServices = [...services, processedService];
    }

    // Save to localStorage
    saveServices(updatedServices);
    setServices(updatedServices);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      setCurrentService(null);

      toast({
        title: "Serviço salvo",
        description: "As alterações foram salvas com sucesso.",
      });
    }, 1000);
  };

  const handleDeleteService = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este serviço?")) {
      const updatedServices = services.filter((service) => service.id !== id);
      setServices(updatedServices);
      saveServices(updatedServices);

      toast({
        title: "Serviço excluído",
        description: "O serviço foi excluído com sucesso.",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => navigate("/wemsadmin/dashboard")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold">Gerenciador de Serviços</h1>
          </div>
          <Button onClick={handleNewService}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Serviço
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Serviços</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead className="w-[50px]">Ícone</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Descrição
                  </TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>{service.id}</TableCell>
                    <TableCell>{getIconComponent(service.icon)}</TableCell>
                    <TableCell className="font-medium">
                      {service.title}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {service.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditService(service)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Service Dialog */}
        <Dialog
          open={isEditing}
          onOpenChange={(open) => !open && setIsEditing(false)}
        >
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {currentService?.id &&
                services.some((s) => s.id === currentService.id)
                  ? `Editar Serviço: ${currentService.title}`
                  : "Novo Serviço"}
              </DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para{" "}
                {currentService?.id &&
                services.some((s) => s.id === currentService.id)
                  ? "editar"
                  : "adicionar"}{" "}
                um serviço.
              </DialogDescription>
            </DialogHeader>

            {currentService && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={currentService.title}
                      onChange={(e) =>
                        setCurrentService({
                          ...currentService,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Descrição Curta</Label>
                    <Input
                      id="description"
                      value={currentService.description}
                      onChange={(e) =>
                        setCurrentService({
                          ...currentService,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="icon">Ícone</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {[
                        "Server",
                        "Code",
                        "Shield",
                        "Network",
                        "Database",
                        "Mail",
                        "Laptop",
                        "Radio",
                        "Lock",
                      ].map((icon) => (
                        <Button
                          key={icon}
                          type="button"
                          variant={
                            currentService.icon === icon ? "default" : "outline"
                          }
                          className="flex items-center justify-center h-12"
                          onClick={() =>
                            setCurrentService({ ...currentService, icon })
                          }
                        >
                          {getIconComponent(icon)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="detailedInfo">Descrição Detalhada</Label>
                    <Textarea
                      id="detailedInfo"
                      value={currentService.detailedInfo}
                      onChange={(e) =>
                        setCurrentService({
                          ...currentService,
                          detailedInfo: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="features">
                      Características (uma por linha)
                    </Label>
                    <Textarea
                      id="features"
                      value={currentService.features}
                      onChange={(e) =>
                        setCurrentService({
                          ...currentService,
                          features: e.target.value,
                        })
                      }
                      rows={5}
                      placeholder="Característica 1\nCaracterística 2\nCaracterística 3"
                    />
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveService} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default ServicesManager;
