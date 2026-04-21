// =============================================================================
// HERO-SECTION.TSX — Organismo O02 | Hospital São Rafael
// =============================================================================
// Composição: Vídeo/imagem fullscreen + overlay + Kicker + H1 + subtítulo + CTA
// Comportamento: vídeo autoplay muted loop, overlay gradient, parallax sutil
// =============================================================================

"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { Button } from "@/components/atoms/button"
import type { BaseComponentProps, HeroData } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface HeroSectionProps extends BaseComponentProps {
  data: HeroData
  /** Callback ao clicar no CTA */
  onCtaClick?: () => void
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function HeroSection({ data, onCtaClick, className }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const { kicker, headline, subheadline, ctaPrimary, video } = data

  return (
    <section
      id="hero"
      aria-label="Seção principal"
      className={cn(
        "relative w-full min-h-screen flex items-center justify-center overflow-hidden",
        className
      )}
    >
      {/* ---------------------------------------------------------------- */}
      {/* FUNDO: Vídeo (ou imagem fallback)                                 */}
      {/* ---------------------------------------------------------------- */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="w-full h-full object-cover"
        >
          {/* Fallback: imagem estática se vídeo não carregar */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={video.poster}
            alt={video.alt}
            className="w-full h-full object-cover"
          />
        </video>

        {/* Overlay gradient — direcional: mais escuro onde o texto está */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(145deg, rgba(20,20,20,0.72) 0%, rgba(20,20,20,0.55) 45%, rgba(20,20,20,0.25) 100%)",
          }}
        />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* CONTEÚDO                                                          */}
      {/* ---------------------------------------------------------------- */}
      <div
        className={cn(
          "relative z-10",
          "max-w-[1280px] w-full mx-auto",
          "px-4 sm:px-6 lg:px-8",
          // Padding top para compensar o header fixed
          "pt-24 pb-20 lg:pt-32 lg:pb-24",
          "flex flex-col items-start",
          "gap-6"
        )}
      >
        {/* Kicker */}
        <Kicker color="marrom" className="animate-fade-in-up">
          {kicker}
        </Kicker>

        {/* Headline H1 */}
        <Heading
          as="h1"
          color="light"
          className={cn(
            "max-w-[700px]",
            "animate-fade-in-up [animation-delay:150ms]",
            "[text-shadow:0_2px_24px_rgba(0,0,0,0.45)]"
          )}
        >
          {headline}
        </Heading>

        {/* Subtítulo */}
        <div className={cn("flex flex-col gap-3 animate-fade-in-up [animation-delay:300ms]")}>
          {(Array.isArray(subheadline) ? subheadline : [subheadline]).map((paragraph, i) => (
            <BodyText
              key={i}
              color="light"
              className="max-w-[560px] opacity-90"
            >
              {paragraph}
            </BodyText>
          ))}
        </div>

        {/* CTAs */}
        <div
          className={cn(
            "flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2",
            "animate-fade-in-up [animation-delay:450ms]"
          )}
        >
          <Button
            variant="primary"
            size="lg"
            href={ctaPrimary.href}
            onClick={onCtaClick}
          >
            {ctaPrimary.label}
          </Button>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* INDICADOR DE SCROLL — seta animada                                */}
      {/* ---------------------------------------------------------------- */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 z-10",
          "flex flex-col items-center gap-1",
          "animate-bounce opacity-70"
        )}
      >
        <div className="w-px h-8 bg-white/60" />
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}
