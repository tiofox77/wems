import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, CheckCircle } from "lucide-react";

interface MissionVisionProps {
  missionTitle?: string;
  missionPoints?: string[];
  visionTitle?: string;
  visionPoints?: string[];
}

const MissionVisionSection = ({
  missionTitle = "MISSÃO",
  missionPoints = [
    "Sermos vistos como parceiros activos pelos clientes, ao invés de um simples fornecedor de serviços e soluções.",
    "Ajudar no crescimento do País através do reforço e da empregabilidade dos quadros Nacionais no sector das TIC´s.",
    "Apostar na criação de valores Nacionais fomentando toda a actividade em território Nacional.",
  ],
  visionTitle = "VISÃO",
  visionPoints = [
    "Ser referência Nacional e Internacional pela excelência, Inovação e criatividade de novos serviços e soluções.",
    "Ser reconhecida pela: Estrutura leve e ágil",
    "Orientação para o Cliente",
    "Qualidade dos serviços e soluções",
    "Rentabilidade",
  ],
}: MissionVisionProps) => {
  const [data, setData] = useState({
    missionTitle,
    missionPoints,
    visionTitle,
    visionPoints,
  });

  // Load mission vision data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("wems_mission_vision");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  return (
    <section
      className="w-full py-20 px-4 md:px-8 lg:px-16 bg-background/50"
      id="mission-vision"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Nossa Missão e Visão
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça os valores que orientam nosso trabalho e nossa visão para o
            futuro
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-2 border-primary/10 hover:border-primary/30 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    {data.missionTitle}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.missionPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">{point}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-2 border-primary/10 hover:border-primary/30 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    {data.visionTitle}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.visionPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">{point}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
