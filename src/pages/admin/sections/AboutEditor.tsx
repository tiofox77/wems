import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Eye, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  features: string[];
  buttonText: string;
  buttonHref: string;
}

const AboutEditor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  // Initial about data
  const initialAboutData: AboutData = {
    title: "Quem Somos",
    subtitle: "Mais Sobre A WEMS",
    description:
      "A WEMS, Lda, é uma empresa Angolana, que tem desenvolvido todo o seu portfólio e especialização na área das Tecnologias de Informação e Telecomunicações. Ao longo dos 13 anos, a empresa tem dado provas da sua competência, graças à capacidade de prestar serviços de alta qualidade numa área em constante desenvolvimento, onde a competitividade e a atualização são factores constantes.",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    features: [
      "Empresa especializada em Consultoria, Auditoria em Tecnologias de Informação e Telecomunicações",
      "Aposta na excelência dos serviços prestados, garantindo um alinhamento integral com a visão dos Clientes",
      "Potencia as estratégias, Privadas, Institucionais dos Clientes de acordo as reais necessidades",
      "Em sectores tão tecnológicos como este, a capacidade de fornecer soluções globais e a maximização do impacto da tecnologia no negócio dos clientes são postos à prova diariamente",
    ],
    buttonText: "Conheça Nossos Serviços",
    buttonHref: "#services",
  };

  const [aboutData, setAboutData] = useState<AboutData>(initialAboutData);

  // Load about data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("wems_about");
    if (savedData) {
      setAboutData(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (field: keyof AboutData, value: string) => {
    setAboutData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...aboutData.features];
    updatedFeatures[index] = value;
    setAboutData((prev) => ({
      ...prev,
      features: updatedFeatures,
    }));
  };

  const addFeature = () => {
    setAboutData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = aboutData.features.filter((_, i) => i !== index);
    setAboutData((prev) => ({
      ...prev,
      features: updatedFeatures,
    }));
  };

  const handleSave = () => {
    setIsSaving(true);

    // Save to localStorage
    localStorage.setItem("wems_about", JSON.stringify(aboutData));

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
            <h1 className="text-3xl font-bold">Editor de Quem Somos</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <a
                href="/#about"
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
          {/* Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo</CardTitle>
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
                    value={aboutData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle">Subtítulo</Label>
                  <Input
                    id="subtitle"
                    value={aboutData.subtitle}
                    onChange={(e) =>
                      handleInputChange("subtitle", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={aboutData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={5}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="buttonText">Texto do Botão</Label>
                    <Input
                      id="buttonText"
                      value={aboutData.buttonText}
                      onChange={(e) =>
                        handleInputChange("buttonText", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="buttonHref">Link do Botão</Label>
                    <Input
                      id="buttonHref"
                      value={aboutData.buttonHref}
                      onChange={(e) =>
                        handleInputChange("buttonHref", e.target.value)
                      }
                    />
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>

          {/* Image Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Imagem</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="imageUrl">URL da Imagem</Label>
                  <Input
                    id="imageUrl"
                    value={aboutData.imageUrl}
                    onChange={(e) =>
                      handleInputChange("imageUrl", e.target.value)
                    }
                  />
                </div>
                <div className="mt-2">
                  <Label>Pré-visualização</Label>
                  <div className="mt-2 border rounded-md overflow-hidden aspect-video relative">
                    <img
                      src={aboutData.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/600x400?text=Imagem+não+encontrada";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button variant="secondary">
                        <Upload className="h-4 w-4 mr-2" />
                        Trocar Imagem
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Editor */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Características</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aboutData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
                      placeholder={`Característica ${index + 1}`}
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeFeature(index)}
                      disabled={aboutData.features.length <= 1}
                    >
                      &times;
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addFeature}
                  className="w-full mt-2"
                >
                  Adicionar Característica
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AboutEditor;
