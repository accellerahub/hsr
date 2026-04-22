"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateCtaAction(formData: FormData) {
  const id = String(formData.get("id") ?? "")
  const label = String(formData.get("label") ?? "").trim()
  const url = String(formData.get("url") ?? "").trim()

  if (!id || !label || !url) {
    return { error: "Preencha label e URL." }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Não autorizado." }

  const { data: before } = await supabase.from("ctas").select("*").eq("id", id).single()

  const { error } = await supabase
    .from("ctas")
    .update({ label, url, updated_by: user.id, updated_at: new Date().toISOString() })
    .eq("id", id)

  if (error) return { error: error.message }

  await supabase.from("audit_log").insert({
    user_id: user.id,
    user_email: user.email,
    action: "update",
    entity: "cta",
    entity_id: id,
    diff: { before, after: { label, url } },
  })

  revalidatePath("/")
  revalidatePath("/admin/ctas")
  revalidatePath("/admin")

  return { success: true }
}
