import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatCard } from "./stat-card";
import { STATS_DATA } from "@/lib/constants";

const meta: Meta<typeof StatCard> = {
  title: "Molecules/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: "MetricNumber + label + contexto. Anima ao entrar no viewport. Use `static` no Storybook." },
    },
  },
  args: {
    stat: STATS_DATA.items[0],
    theme: "light",
    static: true,
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Light: Story = {
  args: { stat: STATS_DATA.items[0], theme: "light", static: true },
  parameters: { backgrounds: { default: "Creme" } },
};

export const Dark: Story = {
  args: { stat: STATS_DATA.items[0], theme: "dark", static: true },
  parameters: { backgrounds: { default: "Charcoal" } },
};

export const WithContext: Story = {
  args: { stat: STATS_DATA.items[3], theme: "light", static: true },
  parameters: { backgrounds: { default: "Creme" } },
};

export const MetricasHSR: Story = {
  name: "Vitrine / Todas as métricas HSR",
  render: () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-charcoal/10 bg-creme">
      {STATS_DATA.items.map((stat) => (
        <StatCard key={stat.id} stat={stat} theme="light" static />
      ))}
    </div>
  ),
};
