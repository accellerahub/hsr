// =============================================================================
// USE-INTERSECTION.TS — Hook genérico de IntersectionObserver | Hospital São Rafael
// =============================================================================
// Wrapper reutilizável para IntersectionObserver.
// Detecta quando um elemento entra/sai do viewport.
// Usado para scroll-triggered animations em qualquer componente.
// =============================================================================

import { useState, useEffect, useRef } from "react"

interface UseIntersectionOptions {
  /** Threshold de visibilidade (0 a 1). Default: 0.2 (20%) */
  threshold?: number | number[]
  /** Margem ao redor do root (formato CSS). Default: "0px" */
  rootMargin?: string
  /** Se true, desconecta o observer após a primeira interseção. Default: true */
  once?: boolean
  /** Se o observer está ativo. Útil para desabilitar condicionalmente. Default: true */
  enabled?: boolean
}

interface UseIntersectionReturn {
  /** Ref para anexar ao elemento observado */
  ref: React.RefObject<HTMLElement | null>
  /** Se o elemento está atualmente visível no viewport */
  isIntersecting: boolean
  /** Se o elemento já foi visível pelo menos uma vez */
  hasIntersected: boolean
  /** IntersectionObserverEntry mais recente (para dados avançados) */
  entry: IntersectionObserverEntry | null
}

export function useIntersection({
  threshold = 0.2,
  rootMargin = "0px",
  once = true,
  enabled = true,
}: UseIntersectionOptions = {}): UseIntersectionReturn {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const ref = useRef<HTMLElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!enabled) return

    const element = ref.current
    if (!element) return

    // Se once=true e já intersectou, não precisa observar de novo
    if (once && hasIntersected) return

    // Limpar observer anterior
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      ([observerEntry]) => {
        setIsIntersecting(observerEntry.isIntersecting)
        setEntry(observerEntry)

        if (observerEntry.isIntersecting) {
          setHasIntersected(true)

          // Se once=true, desconectar após primeira interseção
          if (once && observerRef.current) {
            observerRef.current.disconnect()
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [threshold, rootMargin, once, enabled, hasIntersected])

  return {
    ref,
    isIntersecting,
    hasIntersected,
    entry,
  }
}

// =============================================================================
// HOOK COMPOSTO — useAnimateOnScroll
// =============================================================================
// Atalho que combina useIntersection com classes CSS de animação.
// Retorna as props prontas para aplicar no elemento.
//
// Uso:
// const animProps = useAnimateOnScroll({ animation: "fade-in-up" })
// <div {...animProps}>Conteúdo</div>
// =============================================================================

interface UseAnimateOnScrollOptions {
  /** Nome da animação (classe Tailwind sem o prefixo 'animate-') */
  animation?: "fade-in-up" | "fade-in" | "counter-up" | "slide-in-right"
  /** Threshold de visibilidade. Default: 0.2 */
  threshold?: number
  /** Delay customizado (classe CSS). Default: nenhum */
  delay?: string
  /** Se a animação está habilitada. Default: true */
  enabled?: boolean
}

interface AnimateOnScrollProps {
  ref: React.RefObject<HTMLElement | null>
  className: string
  style: React.CSSProperties
}

export function useAnimateOnScroll({
  animation = "fade-in-up",
  threshold = 0.2,
  delay,
  enabled = true,
}: UseAnimateOnScrollOptions = {}): AnimateOnScrollProps {
  const { ref, hasIntersected } = useIntersection({
    threshold,
    once: true,
    enabled,
  })

  const className = [
    // Estado inicial: invisível
    !hasIntersected && "opacity-0",
    // Quando visível: aplicar animação
    hasIntersected && `animate-${animation}`,
    // Delay opcional
    hasIntersected && delay,
  ]
    .filter(Boolean)
    .join(" ")

  return {
    ref,
    className,
    style: {
      // Fallback: garantir que o elemento começa invisível se JS/animation falhar
      opacity: hasIntersected ? undefined : 0,
    },
  }
}
