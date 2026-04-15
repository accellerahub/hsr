// =============================================================================
// BUTTON.STORIES.TSX — Átomo A01/A02/A03 | Hospital São Rafael
// =============================================================================

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Botão principal do Design System HSR. Cobre CTAs primários (ouro), secundários (outline/ghost) e escuros. DNA HSR: cantos retos (border-radius 0), transição 300ms.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "ghost", "outline", "secondary"],
      description: "Variante visual",
      table: { defaultValue: { summary: "primary" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamanho do botão",
      table: { defaultValue: { summary: "md" } },
    },
    isLoading: {
      control: "boolean",
      description: "Estado de carregamento",
    },
    disabled: {
      control: "boolean",
      description: "Estado desabilitado",
    },
    children: {
      control: "text",
      description: "Texto do botão",
    },
  },
  args: {
    children: "Agendar Consulta",
    variant: "primary",
    size: "md",
    isLoading: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ---------------------------------------------------------------------------
// Variantes
// ---------------------------------------------------------------------------

export const Primary: Story = {
  args: { variant: "primary", children: "Agendar Consulta" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Saiba mais" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Conheça a estrutura" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Falar com especialista" },
  parameters: {
    backgrounds: { default: "Creme" },
  },
};

// ---------------------------------------------------------------------------
// Tamanhos
// ---------------------------------------------------------------------------

export const Small: Story = {
  args: { size: "sm", children: "Ver mais" },
};

export const Medium: Story = {
  args: { size: "md", children: "Agendar Consulta" },
};

export const Large: Story = {
  args: { size: "lg", children: "Quero ser credenciado" },
};

// ---------------------------------------------------------------------------
// Estados
// ---------------------------------------------------------------------------

export const Loading: Story = {
  args: { isLoading: true, children: "Enviando..." },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Indisponível" },
};

// ---------------------------------------------------------------------------
// Vitrine — todas as variantes lado a lado
// ---------------------------------------------------------------------------

export const AllVariants: Story = {
  name: "Vitrine / Todas as variantes",
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-8 bg-creme">
      <Button variant="primary">CTA Principal</Button>
      <Button variant="outline">CTA Secundário</Button>
      <Button variant="ghost">Saiba mais →</Button>
      <Button variant="secondary">Fundo Escuro</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  name: "Vitrine / Todos os tamanhos",
  render: () => (
    <div className="flex flex-wrap items-end gap-4 p-8 bg-creme">
      <Button size="sm">Pequeno</Button>
      <Button size="md">Médio</Button>
      <Button size="lg">Grande</Button>
    </div>
  ),
};
