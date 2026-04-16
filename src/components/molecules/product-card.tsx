// =============================================================================
// PRODUCT-CARD.TSX — Molécula M11 | Hospital São Rafael
// =============================================================================
// Card de produto/experiência separado por público (Paciente/Médico).
// Variante mais compacta que ServiceCard, com badge de público.
// Usado na dobra de Produtos (O05 — variação)
// =============================================================================

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Icon, resolveIconName } from "@/components/atoms/icon"
import { Button } from "@/components/atoms/button"
import { UnderConstruction } from "@/components/atoms/under-construction"
import type { BaseComponentProps, ProductItem } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ProductCardProps extends BaseComponentProps {
  product: ProductItem
  /** Público-alvo do produto — impacta acento de cor */
  audience?: "paciente" | "medico"
  onLearnMore?: () => void
  /** Oculta o CTA e mostra badge "Em construção" */
  underConstruction?: boolean
  /** Oculta o CTA completamente — sem badge, sem botão */
  hideCta?: boolean
}

// -----------------------------------------------------------------------------
// CORES POR PÚBLICO
// -----------------------------------------------------------------------------
const audienceAccent: Record<"paciente" | "medico", string> = {
  paciente: "text-ouro border-ouro/20 bg-ouro/5",
  medico:   "text-cobre border-cobre/20 bg-cobre/5",
}

const audienceBadgeGlass: Record<"paciente" | "medico", string> = {
  paciente: "text-white border-white/30",
  medico:   "text-white border-white/30",
}

const audienceLabel: Record<"paciente" | "medico", string> = {
  paciente: "Para Pacientes",
  medico:   "Para Médicos",
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function ProductCard({
  product,
  audience = "paciente",
  onLearnMore,
  underConstruction,
  hideCta,
  className,
}: ProductCardProps) {
  const { title, description, icon, image } = product

  return (
    <article
      className={cn(
        "group flex flex-col bg-white rounded-xl overflow-hidden border border-neutral-100",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        "isolate transform-gpu",
        className
      )}
    >
      {/* Imagem ou ícone */}
      {image ? (
        <div className="relative h-40 overflow-hidden rounded-t-xl">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Badge sobreposto na imagem */}
          <span
            className={cn(
              "absolute top-3 left-3 z-10",
              "text-[10px] font-extrabold uppercase tracking-kicker px-2.5 py-0.5 border rounded-full",
              "bg-white/20 backdrop-blur-md",
              audienceBadgeGlass[audience]
            )}
          >
            {audienceLabel[audience]}
          </span>
        </div>
      ) : (
        <div className={cn("relative p-6 flex items-center justify-center border-b border-charcoal/5")}>
          <div className={cn("p-4", audienceAccent[audience])}>
            <Icon name={resolveIconName(icon)} size={28} />
          </div>
          {/* Badge sobreposto quando não há imagem */}
          <span
            className={cn(
              "absolute top-3 left-3",
              "text-[10px] font-extrabold uppercase tracking-kicker px-2.5 py-0.5 border rounded-full",
              "bg-white/20 backdrop-blur-md",
              audienceBadgeGlass[audience]
            )}
          >
            {audienceLabel[audience]}
          </span>
        </div>
      )}

      {/* Conteúdo */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-base font-bold text-charcoal leading-tight">
          {title}
        </h3>

        <p className="text-sm text-charcoal/60 leading-relaxed flex-1">
          {description}
        </p>

        {!hideCta && (underConstruction ? (
          <UnderConstruction className="mt-auto" />
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={onLearnMore}
            className="self-start mt-auto"
          >
            Saiba mais
          </Button>
        ))}
      </div>
    </article>
  )
}
