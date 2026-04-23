"use client"

// =============================================================================
// new-structure-form.tsx — Form de criação de nova estrutura hospitalar
// =============================================================================
// Toggle aberto/fechado. Usa StructureFormFields compartilhado e submete via
// createStructureAction. Reseta ao criar com sucesso.
// =============================================================================

import { useState, useTransition } from "react"
import { Plus, X } from "lucide-react"
import { createStructureAction } from "./actions"
import { StructureFormFields } from "./_components/structure-form-fields"

export function NewStructureForm() {
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  )
  const [pending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    setMsg(null)
    startTransition(async () => {
      const res = await createStructureAction(fd)
      if (res?.error) setMsg({ type: "err", text: res.error })
      else {
        setMsg({ type: "ok", text: "Estrutura criada." })
        form.reset()
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
        Nova estrutura
      </button>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-neutral-100">
        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-kicker text-charcoal">
            Nova estrutura
          </h2>
          <p className="text-xs text-charcoal/50 mt-0.5">
            Ao salvar, o card na home e a página completa são criados juntos.
          </p>
        </div>
        <button
          onClick={() => {
            setOpen(false)
            setMsg(null)
          }}
          aria-label="Fechar"
          className="text-charcoal/40 hover:text-charcoal transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <StructureFormFields />

        <div className="p-5 flex flex-col gap-3">
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
              className="px-5 py-2.5 rounded-lg bg-marrom text-white text-sm font-bold hover:bg-ouro-hover disabled:opacity-60 transition-colors"
            >
              {pending ? "Criando..." : "Criar estrutura"}
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                setMsg(null)
              }}
              className="px-5 py-2.5 rounded-lg border border-neutral-200 text-sm text-charcoal/70 hover:bg-neutral-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
