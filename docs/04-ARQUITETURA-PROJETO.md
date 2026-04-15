# 04 — ARQUITETURA DO PROJETO | Hospital São Rafael

> **Versão:** 1.0  
> **Data:** 14/04/2026  
> **Stack:** Next.js 14+ · TypeScript · Tailwind CSS · shadcn/ui · Storybook

---

## 1. ESTRUTURA DE PASTAS

```
Site - HSR/
├── CLAUDE.md                              ← Agente Orquestrador
├── .github/
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/
│   ├── 01-BRIEFING-CONSOLIDADO.md
│   ├── 02-INVENTARIO-COMPONENTES.md
│   ├── 03-DESIGN-TOKENS.md
│   ├── 04-ARQUITETURA-PROJETO.md
│   └── 05-ROADMAP-ENTREGAS.md
├── skills/
│   ├── design-system-architect.md
│   ├── component-engineer.md
│   ├── page-builder.md
│   ├── qa-performance.md
│   └── documentation-lead.md
├── src/
│   ├── app/                               ← Next.js App Router
│   │   ├── layout.tsx                     ← Layout raiz (fonte, meta, providers)
│   │   ├── page.tsx                       ← HOME (compõe organismos)
│   │   ├── globals.css                    ← Tailwind directives + CSS vars
│   │   └── favicon.ico
│   ├── components/
│   │   ├── ui/                            ← shadcn/ui base (primitivos)
│   │   │   ├── button.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   ├── atoms/                         ← A01-A11 customizados
│   │   │   ├── kicker.tsx
│   │   │   ├── heading.tsx
│   │   │   ├── metric-number.tsx
│   │   │   └── ...
│   │   ├── molecules/                     ← M01-M15
│   │   │   ├── stat-card.tsx
│   │   │   ├── service-card.tsx
│   │   │   ├── feature-card.tsx
│   │   │   ├── timeline-step.tsx
│   │   │   ├── faq-item.tsx
│   │   │   ├── testimonial-card.tsx
│   │   │   └── ...
│   │   ├── organisms/                     ← O01-O11
│   │   │   ├── header.tsx
│   │   │   ├── hero-section.tsx
│   │   │   ├── stats-bar.tsx
│   │   │   ├── content-block.tsx
│   │   │   ├── card-grid.tsx
│   │   │   ├── b2b-section.tsx
│   │   │   ├── journey-timeline.tsx
│   │   │   ├── faq-section.tsx
│   │   │   ├── footer.tsx
│   │   │   └── modal-overlay.tsx
│   │   └── templates/                     ← Composições de página
│   │       └── home-template.tsx
│   ├── lib/                               ← Utilitários
│   │   ├── utils.ts                       ← cn() helper e funções gerais
│   │   ├── constants.ts                   ← Dados da home (textos, métricas, FAQ)
│   │   └── animations.ts                  ← Configurações de animação reutilizáveis
│   ├── hooks/                             ← React hooks customizados
│   │   ├── use-scroll-spy.ts              ← Detecta seção ativa no scroll
│   │   ├── use-counter-up.ts              ← Animação de contagem
│   │   └── use-intersection.ts            ← IntersectionObserver wrapper
│   ├── types/                             ← TypeScript types globais
│   │   └── index.ts
│   └── assets/                            ← Imagens, vídeos, ícones estáticos
│       ├── images/
│       ├── icons/
│       └── video/
├── .storybook/                            ← Configuração do Storybook
│   ├── main.ts
│   ├── preview.ts
│   └── manager.ts
├── stories/                               ← Stories organizadas por nível
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── public/                                ← Assets estáticos servidos diretamente
│   ├── fonts/
│   └── og-image.png
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── package.json
├── .eslintrc.json
├── .prettierrc
└── .gitignore
```

---

## 2. CONVENÇÕES DE CÓDIGO

### 2.1 Nomenclatura de arquivos
- **Componentes:** `kebab-case.tsx` → `service-card.tsx`
- **Hooks:** `use-` prefix → `use-scroll-spy.ts`
- **Types:** PascalCase nas interfaces → `ServiceCardProps`
- **Constants:** UPPER_SNAKE_CASE para valores → `HOME_STATS`

