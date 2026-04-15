# 05 — ROADMAP DE ENTREGAS | Hospital São Rafael

> **Versão:** 1.0  
> **Data:** 14/04/2026  
> **Escopo:** Entrega da HOME com Design System completo

---

## 1. FASES DE EXECUÇÃO

### FASE 1 — Fundação do Projeto
**Executor:** Design System Architect (skill)  
**Dependência:** Documentação aprovada (docs 01-04)

| # | Tarefa | Entregável | Critério de aceite |
|---|--------|-----------|-------------------|
| 1.1 | Inicializar projeto Next.js + TypeScript | Projeto rodando em `localhost:3000` | Build sem erros |
| 1.2 | Configurar Tailwind com tokens HSR | `tailwind.config.ts` completo | Todas as cores, fontes, espaçamentos do doc 03 presentes |
| 1.3 | Instalar e configurar shadcn/ui | Componentes base disponíveis | `button`, `accordion`, `dialog` instalados |
| 1.4 | Configurar Storybook | Storybook rodando em `localhost:6006` | Theme HSR aplicado, categorias criadas |
| 1.5 | Configurar ESLint + Prettier | Formatação automática | Sem warnings no lint |
| 1.6 | Criar `globals.css` com CSS variables | Tokens acessíveis via variáveis | Todas as variáveis do doc 03 |
| 1.7 | Configurar fonte Montserrat via next/font | Fonte carregando sem flash | LCP sem shift de fonte |
| 1.8 | Criar `lib/utils.ts` com cn() helper | Função disponível | Import funcionando em componentes |
| 1.9 | Criar `lib/constants.ts` com dados da home | Textos e métricas centralizados | Nenhum texto hardcoded nos componentes |
| 1.10 | Inicializar repositório Git | `.gitignore`, commit inicial, branch structure | `main` e `develop` criadas |

---

### FASE 2 — Átomos e Moléculas
**Executor:** Component Engineer (skill)  
**Dependência:** Fase 1 completa

| # | Tarefa | Componentes | Prioridade |
|---|--------|------------|-----------|
| 2.1 | Implementar botões | A01 (Primary), A02 (Ghost), A03 (Outline) | 🔴 Alta |
| 2.2 | Implementar tipografia | A04 (Kicker), A05 (H1), A06 (H2), A07 (Body) | 🔴 Alta |
| 2.3 | Implementar metric number | A08 com animação counter-up | 🔴 Alta |
| 2.4 | Implementar ícones | A09 — sistema de ícones SVG | 🟡 Média |
| 2.5 | Implementar stat card | M01 (A08 + A07) | 🔴 Alta |
| 2.6 | Implementar service card | M02 com variações (imagem, ícone, horizontal) | 🔴 Alta |
| 2.7 | Implementar feature card | M03 (B2B, fundo escuro) | 🔴 Alta |
| 2.8 | Implementar timeline step | M04 com conector visual | 🔴 Alta |
| 2.9 | Implementar FAQ item | M05 accordion | 🔴 Alta |
| 2.10 | Implementar testimonial card | M06 com variações | 🟡 Média |
| 2.11 | Implementar CTA banner | M07 | 🟡 Média |
| 2.12 | Implementar nav link | M08 com estado ativo | 🔴 Alta |
| 2.13 | Implementar contact block | M09 | 🟡 Média |
| 2.14 | Implementar social links | M10 | 🟢 Baixa |
| 2.15 | Implementar product card | M11 (novo — por público) | 🔴 Alta |
| 2.16 | Implementar category tabs | M15 (filtro por categoria) | 🟡 Média |

**Critério de aceite global:** Cada componente tem story no Storybook com todas as variações documentadas.

---

### FASE 3 — Organismos
**Executor:** Component Engineer (skill)  
**Dependência:** Fase 2 (átomos e moléculas necessários prontos)

| # | Tarefa | Organismo | Prioridade |
|---|--------|----------|-----------|
| 3.1 | Implementar Header | O01 — sticky, transparente→sólido, mobile drawer | 🔴 Alta |
| 3.2 | Implementar Hero | O02 — vídeo bg, overlay, headline, CTA | 🔴 Alta |
| 3.3 | Implementar Stats Bar | O03 — grid de stat cards com counter-up | 🔴 Alta |
| 3.4 | Implementar Content Block | O04 — layout assimétrico texto+imagem | 🔴 Alta |
| 3.5 | Implementar Card Grid | O05 — grid responsivo com variações | 🔴 Alta |
| 3.6 | Implementar B2B Section | O06 — fundo charcoal, expandido | 🔴 Alta |
| 3.7 | Implementar Journey Timeline | O07 — timeline horizontal/vertical + CTAs | 🔴 Alta |
| 3.8 | Implementar FAQ Section | O08 — accordion com animação | 🔴 Alta |
| 3.9 | Implementar Footer | O09 — colunas, contato, social, stats mini | 🔴 Alta |
| 3.10 | Implementar Modal Overlay | O10 — glassmorphism, focus trap | 🔴 Alta |
| 3.11 | Implementar Specialty Grid | O11 — grid + abertura de modais | 🟡 Média |

