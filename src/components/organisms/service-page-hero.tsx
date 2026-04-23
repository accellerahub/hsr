// =============================================================================
// SERVICE-PAGE-HERO.TSX — Organismo | Hospital São Rafael
// =============================================================================
// Hero fullscreen para páginas de serviço.
// Fundo: imagem com overlay escuro em gradiente.
// Conteúdo: Kicker → H1 → subheadline → pills → CTA
// =============================================================================

"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { Button } from "@/components/atoms/button"
import { useIntersection } from "@/hooks/use-intersection"
import type { BaseComponentProps } from "@/types"
import type { ServiceHeroData } from "@/lib/services-content"
import type { BreadcrumbItem } from "@/components/molecules/service-breadcrumb"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ServicePageHeroProps extends BaseComponentProps {
  data: ServiceHeroData
  /** Trilha de navegação exibida como overlay no topo do hero */
  breadcrumbItems?: BreadcrumbItem[]
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function ServicePageHero({ data, className, breadcrumbItems }: ServicePageHeroProps) {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.1, once: true })

  const { kicker, headline, subheadline, backgroundImage, pills } = data

  return (
    <section
      id="service-hero"
      ref={ref as React.RefObject<HTMLElement>}
      aria-labelledby="service-hero-heading"
      className={cn(
        "relative w-full min-h-[80vh] flex items-center",
        "overflow-hidden",
        className
      )}
    >
      {/* Imagem de fundo */}
      <Image
        src={backgroundImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden="true"
      />

      {/* Overlay gradiente escuro */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal/90"
      />

      {/* Breadcrumb overlay no topo do hero */}
      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <nav
          aria-label="Trilha de navegação"
          className="absolute top-16 lg:top-20 left-0 right-0 z-10"
        >
          <ol className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-1 text-xs text-white/70">
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1
              return (
                <li key={`${item.href}-${index}`} className="flex items-center gap-1">
                  {isLast ? (
                    <span aria-current="page" className="font-semibold text-white">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="hover:text-ouro transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro rounded"
                    >
                      {item.label}
                    </Link>
                  )}
                  {!isLast && (
                    <ChevronRight size={12} className="text-white/40" aria-hidden />
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
      )}

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-[760px] flex flex-col gap-6">

          {/* Kicker */}
          <div
            className={cn(
              "transition-all duration-700",
              hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <Kicker color="light" as="span">{kicker}</Kicker>
          </div>

          {/* H1 */}
          <div
            className={cn(
              "transition-all duration-700 delay-100",
              hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <Heading
              as="h1"
              color="light"
              id="service-hero-heading"
              className="max-w-[640px]"
            >
              {headline}
            </Heading>
          </div>

          {/* Subheadline */}
          <div
            className={cn(
              "transition-all duration-700 delay-200",
              hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <BodyText
              color="light-muted"
              size="lg"
              className="max-w-[560px]"
            >
              {subheadline}
            </BodyText>
          </div>

          {/* Pills */}
          {pills.length > 0 && (
            <div
              className={cn(
                "flex flex-wrap gap-2",
                "transition-all duration-700 delay-300",
                hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              role="list"
              aria-label="Destaques do serviço"
            >
              {pills.map((pill) => (
                <span
                  key={pill}
                  role="listitem"
                  className={cn(
                    "inline-flex items-center",
                    "px-4 py-1.5 rounded-full",
                    "text-xs font-semibold text-white",
                    "bg-white/10 backdrop-blur-sm border border-white/20",
                    "whitespace-nowrap"
                  )}
                >
                  {pill}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div
            className={cn(
              "transition-all duration-700 delay-[400ms]",
              hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <Button
              variant="primary"
              size="lg"
              href="#contato"
            >
              Falar com Atendimento
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}
