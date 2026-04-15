// =============================================================================
// SERVICE-GALLERY-BLOCK.TSX — Organismo | Hospital São Rafael
// =============================================================================
// Layout 2 colunas: esquerda = carrossel de imagens auto-rotativo,
// direita = kicker + H2 + descrição + lista de features + CTA.
// =============================================================================

"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { Button } from "@/components/atoms/button"
import { Icon, resolveIconName } from "@/components/atoms/icon"
import { useIntersection } from "@/hooks/use-intersection"
import type { BaseComponentProps } from "@/types"
import type { ServiceGalleryBlockData } from "@/lib/services-content"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ServiceGalleryBlockProps extends BaseComponentProps {
  data: ServiceGalleryBlockData
}

// -----------------------------------------------------------------------------
// COMPONENTE — Carrossel de imagens
// -----------------------------------------------------------------------------
function ImageCarousel({
  images,
  className,
}: {
  images: ServiceGalleryBlockData["images"]
  className?: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

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

  // Auto-avanço a cada 3.5s
  useEffect(() => {
    if (images.length <= 1) return

    const interval = setInterval(() => {
      goTo((activeIndex + 1) % images.length)
    }, 3500)

    return () => clearInterval(interval)
  }, [activeIndex, images.length, goTo])

  const currentImage = images[activeIndex]

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Imagem principal */}
      <div className="relative rounded-xl overflow-hidden aspect-[4/3] w-full bg-neutral-100">
        {currentImage && (
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={cn(
              "object-cover transition-opacity duration-500",
              isVisible ? "opacity-100" : "opacity-0"
            )}
          />
        )}
        {/* Overlay suave no canto inferior */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent"
        />
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div
          className="flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Navegação de imagens"
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Ver imagem ${i + 1}: ${img.alt}`}
              onClick={() => goTo(i)}
              className={cn(
                "rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro",
                i === activeIndex
                  ? "w-6 h-2 bg-ouro"
                  : "w-2 h-2 bg-neutral-300 hover:bg-neutral-400"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// -----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// -----------------------------------------------------------------------------
export function ServiceGalleryBlock({ data, className }: ServiceGalleryBlockProps) {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.1, once: true })

  const { kicker, headline, description, images, features, cta } = data

  return (
    <section
      id="estrutura"
      ref={ref as React.RefObject<HTMLElement>}
      aria-labelledby="gallery-block-heading"
      className={cn("w-full py-20 lg:py-30 bg-white", className)}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Coluna esquerda — carrossel */}
          <div
            className={cn(
              "transition-all duration-700",
              hasIntersected ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            )}
          >
            <ImageCarousel images={images} />
          </div>

          {/* Coluna direita — conteúdo */}
          <div
            className={cn(
              "flex flex-col gap-6",
              "transition-all duration-700 delay-150",
              hasIntersected ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            )}
          >
            <Kicker color="marrom" as="span">{kicker}</Kicker>

            <Heading as="h2" id="gallery-block-heading">
              {headline}
            </Heading>

            <BodyText color="muted">
              {description}
            </BodyText>

            {/* Lista de features */}
            <ul className="flex flex-col gap-4 mt-2" role="list">
              {features.map((feature, index) => (
                <li
                  key={feature.title}
                  className={cn(
                    "flex gap-4 items-start",
                    "transition-all duration-700",
                    hasIntersected
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  )}
                  style={{
                    transitionDelay: hasIntersected ? `${300 + index * 80}ms` : "0ms",
                  }}
                >
                  {/* Ícone */}
                  <div className="flex-shrink-0 mt-0.5 text-ouro">
                    <Icon
                      name={resolveIconName(feature.icon)}
                      size={20}
                      color="ouro"
                      strokeWidth={2}
                    />
                  </div>

                  {/* Texto */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-charcoal">
                      {feature.title}
                    </span>
                    <span className="text-sm text-charcoal/60 leading-relaxed">
                      {feature.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-2">
              <Button variant="primary" size="lg" href={cta.href}>
                {cta.label}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
