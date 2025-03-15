import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { loadSlides, Slide } from "@/lib/localDb";
import { useLogo } from "@/components/LogoProvider";

interface HeroSliderProps {
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
}

const HeroSlider = ({
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = true,
}: HeroSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { logoUrl } = useLogo();

  // Initial slide data for fallback
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

  // Load slides from localStorage on component mount
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setIsLoading(true);
        const savedSlides = await loadSlides(initialSlides);
        setSlides(savedSlides);
      } catch (error) {
        console.error("Error loading slides:", error);
        setSlides(initialSlides);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying && slides.length > 0) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, autoPlayInterval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, autoPlayInterval, slides.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after a brief pause
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  if (isLoading || slides.length === 0) {
    return (
      <div className="h-screen bg-slate-900 flex items-center justify-center text-white">
        Carregando...
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-background"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={slide.id}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.imageUrl})` }}
                >
                  <div className="absolute inset-0 bg-slate-900/60" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="max-w-4xl mx-auto"
                  >
                    {/* Logo */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex justify-center mb-8"
                    >
                      <img
                        src={logoUrl}
                        alt="WEMS Logo"
                        className="h-20 md:h-24"
                        width="auto"
                        height="auto"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/wems-logo.png";
                        }}
                      />
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {slide.title}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                      className="text-xl md:text-2xl font-medium mb-6 text-primary-foreground/90"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      {slide.subtitle}
                    </motion.p>

                    {/* Description */}
                    <motion.p
                      className="text-base md:text-lg mb-8 max-w-2xl mx-auto text-primary-foreground/80"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      {slide.description}
                    </motion.p>

                    {/* Button */}
                    {slide.buttonText && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        <Button
                          size="lg"
                          className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-md transition-all duration-300 transform hover:scale-105"
                          asChild
                        >
                          <a href={slide.buttonHref}>{slide.buttonText}</a>
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ),
        )}
      </AnimatePresence>

      {/* Navigation Controls */}
      {showControls && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 z-20"
            onClick={goToPrevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 z-20"
            onClick={goToNextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </Button>
        </>
      )}

      {/* Slide Indicators */}
      {showIndicators && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-primary w-6" : "bg-white/50 hover:bg-white/80"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Angolan-inspired decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 opacity-20 pointer-events-none">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-primary"
        >
          <path
            fill="currentColor"
            d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90.2,-16.3,88.8,-0.8C87.4,14.7,81.8,29.3,73.6,42.5C65.3,55.7,54.5,67.3,41.3,74.3C28.2,81.3,14.1,83.6,-0.7,84.8C-15.5,86,-31,86.1,-43.8,79.7C-56.6,73.3,-66.8,60.3,-74.2,46.3C-81.7,32.3,-86.5,16.2,-86.9,-0.2C-87.3,-16.6,-83.3,-33.2,-74.6,-46.9C-65.8,-60.6,-52.3,-71.3,-37.8,-78.1C-23.3,-84.9,-7.7,-87.8,4.1,-94.8C15.8,-101.8,30.5,-83.7,44.7,-76.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSlider;
