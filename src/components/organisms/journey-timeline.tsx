// =============================================================================
// JOURNEY-TIMELINE.TSX — Organismo O07 | Hospital São Rafael
// =============================================================================
// Composição: Kicker + H2 + array de TimelineSteps (M04) + CTAs por etapa
// Visual: horizontal no desktop, vertical no mobile
// Comportamento: scroll-triggered reveal progressivo
// =============================================================================

"use client"

import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { TimelineStep } from "@/components/molecules/timeline-step"
import { useIntersection } from "@/hooks/use-intersection"
import type { BaseComponentProps, JornadaData } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface JourneyTimelineProps extends BaseComponentProps {
  data: JornadaData
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function JourneyTimeline({ data, className }: JourneyTimelineProps) {
  const { ref: headerRef, hasIntersected: headerVisible } = useIntersection({
    threshold: 0.2,
    once: true,
  })
  const { ref: stepsRef, hasIntersected: stepsVisible } = useIntersection({
    threshold: 0.1,
    once: true,
  })

  const { kicker, headline, description, steps } = data

  return (
    <section
      id="jornada"
      aria-labelledby="jornada-heading"
      className={cn("w-full py-20 lg:py-30 bg-creme overflow-hidden", className)}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ---------------------------------------------------------------- */}
        {/* CABEÇALHO                                                         */}
        {/* ---------------------------------------------------------------- */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "flex flex-col gap-4 mb-16 max-w-[640px]",
            "transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <Kicker color="marrom">{kicker}</Kicker>
          <Heading as="h2" id="jornada-heading">
            {headline}
          </Heading>
          <div className="w-12 h-0.5 bg-cobre" aria-hidden="true" />
          <BodyText color="muted">{description}</BodyText>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* GRID DE CARDS                                                     */}
        {/* ---------------------------------------------------------------- */}
        <div
          ref={stepsRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
          role="list"
          aria-label="Etapas da jornada do paciente"
        >
          {steps.map((step, index) => (
            <div
              key={step.id}
              role="listitem"
              className={cn(
                "h-full transition-all duration-700",
                stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: stepsVisible ? `${index * 150}ms` : "0ms" }}
            >
              <TimelineStep step={step} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
