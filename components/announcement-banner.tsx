'use client'

import { Banner } from '@/components/ui/banner'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function AnnouncementBanner() {
  return (
    <Banner
      variant="promotional"
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(32, 27, 58, 0.62) 0%, rgba(44, 37, 78, 0.52) 52%, rgba(32, 27, 58, 0.4) 100%), url('/bg-mdm.webp')",
      }}
      icon={
        <Image
          src="/mdm.svg"
          alt="El Medio de Medios"
          width={200}
          height={50}
          className="h-5 w-auto md:h-7"
        />
      }
      title="Mantente Informado con El Medio de Medios"
      description="Análisis experto de medios políticos, financieros y tecnológicos. ¡Suscríbete ahora!"
      action={
        <>
          <Button
            size="sm"
            variant="default"
            asChild
            className="gap-2 shrink-0 shadow-sm"
          >
            <a
              href="https://chat.whatsapp.com/EHU0cbRfVAj3FHWmBQem9O?mode=gi_t"
              target="_blank"
              rel="noopener noreferrer"
            >
              Suscribir
            </a>
          </Button>
          <Button
            size="sm"
            variant="outline"
            asChild
            className="gap-2 shrink-0 bg-white/90 text-slate-900 hover:bg-white"
          >
            <a
              href="https://www.elmediodemedios.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visitar Sitio
            </a>
          </Button>
        </>
      }
      dismissible={false}
    />
  )
}
