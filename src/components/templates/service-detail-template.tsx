// =============================================================================
// SERVICE-DETAIL-TEMPLATE.TSX — Template | Hospital São Rafael
// =============================================================================
// Composição da página de detalhe de serviço.
// Aceita ServiceDetailData e distribui para os organismos correspondentes.
//
// NOTA: Header é fornecido pelo root layout (layout.tsx).
//       Footer é renderizado aqui, assim como HomeTemplate.
//
// Ordem:
//   1. ServicePageHero
//   2. ServiceGalleryBlock
//   3. ServiceHighlights
//   4. TestimonialsCarousel
//   5. FAQSection (reuso do O08)
//   6. Footer (O09)
// =============================================================================

import { Footer } from "@/components/organisms/footer"
import { ServicePageHero } from "@/components/organisms/service-page-hero"
import { ServiceGalleryBlock } from "@/components/organisms/service-gallery-block"
import { ServiceHighlights } from "@/components/organisms/service-highlights"
import { TestimonialsCarousel } from "@/components/organisms/testimonials-carousel"
import { FAQSection } from "@/components/organisms/faq-section"

import { FOOTER_DATA } from "@/lib/constants"
import type { ServiceDetailData } from "@/lib/services-content"
import type { FooterData } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ServiceDetailTemplateProps {
  data: ServiceDetailData
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function ServiceDetailTemplate({ data }: ServiceDetailTemplateProps) {
  const { hero, galleryBlock, highlights, testimonials, faq } = data

  return (
    <>
      {/* Hero da página de serviço */}
      <ServicePageHero data={hero} />

      {/* Bloco de galeria + features */}
      <ServiceGalleryBlock data={galleryBlock} />

      {/* Highlights / métricas */}
      <ServiceHighlights data={highlights} />

      {/* Carrossel de depoimentos */}
      <TestimonialsCarousel data={testimonials} />

      {/* FAQ — reutiliza o organismo existente */}
      <FAQSection
        data={faq}
        background="white"
      />

      {/* Footer global */}
      <Footer data={FOOTER_DATA as unknown as FooterData} />
    </>
  )
}
