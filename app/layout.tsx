import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import AnnouncementBanner from "@/components/announcement-banner";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Intelicast - Catálogo de Servicios 2026",
  description:
    "Catálogo de servicios de inteligencia estratégica y análisis de medios",
  icons: "/frame.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        <AnnouncementBanner />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
