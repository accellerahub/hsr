"use client"

// =============================================================================
// pills-editor.tsx — Lista dinâmica de chips (adicionar/remover linha a linha)
// =============================================================================
// Serializa em hidden input name={name}, separados por \n.
// actions.ts lê com split(/[\n|]+/). Compatível com criação e edição.
// =============================================================================

import { useState } from "react"
import { Plus, X } from "lucide-react"

interface PillsEditorProps {
  name: string
  defaultValue?: string[]
  maxItems?: number
  placeholder?: string
}

export function PillsEditor({
  name,
  defaultValue = [],
  maxItems = 6,
  placeholder = "Ex: 22 salas",
}: PillsEditorProps) {
  const [items, setItems] = useState<string[]>(defaultValue)

  function update(i: number, v: string) {
    setItems((prev) => prev.map((p, idx) => (idx === i ? v : p)))
  }
  function add() {
    if (items.length >= maxItems) return
    setItems((prev) => [...prev, ""])
  }
  function remove(i: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== i))
  }

  const serialized = items
    .map((i) => i.trim())
    .filter(Boolean)
    .join("\n")

  return (
    <div className="flex flex-col gap-2">
      <input type="hidden" name={name} value={serialized} />
      {items.length === 0 && (
        <div className="text-xs text-charcoal/40 italic">
          Nenhum destaque. Clique em &quot;Adicionar destaque&quot; abaixo.
        </div>
      )}
      {items.map((v, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold text-marrom tabular-nums w-5 text-center shrink-0">
            {i + 1}
          </span>
          <input
            value={v}
            onChange={(e) => update(i, e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom bg-white"
          />
          <button
            type="button"
            onClick={() => remove(i)}
            aria-label={`Remover destaque ${i + 1}`}
            className="p-2 rounded-lg text-charcoal/40 hover:text-error hover:bg-error/10 transition-colors shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      ))}
      {items.length < maxItems && (
        <button
          type="button"
          onClick={add}
          className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-neutral-300 text-xs font-semibold text-charcoal/60 hover:border-marrom hover:text-marrom transition-colors"
        >
          <Plus size={12} />
          Adicionar destaque
        </button>
      )}
    </div>
  )
}
