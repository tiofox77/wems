import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Save, Eye, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

interface MissionVisionData {
  missionTitle: string;
  missionPoints: string[];
  visionTitle: string;
  visionPoints: string[];
}

const MissionVisionEditor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("mission");
  const [isSaving, setIsSaving] = useState(false);

  // Initial mission and vision data
  const initialData: MissionVisionData = {
    missionTitle: "MISSÃO",
    missionPoints: [
      "Sermos vistos como parceiros activos pelos clientes, ao invés de um simples fornecedor de serviços e soluções.",
      "Ajudar no crescimento do País através do reforço e da empregabilidade dos quadros Nacionais no sector das TIC´s.",
      "Apostar na criação de valores Nacionais fomentando toda a actividade em território Nacional.",
    ],
    visionTitle: "VISÃO",
    visionPoints: [
      "Ser referência Nacional e Internacional pela excelência, Inovação e criatividade de novos serviços e soluções.",
      "Ser reconhecida pela: Estrutura leve e ágil",
      "Orientação para o Cliente",
      "Qualidade dos serviços e soluções",
      "Rentabilidade",
    ],
  };

  const [data, setData] = useState<MissionVisionData>(initialData);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("wems_mission_vision");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const handleTitleChange = (
    field: "missionTitle" | "visionTitle",
    value: string,
  ) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePointChange = (
    type: "mission" | "vision",
    index: number,
    value: string,
  ) => {
    const points =
      type === "mission" ? [...data.missionPoints] : [...data.visionPoints];
    points[index] = value;

    setData((prev) => ({
      ...prev,
      [type === "mission" ? "missionPoints" : "visionPoints"]: points,
    }));
  };

  const addPoint = (type: "mission" | "vision") => {
    if (type === "mission") {
      setData((prev) => ({
        ...prev,
        missionPoints: [...prev.missionPoints, ""],
      }));
    } else {
      setData((prev) => ({
        ...prev,
        visionPoints: [...prev.visionPoints, ""],
      }));
    }
  };

  const removePoint = (type: "mission" | "vision", index: number) => {
    if (type === "mission") {
      const updatedPoints = data.missionPoints.filter((_, i) => i !== index);
      setData((prev) => ({
        ...prev,
        missionPoints: updatedPoints,
      }));
    } else {
      const updatedPoints = data.visionPoints.filter((_, i) => i !== index);
      setData((prev) => ({
        ...prev,
        visionPoints: updatedPoints,
      }));
    }
  };

  const handleSave = () => {
    setIsSaving(true);

    // Save to localStorage
    localStorage.setItem("wems_mission_vision", JSON.stringify(data));

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
            <h1 className="text-3xl font-bold">Editor de Missão e Visão</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <a
                href="/#mission-vision"
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

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="mission">Missão</TabsTrigger>
            <TabsTrigger value="vision">Visão</TabsTrigger>
          </TabsList>

          <TabsContent value="mission">
            <Card>
              <CardHeader>
                <CardTitle>Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="missionTitle">Título da Missão</Label>
                    <Input
                      id="missionTitle"
                      value={data.missionTitle}
                      onChange={(e) =>
                        handleTitleChange("missionTitle", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Pontos da Missão</Label>
                    {data.missionPoints.map((point, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={point}
                          onChange={(e) =>
                            handlePointChange("mission", index, e.target.value)
                          }
                          placeholder={`Ponto ${index + 1}`}
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removePoint("mission", index)}
                          disabled={data.missionPoints.length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => addPoint("mission")}
                      className="w-full mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Ponto
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vision">
            <Card>
              <CardHeader>
                <CardTitle>Visão</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="visionTitle">Título da Visão</Label>
                    <Input
                      id="visionTitle"
                      value={data.visionTitle}
                      onChange={(e) =>
                        handleTitleChange("visionTitle", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Pontos da Visão</Label>
                    {data.visionPoints.map((point, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={point}
                          onChange={(e) =>
                            handlePointChange("vision", index, e.target.value)
                          }
                          placeholder={`Ponto ${index + 1}`}
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removePoint("vision", index)}
                          disabled={data.visionPoints.length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => addPoint("vision")}
                      className="w-full mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Ponto
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default MissionVisionEditor;
