// =============================================================================
// BODY-TEXT.TSX — Átomo A07 | Hospital São Rafael
// =============================================================================
// Parágrafo padrão do Design System.
// 18px desktop / 16px mobile, Montserrat 400, line-height 1.6.
// Adaptável a fundos claros e escuros.
// =============================================================================

import { cn } from "@/lib/utils"
import type { BaseComponentProps } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
type BodyTag = "p" | "span" | "div" | "li"

interface BodyTextProps extends BaseComponentProps {
  /** Conteúdo do parágrafo */
  children: React.ReactNode
  /** Tag HTML a renderizar */
  as?: BodyTag
  /** Cor — adapta para fundo claro ou escuro */
  color?: "default" | "muted" | "light" | "light-muted"
  /** Tamanho */
  size?: "sm" | "base" | "lg"
  /** Negrito */
  weight?: "normal" | "medium" | "semibold"
}

// -----------------------------------------------------------------------------
// CORES
// -----------------------------------------------------------------------------
const colorStyles: Record<NonNullable<BodyTextProps["color"]>, string> = {
  default:     "text-charcoal",
  muted:       "text-charcoal/75",
  light:       "text-white",
  "light-muted": "text-white/70",
}

// -----------------------------------------------------------------------------
// TAMANHOS
// -----------------------------------------------------------------------------
const sizeStyles: Record<NonNullable<BodyTextProps["size"]>, string> = {
  sm:   "text-sm lg:text-base",
  base: "text-base lg:text-lg",
  lg:   "text-lg lg:text-xl",
}

// -----------------------------------------------------------------------------
// PESOS
// -----------------------------------------------------------------------------
const weightStyles: Record<NonNullable<BodyTextProps["weight"]>, string> = {
  normal:   "font-normal",
  medium:   "font-medium",
  semibold: "font-semibold",
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function BodyText({
  as: Tag = "p",
  children,
  color = "default",
  size = "base",
  weight = "normal",
  className,
}: BodyTextProps) {
  return (
    <Tag
      className={cn(
        "leading-relaxed",
        colorStyles[color],
        sizeStyles[size],
        weightStyles[weight],
        className
      )}
    >
      {children}
    </Tag>
  )
}
