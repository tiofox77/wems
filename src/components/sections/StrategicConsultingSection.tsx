import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Users,
  TrendingUp,
  ShieldCheck,
  DollarSign,
  Zap,
  Lightbulb,
  Heart,
  Eye,
} from "lucide-react";

interface StrategicConsultingProps {
  title?: string;
  subtitle?: string;
  points?: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
  }>;
}

// Helper function to encode any URLs or strings that might contain spaces
const encodeSpaces = (str: string): string => {
  return str.replace(/\s+/g, "+");
};

const StrategicConsultingSection = ({
  title = "Consultoria Estratégica",
  subtitle = "Soluções personalizadas para otimizar seus recursos e maximizar resultados",
  points = [
    {
      title: "Definição de Estratégias",
      description:
        "Definir estratégias e objectivos, alinhando os recursos actuais com os investimentos futuros, optimizando-os.",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
    },
    {
      title: "Minimização de Riscos",
      description:
        "Detectar carências actuando assim no sentido de minimizá-las, implementando processos de segurança e contenção.",
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    },
    {
      title: "Redução de Custos",
      description:
        "Optimização de recursos (equipamentos e capital Humano) para redução efetiva de custos operacionais.",
      icon: <DollarSign className="h-6 w-6 text-primary" />,
    },
    {
      title: "Alinhamento Tecnológico",
      description:
        "Alinhamento das TIC's aos Negócios, estudando as tendências tecnológicas para manter sua empresa competitiva.",
      icon: <Zap className="h-6 w-6 text-primary" />,
    },
    {
      title: "Colaboração",
      description:
        "Promover um ambiente propício à integração e a realização colectiva dos projectos e acções propostos, favorecendo a partilha de soluções e de conhecimento.",
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      title: "Sustentabilidade",
      description:
        "Assegurar que a informação, as acções e os recursos de TIC sejam economicamente viáveis, ambientalmente correctos, socialmente justos e culturalmente aceites.",
      icon: <Heart className="h-6 w-6 text-primary" />,
    },
    {
      title: "Inovação",
      description:
        "Promover um ambiente criativo, que propicie o desenvolvimento de acções inovadoras e soluções diferenciadas.",
      icon: <Lightbulb className="h-6 w-6 text-primary" />,
    },
    {
      title: "Transparência",
      description:
        "Incentivar a cultura da publicidade das acções governamentais, como honestidade e respeito, propiciando maior credibilidade à sociedade.",
      icon: <Eye className="h-6 w-6 text-primary" />,
    },
  ],
}: StrategicConsultingProps) => {
  // Ensure all text that might be used in URLs is properly encoded
  const encodedTitle = encodeSpaces(title);
  const encodedSubtitle = encodeSpaces(subtitle);

  // Process points to ensure all strings are properly encoded
  const processedPoints = points.map((point) => ({
    ...point,
    title: point.title, // Keep original for display
    description: point.description, // Keep original for display
    encodedTitle: encodeSpaces(point.title), // For any URL usage
  }));

  return (
    <section
      className="w-full py-20 px-4 md:px-8 lg:px-16 bg-slate-50 dark:bg-slate-900/50"
      id="strategic-consulting"
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
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processedPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-primary/5 hover:border-primary/20 transition-all duration-300 hover:shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-primary/10 mb-4">
                      {point.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {point.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {point.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategicConsultingSection;
