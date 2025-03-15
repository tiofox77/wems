import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import ServiceCard from "@/components/cards/ServiceCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { loadServices, Service } from "@/lib/localDb";

interface ServicesProps {
  title?: string;
  subtitle?: string;
}

const ServicesSection = ({
  title = "Principais Serviços e Soluções",
  subtitle = "De forma a garantir a confiança e satisfação das necessidades dos nossos Clientes, cada vez mais exigentes, colocamos à sua disposição um conjunto diversificado de produtos e serviços de valor acrescentado e soluções integradas",
}: ServicesProps) => {
  const controls = useAnimation();
  const [visibleCards, setVisibleCards] = useState(6);
  const [hasMoreCards, setHasMoreCards] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initial services data for fallback
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

  // Load services from IndexedDB on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const savedServices = await loadServices(initialServices);
        setServices(savedServices);
      } catch (error) {
        console.error("Error loading services:", error);
        setServices(initialServices);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 },
    });

    setHasMoreCards(visibleCards < services.length);
  }, [controls, services.length, visibleCards]);

  const showMoreCards = () => {
    setVisibleCards((prev) => Math.min(prev + 3, services.length));
  };

  return (
    <section
      className="w-full py-20 px-4 md:px-8 lg:px-16 bg-background"
      id="services"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Carregando serviços...</p>
          </div>
        ) : (
          <>
            <motion.div
              animate={controls}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.slice(0, visibleCards).map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ServiceCard
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    detailedInfo={service.detailedInfo}
                    features={service.features}
                    linkUrl={`#${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                    linkText="Saiba mais"
                  />
                </motion.div>
              ))}
            </motion.div>

            {hasMoreCards && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="flex justify-center mt-12"
              >
                <Button
                  onClick={showMoreCards}
                  variant="outline"
                  className="group"
                >
                  <span>Ver Mais Serviços</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </section>
  );
};

export default ServicesSection;
