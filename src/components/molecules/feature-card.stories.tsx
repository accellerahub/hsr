import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FeatureCard } from "./feature-card";
import { B2B_DATA } from "@/lib/constants";

const meta: Meta<typeof FeatureCard> = {
  title: "Molecules/FeatureCard",
  component: FeatureCard,
  tags: ["autodocs"],
  parameters: {
    backgrounds: { default: "Charcoal" },
    docs: {
      description: { component: "Card B2B com métrica/ícone + título + descrição. Fundo escuro, acento ouro. Usado na Área do Médico." },
    },
  },
  args: { feature: B2B_DATA.features[0] },
};

export default meta;
type Story = StoryObj<typeof FeatureCard>;

export const ComMetrica: Story = {
  name: "Com métrica",
  args: { feature: B2B_DATA.features[0] },
};

export const ComIcone: Story = {
  name: "Com ícone",
  args: { feature: B2B_DATA.features[1] },
};

export const Grid: Story = {
  name: "Vitrine / Grid B2B",
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 p-8 bg-charcoal">
      {B2B_DATA.features.map((f) => (
        <FeatureCard key={f.id} feature={f} />
      ))}
    </div>
  ),
};
