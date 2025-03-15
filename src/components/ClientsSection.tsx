import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { loadClientCategories, ClientCategory } from "@/lib/localDb";
import { Loader2 } from "lucide-react";

interface ClientsSectionProps {
  title?: string;
  subtitle?: string;
}

const ClientsSection = ({
  title = "Nossos Clientes",
  subtitle = "Empresas e instituições que confiam em nossos serviços",
}: ClientsSectionProps) => {
  const [categories, setCategories] = useState<ClientCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial categories and clients data
  const initialCategories = [
    {
      id: "institucionais",
      name: "Institucionais",
      clients: [
        {
          id: 1,
          name: "Ministério das Finanças",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=MF&backgroundColor=0369a1&fontFamily=Arial",
          description: "Implementação de infraestrutura de rede e segurança",
        },
        {
          id: 2,
          name: "Ministério da Educação",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=ME&backgroundColor=0369a1&fontFamily=Arial",
          description: "Sistema de gestão documental e comunicações unificadas",
        },
      ],
    },
    {
      id: "mineiros",
      name: "Mineiros",
      clients: [
        {
          id: 3,
          name: "Catoca Mining",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=CM&backgroundColor=ca8a04&fontFamily=Arial",
          description: "Infraestrutura de rede para operações remotas",
        },
        {
          id: 4,
          name: "Sociedade Mineira de Angola",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=SMA&backgroundColor=ca8a04&fontFamily=Arial",
          description: "Soluções de comunicação via satélite e segurança",
        },
      ],
    },
    {
      id: "petroliferas",
      name: "Petrolíferas",
      clients: [
        {
          id: 5,
          name: "Sonangol",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=SON&backgroundColor=b91c1c&fontFamily=Arial",
          description: "Infraestrutura de rede e segurança corporativa",
        },
        {
          id: 6,
          name: "Total E&P Angola",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=TEPA&backgroundColor=b91c1c&fontFamily=Arial",
          description: "Soluções de comunicação e data center",
        },
      ],
    },
    {
      id: "bancos",
      name: "Bancos e Seguros",
      clients: [
        {
          id: 7,
          name: "Banco Nacional de Angola",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=BNA&backgroundColor=4338ca&fontFamily=Arial",
          description: "Infraestrutura de segurança e data center",
        },
        {
          id: 8,
          name: "Banco BAI",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=BAI&backgroundColor=4338ca&fontFamily=Arial",
          description: "Soluções de comunicação e segurança de dados",
        },
      ],
    },
    {
      id: "empresas",
      name: "Empresas",
      clients: [
        {
          id: 9,
          name: "UNITEL",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=UNI&backgroundColor=065f46&fontFamily=Arial",
          description: "Consultoria estratégica e implementação de sistemas",
        },
        {
          id: 10,
          name: "TAAG",
          logo: "https://api.dicebear.com/7.x/initials/svg?seed=TAAG&backgroundColor=065f46&fontFamily=Arial",
          description: "Soluções de comunicação e segurança",
        },
      ],
    },
  ];

  // Load client categories from localStorage on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const savedCategories = await loadClientCategories(initialCategories);
        setCategories(savedCategories);
        if (savedCategories.length > 0) {
          setActiveCategory(savedCategories[0].id);
        }
      } catch (err) {
        console.error("Error loading client categories:", err);
        setError("Erro ao carregar categorias de clientes");
        setCategories(initialCategories);
        if (initialCategories.length > 0) {
          setActiveCategory(initialCategories[0].id);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <section
        className="w-full py-20 px-4 md:px-8 lg:px-16 bg-slate-50 dark:bg-slate-900/50"
        id="clients"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Carregando clientes...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section
        className="w-full py-20 px-4 md:px-8 lg:px-16 bg-slate-50 dark:bg-slate-900/50"
        id="clients"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>
          <div className="text-center py-12 text-red-500">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Check if categories is empty or not an array
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return (
      <section
        className="w-full py-20 px-4 md:px-8 lg:px-16 bg-slate-50 dark:bg-slate-900/50"
        id="clients"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum cliente encontrado</p>
          </div>
        </div>
      </section>
    );
  }

  // Find the active category
  const activeClientCategory = categories.find(
    (cat) => cat.id === activeCategory,
  );

  return (
    <section
      className="w-full py-20 px-4 md:px-8 lg:px-16 bg-slate-50 dark:bg-slate-900/50"
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

        {/* Category Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category.id ? "bg-primary text-white" : "bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700"}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Clients Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {activeClientCategory &&
            activeClientCategory.clients &&
            activeClientCategory.clients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-4 bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg mb-2">{client.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {client.description}
                </p>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;
