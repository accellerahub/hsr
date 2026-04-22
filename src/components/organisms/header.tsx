// =============================================================================
// HEADER.TSX — Organismo O01 | Hospital São Rafael
// =============================================================================
// Composição: Logo (A10) + NavLinks (M08[]) + Button CTA (A01)
// Comportamento: sticky, transparente no hero → sólido no scroll, drawer mobile
// =============================================================================

"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/atoms/logo"
import { Button } from "@/components/atoms/button"
import { NavLink } from "@/components/molecules/nav-link"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { trackClick } from "@/lib/track-click"
import type { NavItem, NavCTA, BaseComponentProps } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface HeaderProps extends BaseComponentProps {
  navItems: NavItem[]
  cta: NavCTA
  /** Threshold de scroll (em px) para mudar de transparente para sólido */
  scrollThreshold?: number
}

// -----------------------------------------------------------------------------
// LANGUAGE TOGGLE — minimalista, sem redirecionamento
// -----------------------------------------------------------------------------
function LangToggle() {
  const [lang, setLang] = useState<"PT" | "EN">("PT")

  return (
    <div className="flex items-center gap-1 text-xs font-semibold" aria-label="Idioma">
      {(["PT", "EN"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && (
            <span className="text-white/20 select-none">|</span>
          )}
          <button
            type="button"
            onClick={() => setLang(l)}
            className={cn(
              "transition-colors duration-200 px-1",
              lang === l ? "text-white" : "text-white/35 hover:text-white/70"
            )}
            aria-pressed={lang === l}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  )
}

// IDs das seções monitoradas pelo scroll-spy — home
const HOME_SECTION_IDS = [
  "hero",
  "diferenciais",
  "servicos",
  "especialidades",
  "produtos",
  "jornada",
  "medicos",
  "faq",
]

// IDs das seções monitoradas pelo scroll-spy — páginas de serviço
const SERVICE_SECTION_IDS = [
  "service-hero",
  "estrutura",
  "diferenciais",
  "depoimentos",
  "faq",
]

// NavItems para páginas de serviço
const SERVICE_NAV_ITEMS: NavItem[] = [
  { label: "Início",       href: "/"            },
  { label: "Estrutura",    href: "#estrutura"   },
  { label: "Diferenciais", href: "#diferenciais"},
  { label: "Depoimentos",  href: "#depoimentos" },
  { label: "FAQ",          href: "#faq"         },
]

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function Header({
  navItems,
  cta,
  scrollThreshold = 80,
  className,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const pathname = usePathname()
  const router = useRouter()
  const isServicePage = pathname.startsWith("/servicos/")

  const activeNavItems = isServicePage ? SERVICE_NAV_ITEMS : navItems
  const sectionIds = isServicePage ? SERVICE_SECTION_IDS : HOME_SECTION_IDS

  const { activeSection, scrollTo } = useScrollSpy({
    sectionIds,
    offset: 80,
  })

  // Detectar scroll para mudar aparência do header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > scrollThreshold)
    }

    handleScroll() // checar estado inicial
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollThreshold])

  // Fechar drawer no resize para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setDrawerOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Bloquear scroll do body quando drawer aberto
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [drawerOpen])

  const handleNavClick = (href: string) => {
    setDrawerOpen(false)
    if (!href.startsWith("#")) {
      router.push(href)
      return
    }
    const sectionId = href.replace("#", "")
    scrollTo(sectionId)
  }

  return (
    <>
      {/* Skip to content — acessibilidade */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-ouro focus:text-charcoal focus:font-bold"
      >
        Ir para o conteúdo
      </a>

      <header
        className={cn(
          // Posicionamento sticky
          "fixed top-0 left-0 right-0 z-[20]",
          // Transição suave
          "transition-all duration-500 ease-in-out",
          // Estado transparente (no hero)
          !isScrolled && "bg-transparent",
          // Estado sólido (após scroll)
          isScrolled && "bg-charcoal/95 backdrop-blur-sm shadow-lg",
          className
        )}
        role="banner"
      >
        <nav
          className={cn(
            "max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8",
            "flex items-center justify-between",
            "h-16 lg:h-20",
          )}
          aria-label="Navegação principal"
        >
          {/* Logo */}
          <a
            href={isServicePage ? "/" : "#hero"}
            onClick={(e) => { e.preventDefault(); handleNavClick(isServicePage ? "/" : "#hero") }}
            aria-label="Hospital São Rafael — ir para o início"
            className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro"
          >
            <Logo variant="light" height={40} />
          </a>

          {/* Navegação desktop */}
          <ul
            className="hidden lg:flex items-center gap-5"
            role="list"
            aria-label="Links de navegação"
          >
            {activeNavItems.map((item) => {
              const sectionId = item.href.replace("#", "")
              return (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    isActive={activeSection === sectionId}
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>

          {/* CTA desktop */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language switcher */}
            <LangToggle />

            <Button
              variant="primary"
              size="sm"
              href={cta.href}
              onClick={(e) => {
                e.preventDefault()
                trackClick("atendimento_whatsapp")
                handleNavClick(cta.href)
              }}
            >
              {cta.label}
            </Button>
          </div>

          {/* Botão hamburger mobile */}
          <button
            type="button"
            aria-label={drawerOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            onClick={() => setDrawerOpen((prev) => !prev)}
            className={cn(
              "lg:hidden p-2 text-white",
              "transition-colors duration-200 hover:text-ouro",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro"
            )}
          >
            {drawerOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* DRAWER MOBILE                                                       */}
      {/* ------------------------------------------------------------------ */}
      {/* Overlay */}
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[25] bg-charcoal/60 backdrop-blur-sm lg:hidden",
          "transition-opacity duration-300",
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Painel */}
      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={cn(
          "fixed top-0 right-0 bottom-0 z-[30] w-[280px] lg:hidden",
          "bg-charcoal flex flex-col",
          "transition-transform duration-300 ease-in-out",
          drawerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Cabeçalho do drawer */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
          <Logo variant="light" height={36} />
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setDrawerOpen(false)}
            className="p-2 text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-6" aria-label="Menu mobile">
          <ul className="flex flex-col gap-1" role="list">
            {activeNavItems.map((item) => {
              const sectionId = item.href.replace("#", "")
              const isActive = activeSection === sectionId
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }}
                    className={cn(
                      "block px-4 py-3 text-sm font-semibold",
                      "transition-colors duration-200 rounded-sm",
                      isActive
                        ? "text-ouro bg-ouro/10"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* CTA mobile */}
        <div className="px-6 py-6 border-t border-white/10">
          <Button
            variant="primary"
            size="md"
            href={cta.href}
            onClick={(e) => {
              e.preventDefault()
              trackClick("atendimento_whatsapp")
              handleNavClick(cta.href)
            }}
            className="w-full justify-center"
          >
            {cta.label}
          </Button>
        </div>
      </aside>
    </>
  )
}
