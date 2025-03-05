import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Trash2, Upload, Save, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { loadSlides, saveSlides, Slide } from "@/lib/localDb";
import { useToast } from "@/components/ui/use-toast";

const HeroEditor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("slide1");
  const [isSaving, setIsSaving] = useState(false);

  // Initial slide data
  const initialSlides = [
    {
      id: "slide1",
      title: "WEMS IT & Telecom Consulting",
      subtitle: "Consultoria, Auditoria em TI e Telecomunicações",
      description:
        "Empresa especializada em Consultoria, Auditoria em Tecnologias de Informação e Telecomunicações, apostando na excelência dos serviços prestados.",
      imageUrl:
        "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1200&q=80",
      buttonText: "Nossos Serviços",
      buttonHref: "#services",
    },
    {
      id: "slide2",
      title: "Soluções Personalizadas",
      subtitle: "Alinhamento Integral com a Visão dos Clientes",
      description:
        "Potenciamos as estratégias Privadas e Institucionais dos Clientes de acordo com as suas reais necessidades, garantindo resultados eficientes.",
      imageUrl:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80",
      buttonText: "Saiba Mais",
      buttonHref: "#about",
    },
    {
      id: "slide3",
      title: "25 Anos de Experiência",
      subtitle: "Competência Comprovada no Mercado Angolano",
      description:
        "Ao longo dos 25 anos, a WEMS tem dado provas da sua competência, prestando serviços de alta qualidade numa área em constante desenvolvimento.",
      imageUrl:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80",
      buttonText: "Conheça Nossa Equipe",
      buttonHref: "#about",
    },
    {
      id: "slide4",
      title: "Cibersegurança",
      subtitle: "Proteção Completa para sua Infraestrutura Digital",
      description:
        "Oferecemos soluções avançadas de cibersegurança para proteger seus dados e sistemas contra ameaças digitais, garantindo a continuidade dos seus negócios.",
      imageUrl:
        "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&q=80",
      buttonText: "Conheça Nossas Soluções",
      buttonHref: "#ciberseguranca",
    },
    {
      id: "slide5",
      title: "Telecomunicações",
      subtitle: "Conectividade Confiável para sua Empresa",
      description:
        "Implementamos soluções de telecomunicações de alta performance, incluindo redes corporativas, sistemas de comunicação via satélite e infraestrutura para áreas remotas.",
      imageUrl:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80",
      buttonText: "Explorar Serviços",
      buttonHref: "#telecomunicacoes",
    },
    {
      id: "slide6",
      title: "CCTV",
      subtitle: "Vigilância e Monitoramento Inteligente",
      description:
        "Sistemas de videovigilância IP de última geração para monitoramento em tempo real, garantindo a segurança física de suas instalações e colaboradores.",
      imageUrl:
        "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200&q=80",
      buttonText: "Ver Soluções",
      buttonHref: "#cctv",
    },
    {
      id: "slide7",
      title: "Sistemas de Backup",
      subtitle: "Proteção e Recuperação de Dados",
      description:
        "Soluções completas para backup e recuperação de dados, garantindo a continuidade dos seus negócios mesmo em situações críticas e prevenindo a perda de informações importantes.",
      imageUrl:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
      buttonText: "Saiba Mais",
      buttonHref: "#backup",
    },
  ];

  const [slides, setSlides] = useState<Slide[]>([]);

  // Load slides from localStorage on component mount
  useEffect(() => {
    const savedSlides = loadSlides(initialSlides);
    setSlides(savedSlides);
    if (savedSlides.length > 0) {
      setActiveTab(savedSlides[0].id);
    }
  }, []);

  const handleSlideChange = (id: string, field: string, value: string) => {
    const updatedSlides = slides.map((slide) =>
      slide.id === id ? { ...slide, [field]: value } : slide,
    );
    setSlides(updatedSlides);
  };

  const addNewSlide = () => {
    const newId = `slide${slides.length + 1}`;
    const newSlide = {
      id: newId,
      title: "Novo Slide",
      subtitle: "Subtítulo do Slide",
      description: "Descrição do novo slide.",
      imageUrl:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
      buttonText: "Botão",
      buttonHref: "#",
    };
    const updatedSlides = [...slides, newSlide];
    setSlides(updatedSlides);
    saveSlides(updatedSlides);
    setActiveTab(newId);
  };

  const deleteSlide = (id: string) => {
    if (slides.length <= 1) {
      toast({
        title: "Erro",
        description: "Não é possível excluir o único slide existente.",
        variant: "destructive",
      });
      return;
    }

    const newSlides = slides.filter((slide) => slide.id !== id);
    setSlides(newSlides);
    saveSlides(newSlides);
    setActiveTab(newSlides[0].id);

    toast({
      title: "Slide excluído",
      description: "O slide foi excluído com sucesso.",
    });
  };

  const handleSave = () => {
    setIsSaving(true);

    // Save to localStorage
    saveSlides(slides);

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
            <h1 className="text-3xl font-bold">Editor de Hero Slider</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <a href="/" target="_blank" className="flex items-center gap-2">
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Slide Navigation */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Slides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {slides.map((slide) => (
                  <Button
                    key={slide.id}
                    variant={activeTab === slide.id ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => setActiveTab(slide.id)}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{slide.title}</span>
                      <span className="text-xs text-muted-foreground truncate w-full">
                        {slide.subtitle}
                      </span>
                    </div>
                  </Button>
                ))}
                <Button
                  variant="outline"
                  className="w-full mt-4 border-dashed"
                  onClick={addNewSlide}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Slide
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Slide Editor */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Editar Slide</CardTitle>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteSlide(activeTab)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir Slide
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value={activeTab} className="mt-0">
                  {slides.map(
                    (slide) =>
                      slide.id === activeTab && (
                        <motion.div
                          key={slide.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="title">Título</Label>
                                <Input
                                  id="title"
                                  value={slide.title}
                                  onChange={(e) =>
                                    handleSlideChange(
                                      slide.id,
                                      "title",
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                              <div>
                                <Label htmlFor="subtitle">Subtítulo</Label>
                                <Input
                                  id="subtitle"
                                  value={slide.subtitle}
                                  onChange={(e) =>
                                    handleSlideChange(
                                      slide.id,
                                      "subtitle",
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                              <div>
                                <Label htmlFor="description">Descrição</Label>
                                <Textarea
                                  id="description"
                                  value={slide.description}
                                  onChange={(e) =>
                                    handleSlideChange(
                                      slide.id,
                                      "description",
                                      e.target.value,
                                    )
                                  }
                                  rows={3}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="buttonText">
                                    Texto do Botão
                                  </Label>
                                  <Input
                                    id="buttonText"
                                    value={slide.buttonText}
                                    onChange={(e) =>
                                      handleSlideChange(
                                        slide.id,
                                        "buttonText",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="buttonHref">
                                    Link do Botão
                                  </Label>
                                  <Input
                                    id="buttonHref"
                                    value={slide.buttonHref}
                                    onChange={(e) =>
                                      handleSlideChange(
                                        slide.id,
                                        "buttonHref",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="imageUrl">URL da Imagem</Label>
                                <Input
                                  id="imageUrl"
                                  value={slide.imageUrl}
                                  onChange={(e) =>
                                    handleSlideChange(
                                      slide.id,
                                      "imageUrl",
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                              <div className="mt-2">
                                <Label>Pré-visualização</Label>
                                <div className="mt-2 border rounded-md overflow-hidden aspect-video relative">
                                  <img
                                    src={slide.imageUrl}
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
                          </div>
                        </motion.div>
                      ),
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HeroEditor;
