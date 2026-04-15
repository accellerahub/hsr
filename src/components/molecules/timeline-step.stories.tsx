import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TimelineStep } from "./timeline-step";
import { JORNADA_DATA } from "@/lib/constants";

const meta: Meta<typeof TimelineStep> = {
  title: "Molecules/TimelineStep",
  component: TimelineStep,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: "Etapa da jornada do paciente com número, título, descrição e links relacionados. Conector visual automático." },
    },
  },
  args: {
    step: JORNADA_DATA.steps[0],
    isLast: false,
    direction: "horizontal",
    isActive: false,
  },
};

export default meta;
type Story = StoryObj<typeof TimelineStep>;

export const Horizontal: Story = {
  args: { step: JORNADA_DATA.steps[0], direction: "horizontal" },
  parameters: { backgrounds: { default: "Creme" } },
};

export const Ativo: Story = {
  args: { step: JORNADA_DATA.steps[2], direction: "horizontal", isActive: true },
  parameters: { backgrounds: { default: "Creme" } },
};

export const JornadaCompleta: Story = {
  name: "Vitrine / Jornada completa (horizontal)",
  render: () => (
    <div className="flex gap-0 p-8 bg-creme overflow-x-auto">
      {JORNADA_DATA.steps.map((step, i) => (
        <TimelineStep
          key={step.id}
          step={step}
          isLast={i === JORNADA_DATA.steps.length - 1}
          direction="horizontal"
          isActive={i === 1}
        />
      ))}
    </div>
  ),
};

export const JornadaVertical: Story = {
  name: "Vitrine / Jornada (vertical — mobile)",
  render: () => (
    <div className="flex flex-col p-8 bg-creme max-w-sm">
      {JORNADA_DATA.steps.map((step, i) => (
        <TimelineStep
          key={step.id}
          step={step}
          isLast={i === JORNADA_DATA.steps.length - 1}
          direction="vertical"
        />
      ))}
    </div>
  ),
};
