import type { Meta, StoryObj } from "@storybook/react"
import { B2BSection } from "@/components/organisms/b2b-section"
import { B2B_DATA } from "@/lib/constants"

const meta: Meta<typeof B2BSection> = {
  title: "Organisms/B2BSection",
  component: B2BSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Organismo O06 — Seção B2B (Área do Médico). Fundo charcoal, feature cards, depoimentos e CTA.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof B2BSection>

export const Default: Story = {
  args: {
    data: B2B_DATA as unknown as import("@/types").B2BData,
  },
}
