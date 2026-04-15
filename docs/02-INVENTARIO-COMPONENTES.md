# 02 — INVENTÁRIO DE COMPONENTES | Hospital São Rafael

> **Versão:** 1.0  
> **Data:** 14/04/2026  
> **Base:** Home atual + novo fluxo aprovado em reunião  
> **Classificação:** Atomic Design (Átomo → Molécula → Organismo → Template)

---

## 1. ÁTOMOS (Elementos indivisíveis)

### A01 — Button Primary
- **Descrição:** Botão de ação principal (CTA)
- **Visual:** Fundo `#FFB800`, texto `#2E2E2E`, Montserrat 700, border-radius 0
- **Estados:** Default, Hover (`#E6A600`), Focus, Disabled
- **Variações:** Tamanho grande (hero), tamanho padrão (seções)
- **Reuso futuro:** Todas as páginas — elemento universal de conversão

### A02 — Button Secondary (Ghost/Text)
- **Descrição:** Botão "+ Saiba Mais" — texto ouro, sem fundo, aciona modais
- **Visual:** Texto `#FFB800`, sem background, Montserrat 600
- **Estados:** Default, Hover (underline ou opacidade), Focus
- **Reuso futuro:** Cards, listagens, seções com detalhamento progressivo

### A03 — Button Outline
- **Descrição:** Botão com borda, usado em CTAs secundários
- **Visual:** Borda `#FFB800`, texto ouro, fundo transparente
- **Estados:** Default, Hover (fundo ouro + texto charcoal)
- **Reuso futuro:** Filtros, navegação secundária, área do médico

### A04 — Kicker (Overline Tag)
- **Descrição:** Label contextual acima de títulos de seção
- **Visual:** 14px, Montserrat 800, uppercase, letter-spacing +3px
- **Cor:** Variável — ouro sobre fundo claro, branco sobre fundo escuro
- **Exemplos atuais:** "Serviços Premium", "PARA MÉDICOS E CIRURGIÕES"
- **Reuso futuro:** Todas as seções de todas as páginas

### A05 — Heading H1
- **Descrição:** Título principal (usado apenas no Hero)
- **Visual:** 52px/32px, Montserrat 800
- **Reuso futuro:** Hero de cada página

### A06 — Heading H2
- **Descrição:** Título de seção
- **Visual:** 40px/24px, Montserrat 700
- **Reuso futuro:** Abertura de toda seção/dobra

### A07 — Body Text
- **Descrição:** Parágrafo padrão
- **Visual:** 18px/16px, Montserrat 400, line-height 1.6
- **Cor:** `#2E2E2E` em fundo claro, `#FFFFFF` em fundo escuro
- **Reuso futuro:** Universal

### A08 — Metric Number
- **Descrição:** Número grande de destaque (estatísticas)
- **Visual:** Tamanho grande (~48-60px), Montserrat 800, cor ouro ou charcoal
- **Exemplos:** "+ 12.000", "+ 170M", "+ 2000", "+20"
- **Reuso futuro:** Qualquer seção de credibilidade ou resultados

### A09 — Icon (SVG)
- **Descrição:** Ícones usados na timeline da jornada e cards de serviço
- **Estilo:** Linha fina, monocromático, alinhado ao DNA minimalista
- **Reuso futuro:** Navegação, listagens, features, especialidades

### A10 — Logo HSR
- **Descrição:** Logotipo do hospital em variações (claro/escuro, com/sem tagline)
- **Reuso futuro:** Header, footer, materiais

### A11 — Divider
- **Descrição:** Linha ou espaçamento visual entre seções
- **Visual:** Linha fina `#C08A63` ou respiro de 120px/80px
- **Reuso futuro:** Separação universal entre dobras

---

## 2. MOLÉCULAS (Combinações de átomos)

### M01 — Stat Card (Métrica + Contexto)
- **Composição:** A08 (Metric Number) + A07 (Body Text de contexto)
- **Exemplo:** "+ 12.000" + "Cirurgias realizadas com sucesso"
- **Comportamento:** Animação de contagem no scroll (counter up)
- **Variações:** Com/sem fonte, com/sem ícone
- **Reuso futuro:** Página institucional, relatórios, área do médico

