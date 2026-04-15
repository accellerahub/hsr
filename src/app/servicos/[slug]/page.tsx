// =============================================================================
// /servicos/[slug]/page.tsx — Página dinâmica de serviço | Hospital São Rafael
// =============================================================================
// Rota dinâmica App Router. Lê o slug, busca em SERVICES_CONTENT,
// renderiza ServiceDetailTemplate ou notFound() se não existir.
// =============================================================================

import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SERVICES_CONTENT } from "@/lib/services-content"
import { ServiceDetailTemplate } from "@/components/templates/service-detail-template"

// -----------------------------------------------------------------------------
// TIPOS
// -----------------------------------------------------------------------------
interface PageProps {
  params: Promise<{ slug: string }>
}

// -----------------------------------------------------------------------------
// STATIC PARAMS — geração estática de todas as rotas conhecidas
// -----------------------------------------------------------------------------
export function generateStaticParams() {
  return Object.keys(SERVICES_CONTENT).map((slug) => ({ slug }))
}

// -----------------------------------------------------------------------------
// METADATA DINÂMICA
// -----------------------------------------------------------------------------
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES_CONTENT[slug]

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

// -----------------------------------------------------------------------------
// COMPONENTE DE PÁGINA
// -----------------------------------------------------------------------------
export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const service = SERVICES_CONTENT[slug]

  if (!service) {
    notFound()
  }

  return <ServiceDetailTemplate data={service} />
}
