import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { redirect } from "next/navigation"
import Link from "next/link"

export const metadata = {
  title: "Auditoria | Painel Staff",
  robots: { index: false, follow: false },
}

const PAGE_SIZE = 50

type AuditRow = {
  id: number
  user_id: string | null
  user_email: string | null
  action: string
  entity: string
  entity_id: string | null
  diff: unknown
  created_at: string
}

const ACTION_COLORS: Record<string, string> = {
  create: "bg-success/10 text-success",
  update: "bg-azul/10 text-azul",
  update_role: "bg-azul/10 text-azul",
  delete: "bg-error/10 text-error",
  invite: "bg-marrom/10 text-marrom",
}

export default async function AdminAuditPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; action?: string; entity?: string }>
}) {
  const sp = await searchParams
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")

  const { data: me } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (me?.role !== "master") redirect("/admin")

  const page = Math.max(1, Number(sp.page ?? "1") || 1)
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const admin = createAdminClient()
  let q = admin
    .from("audit_log")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to)

  if (sp.action) q = q.eq("action", sp.action)
  if (sp.entity) q = q.eq("entity", sp.entity)

  const { data, count } = await q
  const rows = (data ?? []) as AuditRow[]
  const total = count ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  const qs = (overrides: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams()
    const merged = { page, action: sp.action, entity: sp.entity, ...overrides }
    for (const [k, v] of Object.entries(merged)) {
      if (v === undefined || v === "" || v === null) continue
      params.set(k, String(v))
    }
    const s = params.toString()
    return s ? `?${s}` : ""
  }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-extrabold text-charcoal">Auditoria</h1>
        <p className="text-sm text-charcoal/60 mt-1">
          Histórico de ações no painel. Apenas master.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/50">
          Filtros
        </span>
        {["create", "update", "update_role", "delete", "invite"].map((a) => (
          <Link
            key={a}
            href={`/admin/audit${qs({ action: sp.action === a ? undefined : a, page: 1 })}`}
            className={`px-2.5 py-1 rounded-md text-xs font-bold ${
              sp.action === a
                ? "bg-marrom text-white"
                : "bg-white border border-neutral-200 text-charcoal/70 hover:bg-neutral-50"
            }`}
          >
            {a}
          </Link>
        ))}
        {["user", "cta", "faq"].map((e) => (
          <Link
            key={e}
            href={`/admin/audit${qs({ entity: sp.entity === e ? undefined : e, page: 1 })}`}
            className={`px-2.5 py-1 rounded-md text-xs font-bold ${
              sp.entity === e
                ? "bg-marrom text-white"
                : "bg-white border border-neutral-200 text-charcoal/70 hover:bg-neutral-50"
            }`}
          >
            {e}
          </Link>
        ))}
        {(sp.action || sp.entity) && (
          <Link
            href="/admin/audit"
            className="text-xs text-charcoal/50 underline hover:text-charcoal"
          >
            Limpar
          </Link>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
        {rows.length === 0 ? (
          <div className="p-8 text-center text-sm text-charcoal/60">
            Nenhum registro.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
              <tr>
                <th className="px-4 py-3 text-left">Quando</th>
                <th className="px-4 py-3 text-left">Quem</th>
                <th className="px-4 py-3 text-left">Ação</th>
                <th className="px-4 py-3 text-left">Entidade</th>
                <th className="px-4 py-3 text-left">Diff</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-neutral-100 hover:bg-neutral-50/50 align-top"
                >
                  <td className="px-4 py-3 text-xs text-charcoal/60 whitespace-nowrap">
                    {new Date(r.created_at).toLocaleString("pt-BR")}
                  </td>
                  <td className="px-4 py-3 text-xs text-charcoal/80">
                    {r.user_email ?? r.user_id ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-kicker ${
                        ACTION_COLORS[r.action] ?? "bg-neutral-100 text-charcoal/70"
                      }`}
                    >
                      {r.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-charcoal/70">
                    <div className="font-mono">{r.entity}</div>
                    {r.entity_id && (
                      <div className="text-charcoal/40 text-[10px] truncate max-w-[180px]">
                        {r.entity_id}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <details className="text-xs">
                      <summary className="cursor-pointer text-charcoal/60 hover:text-charcoal">
                        ver
                      </summary>
                      <pre className="mt-2 p-2 bg-neutral-50 rounded-md text-[10px] overflow-x-auto max-w-[360px] whitespace-pre-wrap break-all">
                        {JSON.stringify(r.diff, null, 2)}
                      </pre>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-charcoal/60">
        <span>
          {total} registros · página {page} de {totalPages}
        </span>
        <div className="flex gap-2">
          {page > 1 && (
            <Link
              href={`/admin/audit${qs({ page: page - 1 })}`}
              className="px-3 py-1.5 rounded-md border border-neutral-200 bg-white hover:bg-neutral-50"
            >
              ← Anterior
            </Link>
          )}
          {page < totalPages && (
            <Link
              href={`/admin/audit${qs({ page: page + 1 })}`}
              className="px-3 py-1.5 rounded-md border border-neutral-200 bg-white hover:bg-neutral-50"
            >
              Próxima →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
