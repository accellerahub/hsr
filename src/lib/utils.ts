// =============================================================================
// UTILS.TS — Funções utilitárias | Hospital São Rafael
// =============================================================================

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// -----------------------------------------------------------------------------
// cn() — Merge condicional de classes Tailwind
// -----------------------------------------------------------------------------
// Combina clsx (condicionais) com tailwind-merge (resolve conflitos).
// Uso: cn("bg-creme p-4", isActive && "bg-ouro", className)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// -----------------------------------------------------------------------------
// formatNumber() — Formata números com separadores brasileiros
// -----------------------------------------------------------------------------
// Uso: formatNumber(12000) → "12.000"
// Uso: formatNumber(170000000) → "170.000.000"
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value)
}

// -----------------------------------------------------------------------------
// formatCurrency() — Formata valores em reais
// -----------------------------------------------------------------------------
// Uso: formatCurrency(170000000) → "R$ 170.000.000"
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

// -----------------------------------------------------------------------------
// slugify() — Gera slug a partir de texto
// -----------------------------------------------------------------------------
// Uso: slugify("Centro Cirúrgico") → "centro-cirurgico"
// Útil para IDs de seção, keys de componentes, URLs futuras.
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^a-z0-9]+/g, "-")     // substitui não-alfanuméricos por -
    .replace(/(^-|-$)+/g, "")         // remove - do início e fim
}

// -----------------------------------------------------------------------------
// truncate() — Trunca texto com reticências
// -----------------------------------------------------------------------------
// Uso: truncate("Texto muito longo...", 100) → "Texto muito lo..."
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + "..."
}

// -----------------------------------------------------------------------------
// isPendingContent() — Verifica se um texto é placeholder pendente do cliente
// -----------------------------------------------------------------------------
// Uso: isPendingContent("[PENDENTE CLIENTE] Descrição aqui") → true
// Útil para renderizar badges de "conteúdo pendente" em dev mode.
export function isPendingContent(text: string): boolean {
  return text.includes("[PENDENTE CLIENTE]")
}

// -----------------------------------------------------------------------------
// getInitials() — Extrai iniciais de um nome
// -----------------------------------------------------------------------------
// Uso: getInitials("Dr. Carlos Silva") → "CS"
// Útil para avatares de médicos quando não houver foto.
export function getInitials(name: string): string {
  return name
    .replace(/^(Dr\.?|Dra\.?)\s*/i, "") // remove prefixo Dr/Dra
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

// -----------------------------------------------------------------------------
// scrollToSection() — Scroll suave até uma seção com offset do header
// -----------------------------------------------------------------------------
// Uso: scrollToSection("servicos")
// Fallback JS para browsers que não suportam scroll-padding-top.
export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId)
  if (!element) return

  const headerHeight = parseInt(
    getComputedStyle(document.documentElement)
      .getPropertyValue("--header-height")
      .trim() || "80"
  )

  const elementPosition = element.getBoundingClientRect().top + window.scrollY
  const offsetPosition = elementPosition - headerHeight

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  })
}

// -----------------------------------------------------------------------------
// debounce() — Debounce genérico
// -----------------------------------------------------------------------------
// Uso: const debouncedSearch = debounce(handleSearch, 300)
// Útil para scroll events, resize, input de busca futura.
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function (this: unknown, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}
