"use client"

import { useState, useTransition } from "react"
import { Trash2 } from "lucide-react"
import { removeUserAction, updateRoleAction } from "./actions"

type Profile = {
  id: string
  email: string | null
  full_name: string | null
  role: "master" | "editor"
  created_at: string
}

export function UsersList({
  initial,
  currentUserId,
}: {
  initial: Profile[]
  currentUserId: string
}) {
  const [rows, setRows] = useState<Profile[]>(initial)
  const [err, setErr] = useState<string | null>(null)
  const [pendingId, setPendingId] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  function handleRole(id: string, role: "master" | "editor") {
    setErr(null)
    setPendingId(id)
    const fd = new FormData()
    fd.set("id", id)
    fd.set("role", role)
    startTransition(async () => {
      const res = await updateRoleAction(fd)
      setPendingId(null)
      if (res?.error) setErr(res.error)
      else setRows((r) => r.map((p) => (p.id === id ? { ...p, role } : p)))
    })
  }

  function handleRemove(id: string, email: string | null) {
    if (id === currentUserId) {
      setErr("Não é possível remover a si mesmo.")
      return
    }
    if (!confirm(`Remover ${email ?? id}? Esta ação é irreversível.`)) return
    setErr(null)
    setPendingId(id)
    const fd = new FormData()
    fd.set("id", id)
    startTransition(async () => {
      const res = await removeUserAction(fd)
      setPendingId(null)
      if (res?.error) setErr(res.error)
      else setRows((r) => r.filter((p) => p.id !== id))
    })
  }

  if (rows.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-neutral-100 p-8 text-center text-sm text-charcoal/60">
        Nenhum usuário cadastrado.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {err && (
        <div className="bg-error/10 text-error text-xs px-3 py-2 rounded-lg">
          {err}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
            <tr>
              <th className="px-4 py-3 text-left">Nome</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Criado</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => {
              const self = p.id === currentUserId
              const busy = pendingId === p.id
              return (
                <tr
                  key={p.id}
                  className="border-t border-neutral-100 hover:bg-neutral-50/50"
                >
                  <td className="px-4 py-3 font-medium text-charcoal">
                    {p.full_name || "—"}
                    {self && (
                      <span className="ml-2 text-[10px] font-extrabold uppercase tracking-kicker text-marrom">
                        Você
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-charcoal/70">{p.email ?? "—"}</td>
                  <td className="px-4 py-3">
                    <select
                      value={p.role}
                      disabled={busy}
                      onChange={(e) =>
                        handleRole(p.id, e.target.value as "master" | "editor")
                      }
                      className={`px-2 py-1 rounded-md border text-xs font-bold uppercase tracking-kicker ${
                        p.role === "master"
                          ? "border-marrom/30 bg-marrom/5 text-marrom"
                          : "border-neutral-200 bg-white text-charcoal/70"
                      } disabled:opacity-50`}
                    >
                      <option value="editor">Editor</option>
                      <option value="master">Master</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-charcoal/50 text-xs">
                    {new Date(p.created_at).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleRemove(p.id, p.email)}
                      disabled={busy || self}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs text-error hover:bg-error/10 disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Remover usuário"
                    >
                      <Trash2 size={14} />
                      Remover
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
