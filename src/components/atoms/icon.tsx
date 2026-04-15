// =============================================================================
// ICON.TSX — Átomo A09 | Hospital São Rafael
// =============================================================================
// Wrapper sobre lucide-react. Centraliza tamanho e cor em tokens.
// Todos os ícones usados no projeto passam por aqui.
// =============================================================================

import { type LucideIcon, icons } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BaseComponentProps } from "@/types"

// -----------------------------------------------------------------------------
// TIPOS
// -----------------------------------------------------------------------------

/** Nomes dos ícones disponíveis no lucide-react */
export type IconName = keyof typeof icons

interface IconProps extends BaseComponentProps {
  /** Nome do ícone (PascalCase conforme lucide-react) */
  name: IconName
  /** Tamanho em pixels */
  size?: number
  /** Cor do ícone */
  color?: "current" | "ouro" | "charcoal" | "azul" | "cobre" | "marrom" | "light" | "muted"
  /** strokeWidth customizado */
  strokeWidth?: number
  /** aria-label para acessibilidade */
  "aria-label"?: string
}

// -----------------------------------------------------------------------------
// CORES
// -----------------------------------------------------------------------------
const colorStyles: Record<NonNullable<IconProps["color"]>, string> = {
  current:  "text-current",
  ouro:     "text-ouro",
  charcoal: "text-charcoal",
  azul:     "text-azul",
  cobre:    "text-cobre",
  marrom:   "text-marrom",
  light:    "text-white",
  muted:    "text-charcoal/50",
}

// -----------------------------------------------------------------------------
// MAPEAMENTO de nomes string para componentes Lucide
// (usado nos constants.ts onde ícones são strings)
// -----------------------------------------------------------------------------
export const ICON_MAP: Record<string, IconName> = {
  // Serviços hospitalares
  scalpel:       "Scissors",
  bed:           "BedDouble",
  microscope:    "Microscope",
  flask:         "FlaskConical",
  activity:      "Activity",
  presentation:  "Presentation",
  utensils:      "Utensils",

  // B2B
  timer:         "Timer",
  users:         "Users",
  "trending-up": "TrendingUp",
  headset:       "Headset",
  "building-2":  "Building2",
  "git-merge":   "GitMerge",

  // Especialidades
  bone:          "Bone",
  "heart-pulse": "HeartPulse",
  brain:         "Brain",
  stethoscope:   "Stethoscope",
  baby:          "Baby",
  eye:           "Eye",

  // Produtos
  crown:              "Crown",
  clock:              "Clock",
  "shield-check":     "ShieldCheck",
  "clipboard-check":  "ClipboardCheck",
  "user-check":       "UserCheck",
  wrench:             "Wrench",
  "heart-handshake":  "HeartHandshake",
  dumbbell:           "Dumbbell",
  sofa:               "Sofa",
  "settings-2":       "Settings2",

  // Especialidades — novas
  scan:               "Scan",
  scissors:           "Scissors",
  sparkles:           "Sparkles",
  waves:              "Waves",
  user:               "User",
  wind:               "Wind",

  // Serviços — ícones de feature
  "check-circle": "CircleCheck",

  // UI (social icons tratados em social-links.tsx com SVG próprio)
  instagram:     "Share2",
  linkedin:      "Share2",
  youtube:       "Play",
  phone:         "Phone",
  mail:          "Mail",
  "map-pin":     "MapPin",
  "chevron-down":"ChevronDown",
  "chevron-right":"ChevronRight",
  x:             "X",
  menu:          "Menu",
  "arrow-right": "ArrowRight",
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function Icon({
  name,
  size = 24,
  color = "current",
  strokeWidth = 1.5,
  className,
  "aria-label": ariaLabel,
}: IconProps) {
  const LucideComponent = icons[name] as LucideIcon | undefined

  if (!LucideComponent) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[Icon] ícone "${name}" não encontrado no lucide-react.`)
    }
    return null
  }

  return (
    <LucideComponent
      size={size}
      strokeWidth={strokeWidth}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      className={cn(colorStyles[color], className)}
    />
  )
}

// -----------------------------------------------------------------------------
// HELPER — resolve nome string (constants.ts) para IconName
// -----------------------------------------------------------------------------
export function resolveIconName(iconString: string): IconName {
  return (ICON_MAP[iconString] ?? "HelpCircle") as IconName
}
