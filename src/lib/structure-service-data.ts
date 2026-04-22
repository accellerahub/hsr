// =============================================================================
// structure-service-data.ts — Monta ServiceDetailData de hospital_structure
// =============================================================================
// Para itens gerenciados via /admin/estrutura. Combina dados do banco com
// defaults fixos do template (gallery/highlights/testimonials/faq) enquanto o
// admin não expõe esses blocos.
// =============================================================================

import { cache } from "react"
import { createClient as createServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { SERVICES_CONTENT } from "@/lib/services-content"
import type { ServiceDetailData } from "@/lib/services-content"

interface StructureRow {
  slug: string
  title: string
  description: string
  icon: string
  image_url: string | null
  kicker: string | null
  subheadline: string | null
  pills: string[] | null
  features: { icon: string; title: string; description: string }[] | null
  is_active: boolean
}

function defaultGallery(row: StructureRow) {
  const img = row.image_url || "/assets/images/servicos/centro-cirurgico.jpg"
  return {
    kicker: "ESTRUTURA",
    headline: "Ambiente planejado para excelência.",
    description:
      "Cada detalhe da nossa infraestrutura é projetado para oferecer segurança, conforto e precisão em cada etapa do cuidado.",
    images: [
      { src: img, alt: row.title },
      { src: img, alt: row.title },
      { src: img, alt: row.title },
      { src: img, alt: row.title },
    ],
    features:
      row.features && row.features.length > 0
        ? row.features
        : [
            {
              icon: "shield-check",
              title: "Protocolos rigorosos",
              description:
                "Processos alinhados aos mais altos padrões internacionais de segurança.",
            },
            {
              icon: "users",
              title: "Equipe multidisciplinar",
              description:
                "Profissionais treinados para oferecer atendimento humanizado e preciso.",
            },
            {
              icon: "sparkles",
              title: "Conforto hospitalar",
              description:
                "Ambiente planejado para acolher paciente e acompanhante com dignidade.",
            },
          ],
    cta: { label: "Conheça o hospital", href: "/#diferenciais" },
  }
}

function defaultHighlights() {
  return {
    kicker: "POR QUE O HSR",
    headline: "Excelência que se traduz em resultados.",
    items: [
      {
        id: "taxa-infeccao",
        metric: "0,33%",
        icon: "shield-check",
        title: "Taxa de infecção",
        description: "Muito abaixo da média nacional, refletindo protocolos rigorosos.",
      },
      {
        id: "leitos",
        metric: "65",
        icon: "bed",
        title: "Leitos disponíveis",
        description: "Capacidade para atender demanda crescente com qualidade.",
      },
      {
        id: "salas",
        metric: "22",
        icon: "scalpel",
        title: "Salas cirúrgicas",
        description: "Tecnologia de ponta para procedimentos de alta complexidade.",
      },
    ],
  }
}

function defaultTestimonials() {
  return {
    headline: "O que nossos pacientes e médicos dizem.",
    items: [
      {
        id: "t1",
        quote:
          "Ambiente acolhedor, equipe atenta e estrutura de primeira. Recomendo sem hesitar.",
        author: "Paciente HSR",
        role: "Procedimento eletivo",
        image: "",
      },
    ],
  }
}

function defaultFaq() {
  return {
    kicker: "DÚVIDAS FREQUENTES",
    headline: "Tire suas principais dúvidas.",
    items: [],
  }
}

function buildFromRow(row: StructureRow): ServiceDetailData {
  return {
    slug: row.slug,
    meta: {
      title: `${row.title} | Hospital São Rafael`,
      description: row.description,
    },
    hero: {
      kicker: row.kicker ?? row.title.toUpperCase(),
      headline: row.title,
      subheadline: row.subheadline ?? row.description,
      backgroundImage:
        row.image_url ?? "/assets/images/servicos/centro-cirurgico.jpg",
      pills: row.pills ?? [],
    },
    galleryBlock: defaultGallery(row),
    highlights: defaultHighlights(),
    testimonials: defaultTestimonials(),
    faq: defaultFaq(),
  }
}

async function readStructureClient() {
  try {
    return await createServerClient()
  } catch {
    return createAdminClient()
  }
}

export const getServiceDataBySlug = cache(
  async (slug: string): Promise<ServiceDetailData | null> => {
    const supabase = await readStructureClient()
    const { data } = await supabase
      .from("hospital_structure")
      .select(
        "slug,title,description,icon,image_url,kicker,subheadline,pills,features,is_active"
      )
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle()

    if (data) return buildFromRow(data as StructureRow)

    return SERVICES_CONTENT[slug] ?? null
  }
)

export const getAllServiceSlugs = cache(async (): Promise<string[]> => {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from("hospital_structure")
    .select("slug")
    .eq("is_active", true)

  const dbSlugs = (data ?? []).map((r) => r.slug as string)
  const staticSlugs = Object.keys(SERVICES_CONTENT)
  return Array.from(new Set([...dbSlugs, ...staticSlugs]))
})
