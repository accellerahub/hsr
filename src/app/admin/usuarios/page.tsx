import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { redirect } from "next/navigation"
import { UsersList } from "./users-list"
import { InviteUserForm } from "./invite-user-form"

export const metadata = {
  title: "Usuários | Painel Staff",
  robots: { index: false, follow: false },
}

export default async function AdminUsuariosPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")

  const { data: me } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (me?.role !== "master") redirect("/admin")

  const admin = createAdminClient()
  const { data: profiles } = await admin
    .from("profiles")
    .select("id, email, full_name, role, created_at")
    .order("created_at", { ascending: true })

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-extrabold text-charcoal">Usuários</h1>
        <p className="text-sm text-charcoal/60 mt-1">
          Gestão de acessos ao painel. Apenas master.
        </p>
      </header>

      <InviteUserForm />

      <UsersList
        initial={(profiles ?? []) as never}
        currentUserId={user.id}
      />
    </div>
  )
}
