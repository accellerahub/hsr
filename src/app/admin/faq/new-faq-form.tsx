"use client"

import { useState, useTransition } from "react"
import { Plus, X } from "lucide-react"
import { createFaqAction } from "./actions"

export function NewFaqForm() {
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null)
  const [pending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setMsg(null)
    startTransition(async () => {
      const res = await createFaqAction(fd)
      if (res?.error) setMsg({ type: "err", text: res.error })
      else {
        setMsg({ type: "ok", text: "Pergunta criada." })
        ;(e.target as HTMLFormElement).reset()
        setOpen(false)
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
        Nova pergunta
      </button>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-extrabold uppercase tracking-kicker text-charcoal">
          Nova pergunta
        </h2>
        <button
          onClick={() => {
            setOpen(false)
            setMsg(null)
          }}
          className="text-charcoal/40 hover:text-charcoal transition-colors"
          aria-label="Fechar"
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
            Pergunta
          </label>
          <input
            name="question"
            required
            placeholder="Como funciona o agendamento?"
            className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
            Resposta
          </label>
          <textarea
            name="answer"
            required
            rows={5}
            placeholder="O agendamento é feito..."
            className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom resize-y"
          />
        </div>
        {msg && (
          <div
            className={`text-xs px-3 py-2 rounded-lg ${
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
            className="px-4 py-2 rounded-lg bg-marrom text-white text-sm font-bold hover:bg-ouro-hover disabled:opacity-60 transition-colors"
          >
            {pending ? "Criando..." : "Criar"}
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              setMsg(null)
            }}
            className="px-4 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal/70 hover:bg-neutral-50 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
