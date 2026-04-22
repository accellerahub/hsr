import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { createHash } from "node:crypto"

export const runtime = "nodejs"

function hashIp(ip: string | null): string | null {
  if (!ip) return null
  const salt = process.env.CLICK_IP_SALT ?? "hsr-default-salt"
  return createHash("sha256").update(salt + ip).digest("hex").slice(0, 16)
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const ctaKey = typeof body?.cta_key === "string" ? body.cta_key.trim() : ""
    if (!ctaKey) {
      return NextResponse.json({ error: "cta_key required" }, { status: 400 })
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      null
    const userAgent = req.headers.get("user-agent")
    const referrer = req.headers.get("referer")

    const supabase = createAdminClient()
    const { error } = await supabase.from("click_events").insert({
      cta_key: ctaKey,
      user_agent: userAgent,
      referrer,
      ip_hash: hashIp(ip),
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 })
  }
}
