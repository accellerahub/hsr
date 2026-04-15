import type { Meta, StoryObj } from "@storybook/react"
import { ContentBlock } from "@/components/organisms/content-block"
import { DIFERENCIAIS_DATA } from "@/lib/constants"

const meta: Meta<typeof ContentBlock> = {
  title: "Organisms/ContentBlock",
  component: ContentBlock,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Organismo O04 — Layout assimétrico texto+imagem. Usado na dobra de Diferenciais.",
      },
    },
  },
  argTypes: {
    imagePosition: { control: "select", options: ["right", "left"] },
    background: { control: "select", options: ["white", "creme", "charcoal"] },
  },
}

export default meta
type Story = StoryObj<typeof ContentBlock>

const baseData = DIFERENCIAIS_DATA as unknown as import("@/types").ContentBlockData

export const ImageRight: Story = {
  args: {
    data: baseData,
    imagePosition: "right",
    background: "creme",
  },
}

export const ImageLeft: Story = {
  args: {
    ...ImageRight.args,
    imagePosition: "left",
  },
}

export const DarkBackground: Story = {
  args: {
    ...ImageRight.args,
    background: "charcoal",
  },
}

export const TextOnly: Story = {
  args: {
    data: { ...baseData, image: undefined },
    background: "white",
  },
}
