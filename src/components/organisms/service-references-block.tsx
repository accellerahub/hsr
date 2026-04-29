// =============================================================================
// SERVICE-REFERENCES-BLOCK.TSX — Organismo | Hospital São Rafael
// =============================================================================
// Bloco discreto de referências externas + linha de "última revisão clínica".
// Sinal E-E-A-T crítico para conteúdo médico YMYL no Google. Posicionado antes
// do footer, depois do FAQ/Related.
// =============================================================================

import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BaseComponentProps } from "@/types"
import type { ServiceReferenceItem } from "@/lib/services-content"

interface ServiceReferencesBlockProps extends BaseComponentProps {
  references?: ServiceReferenceItem[]
  /** ISO date (YYYY-MM-DD) */
  lastReviewed?: string
  sectionId?: string
}

function formatReviewDate(iso: string): string {
  try {
    const date = new Date(iso + "T00:00:00")
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  } catch {
    return iso
  }
}

export function ServiceReferencesBlock({
  references,
  lastReviewed,
  sectionId = "referencias",
  className,
}: ServiceReferencesBlockProps) {
  const hasRefs = references && references.length > 0
  if (!hasRefs && !lastReviewed) return null

  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-heading`}
      className={cn(
        "w-full py-12 lg:py-16 bg-creme border-t border-cobre/10 scroll-mt-24",
        className
      )}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:pr-[260px] 2xl:pr-[300px]">
        <div className="max-w-[860px] flex flex-col gap-5">
          {hasRefs && (
            <>
              <h2
                id={`${sectionId}-heading`}
                className="text-xs font-extrabold uppercase tracking-[0.18em] text-cobre"
              >
                Referências e fontes
              </h2>
              <ul
                className="flex flex-col gap-2 text-sm text-charcoal/70"
                role="list"
              >
                {references!.map((ref) => (
                  <li key={ref.href}>
                    <a
                      href={ref.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-start gap-1.5",
                        "hover:text-cobre underline-offset-2 hover:underline",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobre rounded"
                      )}
                    >
                      <span>{ref.label}</span>
                      <ExternalLink
                        size={12}
                        className="mt-1 flex-shrink-0 opacity-70"
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {lastReviewed && (
            <p className="text-xs text-charcoal/50 italic">
              Conteúdo clínico revisado pela equipe médica do Hospital São Rafael
              em {formatReviewDate(lastReviewed)}.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
