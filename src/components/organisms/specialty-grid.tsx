// =============================================================================
// SPECIALTY-GRID.TSX — Organismo O11 | Hospital São Rafael
// =============================================================================
// Variação do CardGrid (O05) com abertura de ModalOverlay (O10)
// ao clicar em "Ver procedimentos" de cada especialidade.
// =============================================================================

"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { ServiceCard } from "@/components/molecules/service-card"
import { ModalOverlay } from "@/components/organisms/modal-overlay"
import { useIntersection } from "@/hooks/use-intersection"
import { trackClick } from "@/lib/track-click"
import type { BaseComponentProps, EspecialidadesData, EspecialidadeItem } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface SpecialtyGridProps extends BaseComponentProps {
  data: EspecialidadesData
}

// -----------------------------------------------------------------------------
// CONTEÚDO INTERNO DO MODAL DE ESPECIALIDADE
// -----------------------------------------------------------------------------
function SpecialtyModalContent({ item }: { item: EspecialidadeItem }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Descrição */}
      <BodyText color="muted">{item.description}</BodyText>

      {/* Procedimentos (se houver) */}
      {item.procedures && item.procedures.length > 0 ? (
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-kicker text-charcoal/50 mb-4">
            Procedimentos realizados
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="list">
            {item.procedures.map((procedure) => (
              <li
                key={procedure}
                className="flex items-center gap-2 text-sm text-charcoal/80"
              >
                <span
                  className="w-1 h-1 rounded-full bg-ouro flex-shrink-0"
                  aria-hidden
                />
                {procedure}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-charcoal/40 italic">
          [PENDENTE CLIENTE] Lista de procedimentos será disponibilizada em breve.
        </p>
      )}

      {/* CTA */}
      <div className="pt-4 border-t border-charcoal/10">
        <a
          href="https://wa.me/message/NZIPXRZ4SKUHM1"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackClick("atendimento_whatsapp")}
          className={cn(
            "inline-flex items-center justify-center px-6 py-3 rounded-full",
            "bg-ouro text-white font-bold text-sm",
            "transition-colors duration-300 hover:bg-ouro-hover",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro"
          )}
        >
          Agendar consulta
        </a>
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// -----------------------------------------------------------------------------
export function SpecialtyGrid({ data, className }: SpecialtyGridProps) {
  const [activeSpecialty, setActiveSpecialty] = useState<EspecialidadeItem | null>(null)

  const { ref, hasIntersected } = useIntersection({ threshold: 0.1, once: true })

  const { kicker, headline, description, items } = data

  return (
    <>
      <section
        id="especialidades"
        aria-labelledby="especialidades-heading"
        ref={ref as React.RefObject<HTMLElement>}
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
            <Kicker color="marrom">{kicker}</Kicker>
            <Heading as="h2" id="especialidades-heading">
              {headline}
            </Heading>
            {description && (
              <BodyText color="muted">{description}</BodyText>
            )}
          </div>

          {/* Grid de especialidades */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
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
                  ctaLabel="Ver procedimentos"
                  onLearnMore={() => setActiveSpecialty(item)}
                  underConstruction
                  className="h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de especialidade */}
      <ModalOverlay
        isOpen={activeSpecialty !== null}
        onClose={() => setActiveSpecialty(null)}
        title={activeSpecialty?.title ?? ""}
        maxWidth="lg"
      >
        {activeSpecialty && (
          <SpecialtyModalContent item={activeSpecialty} />
        )}
      </ModalOverlay>
    </>
  )
}
