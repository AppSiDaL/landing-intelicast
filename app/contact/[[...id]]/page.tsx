"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import WhatsAppForm from "@/components/whatsapp-form";

export default function ContactPage() {
  const params = useParams();
  // id is an array in an optional catch-all route [[...id]]
  const idArray = params.id as string[];
  const inviterId = idArray?.[0];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/mdm.svg"
                alt="Intelicast"
                width={50}
                height={50}
                className="h-5 w-auto"
                priority
              />
            </Link>
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Volver al Inicio
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <section className="relative flex-1 flex items-center justify-center overflow-hidden bg-linear-to-b from-background to-muted/20 py-12 lg:py-20">
          {/* Decorative background elements */}
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

          <div className="container mx-auto px-4 lg:px-8 w-full">
            <motion.div
              className="max-w-4xl mx-auto space-y-12"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              <motion.div variants={fadeInUp} className="text-center space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground text-balance">
                  Hablemos de tu{" "}
                  <span className="text-primary">Estrategia</span>
                </h1>
                <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                  Completa el formulario para conectarte directamente con
                  nuestro equipo a través de WhatsApp.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex justify-center w-full"
              >
                <WhatsAppForm inviterId={inviterId} />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer - Identical to main page */}
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
    </div>
  );
}
