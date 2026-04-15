import type { Meta, StoryObj } from "@storybook/react"
import { FAQSection } from "@/components/organisms/faq-section"
import { FAQ_DATA } from "@/lib/constants"

const meta: Meta<typeof FAQSection> = {
  title: "Organisms/FAQSection",
  component: FAQSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Organismo O08 — Seção FAQ. Layout 2 colunas (heading fixo + accordion). Accordion Radix UI com transições suaves.",
      },
    },
  },
  argTypes: {
    background: { control: "select", options: ["white", "creme"] },
  },
}

export default meta
type Story = StoryObj<typeof FAQSection>

export const White: Story = {
  args: {
    data: FAQ_DATA as unknown as import("@/types").FAQData,
    background: "white",
  },
}

export const Creme: Story = {
  args: {
    ...White.args,
    background: "creme",
  },
}
