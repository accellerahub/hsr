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
// ÍCONES CUSTOM (não disponíveis em lucide-react)
// -----------------------------------------------------------------------------

interface CustomSvgProps {
  size?: number
  strokeWidth?: number
  className?: string
  "aria-label"?: string
  "aria-hidden"?: boolean
}

/** Ícone anatômico — útero com tubas e ovários. Usado em Ginecologia. */
function UterusIcon({
  size = 24,
  strokeWidth = 1.5,
  className,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
}: CustomSvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    >
      <circle cx="4" cy="6" r="1.5" />
      <circle cx="20" cy="6" r="1.5" />
      <path d="M5.5 6c2 0 3.5 1.5 3.5 3.5v3c0 1.6-.5 3.2-1.5 4.5" />
      <path d="M18.5 6c-2 0-3.5 1.5-3.5 3.5v3c0 1.6.5 3.2 1.5 4.5" />
      <path d="M7.5 17h9" />
      <path d="M12 17v3.5" />
      <path d="M10 20.5h4" />
    </svg>
  )
}

const CUSTOM_ICONS: Record<string, React.FC<CustomSvgProps>> = {
  Uterus: UterusIcon,
}

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
  uterus:        "Uterus" as IconName,
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
  // Custom SVGs (não disponíveis no lucide-react)
  const Custom = CUSTOM_ICONS[name as unknown as string]
  if (Custom) {
    return (
      <Custom
        size={size}
        strokeWidth={strokeWidth}
        aria-label={ariaLabel}
        aria-hidden={!ariaLabel}
        className={cn(colorStyles[color], className)}
      />
    )
  }

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
