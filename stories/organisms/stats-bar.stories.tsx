import type { Meta, StoryObj } from "@storybook/react"
import { StatsBar } from "@/components/organisms/stats-bar"
import { STATS_DATA } from "@/lib/constants"

const meta: Meta<typeof StatsBar> = {
  title: "Organisms/StatsBar",
  component: StatsBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Organismo O03 — Grid de StatCards com counter-up animation ao entrar no viewport.",
      },
    },
  },
  argTypes: {
    theme: { control: "select", options: ["light", "dark"] },
  },
}

export default meta
type Story = StoryObj<typeof StatsBar>

export const Light: Story = {
  args: {
    data: STATS_DATA,
    theme: "light",
  },
}

export const Dark: Story = {
  args: {
    data: STATS_DATA,
    theme: "dark",
  },
}
