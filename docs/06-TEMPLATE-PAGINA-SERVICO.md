# 06 — Template Padrão: Página de Serviço (`/servicos/[slug]`)

> Guia operacional para criar e validar **toda nova página de serviço** do Hospital São Rafael. Use este checklist antes de mandar a página para aprovação da diretoria.

---

## 1. Posicionamento (regra inegociável)

O Hospital São Rafael atende **exclusivamente cirurgias eletivas particulares**. Em nenhum serviço, produto ou comunicação devem aparecer:

- Convênios, planos de saúde, ANS, "rol obrigatório" ou "cobertura"
- SUS, encaminhamento público
- Qualquer copy sugerindo verificação de plano ou autorização

A página deve, ao contrário, deixar claro o modelo particular como **escolha de excelência**, não como exceção. Linguagem positiva, sem pedido de desculpa.

---

## 1b. Personas

Toda página de serviço deve declarar a persona **primária** e, opcionalmente, a(s) **secundária(s)**. O template Sales B2C suporta blocos híbridos para endereçar persona secundária sem tirar protagonismo do paciente.

| Persona | Quem é | Como aparece no site |
|---|---|---|
| **Paciente** | Decisor formal do tratamento | Hero, Indicações, Jornada, FAQ, CTAs WhatsApp |
| **Médico assistente / parceiro** | Encaminha, opera, decide co-pago. Em Cirúrgico/IMD/Lab, pode ser decisor primário | `ServiceMedicoBlock` mid-page (não rodapé) |
| **Acompanhante / família** | Decisor sombra, voz pública (review). Critical em Internação/Alimentação/Transição | `ServiceAcompanhanteBlock` mid-page |

**Regra:** persona secundária nunca substitui CTA principal (WhatsApp paciente). Bloco híbrido pode ter CTA secundário próprio (mesmo WhatsApp ou canal comercial dedicado).

---

## 2. Estrutura de blocos (ordem fixa)

```
0.  ServiceSchema (JSON-LD)               — head
1.  Breadcrumb                             — overlay no hero (3º item: label CURTO)
2.  ServicePageHero                        — H1, subhead, pills, CTA único
3.  ServiceIntroBlock                      — long-form "O que é"  (opcional, recomendado p/ SEO)
4.  ServiceIndicationsBlock                — grid "Para quem é indicado"
4a. ServiceInlineCta (variant="creme")     — CTA repetido nº 1
4b. ServiceMedicoBlock                     — híbrido p/ médico assistente (opcional)
5.  ServiceGalleryBlock                    — infraestrutura, 3 imagens DIFERENTES + features
6.  ServiceEquipmentBlock                  — equipamentos / tecnologia
7.  ServiceHighlights                      — métricas/números
8.  ServiceProtocolsBlock                  — protocolos + certificações (com badges visuais)
9.  ServiceJourneyBlock                    — jornada do paciente em passos
9a. ServiceInlineCta (variant="charcoal")  — CTA repetido nº 2
9b. ServiceAcompanhanteBlock               — p/ acompanhante/família (opcional)
10. TestimonialsCarousel                   — depoimentos reais (autorizados)
11. FAQSection                             — 8-12 perguntas
11a.ServiceInlineCta (variant="creme")     — CTA repetido nº 3 (última captura)
12. ServiceRelatedBlock                    — cross-link a outros serviços (opcional)
13. Footer
14. ServiceStickyCta                       — barra fixa mobile (WhatsApp único)
```

Sidebar TOC (`ServiceSidebarNav`) flutua no desktop XL+ quando `navSections` é definido.

---

## 3. Hero — anatomia obrigatória

| Campo | Diretriz |
|---|---|
| `kicker` | Categoria do serviço, uppercase, 2-4 palavras (ex: "MEDICINA HIPERBÁRICA") |
| `headline` | **Benefício direto ao paciente**, não nome do serviço. Verbo de ação. Máx 10 palavras |
| `subheadline` | 1-2 frases curtas (~200 chars). Inclua: o que é + benefício específico + autoridade (titulação, protocolo) + cidade |
| `pills` | 4 chips. Cada um = um gatilho de venda. Permitidos: titulação médica, prazo, qualidade, "atendimento particular". **Proibidos:** "convênio", "plano", "cobertura" |
| CTA único | **Apenas WhatsApp** (`https://wa.me/message/NZIPXRZ4SKUHM1`). Label curto: "Falar no WhatsApp". **Não usar tel: como CTA** — número aparece só no footer/contato |
| `backgroundImage` | Foto real do ambiente / equipamento. Nunca stock genérico |

