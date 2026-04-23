// =============================================================================
// SEED — popula CTAs, cta_locations, FAQs no Supabase remoto
// =============================================================================
// Executa: node scripts/seed.mjs
// Lê envs de .env.local automaticamente.
// =============================================================================

import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, "..", ".env.local")
const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("#"))
    .map((l) => {
      const [k, ...rest] = l.split("=")
      return [k.trim(), rest.join("=").trim()]
    })
)

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// -----------------------------------------------------------------------------
// VERIFICA tabelas existem
// -----------------------------------------------------------------------------
const tables = ["profiles", "ctas", "cta_locations", "faqs", "click_events", "click_monthly", "audit_log"]
console.log("→ Verificando tabelas...")
for (const t of tables) {
  const { error } = await supabase.from(t).select("*", { count: "exact", head: true })
  if (error) {
    console.error(`✗ ${t}: ${error.message}`)
    process.exit(1)
  }
  console.log(`  ✓ ${t}`)
}

// -----------------------------------------------------------------------------
// SEED CTAs
// -----------------------------------------------------------------------------
const ctas = [
  {
    key: "atendimento_whatsapp",
    label: "Falar com Atendimento",
    url: "https://wa.me/message/NZIPXRZ4SKUHM1",
    description: "Canal principal paciente — WhatsApp agendamento/dúvidas",
  },
  {
    key: "consultoria_medica_whatsapp",
    label: "Falar com Consultoria Médica Institucional",
    url: "https://wa.me/message/SN2SK7HN3IUDH1",
    description: "Canal B2B médico — credenciamento corpo clínico aberto",
  },
  {
    key: "emergencia_telefone",
    label: "Emergência 24 horas",
    url: "tel:+553125170000",
    description: "Linha direta emergência",
  },
  {
    key: "contato_telefone",
    label: "(31) 2517-0900",
    url: "tel:+553125170900",
    description: "Telefone central relacionamento",
  },
  {
    key: "contato_email",
    label: "relacionamentocliente@hospitalsaorafael.com",
    url: "mailto:relacionamentocliente@hospitalsaorafael.com",
    description: "Email relacionamento geral",
  },
]

console.log("\n→ Seed CTAs...")
const { data: ctasInserted, error: ctaErr } = await supabase
  .from("ctas")
  .upsert(ctas, { onConflict: "key" })
  .select()
if (ctaErr) {
  console.error("✗ CTAs:", ctaErr.message)
  process.exit(1)
}
console.log(`  ✓ ${ctasInserted.length} CTAs`)

const ctaMap = Object.fromEntries(ctasInserted.map((c) => [c.key, c.id]))

// -----------------------------------------------------------------------------
// SEED cta_locations
// -----------------------------------------------------------------------------
const locations = [
  { cta_key: "atendimento_whatsapp", label: "Header Nav CTA", page: "/", component: "Header" },
  { cta_key: "atendimento_whatsapp", label: "Hero botão primário", page: "/", component: "HeroSection" },
  { cta_key: "atendimento_whatsapp", label: "Specialty Grid — Agendar consulta", page: "/", component: "SpecialtyGrid" },
  { cta_key: "atendimento_whatsapp", label: "Página Centro Cirúrgico", page: "/servicos/centro-cirurgico", component: "ServiceDetail" },
  { cta_key: "atendimento_whatsapp", label: "Página Internação", page: "/servicos/internacao", component: "ServiceDetail" },
  { cta_key: "consultoria_medica_whatsapp", label: "Seção B2B Médico", page: "/", component: "B2BSection" },
  { cta_key: "consultoria_medica_whatsapp", label: "FAQ resposta #2 (corpo clínico aberto)", page: "/", component: "FAQSection" },
  { cta_key: "emergencia_telefone", label: "Footer — Emergência 24h", page: "/", component: "Footer" },
  { cta_key: "contato_telefone", label: "Footer — Telefone central", page: "/", component: "Footer" },
  { cta_key: "contato_email", label: "Footer — Email relacionamento", page: "/", component: "Footer" },
]

const locationsWithIds = locations.map((l) => ({
  cta_id: ctaMap[l.cta_key],
  label: l.label,
  page: l.page,
  component: l.component,
}))

console.log("\n→ Seed cta_locations...")
const { error: locDelErr } = await supabase.from("cta_locations").delete().gt("id", "00000000-0000-0000-0000-000000000000")
if (locDelErr) console.warn("  ! limpar locations:", locDelErr.message)

const { data: locInserted, error: locErr } = await supabase
  .from("cta_locations")
  .insert(locationsWithIds)
  .select()
