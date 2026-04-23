// =============================================================================
// TESTIMONIALS-CAROUSEL.TSX — Organismo | Hospital São Rafael
// =============================================================================
// Carrossel de depoimentos em fundo charcoal escuro.
// Layout: esquerda = headline + setas nav, direita = citação + autor.
// Auto-avança a cada 5s, pausa no hover.
// =============================================================================

"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Heading } from "@/components/atoms/heading"
import { useIntersection } from "@/hooks/use-intersection"
import type { BaseComponentProps } from "@/types"
import type { ServiceTestimonialsData } from "@/lib/services-content"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface TestimonialsCarouselProps extends BaseComponentProps {
  data: ServiceTestimonialsData
  /** Reservar gutter direito para TOC sidebar (xl+) */
  reserveRightGutter?: boolean
}

// -----------------------------------------------------------------------------
// HELPER — Iniciais do autor para avatar fallback
// -----------------------------------------------------------------------------
function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function TestimonialsCarousel({ data, className, reserveRightGutter = false }: TestimonialsCarouselProps) {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.1, once: true })

  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const { headline, items } = data

  const goTo = useCallback(
    (index: number) => {
      setIsVisible(false)
      setTimeout(() => {
        setActiveIndex(index)
        setIsVisible(true)
      }, 250)
    },
    []
  )

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + items.length) % items.length)
  }, [activeIndex, items.length, goTo])

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % items.length)
  }, [activeIndex, items.length, goTo])

  // Auto-avanço a cada 5s
  useEffect(() => {
    if (isPaused || items.length <= 1) return

    intervalRef.current = setInterval(() => {
      goTo((activeIndex + 1) % items.length)
    }, 5000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [activeIndex, items.length, isPaused, goTo])

  const currentItem = items[activeIndex]

  return (
    <section
      id="depoimentos"
      ref={ref as React.RefObject<HTMLElement>}
      aria-labelledby="testimonials-heading"
      className={cn("w-full py-20 lg:py-30 bg-charcoal", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={cn(
        "max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8",
        reserveRightGutter && "xl:pr-[260px] 2xl:pr-[300px]"
      )}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-center">

          {/* Coluna esquerda — headline + controles */}
          <div
            className={cn(
              "flex flex-col gap-8",
              "transition-all duration-700",
              hasIntersected ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            )}
          >
            <div className="flex flex-col gap-4">
              <span className="text-xs font-extrabold uppercase tracking-kicker text-white/40">
                DEPOIMENTOS
              </span>
              <Heading as="h2" color="light" id="testimonials-heading">
                {headline}
              </Heading>
              <div className="w-12 h-0.5 bg-ouro" aria-hidden="true" />
            </div>

            {/* Botões de navegação */}
            {items.length > 1 && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Depoimento anterior"
                  className={cn(
                    "w-12 h-12 rounded-full border border-white/20",
                    "flex items-center justify-center",
                    "text-white/60 hover:text-white hover:border-white/60",
                    "transition-all duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro"
                  )}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Próximo depoimento"
                  className={cn(
                    "w-12 h-12 rounded-full border border-white/20",
                    "flex items-center justify-center",
                    "text-white/60 hover:text-white hover:border-white/60",
                    "transition-all duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro"
                  )}
                >
                  <ChevronRight size={20} />
                </button>

                {/* Contador */}
                <span className="text-sm text-white/40 ml-2">
                  {activeIndex + 1} / {items.length}
                </span>
              </div>
            )}
          </div>

          {/* Coluna direita — citação */}
          <div
            className={cn(
              "flex flex-col gap-8",
              "transition-all duration-700 delay-150",
              hasIntersected ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            )}
          >
            {currentItem && (
              <blockquote
                className={cn(
                  "flex flex-col gap-6",
                  "transition-opacity duration-500",
                  isVisible ? "opacity-100" : "opacity-0"
                )}
              >
                {/* Aspas decorativas */}
                <span
                  className="text-8xl font-extrabold text-ouro leading-none select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                {/* Texto da citação */}
                <p className="text-xl lg:text-2xl font-semibold text-white leading-relaxed -mt-8">
                  {currentItem.quote}
                </p>

                {/* Autor */}
                <footer className="flex items-center gap-4 mt-2">
                  {/* Avatar */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex-shrink-0",
                      "flex items-center justify-center",
                      "bg-ouro/20 border border-ouro/30",
                      "text-sm font-bold text-ouro"
                    )}
                    aria-hidden="true"
                  >
                    {getInitials(currentItem.author)}
                  </div>

                  {/* Nome e papel */}
                  <div className="flex flex-col gap-0.5">
                    <cite className="not-italic text-sm font-bold text-white">
                      {currentItem.author}
                    </cite>
                    <span className="text-xs text-white/50">
                      {currentItem.role}
                    </span>
                  </div>
                </footer>
              </blockquote>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
