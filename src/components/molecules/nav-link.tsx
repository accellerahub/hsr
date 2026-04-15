// =============================================================================
// NAV-LINK.TSX — Molécula M08 | Hospital São Rafael
// =============================================================================
// Link de navegação com estado ativo via scroll-spy.
// Utilizado no Header (O01).
// =============================================================================

"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import type { BaseComponentProps } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface NavLinkProps extends BaseComponentProps {
  href: string
  children: React.ReactNode
  /** Se este link está ativo (seção visível no viewport) */
  isActive?: boolean
  /** Variante — "header" (padrão) ou "footer" */
  variant?: "header" | "footer"
  onClick?: () => void
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function NavLink({
  href,
  children,
  isActive = false,
  variant = "header",
  onClick,
  className,
}: NavLinkProps) {
  if (variant === "footer") {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "text-sm text-white/60 hover:text-white",
          "transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro",
          className
        )}
      >
        {children}
      </Link>
    )
  }

  // Variante "header"
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative text-sm font-semibold",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro focus-visible:ring-offset-2",
        // Sublinhado ativo
        "after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-ouro",
        "after:transition-all after:duration-300",
        isActive
          ? "text-ouro after:w-full"
          : "text-white hover:text-ouro/80 after:w-0 hover:after:w-full",
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  )
}
