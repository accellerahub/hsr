"use client"

import { useState, useTransition } from "react"
import { Plus, X } from "lucide-react"
import { createStructureAction } from "./actions"

export function NewStructureForm() {
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null)
  const [pending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setMsg(null)
    startTransition(async () => {
      const res = await createStructureAction(fd)
      if (res?.error) setMsg({ type: "err", text: res.error })
      else {
        setMsg({ type: "ok", text: "Item criado." })
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
        Novo item
      </button>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-extrabold uppercase tracking-kicker text-charcoal">
          Novo item
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
              Título
            </label>
            <input
              name="title"
              required
              placeholder="Centro Cirúrgico"
              className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
              Slug
              <span className="ml-1 text-charcoal/40 normal-case tracking-normal font-normal">
                (opcional, gerado do título)
              </span>
            </label>
            <input
              name="slug"
              placeholder="centro-cirurgico"
              className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom font-mono"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
            Descrição
            <span className="ml-1 text-charcoal/40 normal-case tracking-normal font-normal">
              (card da home + meta description)
            </span>
          </label>
          <textarea
            name="description"
            required
            rows={2}
            placeholder="22 salas equipadas com tecnologia de última geração..."
            className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom resize-y"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
              Ícone
              <span className="ml-1 text-charcoal/40 normal-case tracking-normal font-normal">
                (lucide-react)
              </span>
            </label>
            <input
              name="icon"
              placeholder="building-2"
              defaultValue="building-2"
              className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom font-mono"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
              Imagem
              <span className="ml-1 text-charcoal/40 normal-case tracking-normal font-normal">
                (URL hero + card)
              </span>
            </label>
            <input
              name="image_url"
              placeholder="/assets/images/servicos/..."
              className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom"
            />
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-4 flex flex-col gap-3">
          <div className="text-[10px] font-extrabold uppercase tracking-kicker text-marrom">
            Hero da página /servicos/&lt;slug&gt;
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
                Kicker
                <span className="ml-1 text-charcoal/40 normal-case tracking-normal font-normal">
                  (badge superior)
                </span>
              </label>
              <input
                name="kicker"
                placeholder="CENTRO CIRÚRGICO"
                className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
                Pills
                <span className="ml-1 text-charcoal/40 normal-case tracking-normal font-normal">
                  (separadas por | ou linha, até 6)
                </span>
              </label>
              <input
                name="pills"
                placeholder="22 Salas | Robótica | 40min"
                className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
              Subheadline
              <span className="ml-1 text-charcoal/40 normal-case tracking-normal font-normal">
                (parágrafo abaixo do título)
              </span>
            </label>
            <textarea
              name="subheadline"
              rows={2}
              placeholder="Tecnologia robótica e equipe multidisciplinar..."
              className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom resize-y"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
              Features
              <span className="ml-1 text-charcoal/40 normal-case tracking-normal font-normal">
                (JSON array, opcional)
              </span>
            </label>
            <textarea
              name="features"
              rows={4}
              placeholder='[{"icon":"shield-check","title":"Segurança","description":"..."}]'
              className="px-3 py-2 rounded-lg border border-neutral-200 text-xs text-charcoal focus:outline-none focus:border-marrom resize-y font-mono"
            />
          </div>
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
