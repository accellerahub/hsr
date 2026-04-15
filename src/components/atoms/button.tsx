// =============================================================================
// BUTTON.TSX — Átomo A01/A02/A03 | Hospital São Rafael
// =============================================================================
// Botão principal do Design System. Cobre todas as variantes:
// - Primary: fundo ouro, texto charcoal (CTAs principais)
// - Ghost: texto ouro, sem fundo (Saiba Mais, links secundários)
// - Outline: borda ouro, fundo transparente (CTAs secundários)
// - Dark: fundo charcoal, texto branco (CTAs em fundo claro alternativo)
//
// DNA HSR: border-radius 0 (cantos retos), transição 300ms ease.
// =============================================================================

import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import type { ButtonVariant, ButtonSize } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visual do botão */
  variant?: ButtonVariant
  /** Tamanho do botão */
  size?: ButtonSize
  /** Renderizar como link (<a>) em vez de <button> */
  asChild?: boolean
  /** URL de destino (se asChild ou se for um link) */
  href?: string
  /** Se o botão está em estado de carregamento */
  isLoading?: boolean
  /** Ícone à esquerda do texto */
  leftIcon?: React.ReactNode
  /** Ícone à direita do texto */
  rightIcon?: React.ReactNode
}

// -----------------------------------------------------------------------------
// VARIANTES DE ESTILO
// -----------------------------------------------------------------------------
const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-ouro text-white",
    "hover:bg-ouro-hover",
    "focus-visible:ring-ouro",
    "font-bold",
  ].join(" "),

  ghost: [
    "bg-transparent text-ouro",
    "hover:text-ouro-hover hover:underline underline-offset-4",
    "focus-visible:ring-ouro",
    "font-semibold",
  ].join(" "),

  outline: [
    "bg-transparent text-ouro border border-ouro",
    "hover:bg-ouro hover:text-white",
    "focus-visible:ring-ouro",
    "font-semibold",
  ].join(" "),

  // Variante extra para CTAs sobre fundos claros que precisam de contraste diferente
  secondary: [
    "bg-charcoal text-white",
    "hover:bg-neutral-900",
    "focus-visible:ring-charcoal",
    "font-bold",
  ].join(" "),
}

// -----------------------------------------------------------------------------
// TAMANHOS
// -----------------------------------------------------------------------------
const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-xs",
  md: "px-5 py-2 text-sm",
  lg: "px-6 py-3 text-base",
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      href,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) {
    // Classes base compartilhadas por todas as variantes
    const baseStyles = cn(
      // Reset e base
      "inline-flex items-center justify-center gap-2",
      "rounded-full",
      // Transição padrão HSR: 300ms ease
      "transition-all duration-300 ease-in-out",
      // Focus ring para acessibilidade
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      // Cursor
      "cursor-pointer",
      // Disabled
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
      // Variante + Tamanho
      variantStyles[variant],
      sizeStyles[size],
      // Loading state
      isLoading && "opacity-70 pointer-events-none",
      // Override externo
      className
    )

    // Se tem href, renderiza como <a>
    if (href) {
      const isExternal = href.startsWith("http")
      return (
        <a
          href={href}
          className={baseStyles}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          aria-disabled={disabled || isLoading}
          {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {isLoading ? <LoadingSpinner /> : leftIcon}
          {children}
          {!isLoading && rightIcon}
        </a>
      )
    }

    return (
      <button
        ref={ref}
        className={baseStyles}
        disabled={disabled || isLoading}
        onClick={onClick}
        {...props}
      >
        {isLoading ? <LoadingSpinner /> : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    )
  }
)

// -----------------------------------------------------------------------------
// LOADING SPINNER — SVG inline minimalista
// -----------------------------------------------------------------------------
function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}
