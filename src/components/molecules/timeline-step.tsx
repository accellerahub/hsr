// =============================================================================
// TIMELINE-STEP.TSX — Molécula M04 | Hospital São Rafael
// =============================================================================
// Card de etapa da jornada com número fantasma, ícone e conteúdo.
// Redesenhado para formato card (inspiração: referência visual v2).
// Usado em O07 Journey Timeline
// =============================================================================

import {
  Stethoscope,
  ClipboardCheck,
  Scissors,
  HeartPulse,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { BaseComponentProps, JourneyStep } from "@/types"

// -----------------------------------------------------------------------------
// MAPA DE ÍCONES POR ETAPA
// -----------------------------------------------------------------------------
const STEP_ICONS: Record<string, React.ReactNode> = {
  consulta:      <Stethoscope size={22} strokeWidth={1.5} />,
  preparo:       <ClipboardCheck size={22} strokeWidth={1.5} />,
  procedimento:  <Scissors size={22} strokeWidth={1.5} />,
  recuperacao:   <HeartPulse size={22} strokeWidth={1.5} />,
  alta:          <LogOut size={22} strokeWidth={1.5} />,
}

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface TimelineStepProps extends BaseComponentProps {
  step: JourneyStep
  // Mantidos por compatibilidade — não usados no layout card
  isLast?: boolean
  direction?: "horizontal" | "vertical"
  isActive?: boolean
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function TimelineStep({ step, className }: TimelineStepProps) {
  const icon = STEP_ICONS[step.id]

  return (
    <article
      className={cn(
        "relative bg-white rounded-xl overflow-hidden",
        "border border-neutral-100",
        "p-6 flex flex-col gap-5",
        "h-full",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        className
      )}
    >
      {/* Número fantasma — watermark de fundo */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute -top-3 right-3",
          "text-[100px] font-extrabold leading-none",
          "text-azul-escuro/[0.04] select-none pointer-events-none"
        )}
      >
        {step.number}
      </span>

      {/* Ícone */}
      <div className="relative z-10 flex-shrink-0">
        <div className="p-3 bg-ouro/10 rounded-xl inline-flex text-marrom">
          {icon}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col gap-2 flex-1">
        {/* Subtítulo (ex: "IMD") */}
        {step.subtitle && (
          <span className="text-xs font-extrabold uppercase tracking-kicker text-marrom">
            {step.subtitle}
          </span>
        )}

        {/* Título */}
        <h3 className="font-bold text-azul-escuro text-base leading-tight">
          {step.title}
        </h3>

        {/* Descrição */}
        <p className="text-sm text-charcoal/60 leading-relaxed flex-1">
          {step.description}
        </p>

        {/* Links relacionados — TODO: reativar quando páginas forem construídas
        {step.relatedLinks.length > 0 && (
          <div className="flex flex-col gap-1 mt-2">
            {step.relatedLinks.map((link) => (
              <Link key={link.href + link.label} href={link.href} ...>
                {link.label} →
              </Link>
            ))}
          </div>
        )} */}
      </div>
    </article>
  )
}