if (locErr) {
  console.error("✗ cta_locations:", locErr.message)
  process.exit(1)
}
console.log(`  ✓ ${locInserted.length} locations`)

// -----------------------------------------------------------------------------
// SEED FAQs (do constants.ts atual)
// -----------------------------------------------------------------------------
const faqs = [
  {
    position: 1,
    question: "Quais são as formas de atendimento no Hospital São Rafael?",
    answer:
      "No Hospital São Rafael o atendimento é particular e estruturado para oferecer praticidade, agilidade e uma experiência integrada, respeitando a necessidade de cada paciente. Você pode ser atendido de diferentes formas. Pelo IMD (Instituto Médico e Diagnóstico): especializado em consultas, exames e check-ups. Aqui, você encontra diversas especialidades e a possibilidade de realizar tudo no mesmo local, sem burocracia e com integração entre consulta e diagnóstico. Para procedimentos cirúrgicos: o hospital conta com uma estrutura completa para cirurgias eletivas, incluindo preparo pré-operatório, avaliação pré-anestésica e acompanhamento durante todo o processo. Para sessões de terapia hiperbárica: tratamento moderno e altamente eficaz em diversas condições clínicas. É indicada principalmente para recuperação pós-cirúrgica, cicatrização de feridas e tratamento de infecções. Independentemente da forma de entrada, o Hospital São Rafael oferece estrutura completa em um único local, integração entre consultas, exames e procedimentos, e equipe especializada com tecnologia de ponta. Tudo pensado para tornar sua jornada mais simples, segura e eficiente.",
  },
  {
    position: 2,
    question: "Meu cirurgião pode operar no São Rafael?",
    answer:
      "Sim! O Hospital São Rafael é um hospital cirúrgico eletivo, multi-especialidades, com corpo clínico aberto. Isso significa que médicos com registro ativo e regular no conselho profissional podem solicitar credenciamento para realizar procedimentos em nossas instalações. O processo de credenciamento é conduzido com rigor técnico e institucional, sendo avaliado pelo Diretor Técnico e pelo Diretor Clínico, que analisam o perfil do profissional, sua formação, experiência, especialidades e a aderência aos protocolos assistenciais do hospital.",
  },
  {
    position: 3,
    question: "O que é o upgrade de acomodação no Hospital São Rafael?",
    answer:
      "O upgrade de acomodação é a possibilidade de o paciente realizar a troca da acomodação inicialmente prevista, passando de um leito standard para uma suíte luxo. Essa opção permite que o paciente realize sua recuperação em um ambiente com mais conforto, privacidade e uma experiência diferenciada durante o período pós-cirúrgico. No Hospital São Rafael, todas as internações contam com o mesmo padrão de excelência assistencial, independentemente da acomodação escolhida. A principal diferença está na experiência de acomodação. Na acomodação standard o paciente conta com um ambiente funcional e seguro, com toda a estrutura necessária para uma recuperação adequada, incluindo acomodação confortável para o acompanhante. Já na suíte luxo, o paciente passa a ter: quarto com maior espaço e privacidade, banheiro privativo, sofá cama para acompanhante, comodidades como frigobar e cafeteira. O upgrade é ideal para quem valoriza mais conforto, privacidade e tranquilidade durante o período de recuperação.",
  },
  {
    position: 4,
    question: "Como o IMD proporciona mais segurança na minha cirurgia?",
    answer:
      "O IMD, Instituto Médico e Diagnóstico do Hospital São Rafael, concentra em um único local todas as etapas necessárias para o preparo e o acompanhamento do paciente. No IMD, você pode realizar: consultas com especialistas, exames pré e pós operatórios essenciais para a segurança do procedimento, exames de imagem, exames laboratoriais e check-ups completos. Nossa estrutura permite que todo o seu preparo cirúrgico aconteça de forma mais prática e integrada, sem a necessidade de deslocamentos entre diferentes locais. Além disso, todas as informações ficam registradas em um prontuário eletrônico único, o que facilita o acompanhamento pelo seu médico desde a solicitação dos exames até o pós-operatório.",
  },
]

console.log("\n→ Seed FAQs...")
await supabase.from("faqs").delete().gt("id", "00000000-0000-0000-0000-000000000000")
const { data: faqInserted, error: faqErr } = await supabase
  .from("faqs")
  .insert(faqs)
  .select()
if (faqErr) {
  console.error("✗ FAQs:", faqErr.message)
  process.exit(1)
}
console.log(`  ✓ ${faqInserted.length} FAQs`)

console.log("\n✓ Seed completo.")