### M02 — Service Card
- **Composição:** Imagem + A06 (H2/H3 título) + A07 (descrição) + A02 (Saiba Mais)
- **Visual:** Background branco, sombra sutil, hover -5px Y, glassmorphism no overlay
- **Variações:** Com imagem (vertical), sem imagem (ícone), horizontal
- **Reuso futuro:** Especialidades, serviços, produtos — componente mais reutilizado

### M03 — Feature Card (B2B)
- **Composição:** Métrica/ícone + título + descrição curta
- **Visual:** Sem imagem, fundo charcoal, texto branco, acento ouro
- **Exemplos:** "40min | Giro de Sala", "Equipe Completa | Instrumentadores"
- **Reuso futuro:** Área do médico expandida, diferenciais técnicos

### M04 — Timeline Step
- **Composição:** Número/ícone de etapa + A06 (título) + A07 (descrição) + Conector visual
- **Visual:** Linha conectora entre etapas, ícones por fase, destaque na etapa ativa
- **Comportamento:** Scroll-triggered animation, possível interatividade (click para expandir)
- **Reuso futuro:** Jornada do paciente, processo de credenciamento médico, fluxo de atendimento

### M05 — FAQ Accordion Item
- **Composição:** Pergunta (clicável) + Resposta (colapsável) + Ícone toggle
- **Visual:** Borda sutil, transição suave na abertura
- **Comportamento:** Abrir/fechar com animação, apenas um aberto por vez (ou múltiplos)
- **Reuso futuro:** FAQ de todas as páginas, área do médico, especialidades

### M06 — Testimonial Card
- **Composição:** Citação + Nome + Cargo/Especialidade + Foto (opcional)
- **Visual:** Aspas decorativas, fundo sutil, estilo editorial
- **Variações:** Paciente (mais emocional), Médico (mais técnico)
- **Reuso futuro:** Qualquer página com prova social

### M07 — CTA Banner (inline)
- **Composição:** Texto persuasivo + A01 (Button Primary) + Background com overlay
- **Visual:** Full-width, pode ter imagem de fundo com glassmorphism
- **Reuso futuro:** Separador entre seções, conversão intermediária

### M08 — Nav Link
- **Composição:** Texto + âncora + indicador de estado ativo
- **Visual:** Montserrat 600, transição suave, indicador de seção visível
- **Reuso futuro:** Header de todas as páginas

### M09 — Contact Info Block
- **Composição:** Ícone + Label + Valor (endereço, telefone, email)
- **Reuso futuro:** Footer, página de contato, cards de unidade

### M10 — Social Links Group
- **Composição:** Ícones de redes sociais (Instagram, LinkedIn, YouTube)
- **Reuso futuro:** Footer, bio de médicos

---

## 3. ORGANISMOS (Seções completas)

### O01 — Header/Navbar
- **Composição:** A10 (Logo) + M08[] (Nav Links) + A01 (CTA) + Seletor idioma
- **Comportamento:** Sticky on scroll, transparente no hero → sólido ao rolar, hamburger mobile
- **Variações:** Transparente (hero), sólida (scroll), mobile (drawer)
- **Reuso futuro:** Global — todas as páginas

### O02 — Hero Section
- **Composição:** Vídeo/imagem fullscreen + A04 (Kicker) + A05 (H1) + A07 (subtítulo) + A01 (CTA)
- **Visual:** Overlay escuro sobre vídeo, texto centralizado ou alinhado à esquerda
- **Comportamento:** Vídeo autoplay muted loop, parallax sutil
- **Reuso futuro:** Hero de cada página (com variações de conteúdo)

### O03 — Stats Bar (Números de credibilidade)
- **Composição:** M01[] (array de Stat Cards) em layout horizontal
- **Visual:** Fundo creme ou transparente, espaçamento generoso
- **Comportamento:** Counter-up animation ao entrar no viewport
- **Reuso futuro:** Institucional, relatório anual, área do médico

### O04 — Content Block (Manifesto/Diferenciais)
- **Composição:** A04 (Kicker) + A06 (H2) + A07 (texto longo) + A01/A02 (CTAs)
- **Visual:** Layout assimétrico (texto + imagem lado a lado ou texto full-width)
- **Variações:** Com imagem lateral, com background accent, apenas texto
- **Reuso futuro:** Qualquer seção institucional ou descritiva

