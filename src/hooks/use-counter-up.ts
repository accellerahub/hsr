// =============================================================================
// USE-COUNTER-UP.TS — Hook de animação de contagem | Hospital São Rafael
// =============================================================================
// Anima um número de 0 até o valor alvo quando o elemento entra no viewport.
// Usado pela Stats Bar (Dobra 2) para dar vida aos números de credibilidade.
// =============================================================================

import { useState, useEffect, useRef, useCallback } from "react"

interface UseCounterUpOptions {
  /** Valor final da contagem */
  end: number
  /** Duração da animação em milissegundos */
  duration?: number
  /** Delay antes de iniciar (ms) — útil para stagger entre múltiplos counters */
  delay?: number
  /** Número de casas decimais */
  decimals?: number
  /** Separador de milhar (padrão: ".") */
  separator?: string
  /** Se deve iniciar automaticamente quando visível (true) ou manualmente (false) */
  autoStart?: boolean
  /** Easing da animação */
  easing?: "linear" | "easeOut" | "easeInOut"
}

interface UseCounterUpReturn {
  /** Valor atual formatado como string */
  formattedValue: string
  /** Valor numérico atual (sem formatação) */
  currentValue: number
  /** Ref para anexar ao elemento que será observado */
  ref: React.RefObject<HTMLElement | null>
  /** Se a animação já foi executada */
  hasAnimated: boolean
  /** Iniciar animação manualmente */
  start: () => void
  /** Resetar para 0 */
  reset: () => void
}

// Funções de easing
const easingFunctions = {
  linear: (t: number) => t,
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOut: (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
}

export function useCounterUp({
  end,
  duration = 2000,
  delay = 0,
  decimals = 0,
  separator = ".",
  autoStart = true,
  easing = "easeOut",
}: UseCounterUpOptions): UseCounterUpReturn {
  const [currentValue, setCurrentValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  // Formatar número com separador de milhar e decimais
  const formatValue = useCallback(
    (value: number): string => {
      const fixed = value.toFixed(decimals)
      const [intPart, decPart] = fixed.split(".")

      // Adicionar separador de milhar
      const formattedInt = intPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        separator
      )

      return decPart ? `${formattedInt},${decPart}` : formattedInt
    },
    [decimals, separator]
  )

  // Função de animação
  const animate = useCallback(() => {
    const easingFn = easingFunctions[easing]

    const step = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easingFn(progress)
      const value = easedProgress * end

      setCurrentValue(value)

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(step)
      } else {
        // Garantir que termina exatamente no valor final
        setCurrentValue(end)
        setHasAnimated(true)
      }
    }

    // Aplicar delay se configurado
    const timeoutId = setTimeout(() => {
      startTimeRef.current = null
      animationFrameRef.current = requestAnimationFrame(step)
    }, delay)

    // Retornar cleanup
    return () => {
      clearTimeout(timeoutId)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [end, duration, delay, easing])

  // Start manual
  const start = useCallback(() => {
    if (hasAnimated) return
    animate()
  }, [animate, hasAnimated])

  // Reset
  const reset = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    startTimeRef.current = null
    setCurrentValue(0)
    setHasAnimated(false)
  }, [])

  // IntersectionObserver para autoStart
  useEffect(() => {
    if (!autoStart || hasAnimated) return

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animate()
          }
        })
      },
      {
        threshold: 0.2, // Trigger quando 20% visível
        rootMargin: "0px",
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [autoStart, hasAnimated, animate])

  // Cleanup geral ao desmontar
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return {
    formattedValue: formatValue(currentValue),
    currentValue,
    ref,
    hasAnimated,
    start,
    reset,
  }
}
