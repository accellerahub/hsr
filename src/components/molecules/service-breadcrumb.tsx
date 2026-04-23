// =============================================================================
// SERVICE-BREADCRUMB.TSX — Molécula | Hospital São Rafael
// =============================================================================
// Trilha de navegação para páginas de serviço.
// Inclui schema BreadcrumbList via JSON-LD (renderizado separado).
// =============================================================================

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BaseComponentProps } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
export interface BreadcrumbItem {
  label: string
  href: string
}

interface ServiceBreadcrumbProps extends BaseComponentProps {
  items: BreadcrumbItem[]
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function ServiceBreadcrumb({ items, className }: ServiceBreadcrumbProps) {
  if (items.length === 0) return null

  return (
    <nav
      aria-label="Trilha de navegação"
      className={cn(
        "w-full bg-charcoal/95 backdrop-blur-sm border-b border-white/10",
        className
      )}
    >
      <ol className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-1 text-xs text-white/60">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.href}-${index}`} className="flex items-center gap-1">
              {isLast ? (
                <span aria-current="page" className="font-semibold text-white">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-ouro transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro rounded"
                >
                  {item.label}
                </Link>
              )}
              {!isLast && (
                <ChevronRight size={12} className="text-white/30" aria-hidden />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
