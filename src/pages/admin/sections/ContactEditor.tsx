import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { loadContactData, saveContactData, ContactData } from "@/lib/localDb";

const ContactEditor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  // Initial contact data
  const initialContactData: ContactData = {
    title: "Entre em Contato",
    subtitle: "Estamos prontos para ajudar sua empresa a crescer",
    contactInfo: {
      address:
        "Rua Comandante Gika, Edifício Garden Towers, Torre B, 9º andar, Luanda, Angola",
      email: "info@wems.co.ao",
      phone: "+244 923 456 789",
      mapIframe:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31603.45339484696!2d13.2187654!3d-8.8368338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f15cdc8d2c7d%3A0x850c1c5c5ecc5a92!2sLuanda%2C%20Angola!5e0!3m2!1sen!2sus!4v1653389034695!5m2!1sen!2sus",
    },
  };

  const [contactData, setContactData] =
    useState<ContactData>(initialContactData);

  // Load contact data from localStorage on component mount
  useEffect(() => {
    const savedData = loadContactData(initialContactData);
    setContactData(savedData);
  }, []);

  const handleInputChange = (field: keyof ContactData, value: string) => {
    setContactData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContactInfoChange = (
    field: keyof ContactData["contactInfo"],
    value: string,
  ) => {
    setContactData((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    setIsSaving(true);

    // Save to localStorage
    saveContactData(contactData);

    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Alterações salvas",
        description: "As alterações foram salvas com sucesso.",
      });
    }, 1000);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => navigate("/wemsadmin/sections")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold">Editor de Contato</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <a
                href="/#contact"
                target="_blank"
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                <span>Visualizar</span>
              </a>
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Header Content */}
          <Card>
            <CardHeader>
              <CardTitle>Cabeçalho</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={contactData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle">Subtítulo</Label>
                  <Input
                    id="subtitle"
                    value={contactData.subtitle}
                    onChange={(e) =>
                      handleInputChange("subtitle", e.target.value)
                    }
                  />
                </div>
              </motion.div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={contactData.contactInfo.address}
                    onChange={(e) =>
                      handleContactInfoChange("address", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactData.contactInfo.email}
                    onChange={(e) =>
                      handleContactInfoChange("email", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={contactData.contactInfo.phone}
                    onChange={(e) =>
                      handleContactInfoChange("phone", e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Editor */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Mapa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="mapIframe">
                    Código do iframe do Google Maps
                  </Label>
                  <Textarea
                    id="mapIframe"
                    value={contactData.contactInfo.mapIframe}
                    onChange={(e) =>
                      handleContactInfoChange("mapIframe", e.target.value)
                    }
                    rows={4}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Cole aqui o URL do iframe do Google Maps. Para obter este
                    código:
                    <ol className="list-decimal ml-5 mt-1">
                      <li>Vá para o Google Maps e busque sua localização</li>
                      <li>
                        Clique em "Compartilhar" e depois em "Incorporar um
                        mapa"
                      </li>
                      <li>
                        Cole o código completo do iframe (incluindo as tags
                        &lt;iframe&gt;)
                      </li>
                    </ol>
                  </p>
                </div>

                <div>
                  <Label>Pré-visualização do Mapa</Label>
                  <div className="h-64 rounded-lg overflow-hidden border border-border mt-2">
                    {contactData.contactInfo.mapIframe ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: contactData.contactInfo.mapIframe,
                        }}
                        className="w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                        <p className="text-muted-foreground">
                          Insira um código de iframe válido para visualizar o
                          mapa
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContactEditor;
