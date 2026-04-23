// =============================================================================
// SERVICE-EQUIPMENT-BLOCK.TSX — Organismo | Hospital São Rafael
// =============================================================================
// Lista de equipamentos/tecnologia do serviço.
// Long-tail SEO: marcas, modelos, specs técnicas.
// =============================================================================

import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { Icon, resolveIconName } from "@/components/atoms/icon"
import type { BaseComponentProps } from "@/types"
import type { ServiceEquipmentData } from "@/lib/services-content"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ServiceEquipmentBlockProps extends BaseComponentProps {
  data: ServiceEquipmentData
  sectionId?: string
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function ServiceEquipmentBlock({
  data,
  sectionId = "equipamentos",
  className,
}: ServiceEquipmentBlockProps) {
  const { kicker, headline, description, items } = data

  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-heading`}
      className={cn("w-full py-20 lg:py-28 bg-white scroll-mt-24", className)}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 max-w-[760px] mb-12 lg:mb-16">
          <Kicker color="cobre">{kicker}</Kicker>
          <Heading as="h2" id={`${sectionId}-heading`}>
            {headline}
          </Heading>
          <div className="w-12 h-0.5 bg-cobre" aria-hidden />
          {description && (
            <BodyText color="muted" size="base">
              {description}
            </BodyText>
          )}
        </header>

        <ul
          role="list"
          className="flex flex-col divide-y divide-charcoal/10 border-y border-charcoal/10 max-w-[960px]"
        >
          {items.map((item, i) => (
            <li
              key={`${item.title}-${i}`}
              className="flex flex-col sm:flex-row sm:items-start gap-4 py-6"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-charcoal/5 flex-shrink-0">
                <Icon
                  name={resolveIconName(item.icon)}
                  size={22}
                  color="charcoal"
                  strokeWidth={1.75}
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <Heading as="h3" className="!text-lg lg:!text-xl">
                  {item.title}
                </Heading>
                <BodyText color="muted" size="base">
                  {item.description}
                </BodyText>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
