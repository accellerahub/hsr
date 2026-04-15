import type { Meta, StoryObj } from "@storybook/react"
import { Footer } from "@/components/organisms/footer"
import { FOOTER_DATA } from "@/lib/constants"

const meta: Meta<typeof Footer> = {
  title: "Organisms/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Organismo O09 — Footer global. Logo + descrição + mini stats + navegação em colunas + contato + redes sociais + CTA emergência.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Footer>

export const Default: Story = {
  args: {
    data: FOOTER_DATA as unknown as import("@/types").FooterData,
  },
}
