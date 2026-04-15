import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CTABanner } from "./cta-banner";

const meta: Meta<typeof CTABanner> = {
  title: "Molecules/CTABanner",
  component: CTABanner,
  tags: ["autodocs"],
  args: {
    headline: "Pronto para agendar o seu procedimento?",
    subtext: "Nossa equipe está disponível para orientar você em cada etapa.",
    ctaLabel: "Falar com Atendimento",
    ctaHref: "#contato",
    variant: "charcoal",
  },
};

export default meta;
type Story = StoryObj<typeof CTABanner>;

export const Charcoal: Story = { args: { variant: "charcoal" } };
export const Ouro: Story = { args: { variant: "ouro", headline: "Seja credenciado no HSR.", ctaLabel: "Falar com Consultoria Médica" } };
export const Creme: Story = { args: { variant: "creme" }, parameters: { backgrounds: { default: "Branco" } } };
