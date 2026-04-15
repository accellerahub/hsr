// =============================================================================
// STAT-CARD.TSX — Molécula M01 | Hospital São Rafael
// =============================================================================
// Composição: valor de destaque + label + descrição de apoio
// Suporta valores numéricos (com counter-up) e textuais (estáticos).
// =============================================================================

import { cn } from "@/lib/utils"
import { MetricNumber } from "@/components/atoms/metric-number"
import type { BaseComponentProps, StatItem } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface StatCardProps extends BaseComponentProps {
  stat: StatItem
  theme?: "light" | "dark"
  static?: boolean
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function StatCard({
  stat,
  theme = "light",
  static: isStatic = false,
  className,
}: StatCardProps) {
  const isLight = theme === "light"
  const isNumeric = typeof stat.value === "number"

  return (
    <div
      className={cn(
        "flex flex-col h-full",
        "px-8 py-10",
        className
      )}
    >
      {/* Valor de destaque */}
      {isNumeric ? (
        <MetricNumber
          value={stat.value as number}
          prefix={stat.prefix}
          suffix={stat.suffix}
          color={isLight ? "charcoal" : "ouro"}
          size="md"
          static={isStatic}
        />
      ) : (
        <span
          className={cn(
            "font-extrabold leading-tight tracking-tight block",
            "text-3xl lg:text-4xl",
            isLight ? "text-charcoal" : "text-ouro"
          )}
        >
          {stat.value as string}
        </span>
      )}

      {/* Label */}
      <p
        className={cn(
          "mt-3 text-sm font-bold uppercase tracking-wide",
          isLight ? "text-charcoal/60" : "text-white/60"
        )}
      >
        {stat.label}
      </p>

      {/* Divisor */}
      <div
        className={cn(
          "w-8 h-px my-4",
          isLight ? "bg-ouro/50" : "bg-ouro/40"
        )}
        aria-hidden
      />

      {/* Descrição de apoio */}
      {stat.description && (
        <p
          className={cn(
            "text-sm leading-relaxed",
            isLight ? "text-charcoal/50" : "text-white/50"
          )}
        >
          {stat.description}
        </p>
      )}
    </div>
  )
}
