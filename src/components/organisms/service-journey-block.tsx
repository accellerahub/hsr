// =============================================================================
// SERVICE-JOURNEY-BLOCK.TSX — Organismo | Hospital São Rafael
// =============================================================================
// Jornada do paciente passo-a-passo. Timeline visual numerada.
// Reduz ansiedade + captura busca "como é o processo/tratamento".
// =============================================================================

import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import type { BaseComponentProps } from "@/types"
import type { ServiceJourneyData } from "@/lib/services-content"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ServiceJourneyBlockProps extends BaseComponentProps {
  data: ServiceJourneyData
  sectionId?: string
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function ServiceJourneyBlock({
  data,
  sectionId = "jornada",
  className,
}: ServiceJourneyBlockProps) {
  const { kicker, headline, intro, steps } = data

  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-heading`}
      className={cn("w-full py-20 lg:py-28 bg-creme scroll-mt-24", className)}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:pr-[260px] 2xl:pr-[300px]">
        <header className="flex flex-col gap-4 max-w-[760px] mb-12 lg:mb-16">
          <Kicker color="cobre">{kicker}</Kicker>
          <Heading as="h2" id={`${sectionId}-heading`}>
            {headline}
          </Heading>
          <div className="w-12 h-0.5 bg-cobre" aria-hidden />
          {intro && (
            <BodyText color="muted" size="base">
              {intro}
            </BodyText>
          )}
        </header>

        <ol className="relative flex flex-col gap-6 lg:gap-8 max-w-[860px]" role="list">
          {steps.map((step, i) => (
            <li
              key={`${step.number}-${i}`}
              className="relative flex gap-5 lg:gap-6"
            >
              {/* Linha conectora vertical */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-6 lg:left-7 top-14 lg:top-16 bottom-[-1.5rem] lg:bottom-[-2rem] w-px bg-ouro/30"
                />
              )}

              {/* Bolha numerada */}
              <div className="flex-shrink-0">
                <span
                  className={cn(
                    "flex items-center justify-center",
                    "w-12 h-12 lg:w-14 lg:h-14 rounded-full",
                    "bg-ouro text-charcoal",
                    "text-lg lg:text-xl font-extrabold",
                    "shadow-sm"
                  )}
                >
                  {step.number}
                </span>
              </div>

              {/* Conteúdo */}
              <div className="flex flex-col gap-2 pt-2 flex-1">
                <Heading as="h3" className="!text-lg lg:!text-xl">
                  {step.title}
                </Heading>
                <BodyText color="muted" size="base">
                  {step.description}
                </BodyText>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
