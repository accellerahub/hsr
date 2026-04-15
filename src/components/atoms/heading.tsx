// =============================================================================
// HEADING.TSX — Átomo A05/A06 | Hospital São Rafael
// =============================================================================
// Componente de heading unificado para H1, H2, H3, H4.
// Aplica automaticamente os tokens tipográficos do Design System.
//
// H1: 52px/32px — peso 800 (hero only)
// H2: 40px/24px — peso 700 (seções)
// H3: 24px/20px — peso 700 (subtítulos)
// H4: 20px/18px — peso 600 (cards)
// =============================================================================

import { cn } from "@/lib/utils"
import type { BaseComponentProps } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
type HeadingLevel = "h1" | "h2" | "h3" | "h4"

interface HeadingProps extends BaseComponentProps {
  /** Nível semântico do heading (h1, h2, h3, h4) */
  as?: HeadingLevel
  /** Conteúdo do heading */
  children: React.ReactNode
  /** Cor do texto — adapta para fundo claro ou escuro */
  color?: "default" | "light" | "ouro" | "azul" | "azul-escuro"
  /** Alinhamento */
  align?: "left" | "center" | "right"
  /** Largura máxima (útil para headlines longas) */
  maxWidth?: string
  /** ID para aria-labelledby */
  id?: string
}

// -----------------------------------------------------------------------------
// ESTILOS POR NÍVEL (mobile-first, responsive via Tailwind)
// -----------------------------------------------------------------------------
const levelStyles: Record<HeadingLevel, string> = {
  h1: [
    // Mobile
    "text-3xl font-extrabold tracking-tight leading-tight",
    // Desktop
    "lg:text-6xl",
  ].join(" "),

  h2: [
    // Mobile
    "text-2xl font-bold leading-tight",
    // Desktop
    "lg:text-4xl",
  ].join(" "),

  h3: [
    // Mobile
    "text-xl font-bold leading-tight",
    // Desktop
    "lg:text-2xl",
  ].join(" "),

  h4: [
    // Mobile
    "text-lg font-semibold leading-normal",
    // Desktop
    "lg:text-xl",
  ].join(" "),
}

// -----------------------------------------------------------------------------
// CORES
// -----------------------------------------------------------------------------
const colorStyles: Record<NonNullable<HeadingProps["color"]>, string> = {
  default: "text-azul-escuro",
  light: "text-white",
  ouro: "text-ouro",
  azul: "text-azul",
  "azul-escuro": "text-azul-escuro",
}

// -----------------------------------------------------------------------------
// ALINHAMENTO
// -----------------------------------------------------------------------------
const alignStyles: Record<NonNullable<HeadingProps["align"]>, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function Heading({
  as: Tag = "h2",
  children,
  color = "default",
  align = "left",
  maxWidth,
  id,
  className,
}: HeadingProps) {
  return (
    <Tag
      id={id}
      className={cn(
        levelStyles[Tag],
        colorStyles[color],
        alignStyles[align],
        className
      )}
      style={maxWidth ? { maxWidth } : undefined}
    >
      {children}
    </Tag>
  )
}
