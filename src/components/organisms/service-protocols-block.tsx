// =============================================================================
// SERVICE-PROTOCOLS-BLOCK.TSX — Organismo | Hospital São Rafael
// =============================================================================
// Protocolos, segurança e certificações.
// Sinal E-E-A-T forte para SEO médico (Google prioriza autoridade clínica).
// =============================================================================

import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { Icon, resolveIconName } from "@/components/atoms/icon"
import type { BaseComponentProps } from "@/types"
import type { ServiceProtocolsData } from "@/lib/services-content"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ServiceProtocolsBlockProps extends BaseComponentProps {
  data: ServiceProtocolsData
  sectionId?: string
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function ServiceProtocolsBlock({
  data,
  sectionId = "protocolos",
  className,
}: ServiceProtocolsBlockProps) {
  const { kicker, headline, intro, items, certifications } = data

  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-heading`}
      className={cn("w-full py-20 lg:py-28 bg-charcoal text-white scroll-mt-24", className)}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 max-w-[760px] mb-12 lg:mb-16">
          <Kicker color="ouro">{kicker}</Kicker>
          <Heading as="h2" color="light" id={`${sectionId}-heading`}>
            {headline}
          </Heading>
          <div className="w-12 h-0.5 bg-ouro" aria-hidden />
          {intro && (
            <BodyText color="light-muted" size="base">
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
                "flex flex-col gap-3 p-6 rounded-xl",
                "bg-white/5 border border-white/10",
                "transition-colors hover:border-ouro/40"
              )}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-ouro/15">
                <Icon
                  name={resolveIconName(item.icon)}
                  size={20}
                  color="ouro"
                  strokeWidth={2}
                />
              </div>
              <Heading as="h3" color="light" className="!text-lg lg:!text-xl">
                {item.title}
              </Heading>
              <BodyText color="light-muted" size="sm">
                {item.description}
              </BodyText>
            </li>
          ))}
        </ul>

        {certifications && certifications.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-[10px] font-extrabold uppercase tracking-kicker text-white/50 mb-3">
              Certificações e normas de referência
            </p>
            <ul className="flex flex-wrap gap-2" role="list">
              {certifications.map((cert) => (
                <li
                  key={cert}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-white/10 border border-white/20"
                >
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
