// =============================================================================
// FAQ-SECTION.TSX — Organismo O08 | Hospital São Rafael
// =============================================================================
// Composição: Kicker + H2 + FAQList (accordion de M05)
// Visual: fundo neutro, accordion limpo, transições suaves
// =============================================================================

"use client"

import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { FAQList } from "@/components/molecules/faq-item"
import { useIntersection } from "@/hooks/use-intersection"
import type { BaseComponentProps, FAQData } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface FAQSectionProps extends BaseComponentProps {
  data: FAQData
  /** Fundo da seção */
  background?: "white" | "creme"
  /** Reservar gutter direito para TOC sidebar (xl+) */
  reserveRightGutter?: boolean
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function FAQSection({ data, background = "white", className, reserveRightGutter = false }: FAQSectionProps) {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.15, once: true })

  const { kicker, headline, items } = data

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      ref={ref as React.RefObject<HTMLElement>}
      className={cn(
        "w-full py-20 lg:py-30",
        background === "white" ? "bg-white" : "bg-creme",
        className
      )}
    >
      <div className={cn(
        "max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8",
        reserveRightGutter && "xl:pr-[260px] 2xl:pr-[300px]"
      )}>
        {/* Layout de 2 colunas no desktop: heading à esquerda, accordion à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">

          {/* Coluna de heading */}
          <div
            className={cn(
              "flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start",
              "transition-all duration-700",
              hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <Kicker color="marrom">{kicker}</Kicker>
            <Heading as="h2" id="faq-heading">
              {headline}
            </Heading>
            <div className="w-12 h-0.5 bg-cobre" aria-hidden="true" />
          </div>

          {/* Coluna do accordion */}
          <div
            className={cn(
              "transition-all duration-700 delay-200",
              hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <FAQList
              items={items}
              theme="light"
              type="single"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
