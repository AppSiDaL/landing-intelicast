"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Target,
  Eye,
  TrendingUp,
  FileText,
  Menu,
  X,
  QrCode,
  Phone,
  Mail,
  Share2,
  BarChart3,
  LineChart,
  PieChart,
  Newspaper,
  Radio,
  Tv,
  Globe,
  Users,
  Search,
  Database,
  FileBarChart,
  Activity,
} from "lucide-react";
import ContactModal from "./contact-modal";
import QRModal from "./qr-modal";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    category: "01. Seguimiento y Evaluación",
    description:
      "Análisis sistemático derivado del procesamiento de información diario.",
    icon: Eye,
    services: [
      {
        name: "SGI - Sistema de Gestión Intélite",
        description:
          "Sitio web personalizable que integra, pondera y analiza información. Actualizaciones diarias: 24 horas / 365 días del año.",
      },
      {
        name: "Alertas",
        description:
          "Envío automático de notas monitoreadas en radio, televisión, web y redes sociales. Automáticas y personalizadas.",
      },
      {
        name: "Selecta Síntesis Informativa",
        description:
          "Resume la información de interés con base en criterios específicos, puede ser ejecutivo o exhaustivo.",
      },
      {
        name: "Auditoría Mediática",
        description:
          "Identifica el posicionamiento de imagen con diversos niveles de profundidad en medios de comunicación, líderes de opinión y líneas editoriales.",
      },
      {
        name: "Análisis de Redes Sociales",
        description:
          "Identifica el comportamiento en RRSS (Twitter, FB e Instagram), construyendo indicadores de penetración, alcance y temáticas principales.",
      },
      {
        name: "FODA",
        description:
          "Evaluación retrospectiva y situacional de las temáticas más relevantes para la definición y detección del FODA.",
      },
    ],
  },
  {
    category: "02. Diagnóstico",
    description:
      "Análisis retrospectivo dentro de la base de datos, el cual considera diferentes metodologías especializadas.",
    icon: Brain,
    services: [
      {
        name: "Diagnóstico Retrospectivo del Actor",
        description:
          "Posicionamiento actual del actor, comprensión del entorno, temas sensibles, áreas de oportunidad, resultados, contradicciones.",
      },
      {
        name: "Gestión y Evaluación de Resultados",
        description:
          "Catálogo de temas y línea de tiempo, identificando elementos que puedan trascender o mostrar importancia. Ofrecemos 3 tipos de perfiles: Ideológico, Regional y Temático.",
      },
    ],
  },
  {
    category: "03. Visión Estratégica y Posicionamiento",
    description:
      "Análisis que permite al actor posicionarse óptima y estratégicamente en su círculo de interés.",
    icon: Target,
    services: [
      {
        name: "INTELECTA",
        description:
          "Inteligencia planteada mediante el seguimiento periódico de campos de influencia que identifican temas de agenda, lecturas y elementos para generar alertas y sugerencias.",
      },
      {
        name: "Investigaciones Especiales",
        description:
          "Equipo de expertos que basados en nuestras metodologías y data, investigan y analizan los temas de interés específicos del cliente.",
      },
    ],
  },
];

