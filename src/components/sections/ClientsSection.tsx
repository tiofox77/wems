import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Droplet, Landmark, Briefcase, HardHat } from "lucide-react";

interface ClientsProps {
  title?: string;
  subtitle?: string;
  categories?: Array<{
    id: string;
    name: string;
    icon: React.ReactNode;
    clients: Array<{
      name: string;
      logo: string;
      description?: string;
    }>;
  }>;
}

const ClientsSection = ({
  title = "Nossos Clientes",
  subtitle = "Conheça algumas das empresas e instituições que confiam em nossas soluções",
  categories = [
    {
      id: "institucionais",
      name: "Institucionais",
      icon: <Building className="h-5 w-5" />,
      clients: [
        {
          name: "Ministério das Finanças",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=MF&backgroundColor=0369a1&fontFamily=Arial",
          description: "Implementação de infraestrutura de rede e segurança",
        },
        {
          name: "Ministério da Educação",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=ME&backgroundColor=0369a1&fontFamily=Arial",
          description: "Sistema de gestão documental e comunicações unificadas",
        },
        {
          name: "Instituto Nacional de Estatística",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=INE&backgroundColor=0369a1&fontFamily=Arial",
          description: "Consultoria estratégica e implementação de data center",
        },
        {
          name: "Assembleia Nacional",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=AN&backgroundColor=0369a1&fontFamily=Arial",
          description: "Soluções de telecomunicações e videoconferência",
        },
      ],
    },
    {
      id: "mineiros",
      name: "Mineiros",
      icon: <HardHat className="h-5 w-5" />,
      clients: [
        {
          name: "Catoca Mining",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=CM&backgroundColor=ca8a04&fontFamily=Arial",
          description: "Infraestrutura de rede para operações remotas",
        },
        {
          name: "Sociedade Mineira de Angola",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=SMA&backgroundColor=ca8a04&fontFamily=Arial",
          description: "Soluções de comunicação via satélite e segurança",
        },
        {
          name: "Endiama",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=END&backgroundColor=ca8a04&fontFamily=Arial",
          description: "Consultoria estratégica e implementação de data center",
        },
        {
          name: "Kimberlite Diamond",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=KD&backgroundColor=ca8a04&fontFamily=Arial",
          description: "Sistemas de comunicação e monitoramento remoto",
        },
      ],
    },
    {
      id: "petroliferas",
      name: "Petrolíferas",
      icon: <Droplet className="h-5 w-5" />,
      clients: [
        {
          name: "Sonangol",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=SON&backgroundColor=b91c1c&fontFamily=Arial",
          description: "Infraestrutura de rede e segurança corporativa",
        },
        {
          name: "Total E&P Angola",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=TEPA&backgroundColor=b91c1c&fontFamily=Arial",
          description: "Soluções de comunicação e data center",
        },
        {
          name: "BP Angola",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=BPA&backgroundColor=b91c1c&fontFamily=Arial",
          description: "Consultoria em TI e implementação de sistemas",
        },
        {
          name: "Esso Angola",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=EA&backgroundColor=b91c1c&fontFamily=Arial",
          description: "Soluções de telecomunicações e segurança",
        },
      ],
    },
    {
      id: "bancos",
      name: "Bancos e Seguros",
      icon: <Landmark className="h-5 w-5" />,
      clients: [
        {
          name: "Banco Nacional de Angola",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=BNA&backgroundColor=4338ca&fontFamily=Arial",
          description: "Infraestrutura de segurança e data center",
        },
        {
          name: "Banco BAI",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=BAI&backgroundColor=4338ca&fontFamily=Arial",
          description: "Soluções de comunicação e segurança de dados",
        },
        {
          name: "ENSA Seguros",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=ENSA&backgroundColor=4338ca&fontFamily=Arial",
          description: "Implementação de sistemas e consultoria",
        },
        {
          name: "Banco BIC",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=BIC&backgroundColor=4338ca&fontFamily=Arial",
          description: "Infraestrutura de rede e comunicações unificadas",
        },
      ],
    },
    {
      id: "empresas",
      name: "Empresas",
      icon: <Briefcase className="h-5 w-5" />,
      clients: [
        {
          name: "UNITEL",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=UNI&backgroundColor=065f46&fontFamily=Arial",
          description: "Consultoria estratégica e implementação de sistemas",
        },
        {
          name: "TAAG",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=TAAG&backgroundColor=065f46&fontFamily=Arial",
          description: "Soluções de comunicação e segurança",
        },
        {
          name: "Grupo Refriango",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=GR&backgroundColor=065f46&fontFamily=Arial",
          description: "Infraestrutura de rede e data center",
        },
        {
          name: "Grupo Castel",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=GC&backgroundColor=065f46&fontFamily=Arial",
          description: "Implementação de sistemas e consultoria",
        },
      ],
    },
  ],
}: ClientsProps) => {
  const [activeTab, setActiveTab] = useState(categories[0].id);

  return (
    <section
      className="w-full py-20 px-4 md:px-8 lg:px-16 bg-background"
      id="clients"
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
          defaultValue={categories[0].id}
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-12">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2"
              >
                {category.icon}
                <span>{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {category.clients.map((client, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-6 flex flex-col items-center text-center">
                      <div className="w-20 h-20 mb-4 rounded-full overflow-hidden">
                        <img
                          src={client.logo}
                          alt={`${client.name} logo`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{client.name}</h3>
                      {client.description && (
                        <p className="text-sm text-muted-foreground">
                          {client.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ClientsSection;
