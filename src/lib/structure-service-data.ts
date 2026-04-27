// =============================================================================
// structure-service-data.ts — Lookup de páginas /servicos/[slug]
// =============================================================================
// Apenas serviços com conteúdo SEO completo (intro ou navSections) são
// servidos. Demais cards seguem visíveis na home sem CTA até a próxima página
// ser aprovada e adicionada a SERVICES_CONTENT.
// =============================================================================

import { cache } from "react"
import { SERVICES_CONTENT } from "@/lib/services-content"
import type { ServiceDetailData } from "@/lib/services-content"

export const getServiceDataBySlug = cache(
  async (slug: string): Promise<ServiceDetailData | null> => {
    const staticContent = SERVICES_CONTENT[slug]
    if (staticContent && (staticContent.intro || staticContent.navSections)) {
      return staticContent
    }
    return null
  }
)

export const getAllServiceSlugs = cache(async (): Promise<string[]> => {
  return Object.entries(SERVICES_CONTENT)
    .filter(([, data]) => data.intro || data.navSections)
    .map(([slug]) => slug)
})
