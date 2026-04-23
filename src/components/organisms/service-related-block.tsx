// =============================================================================
// SERVICE-RELATED-BLOCK.TSX — Organismo | Hospital São Rafael
// =============================================================================
// Cross-link para outros serviços. Internal linking + tempo de sessão.
// Sinal SEO forte (topic cluster).
// =============================================================================

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { Icon, resolveIconName } from "@/components/atoms/icon"
import type { BaseComponentProps } from "@/types"
import type { ServiceRelatedData } from "@/lib/services-content"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ServiceRelatedBlockProps extends BaseComponentProps {
  data: ServiceRelatedData
  sectionId?: string
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function ServiceRelatedBlock({
  data,
  sectionId = "relacionados",
  className,
}: ServiceRelatedBlockProps) {
  const { kicker, headline, items } = data

  if (items.length === 0) return null

  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-heading`}
      className={cn("py-16 lg:py-24 bg-creme", className)}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:pr-[260px] 2xl:pr-[300px]">
        <header className="flex flex-col gap-4 max-w-[760px] mb-10 lg:mb-14">
          {kicker && <Kicker color="cobre">{kicker}</Kicker>}
          <Heading as="h2" id={`${sectionId}-heading`}>
            {headline}
          </Heading>
          <div className="w-12 h-0.5 bg-cobre" aria-hidden />
        </header>

        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/servicos/${item.slug}`}
                className={cn(
                  "group flex flex-col h-full rounded-xl overflow-hidden bg-white",
                  "border border-charcoal/5",
                  "transition-all duration-300",
                  "hover:border-ouro/40 hover:shadow-lg",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro"
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">
                    <Icon
                      name={resolveIconName(item.icon)}
                      size={18}
                      color="charcoal"
                      strokeWidth={2}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 p-5 flex-1">
                  <Heading as="h3" className="!text-lg lg:!text-xl">
                    {item.title}
                  </Heading>
                  <BodyText color="muted" size="sm" className="flex-1">
                    {item.description}
                  </BodyText>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-ouro mt-2 group-hover:gap-2 transition-all">
                    Saber mais <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
