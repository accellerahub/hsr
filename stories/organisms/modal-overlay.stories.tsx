import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { ModalOverlay } from "@/components/organisms/modal-overlay"
import { Button } from "@/components/atoms/button"

const meta: Meta<typeof ModalOverlay> = {
  title: "Organisms/ModalOverlay",
  component: ModalOverlay,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Organismo O10 — Modal com glassmorphism, focus trap e fechamento por Escape ou click fora.",
      },
    },
  },
  argTypes: {
    maxWidth: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
}

export default meta
type Story = StoryObj<typeof ModalOverlay>

function ModalDemo(args: Partial<React.ComponentProps<typeof ModalOverlay>>) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Abrir Modal</Button>
      <ModalOverlay
        isOpen={open}
        onClose={() => setOpen(false)}
        title={args.title ?? "Título do Modal"}
        maxWidth={args.maxWidth ?? "lg"}
      >
        <p className="text-charcoal/70 leading-relaxed">
          Conteúdo dinâmico do modal. Pode conter qualquer componente React —
          descrição de especialidade, detalhes de serviço, formulário, etc.
        </p>
      </ModalOverlay>
    </div>
  )
}

export const Default: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: "Ortopedia — Procedimentos",
    maxWidth: "lg",
  },
}

export const Small: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: "Confirmação",
    maxWidth: "sm",
  },
}
