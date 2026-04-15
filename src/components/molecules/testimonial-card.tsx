// =============================================================================
// TESTIMONIAL-CARD.TSX — Molécula M06 | Hospital São Rafael
// =============================================================================
// Depoimento com citação, autor, cargo e foto opcional.
// Variantes: paciente (emocional), médico (técnico).
// Usado em O06 B2B Section
// =============================================================================

import Image from "next/image"
import { cn } from "@/lib/utils"
import type { BaseComponentProps, TestimonialItem } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface TestimonialCardProps extends BaseComponentProps {
  testimonial: TestimonialItem
  /** Contexto do depoimento — impacta estilo */
  variant?: "paciente" | "medico"
  theme?: "light" | "dark"
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function TestimonialCard({
  testimonial,
  variant = "medico",
  theme = "dark",
  className,
}: TestimonialCardProps) {
  const isDark = theme === "dark"
  const { quote, author, role, image } = testimonial

  return (
    <blockquote
      className={cn(
        "flex flex-col gap-6 p-8 rounded-xl",
        isDark
          ? "bg-white/5 border border-white/10"
          : "bg-white border border-neutral-100",
        "transition-colors duration-300 hover:border-ouro/30",
        className
      )}
    >
      {/* Aspas decorativas */}
      <span
        className="text-5xl font-extrabold leading-none select-none text-ouro opacity-60"
        aria-hidden
      >
        &ldquo;
      </span>

      {/* Citação */}
      <p
        className={cn(
          "text-base leading-relaxed italic -mt-6",
          isDark ? "text-white/80" : "text-charcoal/70"
        )}
      >
        {quote}
      </p>

      {/* Autor */}
      <footer className="flex items-center gap-4 mt-auto">
        {/* Foto */}
        {image ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image src={image} alt={author} fill className="object-cover" />
          </div>
        ) : (
          <div
            className={cn(
              "w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg",
              "text-lg font-extrabold",
              isDark ? "bg-white/10 text-white" : "bg-creme text-charcoal"
            )}
          >
            {author.charAt(0)}
          </div>
        )}

        <div>
          <cite
            className={cn(
              "not-italic text-sm font-bold block",
              isDark ? "text-white" : "text-charcoal"
            )}
          >
            {author}
          </cite>
          <span
            className={cn(
              "text-xs",
              isDark ? "text-white/50" : "text-charcoal/50",
              variant === "medico" ? "text-ouro/70" : ""
            )}
          >
            {role}
          </span>
        </div>
      </footer>
    </blockquote>
  )
}