export default function ServiceCatalog() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // Variantes de animación
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  // Iconos que representan la naturaleza de la empresa
  const iconTypes = [
    FileText,
    BarChart3,
    LineChart,
    PieChart,
    Newspaper,
    Radio,
    Tv,
    Globe,
    Users,
    Search,
    Database,
    FileBarChart,
    Activity,
    Brain,
    Target,
    Eye,
  ];

  // Generar partículas de documentos flotantes
  const floatingDocuments = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    icon: iconTypes[i % iconTypes.length],
    initialX: Math.random() * 100,
    duration: 15 + Math.random() * 10,
    delay: Math.random() * 5,
    size: 30 + Math.random() * 40,
    rotation: Math.random() * 360,
    opacity: 0.15 + Math.random() * 0.15,
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/intelicast-logo.png"
                alt="Intelicast"
                width={140}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowContact(true)}
                className="gap-2"
              >
                <Phone className="h-4 w-4" />
                Contacto
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowQR(true)}
                className="gap-2"
              >
                <QrCode className="h-4 w-4" />
                Código QR
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "Intelicast - Catálogo de Servicios",
                      text: "Conoce nuestros servicios de inteligencia estratégica",
                      url: window.location.href,
                    });
                  }
                }}
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Compartir
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden py-4 space-y-2 border-t border-border/40"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    setShowContact(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <Phone className="h-4 w-4" />
                  Contacto
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    setShowQR(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <QrCode className="h-4 w-4" />
                  Código QR
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: "Intelicast - Catálogo de Servicios",
                        text: "Conoce nuestros servicios de inteligencia estratégica",
                        url: window.location.href,
                      });
                    }
                    setIsMenuOpen(false);
                  }}
                >
                  <Share2 className="h-4 w-4" />
                  Compartir
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40 bg-linear-to-b from-background to-muted/20">
        {/* Documentos flotantes animados */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {floatingDocuments.map((doc) => {
            const IconComponent = doc.icon;
            return (
              <motion.div
                key={doc.id}
                className="absolute"
                style={{
                  left: `${doc.initialX}%`,
                  top: "-100px",
                }}
                animate={{
                  y: ["0vh", "120vh"],
                  x: [0, Math.sin(doc.id) * 80, 0],
                  rotate: [doc.rotation, doc.rotation + 360],
                }}
                transition={{
                  duration: doc.duration,
                  delay: doc.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <IconComponent
                  className="text-primary"
                  style={{
                    width: doc.size,
                    height: doc.size,
                    opacity: doc.opacity,
                    filter: "drop-shadow(0 0 2px rgba(0,0,0,0.1))",
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge
                variant="outline"
                className="border-primary/50 text-primary"
              >
                Catálogo de Servicios 2025
              </Badge>
            </motion.div>
            <motion.h2
              className="text-4xl lg:text-6xl font-bold text-balance leading-tight"
              variants={fadeInUp}
            >
              Transformamos información en{" "}
              <span className="text-primary">conocimiento</span>
            </motion.h2>
            <motion.p
              className="text-lg lg:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Inteligencia estratégica para la toma de decisiones mediante
              análisis especializado, monitoreo continuo y evaluación de
              resultados.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4 justify-center pt-4"
              variants={fadeInUp}
            >
              <Button
                size="lg"
                className="gap-2"
                onClick={() =>
                  document
                    .getElementById("servicios")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <FileText className="h-5 w-5" />
                Ver Servicios
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-transparent"
                onClick={() => setShowContact(true)}
              >
                <Phone className="h-5 w-5" />
                Contactar
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-16">
            {services.map((category, idx) => {
              const Icon = category.icon;
              return (
                <div key={idx} className="space-y-6">
                  {/* Category Header */}
                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                        {category.category}
                      </h3>
                      <p className="text-muted-foreground text-pretty leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Services Grid */}
                  <motion.div
                    className="grid md:grid-cols-2 gap-4 lg:gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    {category.services.map((service, serviceIdx) => (
                      <motion.div key={serviceIdx} variants={scaleIn}>
                        <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 group">
                          <motion.div
                            className="space-y-3"
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <h4 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                                {service.name}
                              </h4>
                              <Badge variant="secondary" className="shrink-0">
                                {String(serviceIdx + 1).padStart(2, "0")}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {service.description}
                            </p>
                          </motion.div>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 bg-linear-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-balance">
              Tu éxito es nuestro{" "}
              <span className="text-primary">compromiso</span>
            </h3>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Contáctanos para conocer cómo nuestros servicios pueden impulsar
              tu estrategia
            </p>
            <motion.div
              className="flex flex-wrap gap-4 justify-center pt-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Button
                size="lg"
                onClick={() => setShowContact(true)}
                className="gap-2"
              >
                <Mail className="h-5 w-5" />
                Solicitar Información
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowQR(true)}
                className="gap-2"
              >
                <QrCode className="h-5 w-5" />
                Ver Código QR
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/intelicast-logo.png"
                alt="Intelicast"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Intelicast. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ContactModal open={showContact} onOpenChange={setShowContact} />
      <QRModal open={showQR} onOpenChange={setShowQR} />
    </div>
  );
}
