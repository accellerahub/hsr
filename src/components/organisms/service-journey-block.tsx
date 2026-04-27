// =============================================================================
// SERVICE-JOURNEY-BLOCK.TSX — Organismo | Hospital São Rafael
// =============================================================================
// Jornada do paciente passo-a-passo. Timeline editorial: cartão branco por
// etapa, bullet outlined em cobre conectado por linha vertical com gradient.
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
      className={cn(
        "w-full py-20 lg:py-28 bg-creme scroll-mt-24",
        className
      )}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:pr-[260px] 2xl:pr-[300px]">
        {/* Header */}
        <header className="flex flex-col gap-4 max-w-[760px] mb-14 lg:mb-20">
          <Kicker color="cobre">{kicker}</Kicker>
          <Heading as="h2" id={`${sectionId}-heading`}>
            {headline}
          </Heading>
          <span aria-hidden className="block w-12 h-0.5 bg-cobre" />
          {intro && (
            <BodyText color="muted" size="base">
              {intro}
            </BodyText>
          )}
        </header>

        {/* Timeline */}
        <ol className="flex flex-col max-w-[860px]" role="list">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1
            const stepNum = step.number.padStart(2, "0")

            return (
              <li
                key={`${step.number}-${i}`}
                className={cn(
                  "grid grid-cols-[auto_1fr] gap-x-5 lg:gap-x-7",
                  !isLast && "pb-6 lg:pb-8"
                )}
              >
                {/* Coluna esquerda — bullet + linha conectora */}
                <div className="relative flex flex-col items-center">
                  <span
                    className={cn(
                      "z-10 flex flex-shrink-0 items-center justify-center",
                      "w-11 h-11 lg:w-12 lg:h-12 rounded-full",
                      "bg-creme ring-1 ring-cobre/60",
                      "shadow-[0_0_0_4px_rgba(252,249,246,1)]"
                    )}
                  >
                    <span className="text-[11px] lg:text-xs font-extrabold tracking-[0.18em] text-cobre">
                      {stepNum}
                    </span>
                  </span>
                  {!isLast && (
                    <span
                      aria-hidden
                      className="flex-1 w-px my-2 bg-gradient-to-b from-cobre/40 via-cobre/20 to-cobre/10"
                    />
                  )}
                </div>

                {/* Coluna direita — cartão */}
                <article
                  className={cn(
                    "group bg-white rounded-2xl",
                    "ring-1 ring-cobre/10",
                    "px-6 py-6 lg:px-9 lg:py-8",
                    "shadow-[0_1px_2px_rgba(46,46,46,0.04)]",
                    "hover:ring-cobre/25 hover:shadow-[0_10px_30px_-12px_rgba(192,138,99,0.25)]",
                    "transition-all duration-300"
                  )}
                >
                  <Kicker
                    color="cobre"
                    className="!mb-2 !text-[11px] lg:!text-xs"
                  >
                    Etapa {step.number}
                  </Kicker>
                  <Heading
                    as="h3"
                    className="!text-lg lg:!text-xl !leading-snug !text-charcoal"
                  >
                    {step.title}
                  </Heading>
                  <span
                    aria-hidden
                    className="block w-10 h-px bg-ouro/70 mt-4 mb-5 transition-all duration-300 group-hover:w-16 group-hover:bg-ouro"
                  />
                  <BodyText color="muted" size="base">
                    {step.description}
                  </BodyText>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
