import { createClient } from "@/lib/supabase/server"
import { CtaRow } from "./cta-row"

export default async function AdminCtasPage() {
  const supabase = await createClient()

  const [{ data: ctas }, { data: locations }] = await Promise.all([
    supabase.from("ctas").select("*").order("key"),
    supabase.from("cta_locations").select("*"),
  ])

  const locsByCtaId = new Map<string, typeof locations>()
  for (const l of locations ?? []) {
    if (!locsByCtaId.has(l.cta_id)) locsByCtaId.set(l.cta_id, [])
    locsByCtaId.get(l.cta_id)!.push(l)
  }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-extrabold text-charcoal">CTAs</h1>
        <p className="text-sm text-charcoal/60 mt-1">
          Links e botões do site. Editar aqui atualiza todos os locais onde o CTA aparece.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {(ctas ?? []).map((cta) => (
          <CtaRow
            key={cta.id}
            cta={cta}
            locations={(locsByCtaId.get(cta.id) ?? []) as never}
          />
        ))}
      </div>
    </div>
  )
}
