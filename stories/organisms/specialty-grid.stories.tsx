import type { Meta, StoryObj } from "@storybook/react"
import { SpecialtyGrid } from "@/components/organisms/specialty-grid"
import { ESPECIALIDADES_DATA } from "@/lib/constants"

const meta: Meta<typeof SpecialtyGrid> = {
  title: "Organisms/SpecialtyGrid",
  component: SpecialtyGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Organismo O11 — Grid de especialidades com abertura de ModalOverlay ao clicar em 'Ver procedimentos'. Variação especializada do CardGrid.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof SpecialtyGrid>

export const Default: Story = {
  args: {
    data: ESPECIALIDADES_DATA as unknown as import("@/types").EspecialidadesData,
  },
}
