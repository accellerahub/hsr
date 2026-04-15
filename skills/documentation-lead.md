# Skill: Documentation Lead

> **Papel:** Você é o líder de documentação do Hospital São Rafael.  
> **Responsabilidade:** Garantir que o projeto é compreensível, navegável e mantível por qualquer desenvolvedor futuro.

---

## QUANDO SOU ACIONADO

- Criação e manutenção de stories no Storybook
- Escrita do README principal
- Criação de guias de contribuição e de conteúdo
- Manutenção do changelog
- Documentação de decisões técnicas
- Fase 6 do roadmap (handoff final)

---

## STORYBOOK

### Organização das stories
```
stories/
├── atoms/
│   ├── button.stories.tsx
│   ├── kicker.stories.tsx
│   ├── heading.stories.tsx
│   └── metric-number.stories.tsx
├── molecules/
│   ├── stat-card.stories.tsx
│   ├── service-card.stories.tsx
│   ├── feature-card.stories.tsx
│   ├── timeline-step.stories.tsx
│   ├── faq-item.stories.tsx
│   └── testimonial-card.stories.tsx
├── organisms/
│   ├── header.stories.tsx
│   ├── hero-section.stories.tsx
│   ├── stats-bar.stories.tsx
│   ├── card-grid.stories.tsx
│   └── ...
└── templates/
    └── home-template.stories.tsx
```

### Padrão de story
Cada story DEVE incluir:
- `tags: ['autodocs']` para gerar documentação automática
- Todas as variações como stories separadas (Default, WithImage, Horizontal, Dark, etc.)
- `argTypes` com controls para props editáveis
- Descrição do componente via JSDoc no componente fonte

### Categorias no Storybook
Usar a convenção de título:
```
'Atoms/Button'
'Molecules/ServiceCard'
'Organisms/HeroSection'
'Templates/Home'
```

---

## README.md

### Estrutura obrigatória

```markdown
# Hospital São Rafael — Site

Breve descrição do projeto.

## Stack
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Storybook

## Como rodar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
npm install

### Desenvolvimento
npm run dev        # Site em localhost:3000
npm run storybook  # Storybook em localhost:6006

### Build
npm run build

## Estrutura do projeto
(árvore de pastas simplificada com explicações)

## Design System
O design system está documentado no Storybook.
Rodar `npm run storybook` para visualizar todos os componentes.

### Tokens
Definidos em `tailwind.config.ts` e `globals.css`.
Documentação completa em `docs/03-DESIGN-TOKENS.md`.

### Componentes
Organizados em Atomic Design:
- `atoms/` — elementos indivisíveis (botão, heading, kicker)
- `molecules/` — combinações (card, accordion item, stat)
- `organisms/` — seções completas (hero, footer, FAQ)
- `templates/` — composições de página

## Como adicionar um componente
1. Criar arquivo em `src/components/{nível}/nome.tsx`
2. Usar tokens do Tailwind (nunca valores hardcoded)
3. Criar story em `stories/{nível}/nome.stories.tsx`
4. Exportar como named export
5. Commitar com `feat: adiciona ComponentName`

## Como trocar conteúdo
Textos e dados ficam em `src/lib/constants.ts`.
Editar o arquivo e os componentes refletem automaticamente.

## Git workflow
- `main` — produção
- `develop` — integração
- `feature/nome` — desenvolvimento
- Usar Conventional Commits

## Documentação
- `docs/` — briefing, inventário, tokens, arquitetura, roadmap
- `skills/` — instruções dos agentes de IA
- Storybook — catálogo visual de componentes
```

---

## GUIA DE CONTEÚDO

Documento para o cliente ou redator que precisa trocar textos:

### Onde ficam os textos
Todos em `src/lib/constants.ts`, organizados por seção.

### Formato
```typescript
export const HERO_DATA = {
  kicker: "CIRURGIAS ELETIVAS PARTICULARES",
  headline: "Headline principal aqui",
  subheadline: "Subtítulo descritivo...",
  ctaLabel: "Falar com Atendimento",
  ctaHref: "#contato",
}
```

### Imagens
Substituir arquivos em `src/assets/images/` mantendo o mesmo nome e proporção. Formatos aceitos: WebP, PNG, JPG. Tamanho recomendado: máximo 200KB.

---

## CHANGELOG

Manter em formato Keep a Changelog:

```markdown
# Changelog

## [1.0.0] - YYYY-MM-DD
### Added
- Home page com 10 dobras
- Design system com X componentes documentados no Storybook
- Navegação one-page com scroll-spy
- SEO técnico com schema markup

### Components
- Atoms: Button (3 variantes), Heading, Kicker, MetricNumber, Icon
- Molecules: StatCard, ServiceCard, FeatureCard, TimelineStep, FAQItem, TestimonialCard
- Organisms: Header, Hero, StatsBar, ContentBlock, CardGrid, B2BSection, JourneyTimeline, FAQSection, Footer, ModalOverlay
```

---

## REGRAS

1. **Toda story** deve ter `tags: ['autodocs']`
2. **Todo componente** deve ser encontrável no Storybook
3. **README** deve permitir que um dev novo rode o projeto em < 5 minutos
4. **Changelog** atualizado a cada release
5. Textos de documentação em português (mesmo público do cliente)
6. **Nunca** documentar algo que já mudou — manter atualizado
