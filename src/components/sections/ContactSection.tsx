import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  Mail,
  MapPin,
  Phone,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  contactInfo?: {
    address?: string;
    email?: string;
    phone?: string;
    mapIframe?: string;
  };
}

const ContactSection = ({
  title = "Entre em Contato",
  subtitle = "Estamos prontos para ajudar sua empresa a crescer",
  contactInfo = {
    address:
      "Rua Comandante Gika, Edifício Garden Towers, Torre B, 9º andar, Luanda, Angola",
    email: "info@wems.co.ao",
    phone: "+244 923 456 789",
    mapIframe:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31603.45339484696!2d13.2187654!3d-8.8368338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f15cdc8d2c7d%3A0x850c1c5c5ecc5a92!2sLuanda,+Angola!5e0!3m2!1sen!2sus!4v1653389034695!5m2!1sen!2sus",
  },
}: ContactSectionProps) => {
  const [contactData, setContactData] = useState({
    title,
    subtitle,
    contactInfo,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });

  // Load contact data from localStorage on component mount
  useEffect(() => {
    const fetchContactData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Try to load from localStorage first as a fallback
        const localData = localStorage.getItem("wems_contact");
        if (localData) {
          try {
            const parsedData = JSON.parse(localData);
            if (parsedData && parsedData.contactInfo) {
              setContactData(parsedData);
              setIsLoading(false);
              return;
            }
          } catch (e) {
            console.error("Error parsing contact data from localStorage:", e);
          }
        }

        // If no data in localStorage, use default data
        setContactData({
          title,
          subtitle,
          contactInfo,
        });
      } catch (err) {
        console.error("Error loading contact data:", err);
        setError("Erro ao carregar dados de contato");
        // Keep the default data if there's an error
        setContactData({
          title,
          subtitle,
          contactInfo,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactData();
  }, [title, subtitle, contactInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: "" });

    try {
      // Create email content
      const emailContent = `
        Nome: ${formData.name}
        Email: ${formData.email}
        Assunto: ${formData.subject}
        Mensagem: ${formData.message}
      `;

      // Simulate sending email
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, just log the email content
      console.log("Email content:", emailContent);

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Show success message
      setSubmitStatus({
        success: true,
        message:
          "Mensagem enviada com sucesso! Entraremos em contato em breve.",
      });
    } catch (err) {
      console.error("Error sending message:", err);
      setSubmitStatus({
        success: false,
        message: "Erro ao enviar mensagem. Por favor, tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section
      id="contact"
      className="w-full py-20 px-4 md:px-8 lg:px-16 bg-white dark:bg-slate-900"
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
            {contactData.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {contactData.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 md:p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Envie uma mensagem</h3>

            {submitStatus.message && (
              <div
                className={`mb-6 p-4 rounded-md ${
                  submitStatus.success
                    ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                }`}
              >
                <div className="flex items-center">
                  {submitStatus.success ? (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-2" />
                  )}
                  <p>{submitStatus.message}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Seu nome"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu.email@exemplo.com"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Assunto</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Assunto da mensagem"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Sua mensagem"
                  rows={5}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar Mensagem"
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 md:p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6">
                Informações de Contato
              </h3>

              <div className="space-y-6">
                {contactData.contactInfo.address && (
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Endereço</h4>
                      <p className="text-muted-foreground">
                        {contactData.contactInfo.address}
                      </p>
                    </div>
                  </div>
                )}

                {contactData.contactInfo.email && (
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <a
                        href={`mailto:${contactData.contactInfo.email}`}
                        className="text-primary hover:underline"
                      >
                        {contactData.contactInfo.email}
                      </a>
                    </div>
                  </div>
                )}

                {contactData.contactInfo.phone && (
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Telefone</h4>
                      <a
                        href={`tel:${contactData.contactInfo.phone}`}
                        className="text-primary hover:underline"
                      >
                        {contactData.contactInfo.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Map */}
            {contactData.contactInfo.mapIframe && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden h-[300px]">
                <iframe
                  src={
                    contactData.contactInfo.mapIframe
                      ? encodeURI(contactData.contactInfo.mapIframe)
                      : ""
                  }
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="WEMS Location Map"
                ></iframe>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
