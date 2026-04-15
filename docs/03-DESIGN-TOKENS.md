# 03 — DESIGN TOKENS | Hospital São Rafael

> **Versão:** 1.0  
> **Data:** 14/04/2026  
> **Consumidor:** Tailwind CSS config + CSS Variables  
> **Fonte:** Diretriz de Estilo HSR V1.0

---

## 1. O QUE SÃO DESIGN TOKENS

Tokens são as decisões de design mais fundamentais do sistema, codificadas como variáveis reutilizáveis. Eles garantem que qualquer componente — presente ou futuro — use exatamente as mesmas cores, tamanhos, espaçamentos e efeitos. Mudar um token muda o sistema inteiro.

---

## 2. CORES

### 2.1 Cores de marca (Brand)

```
--color-creme:          #FDF1E7    // Fundo principal
--color-branco:         #FFFFFF    // Cards, modais, áreas limpas
--color-charcoal:       #2E2E2E    // Texto principal, seção B2B
--color-ouro:           #FFB800    // CTAs, ações, destaques
--color-ouro-hover:     #E6A600    // Hover do ouro
--color-azul:           #00A5D6    // Confiança, links informativos
--color-cobre:          #C08A63    // Detalhes premium, acentos de luxo
```

### 2.2 Cores semânticas (Semantic)

```
--color-success:        #2D8F4E    // Confirmações, status positivo
--color-warning:        #FFB800    // Alertas (reutiliza ouro)
--color-error:          #D94040    // Erros, validações negativas
--color-info:           #00A5D6    // Informações (reutiliza azul)
```

### 2.3 Cores neutras (Neutral Scale)

```
--color-neutral-50:     #FAFAFA    // Fundo alternativo mais claro
--color-neutral-100:    #F5F5F5    // Fundo de hover leve
--color-neutral-200:    #E5E5E5    // Bordas sutis
--color-neutral-300:    #D4D4D4    // Bordas padrão
--color-neutral-400:    #A3A3A3    // Texto desabilitado
--color-neutral-500:    #737373    // Texto secundário
--color-neutral-600:    #525252    // Texto auxiliar
--color-neutral-700:    #404040    // Texto forte
--color-neutral-800:    #2E2E2E    // = charcoal (texto principal)
--color-neutral-900:    #1A1A1A    // Preto suave
```

### 2.4 Cores de superfície (Surface)

```
--surface-primary:      #FDF1E7    // Fundo padrão (creme)
--surface-secondary:    #FFFFFF    // Cards, modais
--surface-tertiary:     #2E2E2E    // Seção B2B, footer
--surface-overlay:      rgba(46, 46, 46, 0.70)  // Overlay de modais
--surface-glass:        rgba(255, 255, 255, 0.15) // Glassmorphism
```

---

## 3. TIPOGRAFIA

### 3.1 Família

```
--font-family:          'Montserrat', sans-serif
```

### 3.2 Escala de tamanhos

```
--text-xs:              12px       // Labels mínimos, legal text
--text-sm:              14px       // Kickers, captions
--text-base:            16px       // Corpo mobile
--text-lg:              18px       // Corpo desktop
--text-xl:              20px       // Subtítulos
--text-2xl:             24px       // H2 mobile
--text-3xl:             32px       // H1 mobile
--text-4xl:             40px       // H2 desktop
--text-5xl:             48px       // Números de destaque
--text-6xl:             52px       // H1 desktop (hero)
```

### 3.3 Pesos

```
--font-regular:         400        // Corpo
--font-medium:          500        // Ênfase sutil
--font-semibold:        600        // Botões secondary, nav links
--font-bold:            700        // H2, botões primary
--font-extrabold:       800        // H1, kickers, números
```

### 3.4 Line-heights

```
--leading-tight:        1.2        // Headings
--leading-normal:       1.5        // UI elements
--leading-relaxed:      1.6        // Corpo de texto
--leading-loose:        1.8        // Texto em espaços abertos
```

### 3.5 Letter-spacing

```
--tracking-tight:       -0.02em   // Headings grandes
--tracking-normal:      0          // Padrão
--tracking-wide:        0.05em    // Leve abertura
--tracking-kicker:      0.15em    // Kickers (3px em 14px ≈ 0.15em)
```

### 3.6 Tokens compostos de tipografia

```
h1-hero:        { size: 6xl, weight: extrabold, leading: tight, tracking: tight }
h1-hero-mobile: { size: 3xl, weight: extrabold, leading: tight, tracking: tight }
h2-section:     { size: 4xl, weight: bold, leading: tight, tracking: normal }
h2-section-mob: { size: 2xl, weight: bold, leading: tight, tracking: normal }
body:           { size: lg, weight: regular, leading: relaxed, tracking: normal }
body-mobile:    { size: base, weight: regular, leading: relaxed, tracking: normal }
kicker:         { size: sm, weight: extrabold, leading: normal, tracking: kicker, transform: uppercase }
metric:         { size: 5xl, weight: extrabold, leading: tight, tracking: tight }
```

