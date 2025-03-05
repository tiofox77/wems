import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";
import { loadContactData, ContactData } from "@/lib/localDb";

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
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31603.45339484696!2d13.2187654!3d-8.8368338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f15cdc8d2c7d%3A0x850c1c5c5ecc5a92!2sLuanda%2C%20Angola!5e0!3m2!1sen!2sus!4v1653389034695!5m2!1sen!2sus",
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
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });

  // Load contact data from localStorage on component mount
  useEffect(() => {
    const defaultData = {
      title,
      subtitle,
      contactInfo,
    };
    const savedData = loadContactData(defaultData as ContactData);
    setContactData(savedData);
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

      // In a real application, you would send this to your backend
      // For this demo, we'll simulate an API call
      console.log("Sending email to carlosfox1782@gmail.com");
      console.log("Email content:", emailContent);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate successful submission
      setSubmitStatus({
        success: true,
        message:
          "Mensagem enviada com sucesso! Entraremos em contato em breve.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus({
        success: false,
        message:
          "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="w-full py-20 px-4 md:px-8 lg:px-16 bg-background"
      id="contact"
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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {contactData.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-card rounded-lg p-8 shadow-sm border border-border"
          >
            <h3 className="text-xl font-semibold mb-6">
              Envie-nos uma mensagem
            </h3>
            <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Assunto</Label>
                <Input
                  id="subject"
                  placeholder="Assunto da mensagem"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  placeholder="Sua mensagem aqui..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </Button>
              {submitStatus.message && (
                <div
                  className={`mt-4 p-3 rounded-md ${submitStatus.success ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}`}
                >
                  {submitStatus.message}
                </div>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold mb-6">
                Informações de Contato
              </h3>
              <div className="space-y-6">
                {contactData.contactInfo.address && (
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
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
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
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
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
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
            <div className="mt-8 h-64 rounded-lg overflow-hidden border border-border">
              {contactData.contactInfo.mapIframe ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: contactData.contactInfo.mapIframe,
                  }}
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                  <p className="text-muted-foreground">Mapa não disponível</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
