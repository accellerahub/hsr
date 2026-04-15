// =============================================================================
// CARD-GRID.TSX — Organismo O05 | Hospital São Rafael
// =============================================================================
// Composição: Kicker + H2 + grid responsivo de cards
// Variações: services (ServiceCard), specialties (ServiceCard + modal), products (ProductCard)
// O organismo mais reutilizável — Serviços, Especialidades, Produtos
// =============================================================================

"use client"

import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { ServiceCard } from "@/components/molecules/service-card"
import { ProductCard } from "@/components/molecules/product-card"
import { useIntersection } from "@/hooks/use-intersection"
import type {
  BaseComponentProps,
  ServiceItem,
  EspecialidadeItem,
  ProductItem,
} from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface CardGridBaseProps extends BaseComponentProps {
  kicker: string
  headline: string
  description?: string
  id?: string
  /** Número de colunas no desktop */
  columns?: 2 | 3 | 4
}

interface CardGridServicesProps extends CardGridBaseProps {
  variant: "services"
  items: ServiceItem[]
  onCardClick?: (id: string) => void
}

interface CardGridSpecialtiesProps extends CardGridBaseProps {
  variant: "specialties"
  items: EspecialidadeItem[]
  onCardClick?: (id: string) => void
}

interface CardGridProductsProps extends CardGridBaseProps {
  variant: "products"
  /** Índice da categoria ativa (filtro por público) */
  items: ProductItem[]
  audience?: "paciente" | "medico"
  onCardClick?: (id: string) => void
}

type CardGridProps =
  | CardGridServicesProps
  | CardGridSpecialtiesProps
  | CardGridProductsProps

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function CardGrid(props: CardGridProps) {
  const {
    kicker,
    headline,
    description,
    id,
    columns = 3,
    variant,
    className,
  } = props

  const { ref, hasIntersected } = useIntersection({ threshold: 0.1, once: true })

  const colClasses: Record<2 | 3 | 4, string> = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      ref={ref as React.RefObject<HTMLElement>}
      className={cn("w-full py-20 lg:py-30 bg-white", className)}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da seção */}
        <div
          className={cn(
            "flex flex-col gap-4 mb-12 lg:mb-16",
            "max-w-[640px]",
            "transition-all duration-700",
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <Kicker color="marrom">{kicker}</Kicker>
          <Heading as="h2" id={id ? `${id}-heading` : undefined}>
            {headline}
          </Heading>
          {description && (
            <BodyText color="muted">{description}</BodyText>
          )}
        </div>

        {/* Grid de cards */}
        <div className={cn("grid gap-6", colClasses[columns])}>
          {variant === "services" &&
            (props as CardGridServicesProps).items.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "transition-all duration-700",
                  hasIntersected
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: hasIntersected ? `${index * 80}ms` : "0ms" }}
              >
                <ServiceCard
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  image={item.image}
                  href={`/servicos/${item.id}`}
                  onLearnMore={() => (props as CardGridServicesProps).onCardClick?.(item.id)}
                  hideCta
                  className="h-full"
                />
              </div>
            ))}

          {variant === "specialties" &&
            (props as CardGridSpecialtiesProps).items.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "transition-all duration-700",
                  hasIntersected
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: hasIntersected ? `${index * 80}ms` : "0ms" }}
              >
                <ServiceCard
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  variant="icon-only"
                  onLearnMore={() => (props as CardGridSpecialtiesProps).onCardClick?.(item.id)}
                  ctaLabel="Ver procedimentos"
                  className="h-full"
                />
              </div>
            ))}

          {variant === "products" &&
            (props as CardGridProductsProps).items.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "transition-all duration-700",
                  hasIntersected
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: hasIntersected ? `${index * 80}ms` : "0ms" }}
              >
                <ProductCard
                  product={item}
                  audience={(props as CardGridProductsProps).audience ?? "paciente"}
                  onLearnMore={() => (props as CardGridProductsProps).onCardClick?.(item.id)}
                  className="h-full"
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