**Mobile:** hero `min-h-[600px]`, `pt-28 pb-10`, gap-4, items-end. Subhead `text-base` mobile / `text-lg` lg. Pills `grid grid-cols-2 lg:flex` (evita 4 stacks).

**Breadcrumb 3º nível:** SEMPRE label curto (kicker title-cased ou slug formatado). Nunca repetir o H1 no breadcrumb — quebra em mobile e cobre o título.

**Anti-padrão:** headline institucional ("Terapia X no Hospital Y"). Sempre traduzir em benefício.

---

## 4. Pills hero — o que pode e o que não pode

✅ Permitidos:
- Resultado clínico ("Pós-op cicatriza mais rápido")
- Titulação ("Médicos titulados SBMH/CFM")
- Protocolo regulatório ("Protocolo CFM e ANVISA")
- Diferencial logístico ("Integrada ao complexo", "Sem deslocamento")
- Modelo de negócio ("Atendimento particular")

❌ Proibidos:
- Qualquer menção a convênio, plano, ANS, SUS
- Promessas absolutas ("Cura garantida", "100% sem dor")
- Métricas sem fonte/comprovação

---

## 5. Gatilhos persuasão (Cialdini) — checklist

Toda página deve ativar pelo menos 4 dos 6 gatilhos:

- [ ] **Autoridade** — fotos + credenciais do médico responsável (nome, RQE, título da sociedade), badges visuais CFM/ANVISA/sociedade da área
- [ ] **Prova social** — testimonials reais autorizados (mínimo nome+iniciais+condição), métricas verificáveis
- [ ] **Reciprocidade** — "Tire dúvidas direto com o especialista" / "Avaliação inicial sem compromisso"
- [ ] **Compromisso** — mini-form curto (nome+wpp+caso) ou opt-in claro
- [ ] **Escassez/urgência** — prazo de retorno ("respondemos em até X horas"), agenda ("agendamento em 48h")
- [ ] **Afinidade** — tom acolhedor + linguagem do paciente (não do hospital)

---

## 6. Dores que **toda** página de serviço deve responder

Antes de aprovar a página, confirme que o leitor encontra resposta para:

1. **"Esse tratamento é para o meu caso?"** — bloco Indicações claro, com destaque ao caso mais comum
2. **"Quem vai me atender?"** — médico responsável visível (foto, nome, credencial)
3. **"É seguro?"** — bloco Protocolos + certificações visuais
4. **"Como funciona / quanto tempo dura?"** — bloco Jornada passo-a-passo
5. **"Quanto custa / como pago?"** — FAQ explicitando atendimento particular e que valores são apresentados na avaliação
6. **"Quando consigo agendar?"** — prazo declarado em copy ou FAQ
7. **"Como falo com vocês?"** — CTA WhatsApp/tel acessível em pelo menos 4 pontos do scroll

---

## 7. SEO — checklist técnico

- [ ] `meta.title`: 50-60 chars, **sem** sufixo "Hospital São Rafael" (root layout aplica)
- [ ] `meta.description`: 140-160 chars, com cidade + benefício + modelo particular
- [ ] `canonical` setado em `generateMetadata` (`alternates.canonical`)
- [ ] `openGraph.images`: URL absoluta, 1200x630
- [ ] `twitter.card`: `summary_large_image` com mesmas imagens absolutas
- [ ] `<h1>` único, dentro do hero
- [ ] Hierarquia `<h2>` → `<h3>` respeitada por bloco
- [ ] Schema JSON-LD: `MedicalWebPage` + `MedicalProcedure` ou `MedicalClinic` + `BreadcrumbList` + `FAQPage`
- [ ] Schema phone real (nunca placeholder XXXX nem 0000)
- [ ] Schema `image`, `geo`, `address`, `sameAs` preenchidos
- [ ] Imagens da galeria: 3+ **diferentes**, com `alt` descritivo e variando keyword
- [ ] URL semântica em kebab-case (`/servicos/<slug>`)
- [ ] Long-form intro: 300-500 palavras com keywords naturais
- [ ] FAQ: 8-12 perguntas refletindo dores reais (gera FAQ schema + capta long-tail)
- [ ] Linking interno: ao publicar nova página, atualizar `related` das páginas correlatas
- [ ] `/sitemap.xml` lista o slug

---

## 8. Conversão — checklist UX

