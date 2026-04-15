// =============================================================================
// ANIMATIONS.TS — Configurações de animação reutilizáveis | Hospital São Rafael
// =============================================================================
// Centraliza todas as configurações de motion/animação do projeto.
// Componentes importam daqui ao invés de definir valores inline.
// Compatível com Framer Motion e CSS animations nativas.
// =============================================================================

// -----------------------------------------------------------------------------
// DURAÇÕES (alinhadas com os tokens em 03-DESIGN-TOKENS.md)
// -----------------------------------------------------------------------------
export const DURATION = {
  fast: 0.15,     // 150ms — micro-interações
  base: 0.3,      // 300ms — padrão HSR (hover, fade)
  slow: 0.5,      // 500ms — reveals, modais
  slower: 0.8,    // 800ms — animações maiores (counter-up, hero)
  slowest: 1.2,   // 1200ms — animações de entrada da página
} as const

// -----------------------------------------------------------------------------
// EASINGS
// -----------------------------------------------------------------------------
export const EASING = {
  default: "ease",
  easeOut: [0, 0, 0.2, 1] as const,          // Desaceleração suave
  easeIn: [0.4, 0, 1, 1] as const,            // Aceleração (saída de tela)
  easeInOut: [0.4, 0, 0.2, 1] as const,       // Suave nos dois pontos
  spring: [0.34, 1.56, 0.64, 1] as const,     // Bounce sutil
} as const

// -----------------------------------------------------------------------------
// VARIANTES FRAMER MOTION — Scroll-triggered reveals
// -----------------------------------------------------------------------------
// Uso com Framer Motion:
// <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={VIEWPORT_CONFIG}>

/** Fade in + slide up (padrão para a maioria das seções) */
export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASING.easeOut,
    },
  },
} as const

/** Fade in simples (sem movimento) */
export const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.slow,
      ease: EASING.easeOut,
    },
  },
} as const

/** Slide in da direita (para elementos laterais) */
export const slideInRight = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASING.easeOut,
    },
  },
} as const

/** Slide in da esquerda */
export const slideInLeft = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASING.easeOut,
    },
  },
} as const

/** Scale up (para cards, imagens em destaque) */
export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.slow,
      ease: EASING.easeOut,
    },
  },
} as const

// -----------------------------------------------------------------------------
// VARIANTES DE CONTAINER — Stagger para filhos (cards, stats)
// -----------------------------------------------------------------------------
// Uso:
// <motion.div variants={staggerContainer} initial="hidden" whileInView="visible">
//   {items.map(item => (
//     <motion.div key={item.id} variants={staggerItem}>...</motion.div>
//   ))}
// </motion.div>

/** Container que aplica stagger nos filhos */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,  // 100ms entre cada filho
      delayChildren: 0.1,    // 100ms antes de começar
    },
  },
} as const

/** Item individual dentro de um stagger container */
export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASING.easeOut,
    },
  },
} as const

// -----------------------------------------------------------------------------
// CONFIGURAÇÃO DO VIEWPORT (IntersectionObserver via Framer Motion)
// -----------------------------------------------------------------------------
// Uso: <motion.div viewport={VIEWPORT_CONFIG}>
export const VIEWPORT_CONFIG = {
  once: true,       // Anima apenas na primeira vez que entra no viewport
  amount: 0.2,      // Trigger quando 20% do elemento está visível
  margin: "0px",    // Sem margem extra
} as const

// Variação para elementos menores (cards individuais)
export const VIEWPORT_CONFIG_EAGER = {
  once: true,
  amount: 0.1,      // Trigger com 10% visível
  margin: "0px",
} as const

// -----------------------------------------------------------------------------
// COUNTER-UP — Configuração para animação de contagem (Stats Bar)
// -----------------------------------------------------------------------------
export const COUNTER_CONFIG = {
  duration: 2,          // 2 segundos para contar de 0 ao valor final
  delay: 0.2,           // 200ms de delay após entrar no viewport
  separator: ".",        // Separador de milhar brasileiro
  decimals: 0,           // Sem casas decimais
  enableScrollSpy: true, // Ativa via IntersectionObserver
  scrollSpyOnce: true,   // Conta apenas uma vez
} as const

// -----------------------------------------------------------------------------
// MODAL — Configurações de abertura/fechamento
// -----------------------------------------------------------------------------
export const modalAnimation = {
  overlay: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: DURATION.base },
    },
    exit: {
      opacity: 0,
      transition: { duration: DURATION.fast },
    },
  },
  content: {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: DURATION.base,
        ease: EASING.easeOut,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 10,
      transition: {
        duration: DURATION.fast,
      },
    },
  },
} as const

// -----------------------------------------------------------------------------
// HEADER — Transição transparent → solid no scroll
// -----------------------------------------------------------------------------
export const headerAnimation = {
  transparent: {
    backgroundColor: "rgba(253, 241, 231, 0)",   // creme transparent
    backdropFilter: "blur(0px)",
    boxShadow: "none",
  },
  solid: {
    backgroundColor: "rgba(253, 241, 231, 0.95)", // creme quase opaco
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 8px rgba(46, 46, 46, 0.08)",
  },
} as const

// Threshold em pixels para ativar header sólido
export const HEADER_SCROLL_THRESHOLD = 50

// -----------------------------------------------------------------------------
// CSS ANIMATION CLASSES — Para uso sem Framer Motion (fallback leve)
// -----------------------------------------------------------------------------
// Essas classes estão definidas no tailwind.config.ts como keyframes.
// Usar quando Framer Motion for overhead desnecessário.
//
// Exemplo de uso com IntersectionObserver nativo:
// element.classList.add(CSS_ANIMATIONS.fadeInUp)
export const CSS_ANIMATIONS = {
  fadeInUp: "animate-fade-in-up",
  fadeIn: "animate-fade-in",
  counterUp: "animate-counter-up",
  slideInRight: "animate-slide-in-right",
} as const

// Helpers para stagger via CSS (usar com animation-delay)
export const CSS_STAGGER_DELAYS = [
  "animation-delay-100",
  "animation-delay-200",
  "animation-delay-300",
  "animation-delay-400",
  "animation-delay-500",
] as const
