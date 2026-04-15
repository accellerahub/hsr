// =============================================================================
// DIVIDER.TSX — Átomo A11 | Hospital São Rafael
// =============================================================================
// Separador visual entre seções.
// Pode ser linha cobre (fina) ou espaçamento puro.
// =============================================================================

import { cn } from "@/lib/utils"
import type { BaseComponentProps } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface DividerProps extends BaseComponentProps {
  /** "line" — linha decorativa cobre | "space" — espaçamento puro */
  variant?: "line" | "space"
  /** Cor da linha */
  color?: "cobre" | "ouro" | "charcoal/20" | "white/20"
  /** Largura da linha (ex: "w-16", "w-full") */
  width?: string
}

// -----------------------------------------------------------------------------
// CORES
// -----------------------------------------------------------------------------
const colorMap: Record<NonNullable<DividerProps["color"]>, string> = {
  cobre:       "bg-cobre",
  ouro:        "bg-ouro",
  "charcoal/20": "bg-charcoal/20",
  "white/20":  "bg-white/20",
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function Divider({
  variant = "line",
  color = "cobre",
  width = "w-16",
  className,
}: DividerProps) {
  if (variant === "space") {
    return (
      <div
        className={cn("h-px w-full opacity-0 pointer-events-none", className)}
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      className={cn("h-[2px]", width, colorMap[color], className)}
      role="separator"
      aria-hidden="true"
    />
  )
}
