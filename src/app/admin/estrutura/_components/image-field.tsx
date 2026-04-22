"use client"

// =============================================================================
// image-field.tsx — Campo URL com pré-visualização de thumbnail lado a lado
// =============================================================================
// Fallback visual quando URL quebra ou está vazia. Usa <img> nativo (não Next
// Image) porque admin aceita URLs arbitrárias sem pré-configuração de domínio.
// =============================================================================

import { useState } from "react"
import { ImageOff } from "lucide-react"

interface ImageFieldProps {
  name: string
  defaultValue?: string
  placeholder?: string
}

export function ImageField({
  name,
  defaultValue = "",
  placeholder = "/assets/images/servicos/... ou https://...",
}: ImageFieldProps) {
  const [url, setUrl] = useState(defaultValue)
  const [error, setError] = useState(false)

  return (
    <div className="flex gap-3 items-start">
      <div className="flex-1 flex flex-col gap-1">
        <input
          name={name}
          value={url}
          onChange={(e) => {
            setUrl(e.target.value)
            setError(false)
          }}
          placeholder={placeholder}
          className="px-3 py-2 rounded-lg border border-neutral-200 text-sm text-charcoal focus:outline-none focus:border-marrom"
        />
        <span className="text-[10px] text-charcoal/40">
          Cole o endereço de uma imagem. Aparece como capa do card na home e
          fundo do hero da página.
        </span>
      </div>
      <div className="w-20 h-20 rounded-lg border border-neutral-200 bg-neutral-50 overflow-hidden shrink-0 flex items-center justify-center">
        {url && !error ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt="Pré-visualização"
            className="w-full h-full object-cover"
            onError={() => setError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 text-charcoal/30 text-center p-1">
            <ImageOff size={16} />
            <span className="text-[9px]">
              {error ? "Inválida" : "Sem imagem"}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