- [ ] CTA **único e direto**: WhatsApp (`wa.me/message/...`). Sem botão tel:, sem scroll, sem formulário-só
- [ ] CTA presente no hero, depois de Indicações, depois de Jornada, e depois do FAQ (mínimo 4 pontos)
- [ ] `ServiceStickyCta` ativo (sticky bottom mobile, WhatsApp único)
- [ ] Selos/badges de certificação **visuais** no bloco Protocolos
- [ ] Prova social com testimonials reais autorizados (não placeholder)
- [ ] Médico responsável bloco visível antes do FAQ
- [ ] Frase "Atendimento exclusivamente particular" presente em pelo menos um CTA
- [ ] Mobile: hero ~89% vh máx, breadcrumb 3º nível curto, pills em 2 colunas, sticky bar não cobre conteúdo crítico

---

## 9. Bloqueadores antes de mandar para aprovação

Não envie a página para a diretoria sem:

1. Galeria com 3 imagens **diferentes** e reais
2. Médico responsável (foto + credencial)
3. Selos visuais das certificações reivindicadas no copy
4. Testimonials reais autorizados (mínimo nome+iniciais)
5. Telefone real no schema/footer (nada de XXXX/0000)
6. Title sem sufixo HSR duplicado
7. Schema phone real
8. CTA WhatsApp único e direto no hero (sem botão tel:)
9. Sticky CTA mobile ativo (WhatsApp único)
10. CTAs WhatsApp repetidos nos 3 pontos quentes do scroll

---

## 9b. Mapeamento de personas por página

Confirmado pós-revisão Renata (2026-04-28).

| Página | Persona primária | Secundária(s) | Bloco médico | Bloco acompanhante |
|---|---|---|:---:|:---:|
| Centro Cirúrgico | Paciente | Médico (forte) + Acompanhante | ✅ forte | ✅ |
| Unidade de Internação | Paciente | Acompanhante (forte) | — | ✅ forte |
| IMD | Paciente | Médico assistente | ✅ | — |
| Laboratório | Paciente | Médico assistente | ✅ | — |
| Terapia Hiperbárica | Paciente | Médico (light) + Acompanhante (light) | ✅ light | ✅ light |
| Centro de Convenções (B2B) | Corporativo | Participantes | — | — |
| Praça de Alimentação | Paciente | **Acompanhante (forte)** | — | ✅ forte (voucher) |
| Upgrade de Acomodação | Paciente | Acompanhante | — | ✅ |
| Extensão de Diária | Paciente | Acompanhante | — | — |
| Unidade de Transição | Paciente | Acompanhante | — | ✅ |
| Consulta Pré-Anestésica | Paciente | Médico assistente | ✅ | — |
| Técnico de Enfermagem Exclusivo | Paciente | Acompanhante | — | — |
| Instrumentador Especializado (B2B) | Médico parceiro | — | — | — |

Cards visuais não-clicáveis (sem página): Academia, Conforto Médico, Engenharia Clínica.

---

## 9c. Reforços E-E-A-T (medical YMYL)

Aplicar em **todo template Sales B2C**. Sem isso, ranqueamento medical fica B+; com, sobe pra A.

- [ ] **Bloco médico responsável** com schema `medicalAuthor` (Person) — foto, nome, RQE, título da sociedade, CRM
- [ ] **"Última revisão clínica em [data]"** no rodapé do conteúdo + `dateModified` + `dateReviewed` no schema
- [ ] **Bloco "Referências e fontes"** — 3-5 links externos (CFM, SBMH, ANVISA, PubMed) com `rel="noopener"`
- [ ] **Schema `MedicalProcedure`** quando o serviço é tratamento (Hiperbárica, Cirúrgico, IMD exames). `MedicalClinic` só em páginas institucionais

## 9d. Reforços de conversão

- [ ] **Risk reversal**: microcopy "Avaliação inicial sem compromisso" abaixo de cada CTA
- [ ] **SLA de resposta declarado**: "Equipe responde em até 1 hora útil no WhatsApp" abaixo do botão
- [ ] **Microcomprometimento alternativo (v2)**: form curto opcional (nome+wpp+caso) p/ quem ainda não quer abrir WhatsApp

---

## 10. Workflow de aprovação por página

```
1. Copiar template hiperbárica como referência
2. Preencher campos no formato ServiceDetailData (ver services-content.ts)
3. Adicionar slug ao map SERVICES_CONTENT
4. Rodar checklist deste documento
5. Local preview + Lighthouse > 90 (Perf/A11y/SEO)
6. Mandar para diretoria
7. Aprovado → adicionar CTA "Saiba mais" no card respectivo da home (constants.ts > SERVICOS_DATA, remover hideCta da renderização condicional)
8. Deploy
```

---

**Última atualização:** 2026-04-28 — pós-revisão Renata: personas (médico/acompanhante), blocos híbridos, reforços E-E-A-T + conversão, mapeamento por página.
