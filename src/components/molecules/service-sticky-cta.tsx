// =============================================================================
// SERVICE-STICKY-CTA.TSX — Molécula | Hospital São Rafael
// =============================================================================
// Barra de CTA fixa no rodapé em mobile/tablet. WhatsApp + tel diretos.
// Aparece após o usuário rolar além do hero, ficando sempre acessível durante
// a leitura — evita que o paciente termine a página sem ponto de contato.
// =============================================================================

"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ServiceStickyCtaProps {
  whatsappHref?: string
}

export function ServiceStickyCta({
  whatsappHref = "https://wa.me/message/NZIPXRZ4SKUHM1",
}: ServiceStickyCtaProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6)
    }
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <div
      role="region"
      aria-label="Atendimento rápido"
      className={cn(
        "lg:hidden",
        // Floating pill — afastado das bordas laterais e do fim da tela.
        // safe-area-inset-bottom evita sobreposição em dispositivos com home indicator.
        "fixed left-4 right-4 z-40",
        "transition-all duration-300",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 pointer-events-none"
      )}
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
    >
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "w-full inline-flex items-center justify-center gap-2",
          "rounded-full px-5 py-3.5",
          "bg-ouro text-white font-bold text-sm",
          "shadow-[0_10px_30px_-8px_rgba(155,108,74,0.45)]",
          "ring-1 ring-white/20",
          "hover:bg-ouro-hover transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro focus-visible:ring-offset-2"
        )}
      >
        <MessageCircle size={18} aria-hidden />
        <span>Falar no WhatsApp</span>
      </a>
    </div>
  )
}