---

## 4. ESPAÇAMENTO (Sistema de 8px)

```
--space-0:              0
--space-1:              4px        // Micro ajustes
--space-2:              8px        // Padding interno mínimo
--space-3:              12px       // Gap entre ícone e texto
--space-4:              16px       // Padding padrão de cards
--space-5:              20px       // Margem entre elementos inline
--space-6:              24px       // Gap em grids pequenos
--space-8:              32px       // Padding de seções internas
--space-10:             40px       // Margem entre blocos
--space-12:             48px       // Respiro médio
--space-16:             64px       // Padding de seção
--space-20:             80px       // Respiro entre dobras (mobile)
--space-24:             96px       // Respiro intermediário
--space-30:             120px      // Respiro entre dobras (desktop)
--space-40:             160px      // Respiro máximo (hero)
```

---

## 5. BORDAS E RAIOS

```
--radius-none:          0          // Botões (cantos retos = DNA HSR)
--radius-sm:            2px        // Inputs, elementos sutis
--radius-md:            4px        // Cards (máximo permitido)
--radius-lg:            8px        // Modais
--radius-full:          9999px     // Badges, avatares circulares

--border-width-thin:    1px
--border-width-normal:  2px
--border-color-default: #E5E5E5    // = neutral-200
--border-color-accent:  #C08A63    // = cobre
```

---

## 6. SOMBRAS

```
--shadow-sm:            0 1px 2px rgba(46, 46, 46, 0.04)
--shadow-md:            0 4px 8px rgba(46, 46, 46, 0.08)     // Padrão cards
--shadow-lg:            0 8px 24px rgba(46, 46, 46, 0.08)    // Cards hover
--shadow-xl:            0 16px 48px rgba(46, 46, 46, 0.12)   // Modais
--shadow-none:          none
```

Nota: opacidade máxima de 15% conforme diretriz (`rgba(46, 46, 46, 0.08)` = ~8%).

---

## 7. TRANSIÇÕES E ANIMAÇÕES

```
--transition-fast:      150ms ease
--transition-base:      300ms ease      // Padrão HSR (hover, fade)
--transition-slow:      500ms ease      // Abertura de modais, reveals
--transition-spring:    300ms cubic-bezier(0.34, 1.56, 0.64, 1) // Bounce sutil

--hover-lift:           translateY(-5px)  // Cards interativos
--hover-scale:          scale(1.02)       // Imagens em hover
```

---

## 8. BREAKPOINTS

```
--bp-sm:                640px      // Mobile landscape
--bp-md:                768px      // Tablet
--bp-lg:                1024px     // Desktop small
--bp-xl:                1280px     // Desktop padrão
--bp-2xl:               1536px     // Desktop largo
```

---

## 9. Z-INDEX SCALE

```
--z-base:               0
--z-dropdown:           10
--z-sticky:             20         // Header sticky
--z-overlay:            30         // Overlay de modais
--z-modal:              40         // Modal content
--z-toast:              50         // Notificações
```

---

## 10. EFEITOS ESPECIAIS

```
// Glassmorphism
--glass-blur:           backdrop-filter: blur(15px)
--glass-bg:             rgba(255, 255, 255, 0.15)
--glass-border:         1px solid rgba(255, 255, 255, 0.2)

// Overlay de modal
--overlay-bg:           rgba(46, 46, 46, 0.70)

// Gradient sutil para hero
--gradient-hero:        linear-gradient(180deg, rgba(46,46,46,0.6) 0%, rgba(46,46,46,0.3) 100%)
```

---

## 11. MAPEAMENTO PARA TAILWIND (tailwind.config.ts)

Este mapa mostra como os tokens acima se traduzem na configuração do Tailwind. O Component Engineer e o Claude Code usarão essa referência para montar o `tailwind.config.ts`.

```
colors:
  creme       → #FDF1E7
  charcoal    → #2E2E2E
  ouro        → { DEFAULT: #FFB800, hover: #E6A600 }
  azul        → #00A5D6
  cobre       → #C08A63

fontFamily:
  sans        → ['Montserrat', ...defaultTheme.fontFamily.sans]

fontSize:
  (usar escala customizada conforme seção 3.2)

spacing:
  (estender com valores customizados: 30 → 120px, 40 → 160px)

borderRadius:
  none        → 0
  sm          → 2px
  DEFAULT     → 4px
  lg          → 8px

boxShadow:
  (customizar conforme seção 6)

transitionDuration:
  fast        → 150ms
  DEFAULT     → 300ms
  slow        → 500ms
```

---

*Documento gerado como especificação para o Design System Architect implementar no código. Próximo passo: 04-ARQUITETURA-PROJETO.md*
