// =============================================================================
// SERVICE-SIDEBAR-NAV.TSX — Organismo | Hospital São Rafael
// =============================================================================
// Table of Contents flutuante fixed no viewport.
// Scroll-spy: destaca seção ativa conforme scroll.
// Desktop XL+ apenas (≥1280px). Mobile/tablet: hidden.
// =============================================================================

"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BaseComponentProps } from "@/types"
import type { ServiceNavSection } from "@/lib/services-content"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface ServiceSidebarNavProps extends BaseComponentProps {
  sections: ServiceNavSection[]
  /** WhatsApp do CTA fixo no rodapé do TOC */
  whatsappHref?: string
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function ServiceSidebarNav({
  sections,
  whatsappHref = "https://wa.me/message/NZIPXRZ4SKUHM1",
  className,
}: ServiceSidebarNavProps) {
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
        "hidden xl:flex fixed right-6 2xl:right-10 top-1/2 -translate-y-1/2 z-[15]",
        "flex-col",
        "max-h-[80vh]",
        "bg-white/95 backdrop-blur-sm border border-charcoal/10",
        "rounded-xl shadow-lg w-[220px]",
        "transition-all duration-500",
        visible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-4 pointer-events-none",
        className
      )}
    >
      {/* Lista scroll-spy */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 pb-3">
        <span className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/40 mb-2 block">
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
      </div>

      {/* CTA fixo no rodapé do TOC */}
      <div className="border-t border-charcoal/10 p-3">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "w-full inline-flex items-center justify-center gap-1.5",
            "rounded-full px-3 py-2.5",
            "bg-ouro text-white font-bold text-xs",
            "hover:bg-ouro-hover transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro focus-visible:ring-offset-2"
          )}
          aria-label="Falar no WhatsApp"
        >
          <MessageCircle size={14} aria-hidden />
          <span>Falar no WhatsApp</span>
        </a>
      </div>
    </aside>
  )
}
