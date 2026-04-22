import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Link2, HelpCircle, BarChart3, Users, MousePointerClick, Clock } from "lucide-react"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [{ count: ctaCount }, { count: faqCount }, clicksNow, clicksPrev, topCtas] =
    await Promise.all([
      supabase.from("ctas").select("*", { count: "exact", head: true }),
      supabase.from("faqs").select("*", { count: "exact", head: true }).eq("is_active", true),
      supabase
        .from("click_events")
        .select("*", { count: "exact", head: true })
        .gte("created_at", firstDayOfMonth(0).toISOString()),
      supabase
        .from("click_events")
        .select("*", { count: "exact", head: true })
        .gte("created_at", firstDayOfMonth(-1).toISOString())
        .lt("created_at", firstDayOfMonth(0).toISOString()),
      supabase
        .from("click_events")
        .select("cta_key")
        .gte("created_at", firstDayOfMonth(0).toISOString()),
    ])

  const clicksThisMonth = clicksNow.count ?? 0
  const clicksLastMonth = clicksPrev.count ?? 0
  const deltaPct = clicksLastMonth > 0
    ? Math.round(((clicksThisMonth - clicksLastMonth) / clicksLastMonth) * 100)
    : null

  const topMap = new Map<string, number>()
  for (const row of topCtas.data ?? []) {
    topMap.set(row.cta_key, (topMap.get(row.cta_key) ?? 0) + 1)
  }
  const top5 = [...topMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const { data: ctaLabels } = await supabase.from("ctas").select("key, label")
  const labelMap = Object.fromEntries((ctaLabels ?? []).map((c) => [c.key, c.label]))

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-extrabold text-charcoal">Dashboard</h1>
        <p className="text-sm text-charcoal/60 mt-1">
          Visão geral do site Hospital São Rafael.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Cliques no mês"
          value={clicksThisMonth.toLocaleString("pt-BR")}
          hint={
            deltaPct === null
              ? "sem dado anterior"
              : deltaPct >= 0
                ? `+${deltaPct}% vs mês passado`
                : `${deltaPct}% vs mês passado`
          }
          icon={MousePointerClick}
          accent={deltaPct !== null && deltaPct >= 0}
        />
        <KpiCard
          label="CTAs ativos"
          value={String(ctaCount ?? 0)}
          hint="links editáveis"
          icon={Link2}
        />
        <KpiCard
          label="FAQs publicadas"
          value={String(faqCount ?? 0)}
          hint="perguntas ativas"
          icon={HelpCircle}
        />
        <KpiCard
          label="Mês anterior"
          value={clicksLastMonth.toLocaleString("pt-BR")}
          hint="cliques comparado"
          icon={Clock}
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-neutral-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-extrabold uppercase tracking-kicker text-charcoal/60">
              Top 5 CTAs do mês
            </h2>
            <Link
              href="/admin/cliques"
              className="text-xs font-semibold text-marrom hover:underline"
            >
              Ver tudo →
            </Link>
          </div>
          {top5.length === 0 ? (
            <p className="text-sm text-charcoal/50 py-8 text-center">
              Sem cliques registrados neste mês.
            </p>
          ) : (
            <ul className="flex flex-col divide-y divide-neutral-100">
              {top5.map(([key, count]) => (
                <li key={key} className="py-3 flex items-center justify-between gap-4">
                  <span className="text-sm text-charcoal truncate">
                    {labelMap[key] ?? key}
                  </span>
                  <span className="text-sm font-bold text-marrom shrink-0">
                    {count.toLocaleString("pt-BR")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-neutral-100 p-6">
          <h2 className="text-sm font-extrabold uppercase tracking-kicker text-charcoal/60 mb-4">
            Atalhos
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Shortcut href="/admin/ctas" icon={Link2} label="Editar CTAs" hint="Labels e URLs" />
            <Shortcut href="/admin/faq" icon={HelpCircle} label="Gerenciar FAQ" hint="Novas perguntas" />
            <Shortcut href="/admin/cliques" icon={BarChart3} label="Cliques" hint="6 meses histórico" />
            <Shortcut href="/" icon={Users} label="Ver site" hint="Aba nova" external />
          </div>
        </div>
      </section>
    </div>
  )
}

function firstDayOfMonth(offsetMonths: number) {
  const d = new Date()
  d.setUTCDate(1)
  d.setUTCHours(0, 0, 0, 0)
  d.setUTCMonth(d.getUTCMonth() + offsetMonths)
  return d
}

function KpiCard({
  label,
  value,
  hint,
  icon: Icon,
  accent,
}: {
  label: string
  value: string
  hint: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  accent?: boolean
}) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/50">
          {label}
        </span>
        <span className="w-8 h-8 rounded-lg bg-marrom/10 text-marrom flex items-center justify-center">
          <Icon size={14} />
        </span>
      </div>
      <div className="text-3xl font-extrabold text-charcoal">{value}</div>
      <p className={`text-xs ${accent ? "text-success font-semibold" : "text-charcoal/50"}`}>
        {hint}
      </p>
    </div>
  )
}

function Shortcut({
  href,
  icon: Icon,
  label,
  hint,
  external,
}: {
  href: string
  icon: React.ComponentType<{ size?: number }>
  label: string
  hint: string
  external?: boolean
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      className="flex flex-col gap-2 p-4 rounded-xl border border-neutral-100 hover:border-marrom/30 hover:bg-marrom/5 transition-colors"
    >
      <Icon size={16} />
      <span className="text-sm font-bold text-charcoal">{label}</span>
      <span className="text-xs text-charcoal/50">{hint}</span>
    </Link>
  )
}
