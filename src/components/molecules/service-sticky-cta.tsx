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
        "fixed bottom-0 left-0 right-0 z-40",
        "bg-white/95 backdrop-blur-md",
        "border-t border-cobre/20",
        "shadow-[0_-4px_20px_rgba(0,0,0,0.06)]",
        "transition-transform duration-300",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="p-3">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "w-full inline-flex items-center justify-center gap-2",
            "rounded-full px-4 py-3",
            "bg-ouro text-white font-bold text-sm",
            "hover:bg-ouro-hover transition-colors"
          )}
        >
          <MessageCircle size={18} aria-hidden />
          <span>Falar no WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
