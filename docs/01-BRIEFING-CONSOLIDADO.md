# 01 — BRIEFING CONSOLIDADO | Hospital São Rafael

> **Versão:** 1.0  
> **Data:** 14/04/2026  
> **Status:** Aguardando validação do cliente  
> **Autor:** Agente Orquestrador (Claude)

---

## 1. VISÃO GERAL DO PROJETO

### 1.1 O que é
Site institucional e de conversão do Hospital São Rafael (HSR), posicionado como centro de alta complexidade em cirurgias eletivas particulares em Belo Horizonte. O site deve equilibrar autoridade médica com hospitalidade sofisticada, orientado a dois públicos distintos na mesma página.

### 1.2 Entrega atual
Uma única página — a **HOME** — construída como one-page com âncoras, contendo todas as dobras necessárias para converter pacientes e atrair médicos/cirurgiões.

### 1.3 Visão de médio prazo
Escalonamento para páginas de Especialidades, Corpo Clínico, Área do Médico (B2B), Serviços, Agendamento e Blog/Conteúdo — todas alimentadas pelo Design System criado nesta fase.

---

## 2. PÚBLICOS-ALVO

### 2.1 Paciente particular (B2C)
- Busca cirurgia eletiva com segurança, agilidade e conforto
- Sensível a percepção de custo — evitar linguagem que soe "caro demais"
- Quer entender a jornada completa (diagnóstico → alta)
- Valoriza transparência, métricas com contexto e humanização

### 2.2 Médico/Cirurgião (B2B)
- Busca infraestrutura de alto nível para operar
- Valoriza eficiência operacional (giro de sala, equipe, tecnologia)
- Quer saber sobre academia, simpósios, tecnologias disponíveis
- Precisa de seção robusta e expandida (atualmente rasa)

---

## 3. ANÁLISE DA HOME ATUAL (WordPress/Elementor)

### 3.1 Estrutura de dobras existente

| # | Dobra | Conteúdo atual | Status pós-reunião |
|---|-------|---------------|-------------------|
| 1 | **Hero** | Vídeo/imagem + headline "hospitalidade de elite" + CTA | ⚠️ REVISAR headline — "hospitalidade de elite" gera percepção negativa |
| 2 | **Números** | 12.000 cirurgias, 170M investidos, 2000 hiperbárica, 20+ salas | ⚠️ REVISAR — números sem contexto perdem impacto; 170M deve ser por extenso com fonte |
| 3 | **Manifesto/Rigor** | Bloco de texto + 2 CTAs (Especialidades / Centro Cirúrgico) | ✅ Manter conceito, revisar texto |
| 4 | **Serviços Premium** | 3 cards (Upgrade, Hiperbárica, Unidade Transição) + imagem destaque | ⚠️ REORGANIZAR — separar Serviços vs Produtos vs Diferenciais |
| 5 | **B2B Médicos** | Fundo charcoal + 3 cards (Giro sala, Equipe, Investimento) + depoimentos placeholder | ⚠️ EXPANDIR — seção rasa; adicionar academia, tecnologias, processos |
| 6 | **Jornada/Ecossistema** | Timeline 5 etapas (Consulta → Alta) com ícones | ⚠️ INTEGRAR — cada etapa deve linkar produtos/serviços aplicáveis |
| 7 | **FAQ** | 4 perguntas com texto placeholder (lorem ipsum) | ⚠️ COMPLETAR — respostas reais pendentes |
| 8 | **Footer** | Dados do hospital + links + métricas (65 leitos, 22 salas, UTI 24h) | ✅ Manter, revisar dados |

### 3.2 Problemas técnicos identificados
- Site em manutenção causou **desindexação no Google**
- Construído em WordPress/Elementor — pesado, com limitações de performance
- Depoimentos com texto placeholder (John Doe / Codetic)
- FAQ com lorem ipsum
- Imagens repetidas (mesma foto do hospital em hero e FAQ)
- Links "#" sem destino real

---

## 4. DECISÕES DA REUNIÃO — CRUZAMENTO COM HOME ATUAL

### 4.1 Novo fluxo de dobras aprovado

A reunião definiu uma nova ordem narrativa. Abaixo o mapeamento da estrutura atualizada:

| # | Dobra | Descrição | Público | Mudança vs. atual |
|---|-------|-----------|---------|-------------------|
| 1 | **Hero** | Vídeo slow motion + headline revisada (sem "hospitalidade de elite") + CTA principal | Ambos | Trocar headline |
| 2 | **Números de credibilidade** | Métricas com contexto e fontes (cirurgias, investimento, hiperbárica, salas) | Ambos | Adicionar contexto/fontes |
| 3 | **Diferenciais** | O que diferencia o HSR (rigor + conforto integrado, ecossistema IMD) | Paciente | Nova dobra — separar de Serviços |
| 4 | **Serviços** | Hospital: centro cirúrgico, internação, IMD, laboratório, hiperbárica, centro convenções, praça alimentação | Paciente | Reorganização |
| 5 | **Especialidades** | Vitrine de especialidades com modais — próxima ao conteúdo do paciente | Paciente | Reposicionar (estava implícita) |
| 6 | **Produtos** | Divididos por público: Paciente (upgrade, extensão diária, unid. transição, consulta pré-anestésica) / Médico (técnico exclusivo, instrumentador) | Ambos | Nova categorização |
| 7 | **Jornada do paciente** | Timeline com links/CTAs para serviços e produtos em cada etapa | Paciente | Integrar com produtos |
| 8 | **Área do Médico (B2B)** | Seção expandida: infraestrutura, academia, tecnologias, equipe, processos, depoimentos reais | Médico | Expandir significativamente |
| 9 | **FAQ** | Quebra de objeções com respostas reais | Ambos | Substituir placeholder |
| 10 | **Footer** | Dados, links, redes sociais, métricas resumidas | Ambos | Manter |

