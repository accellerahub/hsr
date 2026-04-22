import { createClient } from "@/lib/supabase/server"
import { FaqList } from "./faq-list"
import { NewFaqForm } from "./new-faq-form"

export default async function AdminFaqPage() {
  const supabase = await createClient()
  const { data: faqs } = await supabase
    .from("faqs")
    .select("*")
    .order("position", { ascending: true })

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-charcoal">Perguntas Frequentes</h1>
          <p className="text-sm text-charcoal/60 mt-1">
            Arraste para reordenar. Edições aparecem no site em segundos.
          </p>
        </div>
      </header>

      <NewFaqForm />

      <FaqList initial={(faqs ?? []) as never} />
    </div>
  )
}
