// =============================================================================
// PRODUCTS-SECTION.TSX — Organismo (extensão O05) | Hospital São Rafael
// =============================================================================
// Dobra 6 — Produtos divididos por público com abas de filtro.
// Composição: Kicker + H2 + CategoryTabs + CardGrid (filtrado)
// =============================================================================

"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { ProductCard } from "@/components/molecules/product-card"
import { useIntersection } from "@/hooks/use-intersection"
import type { BaseComponentProps, ProdutosData, ProductCategory } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ProductsSectionProps extends BaseComponentProps {
  data: ProdutosData
}

// -----------------------------------------------------------------------------
// COMPONENTE — ABAS
// -----------------------------------------------------------------------------
interface CategoryTabsProps {
  categories: ProductCategory[]
  activeId: string
  onChange: (id: string) => void
}

function CategoryTabs({ categories, activeId, onChange }: CategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filtrar produtos por público"
      className="flex border-b border-charcoal/10"
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          role="tab"
          aria-selected={activeId === cat.id}
          aria-controls={`tabpanel-${cat.id}`}
          id={`tab-${cat.id}`}
          onClick={() => onChange(cat.id)}
          className={cn(
            "px-6 py-3 text-sm font-bold",
            "transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro focus-visible:ring-inset",
            activeId === cat.id
              ? "text-ouro border-b-2 border-ouro -mb-px"
              : "text-charcoal/40 hover:text-charcoal/70"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}

// -----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// -----------------------------------------------------------------------------
export function ProductsSection({ data, className }: ProductsSectionProps) {
  const [activeTab, setActiveTab] = useState(data.categories[0]?.id ?? "")

  const { ref, hasIntersected } = useIntersection({ threshold: 0.1, once: true })

  const { kicker, headline, description, categories } = data
  const activeCategory = categories.find((c) => c.id === activeTab)
  const audience = activeTab === "medico" ? "medico" : "paciente"

  return (
    <section
      id="produtos"
      aria-labelledby="produtos-heading"
      ref={ref as React.RefObject<HTMLElement>}
      className={cn("w-full py-20 lg:py-30 bg-creme", className)}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabeçalho */}
        <div
          className={cn(
            "flex flex-col gap-4 mb-10 max-w-[640px]",
            "transition-all duration-700",
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <Kicker color="marrom">{kicker}</Kicker>
          <Heading as="h2" id="produtos-heading">{headline}</Heading>
          {description && <BodyText color="muted">{description}</BodyText>}
        </div>

        {/* Abas de categoria */}
        <div
          className={cn(
            "mb-10 transition-all duration-700 delay-100",
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <CategoryTabs
            categories={categories as unknown as ProductCategory[]}
            activeId={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Grid de produtos — muda conforme aba ativa */}
        {activeCategory && (
          <div
            key={activeTab}
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {activeCategory.items.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "transition-all duration-500",
                  hasIntersected
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: `${index * 80 + 200}ms` }}
              >
                <ProductCard
                  product={item as unknown as import("@/types").ProductItem}
                  audience={audience}
                  hideCta
                  className="h-full"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
