import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { loadPartners, Partner } from "@/lib/localDb";

interface PartnersProps {
  title?: string;
  description?: string;
  partners?: Array<{
    name: string;
    logo: string;
  }>;
}

const PartnersSection = ({
  title = "Parceiros",
  description = "Em sectores tão tecnológicos como este, a capacidade de fornecer soluções globais e a maximização do impacto da tecnologia no negócio dos clientes são postos à prova diariamente, exigindo sempre melhor serviço, qualidade, atualização e oferta de um vasto leque de competências. Assim sendo estabelecemos parcerias com empresas líderes no mercado entendendo que desta forma, conseguimos minimizar riscos e fornecer aos nossos clientes soluções baseadas nas melhores tecnologias do mercado.",
  partners = [
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
    },
    {
      name: "Cisco",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png",
    },
    {
      name: "HP",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/1200px-HP_logo_2012.svg.png",
    },
    {
      name: "VMware",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Vmware.svg/1200px-Vmware.svg.png",
    },
    {
      name: "APC",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/APC_logo.svg/2560px-APC_logo.svg.png",
    },
    {
      name: "Veeam Backup",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Veeam_logo.svg/2560px-Veeam_logo.svg.png",
    },
    {
      name: "Kaspersky",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Kaspersky_logo.svg/2560px-Kaspersky_logo.svg.png",
    },
    {
      name: "Legrand",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Legrand_logo.svg/2560px-Legrand_logo.svg.png",
    },
    {
      name: "Proxmox",
      logo: "https://logovectorseek.com/wp-content/uploads/2021/10/proxmox-server-solutions-gmbh-logo-vector.png",
    },
    {
      name: "OPNsense",
      logo: "https://opnsense.org/wp-content/themes/OPNsense/assets/img/opnsense_logo.png",
    },
    {
      name: "Debian",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Openlogo-debianV2.svg/1200px-Openlogo-debianV2.svg.png",
    },
    {
      name: "Ubuntu",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/UbuntuCoF.svg/1200px-UbuntuCoF.svg.png",
    },
  ],
}: PartnersProps) => {
  const [partnersData, setPartnersData] = useState<Partner[]>([]);

  // Load partners from localStorage on component mount
  useEffect(() => {
    const savedPartners = loadPartners(
      partners.map((p, index) => ({ id: index + 1, ...p })),
    );
    setPartnersData(savedPartners);
  }, []);

  return (
    <section
      className="w-full py-20 px-4 md:px-8 lg:px-16 bg-slate-50 dark:bg-slate-900/50"
      id="partners"
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
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {partnersData.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="h-12 object-contain mb-4"
              />
              <p className="font-medium text-center">{partner.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
