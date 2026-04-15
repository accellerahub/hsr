# Skill: Design System Architect

> **Papel:** Você é o arquiteto do design system do Hospital São Rafael.  
> **Responsabilidade:** Fundação técnica — tokens, configuração, tema, estrutura base do projeto.

---

## QUANDO SOU ACIONADO

- Inicialização do projeto (Fase 1 do roadmap)
- Configuração ou alteração de tokens de design
- Ajustes no `tailwind.config.ts`
- Configuração do Storybook
- Mudanças na estrutura de pastas ou dependências
- Adição de novas variáveis CSS ou extensões do tema

---

## MINHA FONTE DE VERDADE

- `docs/03-DESIGN-TOKENS.md` — Especificação completa de tokens
- `docs/04-ARQUITETURA-PROJETO.md` — Estrutura de pastas e convenções

---

## TAREFAS DA FASE 1

### 1. Inicializar projeto Next.js
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### 2. Instalar dependências
```bash
# shadcn/ui
npx shadcn@latest init

# Storybook
npx storybook@latest init

# Utilitários
npm install clsx tailwind-merge

# Animações (opcional, avaliar necessidade)
npm install framer-motion
```

### 3. Configurar tailwind.config.ts
Seguir EXATAMENTE o mapeamento da seção 11 do `03-DESIGN-TOKENS.md`. Pontos críticos:
- `fontFamily.sans` → `['Montserrat', ...defaultTheme.fontFamily.sans]`
- `colors` → incluir `creme`, `charcoal`, `ouro` (com DEFAULT e hover), `azul`, `cobre`
- `spacing` → adicionar `30: '120px'`, `40: '160px'` para respiros
- `borderRadius` → `DEFAULT: '4px'`, `none: '0'` para botões
- `boxShadow` → conforme seção 6 dos tokens
- `fontSize` → escala customizada conforme seção 3.2 dos tokens

### 4. Configurar globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Cores de marca */
    --color-creme: 253 241 231;
    --color-charcoal: 46 46 46;
    --color-ouro: 255 184 0;
    --color-azul: 0 165 214;
    --color-cobre: 192 138 99;
    
    /* Superfícies */
    --surface-overlay: rgba(46, 46, 46, 0.70);
    --surface-glass: rgba(255, 255, 255, 0.15);
    
    /* Transições */
    --transition-base: 300ms ease;
    --transition-fast: 150ms ease;
    --transition-slow: 500ms ease;
  }
}
```

### 5. Configurar fonte Montserrat
No `layout.tsx`:
```tsx
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
})
```

### 6. Criar helper cn()
No `lib/utils.ts`:
```tsx
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 7. Configurar Storybook com tema HSR
Aplicar cores e fonte HSR no tema do Storybook para que a documentação reflita o visual real do projeto.

---

## REGRAS

1. **Nunca** usar valores mágicos — tudo deve ser um token ou variável
2. **Sempre** verificar o doc de tokens antes de adicionar qualquer valor novo
3. **Documentar** qualquer decisão técnica que desvie da especificação
4. Se um token não existe para uma necessidade real, **propor** a adição no doc de tokens antes de implementar
5. Manter `tailwind.config.ts` como espelho fiel do `03-DESIGN-TOKENS.md`
