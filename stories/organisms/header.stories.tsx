import type { Meta, StoryObj } from "@storybook/react"
import { Header } from "@/components/organisms/header"
import { NAV_ITEMS, NAV_CTA } from "@/lib/constants"

const meta: Meta<typeof Header> = {
  title: "Organisms/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Organismo O01 — Navbar sticky. Transparente no hero, sólida após scroll. Drawer mobile com hamburger.",
      },
    },
  },
  argTypes: {
    scrollThreshold: { control: { type: "range", min: 0, max: 300, step: 10 } },
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {
  args: {
    navItems: [...NAV_ITEMS],
    cta: { ...NAV_CTA },
    scrollThreshold: 80,
  },
}

export const Scrolled: Story = {
  args: {
    ...Default.args,
    scrollThreshold: 0, // força estado sólido
  },
  parameters: {
    docs: { description: { story: "Estado sólido (após scroll)" } },
  },
}
