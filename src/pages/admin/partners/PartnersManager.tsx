import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, Edit, Plus, Save, Trash2 } from "lucide-react";
import { loadPartners, savePartners, Partner } from "@/lib/localDb";
import { useToast } from "@/components/ui/use-toast";

const PartnersManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPartner, setCurrentPartner] = useState<Partner | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Initial partners data
  const initialPartners = [
    {
      id: 1,
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
    },
    {
      id: 2,
      name: "Cisco",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png",
    },
    {
      id: 3,
      name: "HP",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/1200px-HP_logo_2012.svg.png",
    },
    {
      id: 4,
      name: "VMware",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Vmware.svg/1200px-Vmware.svg.png",
    },
    {
      id: 5,
      name: "APC",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/APC_logo.svg/2560px-APC_logo.svg.png",
    },
    {
      id: 6,
      name: "Veeam Backup",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Veeam_logo.svg/2560px-Veeam_logo.svg.png",
    },
    {
      id: 7,
      name: "Kaspersky",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Kaspersky_logo.svg/2560px-Kaspersky_logo.svg.png",
    },
    {
      id: 8,
      name: "Legrand",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Legrand_logo.svg/2560px-Legrand_logo.svg.png",
    },
    {
      id: 9,
      name: "Proxmox",
      logo: "https://logovectorseek.com/wp-content/uploads/2021/10/proxmox-server-solutions-gmbh-logo-vector.png",
    },
    {
      id: 10,
      name: "OPNsense",
      logo: "https://opnsense.org/wp-content/themes/OPNsense/assets/img/opnsense_logo.png",
    },
    {
      id: 11,
      name: "Debian",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Openlogo-debianV2.svg/1200px-Openlogo-debianV2.svg.png",
    },
    {
      id: 12,
      name: "Ubuntu",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/UbuntuCoF.svg/1200px-UbuntuCoF.svg.png",
    },
  ];

  const [partners, setPartners] = useState<Partner[]>([]);

  // Load partners from localStorage on component mount
  useEffect(() => {
    const savedPartners = loadPartners(initialPartners);
    setPartners(savedPartners);
  }, []);

  const handleEditPartner = (partner: Partner) => {
    setCurrentPartner({ ...partner });
    setIsEditing(true);
  };

  const handleNewPartner = () => {
    setCurrentPartner({
      id: partners.length > 0 ? Math.max(...partners.map((p) => p.id)) + 1 : 1,
      name: "",
      logo: "",
    });
    setIsEditing(true);
  };

  const handleSavePartner = () => {
    if (!currentPartner) return;

    setIsSaving(true);

    // Check if it's a new partner or editing existing one
    let updatedPartners: Partner[];
    if (partners.find((p) => p.id === currentPartner.id)) {
      updatedPartners = partners.map((partner) =>
        partner.id === currentPartner.id ? currentPartner : partner,
      );
    } else {
      updatedPartners = [...partners, currentPartner];
    }

    // Save to localStorage
    savePartners(updatedPartners);
    setPartners(updatedPartners);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      setCurrentPartner(null);

      toast({
        title: "Parceiro salvo",
        description: "As alterações foram salvas com sucesso.",
      });
    }, 1000);
  };

  const handleDeletePartner = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este parceiro?")) {
      const updatedPartners = partners.filter((partner) => partner.id !== id);
      setPartners(updatedPartners);
      savePartners(updatedPartners);

      toast({
        title: "Parceiro excluído",
        description: "O parceiro foi excluído com sucesso.",
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
            <h1 className="text-3xl font-bold">Gerenciador de Parceiros</h1>
          </div>
          <Button onClick={handleNewPartner}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Parceiro
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <Card
              key={partner.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <CardTitle>{partner.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="h-24 flex items-center justify-center mb-4">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/300x100?text=Logo";
                      }}
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditPartner(partner)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeletePartner(partner.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Partner Dialog */}
        <Dialog
          open={isEditing}
          onOpenChange={(open) => !open && setIsEditing(false)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {currentPartner?.id &&
                partners.some((p) => p.id === currentPartner.id)
                  ? `Editar Parceiro: ${currentPartner.name}`
                  : "Novo Parceiro"}
              </DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para{" "}
                {currentPartner?.id &&
                partners.some((p) => p.id === currentPartner.id)
                  ? "editar"
                  : "adicionar"}{" "}
                um parceiro.
              </DialogDescription>
            </DialogHeader>

            {currentPartner && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome do Parceiro</Label>
                  <Input
                    id="name"
                    value={currentPartner.name}
                    onChange={(e) =>
                      setCurrentPartner({
                        ...currentPartner,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="logo">URL do Logo</Label>
                  <Input
                    id="logo"
                    value={currentPartner.logo}
                    onChange={(e) =>
                      setCurrentPartner({
                        ...currentPartner,
                        logo: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Pré-visualização do Logo</Label>
                  <div className="mt-2 border rounded-md p-4 flex justify-center">
                    <div className="h-20">
                      <img
                        src={currentPartner.logo}
                        alt="Logo Preview"
                        className="h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/300x100?text=Logo";
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSavePartner} disabled={isSaving}>
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

export default PartnersManager;
