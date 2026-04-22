"use server"

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"

async function requireMaster() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Não autorizado.", user: null, supabase }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "master") {
    return { error: "Apenas master pode gerenciar usuários.", user: null, supabase }
  }
  return { error: null, user, supabase }
}

async function log(
  user: { id: string; email?: string | null },
  action: string,
  entity_id: string,
  diff: unknown
) {
  const admin = createAdminClient()
  await admin.from("audit_log").insert({
    user_id: user.id,
    user_email: user.email,
    action,
    entity: "user",
    entity_id,
    diff: diff as never,
  })
}

export async function inviteUserAction(formData: FormData) {
  const { error, user } = await requireMaster()
  if (error || !user) return { error: error ?? "Não autorizado." }

  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const fullName = String(formData.get("full_name") ?? "").trim()
  const role = String(formData.get("role") ?? "editor")
  const password = String(formData.get("password") ?? "").trim()

  if (!email || !password) return { error: "Email e senha obrigatórios." }
  if (password.length < 10) return { error: "Senha mínima 10 caracteres." }
  if (role !== "master" && role !== "editor") return { error: "Role inválida." }

  const admin = createAdminClient()
  const { data, error: createErr } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName, role },
  })

  if (createErr) return { error: createErr.message }

  await admin
    .from("profiles")
    .update({ role, full_name: fullName })
    .eq("id", data.user.id)

  await log(user, "invite", data.user.id, { email, role, full_name: fullName })

  revalidatePath("/admin/usuarios")
  return { success: true }
}

export async function removeUserAction(formData: FormData) {
  const { error, user } = await requireMaster()
  if (error || !user) return { error: error ?? "Não autorizado." }

  const id = String(formData.get("id") ?? "")
  if (!id) return { error: "ID inválido." }
  if (id === user.id) return { error: "Não é possível remover a si mesmo." }

  const admin = createAdminClient()

  const { data: before } = await admin
    .from("profiles")
    .select("email, full_name, role")
    .eq("id", id)
    .single()

  const { error: delErr } = await admin.auth.admin.deleteUser(id)
  if (delErr) return { error: delErr.message }

  await log(user, "delete", id, { before })

  revalidatePath("/admin/usuarios")
  return { success: true }
}

export async function updateRoleAction(formData: FormData) {
  const { error, user } = await requireMaster()
  if (error || !user) return { error: error ?? "Não autorizado." }

  const id = String(formData.get("id") ?? "")
  const role = String(formData.get("role") ?? "")
  if (!id) return { error: "ID inválido." }
  if (role !== "master" && role !== "editor") return { error: "Role inválida." }
  if (id === user.id && role !== "master") {
    return { error: "Não rebaixe seu próprio acesso." }
  }

  const admin = createAdminClient()
  const { data: before } = await admin
    .from("profiles")
    .select("role")
    .eq("id", id)
    .single()

  const { error: upErr } = await admin
    .from("profiles")
    .update({ role })
    .eq("id", id)

  if (upErr) return { error: upErr.message }

  await log(user, "update_role", id, { before: before?.role, after: role })

  revalidatePath("/admin/usuarios")
  return { success: true }
}
