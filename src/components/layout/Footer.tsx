import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { useLogo } from "@/components/LogoProvider";

interface FooterProps {
  logo?: React.ReactNode;
  companyName?: string;
  description?: string;
  address?: string;
  email?: string;
  phone?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  quickLinks?: Array<{ label: string; href: string }>;
  services?: Array<{ label: string; href: string }>;
}

const Footer = ({
  logo,

  companyName = "WEMS, Lda",
  description = "Fornecendo soluções inovadoras de TI e telecomunicações para empresas em Angola e além.",
  address = "Rua Comandante Gika, Edifício Garden Towers, Torre B, 9º andar, Luanda, Angola",
  email = "info@wems.co.ao",
  phone = "+244 923 456 789",
  socialLinks = {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
  quickLinks = [
    { label: "Home", href: "#" },
    { label: "Sobre Nós", href: "#about" },
    { label: "Serviços", href: "#services" },
    { label: "Contato", href: "#contact" },
    { label: "Política de Privacidade", href: "#privacy" },
  ],
  services = [
    { label: "Consultoria em TI", href: "#it-consulting" },
    { label: "Soluções de Telecomunicações", href: "#telecom" },
    { label: "Desenvolvimento de Software", href: "#software" },
    { label: "Gestão de Dados", href: "#data" },
    { label: "Cibersegurança", href: "#security" },
  ],
}: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const { logoUrl } = useLogo();

  // Create logo element with loaded URL
  const logoElement = logo || (
    <div className="flex items-center gap-2">
      <img
        src={logoUrl}
        alt="WEMS Logo"
        className="h-12"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/wems-logo.png";
        }}
      />
    </div>
  );

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <a href="#" className="inline-block">
              {logoElement}
            </a>
            <p className="text-slate-300 text-sm">{description}</p>
            <div className="flex space-x-4">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              )}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">
              Nossos Serviços
            </h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-slate-300 hover:text-primary transition-colors text-sm"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin
                  size={18}
                  className="text-primary mt-0.5 flex-shrink-0"
                />
                <span className="text-slate-300 text-sm">{address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="text-slate-300 hover:text-primary transition-colors text-sm"
                >
                  {email}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <a
                  href={`tel:${phone}`}
                  className="text-slate-300 hover:text-primary transition-colors text-sm"
                >
                  {phone}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © {currentYear} {companyName}. Todos os direitos reservados.
            </p>
            <p className="text-slate-400 text-sm mt-2 md:mt-0">
              Desenvolvido com ❤️ em Angola
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