### 2.2 Nomenclatura de componentes
- **Átomos:** nome descritivo simples → `Kicker`, `Heading`, `MetricNumber`
- **Moléculas:** nome composto → `StatCard`, `ServiceCard`, `TimelineStep`
- **Organismos:** nome de seção → `HeroSection`, `StatsBar`, `B2BSection`
- **Templates:** sufixo Template → `HomeTemplate`

### 2.3 Estrutura de componente padrão

```tsx
// Imports
import { cn } from "@/lib/utils"

// Types
interface ComponentProps {
  // props tipadas
  className?: string
}

// Component
export function Component({ className, ...props }: ComponentProps) {
  return (
    <div className={cn("estilos-base", className)} {...props}>
      {/* conteúdo */}
    </div>
  )
}
```

### 2.4 Regras de estilização
- **Tailwind first:** usar classes utilitárias sempre que possível
- **cn() helper:** para merge condicional de classes (clsx + tailwind-merge)
- **CSS vars:** apenas para tokens que precisam ser acessíveis globalmente
- **Sem CSS modules:** toda estilização via Tailwind
- **Sem `!important`:** resolver especificidade via estrutura

### 2.5 Padrões de dados
- Textos, métricas e dados da home ficam em `lib/constants.ts` — não hardcoded em componentes
- Componentes recebem dados via props, nunca buscam dados internamente
- Isso facilita futura migração para CMS (headless)

---

## 3. CONFIGURAÇÃO DO TAILWIND (Referência)

O arquivo `tailwind.config.ts` deve refletir integralmente os tokens documentados em `03-DESIGN-TOKENS.md`. Pontos críticos:

- Fonte Montserrat como `fontFamily.sans` padrão
- Cores de marca no `extend.colors` com nomes semânticos (`creme`, `charcoal`, `ouro`, etc.)
- Espaçamentos extras para respiros entre dobras (`space-30: 120px`, `space-40: 160px`)
- Border-radius customizado (padrão 4px, botões 0)
- Sombras com opacidade máxima de 15%
- Breakpoints compatíveis com a grade de 8px

---

## 4. PADRÕES DE ACESSIBILIDADE

- Todos os componentes interativos devem ser navegáveis por teclado
- Uso de `aria-labels` em botões com apenas ícone
- Contraste mínimo WCAG 2.1 AA (4.5:1 para texto, 3:1 para elementos grandes)
- Accordion com `aria-expanded` e `role="region"`
- Modal com focus trap e `role="dialog"`
- Imagens decorativas com `alt=""`, imagens informativas com alt descritivo
- Skip-to-content link no header

---

## 5. PADRÕES DE PERFORMANCE

- Imagens via `next/image` com formatos WebP/AVIF e lazy loading
- Fonte Montserrat via `next/font/google` (sem flash de carregamento)
- Componentes pesados (modais, sliders) com dynamic import
- Vídeo do hero com `preload="metadata"` e poster image
- Target: Lighthouse > 90 em todas as métricas

---

## 6. SEO TÉCNICO DA HOME

- Hierarchy correta: 1 `<h1>` no hero, `<h2>` por seção, sem pulos
- Meta tags: title, description, og:image, og:type
- Schema.org: `Hospital` + `MedicalOrganization`
- Sitemap e robots.txt configurados
- URL canônica definida
- Smooth scroll com `scroll-behavior: smooth` e offset para header sticky

---

## 7. VERSIONAMENTO (Git)

### 7.1 Branches
- `main` — produção estável
- `develop` — integração de features
- `feature/nome-da-feature` — desenvolvimento isolado
- `hotfix/nome` — correções urgentes

### 7.2 Commits (Conventional Commits)
```
feat: adiciona componente StatCard
fix: corrige hover do botão primary em mobile
docs: atualiza inventário de componentes
style: ajusta espaçamento da seção B2B
refactor: extrai hook useCounterUp do StatsBar
```

---

*Documento gerado como referência para todos os agentes. Próximo passo: 05-ROADMAP-ENTREGAS.md*
