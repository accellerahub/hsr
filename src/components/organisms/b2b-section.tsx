// =============================================================================
// B2B-SECTION.TSX — Organismo O06 | Hospital São Rafael
// =============================================================================
// Composição: Background charcoal + Kicker + H2 + H3 sub + 4 FeatureCards + Depoimentos + CTA
// Visual: fundo #2E2E2E, texto branco, acentos ouro — separação forte de público
// =============================================================================

"use client"

import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { Button } from "@/components/atoms/button"
import { FeatureCard } from "@/components/molecules/feature-card"
import { TestimonialCard } from "@/components/molecules/testimonial-card"
import { useIntersection } from "@/hooks/use-intersection"
import type { BaseComponentProps, B2BData } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface B2BSectionProps extends BaseComponentProps {
  data: B2BData
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function B2BSection({ data, className }: B2BSectionProps) {
  const { ref: headerRef, hasIntersected: headerVisible } = useIntersection({
    threshold: 0.15,
    once: true,
  })
  const { ref: cardsRef, hasIntersected: cardsVisible } = useIntersection({
    threshold: 0.08,
    once: true,
  })
  const { ref: testimonialsRef, hasIntersected: testimonialsVisible } = useIntersection({
    threshold: 0.1,
    once: true,
  })

  const { kicker, headline, subheadline, features, testimonials, cta } = data

  return (
    <section
      id="medicos"
      aria-labelledby="medicos-heading"
      className={cn("w-full bg-charcoal py-20 lg:py-30", className)}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ---------------------------------------------------------------- */}
        {/* CABEÇALHO DA SEÇÃO                                                */}
        {/* ---------------------------------------------------------------- */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "flex flex-col gap-5 mb-16",
            "lg:flex-row lg:items-end lg:justify-between lg:gap-16",
            "transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          {/* Texto */}
          <div className="flex flex-col gap-4 max-w-[600px]">
            <Kicker color="marrom">{kicker}</Kicker>

            <Heading as="h2" id="medicos-heading" color="light">
              {headline}
            </Heading>

            {/* Linha decorativa */}
            <div className="w-12 h-0.5 bg-cobre" aria-hidden="true" />

            {/* H3 Sub — posicionado como intro abaixo do divisor */}
            {subheadline && (
              <p className="text-lg font-semibold text-white/70 leading-snug">
                {subheadline}
              </p>
            )}
          </div>

          {/* CTA alinhado à direita no desktop */}
          <div className="flex-shrink-0">
            <Button variant="primary" size="md" href={cta.href}>
              {cta.label}
            </Button>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* FEATURE CARDS — 4 cards em 2×2 (tablet) ou 4 colunas (desktop)   */}
        {/* ---------------------------------------------------------------- */}
        <div
          ref={cardsRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
        >
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={cn(
                "transition-all duration-700",
                cardsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: cardsVisible ? `${index * 100}ms` : "0ms" }}
            >
              <FeatureCard feature={feature} className="h-full" />
            </div>
          ))}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* DIVISOR                                                           */}
        {/* ---------------------------------------------------------------- */}
        <div className="border-t border-white/10 mb-16" aria-hidden="true" />

        {/* ---------------------------------------------------------------- */}
        {/* DEPOIMENTOS                                                       */}
        {/* ---------------------------------------------------------------- */}
        {testimonials.length > 0 && (
          <div ref={testimonialsRef as React.RefObject<HTMLDivElement>}>
            <p
              className={cn(
                "text-xs font-extrabold uppercase tracking-kicker text-white/40 mb-8",
                "transition-all duration-500",
                testimonialsVisible ? "opacity-100" : "opacity-0"
              )}
            >
              O que dizem nossos médicos parceiros
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={cn(
                    "transition-all duration-700",
                    testimonialsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  )}
                  style={{ transitionDelay: testimonialsVisible ? `${index * 150}ms` : "0ms" }}
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    variant="medico"
                    theme="dark"
                    className="h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
