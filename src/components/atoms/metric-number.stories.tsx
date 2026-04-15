// =============================================================================
// METRIC-NUMBER.STORIES.TSX — Átomo A08 | Hospital São Rafael
// =============================================================================

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MetricNumber } from "./metric-number";

const meta: Meta<typeof MetricNumber> = {
  title: "Atoms/MetricNumber",
  component: MetricNumber,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Número grande de destaque para métricas e estatísticas. Anima de 0 até o valor final ao entrar no viewport (counter-up). Use `static` para desabilitar a animação em testes ou SSR.",
      },
    },
  },
  argTypes: {
    value: {
      control: { type: "number" },
      description: "Valor numérico final",
    },
    prefix: {
      control: "text",
      description: 'Texto antes do número (ex: "+", "R$ ")',
    },
    suffix: {
      control: "text",
      description: 'Texto depois do número (ex: " mil", "%")',
    },
    color: {
      control: "select",
      options: ["charcoal", "ouro", "light", "azul"],
      table: { defaultValue: { summary: "charcoal" } },
    },
    size: {
      control: "select",
      options: ["md", "lg", "xl"],
      table: { defaultValue: { summary: "lg" } },
    },
    static: {
      control: "boolean",
      description: "Mostra valor final sem animação",
    },
  },
  args: {
    value: 12000,
    prefix: "+",
    suffix: "",
    color: "charcoal",
    size: "lg",
    static: true,
  },
};

export default meta;
type Story = StoryObj<typeof MetricNumber>;

// ---------------------------------------------------------------------------
// Exemplos reais HSR
// ---------------------------------------------------------------------------

export const PacientesAtendidos: Story = {
  name: "Pacientes atendidos",
  args: { value: 12000, prefix: "+", suffix: "", static: true },
};

export const InvestimentoMilhoes: Story = {
  name: "Investimento (R$ milhões)",
  args: { value: 170, prefix: "R$ ", suffix: " milhões", static: true },
};

export const AnosDeOperacao: Story = {
  name: "Anos de operação",
  args: { value: 20, prefix: "+", suffix: " anos", static: true },
};

export const TaxaSatisfacao: Story = {
  name: "Taxa de satisfação (%)",
  args: { value: 98, prefix: "", suffix: "%", static: true },
};

// ---------------------------------------------------------------------------
// Tamanhos
// ---------------------------------------------------------------------------

export const SizeMd: Story = {
  name: "Tamanho / Médio",
  args: { size: "md", value: 12000, prefix: "+" },
};

export const SizeLg: Story = {
  name: "Tamanho / Grande",
  args: { size: "lg", value: 12000, prefix: "+" },
};

export const SizeXl: Story = {
  name: "Tamanho / Extra grande",
  args: { size: "xl", value: 12000, prefix: "+" },
};

// ---------------------------------------------------------------------------
// Cores
// ---------------------------------------------------------------------------

export const ColorOuro: Story = {
  name: "Cor / Ouro",
  args: { color: "ouro", value: 170, prefix: "R$ ", suffix: " mi" },
  parameters: { backgrounds: { default: "Creme" } },
};

export const ColorAzul: Story = {
  name: "Cor / Azul",
  args: { color: "azul", value: 98, suffix: "%" },
  parameters: { backgrounds: { default: "Creme" } },
};

export const ColorLight: Story = {
  name: "Cor / Light (fundo escuro)",
  args: { color: "light", value: 20, prefix: "+", suffix: " anos" },
  parameters: { backgrounds: { default: "Charcoal" } },
};

// ---------------------------------------------------------------------------
// Vitrine — métricas do HSR
// ---------------------------------------------------------------------------

export const MetricasHSR: Story = {
  name: "Vitrine / Métricas reais HSR",
  render: () => (
    <div className="p-8 bg-charcoal grid grid-cols-2 gap-8 md:grid-cols-4">
      <div className="text-center">
        <MetricNumber value={12000} prefix="+" color="ouro" size="lg" static />
        <p className="text-white/70 text-sm mt-2 uppercase tracking-wider">Pacientes</p>
      </div>
      <div className="text-center">
        <MetricNumber value={170} prefix="R$ " suffix=" mi" color="ouro" size="lg" static />
        <p className="text-white/70 text-sm mt-2 uppercase tracking-wider">Investimento</p>
      </div>
      <div className="text-center">
        <MetricNumber value={20} prefix="+" suffix=" anos" color="ouro" size="lg" static />
        <p className="text-white/70 text-sm mt-2 uppercase tracking-wider">De operação</p>
      </div>
      <div className="text-center">
        <MetricNumber value={98} suffix="%" color="ouro" size="lg" static />
        <p className="text-white/70 text-sm mt-2 uppercase tracking-wider">Satisfação</p>
      </div>
    </div>
  ),
};
