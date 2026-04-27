// =============================================================================
// SERVICE-SCHEMA.TSX — Átomo | Hospital São Rafael
// =============================================================================
// JSON-LD structured data para páginas de serviço.
// Schemas: MedicalWebPage (wrapper), MedicalProcedure/MedicalClinic,
// BreadcrumbList, FAQPage. Gerado server-side.
// =============================================================================

import type { ServiceDetailData } from "@/lib/services-content"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ServiceSchemaProps {
  data: ServiceDetailData
  /** URL canônica da página (absoluta) */
  canonicalUrl: string
  /** Tipo schema principal: MedicalProcedure (tratamento) ou MedicalClinic (infra) */
  schemaType?: "MedicalProcedure" | "MedicalClinic"
}

// -----------------------------------------------------------------------------
// CONSTANTES HSR
// -----------------------------------------------------------------------------
const HSR_ORGANIZATION = {
  "@type": "Hospital",
  "@id": "https://hsr-xi.vercel.app/#hospital",
  name: "Hospital São Rafael",
  url: "https://hsr-xi.vercel.app",
  telephone: "+55-31-2517-0000",
  image: "https://hsr-xi.vercel.app/og-image.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Raja Gabáglia, 1380",
    addressLocality: "Belo Horizonte",
    addressRegion: "MG",
    postalCode: "30441-194",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -19.9437,
    longitude: -43.9582,
  },
  sameAs: [
    "https://www.instagram.com/hospitalsaorafaelmg/",
    "https://www.linkedin.com/company/hospitalsaorafaelmg/",
    "https://www.youtube.com/@hospitalsaorafaelmg",
  ],
  medicalSpecialty: [
    "Surgery",
    "Orthopedic",
    "Cardiovascular",
    "Gastroenterologic",
  ],
}

// -----------------------------------------------------------------------------
// BUILD SCHEMAS
// -----------------------------------------------------------------------------
function buildBreadcrumb(slug: string, title: string, baseUrl: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Serviços",
        item: `${baseUrl}/#servicos`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${baseUrl}/servicos/${slug}`,
      },
    ],
  }
}

function buildFAQ(
  faqItems: { question: string; answer: string }[]
) {
  if (faqItems.length === 0) return null
  return {
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

function buildMedicalEntity(
  data: ServiceDetailData,
  schemaType: "MedicalProcedure" | "MedicalClinic",
  canonicalUrl: string
) {
  const base = {
    "@type": schemaType,
    name: data.hero.headline,
    description: data.meta.description,
    url: canonicalUrl,
    ...(schemaType === "MedicalClinic"
      ? { parentOrganization: HSR_ORGANIZATION }
      : { performedBy: HSR_ORGANIZATION }),
  }
  return base
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function ServiceSchema({
  data,
  canonicalUrl,
  schemaType = "MedicalClinic",
}: ServiceSchemaProps) {
  const baseUrl = canonicalUrl.replace(/\/servicos\/.+$/, "")

  const breadcrumb = buildBreadcrumb(data.slug, data.hero.headline, baseUrl)
  const medicalEntity = buildMedicalEntity(data, schemaType, canonicalUrl)
  const faq = buildFAQ(
    data.faq.items.map((i) => ({ question: i.question, answer: i.answer }))
  )

  const wrapper: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    url: canonicalUrl,
    name: data.meta.title,
    description: data.meta.description,
    about: medicalEntity,
    breadcrumb,
    isPartOf: {
      "@type": "WebSite",
      url: baseUrl,
      name: "Hospital São Rafael",
    },
  }

  if (faq) {
    wrapper.mainEntity = faq
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(wrapper),
      }}
    />
  )
}
