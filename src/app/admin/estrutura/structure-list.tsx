"use client"

import { useState, useTransition } from "react"
import { GripVertical, Trash2 } from "lucide-react"
import {
  updateStructureAction,
  deleteStructureAction,
  reorderStructureAction,
} from "./actions"

interface Feature {
  icon: string
  title: string
  description: string
}

interface Item {
  id: string
  slug: string
  title: string
  description: string
  icon: string
  image_url: string | null
  kicker: string | null
  subheadline: string | null
  pills: string[]
  features: Feature[]
  position: number
  is_active: boolean
  updated_at: string
}

export function StructureList({ initial }: { initial: Item[] }) {
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
    const from = items.findIndex((i) => i.id === dragId)
    const to = items.findIndex((i) => i.id === overId)
    if (from < 0 || to < 0) return
    const next = [...items]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    setItems(next)
  }
  function onDragEnd() {
    setDragId(null)
    startTransition(async () => {
      await reorderStructureAction(items.map((i) => i.id))
    })
  }

  async function handleUpdate(id: string, form: FormData) {
    form.set("id", id)
    const res = await updateStructureAction(form)
    if (res?.error) setMsg({ type: "err", text: res.error })
    else {
      setMsg({ type: "ok", text: "Atualizado." })
      setEditingId(null)
      const pills = String(form.get("pills") || "")
        .split(/[\n|]+/)
        .map((p) => p.trim())
        .filter(Boolean)
      let features: Feature[] = []
      try {
        const parsed = JSON.parse(String(form.get("features") || "[]"))
        if (Array.isArray(parsed)) features = parsed as Feature[]
      } catch {}
      setItems((prev) =>
        prev.map((i) =>
          i.id === id
            ? {
                ...i,
                slug: String(form.get("slug")),
                title: String(form.get("title")),
                description: String(form.get("description")),
                icon: String(form.get("icon") || "building-2"),
                image_url: String(form.get("image_url") || "") || null,
                kicker: String(form.get("kicker") || "") || null,
                subheadline: String(form.get("subheadline") || "") || null,
                pills,
                features,
                is_active: form.get("is_active") === "on",
              }
            : i
        )
      )
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Deletar "${title}"? Esta ação é irreversível.`)) return
    const fd = new FormData()
    fd.set("id", id)
    const res = await deleteStructureAction(fd)
    if (res?.error) setMsg({ type: "err", text: res.error })
    else {
      setItems((prev) => prev.filter((i) => i.id !== id))
      setMsg({ type: "ok", text: "Deletado." })
    }
  }

  return (
    <div className="flex flex-col gap-3">
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

      {items.length === 0 && (
        <div className="text-sm text-charcoal/50 p-6 text-center bg-white rounded-2xl border border-neutral-200 shadow-sm">
          Nenhum item. Clique em &quot;Novo item&quot; acima.
        </div>
      )}

      {items.map((item) => (
        <div
          key={item.id}
          draggable
          onDragStart={() => onDragStart(item.id)}
          onDragOver={(e) => onDragOver(e, item.id)}
          onDragEnd={onDragEnd}
          className={`bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden transition-shadow ${
            dragId === item.id ? "opacity-50" : ""
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
              {editingId === item.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleUpdate(item.id, new FormData(e.currentTarget))
                  }}
                  className="flex flex-col gap-3"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
                        Título
                      </label>
                      <input
                        name="title"
                        defaultValue={item.title}
                        required
                        className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
                        Slug
                      </label>
                      <input
                        name="slug"
                        defaultValue={item.slug}
                        required
                        className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
                      Descrição
                    </label>
                    <textarea
                      name="description"
                      defaultValue={item.description}
                      required
                      rows={3}
                      className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom resize-y"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
                        Ícone
                      </label>
                      <input
                        name="icon"
                        defaultValue={item.icon}
                        className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom font-mono"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
                        Imagem (URL)
                      </label>
                      <input
                        name="image_url"
                        defaultValue={item.image_url ?? ""}
                        className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom"
                      />
                    </div>
                  </div>

                  <div className="border-t border-neutral-100 pt-3 flex flex-col gap-3">
                    <div className="text-[10px] font-extrabold uppercase tracking-kicker text-marrom">
                      Hero /servicos/{item.slug}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
                          Kicker
                        </label>
                        <input
                          name="kicker"
                          defaultValue={item.kicker ?? ""}
                          className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
                          Pills
                          <span className="ml-1 text-charcoal/40 normal-case tracking-normal font-normal">
                            (| ou linha)
                          </span>
                        </label>
                        <input
                          name="pills"
                          defaultValue={(item.pills ?? []).join(" | ")}
                          className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
                        Subheadline
                      </label>
                      <textarea
                        name="subheadline"
                        defaultValue={item.subheadline ?? ""}
                        rows={2}
                        className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom resize-y"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
                        Features
                        <span className="ml-1 text-charcoal/40 normal-case tracking-normal font-normal">
                          (JSON)
                        </span>
                      </label>
                      <textarea
                        name="features"
                        defaultValue={JSON.stringify(item.features ?? [], null, 2)}
                        rows={4}
                        className="px-3 py-2 rounded-lg border border-neutral-200 text-xs text-charcoal focus:outline-none focus:border-marrom resize-y font-mono"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-xs text-charcoal/70">
                    <input
                      type="checkbox"
                      name="is_active"
                      defaultChecked={item.is_active}
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
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] font-extrabold uppercase tracking-kicker text-marrom">
                          #{item.position}
                        </span>
                        <span className="text-[10px] font-mono text-charcoal/40 bg-neutral-50 px-1.5 py-0.5 rounded">
                          {item.slug}
                        </span>
                        <span className="text-[10px] font-mono text-charcoal/40 bg-neutral-50 px-1.5 py-0.5 rounded">
                          icon: {item.icon}
                        </span>
                        {!item.is_active && (
                          <span className="text-[10px] font-extrabold uppercase tracking-kicker text-warning bg-warning/10 px-2 py-0.5 rounded">
                            Oculto
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-charcoal">{item.title}</h3>
                      <p className="text-xs text-charcoal/60 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => setEditingId(item.id)}
                        className="px-3 py-1.5 rounded-lg bg-marrom/10 text-marrom text-xs font-bold hover:bg-marrom hover:text-white transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        aria-label="Deletar"
                        className="p-1.5 rounded-lg text-charcoal/40 hover:text-error hover:bg-error/10 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
