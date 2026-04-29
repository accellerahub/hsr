// =============================================================================
// SERVICE-ACOMPANHANTE-BLOCK.TSX — Organismo | Hospital São Rafael
// =============================================================================
// Bloco "Para quem está com você" — endereça o acompanhante/família, decisor
// sombra que costuma reclamar publicamente quando mal acolhido. Estética
// acolhedora (creme + cobre), sem CTA de venda — informativo + reforço.
// =============================================================================

import { HeartHandshake } from "lucide-react"
import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { Icon, resolveIconName } from "@/components/atoms/icon"
import type { BaseComponentProps } from "@/types"
import type { ServiceAcompanhanteBlockData } from "@/lib/services-content"

interface ServiceAcompanhanteBlockProps extends BaseComponentProps {
  data: ServiceAcompanhanteBlockData
  sectionId?: string
}

export function ServiceAcompanhanteBlock({
  data,
  sectionId = "acompanhante",
  className,
}: ServiceAcompanhanteBlockProps) {
  const { kicker, headline, description, amenities, note } = data

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
        <header className="flex flex-col gap-4 max-w-[760px] mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-cobre/10 ring-1 ring-cobre/30">
            <HeartHandshake size={14} className="text-cobre" aria-hidden />
            <Kicker color="cobre" className="!mb-0 !text-[11px] lg:!text-xs">
              {kicker}
            </Kicker>
          </div>
          <Heading as="h2" id={`${sectionId}-heading`}>
            {headline}
          </Heading>
          <span aria-hidden className="block w-12 h-0.5 bg-cobre" />
          {description && (
            <BodyText color="muted" size="base">
              {description}
            </BodyText>
          )}
        </header>

        <ul
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          )}
          role="list"
        >
          {amenities.map((item) => (
            <li
              key={item.title}
              className={cn(
                "rounded-2xl bg-white",
                "ring-1 ring-cobre/15",
                "px-6 py-6 lg:px-7 lg:py-7",
                "flex flex-col gap-3",
                "shadow-[0_1px_2px_rgba(46,46,46,0.04)]",
                "hover:ring-cobre/30 hover:shadow-[0_8px_24px_-12px_rgba(192,138,99,0.2)]",
                "transition-all duration-300"
              )}
            >
              <div className="text-cobre">
                <Icon
                  name={resolveIconName(item.icon)}
                  size={22}
                  color="cobre"
                  strokeWidth={2}
                />
              </div>
              <span className="text-base font-bold text-charcoal leading-snug">
                {item.title}
              </span>
              <span className="text-sm text-charcoal/65 leading-relaxed">
                {item.description}
              </span>
            </li>
          ))}
        </ul>

        {note && (
          <p className="mt-10 text-sm text-charcoal/60 max-w-[760px] italic">
            {note}
          </p>
        )}
      </div>
    </section>
  )
}
