// =============================================================================
// LAYOUT.TSX — Layout raiz | Hospital São Rafael
// =============================================================================
// Configuração global: fonte Montserrat, metadata SEO, schema JSON-LD,
// Header global (fora do <main> — semântica correta), providers.
// =============================================================================

import type { Metadata, Viewport } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { SITE_METADATA, SCHEMA_DATA, NAV_ITEMS, NAV_CTA } from "@/lib/constants"
import { Header } from "@/components/organisms/header"

// -----------------------------------------------------------------------------
// FONTE — Montserrat com todos os pesos usados no Design System
// -----------------------------------------------------------------------------
const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
})

// -----------------------------------------------------------------------------
// METADATA — SEO (Next.js App Router)
// -----------------------------------------------------------------------------
export const metadata: Metadata = {
  title: {
    default: SITE_METADATA.title,
    template: `%s | Hospital São Rafael`,
  },
  description: SITE_METADATA.description,
  metadataBase: new URL(SITE_METADATA.url),

  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: SITE_METADATA.url,
    siteName: "Hospital São Rafael",
    locale: SITE_METADATA.locale,
    type: "website",
    images: [
      {
        url: SITE_METADATA.ogImage,
        width: 1200,
        height: 630,
        alt: "Hospital São Rafael — Centro de Cirurgias Eletivas Particulares",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: [SITE_METADATA.ogImage],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },

  alternates: {
    canonical: SITE_METADATA.url,
  },
}

// -----------------------------------------------------------------------------
// VIEWPORT
// -----------------------------------------------------------------------------
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FDF1E7",
}

// -----------------------------------------------------------------------------
// SCHEMA JSON-LD — Dados estruturados para Google
// -----------------------------------------------------------------------------
function SchemaJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_DATA) }}
    />
  )
}

// -----------------------------------------------------------------------------
// LAYOUT RAIZ
// -----------------------------------------------------------------------------
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <head>
        <SchemaJsonLd />
      </head>
      <body className={`${montserrat.className} bg-creme text-charcoal antialiased`}>

        {/* Header — fora do <main> para semântica correta */}
        <Header
          navItems={[...NAV_ITEMS]}
          cta={{ ...NAV_CTA }}
        />

        {/* Conteúdo principal */}
        <main id="main-content">
          {children}
        </main>

      </body>
    </html>
  )
}
