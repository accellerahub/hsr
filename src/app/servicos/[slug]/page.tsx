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
      title: "Serviço não encontrado | Hospital São Rafael",
    }
  }

  return {
    title: service.meta.title,
    description: service.meta.description,
    openGraph: {
      title: service.meta.title,
      description: service.meta.description,
      images: [
        {
          url: service.hero.backgroundImage,
          width: 1200,
          height: 630,
          alt: service.hero.headline,
        },
      ],
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
