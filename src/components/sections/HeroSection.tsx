import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import TechAnimation from "@/components/animations/TechAnimation";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonHref?: string;
  backgroundVariant?: "animation" | "gradient" | "image";
  backgroundImageUrl?: string;
  logoUrl?: string;
}

const HeroSection = ({
  title = "WEMS IT & Telecom Consulting",
  subtitle = "Innovative Solutions for Modern Businesses",
  description = "We provide expert IT and telecommunications consulting services to help your business thrive in the digital age. Our team of specialists delivers tailored solutions that drive growth and efficiency.",
  primaryButtonText = "Our Services",
  secondaryButtonText = "Contact Us",
  primaryButtonHref = "#services",
  secondaryButtonHref = "#contact",
  backgroundVariant = "animation",
  backgroundImageUrl = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80",
  logoUrl = "",
}: HeroSectionProps) => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full">
        {backgroundVariant === "animation" ? (
          <TechAnimation
            color="rgba(99, 102, 241, 0.8)"
            backgroundColor="rgba(15, 23, 42, 0.97)"
            density={40}
            speed={0.8}
          />
        ) : backgroundVariant === "gradient" ? (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-primary/30" />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          >
            <div className="absolute inset-0 bg-slate-900/70" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Logo */}
          {logoUrl && (
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
              />
            </motion.div>
          )}

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              {title}
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-xl md:text-2xl font-medium mb-6 text-primary-foreground/90">
              {subtitle}
            </p>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto text-primary-foreground/80">
              {description}
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-md transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <a href={primaryButtonHref}>{primaryButtonText}</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 text-white hover:bg-primary/20 font-medium px-6 py-2 rounded-md transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <a href={secondaryButtonHref}>{secondaryButtonText}</a>
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ duration: 2, delay: 1, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center">
              <span className="text-primary-foreground/60 text-sm mb-2">
                Scroll Down
              </span>
              <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-primary rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements - Angolan design influence */}
      <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 opacity-20">
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

      <div className="absolute bottom-0 right-0 w-40 h-40 md:w-64 md:h-64 opacity-20">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-primary"
        >
          <path
            fill="currentColor"
            d="M39.9,-65.7C54.1,-60,69.5,-53.8,77.9,-42.1C86.3,-30.4,87.6,-13.2,85.4,3C83.2,19.2,77.4,34.4,68.2,47.1C59,59.8,46.3,70,32.1,76.2C17.9,82.4,2.2,84.6,-13.9,83.1C-30,81.6,-46.5,76.4,-58.4,66.2C-70.3,56,-77.6,40.8,-81.7,24.9C-85.8,9,-86.7,-7.7,-82.6,-22.9C-78.5,-38.1,-69.3,-51.8,-56.8,-58.5C-44.3,-65.2,-28.5,-64.9,-14.4,-67.2C-0.3,-69.5,13.1,-74.4,25.7,-71.4C38.3,-68.5,50,-71.5,39.9,-65.7Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
