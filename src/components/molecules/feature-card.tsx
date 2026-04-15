// =============================================================================
// FEATURE-CARD.TSX — Molécula M03 | Hospital São Rafael
// =============================================================================
// Card B2B com métrica/ícone + título + descrição.
// DNA: fundo escuro (charcoal), texto branco, acento ouro.
// Usado na Área do Médico (O06 B2B Section)
// =============================================================================

import { cn } from "@/lib/utils"
import { Icon, resolveIconName } from "@/components/atoms/icon"
import type { BaseComponentProps, B2BFeature } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface FeatureCardProps extends BaseComponentProps {
  feature: B2BFeature
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function FeatureCard({ feature, className }: FeatureCardProps) {
  const { metric, title, description, icon } = feature

  return (
    <article
      className={cn(
        "flex flex-col gap-4 p-8 rounded-xl",
        "bg-charcoal border border-white/10",
        "transition-all duration-300 hover:border-ouro/40",
        className
      )}
    >
      {/* Topo: métrica ou ícone */}
      <div className="flex items-center gap-3">
        {metric ? (
          <span className="text-2xl font-extrabold text-ouro leading-none">
            {metric}
          </span>
        ) : (
          <div className="p-2 border border-ouro/30 rounded-lg inline-flex">
            <Icon name={resolveIconName(icon)} size={22} color="marrom" />
          </div>
        )}
      </div>

      {/* Título */}
      <h3 className="text-lg font-bold text-white leading-tight">
        {title}
      </h3>

      {/* Descrição */}
      <p className="text-sm text-white/70 leading-relaxed">
        {description}
      </p>

      {/* Linha decorativa */}
      <div className="h-px w-8 bg-ouro mt-auto" />
    </article>
  )
}
