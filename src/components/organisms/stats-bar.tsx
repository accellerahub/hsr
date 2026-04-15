// =============================================================================
// STATS-BAR.TSX — Organismo O03 | Hospital São Rafael
// =============================================================================
// Composição: H2 de seção + grid de 4 StatCards alinhados
// Comportamento: counter-up animation ao entrar no viewport
// =============================================================================

"use client"

import { cn } from "@/lib/utils"
import { Heading } from "@/components/atoms/heading"
import { StatCard } from "@/components/molecules/stat-card"
import { useIntersection } from "@/hooks/use-intersection"
import type { StatsData, StatItem, BaseComponentProps } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface StatsBarProps extends BaseComponentProps {
  data: StatsData
  theme?: "light" | "dark"
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function StatsBar({ data, theme = "light", className }: StatsBarProps) {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.15, once: true })

  const isLight = theme === "light"

  return (
    <section
      id="numeros"
      aria-labelledby="numeros-heading"
      ref={ref as React.RefObject<HTMLElement>}
      className={cn(
        "w-full py-16 lg:py-24",
        isLight ? "bg-creme" : "bg-charcoal",
        className
      )}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Headline */}
        <div
          className={cn(
            "mb-12 lg:mb-16 max-w-[680px]",
            "transition-all duration-700",
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <Heading
            as="h2"
            id="numeros-heading"
            color={isLight ? "default" : "light"}
          >
            {data.headline}
          </Heading>
        </div>

        {/* Grid de stat cards — alinhamento por top, altura igual via items-stretch */}
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2",
            data.items.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4",
            "divide-y sm:divide-y-0 sm:divide-x",
            isLight ? "divide-charcoal/10" : "divide-white/10"
          )}
        >
          {data.items.map((stat, index) => (
            <div
              key={stat.id}
              className={cn(
                "transition-all duration-700",
                hasIntersected
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: hasIntersected ? `${index * 120}ms` : "0ms" }}
            >
              <StatCard
                stat={stat as unknown as StatItem}
                theme={theme}
                static={!hasIntersected}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
