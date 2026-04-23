"use client"

// =============================================================================
// features-editor.tsx — Editor visual de blocos de destaque
// =============================================================================
// Cada bloco = ícone (picker) + título + descrição. Serializa JSON no hidden.
// Substitui o input textarea JSON bruto do form original.
// =============================================================================

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { FEATURE_ICONS, IconPicker } from "./icon-picker"

interface Feature {
  icon: string
  title: string
  description: string
}

interface FeaturesEditorProps {
  name: string
  defaultValue?: Feature[]
  maxItems?: number
}

export function FeaturesEditor({
  name,
  defaultValue = [],
  maxItems = 4,
}: FeaturesEditorProps) {
  const [items, setItems] = useState<Feature[]>(defaultValue)

  function update(i: number, patch: Partial<Feature>) {
    setItems((prev) =>
      prev.map((f, idx) => (idx === i ? { ...f, ...patch } : f))
    )
  }
  function add() {
    if (items.length >= maxItems) return
    setItems((prev) => [
      ...prev,
      { icon: "shield-check", title: "", description: "" },
    ])
  }
  function remove(i: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== i))
  }

  const serialized = JSON.stringify(
    items.filter((f) => f.title.trim() && f.description.trim())
  )

  return (
    <div className="flex flex-col gap-3">
      <input type="hidden" name={name} value={serialized} />
      {items.length === 0 && (
        <div className="text-xs text-charcoal/40 italic">
          Nenhum bloco ainda. Adicione até {maxItems} para reforçar diferenciais da estrutura.
        </div>
      )}
      {items.map((f, i) => (
        <div
          key={i}
          className="flex flex-col gap-3 p-4 rounded-xl border border-neutral-200 bg-white"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-kicker text-marrom">
              Bloco {i + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label={`Remover bloco ${i + 1}`}
              className="p-1.5 rounded-lg text-charcoal/40 hover:text-error hover:bg-error/10 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <IconPicker
            label="Ícone"
            options={FEATURE_ICONS}
            value={f.icon}
            onChange={(v) => update(i, { icon: v })}
          />

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
              Título
            </label>
            <input
              value={f.title}
              onChange={(e) => update(i, { title: e.target.value })}
              placeholder="Ex: Protocolos rigorosos"
              className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
              Descrição
            </label>
            <textarea
              value={f.description}
              onChange={(e) => update(i, { description: e.target.value })}
              placeholder="Uma frase curta que complementa o título"
              rows={2}
              className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom resize-y"
            />
          </div>
        </div>
      ))}
      {items.length < maxItems && (
        <button
          type="button"
          onClick={add}
          className="self-start flex items-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-neutral-300 text-xs font-semibold text-charcoal/60 hover:border-marrom hover:text-marrom transition-colors"
        >
          <Plus size={14} />
          Adicionar bloco
        </button>
      )}
    </div>
  )
}
