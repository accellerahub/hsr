// =============================================================================
// SERVICE-INDICATIONS-BLOCK.TSX — Organismo | Hospital São Rafael
// =============================================================================
// Grid de indicações/aplicações do serviço. H3 + descrição por card.
// Nicho clínico (long-tail SEO): pé diabético, osteomielite, etc.
// =============================================================================

import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { Icon, resolveIconName } from "@/components/atoms/icon"
import type { BaseComponentProps } from "@/types"
import type { ServiceIndicationsData } from "@/lib/services-content"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ServiceIndicationsBlockProps extends BaseComponentProps {
  data: ServiceIndicationsData
  sectionId?: string
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function ServiceIndicationsBlock({
  data,
  sectionId = "indicacoes",
  className,
}: ServiceIndicationsBlockProps) {
  const { kicker, headline, intro, items, note } = data

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

        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {items.map((item) => (
            <li
              key={item.id}
              className={cn(
                "flex flex-col gap-3 p-6 rounded-xl bg-white",
                "border border-charcoal/5",
                "transition-colors hover:border-ouro/30",
                item.highlighted && "ring-2 ring-ouro/20"
              )}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-ouro/10">
                <Icon
                  name={resolveIconName(item.icon)}
                  size={20}
                  color="ouro"
                  strokeWidth={2}
                />
              </div>
              <Heading as="h3" className="!text-lg lg:!text-xl">
                {item.title}
              </Heading>
              <BodyText color="muted" size="sm">
                {item.description}
              </BodyText>
            </li>
          ))}
        </ul>

        {note && (
          <p className="mt-8 text-xs text-charcoal/50 max-w-[760px] italic">
            {note}
          </p>
        )}
      </div>
    </section>
  )
}
