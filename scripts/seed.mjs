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
      'Sim. O Hospital São Rafael é um hospital de corpo clínico aberto, o que significa que qualquer médico com registro ativo e em situação regular no conselho pode solicitar credenciamento para realizar procedimentos em nossas instalações, sem a necessidade de vínculo empregatício com o hospital. O processo é conduzido pela nossa Consultoria Médica Institucional, que avalia o perfil do profissional e alinha as especialidades e protocolos aplicáveis. Uma vez credenciado, o cirurgião conta com 22 salas cirúrgicas equipadas com tecnologia de última geração, instrumentadores especializados, suporte técnico dedicado e giro de sala de 40 minutos, garantindo previsibilidade e eficiência para a sua agenda. Para iniciar o processo, entre em contato pelo botão "Falar com Consultoria Médica Institucional".',
  },
  {
    position: 3,
    question: "Qual a real diferença do Upgrade de Acomodação?",
    answer:
      "O Upgrade de Acomodação transforma o período pós-cirúrgico em uma experiência de recuperação diferenciada. Além de todo o suporte clínico, você conta com quarto de maior privacidade e conforto, atendimento exclusivo e personalizado e um ambiente pensado para que você descanse com tranquilidade. É a escolha ideal para quem deseja uma internação com padrão elevado de hotelaria hospitalar, unindo excelência médica e bem-estar em cada detalhe.",
  },
  {
    position: 4,
    question: "Como o IMD agiliza minha cirurgia?",
    answer:
      "O IMD funciona de forma totalmente integrada ao bloco cirúrgico do Hospital São Rafael. Consultas, exames de imagem e laudos realizados no Instituto alimentam automaticamente o prontuário digital do centro cirúrgico — sem reencaminhamentos, repetição de informações ou perda de dados. Quando chega o dia da cirurgia, seu médico já tem acesso a tudo que precisa, com rastreabilidade total. Esse modelo elimina a espera e a burocracia que normalmente existe entre diagnóstico e procedimento, garantindo mais agilidade, segurança e previsibilidade para você e para o seu cirurgião.",
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
