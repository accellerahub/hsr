"use client"

import { useState, useTransition } from "react"
import { Plus, X, RefreshCw } from "lucide-react"
import { inviteUserAction } from "./actions"

function generatePassword() {
  const charset =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%&*"
  let s = ""
  const arr = new Uint32Array(16)
  crypto.getRandomValues(arr)
  for (let i = 0; i < arr.length; i++) s += charset[arr[i] % charset.length]
  return s
}

export function InviteUserForm() {
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null)
  const [pw, setPw] = useState(generatePassword())
  const [pending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.set("password", pw)
    setMsg(null)
    startTransition(async () => {
      const res = await inviteUserAction(fd)
      if (res?.error) setMsg({ type: "err", text: res.error })
      else {
        const email = String(fd.get("email"))
        setMsg({
          type: "ok",
          text: `Criado: ${email}. Senha: ${pw} — copie e envie ao usuário.`,
        })
        ;(e.target as HTMLFormElement).reset()
        setPw(generatePassword())
      }
    })
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-marrom text-white text-sm font-bold hover:bg-ouro-hover transition-colors self-start"
      >
        <Plus size={16} />
        Convidar usuário
      </button>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-extrabold uppercase tracking-kicker text-charcoal">
          Novo usuário
        </h2>
        <button
          onClick={() => {
            setOpen(false)
            setMsg(null)
          }}
          className="text-charcoal/40 hover:text-charcoal"
          aria-label="Fechar"
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
              Nome
            </label>
            <input
              name="full_name"
              required
              className="px-3 py-2 rounded-lg border border-neutral-200 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="px-3 py-2 rounded-lg border border-neutral-200 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_180px] gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
              Senha temporária
            </label>
            <div className="flex gap-2">
              <input
                readOnly
                value={pw}
                className="flex-1 px-3 py-2 rounded-lg border border-neutral-200 text-sm font-mono"
              />
              <button
                type="button"
                onClick={() => setPw(generatePassword())}
                className="px-3 py-2 rounded-lg border border-neutral-200 text-charcoal/60 hover:bg-neutral-50"
                aria-label="Gerar nova senha"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
              Role
            </label>
            <select
              name="role"
              defaultValue="editor"
              className="px-3 py-2 rounded-lg border border-neutral-200 text-sm bg-white"
            >
              <option value="editor">Editor</option>
              <option value="master">Master</option>
            </select>
          </div>
        </div>

        {msg && (
          <div
            className={`text-xs px-3 py-2 rounded-lg break-all ${
              msg.type === "ok"
                ? "bg-success/10 text-success"
                : "bg-error/10 text-error"
            }`}
          >
            {msg.text}
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={pending}
            className="px-4 py-2 rounded-lg bg-marrom text-white text-sm font-bold hover:bg-ouro-hover disabled:opacity-60"
          >
            {pending ? "Criando..." : "Criar usuário"}
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              setMsg(null)
            }}
            className="px-4 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal/70"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
