// =============================================================================
// METRIC-NUMBER.TSX — Átomo A08 | Hospital São Rafael
// =============================================================================
// Número grande de destaque para métricas e estatísticas.
// Integra com o hook useCounterUp para animação de contagem.
//
// Exemplos: "+ 12.000", "R$ 170 milhões", "+20"
// DNA HSR: ~48-60px, Montserrat 800, counter-up ao entrar no viewport.
// =============================================================================

"use client"

import { cn } from "@/lib/utils"
import { useCounterUp } from "@/hooks/use-counter-up"
import type { BaseComponentProps } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface MetricNumberProps extends BaseComponentProps {
  /** Valor numérico final da contagem */
  value: number
  /** Texto antes do número (ex: "+", "R$ ") */
  prefix?: string
  /** Texto depois do número (ex: " milhões", "%") */
  suffix?: string
  /** Cor do número */
  color?: "charcoal" | "ouro" | "light" | "azul"
  /** Tamanho visual */
  size?: "md" | "lg" | "xl"
  /** Duração da animação de contagem (ms) */
  duration?: number
  /** Delay antes de iniciar contagem (ms) — útil para stagger */
  delay?: number
  /** Desabilitar animação (mostra valor final direto) */
  static?: boolean
}

// -----------------------------------------------------------------------------
// CORES
// -----------------------------------------------------------------------------
const colorStyles: Record<NonNullable<MetricNumberProps["color"]>, string> = {
  charcoal: "text-charcoal",
  ouro: "text-ouro",
  light: "text-white",
  azul: "text-azul",
}

// -----------------------------------------------------------------------------
// TAMANHOS
// -----------------------------------------------------------------------------
const sizeStyles: Record<NonNullable<MetricNumberProps["size"]>, string> = {
  md: "text-4xl lg:text-5xl",
  lg: "text-5xl lg:text-6xl",
  xl: "text-6xl lg:text-[72px]",
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function MetricNumber({
  value,
  prefix = "",
  suffix = "",
  color = "charcoal",
  size = "lg",
  duration = 2000,
  delay = 0,
  static: isStatic = false,
  className,
}: MetricNumberProps) {
  const { formattedValue, ref } = useCounterUp({
    end: value,
    duration,
    delay,
    autoStart: !isStatic,
    separator: ".",
  })

  // Valor final formatado (para modo estático ou SSR)
  const staticFormatted = new Intl.NumberFormat("pt-BR").format(value)

  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={cn(
        // Tipografia — metric token
        "font-extrabold leading-tight tracking-tight",
        // Tamanho
        sizeStyles[size],
        // Cor
        colorStyles[color],
        // Block para ocupar linha própria
        "block",
        // Override
        className
      )}
      aria-label={`${prefix}${staticFormatted}${suffix}`}
    >
      {prefix}
      {isStatic ? staticFormatted : formattedValue}
      {suffix}
    </span>
  )
}
