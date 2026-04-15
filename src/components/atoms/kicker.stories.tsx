// =============================================================================
// KICKER.STORIES.TSX — Átomo A04 | Hospital São Rafael
// =============================================================================

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Kicker } from "./kicker";

const meta: Meta<typeof Kicker> = {
  title: "Atoms/Kicker",
  component: Kicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Label contextual posicionado acima dos títulos de seção. DNA HSR: Montserrat 800, uppercase, letter-spacing 3px. Sempre acompanha um Heading logo abaixo.",
      },
    },
  },
  argTypes: {
    color: {
      control: "select",
      options: ["ouro", "light", "charcoal", "azul", "cobre"],
      description: "Cor do kicker",
      table: { defaultValue: { summary: "ouro" } },
    },
    as: {
      control: "select",
      options: ["span", "p", "div"],
      description: "Tag HTML renderizada",
      table: { defaultValue: { summary: "span" } },
    },
    children: {
      control: "text",
    },
  },
  args: {
    children: "Cirurgias Eletivas Particulares",
    color: "ouro",
    as: "span",
  },
};

export default meta;
type Story = StoryObj<typeof Kicker>;

// ---------------------------------------------------------------------------
// Cores
// ---------------------------------------------------------------------------

export const Ouro: Story = {
  args: { color: "ouro", children: "Cirurgias Eletivas Particulares" },
  parameters: { backgrounds: { default: "Creme" } },
};

export const Cobre: Story = {
  args: { color: "cobre", children: "Para médicos e cirurgiões" },
  parameters: { backgrounds: { default: "Creme" } },
};

export const Azul: Story = {
  args: { color: "azul", children: "Nossos diferenciais" },
  parameters: { backgrounds: { default: "Creme" } },
};

export const Charcoal: Story = {
  args: { color: "charcoal", children: "Sobre o hospital" },
  parameters: { backgrounds: { default: "Branco" } },
};

export const Light: Story = {
  args: { color: "light", children: "Depoimentos de pacientes" },
  parameters: { backgrounds: { default: "Charcoal" } },
};

// ---------------------------------------------------------------------------
// Combinação com Heading (uso real)
// ---------------------------------------------------------------------------

export const ComHeading: Story = {
  name: "Vitrine / Kicker + Heading (uso real)",
  render: () => (
    <div className="p-8 bg-creme space-y-12">
      <div>
        <Kicker color="ouro">Cirurgias Eletivas Particulares</Kicker>
        <h2 className="text-4xl font-bold text-charcoal leading-tight">
          Por que o HSR é referência em cirurgias eletivas
        </h2>
      </div>
      <div>
        <Kicker color="cobre">Para médicos e cirurgiões</Kicker>
        <h2 className="text-4xl font-bold text-charcoal leading-tight">
          A infraestrutura que você precisa para operar no seu melhor
        </h2>
      </div>
    </div>
  ),
};

export const TodasAsCores: Story = {
  name: "Vitrine / Todas as cores",
  render: () => (
    <div className="space-y-0">
      <div className="p-8 bg-creme space-y-3">
        <Kicker color="ouro">Ouro — CTAs e destaques principais</Kicker>
        <Kicker color="cobre">Cobre — Seções de médicos</Kicker>
        <Kicker color="azul">Azul — Seções de confiança</Kicker>
        <Kicker color="charcoal">Charcoal — Fundos neutros</Kicker>
      </div>
      <div className="p-8 bg-charcoal">
        <Kicker color="light">Light — Fundo escuro</Kicker>
      </div>
    </div>
  ),
};
