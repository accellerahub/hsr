import { createClient } from "@/lib/supabase/server"
import { StructureList } from "./structure-list"
import { NewStructureForm } from "./new-structure-form"

export const metadata = {
  title: "Estrutura Hospitalar | Painel Staff",
  robots: { index: false, follow: false },
}

export default async function AdminEstruturaPage() {
  const supabase = await createClient()
  const { data: items } = await supabase
    .from("hospital_structure")
    .select("*")
    .order("position", { ascending: true })

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-charcoal">Estrutura Hospitalar</h1>
          <p className="text-sm text-charcoal/60 mt-1">
            Itens da seção &quot;Estrutura Hospitalar&quot; do site. Arraste para reordenar.
          </p>
        </div>
      </header>

      <NewStructureForm />

      <StructureList initial={(items ?? []) as never} />
    </div>
  )
}
