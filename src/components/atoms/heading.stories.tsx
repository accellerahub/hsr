// =============================================================================
// HEADING.STORIES.TSX — Átomo A05/A06 | Hospital São Rafael
// =============================================================================

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Heading } from "./heading";

const meta: Meta<typeof Heading> = {
  title: "Atoms/Heading",
  component: Heading,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Heading unificado H1–H4 com tokens tipográficos HSR. Mobile-first: tamanhos crescem no breakpoint lg. Suporta cores adaptadas para fundos claros e escuros.",
      },
    },
  },
  argTypes: {
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4"],
      description: "Nível semântico do heading",
      table: { defaultValue: { summary: "h2" } },
    },
    color: {
      control: "select",
      options: ["default", "light", "ouro", "azul"],
      description: "Cor do texto",
      table: { defaultValue: { summary: "default" } },
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Alinhamento do texto",
      table: { defaultValue: { summary: "left" } },
    },
    children: {
      control: "text",
    },
  },
  args: {
    as: "h2",
    color: "default",
    align: "left",
    children: "Excelência cirúrgica com humanidade",
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

// ---------------------------------------------------------------------------
// Níveis semânticos
// ---------------------------------------------------------------------------

export const H1: Story = {
  args: {
    as: "h1",
    children: "Onde a precisão cirúrgica encontra o cuidado humano",
  },
};

export const H2: Story = {
  args: {
    as: "h2",
    children: "Por que os médicos escolhem o HSR",
  },
};

export const H3: Story = {
  args: {
    as: "h3",
    children: "Infraestrutura de alta complexidade",
  },
};

export const H4: Story = {
  args: {
    as: "h4",
    children: "Centro Cirúrgico",
  },
};

// ---------------------------------------------------------------------------
// Cores
// ---------------------------------------------------------------------------

export const ColorOuro: Story = {
  name: "Cor / Ouro",
  args: { color: "ouro", children: "Excelência cirúrgica" },
};

export const ColorAzul: Story = {
  name: "Cor / Azul",
  args: { color: "azul", children: "Confiança e precisão" },
};

export const ColorLight: Story = {
  name: "Cor / Light (fundo escuro)",
  args: { color: "light", children: "Cuidado que transforma vidas" },
  parameters: {
    backgrounds: { default: "Charcoal" },
  },
};

// ---------------------------------------------------------------------------
// Vitrine — hierarquia completa
// ---------------------------------------------------------------------------

export const HierarchiaCompleta: Story = {
  name: "Vitrine / Hierarquia completa",
  render: () => (
    <div className="p-8 space-y-4 bg-creme max-w-2xl">
      <Heading as="h1">H1 — Onde a precisão cirúrgica encontra o cuidado humano</Heading>
      <Heading as="h2">H2 — Por que os médicos escolhem o HSR</Heading>
      <Heading as="h3">H3 — Infraestrutura de alta complexidade</Heading>
      <Heading as="h4">H4 — Centro Cirúrgico</Heading>
    </div>
  ),
};

export const TodasAsCores: Story = {
  name: "Vitrine / Todas as cores",
  render: () => (
    <div className="space-y-4">
      <div className="p-8 bg-creme">
        <Heading color="default">Default — Charcoal</Heading>
        <Heading color="ouro">Ouro — Destaques CTA</Heading>
        <Heading color="azul">Azul — Confiança</Heading>
      </div>
      <div className="p-8 bg-charcoal">
        <Heading color="light">Light — Fundo escuro</Heading>
      </div>
    </div>
  ),
};