**Critério de aceite global:** Cada organismo responsivo (mobile/tablet/desktop), stories no Storybook, props documentadas.

---

### FASE 4 — Montagem da Home
**Executor:** Page Builder (skill)  
**Dependência:** Fase 3 completa

| # | Tarefa | Descrição |
|---|--------|-----------|
| 4.1 | Compor HomeTemplate | Sequência das 10 dobras usando organismos |
| 4.2 | Implementar scroll-spy | Navegação com indicador de seção ativa |
| 4.3 | Implementar smooth scroll | Âncoras com offset do header sticky |
| 4.4 | Implementar animações de entrada | Scroll-triggered reveals (fade-in, slide-up) |
| 4.5 | Configurar SEO | Meta tags, schema markup, heading hierarchy |
| 4.6 | Otimizar imagens | next/image, WebP, lazy loading, poster do vídeo |
| 4.7 | Testar responsividade | 5 breakpoints (sm, md, lg, xl, 2xl) |
| 4.8 | Criar dados de placeholder realistas | Textos aprovados + placeholders marcados como [PENDENTE CLIENTE] |

---

### FASE 5 — QA e Polimento
**Executor:** QA & Performance (skill)  
**Dependência:** Fase 4 completa

| # | Tarefa | Meta |
|---|--------|------|
| 5.1 | Audit Lighthouse | Performance > 90, Accessibility > 90, SEO > 90 |
| 5.2 | Teste cross-browser | Chrome, Safari, Firefox, Edge |
| 5.3 | Teste mobile real | iOS Safari, Android Chrome |
| 5.4 | Acessibilidade | Navegação por teclado, leitor de tela, contraste |
| 5.5 | Revisão de textos | Zero placeholder, consistência de tom |
| 5.6 | Performance de assets | Imagens < 200KB, LCP < 2.5s, CLS < 0.1 |

---

### FASE 6 — Documentação e Handoff
**Executor:** Documentation Lead (skill)  
**Dependência:** Fase 5 aprovada

| # | Tarefa | Entregável |
|---|--------|-----------|
| 6.1 | README completo | Como rodar, estrutura, como adicionar componentes |
| 6.2 | Storybook final | Todos os componentes documentados com props table |
| 6.3 | Guia de contribuição | Padrões de código, naming, git workflow |
| 6.4 | Guia de conteúdo | Como trocar textos, imagens, adicionar seções |
| 6.5 | Changelog | Registro de tudo que foi implementado |

---

## 2. ORDEM DE EXECUÇÃO NO CLAUDE CODE

Ao abrir o projeto no Claude Code, seguir esta sequência:

```
1. Ler CLAUDE.md (orquestrador carrega contexto)
2. Executar Fase 1 (fundação) → commit "feat: project foundation"
3. Executar Fase 2 (átomos → moléculas) → commits por componente
4. Executar Fase 3 (organismos) → commits por organismo
5. Executar Fase 4 (montagem) → commit "feat: home page assembly"
6. Executar Fase 5 (QA) → commit "fix: qa adjustments"
7. Executar Fase 6 (docs) → commit "docs: final documentation"
```

---

## 3. DEPENDÊNCIAS EXTERNAS (Ação do cliente)

Itens que bloqueiam a entrega final mas NÃO bloqueiam o desenvolvimento:

| Item | Impacto | Workaround |
|------|---------|-----------|
| Headline do Hero | Texto final na dobra 1 | Usar placeholder marcado |
| Vídeo slow motion | Asset do Hero | Usar imagem estática + overlay |
| Fotos reais do hospital | Imagens em cards e seções | Usar placeholders dimensionados |
| Respostas do FAQ | Conteúdo da dobra 9 | Usar respostas provisórias marcadas |
| Depoimentos reais | Prova social B2B | Usar estrutura sem conteúdo |
| Conteúdo expandido B2B | Seção do médico | Implementar estrutura, marcar conteúdo pendente |
| Domínio final | Deploy em produção | Deploy em preview URL (Vercel) |

---

*Documento gerado como guia de execução para todos os agentes. Próximo: CLAUDE.md (Agente Orquestrador) e Skills.*
