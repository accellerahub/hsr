import type { Meta, StoryObj } from "@storybook/react"
import { JourneyTimeline } from "@/components/organisms/journey-timeline"
import { JORNADA_DATA } from "@/lib/constants"

const meta: Meta<typeof JourneyTimeline> = {
  title: "Organisms/JourneyTimeline",
  component: JourneyTimeline,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Organismo O07 — Timeline da jornada do paciente. Horizontal no desktop, vertical no mobile. Scroll-triggered reveal progressivo.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof JourneyTimeline>

export const Default: Story = {
  args: {
    data: JORNADA_DATA as unknown as import("@/types").JornadaData,
  },
}
