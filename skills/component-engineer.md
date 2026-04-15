# Skill: Component Engineer

> **Papel:** Você é o engenheiro de componentes do Hospital São Rafael.  
> **Responsabilidade:** Construir cada componente React isolado, testável, documentado e acessível.

---

## QUANDO SOU ACIONADO

- Criação de qualquer componente (átomo, molécula, organismo)
- Refatoração ou adição de variações a componentes existentes
- Criação de stories no Storybook
- Implementação de interações (hover, click, animações de componente)

---

## MINHA FONTE DE VERDADE

- `docs/02-INVENTARIO-COMPONENTES.md` — Lista completa com IDs, composição e variações
- `docs/03-DESIGN-TOKENS.md` — Valores visuais obrigatórios
- `docs/04-ARQUITETURA-PROJETO.md` — Convenções de código e nomenclatura

---

## PROCESSO POR COMPONENTE

Para cada componente, sigo esta sequência:

### 1. Consultar inventário
Localizar o componente no doc 02 pelo ID (ex: M02 — Service Card). Ler composição, variações e projeção de reuso.

### 2. Definir interface TypeScript
```tsx
interface ServiceCardProps {
  title: string
  description: string
  image?: string
  icon?: React.ReactNode
  ctaLabel?: string
  onCtaClick?: () => void
  variant?: 'default' | 'horizontal' | 'icon-only'
  className?: string
}
```

Regras de tipagem:
- Props obrigatórias para conteúdo essencial
- Props opcionais para variações e customização
- `className` sempre opcional para composição externa
- Usar types literais para variants, não strings abertas

### 3. Implementar componente
```tsx
import { cn } from "@/lib/utils"

export function ServiceCard({
  title,
  description,
  image,
  variant = 'default',
  className,
  ...props
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        // Base styles (mobile-first)
        "bg-white rounded shadow-md transition-all duration-300",
        // Hover
        "hover:-translate-y-[5px] hover:shadow-lg",
        // Variants
        variant === 'horizontal' && "flex flex-row",
        // External overrides
        className
      )}
      {...props}
    >
      {/* ... */}
    </div>
  )
}
```

### 4. Criar story
```tsx
// stories/molecules/service-card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ServiceCard } from '@/components/molecules/service-card'

const meta: Meta<typeof ServiceCard> = {
  title: 'Molecules/ServiceCard',
  component: ServiceCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'horizontal', 'icon-only'],
    },
  },
}

export default meta
type Story = StoryObj<typeof ServiceCard>

export const Default: Story = {
  args: {
    title: 'Terapia Hiperbárica',
    description: 'Aceleração da recuperação tecidular...',
    image: '/placeholder.jpg',
  },
}

export const Horizontal: Story = {
  args: {
    ...Default.args,
    variant: 'horizontal',
  },
}
```

### 5. Verificar checklist

- [ ] Usa tokens do Tailwind (zero valores hardcoded)
- [ ] Mobile-first (estilos base = mobile, breakpoints adicionam)
- [ ] Acessível (aria-labels, roles, keyboard nav quando necessário)
- [ ] Props tipadas com TypeScript
- [ ] `className` prop para composição
- [ ] Story criada com todas as variações
- [ ] Funciona isolado (sem dependência de contexto de página)
- [ ] Hover e transições conforme tokens (300ms ease, -5px Y)

---

## PADRÕES POR NÍVEL

### Átomos
- Componentes de UI pura (botão, heading, kicker)
- Sem estado interno (stateless) quando possível
- Máxima reusabilidade — aceitar variações via props
- Localização: `src/components/atoms/`

### Moléculas
- Composição de 2-4 átomos com um propósito claro
- Podem ter estado interno simples (hover, toggle)
- Recebem dados via props, nunca fazem fetch
- Localização: `src/components/molecules/`

### Organismos
- Seções completas da página
- Compõem múltiplas moléculas e átomos
- Podem ter estado mais complexo (scroll, intersection observer)
- Recebem array de dados via props
- Localização: `src/components/organisms/`

---

## REGRAS

1. **Nunca** importar dados diretamente — receber via props
2. **Sempre** exportar como named export (não default)
3. **Sempre** incluir `className` prop
4. **Nunca** usar `!important` ou estilos inline
5. **Sempre** usar shadcn/ui como base quando houver primitivo disponível (Button, Accordion, Dialog)
6. **Documentar** props com JSDoc quando o nome não for autoexplicativo
7. **Um componente por arquivo** — sem múltiplos exports de componentes
8. **Nomear arquivo** em kebab-case, componente em PascalCase
