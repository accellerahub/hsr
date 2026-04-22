"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

async function requireUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return { supabase, user }
}

async function log(
  supabase: Awaited<ReturnType<typeof createClient>>,
  user: { id: string; email?: string | null },
  action: string,
  entity_id: string,
  diff: unknown
) {
  await supabase.from("audit_log").insert({
    user_id: user.id,
    user_email: user.email,
    action,
    entity: "faq",
    entity_id,
    diff: diff as never,
  })
}

export async function createFaqAction(formData: FormData) {
  const { supabase, user } = await requireUser()
  if (!user) return { error: "Não autorizado." }

  const question = String(formData.get("question") ?? "").trim()
  const answer = String(formData.get("answer") ?? "").trim()
  if (!question || !answer) return { error: "Preencha pergunta e resposta." }

  const { data: maxRow } = await supabase
    .from("faqs")
    .select("position")
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle()

  const nextPosition = (maxRow?.position ?? 0) + 1

  const { data, error } = await supabase
    .from("faqs")
    .insert({ question, answer, position: nextPosition, updated_by: user.id })
    .select()
    .single()

  if (error) return { error: error.message }

  await log(supabase, user, "create", data.id, { question, answer })

  revalidatePath("/")
  revalidatePath("/admin/faq")
  revalidatePath("/admin")
  return { success: true, id: data.id }
}

export async function updateFaqAction(formData: FormData) {
  const { supabase, user } = await requireUser()
  if (!user) return { error: "Não autorizado." }

  const id = String(formData.get("id") ?? "")
  const question = String(formData.get("question") ?? "").trim()
  const answer = String(formData.get("answer") ?? "").trim()
  const is_active = formData.get("is_active") === "on"

  if (!id || !question || !answer) return { error: "Preencha todos os campos." }

  const { data: before } = await supabase.from("faqs").select("*").eq("id", id).single()

  const { error } = await supabase
    .from("faqs")
    .update({ question, answer, is_active, updated_by: user.id })
    .eq("id", id)

  if (error) return { error: error.message }

  await log(supabase, user, "update", id, {
    before,
    after: { question, answer, is_active },
  })

  revalidatePath("/")
  revalidatePath("/admin/faq")
  return { success: true }
}

export async function deleteFaqAction(formData: FormData) {
  const { supabase, user } = await requireUser()
  if (!user) return { error: "Não autorizado." }

  const id = String(formData.get("id") ?? "")
  if (!id) return { error: "ID inválido." }

  const { data: before } = await supabase.from("faqs").select("*").eq("id", id).single()

  const { error } = await supabase.from("faqs").delete().eq("id", id)
  if (error) return { error: error.message }

  await log(supabase, user, "delete", id, { before })

  revalidatePath("/")
  revalidatePath("/admin/faq")
  revalidatePath("/admin")
  return { success: true }
}

export async function reorderFaqAction(orderedIds: string[]) {
  const { supabase, user } = await requireUser()
  if (!user) return { error: "Não autorizado." }

  await Promise.all(
    orderedIds.map((id, idx) =>
      supabase.from("faqs").update({ position: idx + 1, updated_by: user.id }).eq("id", id)
    )
  )

  await log(supabase, user, "reorder", "all", { order: orderedIds })

  revalidatePath("/")
  revalidatePath("/admin/faq")
  return { success: true }
}
