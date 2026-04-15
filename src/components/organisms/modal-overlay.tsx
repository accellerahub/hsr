// =============================================================================
// MODAL-OVERLAY.TSX — Organismo O10 | Hospital São Rafael
// =============================================================================
// Composição: overlay escuro + painel com glassmorphism + conteúdo dinâmico
// Comportamento: acionado por Saiba Mais, fecha com X ou click fora, focus trap
// =============================================================================

"use client"

import { useEffect, useRef, useCallback } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ModalOverlayProps {
  /** Se o modal está aberto */
  isOpen: boolean
  /** Callback ao fechar */
  onClose: () => void
  /** Título do modal (acessibilidade) */
  title: string
  /** Conteúdo renderizado dentro do modal */
  children: React.ReactNode
  /** Largura máxima do painel */
  maxWidth?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const maxWidthClasses: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function ModalOverlay({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "lg",
  className,
}: ModalOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  // Focus trap — manter foco dentro do modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return

      // Fechar com Escape
      if (e.key === "Escape") {
        onClose()
        return
      }

      // Focus trap com Tab
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last?.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first?.focus()
          }
        }
      }
    },
    [isOpen, onClose]
  )

  // Registrar/remover event listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // Bloquear scroll do body quando aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      // Focar no botão de fechar ao abrir
      setTimeout(() => closeBtnRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[40] flex items-center justify-center p-4"
    >
      {/* Overlay escuro */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Painel com glassmorphism */}
      <div
        ref={panelRef}
        className={cn(
          "relative z-10 w-full",
          maxWidthClasses[maxWidth],
          // Glassmorphism conforme token
          "bg-white/[0.96] backdrop-blur-[15px]",
          "border border-white/20",
          "shadow-xl",
          // Animação de entrada
          "animate-fade-in-up",
          className
        )}
      >
        {/* Barra superior com título e fechar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal/10">
          <h2
            id="modal-title"
            className="text-lg font-bold text-charcoal leading-tight"
          >
            {title}
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className={cn(
              "p-2 -mr-2 text-charcoal/40 hover:text-charcoal",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro"
            )}
          >
            <X size={20} />
          </button>
        </div>

        {/* Corpo do modal — conteúdo dinâmico */}
        <div className="overflow-y-auto max-h-[80vh] p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
