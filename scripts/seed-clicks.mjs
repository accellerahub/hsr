// =============================================================================
// SEED CLICKS — popula click_events mock nos últimos 6 meses
// =============================================================================
// Executa: node scripts/seed-clicks.mjs
// Lê envs de .env.local. Usa service_role.
// Idempotente: deleta eventos seed prévios (referrer = 'seed://mock') antes.
// =============================================================================

import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "node:fs"
import { createHash } from "node:crypto"
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
// CONFIG
// -----------------------------------------------------------------------------
const CTA_WEIGHTS = [
  { key: "atendimento_whatsapp", weight: 55 },
  { key: "consultoria_medica_whatsapp", weight: 20 },
  { key: "emergencia_telefone", weight: 10 },
  { key: "contato_telefone", weight: 10 },
  { key: "contato_email", weight: 5 },
]

// Meses relativos ao atual. -5 = 5 meses atrás. 0 = mês atual (parcial).
const MONTH_VOLUMES = [
  { offset: -5, events: 60 },
  { offset: -4, events: 95 },
  { offset: -3, events: 140 },
  { offset: -2, events: 185 },
  { offset: -1, events: 230 },
  { offset: 0, events: 150 },
]

const USER_AGENTS = [
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Safari/605.1.15",
  "Mozilla/5.0 (iPad; CPU OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Mobile/15E148 Safari/604.1",
]

const REFERRERS = [
  "https://www.google.com/",
  "https://www.instagram.com/",
  "https://www.bing.com/",
  "",
  "",
  "",
]

const SEED_MARKER = "seed://mock"
const HASH_SALT = "hsr-seed-salt-2026"

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------
function pickWeighted(items) {
  const total = items.reduce((a, b) => a + b.weight, 0)
  let r = Math.random() * total
  for (const it of items) {
    r -= it.weight
    if (r <= 0) return it.key
  }
  return items[0].key
}

function pickOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function monthBounds(offset) {
  const now = new Date()
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + offset, 1, 0, 0, 0))
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + offset + 1, 1, 0, 0, 0))
  // Para o mês atual (offset 0), limita ao dia de hoje
  if (offset === 0) return { start, end: now }
  return { start, end }
}

function randomDateBetween(start, end) {
  const t = start.getTime() + Math.random() * (end.getTime() - start.getTime())
  return new Date(t)
}

function hashIp(ip) {
  return createHash("sha256").update(`${ip}${HASH_SALT}`).digest("hex").slice(0, 32)
}

function randomIp() {
  return `${10 + Math.floor(Math.random() * 90)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`
}

// -----------------------------------------------------------------------------
// MAIN
// -----------------------------------------------------------------------------
console.log("→ Limpando eventos seed prévios...")
const { error: delErr, count: deletedCount } = await supabase
  .from("click_events")
  .delete({ count: "exact" })
  .eq("referrer", SEED_MARKER)

if (delErr) {
  console.error("✗ Erro ao limpar:", delErr.message)
  process.exit(1)
}
console.log(`  removidos: ${deletedCount ?? 0}`)

const rows = []
for (const { offset, events } of MONTH_VOLUMES) {
  const { start, end } = monthBounds(offset)
  for (let i = 0; i < events; i++) {
    rows.push({
      cta_key: pickWeighted(CTA_WEIGHTS),
      created_at: randomDateBetween(start, end).toISOString(),
      user_agent: pickOne(USER_AGENTS),
      referrer: SEED_MARKER,
      ip_hash: hashIp(randomIp()),
    })
  }
}

console.log(`→ Inserindo ${rows.length} eventos mock...`)

const CHUNK = 500
let inserted = 0
for (let i = 0; i < rows.length; i += CHUNK) {
  const slice = rows.slice(i, i + CHUNK)
  const { error } = await supabase.from("click_events").insert(slice)
  if (error) {
    console.error(`✗ Erro no chunk ${i}:`, error.message)
    process.exit(1)
  }
  inserted += slice.length
  process.stdout.write(`  ${inserted}/${rows.length}\r`)
}

console.log(`\n✓ Seed concluído. ${inserted} eventos inseridos.`)
console.log("  → abre /admin/cliques para validar.")
