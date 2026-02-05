"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function WhatsAppForm() {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const message = `Hola, soy ${name} estoy interesado en el servicio`;
    const whatsappUrl = `https://wa.me/525545641120?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
    setName("");
  };

  return (
    <Card className="w-full max-w-md mx-auto relative overflow-hidden bg-background/60 backdrop-blur-xl border-primary/20">
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-50" />

      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
          <MessageCircle className="h-6 w-6 text-[#25D366]" />
          Contacto Directo
        </CardTitle>
        <CardDescription className="text-base">
          Ingresa tu nombre para iniciar un chat de WhatsApp con nuestro equipo.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium leading-none text-foreground/80"
            >
              Nombre Completo
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Juan Pérez"
              className="flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
              required
              autoFocus
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white border-none shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 transition-all duration-300"
          >
            <MessageCircle className="h-5 w-5" />
            Enviar Mensaje
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Al enviar, se abrirá WhatsApp Web o la App.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
