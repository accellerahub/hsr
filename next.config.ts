import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // Formatos otimizados (WebP/AVIF) conforme doc 04-ARQUITETURA-PROJETO.md
    formats: ["image/avif", "image/webp"],
    // Domínios para imagens externas (adicionar quando necessário)
    remotePatterns: [],
  },
  // Experimental: Turbopack para dev mais rápido
  // turbopack: {}, // Descomentar se necessário
}

export default nextConfig
