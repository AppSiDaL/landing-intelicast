"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function WhatsAppForm({ inviterId }: { inviterId?: string }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");

  const inviters = [
    {
      id: "RSM",
      name: "Rodolfo Sandoval Monroy",
      number: "525551075025",
    },
    {
      id: "CP",
      name: "Cacho Peralta",
      number: "525555038714",
    },
    {
      id: "SCM",
      name: "Sylví Cruz Monroy",
      number: "525524966826",
    },
  ];

  const inviter = inviters.find((i) => i.id === inviterId) || inviters[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    let message = `Hola, soy ${name},`;
    if (position.trim()) message += ` ${position.trim()}`;
    if (company.trim()) message += ` de ${company.trim()}`;
    message += `, estoy interesad@ en recibir todos los días el Medio de Medios por cortesía de ${inviter.name} (https://www.elmediodemedios.com/publicaciones/agenda-nacional)`;

    const whatsappUrl = `https://wa.me/${inviter.number}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
    setName("");
    setCompany("");
    setPosition("");
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
          Ingresa tus datos para iniciar un chat de WhatsApp con nuestro equipo.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium leading-none text-foreground/80"
            >
              Nombre Completo <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
              required
              autoFocus
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="company"
                className="text-sm font-medium leading-none text-foreground/80"
              >
                Empresa
              </label>
              <input
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="position"
                className="text-sm font-medium leading-none text-foreground/80"
              >
                Puesto
              </label>
              <input
                id="position"
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white border-none shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 transition-all duration-300 mt-2"
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
