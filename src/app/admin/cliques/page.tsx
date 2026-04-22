import { createClient } from "@/lib/supabase/server"
import { ClicksChart } from "./clicks-chart"

function monthStart(offset: number): Date {
  const now = new Date()
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + offset, 1))
}

function monthLabel(d: Date): string {
  return d
    .toLocaleDateString("pt-BR", { month: "short", year: "2-digit", timeZone: "UTC" })
    .replace(".", "")
}

interface MonthBucket {
  key: string
  label: string
  start: Date
  end: Date
  total: number
  byKey: Map<string, number>
}

export default async function AdminCliquesPage() {
  const supabase = await createClient()

  const [{ data: ctas }, { data: events }, { data: monthly }] = await Promise.all([
    supabase.from("ctas").select("key,label"),
    supabase
      .from("click_events")
      .select("cta_key,created_at")
      .gte("created_at", monthStart(-5).toISOString()),
    supabase
      .from("click_monthly")
      .select("cta_key,month,count")
      .gte("month", monthStart(-5).toISOString().slice(0, 10)),
  ])

  const labelByKey = new Map<string, string>()
  for (const c of ctas ?? []) labelByKey.set(c.key, c.label)

  const buckets: MonthBucket[] = []
  for (let i = -5; i <= 0; i++) {
    const start = monthStart(i)
    const end = monthStart(i + 1)
    buckets.push({
      key: start.toISOString().slice(0, 7),
      label: monthLabel(start),
      start,
      end,
      total: 0,
      byKey: new Map(),
    })
  }

  for (const e of events ?? []) {
    const d = new Date(e.created_at)
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`
    const b = buckets.find((x) => x.key === key)
    if (!b) continue
    b.total += 1
    b.byKey.set(e.cta_key, (b.byKey.get(e.cta_key) ?? 0) + 1)
  }

  for (const m of monthly ?? []) {
    const key = String(m.month).slice(0, 7)
    const b = buckets.find((x) => x.key === key)
    if (!b) continue
    const prev = b.byKey.get(m.cta_key) ?? 0
    if (m.count > prev) {
      b.total += m.count - prev
      b.byKey.set(m.cta_key, m.count)
    }
  }

  const current = buckets[buckets.length - 1]
  const previous = buckets[buckets.length - 2]
  const delta =
    previous && previous.total > 0
      ? ((current.total - previous.total) / previous.total) * 100
      : null

  const topCurrent = Array.from(current.byKey.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-extrabold text-charcoal">Cliques</h1>
        <p className="text-sm text-charcoal/60 mt-1">
          Medição de engajamento por CTA. Histórico de 6 meses.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-neutral-100 p-5">
          <div className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/50">
            Mês atual
          </div>
          <div className="text-3xl font-extrabold text-charcoal mt-1">
            {current.total}
          </div>
          {delta !== null && (
            <div
              className={`text-xs font-semibold mt-1 ${
                delta >= 0 ? "text-success" : "text-error"
              }`}
            >
              {delta >= 0 ? "+" : ""}
              {delta.toFixed(1)}% vs mês anterior
            </div>
          )}
        </div>
        <div className="bg-white rounded-2xl border border-neutral-100 p-5">
          <div className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/50">
            Mês anterior
          </div>
          <div className="text-3xl font-extrabold text-charcoal mt-1">
            {previous?.total ?? 0}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-neutral-100 p-5">
          <div className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/50">
            Total 6 meses
          </div>
          <div className="text-3xl font-extrabold text-charcoal mt-1">
            {buckets.reduce((a, b) => a + b.total, 0)}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-100 p-5">
        <h2 className="text-sm font-extrabold uppercase tracking-kicker text-charcoal mb-4">
          Histórico
        </h2>
        <ClicksChart
          data={buckets.map((b) => ({ label: b.label, value: b.total }))}
        />
      </div>

      <div className="bg-white rounded-2xl border border-neutral-100 p-5">
        <h2 className="text-sm font-extrabold uppercase tracking-kicker text-charcoal mb-4">
          Top CTAs no mês atual
        </h2>
        {topCurrent.length === 0 ? (
          <p className="text-sm text-charcoal/50">Sem cliques registrados ainda.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {topCurrent.map(([key, count]) => (
              <li
                key={key}
                className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-charcoal">
                    {labelByKey.get(key) ?? key}
                  </span>
                  <span className="text-[10px] text-charcoal/40 font-mono">{key}</span>
                </div>
                <span className="text-lg font-extrabold text-marrom">{count}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
