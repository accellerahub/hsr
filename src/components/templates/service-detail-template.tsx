// =============================================================================
// SERVICE-DETAIL-TEMPLATE.TSX — Template | Hospital São Rafael
// =============================================================================
// Template SEO-expandido para páginas /servicos/[slug].
//
// Blocos (ordem, todos full-bleed):
//   0. Schema JSON-LD (head)
//   1. Breadcrumb
//   2. ServicePageHero
//   3. ServiceIntroBlock          (opcional — O que é X)
//   4. ServiceIndicationsBlock    (opcional — Indicações)
//   5. ServiceGalleryBlock        (infraestrutura HSR)
//   6. ServiceEquipmentBlock      (opcional — equipamentos)
//   7. ServiceHighlights          (métricas)
//   8. ServiceProtocolsBlock      (opcional — protocolos + certif)
//   9. ServiceJourneyBlock        (opcional — jornada passos)
//   10. TestimonialsCarousel
//   11. FAQSection
//   12. ServiceRelatedBlock       (opcional — cross-link)
//   13. Footer
//
// Sidebar TOC (ServiceSidebarNav): flutuante fixed no desktop XL.
// =============================================================================

import { Footer } from "@/components/organisms/footer"
import { ServicePageHero } from "@/components/organisms/service-page-hero"
import { ServiceGalleryBlock } from "@/components/organisms/service-gallery-block"
import { ServiceHighlights } from "@/components/organisms/service-highlights"
import { TestimonialsCarousel } from "@/components/organisms/testimonials-carousel"
import { FAQSection } from "@/components/organisms/faq-section"
import { ServiceBreadcrumb } from "@/components/molecules/service-breadcrumb"
import { ServiceSidebarNav } from "@/components/organisms/service-sidebar-nav"
import { ServiceIntroBlock } from "@/components/organisms/service-intro-block"
import { ServiceIndicationsBlock } from "@/components/organisms/service-indications-block"
import { ServiceEquipmentBlock } from "@/components/organisms/service-equipment-block"
import { ServiceProtocolsBlock } from "@/components/organisms/service-protocols-block"
import { ServiceJourneyBlock } from "@/components/organisms/service-journey-block"
import { ServiceRelatedBlock } from "@/components/organisms/service-related-block"
import { ServiceSchema } from "@/components/atoms/service-schema"

import { FOOTER_DATA } from "@/lib/constants"
import type { ServiceDetailData } from "@/lib/services-content"
import type { FooterData } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ServiceDetailTemplateProps {
  data: ServiceDetailData
  /** URL absoluta da página (usada no schema JSON-LD) */
  canonicalUrl?: string
  /** Tipo do schema principal */
  schemaType?: "MedicalProcedure" | "MedicalClinic"
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function ServiceDetailTemplate({
  data,
  canonicalUrl = `https://hsr-xi.vercel.app/servicos/${data.slug}`,
  schemaType = "MedicalClinic",
}: ServiceDetailTemplateProps) {
  const {
    navSections,
    hero,
    intro,
    indications,
    galleryBlock,
    equipment,
    highlights,
    protocols,
    journey,
    testimonials,
    faq,
    related,
  } = data

  const breadcrumbItems = [
    { label: "Início", href: "/" },
    { label: "Serviços", href: "/#servicos" },
    { label: hero.headline, href: `/servicos/${data.slug}` },
  ]

  return (
    <>
      {/* Schema JSON-LD */}
      <ServiceSchema
        data={data}
        canonicalUrl={canonicalUrl}
        schemaType={schemaType}
      />

      {/* Spacer para header fixed (h-16 lg:h-20) */}
      <div className="h-16 lg:h-20" aria-hidden />

      {/* Breadcrumb */}
      <ServiceBreadcrumb items={breadcrumbItems} />

      {/* TOC flutuante (desktop XL+) */}
      {navSections && navSections.length > 0 && (
        <ServiceSidebarNav sections={navSections} />
      )}

      {/* Hero */}
      <ServicePageHero data={hero} />

      {/* 1. Intro long-form */}
      {intro && <ServiceIntroBlock data={intro} sectionId="intro" />}

      {/* 2. Indicações */}
      {indications && (
        <ServiceIndicationsBlock data={indications} sectionId="indicacoes" />
      )}

      {/* 3. Gallery + features (infraestrutura HSR) */}
      <div id="infraestrutura" className="scroll-mt-24">
        <ServiceGalleryBlock data={galleryBlock} reserveRightGutter />
      </div>

      {/* 4. Equipamentos */}
      {equipment && (
        <ServiceEquipmentBlock data={equipment} sectionId="equipamentos" />
      )}

      {/* 5. Highlights / métricas */}
      <div id="numeros" className="scroll-mt-24">
        <ServiceHighlights data={highlights} reserveRightGutter />
      </div>

      {/* 6. Protocolos */}
      {protocols && (
        <ServiceProtocolsBlock data={protocols} sectionId="protocolos" />
      )}

      {/* 7. Jornada */}
      {journey && <ServiceJourneyBlock data={journey} sectionId="jornada" />}

      {/* 8. Testimonials */}
      <div id="depoimentos" className="scroll-mt-24">
        <TestimonialsCarousel data={testimonials} reserveRightGutter />
      </div>

      {/* 9. FAQ */}
      <div id="faq" className="scroll-mt-24">
        <FAQSection data={faq} background="white" reserveRightGutter />
      </div>

      {/* 10. Conteúdo relacionado */}
      {related && <ServiceRelatedBlock data={related} sectionId="relacionados" />}

      {/* Footer */}
      <Footer data={FOOTER_DATA as unknown as FooterData} />
    </>
  )
}
