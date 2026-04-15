// =============================================================================
// SERVICE-HIGHLIGHTS.TSX — Organismo | Hospital São Rafael
// =============================================================================
// Grid de cards com métricas-chave do serviço.
// Fundo creme, cards brancos, métrica em ouro, ícone marrom.
// =============================================================================

"use client"

import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { Icon, resolveIconName } from "@/components/atoms/icon"
import { useIntersection } from "@/hooks/use-intersection"
import type { BaseComponentProps } from "@/types"
import type { ServiceHighlightsData } from "@/lib/services-content"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ServiceHighlightsProps extends BaseComponentProps {
  data: ServiceHighlightsData
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function ServiceHighlights({ data, className }: ServiceHighlightsProps) {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.1, once: true })

  const { kicker, headline, items } = data

  return (
    <section
      id="diferenciais"
      ref={ref as React.RefObject<HTMLElement>}
      aria-labelledby="highlights-heading"
      className={cn("w-full py-20 lg:py-30 bg-creme", className)}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabeçalho */}
        <div
          className={cn(
            "flex flex-col gap-4 mb-12 lg:mb-16 max-w-[640px]",
            "transition-all duration-700",
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <Kicker color="marrom" as="span">{kicker}</Kicker>
          <Heading as="h2" id="highlights-heading">
            {headline}
          </Heading>
          <div className="w-12 h-0.5 bg-cobre" aria-hidden="true" />
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <article
              key={item.id}
              className={cn(
                "bg-white rounded-xl p-8 border border-neutral-100 h-full flex flex-col gap-3",
                "transition-all duration-700",
                hasIntersected
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{
                transitionDelay: hasIntersected ? `${index * 100}ms` : "0ms",
              }}
            >
              {/* Ícone */}
              <div className="text-marrom">
                <Icon
                  name={resolveIconName(item.icon)}
                  size={28}
                  color="marrom"
                  strokeWidth={1.5}
                />
              </div>

              {/* Métrica */}
              {item.metric && (
                <p className="text-4xl font-extrabold text-ouro leading-none">
                  {item.metric}
                </p>
              )}

              {/* Título */}
              <h3 className="text-base font-bold text-azul-escuro leading-tight">
                {item.title}
              </h3>

              {/* Descrição */}
              <p className="text-sm text-charcoal/60 leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
