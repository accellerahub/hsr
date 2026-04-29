// =============================================================================
// SERVICE-INLINE-CTA.TSX — Organismo | Hospital São Rafael
// =============================================================================
// Bloco de CTA reutilizável entre seções da página de serviço. Repete o convite
// ao contato em momentos quentes do scroll (após Indicações, Jornada, FAQ).
// Atendimento exclusivamente particular — WhatsApp + telefone diretos.
// =============================================================================

import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Kicker } from "@/components/atoms/kicker"
import { Heading } from "@/components/atoms/heading"
import { BodyText } from "@/components/atoms/body-text"
import { Button } from "@/components/atoms/button"
import type { BaseComponentProps } from "@/types"

interface ServiceInlineCtaProps extends BaseComponentProps {
  kicker?: string
  headline: string
  description?: string
  whatsappHref?: string
  whatsappLabel?: string
  variant?: "creme" | "charcoal"
}

export function ServiceInlineCta({
  kicker = "FALE COM A EQUIPE",
  headline,
  description,
  whatsappHref = "https://wa.me/message/NZIPXRZ4SKUHM1",
  whatsappLabel = "Falar no WhatsApp",
  variant = "creme",
  className,
}: ServiceInlineCtaProps) {
  const isDark = variant === "charcoal"

  return (
    <section
      aria-label={kicker}
      className={cn(
        "w-full py-16 lg:py-20 scroll-mt-24",
        isDark ? "bg-charcoal" : "bg-creme",
        className
      )}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:pr-[260px] 2xl:pr-[300px]">
        <div
          className={cn(
            "max-w-[860px] mx-auto rounded-3xl",
            "px-8 py-10 lg:px-14 lg:py-12",
            "flex flex-col items-start gap-5",
            isDark
              ? "bg-white/5 ring-1 ring-white/10"
              : "bg-white ring-1 ring-cobre/15 shadow-[0_2px_8px_rgba(46,46,46,0.04)]"
          )}
        >
          <Kicker color={isDark ? "ouro" : "cobre"}>{kicker}</Kicker>

          <Heading
            as="h2"
            className={cn(
              "!text-2xl lg:!text-3xl !leading-tight",
              isDark ? "!text-white" : "!text-charcoal"
            )}
          >
            {headline}
          </Heading>

          <span
            aria-hidden
            className={cn("block w-12 h-0.5", isDark ? "bg-ouro" : "bg-cobre")}
          />

          {description && (
            <BodyText
              color={isDark ? "light-muted" : "muted"}
              size="base"
              className="max-w-[640px]"
            >
              {description}
            </BodyText>
          )}

          <div className="pt-2 w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              href={whatsappHref}
              leftIcon={<MessageCircle size={18} aria-hidden />}
              className="!whitespace-nowrap w-full sm:w-auto justify-center"
            >
              {whatsappLabel}
            </Button>
          </div>

          <p
            className={cn(
              "text-xs mt-2 leading-relaxed",
              isDark ? "text-white/55" : "text-charcoal/55"
            )}
          >
            Avaliação inicial sem compromisso · Resposta em até 1 hora útil ·
            Atendimento exclusivamente particular
          </p>
        </div>
      </div>
    </section>
  )
}
