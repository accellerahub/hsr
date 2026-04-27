// =============================================================================
// /servicos/[slug]/page.tsx — Página dinâmica de serviço | Hospital São Rafael
// =============================================================================
// Lookup em hospital_structure (Supabase) primeiro; fallback para
// SERVICES_CONTENT estático. notFound() se nenhum cobre o slug.
// =============================================================================

import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ServiceDetailTemplate } from "@/components/templates/service-detail-template"
import {
  getAllServiceSlugs,
  getServiceDataBySlug,
} from "@/lib/structure-service-data"
import { SITE_METADATA } from "@/lib/constants"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

export const dynamicParams = true

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceDataBySlug(slug)

  if (!service) {
    return {
      title: "Serviço não encontrado",
    }
  }

  const canonical = `${SITE_METADATA.url}/servicos/${slug}`
  const ogImage = service.hero.backgroundImage.startsWith("http")
    ? service.hero.backgroundImage
    : `${SITE_METADATA.url}${service.hero.backgroundImage}`

  return {
    title: service.meta.title,
    description: service.meta.description,
    alternates: { canonical },
    openGraph: {
      title: service.meta.title,
      description: service.meta.description,
      url: canonical,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: service.hero.headline,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.meta.title,
      description: service.meta.description,
      images: [ogImage],
    },
  }
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const service = await getServiceDataBySlug(slug)

  if (!service) {
    notFound()
  }

  return <ServiceDetailTemplate data={service} />
}
