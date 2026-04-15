// =============================================================================
// PAGE.TSX — Home | Hospital São Rafael
// =============================================================================
// Ponto de entrada da rota "/".
// Delega toda a composição para HomeTemplate (T01).
// Header está em layout.tsx (renderizado fora do <main>).
// =============================================================================

import { HomeTemplate } from "@/components/templates/home-template"

export default function Home() {
  return <HomeTemplate />
}
