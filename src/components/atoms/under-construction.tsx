// =============================================================================
// UNDER-CONSTRUCTION.TSX — Átomo | Hospital São Rafael
// =============================================================================
// Badge discreto para substituir CTAs durante a construção do site.
// Para reativar um botão: remover <UnderConstruction /> e restaurar o <Button>.
// =============================================================================

import { cn } from "@/lib/utils"

interface UnderConstructionProps {
  className?: string
}

export function UnderConstruction({ className }: UnderConstructionProps) {
  return (
    <span
      aria-label="Em construção"
      className={cn(
        "inline-flex items-center gap-1.5",
        "px-3 py-1 rounded-full",
        "border border-charcoal/[0.12] bg-charcoal/[0.04]",
        "text-[9px] font-extrabold uppercase tracking-[0.14em] text-charcoal/30",
        "select-none cursor-default",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-ouro/50 animate-pulse" aria-hidden />
      Em construção
    </span>
  )
}
