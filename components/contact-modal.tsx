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
  MapPin,
  ExternalLink,
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
  const [copiedEmail2, setCopiedEmail2] = useState(false);

  const copyToClipboard = async (
    text: string,
    type: "phone" | "email1" | "email2"
  ) => {
    await navigator.clipboard.writeText(text);
    if (type === "phone") {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else if (type === "email1") {
      setCopiedEmail1(true);
      setTimeout(() => setCopiedEmail1(false), 2000);
    } else {
      setCopiedEmail2(true);
      setTimeout(() => setCopiedEmail2(false), 2000);
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            Información de Contacto
          </DialogTitle>
          <DialogDescription>
            Conecta directamente con nuestro equipo
          </DialogDescription>
        </DialogHeader>

        <motion.div
          className="space-y-6 pt-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Card */}
          <motion.div
            className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
            variants={itemVariants}
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-bold text-xl text-foreground">
                  Rodolfo Sandoval Monroy
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span>Presidente</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Intelicast</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Teléfono */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <span>Teléfono</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.a
                href="tel:+525551075025"
                className="flex-1 p-4 rounded-lg bg-muted hover:bg-muted/70 transition-colors border border-border/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <p className="text-lg font-mono text-primary font-semibold">
                  +52 55 5107 5025
                </p>
              </motion.a>
              <Button
                size="icon"
                variant="outline"
                onClick={() => copyToClipboard("+525551075025", "phone")}
                className="h-12 w-12"
              >
                {copiedPhone ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </Button>
            </div>
          </motion.div>

          {/* Emails */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <span>Correos Electrónicos</span>
            </div>

            <div className="flex items-center gap-2">
              <motion.a
                href="mailto:rodolfo.sandoval@intelicast.net"
                className="flex-1 p-4 rounded-lg bg-muted hover:bg-muted/70 transition-colors border border-border/50 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-mono text-primary break-all">
                    rodolfo.sandoval@intelicast.net
                  </p>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                </div>
              </motion.a>
              <Button
                size="icon"
                variant="outline"
                onClick={() =>
                  copyToClipboard("rodolfo.sandoval@intelicast.net", "email1")
                }
                className="h-12 w-12"
              >
                {copiedEmail1 ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <motion.a
                href="mailto:rodolfosandovalmonroy@gmail.com"
                className="flex-1 p-4 rounded-lg bg-muted hover:bg-muted/70 transition-colors border border-border/50 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-mono text-primary break-all">
                    rodolfosandovalmonroy@gmail.com
                  </p>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                </div>
              </motion.a>
              <Button
                size="icon"
                variant="outline"
                onClick={() =>
                  copyToClipboard("rodolfosandovalmonroy@gmail.com", "email2")
                }
                className="h-12 w-12"
              >
                {copiedEmail2 ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </Button>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div className="pt-4 flex gap-2" variants={itemVariants}>
            <Button className="flex-1 gap-2 h-12" asChild>
              <a href="tel:+525551075025">
                <Phone className="h-5 w-5" />
                Llamar Ahora
              </a>
            </Button>
            <Button
              className="flex-1 gap-2 h-12 bg-transparent"
              variant="outline"
              asChild
            >
              <a href="mailto:rodolfo.sandoval@intelicast.net">
                <Mail className="h-5 w-5" />
                Enviar Email
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
