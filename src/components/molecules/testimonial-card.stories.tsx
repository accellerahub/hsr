import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TestimonialCard } from "./testimonial-card";
import { B2B_DATA } from "@/lib/constants";

const meta: Meta<typeof TestimonialCard> = {
  title: "Molecules/TestimonialCard",
  component: TestimonialCard,
  tags: ["autodocs"],
  parameters: {
    backgrounds: { default: "Charcoal" },
    docs: {
      description: { component: "Depoimento com citação, autor e cargo. Variantes: paciente (emocional) e médico (técnico)." },
    },
  },
  args: {
    testimonial: B2B_DATA.testimonials[0],
    variant: "medico",
    theme: "dark",
  },
};

export default meta;
type Story = StoryObj<typeof TestimonialCard>;

export const Medico: Story = {
  name: "Médico (fundo escuro)",
  args: { testimonial: B2B_DATA.testimonials[0], variant: "medico", theme: "dark" },
  parameters: { backgrounds: { default: "Charcoal" } },
};

export const Light: Story = {
  name: "Light (fundo claro)",
  args: { testimonial: B2B_DATA.testimonials[0], variant: "paciente", theme: "light" },
  parameters: { backgrounds: { default: "Creme" } },
};
