// =============================================================================
// KICKER.TSX — Átomo A04 | Hospital São Rafael
// =============================================================================
// Label contextual posicionado acima dos títulos de seção.
// Exemplos: "CIRURGIAS ELETIVAS PARTICULARES", "PARA MÉDICOS E CIRURGIÕES"
//
// DNA HSR: 14px, Montserrat 800, uppercase, letter-spacing 3px (+0.15em)
// =============================================================================

import { cn } from "@/lib/utils"
import type { BaseComponentProps } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface KickerProps extends BaseComponentProps {
  /** Texto do kicker (será automaticamente convertido para uppercase) */
  children: React.ReactNode
  /** Cor do kicker — adapta para fundo claro ou escuro */
  color?: "ouro" | "light" | "charcoal" | "azul" | "cobre" | "marrom"
  /** Tag HTML a renderizar */
  as?: "span" | "p" | "div"
}

// -----------------------------------------------------------------------------
// CORES
// -----------------------------------------------------------------------------
const colorStyles: Record<NonNullable<KickerProps["color"]>, string> = {
  ouro: "text-ouro",
  light: "text-white/80",
  charcoal: "text-charcoal",
  azul: "text-azul",
  cobre: "text-cobre",
  marrom: "text-marrom",
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function Kicker({
  children,
  color = "marrom",
  as: Tag = "span",
  className,
}: KickerProps) {
  return (
    <Tag
      className={cn(
        // Tipografia HSR — kicker token
        "text-sm font-extrabold uppercase tracking-kicker leading-normal",
        // Espaçamento inferior padrão quando precede um heading
        "mb-3 block",
        // Cor
        colorStyles[color],
        // Override externo
        className
      )}
    >
      {children}
    </Tag>
  )
}
