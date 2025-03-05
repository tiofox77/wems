import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  features?: string[];
  buttonText?: string;
  buttonHref?: string;
}

const AboutSection = ({
  title = "Quem Somos",
  subtitle = "Mais Sobre A WEMS",
  description = "A WEMS, Lda, é uma empresa Angolana, que tem desenvolvido todo o seu portfólio e especialização na área das Tecnologias de Informação e Telecomunicações. Ao longo dos 13 anos, a empresa tem dado provas da sua competência, graças à capacidade de prestar serviços de alta qualidade numa área em constante desenvolvimento, onde a competitividade e a atualização são factores constantes.",
  imageUrl = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  features = [
    "Empresa especializada em Consultoria, Auditoria em Tecnologias de Informação e Telecomunicações",
    "Aposta na excelência dos serviços prestados, garantindo um alinhamento integral com a visão dos Clientes",
    "Potencia as estratégias, Privadas, Institucionais dos Clientes de acordo as reais necessidades",
    "Em sectores tão tecnológicos como este, a capacidade de fornecer soluções globais e a maximização do impacto da tecnologia no negócio dos clientes são postos à prova diariamente",
  ],
  buttonText = "Conheça Nossos Serviços",
  buttonHref = "#services",
}: AboutSectionProps) => {
  const [aboutData, setAboutData] = useState({
    title,
    subtitle,
    description,
    imageUrl,
    features,
    buttonText,
    buttonHref,
  });

  // Load about data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("wems_about");
    if (savedData) {
      setAboutData(JSON.parse(savedData));
    }
  }, []);

  return (
    <section
      className="w-full py-20 px-4 md:px-8 lg:px-16 bg-background"
      id="about"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-lg overflow-hidden"
          >
            <div className="aspect-w-4 aspect-h-3 lg:aspect-h-4">
              <img
                src={aboutData.imageUrl}
                alt="WEMS Team"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full z-0"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full z-0"></div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
                >
                  {aboutData.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-xl font-medium text-foreground/80 mb-4"
                >
                  {aboutData.subtitle}
                </motion.p>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-muted-foreground"
              >
                {aboutData.description}
              </motion.p>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="space-y-3 mt-6"
              >
                {aboutData.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-foreground/80">{feature}</p>
                  </div>
                ))}
              </motion.div>

              {/* Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <Button className="group" asChild>
                  <a href={aboutData.buttonHref}>
                    {aboutData.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
