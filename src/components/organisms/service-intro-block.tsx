// =============================================================================
// SERVICE-INTRO-BLOCK.TSX — Organismo | Hospital São Rafael
// =============================================================================
// Bloco long-form "O que é X" — conteúdo educacional/informacional.
// 300-800 palavras, H2 + parágrafos + subsections (H3) opcionais.
// Crítico para ranking SEO de intent informacional.
// =============================================================================

import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import type { BaseComponentProps } from "@/types"
import type { ServiceIntroBlockData } from "@/lib/services-content"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ServiceIntroBlockProps extends BaseComponentProps {
  data: ServiceIntroBlockData
  sectionId?: string
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function ServiceIntroBlock({
  data,
  sectionId = "intro",
  className,
}: ServiceIntroBlockProps) {
  const { kicker, headline, paragraphs, subsections } = data

  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-heading`}
      className={cn("w-full py-20 lg:py-28 bg-white scroll-mt-24", className)}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:pr-[260px] 2xl:pr-[300px]">
        <div className="flex flex-col gap-10 max-w-[760px]">
          <header className="flex flex-col gap-4">
            <Kicker color="cobre">{kicker}</Kicker>
            <Heading as="h2" id={`${sectionId}-heading`}>
              {headline}
            </Heading>
            <div className="w-12 h-0.5 bg-cobre" aria-hidden />
          </header>

          <div className="flex flex-col gap-5">
            {paragraphs.map((p, i) => (
              <BodyText key={i} color="muted" size="base">
                {p}
              </BodyText>
            ))}
          </div>

          {subsections && subsections.length > 0 && (
            <div className="flex flex-col gap-10 mt-4">
              {subsections.map((sub) => (
                <div
                  key={sub.id}
                  id={sub.id}
                  className="flex flex-col gap-4 scroll-mt-24"
                >
                  <Heading as="h3">{sub.title}</Heading>
                  {sub.paragraphs.map((p, i) => (
                    <BodyText key={i} color="muted" size="base">
                      {p}
                    </BodyText>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
