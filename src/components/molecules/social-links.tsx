// =============================================================================
// SOCIAL-LINKS.TSX — Molécula M10 | Hospital São Rafael
// =============================================================================
// Grupo de ícones de redes sociais com SVGs inline de marca.
// Lucide não inclui ícones de marcas — usamos SVGs customizados.
// Usado no Footer (O09).
// =============================================================================

import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { BaseComponentProps, SocialLink } from "@/types"

// -----------------------------------------------------------------------------
// SVGs inline de marca
// -----------------------------------------------------------------------------
function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 17v-3.5a2.5 2.5 0 0 1 5 0V17M11 10v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function YouTubeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9.5l5 2.5-5 2.5V9.5z" fill="currentColor" />
    </svg>
  )
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const SOCIAL_ICONS: Record<string, (props: { size?: number }) => React.ReactElement> = {
  instagram: InstagramIcon,
  linkedin:  LinkedInIcon,
  youtube:   YouTubeIcon,
  tiktok:    TikTokIcon,
}

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface SocialLinksProps extends BaseComponentProps {
  links: SocialLink[]
  theme?: "light" | "dark"
  size?: number
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function SocialLinks({
  links,
  theme = "dark",
  size = 20,
  className,
}: SocialLinksProps) {
  const isDark = theme === "dark"

  return (
    <div className={cn("flex items-center gap-3", className)} aria-label="Redes sociais">
      {links.map((link) => {
        const SocialIcon = SOCIAL_ICONS[link.platform]
        if (!SocialIcon) return null

        return (
          <Link
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`HSR no ${link.platform}`}
            className={cn(
              "p-2 rounded-lg transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro",
              isDark
                ? "text-white/50 hover:text-ouro bg-white/5 hover:bg-white/10"
                : "text-charcoal/50 hover:text-ouro bg-charcoal/5 hover:bg-charcoal/10"
            )}
          >
            <SocialIcon size={size} />
          </Link>
        )
      })}
    </div>
  )
}
