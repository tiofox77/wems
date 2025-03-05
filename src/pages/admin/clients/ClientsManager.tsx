import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Building,
  Droplet,
  Landmark,
  Briefcase,
  HardHat,
} from "lucide-react";
import {
  loadClientCategories,
  saveClientCategories,
  ClientCategory,
  Client,
} from "@/lib/localDb";
import { useToast } from "@/components/ui/use-toast";

const ClientsManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("institucionais");
  const [isEditing, setIsEditing] = useState(false);
  const [currentClient, setCurrentClient] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Initial categories and clients data
  const initialCategories = [
    {
      id: "institucionais",
      name: "Institucionais",
      clients: [
        {
          id: 1,
          name: "Ministério das Finanças",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=MF&backgroundColor=0369a1&fontFamily=Arial",
          description: "Implementação de infraestrutura de rede e segurança",
        },
        {
          id: 2,
          name: "Ministério da Educação",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=ME&backgroundColor=0369a1&fontFamily=Arial",
          description: "Sistema de gestão documental e comunicações unificadas",
        },
      ],
    },
    {
      id: "mineiros",
      name: "Mineiros",
      clients: [
        {
          id: 3,
          name: "Catoca Mining",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=CM&backgroundColor=ca8a04&fontFamily=Arial",
          description: "Infraestrutura de rede para operações remotas",
        },
        {
          id: 4,
          name: "Sociedade Mineira de Angola",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=SMA&backgroundColor=ca8a04&fontFamily=Arial",
          description: "Soluções de comunicação via satélite e segurança",
        },
      ],
    },
    {
      id: "petroliferas",
      name: "Petrolíferas",
      clients: [
        {
          id: 5,
          name: "Sonangol",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=SON&backgroundColor=b91c1c&fontFamily=Arial",
          description: "Infraestrutura de rede e segurança corporativa",
        },
        {
          id: 6,
          name: "Total E&P Angola",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=TEPA&backgroundColor=b91c1c&fontFamily=Arial",
          description: "Soluções de comunicação e data center",
        },
      ],
    },
    {
      id: "bancos",
      name: "Bancos e Seguros",
      clients: [
        {
          id: 7,
          name: "Banco Nacional de Angola",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=BNA&backgroundColor=4338ca&fontFamily=Arial",
          description: "Infraestrutura de segurança e data center",
        },
        {
          id: 8,
          name: "Banco BAI",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=BAI&backgroundColor=4338ca&fontFamily=Arial",
          description: "Soluções de comunicação e segurança de dados",
        },
      ],
    },
    {
      id: "empresas",
      name: "Empresas",
      clients: [
        {
          id: 9,
          name: "UNITEL",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=UNI&backgroundColor=065f46&fontFamily=Arial",
          description: "Consultoria estratégica e implementação de sistemas",
        },
        {
          id: 10,
          name: "TAAG",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=TAAG&backgroundColor=065f46&fontFamily=Arial",
          description: "Soluções de comunicação e segurança",
        },
      ],
    },
  ];

  const [categories, setCategories] = useState<ClientCategory[]>([]);

  // Load categories from localStorage on component mount
  useEffect(() => {
    // Initialize client categories in localStorage if not exists
    if (!localStorage.getItem("wems_client_categories")) {
      saveClientCategories(initialCategories);
    }

    const savedCategories = loadClientCategories(initialCategories);
    setCategories(savedCategories);
    if (savedCategories.length > 0) {
      setActiveCategory(savedCategories[0].id);
    }
  }, []);

  const handleEditClient = (client: Client) => {
    setCurrentClient({
      ...client,
      categoryId: activeCategory,
    });
    setIsEditing(true);
  };

  const handleNewClient = () => {
    // Find the highest ID across all categories
    const allClients = categories.flatMap((category) => category.clients);
    const maxId =
      allClients.length > 0
        ? Math.max(...allClients.map((client) => client.id))
        : 0;

    setCurrentClient({
      id: maxId + 1,
      name: "",
      logo: `https://api.dicebear.com/7.x/initials/svg?seed=NEW&backgroundColor=0369a1&fontFamily=Arial`,
      description: "",
      categoryId: activeCategory,
    });
    setIsEditing(true);
  };

  const handleSaveClient = () => {
    if (!currentClient) return;

    setIsSaving(true);

    // Create a deep copy of the categories to avoid reference issues
    const updatedCategories = JSON.parse(JSON.stringify(categories));

    // Find the category to update
    const categoryIndex = updatedCategories.findIndex(
      (cat: ClientCategory) => cat.id === currentClient.categoryId,
    );

    if (categoryIndex !== -1) {
      const category = updatedCategories[categoryIndex];
      const existingClientIndex = category.clients.findIndex(
        (c: Client) => c.id === currentClient.id,
      );

      // Create the client object without the categoryId property
      const clientToSave = {
        id: currentClient.id,
        name: currentClient.name,
        logo: currentClient.logo,
        description: currentClient.description,
      };

      if (existingClientIndex !== -1) {
        // Update existing client
        category.clients[existingClientIndex] = clientToSave;
      } else {
        // Add new client
        category.clients.push(clientToSave);
      }
    }

    // Save to localStorage
    saveClientCategories(updatedCategories);
    setCategories(updatedCategories);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      setCurrentClient(null);

      toast({
        title: "Cliente salvo",
        description: "As alterações foram salvas com sucesso.",
      });
    }, 1000);
  };

  const handleDeleteClient = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
      // Create a deep copy of the categories to avoid reference issues
      const updatedCategories = JSON.parse(JSON.stringify(categories));

      // Find the category to update
      const categoryIndex = updatedCategories.findIndex(
        (cat: ClientCategory) => cat.id === activeCategory,
      );

      if (categoryIndex !== -1) {
        // Filter out the client to delete
        updatedCategories[categoryIndex].clients = updatedCategories[
          categoryIndex
        ].clients.filter((client: Client) => client.id !== id);
      }

      // Save to localStorage
      saveClientCategories(updatedCategories);
      setCategories(updatedCategories);

      toast({
        title: "Cliente excluído",
        description: "O cliente foi excluído com sucesso.",
      });
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case "institucionais":
        return <Building className="h-5 w-5" />;
      case "mineiros":
        return <HardHat className="h-5 w-5" />;
      case "petroliferas":
        return <Droplet className="h-5 w-5" />;
      case "bancos":
        return <Landmark className="h-5 w-5" />;
      case "empresas":
        return <Briefcase className="h-5 w-5" />;
      default:
        return <Building className="h-5 w-5" />;
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
            <h1 className="text-3xl font-bold">Gerenciador de Clientes</h1>
          </div>
          <Button onClick={handleNewClient}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="mb-6">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2"
              >
                {getCategoryIcon(category.id)}
                <span>{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getCategoryIcon(category.id)}
                    <span>Clientes - {category.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">ID</TableHead>
                        <TableHead className="w-[80px]">Logo</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Descrição
                        </TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {category.clients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell>{client.id}</TableCell>
                          <TableCell>
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <img
                                src={client.logo}
                                alt={client.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {client.name}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {client.description}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditClient(client)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteClient(client.id)}
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
            </TabsContent>
          ))}
        </Tabs>

        {/* Edit Client Dialog */}
        <Dialog
          open={isEditing}
          onOpenChange={(open) => !open && setIsEditing(false)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {currentClient?.id &&
                categories.some((c) =>
                  c.clients.some((client) => client.id === currentClient.id),
                )
                  ? `Editar Cliente: ${currentClient.name}`
                  : "Novo Cliente"}
              </DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para{" "}
                {currentClient?.id &&
                categories.some((c) =>
                  c.clients.some((client) => client.id === currentClient.id),
                )
                  ? "editar"
                  : "adicionar"}{" "}
                um cliente.
              </DialogDescription>
            </DialogHeader>

            {currentClient && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome do Cliente</Label>
                  <Input
                    id="name"
                    value={currentClient.name}
                    onChange={(e) =>
                      setCurrentClient({
                        ...currentClient,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={currentClient.description}
                    onChange={(e) =>
                      setCurrentClient({
                        ...currentClient,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="logo">URL do Logo</Label>
                  <Input
                    id="logo"
                    value={currentClient.logo}
                    onChange={(e) =>
                      setCurrentClient({
                        ...currentClient,
                        logo: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Pré-visualização do Logo</Label>
                  <div className="mt-2 flex justify-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden border">
                      <img
                        src={currentClient.logo}
                        alt="Logo Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/200x200?text=Logo";
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <select
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={currentClient.categoryId}
                    onChange={(e) =>
                      setCurrentClient({
                        ...currentClient,
                        categoryId: e.target.value,
                      })
                    }
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveClient} disabled={isSaving}>
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

export default ClientsManager;
