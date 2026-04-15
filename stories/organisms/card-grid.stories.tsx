import type { Meta, StoryObj } from "@storybook/react"
import { CardGrid } from "@/components/organisms/card-grid"
import { SERVICOS_DATA, ESPECIALIDADES_DATA, PRODUTOS_DATA } from "@/lib/constants"
import type { ServiceItem, EspecialidadeItem, ProductItem } from "@/types"

const meta: Meta<typeof CardGrid> = {
  title: "Organisms/CardGrid",
  component: CardGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Organismo O05 — Grid responsivo. Variantes: services, specialties, products. O organismo mais reutilizável do projeto.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CardGrid>

export const Services: Story = {
  args: {
    variant: "services",
    kicker: SERVICOS_DATA.kicker,
    headline: SERVICOS_DATA.headline,
    description: SERVICOS_DATA.description,
    items: SERVICOS_DATA.items as unknown as ServiceItem[],
    id: "servicos",
    columns: 3,
  },
}

export const Specialties: Story = {
  args: {
    variant: "specialties",
    kicker: ESPECIALIDADES_DATA.kicker,
    headline: ESPECIALIDADES_DATA.headline,
    description: ESPECIALIDADES_DATA.description,
    items: ESPECIALIDADES_DATA.items as unknown as EspecialidadeItem[],
    id: "especialidades",
    columns: 3,
  },
}

export const ProductsPaciente: Story = {
  args: {
    variant: "products",
    kicker: PRODUTOS_DATA.kicker,
    headline: PRODUTOS_DATA.headline,
    description: PRODUTOS_DATA.description,
    items: PRODUTOS_DATA.categories[0].items as unknown as ProductItem[],
    audience: "paciente",
    id: "produtos",
    columns: 3,
  },
}

export const ProductsMedico: Story = {
  args: {
    variant: "products",
    kicker: PRODUTOS_DATA.kicker,
    headline: PRODUTOS_DATA.headline,
    description: PRODUTOS_DATA.description,
    items: PRODUTOS_DATA.categories[1].items as unknown as ProductItem[],
    audience: "medico",
    id: "produtos-medico",
    columns: 2,
  },
}
