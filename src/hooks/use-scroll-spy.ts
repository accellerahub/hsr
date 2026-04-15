// =============================================================================
// USE-SCROLL-SPY.TS — Hook de detecção de seção ativa | Hospital São Rafael
// =============================================================================
// Monitora o scroll da página e retorna o ID da seção atualmente visível.
// Usado pelo Header/Navbar para destacar o link ativo na navegação.
// =============================================================================

import { useState, useEffect, useCallback, useRef } from "react"

interface UseScrollSpyOptions {
  /** IDs das seções a monitorar (sem #) */
  sectionIds: string[]
  /** Offset do topo para compensar header sticky (em px) */
  offset?: number
  /** Threshold de interseção (0 a 1) — quanto do elemento precisa estar visível */
  threshold?: number
}

interface UseScrollSpyReturn {
  /** ID da seção atualmente ativa */
  activeSection: string
  /** Scroll até uma seção específica */
  scrollTo: (sectionId: string) => void
}

export function useScrollSpy({
  sectionIds,
  offset = 80,
  threshold = 0.3,
}: UseScrollSpyOptions): UseScrollSpyReturn {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || "")
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Limpar observer anterior
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Mapa para rastrear visibilidade de cada seção
    const visibilityMap = new Map<string, number>()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Atualizar o mapa de visibilidade
        entries.forEach((entry) => {
          visibilityMap.set(entry.target.id, entry.intersectionRatio)
        })

        // Encontrar a seção com maior visibilidade
        let maxRatio = 0
        let mostVisibleSection = sectionIds[0] || ""

        visibilityMap.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio
            mostVisibleSection = id
          }
        })

        // Só atualizar se alguma seção tiver visibilidade mínima
        if (maxRatio > 0) {
          setActiveSection(mostVisibleSection)
        }
      },
      {
        // rootMargin negativo no topo para compensar header sticky
        rootMargin: `-${offset}px 0px -30% 0px`,
        threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1.0],
      }
    )

    // Observar cada seção
    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element && observerRef.current) {
        observerRef.current.observe(element)
      }
    })

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [sectionIds, offset, threshold])

  // Tratamento especial: se o scroll está no topo absoluto, ativar primeira seção
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection(sectionIds[0] || "")
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sectionIds])

  // Função de scroll suave com offset
  const scrollTo = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId)
      if (!element) return

      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    },
    [offset]
  )

  return { activeSection, scrollTo }
}
