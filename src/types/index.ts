// =============================================================================
// TYPES/INDEX.TS — Tipos globais | Hospital São Rafael
// =============================================================================
// Define as interfaces TypeScript para todas as estruturas de dados do projeto.
// Alinhado com os dados em lib/constants.ts e os componentes do inventário.
// =============================================================================

// -----------------------------------------------------------------------------
// NAVEGAÇÃO
// -----------------------------------------------------------------------------
export interface NavItem {
  label: string
  href: string
}

export interface NavCTA {
  label: string
  href: string
}

// -----------------------------------------------------------------------------
// HERO (Dobra 1)
// -----------------------------------------------------------------------------
export interface HeroData {
  kicker: string
  headline: string
  subheadline: string | readonly string[]
  ctaPrimary: NavCTA
  video: {
    src: string
    poster: string
    alt: string
  }
}

// -----------------------------------------------------------------------------
// STATS / MÉTRICAS (Dobra 2)
// -----------------------------------------------------------------------------
export interface StatItem {
  id: string
  value: number | string
  prefix?: string
  suffix?: string
  label: string
  context?: string
  description?: string
}

export interface StatsData {
  headline: string
  items: readonly StatItem[] | StatItem[]
}

// -----------------------------------------------------------------------------
// DIFERENCIAIS (Dobra 3)
// -----------------------------------------------------------------------------
export interface ContentBlockData {
  kicker: string
  headline: string
  description: string | readonly string[]
  ctas: NavCTA[]
  image?: {
    src: string
    alt: string
  }
}

// -----------------------------------------------------------------------------
// SERVIÇOS (Dobra 4)
// -----------------------------------------------------------------------------
export interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string
  image: string
}

export interface ServicosData {
  kicker: string
  headline: string
  description: string
  items: ServiceItem[]
}

// -----------------------------------------------------------------------------
// ESPECIALIDADES (Dobra 5)
// -----------------------------------------------------------------------------
export interface EspecialidadeItem {
  id: string
  title: string
  description: string
  icon: string
  procedures: string[]
}

export interface EspecialidadesData {
  kicker: string
  headline: string
  description: string
  items: EspecialidadeItem[]
}

// -----------------------------------------------------------------------------
// PRODUTOS (Dobra 6)
// -----------------------------------------------------------------------------
export interface ProductItem {
  id: string
  title: string
  description: string
  icon: string
  image: string
}

export interface ProductCategory {
  id: string
  label: string
  items: ProductItem[]
}

export interface ProdutosData {
  kicker: string
  headline: string
  description: string
  categories: ProductCategory[]
}

// -----------------------------------------------------------------------------
// JORNADA DO PACIENTE (Dobra 7)
// -----------------------------------------------------------------------------
export interface JourneyRelatedLink {
  label: string
  href: string
}

export interface JourneyStep {
  id: string
  number: number
  title: string
  subtitle: string
  description: string
  icon: string
  relatedLinks: readonly JourneyRelatedLink[] | JourneyRelatedLink[]
}

export interface JornadaData {
  kicker: string
  headline: string
  description: string
  steps: JourneyStep[]
}

// -----------------------------------------------------------------------------
// B2B — ÁREA DO MÉDICO (Dobra 8)
// -----------------------------------------------------------------------------
export interface B2BFeature {
  id: string
  metric: string
  title: string
  description: string
  icon: string
}

export interface TestimonialItem {
  id: string
  quote: string
  author: string
  role: string
  image?: string
}

export interface B2BData {
  kicker: string
  headline: string
  subheadline?: string
  description: string
  features: B2BFeature[]
  testimonials: TestimonialItem[]
  cta: NavCTA
}

// -----------------------------------------------------------------------------
// FAQ (Dobra 9)
// -----------------------------------------------------------------------------
export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface FAQData {
  kicker: string
  headline: string
  items: FAQItem[]
}

// -----------------------------------------------------------------------------
// FOOTER (Dobra 10)
// -----------------------------------------------------------------------------
export interface FooterStat {
  label: string
  value: number | string
}

export interface FooterLink {
  label: string
  href: string
}

export interface FooterNavSection {
  title: string
  links: FooterLink[]
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface ContactInfo {
  address: {
    street: string
    neighborhood: string
    cep: string
  }
  phone: string
  email: string
}

export interface FooterData {
  description: string
  stats: FooterStat[]
  navigation: Record<string, FooterNavSection>
  contact: ContactInfo
  social: SocialLink[]
  emergency: NavCTA
}

// -----------------------------------------------------------------------------
// SEO / METADATA
// -----------------------------------------------------------------------------
export interface SiteMetadata {
  title: string
  description: string
  url: string
  ogImage: string
  locale: string
  type: string
}

// -----------------------------------------------------------------------------
// COMPONENTES — Props compartilhadas
// -----------------------------------------------------------------------------

/** Props base que todo componente aceita */
export interface BaseComponentProps {
  className?: string
}

/** Variantes de botão */
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost"

/** Tamanhos de botão */
export type ButtonSize = "sm" | "md" | "lg"

/** Variantes de card */
export type CardVariant = "default" | "horizontal" | "icon-only" | "dark"

/** Variantes do Card Grid */
export type CardGridVariant = "services" | "specialties" | "products"

/** Direção da timeline */
export type TimelineDirection = "horizontal" | "vertical"

/** Estado do header no scroll */
export type HeaderState = "transparent" | "solid"

// -----------------------------------------------------------------------------
// UTILITÁRIOS DE TIPO
// -----------------------------------------------------------------------------

/** Torna todas as propriedades de um tipo readonly recursivamente */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

/** Extrai o tipo dos items de um array readonly */
export type ArrayElement<T extends readonly unknown[]> =
  T extends readonly (infer U)[] ? U : never
