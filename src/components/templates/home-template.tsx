// =============================================================================
// HOME-TEMPLATE.TSX — Template T01 | Hospital São Rafael
// =============================================================================
// Composição das 10 dobras na ordem aprovada em reunião.
// Todos os dados vêm de lib/constants.ts via props.
//
// Ordem:
//   1. Hero (O02)
//   2. Stats Bar (O03)
//   3. Diferenciais (O04)
//   4. Serviços (O05 — services)
//   5. Especialidades (O11 — SpecialtyGrid + modais)
//   6. Produtos (ProductsSection — tabs Paciente/Médico)
//   7. Jornada (O07)
//   8. Área do Médico — B2B (O06)
//   9. FAQ (O08)
//  10. Footer (O09)
// =============================================================================

import { HeroSection } from "@/components/organisms/hero-section"
import { StatsBar } from "@/components/organisms/stats-bar"
import { ContentBlock } from "@/components/organisms/content-block"
import { CardGrid } from "@/components/organisms/card-grid"
import { SpecialtyGrid } from "@/components/organisms/specialty-grid"
import { ProductsSection } from "@/components/organisms/products-section"
import { JourneyTimeline } from "@/components/organisms/journey-timeline"
import { B2BSection } from "@/components/organisms/b2b-section"
import { FAQSection } from "@/components/organisms/faq-section"
import { Footer } from "@/components/organisms/footer"

import {
  HERO_DATA,
  STATS_DATA,
  DIFERENCIAIS_DATA,
  SERVICOS_DATA,
  ESPECIALIDADES_DATA,
  PRODUTOS_DATA,
  JORNADA_DATA,
  B2B_DATA,
  FAQ_DATA,
  FOOTER_DATA,
} from "@/lib/constants"
import { getCtaMap, getActiveFaqs, pickCta } from "@/lib/cms"

import type {
  HeroData,
  StatsData,
  ContentBlockData,
  EspecialidadesData,
  ProdutosData,
  JornadaData,
  B2BData,
  FAQData,
  FooterData,
  ServiceItem,
} from "@/types"

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export async function HomeTemplate() {
  const [ctaMap, dbFaqs] = await Promise.all([getCtaMap(), getActiveFaqs()])

  const heroCta = pickCta(ctaMap, "atendimento_whatsapp", {
    label: HERO_DATA.ctaPrimary.label,
    href: HERO_DATA.ctaPrimary.href,
  })
  const b2bCta = pickCta(ctaMap, "consultoria_medica_whatsapp", {
    label: B2B_DATA.cta.label,
    href: B2B_DATA.cta.href,
  })

  const heroData = { ...HERO_DATA, ctaPrimary: heroCta }
  const b2bData = { ...B2B_DATA, cta: b2bCta }
  const faqData =
    dbFaqs.length > 0
      ? {
          ...FAQ_DATA,
          items: dbFaqs.map((f) => ({
            id: f.id,
            question: f.question,
            answer: f.answer,
          })),
        }
      : FAQ_DATA

  return (
    <>
      {/* ================================================================= */}
      {/* DOBRA 1 — HERO                                                    */}
      {/* Vídeo fullscreen, headline revisada, CTA principal                */}
      {/* ================================================================= */}
      <HeroSection
        data={heroData as unknown as HeroData}
      />

      {/* ================================================================= */}
      {/* DOBRA 2 — NÚMEROS DE CREDIBILIDADE                                */}
      {/* Métricas com counter-up ao entrar no viewport                     */}
      {/* ================================================================= */}
      <StatsBar
        data={STATS_DATA as unknown as StatsData}
        theme="light"
      />

      {/* ================================================================= */}
      {/* DOBRA 3 — DIFERENCIAIS                                            */}
      {/* Rigor científico + conforto + ecossistema IMD. Layout assimétrico */}
      {/* ================================================================= */}
      <ContentBlock
        data={DIFERENCIAIS_DATA as unknown as ContentBlockData}
        imagePosition="right"
        background="white"
        id="diferenciais"
      />

      {/* ================================================================= */}
      {/* DOBRA 4 — SERVIÇOS                                                */}
      {/* Infraestrutura do hospital: CC, IMD, laboratório, hiperbárica...  */}
      {/* ================================================================= */}
      <CardGrid
        variant="services"
        kicker={SERVICOS_DATA.kicker}
        headline={SERVICOS_DATA.headline}
        description={SERVICOS_DATA.description}
        items={SERVICOS_DATA.items as unknown as ServiceItem[]}
        id="servicos"
        columns={3}
      />

      {/* ================================================================= */}
      {/* DOBRA 5 — ESPECIALIDADES                                          */}
      {/* Grid com modais de detalhamento por especialidade                 */}
      {/* ================================================================= */}
      <SpecialtyGrid
        data={ESPECIALIDADES_DATA as unknown as EspecialidadesData}
      />

      {/* ================================================================= */}
      {/* DOBRA 6 — PRODUTOS                                                */}
      {/* Divididos por público (Paciente / Médico) com abas de filtro      */}
      {/* ================================================================= */}
      <ProductsSection
        data={PRODUTOS_DATA as unknown as ProdutosData}
      />

      {/* ================================================================= */}
      {/* DOBRA 7 — JORNADA DO PACIENTE                                     */}
      {/* Timeline do diagnóstico à alta. Links para serviços por etapa     */}
      {/* ================================================================= */}
      <JourneyTimeline
        data={JORNADA_DATA as unknown as JornadaData}
      />

      {/* ================================================================= */}
      {/* DOBRA 8 — ÁREA DO MÉDICO (B2B)                                    */}
      {/* Fundo charcoal. Feature cards + depoimentos + CTA consultoria     */}
      {/* ================================================================= */}
      <B2BSection
        data={b2bData as unknown as B2BData}
      />

      {/* ================================================================= */}
      {/* DOBRA 9 — FAQ                                                     */}
      {/* Layout 2 colunas: heading sticky + accordion                      */}
      {/* ================================================================= */}
      <FAQSection
        data={faqData as unknown as FAQData}
        background="creme"
      />

      {/* ================================================================= */}
      {/* DOBRA 10 — FOOTER                                                 */}
      {/* Logo + descrição + navegação + contato + social + emergência      */}
      {/* ================================================================= */}
      <Footer
        data={FOOTER_DATA as unknown as FooterData}
      />
    </>
  )
}
