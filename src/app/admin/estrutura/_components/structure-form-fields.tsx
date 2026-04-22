"use client"

// =============================================================================
// structure-form-fields.tsx — Conjunto compartilhado de campos (create + edit)
// =============================================================================
// Renderiza os 2 blocos visuais (Card na home + Página completa). Todos os
// campos usam name= para compor FormData compatível com actions.ts.
// Slug + title são controlados para gerar o preview do endereço em tempo real.
// =============================================================================

import { useState } from "react"
import { IconPicker, STRUCTURE_ICONS } from "./icon-picker"
import { PillsEditor } from "./pills-editor"
import { FeaturesEditor } from "./features-editor"
import { ImageField } from "./image-field"

interface Feature {
  icon: string
  title: string
  description: string
}

interface Defaults {
  title?: string
  slug?: string
  description?: string
  icon?: string
  image_url?: string | null
  kicker?: string | null
  subheadline?: string | null
  pills?: string[]
  features?: Feature[]
}

function slugPreview(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

export function StructureFormFields({ defaults = {} }: { defaults?: Defaults }) {
  const [title, setTitle] = useState(defaults.title ?? "")
  const [slug, setSlug] = useState(defaults.slug ?? "")

  const effectiveSlug = slug || slugPreview(title) || "minha-estrutura"

  return (
    <div className="flex flex-col">
      {/* ========================================================= */}
      {/* BLOCO 1 — Card na home                                    */}
      {/* ========================================================= */}
      <section className="p-5 flex flex-col gap-4 border-b border-neutral-100">
        <header className="flex flex-col gap-0.5">
          <span className="text-[10px] font-extrabold uppercase tracking-kicker text-marrom">
            1 · Card na home
          </span>
          <span className="text-xs text-charcoal/50">
            O que aparece na seção &quot;Estrutura&quot; da página inicial.
          </span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
              Título *
            </label>
            <input
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Centro Cirúrgico"
              className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
              Endereço da página
            </label>
            <div className="flex items-center px-3 py-2 rounded-lg border border-neutral-200 bg-neutral-50 focus-within:border-marrom focus-within:bg-white transition-colors">
              <span className="font-mono text-xs text-charcoal/40 shrink-0">
                /servicos/
              </span>
              <input
                name="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder={slugPreview(title) || "centro-cirurgico"}
                className="flex-1 min-w-0 bg-transparent text-sm text-charcoal focus:outline-none font-mono placeholder:text-charcoal/30"
              />
            </div>
            <span className="text-[10px] text-charcoal/40">
              Gerado automaticamente do título se deixar em branco.
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
            Descrição *
          </label>
          <textarea
            name="description"
            required
            rows={2}
            defaultValue={defaults.description ?? ""}
            placeholder="Uma ou duas frases sobre a estrutura"
            className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom resize-y"
          />
          <span className="text-[10px] text-charcoal/40">
            Aparece no card da home e no resultado do Google.
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
            Ícone do card
          </label>
          <IconPicker
            name="icon"
            options={STRUCTURE_ICONS}
            defaultValue={defaults.icon ?? "building-2"}
          />
          <span className="text-[10px] text-charcoal/40">
            Selecione o ícone que melhor representa a estrutura.
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
            Imagem de capa
          </label>
          <ImageField name="image_url" defaultValue={defaults.image_url ?? ""} />
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCO 2 — Página completa                                 */}
      {/* ========================================================= */}
      <section className="p-5 flex flex-col gap-4 border-b border-neutral-100 bg-neutral-50/40">
        <header className="flex flex-col gap-0.5">
          <span className="text-[10px] font-extrabold uppercase tracking-kicker text-marrom">
            2 · Página completa
          </span>
          <span className="text-xs text-charcoal/50">
            Conteúdo que aparece em{" "}
            <span className="font-mono text-charcoal/70">
              /servicos/{effectiveSlug}
            </span>
          </span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
              Etiqueta do topo
            </label>
            <input
              name="kicker"
              defaultValue={defaults.kicker ?? ""}
              placeholder={(title || "Centro Cirúrgico").toUpperCase()}
              className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom bg-white"
            />
            <span className="text-[10px] text-charcoal/40">
              Texto pequeno em caixa alta acima do título da página.
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
              Frase de apoio
            </label>
            <textarea
              name="subheadline"
              rows={2}
              defaultValue={defaults.subheadline ?? ""}
              placeholder="Explicação complementar logo abaixo do título"
              className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom resize-y bg-white"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
            Destaques rápidos
          </label>
          <PillsEditor
            name="pills"
            defaultValue={defaults.pills ?? []}
            maxItems={6}
          />
          <span className="text-[10px] text-charcoal/40">
            Pequenos selos que aparecem no topo da página. Até 6.
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
            Blocos de destaque
          </label>
          <FeaturesEditor
            name="features"
            defaultValue={defaults.features ?? []}
            maxItems={4}
          />
          <span className="text-[10px] text-charcoal/40">
            Cartões que reforçam diferenciais da estrutura. Até 4.
          </span>
        </div>
      </section>
    </div>
  )
}
