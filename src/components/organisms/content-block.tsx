// =============================================================================
// CONTENT-BLOCK.TSX — Organismo O04 | Hospital São Rafael
// =============================================================================
// Composição: Kicker + H2 + texto longo + CTAs, layout assimétrico texto+imagem
// Variações: com imagem lateral, apenas texto, fundo alternativo
// Usado na dobra de Diferenciais (dobra 3)
// =============================================================================

"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { Button } from "@/components/atoms/button"
import { useIntersection } from "@/hooks/use-intersection"
import type { BaseComponentProps, ContentBlockData } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ContentBlockProps extends BaseComponentProps {
  data: ContentBlockData
  /** Direção do layout — imagem à direita (default) ou esquerda */
  imagePosition?: "right" | "left"
  /** Fundo da seção */
  background?: "white" | "creme" | "charcoal"
  /** ID da âncora para scroll-spy */
  id?: string
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function ContentBlock({
  data,
  imagePosition = "right",
  background = "creme",
  id = "diferenciais",
  className,
}: ContentBlockProps) {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.15, once: true })

  const { kicker, headline, description, ctas, image } = data
  const isDark = background === "charcoal"
  const imageOnLeft = imagePosition === "left"

  const bgClasses: Record<string, string> = {
    white: "bg-white",
    creme: "bg-creme",
    charcoal: "bg-charcoal",
  }

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      ref={ref as React.RefObject<HTMLElement>}
      className={cn("w-full py-20 lg:py-30", bgClasses[background], className)}
    >
      <div
        className={cn(
          "max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8",
          "grid grid-cols-1 lg:grid-cols-2",
          "items-center gap-12 lg:gap-20",
          // Inversão da ordem se imagem à esquerda
          image && imageOnLeft && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
        )}
      >
        {/* ---------------------------------------------------------------- */}
        {/* COLUNA DE TEXTO                                                   */}
        {/* ---------------------------------------------------------------- */}
        <div
          className={cn(
            "flex flex-col gap-6",
            "transition-all duration-700",
            hasIntersected ? "opacity-100 translate-x-0" : imageOnLeft ? "opacity-0 translate-x-8" : "opacity-0 -translate-x-8"
          )}
        >
          {/* Kicker */}
          <Kicker color={isDark ? "light" : "ouro"}>
            {kicker}
          </Kicker>

          {/* Headline */}
          <Heading
            as="h2"
            id={`${id}-heading`}
            color={isDark ? "light" : "default"}
            className="max-w-[520px]"
          >
            {headline}
          </Heading>

          {/* Linha decorativa */}
          <div className="w-12 h-0.5 bg-cobre" aria-hidden="true" />

          {/* Descrição */}
          <div className="flex flex-col gap-4">
            {(Array.isArray(description) ? description : [description]).map((paragraph, i) => (
              <BodyText
                key={i}
                color={isDark ? "light" : "default"}
                className="max-w-[480px]"
              >
                {paragraph}
              </BodyText>
            ))}
          </div>

          {/* CTAs */}
          {ctas.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              {ctas.map((cta, index) => (
                <Button
                  key={cta.href}
                  variant={index === 0 ? "primary" : "outline"}
                  size="md"
                  href={cta.href}
                >
                  {cta.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* COLUNA DE IMAGEM (opcional)                                       */}
        {/* ---------------------------------------------------------------- */}
        {image && (
          <div
            className={cn(
              "relative w-full aspect-[4/3] lg:aspect-[3/4] overflow-hidden rounded-3xl",
              "transition-all duration-700 delay-200",
              hasIntersected ? "opacity-100 translate-x-0" : imageOnLeft ? "opacity-0 -translate-x-8" : "opacity-0 translate-x-8"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority={false}
            />
            {/* Borda decorativa offset */}
            <div
              aria-hidden="true"
              className={cn(
                "absolute -bottom-3 -right-3 w-full h-full border-2 border-cobre/30 pointer-events-none",
                imageOnLeft && "-bottom-3 -left-3 right-auto"
              )}
            />
          </div>
        )}
      </div>
    </section>
  )
}
