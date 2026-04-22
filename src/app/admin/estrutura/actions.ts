"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

const ENTITY = "hospital_structure"

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
    entity: ENTITY,
    entity_id,
    diff: diff as never,
  })
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

interface Feature {
  icon: string
  title: string
  description: string
}

function parseFeatures(raw: string): Feature[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .map((f) => ({
        icon: String(f?.icon ?? "").trim(),
        title: String(f?.title ?? "").trim(),
        description: String(f?.description ?? "").trim(),
      }))
      .filter((f) => f.title && f.description)
  } catch {
    return []
  }
}

function parsePills(raw: string): string[] {
  return raw
    .split(/[\n|]+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .slice(0, 6)
}

export async function createStructureAction(formData: FormData) {
  const { supabase, user } = await requireUser()
  if (!user) return { error: "Não autorizado." }

  const title = String(formData.get("title") ?? "").trim()
  const description = String(formData.get("description") ?? "").trim()
  const icon = String(formData.get("icon") ?? "").trim() || "building-2"
  const image_url = String(formData.get("image_url") ?? "").trim() || null
  const slugRaw = String(formData.get("slug") ?? "").trim()
  const slug = slugify(slugRaw || title)
  const kicker = String(formData.get("kicker") ?? "").trim() || null
  const subheadline = String(formData.get("subheadline") ?? "").trim() || null
  const pills = parsePills(String(formData.get("pills") ?? ""))
  const features = parseFeatures(String(formData.get("features") ?? ""))

  if (!title || !description) return { error: "Preencha título e descrição." }
  if (!slug) return { error: "Slug inválido." }

  const { data: maxRow } = await supabase
    .from("hospital_structure")
    .select("position")
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle()

  const nextPosition = (maxRow?.position ?? 0) + 1

  const { data, error } = await supabase
    .from("hospital_structure")
    .insert({
      slug,
      title,
      description,
      icon,
      image_url,
      kicker,
      subheadline,
      pills,
      features,
      position: nextPosition,
      updated_by: user.id,
    })
    .select()
    .single()

  if (error) return { error: error.message }

  await log(supabase, user, "create", data.id, {
    slug,
    title,
    description,
    icon,
    image_url,
    kicker,
    subheadline,
    pills,
    features,
  })

  revalidatePath("/admin/estrutura")
  revalidatePath("/admin")
  revalidatePath("/")
  revalidatePath(`/servicos/${slug}`)
  return { success: true, id: data.id }
}

export async function updateStructureAction(formData: FormData) {
  const { supabase, user } = await requireUser()
  if (!user) return { error: "Não autorizado." }

  const id = String(formData.get("id") ?? "")
  const title = String(formData.get("title") ?? "").trim()
  const description = String(formData.get("description") ?? "").trim()
  const icon = String(formData.get("icon") ?? "").trim() || "building-2"
  const image_url = String(formData.get("image_url") ?? "").trim() || null
  const slug = slugify(String(formData.get("slug") ?? "").trim())
  const is_active = formData.get("is_active") === "on"
  const kicker = String(formData.get("kicker") ?? "").trim() || null
  const subheadline = String(formData.get("subheadline") ?? "").trim() || null
  const pills = parsePills(String(formData.get("pills") ?? ""))
  const features = parseFeatures(String(formData.get("features") ?? ""))

  if (!id || !title || !description) return { error: "Preencha todos os campos." }
  if (!slug) return { error: "Slug inválido." }

  const { data: before } = await supabase
    .from("hospital_structure")
    .select("*")
    .eq("id", id)
    .single()

  const { error } = await supabase
    .from("hospital_structure")
    .update({
      slug,
      title,
      description,
      icon,
      image_url,
      kicker,
      subheadline,
      pills,
      features,
      is_active,
      updated_by: user.id,
    })
    .eq("id", id)

  if (error) return { error: error.message }

  await log(supabase, user, "update", id, {
    before,
    after: {
      slug,
      title,
      description,
      icon,
      image_url,
      kicker,
      subheadline,
      pills,
      features,
      is_active,
    },
  })

  revalidatePath("/admin/estrutura")
  revalidatePath("/")
  revalidatePath(`/servicos/${slug}`)
  if (before?.slug && before.slug !== slug) {
    revalidatePath(`/servicos/${before.slug}`)
  }
  return { success: true }
}

export async function deleteStructureAction(formData: FormData) {
  const { supabase, user } = await requireUser()
  if (!user) return { error: "Não autorizado." }

  const id = String(formData.get("id") ?? "")
  if (!id) return { error: "ID inválido." }

  const { data: before } = await supabase
    .from("hospital_structure")
    .select("*")
    .eq("id", id)
    .single()

  const { error } = await supabase.from("hospital_structure").delete().eq("id", id)
  if (error) return { error: error.message }

  await log(supabase, user, "delete", id, { before })

  revalidatePath("/admin/estrutura")
  revalidatePath("/admin")
  revalidatePath("/")
  if (before?.slug) revalidatePath(`/servicos/${before.slug}`)
  return { success: true }
}

export async function reorderStructureAction(orderedIds: string[]) {
  const { supabase, user } = await requireUser()
  if (!user) return { error: "Não autorizado." }

  await Promise.all(
    orderedIds.map((id, idx) =>
      supabase
        .from("hospital_structure")
        .update({ position: idx + 1, updated_by: user.id })
        .eq("id", id)
    )
  )

  await log(supabase, user, "reorder", "all", { order: orderedIds })

  revalidatePath("/admin/estrutura")
  return { success: true }
}
