"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  Copy,
  CheckCircle2,
  User,
  Briefcase,
  Building2,
  ExternalLink,
  MessageCircle, // Added for WhatsApp icon
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactModal({
  open,
  onOpenChange,
}: ContactModalProps) {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail1, setCopiedEmail1] = useState(false);

  const copyToClipboard = async (
    text: string,
    type: "phone" | "email1"
  ) => {
    await navigator.clipboard.writeText(text);
    if (type === "phone") {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else if (type === "email1") {
      setCopiedEmail1(true);
      setTimeout(() => setCopiedEmail1(false), 2000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl flex items-center gap-2">
            <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            Información de Contacto
          </DialogTitle>
          <DialogDescription className="text-sm">
            Conecta directamente con nuestro equipo
          </DialogDescription>
        </DialogHeader>

        <motion.div
          className="space-y-4 sm:space-y-6 pt-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Card */}
          <motion.div
            className="p-4 sm:p-6 rounded-xl bg-linear-to-br from-primary/10 to-accent/10 border border-primary/20"
            variants={itemVariants}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <User className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              </div>
              <div className="flex-1 space-y-1 sm:space-y-2 min-w-0">
                <h3 className="font-bold text-lg sm:text-xl text-foreground wrap-break-words">
                  Rodolfo Sandoval Monroy
                </h3>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  <span>Presidente</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  <span>Intelite</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Teléfono */}
          <motion.div className="space-y-2 sm:space-y-3" variants={itemVariants}>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              </div>
              <span>Teléfono</span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <motion.a
                href="tel:+525551075025"
                className="flex-1 p-3 sm:p-4 rounded-lg bg-muted hover:bg-muted/70 transition-colors border border-border/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <p className="text-base sm:text-lg font-mono text-primary font-semibold text-center sm:text-left">
                  +52 55 5107 5025
                </p>
              </motion.a>
              <Button
                size="icon"
                variant="outline"
                onClick={() => copyToClipboard("+525551075025", "phone")}
                className="h-11 w-full sm:h-12 sm:w-12"
              >
                {copiedPhone ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
                <span className="sm:hidden ml-2">Copiar teléfono</span>
              </Button>
            </div>
          </motion.div>

          {/* Emails */}
          <motion.div className="space-y-2 sm:space-y-3" variants={itemVariants}>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              </div>
              <span>Correo Electrónico</span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <motion.a
                href="mailto:rsm@oblekco.com"
                className="flex-1 p-3 sm:p-4 rounded-lg bg-muted hover:bg-muted/70 transition-colors border border-border/50 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs sm:text-sm font-mono text-primary break-all">
                    rsm@oblekco.com
                  </p>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
              </motion.a>
              <Button
                size="icon"
                variant="outline"
                onClick={() => copyToClipboard("rsm@oblekco.com", "email1")}
                className="h-11 w-full sm:h-12 sm:w-12"
              >
                {copiedEmail1 ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
                <span className="sm:hidden ml-2">Copiar email</span>
              </Button>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-2" variants={itemVariants}>
            <Button className="flex-1 gap-2 h-11 sm:h-12 text-sm sm:text-base" asChild>
              <a href="tel:+525551075025">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                Llamar Ahora
              </a>
            </Button>
            <Button
              className="flex-1 gap-2 h-11 sm:h-12 bg-transparent text-sm sm:text-base"
              variant="outline"
              asChild
            >
              <a href="mailto:rsm@oblekco.com">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                Enviar Email
              </a>
            </Button>
            <Button className="flex-1 gap-2 h-11 sm:h-12 bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base" asChild>
              <a
                href="https://wa.me/525551075025"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                WhatsApp
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
