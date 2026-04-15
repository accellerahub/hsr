// =============================================================================
// FOOTER.TSX — Organismo O09 | Hospital São Rafael
// =============================================================================
// Composição: Logo + descrição + navegação em colunas + contato + social + mini stats
// Visual: fundo charcoal, layout em colunas responsivo
// =============================================================================

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/atoms/logo"
import { ContactInfoBlock } from "@/components/molecules/contact-info-block"
import { NavLink } from "@/components/molecules/nav-link"
import { SocialLinks } from "@/components/molecules/social-links"
import type { BaseComponentProps, FooterData } from "@/types"

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface FooterProps extends BaseComponentProps {
  data: FooterData
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function Footer({ data, className }: FooterProps) {
  const { description, stats, navigation, contact, social } = data

  const currentYear = new Date().getFullYear()

  return (
    <footer
      id="contato"
      aria-label="Rodapé"
      className={cn("w-full bg-charcoal text-white", className)}
    >
      {/* ------------------------------------------------------------------ */}
      {/* CORPO PRINCIPAL                                                      */}
      {/* ------------------------------------------------------------------ */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-12">

          {/* Coluna 1: Logo + descrição + mini stats + social */}
          <div className="flex flex-col gap-6">
            <Logo variant="light" height={44} />
            <p className="text-sm text-white/60 leading-relaxed max-w-[280px]">
              {description}
            </p>

            {/* Mini stats */}
            {stats.length > 0 && (
              <div className="flex gap-6 pt-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-2xl font-extrabold text-ouro leading-none">
                      {stat.value}
                    </span>
                    <span className="text-xs text-white/40 mt-1">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Redes sociais */}
            <SocialLinks links={social} theme="dark" />
          </div>

          {/* Colunas de navegação — links com href="#" ocultos até página ser construída */}
          {Object.entries(navigation).map(([key, section]) => {
            const visibleLinks = section.links.filter((l) => l.href !== "#")
            if (visibleLinks.length === 0) return null
            return (
              <div key={key} className="flex flex-col gap-4">
                <h3 className="text-xs font-extrabold uppercase tracking-kicker text-white/40">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-3" role="list">
                  {visibleLinks.map((link) => (
                    <li key={link.href}>
                      <NavLink href={link.href} variant="footer">
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}

          {/* Coluna de contato */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-extrabold uppercase tracking-kicker text-white/40">
              CONTATO
            </h3>

            <div className="flex flex-col gap-5">
              {/* Endereço */}
              <ContactInfoBlock
                iconName="MapPin"
                label="Endereço"
                value={`${contact.address.street}, ${contact.address.neighborhood} — ${contact.address.cep}`}
                theme="dark"
              />

              {/* Telefone */}
              <ContactInfoBlock
                iconName="Phone"
                label="Telefone"
                value={contact.phone}
                href={`tel:${contact.phone.replace(/\D/g, "")}`}
                theme="dark"
              />

              {/* E-mail */}
              <ContactInfoBlock
                iconName="Mail"
                label="E-mail"
                value={contact.email}
                href={`mailto:${contact.email}`}
                theme="dark"
              />
            </div>

          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* BARRA INFERIOR                                                       */}
      {/* ------------------------------------------------------------------ */}
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              © {currentYear} Hospital São Rafael. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                href="#"
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
