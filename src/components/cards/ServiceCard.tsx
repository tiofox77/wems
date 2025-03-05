import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Server,
  Code,
  Shield,
  Network,
  Database,
  Mail,
  Laptop,
  Radio,
  Lock,
} from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  detailedInfo: string;
  features: string[];
  linkUrl?: string;
  linkText?: string;
}

const ServiceCard = ({
  title,
  description,
  icon,
  detailedInfo,
  features,
  linkUrl = "#",
  linkText = "Saiba mais",
}: ServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to render the appropriate icon component
  const renderIcon = () => {
    switch (icon) {
      case "Server":
        return <Server className="h-6 w-6 text-primary" />;
      case "Code":
        return <Code className="h-6 w-6 text-primary" />;
      case "Shield":
        return <Shield className="h-6 w-6 text-primary" />;
      case "Network":
        return <Network className="h-6 w-6 text-primary" />;
      case "Database":
        return <Database className="h-6 w-6 text-primary" />;
      case "Mail":
        return <Mail className="h-6 w-6 text-primary" />;
      case "Laptop":
        return <Laptop className="h-6 w-6 text-primary" />;
      case "Radio":
        return <Radio className="h-6 w-6 text-primary" />;
      case "Lock":
        return <Lock className="h-6 w-6 text-primary" />;
      default:
        return <Server className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.3, type: "spring" } }}
      className="h-full"
    >
      <Card
        className={`h-full border-2 ${isExpanded ? "border-primary" : "border-primary/10 hover:border-primary/30"} transition-all duration-300`}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-full bg-primary/10">{renderIcon()}</div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div layout className="space-y-4">
            <p className="text-muted-foreground">{description}</p>

            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 pt-2"
              >
                <p className="text-foreground/80">{detailedInfo}</p>

                <div className="space-y-2">
                  <h4 className="font-medium">Características:</h4>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            <div className="flex justify-between items-center pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80 p-0 hover:bg-transparent"
                asChild
              >
                <a href={linkUrl} className="flex items-center gap-1">
                  <span>{linkText}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={toggleExpand}
                className="ml-auto"
              >
                {isExpanded ? "Menos detalhes" : "Mais detalhes"}
              </Button>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
