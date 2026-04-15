// =============================================================================
// .storybook/preview.tsx — Configuração global do Storybook | HSR
// =============================================================================
// - Importa globals.css (tokens, Tailwind, variáveis CSS)
// - Injeta fonte Montserrat via Google Fonts
// - Define backgrounds padrão com a paleta HSR
// =============================================================================

import type { Preview } from "@storybook/nextjs-vite";
import React from "react";
import "../src/app/globals.css";

const preview: Preview = {
  // ---------------------------------------------------------------------------
  // DECORATORS — Envolve todas as stories com providers globais
  // ---------------------------------------------------------------------------
  decorators: [
    (Story) => (
      <>
        {/* Montserrat — única fonte do Design System HSR */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <div
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          className="antialiased"
        >
          <Story />
        </div>
      </>
    ),
  ],

  // ---------------------------------------------------------------------------
  // PARAMETERS — Configurações globais de addons
  // ---------------------------------------------------------------------------
  parameters: {
    // Backgrounds HSR
    backgrounds: {
      default: "Creme",
      values: [
        { name: "Creme",    value: "#FDF1E7" },
        { name: "Branco",   value: "#FFFFFF" },
        { name: "Charcoal", value: "#2E2E2E" },
      ],
    },

    // Controls — matchers automáticos
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // A11y — mostrar violations no painel (não bloquear CI ainda)
    a11y: {
      test: "todo",
    },

    // Docs — configuração de página de documentação
    docs: {
      toc: true,
    },
  },
};

export default preview;
