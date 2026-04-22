// =============================================================================
// CONTACT-INFO-BLOCK.TSX — Molécula M09 | Hospital São Rafael
// =============================================================================
// Ícone + label + valor de contato (endereço, telefone, email).
// Usado no Footer (O09).
// =============================================================================

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "@/components/atoms/icon"
import type { BaseComponentProps } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ContactInfoBlockProps extends BaseComponentProps {
  iconName: IconName
  label: string
  value: string
  /** Se deve renderizar como link (telefone, email) */
  href?: string
  theme?: "light" | "dark"
  onClick?: () => void
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function ContactInfoBlock({
  iconName,
  label,
  value,
  href,
  theme = "dark",
  className,
  onClick,
}: ContactInfoBlockProps) {
  const isDark = theme === "dark"

  const valueClasses = cn(
    "text-sm transition-colors duration-200",
    isDark ? "text-white/80" : "text-charcoal",
    href && (isDark ? "hover:text-ouro" : "hover:text-ouro")
  )

  return (
    <div className={cn("flex items-start gap-3", className)}>
      {/* Ícone */}
      <div className="mt-0.5 flex-shrink-0">
        <Icon name={iconName} size={18} color="marrom" strokeWidth={1.5} />
      </div>

      {/* Texto */}
      <div className="flex flex-col gap-0.5">
        <span
          className={cn(
            "text-xs font-extrabold uppercase tracking-kicker",
            isDark ? "text-white/40" : "text-charcoal/40"
          )}
        >
          {label}
        </span>

        {href ? (
          <Link href={href} className={valueClasses} onClick={onClick}>
            {value}
          </Link>
        ) : (
          <span className={valueClasses}>{value}</span>
        )}
      </div>
    </div>
  )
}
