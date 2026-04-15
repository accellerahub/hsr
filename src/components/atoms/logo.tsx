// =============================================================================
// LOGO.TSX — Átomo A10 | Hospital São Rafael
// =============================================================================
// Logotipo oficial do HSR via next/image.
// Variantes: "default" (fundo claro) · "light" (fundo escuro)
// Em fundos escuros o logo branco é exibido diretamente.
// Em fundos claros aplica-se inversão via CSS para o logo ficar escuro.
// =============================================================================

import Image from "next/image"
import { cn } from "@/lib/utils"
import type { BaseComponentProps } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface LogoProps extends BaseComponentProps {
  /** Variante de cor — "default" para fundo claro, "light" para fundo escuro */
  variant?: "default" | "light"
  /** Altura em pixels */
  height?: number
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function Logo({
  variant = "default",
  height = 48,
  className,
}: LogoProps) {
  const isLight = variant === "light"

  return (
    <div
      className={cn("inline-flex items-center", className)}
      aria-label="Hospital São Rafael"
    >
      <Image
        src="/assets/images/logos/logo-hsr.png"
        alt="Hospital São Rafael"
        height={height}
        width={height * 4}          // proporção 4:1 — ajusta conforme necessário
        style={{ height, width: "auto" }}
        className={cn(
          "object-contain",
          // Logo branco: exibe direto em fundos escuros, inverte em fundos claros
          !isLight && "invert"
        )}
        priority
      />
    </div>
  )
}
