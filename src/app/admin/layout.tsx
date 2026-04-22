import { createClient } from "@/lib/supabase/server"
import { AdminShell } from "./_components/admin-shell"

export const metadata = {
  title: "Painel Staff | Hospital São Rafael",
  robots: { index: false, follow: false },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayoutInner>{children}</AdminLayoutInner>
}

async function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <>{children}</>
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name, email")
    .eq("id", user.id)
    .single()

  return (
    <AdminShell
      user={{
        email: user.email ?? profile?.email ?? "",
        name: profile?.full_name ?? "",
        role: (profile?.role ?? "editor") as "master" | "editor",
      }}
    >
      {children}
    </AdminShell>
  )
}
