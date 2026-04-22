"use client"

import { useState, useTransition } from "react"
import { ChevronDown, MapPin } from "lucide-react"
import { updateCtaAction } from "./actions"

interface CtaRowProps {
  cta: {
    id: string
    key: string
    label: string
    url: string
    description: string | null
    updated_at: string
  }
  locations: { id: string; label: string; page: string; component: string | null }[]
}

export function CtaRow({ cta, locations }: CtaRowProps) {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [label, setLabel] = useState(cta.label)
  const [url, setUrl] = useState(cta.url)
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null)
  const [pending, startTransition] = useTransition()

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setMsg(null)
    startTransition(async () => {
      const res = await updateCtaAction(fd)
      if (res?.error) setMsg({ type: "err", text: res.error })
      else {
        setMsg({ type: "ok", text: "Salvo. Site atualizado." })
        setEditing(false)
      }
    })
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-extrabold uppercase tracking-kicker text-marrom mb-1">
              {cta.key}
            </div>
            {!editing ? (
              <>
                <div className="text-base font-bold text-charcoal truncate">
                  {cta.label}
                </div>
                <a
                  href={cta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-charcoal/60 hover:text-marrom break-all transition-colors"
                >
                  {cta.url}
                </a>
                {cta.description && (
                  <p className="text-xs text-charcoal/50 mt-2">{cta.description}</p>
                )}
              </>
            ) : (
              <form onSubmit={handleSave} className="flex flex-col gap-3 mt-2">
                <input type="hidden" name="id" value={cta.id} />
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
                    Label
                  </label>
                  <input
                    name="label"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    required
                    className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
                    URL
                  </label>
                  <input
                    name="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom"
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
                    {pending ? "Salvando..." : "Salvar"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false)
                      setLabel(cta.label)
                      setUrl(cta.url)
                      setMsg(null)
                    }}
                    className="px-4 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal/70 hover:bg-neutral-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>

          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="shrink-0 px-3 py-1.5 rounded-lg bg-marrom/10 text-marrom text-xs font-bold hover:bg-marrom hover:text-white transition-colors"
            >
              Editar
            </button>
          )}
        </div>

        {msg && !editing && (
          <div
            className={`text-xs px-3 py-2 rounded-lg ${
              msg.type === "ok" ? "bg-success/10 text-success" : "bg-error/10 text-error"
            }`}
          >
            {msg.text}
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 text-xs font-semibold text-charcoal/60 hover:text-charcoal transition-colors self-start"
        >
          <ChevronDown
            size={14}
            className={open ? "rotate-180 transition-transform" : "transition-transform"}
          />
          {locations.length} {locations.length === 1 ? "local" : "locais"} no site
        </button>

        {open && (
          <ul className="flex flex-col gap-2 pt-2 border-t border-neutral-100">
            {locations.length === 0 ? (
              <li className="text-xs text-charcoal/50 py-2">Sem locais registrados.</li>
            ) : (
              locations.map((loc) => (
                <li
                  key={loc.id}
                  className="flex items-start gap-3 py-2 text-xs"
                >
                  <MapPin size={12} className="text-marrom mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-charcoal">{loc.label}</div>
                    <div className="text-charcoal/50 truncate">
                      <code className="font-mono">{loc.page}</code>
                      {loc.component && (
                        <span className="ml-2 text-charcoal/30">· {loc.component}</span>
                      )}
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  )
}
