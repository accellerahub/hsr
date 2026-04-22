import { createClient } from "@/lib/supabase/server"

export interface CmsCta {
  key: string
  label: string
  url: string
}

export interface CmsFaq {
  id: string
  question: string
  answer: string
  position: number
}

export async function getCtaMap(): Promise<Map<string, CmsCta>> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("ctas")
    .select("key,label,url")
    .eq("is_active", true)
  const map = new Map<string, CmsCta>()
  for (const c of data ?? []) map.set(c.key, c as CmsCta)
  return map
}

export function pickCta(
  map: Map<string, CmsCta>,
  key: string,
  fallback: { label: string; href: string }
): { label: string; href: string } {
  const c = map.get(key)
  if (!c) return fallback
  return { label: c.label, href: c.url }
}

export async function getActiveFaqs(): Promise<CmsFaq[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("faqs")
    .select("id,question,answer,position")
    .eq("is_active", true)
    .order("position", { ascending: true })
  return (data ?? []) as CmsFaq[]
}