### O05 — Card Grid (Serviços/Produtos/Especialidades)
- **Composição:** A04 (Kicker) + A06 (H2) + M02[] (array de Service Cards)
- **Visual:** Grid 3 colunas desktop, 1 coluna mobile, espaçamento 8px grid
- **Variações:** 2 colunas, com card destaque maior, com filtros por categoria
- **Reuso futuro:** O organismo mais versátil — serve para serviços, produtos, especialidades, equipe

### O06 — B2B Section (Área do Médico)
- **Composição:** Background charcoal + A04 (Kicker) + A06 (H2) + A07 + M03[] (Feature Cards) + M06[] (Testimonials) + A01 (CTA)
- **Visual:** Fundo `#2E2E2E`, texto branco, acentos ouro
- **Comportamento:** Separação visual forte do restante (sinaliza mudança de público)
- **Reuso futuro:** Base para página completa da Área do Médico

### O07 — Journey Timeline
- **Composição:** A04 (Kicker) + A06 (H2) + M04[] (Timeline Steps) + links para serviços/produtos
- **Visual:** Linha horizontal desktop, vertical mobile, com ícones por etapa
- **Comportamento:** Scroll-triggered reveal progressivo, CTAs em cada etapa
- **Reuso futuro:** Jornada do paciente, processo cirúrgico, credenciamento

### O08 — FAQ Section
- **Composição:** A04 (Kicker) + A06 (H2) + M05[] (Accordion Items)
- **Visual:** Fundo neutro, accordion limpo, transições suaves
- **Reuso futuro:** FAQ de cada contexto (paciente, médico, especialidade)

### O09 — Footer
- **Composição:** A10 (Logo) + M09[] (Contact Blocks) + M08[] (Nav Links) + M10 (Social) + M01[] (mini stats)
- **Visual:** Fundo escuro ou creme escuro, layout em colunas
- **Reuso futuro:** Global — todas as páginas

### O10 — Modal Overlay
- **Composição:** Fundo 70% opacidade + conteúdo dinâmico (detalhes de especialidade, serviço etc.)
- **Visual:** Glassmorphism (`backdrop-filter: blur(15px)`), animação de entrada
- **Comportamento:** Acionado por A02 ("Saiba Mais"), fecha com X ou click fora
- **Reuso futuro:** Especialidades, produtos, equipe médica

---

## 4. TEMPLATES (Composição de página)

### T01 — Home Page Template
- **Composição ordenada (pós-reunião):**
  1. O01 (Header)
  2. O02 (Hero)
  3. O03 (Stats Bar)
  4. O04 (Diferenciais)
  5. O05 (Serviços)
  6. O05 (Especialidades — variação com modais)
  7. O05 (Produtos — variação com categorização por público)
  8. O07 (Jornada com CTAs integrados)
  9. O06 (B2B Médicos — expandido)
  10. O08 (FAQ)
  11. O09 (Footer)

---

## 5. PROJEÇÃO DE REUSO POR PÁGINA FUTURA

| Componente | Home | Especialidades | Área Médico | Serviços | Institucional |
|-----------|------|---------------|-------------|----------|--------------|
| Header (O01) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Hero (O02) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Stats Bar (O03) | ✅ | — | ✅ | — | ✅ |
| Content Block (O04) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Card Grid (O05) | ✅ | ✅ | ✅ | ✅ | — |
| B2B Section (O06) | ✅ | — | ✅ | — | — |
| Journey (O07) | ✅ | — | — | ✅ | — |
| FAQ (O08) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Footer (O09) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Modal (O10) | ✅ | ✅ | — | ✅ | — |

---

## 6. COMPONENTES NOVOS NECESSÁRIOS (não existem no site atual)

| ID | Componente | Motivo | Prioridade |
|----|-----------|--------|-----------|
| M11 | **Product Card (por público)** | Reunião definiu separação Paciente/Médico em produtos | Alta |
| M12 | **Specialty Modal Content** | Modais de especialidade precisam de layout interno padronizado | Alta |
| M13 | **Anchor Nav (Scroll Spy)** | Navegação one-page com indicador de seção ativa | Alta |
| M14 | **Video Player (Hero)** | Player de vídeo background com controles opcionais | Média |
| M15 | **Category Filter Tabs** | Filtros para "Serviços" e "Produtos" por categoria/público | Média |
| O11 | **Specialty Grid com Modais** | Variação do O05 com abertura de O10 por card | Alta |

---

*Documento gerado como insumo para o Design System Architect e Component Engineer. Próximo passo: 03-DESIGN-TOKENS.md*
