import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FAQList } from "./faq-item";
import { FAQ_DATA } from "@/lib/constants";

const meta: Meta<typeof FAQList> = {
  title: "Molecules/FAQList",
  component: FAQList,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: "Lista de FAQs com accordion Radix UI. Abre um item por vez. Animação suave de expand/collapse." },
    },
  },
  args: {
    items: [...FAQ_DATA.items],
    theme: "light",
    type: "single",
  },
};

export default meta;
type Story = StoryObj<typeof FAQList>;

export const Light: Story = {
  args: { items: [...FAQ_DATA.items], theme: "light" },
  parameters: { backgrounds: { default: "Creme" } },
};

export const Dark: Story = {
  args: { items: [...FAQ_DATA.items], theme: "dark" },
  parameters: { backgrounds: { default: "Charcoal" } },
};
