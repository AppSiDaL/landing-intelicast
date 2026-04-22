"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Share2, Copy, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface QRModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function QRModal({ open, onOpenChange }: QRModalProps) {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = "/qr-code.png";
    link.download = "intelicast-qr.png";
    link.click();
  };

  const shareQR = async () => {
    try {
      if (!navigator.share) return;

      const response = await fetch("/qr-code.png");
      const blob = await response.blob();
      const file = new File([blob], "intelicast-qr.png", { type: "image/png" });

      await navigator.share({
        title: "Intelicast - Catálogo de Servicios",
        text: "Escanea este código QR para acceder a nuestro catálogo",
        files: [file],
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error copying:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Código QR
          </DialogTitle>
          <DialogDescription>
            Escanea la imagen para acceder al catálogo de servicios
          </DialogDescription>
        </DialogHeader>

        <motion.div
          className="space-y-6 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* QR Code */}
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          >
            <div className="p-6 bg-linear-to-br from-primary/5 to-accent/5 rounded-2xl shadow-xl border border-primary/20">
              <div className="bg-white p-4 rounded-xl">
                <Image
                  src="/qr-code.png"
                  alt="Código QR de Intelicast"
                  width={256}
                  height={256}
                  className="h-64 w-64"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* URL Display with Copy */}
          <motion.div
            className="p-4 bg-muted rounded-lg border border-border/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs text-muted-foreground flex-1 break-all font-mono">
                {currentUrl}
              </p>
              <Button
                size="sm"
                variant="ghost"
                onClick={copyUrl}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button className="flex-1 gap-2" onClick={downloadQR}>
              <Download className="h-4 w-4" />
              Descargar
            </Button>
            <Button
              className="flex-1 gap-2 bg-transparent"
              variant="outline"
              onClick={shareQR}
            >
              <Share2 className="h-4 w-4" />
              Compartir
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
