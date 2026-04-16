// =============================================================================
// SERVICE-CARD.TSX — Molécula M02 | Hospital São Rafael
// =============================================================================
// Composição: imagem/ícone + heading + descrição + CTA (Saiba Mais)
// Variantes: image (vertical), icon-only, horizontal
// Usado em O05 Card Grid (Serviços, Especialidades, Produtos)
// =============================================================================

"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { Button } from "@/components/atoms/button"
import { Icon, resolveIconName } from "@/components/atoms/icon"
import { UnderConstruction } from "@/components/atoms/under-construction"
import type { BaseComponentProps, CardVariant } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ServiceCardProps extends BaseComponentProps {
  title: string
  description: string
  /** String do ícone (conforme constants.ts) */
  icon?: string
  /** URL da imagem */
  image?: string
  /** alt da imagem */
  imageAlt?: string
  /** Layout do card */
  variant?: CardVariant
  /** Handler do CTA "Saiba Mais" */
  onLearnMore?: () => void
  /** Texto do CTA */
  ctaLabel?: string
  /** URL de destino — se fornecido, o CTA renderiza como <a> */
  href?: string
  /** Oculta o CTA e mostra badge "Em construção" */
  underConstruction?: boolean
  /** Oculta o CTA completamente — sem badge, sem botão */
  hideCta?: boolean
}

// -----------------------------------------------------------------------------
// COMPONENTE — Variante com imagem (padrão)
// -----------------------------------------------------------------------------
function ServiceCardImage({ title, description, image, imageAlt, onLearnMore, ctaLabel, href, underConstruction, hideCta, className }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      className={cn(
        "group flex flex-col bg-white overflow-hidden rounded-xl border border-neutral-100",
        "transition-all duration-300 ease-in-out",
        "hover:-translate-y-1 hover:shadow-lg",
        "isolate transform-gpu",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Imagem com overlay */}
      {image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={cn(
              "object-cover transition-transform duration-500",
              hovered && "scale-105"
            )}
          />
          <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/10 transition-colors duration-300" />
        </div>
      )}

      {/* Conteúdo */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <Heading as="h3" color="default">
          {title}
        </Heading>
        <BodyText color="muted" size="sm" className="flex-1">
          {description}
        </BodyText>
        {!hideCta && (underConstruction ? (
          <UnderConstruction />
        ) : (
          <Button
            variant="ghost"
            size="sm"
            href={href}
            onClick={!href ? onLearnMore : undefined}
            className="self-start"
          >
            {ctaLabel ?? "Saiba mais"}
          </Button>
        ))}
      </div>
    </article>
  )
}

// -----------------------------------------------------------------------------
// COMPONENTE — Variante com ícone
// -----------------------------------------------------------------------------
function ServiceCardIcon({ title, description, icon, onLearnMore, ctaLabel, href, underConstruction, hideCta, className }: ServiceCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col bg-white p-8 rounded-xl border border-neutral-100",
        "transition-all duration-300 ease-in-out",
        "hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      {/* Ícone */}
      {icon && (
        <div className="mb-4 inline-flex w-fit">
          <div className="p-3 bg-ouro/10 rounded-xl">
            <Icon name={resolveIconName(icon)} size={22} color="marrom" />
          </div>
        </div>
      )}

      {/* Conteúdo */}
      <Heading as="h3" color="default" className="mb-2">
        {title}
      </Heading>
      <BodyText color="muted" size="sm" className="mb-4">
        {description}
      </BodyText>
      {!hideCta && (underConstruction ? (
        <UnderConstruction />
      ) : (
        <Button
          variant="ghost"
          size="sm"
          href={href}
          onClick={!href ? onLearnMore : undefined}
          className="self-start"
        >
          {ctaLabel ?? "Saiba mais"}
        </Button>
      ))}
    </article>
  )
}

// -----------------------------------------------------------------------------
// COMPONENTE — Variante horizontal
// -----------------------------------------------------------------------------
function ServiceCardHorizontal({ title, description, icon, image, imageAlt, onLearnMore, ctaLabel, underConstruction, hideCta, className }: ServiceCardProps) {
  return (
    <article
      className={cn(
        "group flex gap-6 bg-white p-6 rounded-xl overflow-hidden border border-neutral-100",
        "transition-all duration-300 ease-in-out hover:shadow-md",
        className
      )}
    >
      {/* Imagem ou ícone lateral */}
      {image ? (
        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
          <Image src={image} alt={imageAlt ?? title} fill className="object-cover" />
        </div>
      ) : icon ? (
        <div className="flex-shrink-0 h-fit text-marrom">
          <Icon name={resolveIconName(icon)} size={24} color="marrom" />
        </div>
      ) : null}

      {/* Conteúdo */}
      <div className="flex flex-col gap-2 flex-1">
        <Heading as="h4" color="default">{title}</Heading>
        <BodyText color="muted" size="sm">{description}</BodyText>
        {!hideCta && (underConstruction ? (
          <UnderConstruction />
        ) : (
          <Button variant="ghost" size="sm" onClick={onLearnMore} className="self-start">
            {ctaLabel ?? "Saiba mais"}
          </Button>
        ))}
      </div>
    </article>
  )
}

// -----------------------------------------------------------------------------
// EXPORT — seleciona variante automaticamente
// -----------------------------------------------------------------------------
export function ServiceCard(props: ServiceCardProps) {
  const { variant = props.image ? "default" : "icon-only" } = props

  if (variant === "horizontal") return <ServiceCardHorizontal {...props} />
  if (variant === "icon-only")  return <ServiceCardIcon {...props} />
  return <ServiceCardImage {...props} />
}
