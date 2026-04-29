// =============================================================================
// SERVICE-MEDICO-BLOCK.TSX — Organismo | Hospital São Rafael
// =============================================================================
// Bloco híbrido "Para o médico assistente". Captura a persona secundária em
// páginas B2C (Centro Cirúrgico, IMD, Laboratório, Hiperbárica, etc).
// O paciente e o médico co-decidem o serviço — esse bloco endereça o médico
// sem tirar protagonismo do paciente. Posicionado mid-page, não rodapé.
// =============================================================================

import { Stethoscope } from "lucide-react"
import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { Button } from "@/components/atoms/button"
import { Icon, resolveIconName } from "@/components/atoms/icon"
import type { BaseComponentProps } from "@/types"
import type { ServiceMedicoBlockData } from "@/lib/services-content"

interface ServiceMedicoBlockProps extends BaseComponentProps {
  data: ServiceMedicoBlockData
  sectionId?: string
}

export function ServiceMedicoBlock({
  data,
  sectionId = "para-o-medico",
  className,
}: ServiceMedicoBlockProps) {
  const {
    kicker,
    headline,
    description,
    benefits,
    ctaLabel = "Falar com a Consultoria Médica",
    ctaHref = "https://wa.me/message/NZIPXRZ4SKUHM1",
    note,
  } = data

  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-heading`}
      className={cn(
        "w-full py-20 lg:py-28 scroll-mt-24",
        "bg-charcoal relative overflow-hidden",
        className
      )}
    >
      {/* Pattern decorativo discreto */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:pr-[260px] 2xl:pr-[300px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
          {/* Coluna esquerda — header */}
          <header className="flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-white/10 ring-1 ring-white/20 text-white">
              <Stethoscope size={14} aria-hidden />
              <Kicker color="light" className="!mb-0 !text-[11px] lg:!text-xs">
                {kicker}
              </Kicker>
            </div>
            <Heading
              as="h2"
              color="light"
              id={`${sectionId}-heading`}
              className="!text-3xl lg:!text-4xl !leading-tight"
            >
              {headline}
            </Heading>
            <span aria-hidden className="block w-12 h-0.5 bg-ouro" />
            {description && (
              <BodyText color="light-muted" size="base">
                {description}
              </BodyText>
            )}
            <div className="pt-2">
              <Button variant="primary" size="lg" href={ctaHref}>
                {ctaLabel}
              </Button>
            </div>
            {note && (
              <p className="text-xs text-white/50 mt-1">{note}</p>
            )}
          </header>

          {/* Coluna direita — grid de benefícios */}
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5"
            role="list"
          >
            {benefits.map((b) => (
              <li
                key={b.title}
                className={cn(
                  "rounded-2xl bg-white/5 ring-1 ring-white/10",
                  "px-5 py-5 lg:px-6 lg:py-6",
                  "flex flex-col gap-2.5",
                  "hover:bg-white/8 hover:ring-white/20 transition-colors"
                )}
              >
                <div className="text-ouro">
                  <Icon
                    name={resolveIconName(b.icon)}
                    size={22}
                    color="ouro"
                    strokeWidth={2}
                  />
                </div>
                <span className="text-sm lg:text-base font-bold text-white leading-snug">
                  {b.title}
                </span>
                <span className="text-sm text-white/65 leading-relaxed">
                  {b.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
