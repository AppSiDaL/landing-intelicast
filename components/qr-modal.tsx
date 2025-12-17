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
import { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";

interface QRModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function QRModal({ open, onOpenChange }: QRModalProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    canvas.width = 1024;
    canvas.height = 1024;

    img.onload = () => {
      if (!ctx) return;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 1024, 1024);
      ctx.drawImage(img, 0, 0, 1024, 1024);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "intelicast-qr.png";
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      });
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const shareQR = async () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    try {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      canvas.width = 1024;
      canvas.height = 1024;

      img.onload = async () => {
        if (!ctx) return;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 1024, 1024);
        ctx.drawImage(img, 0, 0, 1024, 1024);

        canvas.toBlob(async (blob) => {
          if (blob && navigator.share) {
            const file = new File([blob], "intelicast-qr.png", {
              type: "image/png",
            });
            await navigator.share({
              title: "Intelicast - Catálogo de Servicios",
              text: "Escanea este código QR para acceder a nuestro catálogo",
              files: [file],
            });
          }
        });
      };

      img.src = "data:image/svg+xml;base64," + btoa(svgData);
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
            Escanea este código para acceder al catálogo de servicios
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
              <div ref={qrRef} className="bg-white p-4 rounded-xl">
                <QRCodeSVG
                  value={currentUrl}
                  size={256}
                  level="H"
                  includeMargin={true}
                  imageSettings={{
                    src: "/frame.png",
                    x: undefined,
                    y: undefined,
                    height: 45,
                    width: 50,
                    excavate: true,
                  }}
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
