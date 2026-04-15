import type { Meta, StoryObj } from "@storybook/react"
import { HeroSection } from "@/components/organisms/hero-section"
import { HERO_DATA } from "@/lib/constants"

const meta: Meta<typeof HeroSection> = {
  title: "Organisms/HeroSection",
  component: HeroSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Organismo O02 — Hero fullscreen com vídeo autoplay, overlay gradient, kicker, H1, subtítulo e CTA.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof HeroSection>

export const Default: Story = {
  args: {
    data: { ...HERO_DATA },
  },
}
