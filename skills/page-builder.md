# Skill: Page Builder

> **Papel:** Você é o montador de páginas do Hospital São Rafael.  
> **Responsabilidade:** Compor páginas usando os componentes da biblioteca, implementar layout, responsividade, animações e SEO.

---

## QUANDO SOU ACIONADO

- Montagem de páginas (composição de organismos)
- Implementação de scroll behavior (smooth scroll, scroll-spy)
- Animações de entrada e transições entre seções
- Configuração de SEO técnico (meta tags, schema, headings)
- Otimização de imagens e assets na página
- Testes de responsividade em breakpoints

---

## MINHA FONTE DE VERDADE

- `docs/01-BRIEFING-CONSOLIDADO.md` — Ordem das dobras e conteúdo (seção 4.1)
- `docs/02-INVENTARIO-COMPONENTES.md` — Template T01 (composição da home)
- `docs/04-ARQUITETURA-PROJETO.md` — Padrões de SEO e performance

---

## MONTAGEM DA HOME

### Ordem das dobras (OBRIGATÓRIA)
```tsx
// src/app/page.tsx
export default function Home() {
  return (
    <>
      <Header />                    {/* O01 — sticky nav */}
      <HeroSection />               {/* O02 — vídeo + headline + CTA */}
      <StatsBar />                  {/* O03 — números com contexto */}
      <ContentBlock />              {/* O04 — diferenciais */}
      <CardGrid variant="services" /> {/* O05 — serviços */}
      <CardGrid variant="specialties" /> {/* O05 — especialidades com modais */}
      <CardGrid variant="products" /> {/* O05 — produtos por público */}
      <JourneyTimeline />           {/* O07 — jornada com CTAs */}
      <B2BSection />                {/* O06 — área do médico (charcoal) */}
      <FAQSection />                {/* O08 — quebra de objeções */}
      <Footer />                    {/* O09 — dados + links + social */}
    </>
  )
}
```

### Dados centralizados
Todos os textos, métricas, itens de FAQ, cards etc. vêm de `lib/constants.ts`. A página importa os dados e passa como props para cada organismo.

```tsx
import { HERO_DATA, STATS_DATA, SERVICES_DATA, FAQ_DATA } from '@/lib/constants'

<StatsBar stats={STATS_DATA} />
<CardGrid items={SERVICES_DATA} />
<FAQSection items={FAQ_DATA} />
```

---

## SCROLL E NAVEGAÇÃO

### Smooth scroll com offset
O header sticky tem ~80px de altura. Todas as âncoras devem compensar esse offset.

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}
```

### Scroll-spy
Usar o hook `useScrollSpy` para detectar qual seção está visível e atualizar o nav link ativo.

### IDs das seções
Cada organismo recebe um `id` que serve como âncora:
```
#hero, #numeros, #diferenciais, #servicos, #especialidades,
#produtos, #jornada, #medicos, #faq, #contato
```

---

## ANIMAÇÕES DE ENTRADA

Usar IntersectionObserver para ativar animações quando seções entram no viewport.

### Padrão de animação
```
- Fade in + slide up (20px)
- Duration: 500ms
- Easing: ease-out
- Stagger: 100ms entre items filhos (cards, stats)
- Trigger: quando 20% do elemento está visível
```

### Animações específicas
- **Stats Bar:** Counter-up animation (0 → valor final em 2s)
- **Cards:** Fade-in com stagger por coluna
- **Timeline:** Reveal progressivo etapa por etapa
- **B2B Section:** Fade-in ao entrar na seção charcoal

---

## SEO TÉCNICO

### Meta tags obrigatórias
```tsx
export const metadata: Metadata = {
  title: 'Hospital São Rafael | Centro de Cirurgias Eletivas Particulares - BH',
  description: 'A maior estrutura de cirurgias eletivas particulares do Brasil. Tecnologia de ponta, agilidade e acolhimento do diagnóstico à recuperação completa.',
  openGraph: {
    title: '...',
    description: '...',
    images: ['/og-image.png'],
    type: 'website',
  },
}
```

### Schema markup
Incluir JSON-LD de `Hospital` e `MedicalOrganization` no layout.

### Heading hierarchy
- 1x `<h1>` no Hero (headline principal)
- 1x `<h2>` por seção/dobra
- `<h3>` para subtítulos dentro de seções
- Nunca pular níveis (h1 → h3 sem h2)

---

## RESPONSIVIDADE

### Breakpoints de teste
```
Mobile:         375px (iPhone SE)
Mobile large:   428px (iPhone 14 Pro Max)
Tablet:         768px (iPad)
Desktop:        1280px (padrão)
Desktop large:  1536px (monitores 2K+)
```

### Regras
- Grid de 3 colunas em desktop → 1 coluna em mobile
- Hero: texto sobre vídeo em desktop → vídeo acima do texto em mobile
- Stats: 4 em linha desktop → 2x2 em tablet → vertical em mobile
- Timeline: horizontal desktop → vertical mobile
- B2B cards: 3 colunas → stack vertical
- Respiro entre dobras: 120px desktop → 80px mobile

---

## REGRAS

1. **Nunca** hardcodar texto em componentes de página — usar `constants.ts`
2. **Sempre** testar em pelo menos 3 breakpoints antes de considerar pronto
3. **IDs de seção** são obrigatórios para navegação por âncora
4. **Imagens** sempre via `next/image` com width, height e alt
5. Conteúdo pendente do cliente deve ser marcado com `{/* [PENDENTE CLIENTE] */}`
6. **Performance** importa — lazy load em tudo abaixo da dobra
