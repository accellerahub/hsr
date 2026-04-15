// =============================================================================
// CTA-BANNER.TSX — Molécula M07 | Hospital São Rafael
// =============================================================================
// Banner de conversão inline (entre seções).
// Texto persuasivo + Button Primary + background com overlay opcional.
// =============================================================================

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/atoms/button"
import type { BaseComponentProps } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface CTABannerProps extends BaseComponentProps {
  headline: string
  subtext?: string
  ctaLabel: string
  ctaHref?: string
  onCtaClick?: () => void
  /** URL de imagem de fundo */
  backgroundImage?: string
  /** Variante de fundo */
  variant?: "ouro" | "charcoal" | "creme" | "image"
}

// -----------------------------------------------------------------------------
// ESTILOS POR VARIANTE
// -----------------------------------------------------------------------------
const variantStyles: Record<NonNullable<CTABannerProps["variant"]>, string> = {
  ouro:     "bg-ouro",
  charcoal: "bg-charcoal",
  creme:    "bg-creme border border-charcoal/10",
  image:    "relative overflow-hidden bg-charcoal",
}

const headlineColor: Record<NonNullable<CTABannerProps["variant"]>, string> = {
  ouro:     "text-charcoal",
  charcoal: "text-white",
  creme:    "text-charcoal",
  image:    "text-white",
}

const subtextColor: Record<NonNullable<CTABannerProps["variant"]>, string> = {
  ouro:     "text-charcoal/70",
  charcoal: "text-white/70",
  creme:    "text-charcoal/60",
  image:    "text-white/70",
}

const ctaVariant: Record<NonNullable<CTABannerProps["variant"]>, "primary" | "outline" | "secondary"> = {
  ouro:     "secondary",
  charcoal: "primary",
  creme:    "primary",
  image:    "primary",
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function CTABanner({
  headline,
  subtext,
  ctaLabel,
  ctaHref,
  onCtaClick,
  backgroundImage,
  variant = "charcoal",
  className,
}: CTABannerProps) {
  return (
    <div
      className={cn(
        "relative py-12 px-8 lg:px-16",
        variantStyles[variant],
        className
      )}
    >
      {/* Imagem de fundo (variant "image") */}
      {variant === "image" && backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            aria-hidden
          />
          <div className="absolute inset-0 hero-overlay" aria-hidden />
        </>
      )}

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
        <div className="flex flex-col gap-2 text-center lg:text-left">
          <h2
            className={cn(
              "text-2xl lg:text-3xl font-bold leading-tight",
              headlineColor[variant]
            )}
          >
            {headline}
          </h2>
          {subtext && (
            <p className={cn("text-sm", subtextColor[variant])}>{subtext}</p>
          )}
        </div>

        <Button
          variant={ctaVariant[variant]}
          size="lg"
          href={ctaHref}
          onClick={onCtaClick}
          className="flex-shrink-0"
        >
          {ctaLabel}
        </Button>
      </div>
    </div>
  )
}