### 4.2 Decisões textuais críticas

- **"Hospitalidade de elite"** → substituir. Sugestão: alinhar ao conceito "Alta complexidade com acolhimento humano" da diretriz
- **"12.000 cirurgias"** → adicionar contexto (ex: "com taxa de infecção abaixo de X%")
- **"170 milhões"** → escrever por extenso "170 milhões de reais" + citar fonte
- **Tom geral** → "sofisticação inclusiva" — transmitir qualidade sem soar inacessível
- **Métricas clínicas** (taxa infecção etc.) → posicionar na dobra B2B ou nos diferenciais
- **"Instrumentador"** → validar se é diferencial por especialidade antes de destacar

### 4.3 Decisões estruturais

- **One-page com âncoras** — navegação via CTAs que rolam para dobras específicas
- **Sem dois sites** — paciente e médico na mesma página, com divisões claras
- **Evitar redundância** — "170M investidos" aparece duas vezes no site atual; consolidar
- **Próximos pacotes** (pós-home): Especialidades → Área do Médico → Serviços para tráfego pago

---

## 5. DNA VISUAL — SÍNTESE DA DIRETRIZ DE ESTILO

### 5.1 Paleta

| Token | Cor | Hex | Uso |
|-------|-----|-----|-----|
| `creme-hsr` | Creme | `#FDF1E7` | Fundo principal |
| `branco` | Branco puro | `#FFFFFF` | Cards, modais |
| `charcoal` | Charcoal profundo | `#2E2E2E` | B2B, autoridade, texto principal |
| `ouro-hsr` | Ouro | `#FFB800` | CTAs, ações (hover: `#E6A600`) |
| `azul-hsr` | Azul confiança | `#00A5D6` | Confiança, links, destaques |
| `cobre` | Cobre/luxo | `#C08A63` | Detalhes, acentos premium |

### 5.2 Tipografia
- **Fonte única:** Montserrat (Google Fonts)
- **H1:** 52px desktop / 32px mobile — peso 800
- **H2:** 40px desktop / 24px mobile — peso 700
- **Corpo:** 18px desktop / 16px mobile — peso 400, line-height 1.6
- **Kickers:** 14px — peso 800, uppercase, letter-spacing +3px

### 5.3 Layout
- **Grid de 8px** para todos os paddings/margins
- **Respiro vertical:** mín. 120px desktop / 80px mobile entre dobras
- **Bordas:** cantos retos (0) para botões, máx. 4px para cards
- **Sombras:** máx. 15% opacidade (`rgba(46,46,46,0.08)`)

### 5.4 Interações
- **Transições:** `0.3s ease` em todos os hovers
- **Glassmorphism:** `backdrop-filter: blur(15px)` em overlays
- **Cards hover:** translação Y (-5px)
- **Esteiras/sliders:** movimento infinito sem scrollbar visível

---

## 6. CONTEÚDOS PENDENTES (Ação do cliente)

| Item | Status | Responsável |
|------|--------|-------------|
| Headline alternativa para Hero | Pendente | Cliente + Redator |
| Contexto dos números (taxa infecção, fonte do 170M) | Pendente | Cliente |
| Respostas reais do FAQ | Pendente | Cliente |
| Depoimentos reais (pacientes e médicos) | Pendente | Cliente |
| Documento de procedimentos por especialidade (13/mar) | Reencaminhar | Cliente |
| Validação se "instrumentador" é diferencial | Pendente | Cliente |
| Conteúdo expandido da seção B2B (academia, tecnologias) | Pendente | Cliente |
| Vídeo slow motion para Hero | Pendente | Produção |
| Fotos reais do hospital (não repetir imagens) | Pendente | Produção |

---

## 7. CRITÉRIOS DE ACEITE DA HOME

A home será considerada entregue quando:

1. Todas as 10 dobras estiverem implementadas conforme fluxo aprovado (seção 4.1)
2. Design System documentado no Storybook com todos os componentes mapeados
3. Textos revisados conforme tom "sofisticação inclusiva"
4. Responsividade completa (mobile, tablet, desktop)
5. Performance: Lighthouse > 90 em Performance e Acessibilidade
6. SEO técnico: heading hierarchy correta, meta tags, schema markup de Hospital
7. Navegação one-page funcional com âncoras suaves
8. Zero texto placeholder (lorem ipsum / John Doe)

---

## 8. STACK TÉCNICA DEFINIDA

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Framework | Next.js 14+ (App Router) | SSR/SSG, SEO nativo, performance |
| Linguagem | TypeScript | Tipagem, manutenibilidade |
| Estilização | Tailwind CSS | Utility-first, tokens como classes |
| Componentes base | shadcn/ui | Acessível, customizável, sem lock-in |
| Documentação | Storybook | Catálogo visual de componentes |
| Versionamento | Git | Controle de versão, colaboração |
| Runtime | Node.js | Ecossistema JS/TS |
| Deploy (futuro) | Vercel ou similar | CI/CD nativo com Next.js |

---

*Documento gerado como insumo para o Agente Orquestrador. Próximo passo: 02-INVENTARIO-COMPONENTES.md*
