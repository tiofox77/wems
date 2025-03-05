import React, { useEffect } from "react";
import { LogoProvider } from "./LogoProvider";
import Navbar from "./layout/Navbar";
import HeroSlider from "./sections/HeroSlider";
import ServicesSection from "./sections/ServicesSection";
import AboutSection from "./sections/AboutSection";
import MissionVisionSection from "./sections/MissionVisionSection";
import StrategicConsultingSection from "./sections/StrategicConsultingSection";
import ServiceExamplesSection from "./sections/ServiceExamplesSection";
import ClientsSection from "./ClientsSection";
import PartnersSection from "./sections/PartnersSection";
import ContactSection from "./sections/ContactSection";
import Footer from "./layout/Footer";

function Home() {
  // Initialize localStorage with default data if it doesn't exist
  useEffect(() => {
    // Check if we need to initialize the localStorage with default data
    const isFirstVisit = !localStorage.getItem("wems_initialized");

    // Initialize site logo if it doesn't exist
    if (!localStorage.getItem("wems_site_logo")) {
      localStorage.setItem(
        "wems_site_logo",
        JSON.stringify({ url: "/wems-logo.png" }),
      );
    }

    if (isFirstVisit) {
      // Mark as initialized
      localStorage.setItem("wems_initialized", "true");

      // Initialize default data for all sections if they don't exist
      if (!localStorage.getItem("wems_about")) {
        const defaultAbout = {
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
        localStorage.setItem("wems_about", JSON.stringify(defaultAbout));
      }

      if (!localStorage.getItem("wems_mission_vision")) {
        const defaultMissionVision = {
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
        localStorage.setItem(
          "wems_mission_vision",
          JSON.stringify(defaultMissionVision),
        );
      }

      if (!localStorage.getItem("wems_contact")) {
        const defaultContact = {
          title: "Entre em Contato",
          subtitle: "Estamos prontos para ajudar sua empresa a crescer",
          contactInfo: {
            address:
              "Rua Comandante Gika, Edifício Garden Towers, Torre B, 9º andar, Luanda, Angola",
            email: "info@wems.co.ao",
            phone: "+244 923 456 789",
            mapIframe:
              '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15770.46546490184!2d13.237484!3d-8.822063!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f15cdc8d2c7d%3A0x2cda2c08e6433fa3!2s56HP%2B5XH%2C%20Luanda%2C%20Angola!5e0!3m2!1spt-BR!2sus!4v1741163458487!5m2!1spt-BR!2sus" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
          },
        };
        localStorage.setItem("wems_contact", JSON.stringify(defaultContact));
      }

      // Initialize client categories if they don't exist
      if (!localStorage.getItem("wems_client_categories")) {
        const initialCategories = [
          {
            id: "institucionais",
            name: "Institucionais",
            clients: [
              {
                id: 1,
                name: "Ministério das Finanças",
                logo: "https://api.dicebear.com/7.x/initials/svg?seed=MF&backgroundColor=0369a1&fontFamily=Arial",
                description:
                  "Implementação de infraestrutura de rede e segurança",
              },
              {
                id: 2,
                name: "Ministério da Educação",
                logo: "https://api.dicebear.com/7.x/initials/svg?seed=ME&backgroundColor=0369a1&fontFamily=Arial",
                description:
                  "Sistema de gestão documental e comunicações unificadas",
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
                description:
                  "Consultoria estratégica e implementação de sistemas",
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
        localStorage.setItem(
          "wems_client_categories",
          JSON.stringify(initialCategories),
        );
      }
    }
  }, []);

  return (
    <LogoProvider>
      <div className="w-full min-h-screen bg-background">
        <Navbar />
        <HeroSlider />
        <AboutSection />
        <MissionVisionSection />
        <ServicesSection />
        <ServiceExamplesSection />
        <ClientsSection />
        <StrategicConsultingSection />
        <PartnersSection />
        <ContactSection />
        <Footer />
      </div>
    </LogoProvider>
  );
}

export default Home;
