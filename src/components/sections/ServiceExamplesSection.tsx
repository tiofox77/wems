import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Server,
  Code,
  Shield,
  Network,
  Database,
  Laptop,
} from "lucide-react";

interface ServiceExampleProps {
  title?: string;
  subtitle?: string;
  examples?: Array<{
    id: string;
    title: string;
    icon: React.ReactNode;
    description: string;
    features: string[];
    image: string;
  }>;
}

const ServiceExamplesSection = ({
  title = "Exemplos de Projetos",
  subtitle = "Conheça alguns exemplos de projetos e soluções que implementamos para nossos clientes",
  examples = [
    {
      id: "infraestrutura",
      title: "Infraestrutura de Rede",
      icon: <Network className="h-6 w-6 text-primary" />,
      description:
        "Implementação de infraestrutura de rede completa para empresa de médio porte, incluindo cablagem estruturada, equipamentos ativos e segurança.",
      features: [
        "Cablagem estruturada CAT6A para 120 pontos de rede",
        "Implementação de switches gerenciáveis com VLANs",
        "Firewall com IPS/IDS e VPN para acesso remoto",
        "Wireless corporativo com controle de acesso",
        "Monitoramento e gestão centralizada",
      ],
      image:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
    },
    {
      id: "datacenter",
      title: "Data Center",
      icon: <Server className="h-6 w-6 text-primary" />,
      description:
        "Projeto e implementação de data center para instituição financeira, com alta disponibilidade, redundância e segurança física e lógica.",
      features: [
        "Infraestrutura redundante (energia, refrigeração, conectividade)",
        "Virtualização de servidores com Proxmox",
        "Solução de backup e disaster recovery",
        "Monitoramento 24/7 com alertas",
        "Segurança física e lógica integradas",
      ],
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    },
    {
      id: "software",
      title: "Desenvolvimento de Software",
      icon: <Code className="h-6 w-6 text-primary" />,
      description:
        "Desenvolvimento de sistema de gestão documental personalizado para órgão governamental, com workflow e assinatura digital.",
      features: [
        "Interface intuitiva e responsiva",
        "Workflow de aprovação configurável",
        "Integração com assinatura digital",
        "Busca avançada e indexação de documentos",
        "Controle de acesso baseado em perfis",
      ],
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    },
    {
      id: "seguranca",
      title: "Segurança da Informação",
      icon: <Shield className="h-6 w-6 text-primary" />,
      description:
        "Implementação de solução completa de segurança da informação para empresa multinacional, incluindo políticas, ferramentas e treinamento.",
      features: [
        "Análise de vulnerabilidades e testes de penetração",
        "Implementação de firewall de próxima geração",
        "Solução de DLP (Data Loss Prevention)",
        "Treinamento de conscientização para funcionários",
        "Monitoramento contínuo e resposta a incidentes",
      ],
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    },
    {
      id: "banco-dados",
      title: "Banco de Dados",
      icon: <Database className="h-6 w-6 text-primary" />,
      description:
        "Migração e otimização de banco de dados para empresa de varejo, melhorando performance e implementando alta disponibilidade.",
      features: [
        "Migração de Oracle para PostgreSQL",
        "Implementação de cluster de alta disponibilidade",
        "Otimização de queries e índices",
        "Backup automatizado com retenção configurável",
        "Monitoramento de performance e alertas",
      ],
      image:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
    },
    {
      id: "treinamento",
      title: "Treinamento Técnico",
      icon: <Laptop className="h-6 w-6 text-primary" />,
      description:
        "Programa de capacitação técnica para equipe de TI de grande empresa, incluindo certificações e treinamentos práticos.",
      features: [
        "Treinamento em administração de redes Cisco",
        "Capacitação em virtualização com Proxmox",
        "Curso de segurança da informação",
        "Workshops práticos de resolução de problemas",
        "Preparação para certificações internacionais",
      ],
      image:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    },
  ],
}: ServiceExampleProps) => {
  const [activeTab, setActiveTab] = useState(examples[0].id);

  return (
    <section
      className="w-full py-20 px-4 md:px-8 lg:px-16 bg-slate-50 dark:bg-slate-900/50"
      id="examples"
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

        <Tabs
          defaultValue={examples[0].id}
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
            {examples.map((example) => (
              <TabsTrigger
                key={example.id}
                value={example.id}
                className="flex items-center gap-2"
              >
                {example.icon}
                <span className="hidden md:inline">{example.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {examples.map((example) => (
            <TabsContent key={example.id} value={example.id} className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-4">{example.title}</h3>
                  <p className="text-muted-foreground mb-6">
                    {example.description}
                  </p>

                  <div className="space-y-3">
                    {example.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary text-xs font-bold">
                            {index + 1}
                          </span>
                        </div>
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>

                  <Button className="mt-8 group">
                    <span>Solicitar Orçamento</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={example.image}
                    alt={example.title}
                    className="w-full h-full object-cover aspect-video"
                  />
                </motion.div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ServiceExamplesSection;
