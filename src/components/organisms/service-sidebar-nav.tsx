// =============================================================================
// SERVICE-SIDEBAR-NAV.TSX — Organismo | Hospital São Rafael
// =============================================================================
// Table of Contents flutuante fixed no viewport.
// Scroll-spy: destaca seção ativa conforme scroll.
// Desktop XL+ apenas (≥1280px). Mobile/tablet: hidden.
// =============================================================================

"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import type { BaseComponentProps } from "@/types"
import type { ServiceNavSection } from "@/lib/services-content"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ServiceSidebarNavProps extends BaseComponentProps {
  sections: ServiceNavSection[]
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function ServiceSidebarNav({ sections, className }: ServiceSidebarNavProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (sections.length === 0) return

    // Mostrar TOC só depois do hero ser ultrapassado
    const onScroll = () => {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    )

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener("scroll", onScroll)
      observer.disconnect()
    }
  }, [sections])

  if (sections.length === 0) return null

  return (
    <aside
      aria-label="Navegação nesta página"
      className={cn(
        "hidden xl:flex fixed left-6 2xl:left-10 top-1/2 -translate-y-1/2 z-20",
        "flex-col gap-1",
        "max-h-[75vh] overflow-y-auto",
        "bg-white/95 backdrop-blur-sm border border-charcoal/10",
        "rounded-xl shadow-lg p-4 w-[220px]",
        "transition-all duration-500",
        visible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-4 pointer-events-none",
        className
      )}
    >
      <span className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/40 mb-2">
        Nesta página
      </span>
      <nav>
        <ul className="flex flex-col gap-0.5 border-l border-charcoal/10">
          {sections.map((s) => {
            const isActive = activeId === s.id
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={cn(
                    "block pl-3 pr-2 py-1.5 -ml-px border-l-2 text-sm transition-all",
                    "hover:text-charcoal",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro rounded-r",
                    isActive
                      ? "border-ouro text-charcoal font-semibold"
                      : "border-transparent text-charcoal/50"
                  )}
                  aria-current={isActive ? "location" : undefined}
                >
                  {s.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
