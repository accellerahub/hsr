// =============================================================================
// FAQ-ITEM.TSX — Molécula M05 | Hospital São Rafael
// =============================================================================
// Item de FAQ com accordion (Radix UI).
// Transição suave na abertura. Usado em O08 FAQ Section.
// =============================================================================

"use client"

import * as Accordion from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { FAQItem as FAQItemType } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface FAQItemProps {
  item: FAQItemType
  /** Tema de cor */
  theme?: "light" | "dark"
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function FAQItem({ item, theme = "light" }: FAQItemProps) {
  const isLight = theme === "light"

  return (
    <Accordion.Item
      value={item.id}
      className={cn(
        "border-b last:border-b-0",
        isLight ? "border-charcoal/10" : "border-white/10"
      )}
    >
      {/* Trigger */}
      <Accordion.Trigger
        className={cn(
          "group flex w-full items-center justify-between",
          "py-5 text-left gap-4",
          "transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro focus-visible:ring-offset-2",
          isLight
            ? "text-charcoal hover:text-ouro"
            : "text-white hover:text-ouro"
        )}
      >
        <span className="text-base font-semibold leading-snug">
          {item.question}
        </span>
        <ChevronDown
          size={20}
          strokeWidth={2}
          className={cn(
            "flex-shrink-0 transition-transform duration-300 ease-in-out",
            "group-data-[state=open]:rotate-180",
            isLight ? "text-charcoal/50" : "text-white/50",
            "group-hover:text-ouro"
          )}
          aria-hidden
        />
      </Accordion.Trigger>

      {/* Conteúdo colapsável */}
      <Accordion.Content
        className={cn(
          "overflow-hidden",
          "data-[state=open]:animate-accordion-down",
          "data-[state=closed]:animate-accordion-up"
        )}
      >
        <div className="pb-5 pr-8">
          <p
            className={cn(
              "text-sm leading-relaxed",
              isLight ? "text-charcoal/60" : "text-white/60"
            )}
          >
            {item.answer}
          </p>
        </div>
      </Accordion.Content>
    </Accordion.Item>
  )
}

// -----------------------------------------------------------------------------
// WRAPPER — Lista de FAQs com Accordion Root
// -----------------------------------------------------------------------------
interface FAQListProps {
  items: FAQItemType[]
  theme?: "light" | "dark"
  /** "single" — abre um por vez | "multiple" — abre vários */
  type?: "single" | "multiple"
  className?: string
}

export function FAQList({ items, theme = "light", type = "single", className }: FAQListProps) {
  return (
    <Accordion.Root
      type={type as "single"}
      collapsible={type === "single" ? true : undefined}
      className={cn("w-full", className)}
    >
      {items.map((item) => (
        <FAQItem key={item.id} item={item} theme={theme} />
      ))}
    </Accordion.Root>
  )
}
