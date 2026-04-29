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
import { ServiceSidebarNav } from "@/components/organisms/service-sidebar-nav"
import { ServiceIntroBlock } from "@/components/organisms/service-intro-block"
import { ServiceIndicationsBlock } from "@/components/organisms/service-indications-block"
import { ServiceEquipmentBlock } from "@/components/organisms/service-equipment-block"
import { ServiceProtocolsBlock } from "@/components/organisms/service-protocols-block"
import { ServiceJourneyBlock } from "@/components/organisms/service-journey-block"
import { ServiceRelatedBlock } from "@/components/organisms/service-related-block"
import { ServiceInlineCta } from "@/components/organisms/service-inline-cta"
import { ServiceMedicoBlock } from "@/components/organisms/service-medico-block"
import { ServiceAcompanhanteBlock } from "@/components/organisms/service-acompanhante-block"
import { ServiceReferencesBlock } from "@/components/organisms/service-references-block"
import { ServiceStickyCta } from "@/components/molecules/service-sticky-cta"
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
    medico,
    galleryBlock,
    equipment,
    highlights,
    protocols,
    journey,
    acompanhante,
    testimonials,
    faq,
    related,
    references,
    lastReviewed,
  } = data

  // schemaType vindo do dado tem prioridade sobre o default da prop
  const resolvedSchemaType = data.schemaType ?? schemaType

  // Label curto p/ 3º nível do breadcrumb (evita wrap em mobile e cobertura do H1).
  // Prioridade: kicker (title-case) → slug formatado.
  const breadcrumbShortLabel = hero.kicker
    ? hero.kicker
        .toLowerCase()
        .split(" ")
        .map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w))
        .join(" ")
    : data.slug
        .split("-")
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" ")

  const breadcrumbItems = [
    { label: "Início", href: "/" },
    { label: "Serviços", href: "/#servicos" },
    { label: breadcrumbShortLabel, href: `/servicos/${data.slug}` },
  ]

  return (
    <>
      {/* Schema JSON-LD */}
      <ServiceSchema
        data={data}
        canonicalUrl={canonicalUrl}
        schemaType={resolvedSchemaType}
        lastReviewed={lastReviewed}
      />

      {/* TOC flutuante (desktop XL+) */}
      {navSections && navSections.length > 0 && (
        <ServiceSidebarNav sections={navSections} />
      )}

      {/* Hero (breadcrumb renderizado como overlay interno) */}
      <ServicePageHero data={hero} breadcrumbItems={breadcrumbItems} />

      {/* 1. Intro long-form */}
      {intro && <ServiceIntroBlock data={intro} sectionId="intro" />}

      {/* 2. Indicações */}
      {indications && (
        <>
          <ServiceIndicationsBlock data={indications} sectionId="indicacoes" />
          <ServiceInlineCta
            kicker="SEU CASO ESTÁ ENTRE AS INDICAÇÕES?"
            headline="Fale com nossa equipe e entenda se esse é o caminho para você."
            description="Atendimento humano, rápido e particular. Tire suas dúvidas com a equipe responsável e descubra se o tratamento se aplica ao seu quadro clínico."
            variant="creme"
          />
        </>
      )}

      {/* 2b. Bloco híbrido p/ médico assistente (opcional) */}
      {medico && (
        <ServiceMedicoBlock data={medico} sectionId="para-o-medico" />
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
      {journey && (
        <>
          <ServiceJourneyBlock data={journey} sectionId="jornada" />
          <ServiceInlineCta
            kicker="PRONTO PARA COMEÇAR?"
            headline="Agende sua avaliação e dê o próximo passo."
            description="Nossa equipe de relacionamento orienta cada etapa, do primeiro contato à finalização do tratamento. Atendimento exclusivamente particular, com agilidade e acolhimento."
            variant="charcoal"
          />
        </>
      )}

      {/* 7b. Bloco acompanhante/família (opcional) */}
      {acompanhante && (
        <ServiceAcompanhanteBlock
          data={acompanhante}
          sectionId="acompanhante"
        />
      )}

      {/* 8. Testimonials */}
      <div id="depoimentos" className="scroll-mt-24">
        <TestimonialsCarousel data={testimonials} reserveRightGutter />
      </div>

      {/* 9. FAQ */}
      <div id="faq" className="scroll-mt-24">
        <FAQSection data={faq} background="white" reserveRightGutter />
      </div>

      {/* CTA pós-FAQ — última oportunidade de captura antes do footer */}
      <ServiceInlineCta
        kicker="AINDA TEM DÚVIDAS?"
        headline="Converse direto com a equipe — sem compromisso."
        description="Mesmo após a leitura, é normal restarem questões específicas sobre o seu caso. Fale com a gente pelo canal de sua preferência."
        variant="creme"
      />

      {/* 10. Conteúdo relacionado */}
      {related && <ServiceRelatedBlock data={related} sectionId="relacionados" />}

      {/* 11. Referências e revisão clínica (E-E-A-T) */}
      {(references || lastReviewed) && (
        <ServiceReferencesBlock
          references={references}
          lastReviewed={lastReviewed}
        />
      )}

      {/* Footer */}
      <Footer data={FOOTER_DATA as unknown as FooterData} />

      {/* Sticky CTA mobile — sempre acessível durante a leitura */}
      <ServiceStickyCta />
    </>
  )
}
