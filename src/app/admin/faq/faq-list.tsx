"use client"

import { useState, useTransition } from "react"
import { ChevronDown, GripVertical, Trash2 } from "lucide-react"
import {
  updateFaqAction,
  deleteFaqAction,
  reorderFaqAction,
} from "./actions"

interface Faq {
  id: string
  question: string
  answer: string
  position: number
  is_active: boolean
  updated_at: string
}

export function FaqList({ initial }: { initial: Faq[] }) {
  const [items, setItems] = useState(initial)
  const [dragId, setDragId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [, startTransition] = useTransition()
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null)

  function onDragStart(id: string) {
    setDragId(id)
  }
  function onDragOver(e: React.DragEvent, overId: string) {
    e.preventDefault()
    if (!dragId || dragId === overId) return
    const from = items.findIndex((f) => f.id === dragId)
    const to = items.findIndex((f) => f.id === overId)
    if (from < 0 || to < 0) return
    const next = [...items]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    setItems(next)
  }
  function onDragEnd() {
    setDragId(null)
    startTransition(async () => {
      await reorderFaqAction(items.map((i) => i.id))
    })
  }

  async function handleUpdate(id: string, form: FormData) {
    form.set("id", id)
    const res = await updateFaqAction(form)
    if (res?.error) setMsg({ type: "err", text: res.error })
    else {
      setMsg({ type: "ok", text: "Atualizado." })
      setEditingId(null)
      setItems((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                question: String(form.get("question")),
                answer: String(form.get("answer")),
                is_active: form.get("is_active") === "on",
              }
            : f
        )
      )
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Deletar esta pergunta?")) return
    const fd = new FormData()
    fd.set("id", id)
    const res = await deleteFaqAction(fd)
    if (res?.error) setMsg({ type: "err", text: res.error })
    else {
      setItems((prev) => prev.filter((f) => f.id !== id))
      setMsg({ type: "ok", text: "Deletada." })
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {msg && (
        <div
          className={`text-xs px-3 py-2 rounded-lg ${
            msg.type === "ok" ? "bg-success/10 text-success" : "bg-error/10 text-error"
          }`}
        >
          {msg.text}
        </div>
      )}

      {items.length === 0 && (
        <div className="text-sm text-charcoal/50 p-6 text-center bg-white rounded-2xl border border-neutral-100">
          Nenhuma pergunta. Clique em "Nova pergunta" acima.
        </div>
      )}

      {items.map((faq) => (
        <div
          key={faq.id}
          draggable
          onDragStart={() => onDragStart(faq.id)}
          onDragOver={(e) => onDragOver(e, faq.id)}
          onDragEnd={onDragEnd}
          className={`bg-white rounded-2xl border border-neutral-100 overflow-hidden transition-shadow ${
            dragId === faq.id ? "opacity-50" : ""
          }`}
        >
          <div className="p-5 flex items-start gap-3">
            <button
              className="cursor-grab active:cursor-grabbing text-charcoal/30 hover:text-charcoal/70 pt-1"
              aria-label="Arrastar"
            >
              <GripVertical size={16} />
            </button>

            <div className="flex-1 min-w-0">
              {editingId === faq.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleUpdate(faq.id, new FormData(e.currentTarget))
                  }}
                  className="flex flex-col gap-3"
                >
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
                      Pergunta
                    </label>
                    <input
                      name="question"
                      defaultValue={faq.question}
                      required
                      className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
                      Resposta
                    </label>
                    <textarea
                      name="answer"
                      defaultValue={faq.answer}
                      required
                      rows={6}
                      className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom resize-y"
                    />
                  </div>
                  <label className="flex items-center gap-2 text-xs text-charcoal/70">
                    <input
                      type="checkbox"
                      name="is_active"
                      defaultChecked={faq.is_active}
                      className="accent-marrom"
                    />
                    Visível no site
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-marrom text-white text-sm font-bold hover:bg-ouro-hover transition-colors"
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal/70 hover:bg-neutral-50 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <FaqDisplay
                  faq={faq}
                  onEdit={() => setEditingId(faq.id)}
                  onDelete={() => handleDelete(faq.id)}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function FaqDisplay({
  faq,
  onEdit,
  onDelete,
}: {
  faq: Faq
  onEdit: () => void
  onDelete: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-kicker text-marrom">
              #{faq.position}
            </span>
            {!faq.is_active && (
              <span className="text-[10px] font-extrabold uppercase tracking-kicker text-warning bg-warning/10 px-2 py-0.5 rounded">
                Oculta
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-left text-sm font-bold text-charcoal hover:text-marrom transition-colors flex items-center gap-2"
          >
            <ChevronDown
              size={14}
              className={open ? "rotate-180 transition-transform shrink-0" : "transition-transform shrink-0"}
            />
            <span className="truncate">{faq.question}</span>
          </button>
        </div>
        <div className="flex gap-1 shrink-0">
          <button
            onClick={onEdit}
            className="px-3 py-1.5 rounded-lg bg-marrom/10 text-marrom text-xs font-bold hover:bg-marrom hover:text-white transition-colors"
          >
            Editar
          </button>
          <button
            onClick={onDelete}
            aria-label="Deletar"
            className="p-1.5 rounded-lg text-charcoal/40 hover:text-error hover:bg-error/10 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      {open && (
        <p className="text-xs text-charcoal/70 pt-2 border-t border-neutral-100 whitespace-pre-wrap">
          {faq.answer}
        </p>
      )}
    </div>
  )
}
