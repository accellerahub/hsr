"use client"

// =============================================================================
// icon-picker.tsx — Grid visual de ícones com seleção por clique
// =============================================================================
// Usável controlado (value+onChange) ou uncontrolled (defaultValue + hidden input).
// Inclui presets STRUCTURE_ICONS e FEATURE_ICONS com rótulos em português.
// =============================================================================

import { useState } from "react"
import { Icon, ICON_MAP, type IconName } from "@/components/atoms/icon"

export interface IconOption {
  value: string
  label: string
}

interface IconPickerProps {
  options: IconOption[]
  name?: string
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string
  label?: string
}

export function IconPicker({
  options,
  name,
  value,
  onChange,
  defaultValue,
  label,
}: IconPickerProps) {
  const [internal, setInternal] = useState(
    defaultValue ?? options[0]?.value ?? ""
  )
  const selected = value ?? internal

  function handleSelect(v: string) {
    if (value === undefined) setInternal(v)
    onChange?.(v)
  }

  return (
    <div className="flex flex-col gap-2">
      {name && <input type="hidden" name={name} value={selected} />}
      {label && (
        <span className="text-[10px] font-extrabold uppercase tracking-kicker text-charcoal/60">
          {label}
        </span>
      )}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {options.map((opt) => {
          const iconName = (ICON_MAP[opt.value] ?? "HelpCircle") as IconName
          const isSelected = selected === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleSelect(opt.value)}
              aria-label={opt.label}
              aria-pressed={isSelected}
              title={opt.label}
              className={`aspect-square flex flex-col items-center justify-center gap-1 rounded-xl border text-[9px] font-semibold transition-colors ${
                isSelected
                  ? "bg-marrom border-marrom text-white shadow-sm"
                  : "bg-white border-neutral-200 text-charcoal/60 hover:border-marrom hover:text-marrom"
              }`}
            >
              <Icon name={iconName} size={20} />
              <span className="truncate max-w-full px-1">{opt.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export const STRUCTURE_ICONS: IconOption[] = [
  { value: "building-2", label: "Prédio" },
  { value: "bed", label: "Leito" },
  { value: "scalpel", label: "Cirurgia" },
  { value: "microscope", label: "Laboratório" },
  { value: "flask", label: "Câmara" },
  { value: "activity", label: "Exames" },
  { value: "stethoscope", label: "Consulta" },
  { value: "heart-pulse", label: "Cardio" },
  { value: "presentation", label: "Evento" },
  { value: "utensils", label: "Alimentação" },
  { value: "sparkles", label: "Conforto" },
  { value: "users", label: "Atendimento" },
]

export const FEATURE_ICONS: IconOption[] = [
  { value: "shield-check", label: "Segurança" },
  { value: "users", label: "Equipe" },
  { value: "sparkles", label: "Conforto" },
  { value: "clock", label: "Tempo" },
  { value: "heart-handshake", label: "Humano" },
  { value: "activity", label: "Monitoria" },
  { value: "check-circle", label: "Qualidade" },
  { value: "wrench", label: "Técnica" },
  { value: "stethoscope", label: "Médico" },
  { value: "heart-pulse", label: "Saúde" },
]
