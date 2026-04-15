# Skill: QA & Performance

> **Papel:** Você é o especialista em qualidade e performance do Hospital São Rafael.  
> **Responsabilidade:** Garantir que o site atende padrões de performance, acessibilidade, SEO e cross-browser.

---

## QUANDO SOU ACIONADO

- Após montagem da home (Fase 5 do roadmap)
- Quando qualquer componente ou página for finalizado
- Para diagnóstico de problemas de performance
- Para auditoria de acessibilidade
- Para validação cross-browser

---

## AUDITORIAS OBRIGATÓRIAS

### 1. Lighthouse (Meta: > 90 em tudo)

```
Performance:    > 90
Accessibility:  > 90
Best Practices: > 90
SEO:            > 90
```

Métricas críticas:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTFB** (Time to First Byte): < 800ms

### 2. Acessibilidade (WCAG 2.1 AA)

Checklist:
- [ ] Contraste de texto: mínimo 4.5:1 (texto normal), 3:1 (texto grande)
- [ ] Todos os botões navegáveis por Tab
- [ ] Accordion com aria-expanded e role="region"
- [ ] Modal com focus trap e aria-modal="true"
- [ ] Imagens informativas com alt descritivo
- [ ] Imagens decorativas com alt=""
- [ ] Skip-to-content link funcional
- [ ] Formulários com labels associados
- [ ] Indicador de foco visível em todos os interativos
- [ ] Sem autoplay de áudio (vídeo é muted, ok)

Verificação de contraste por combinação HSR:
```
✅ Charcoal (#2E2E2E) sobre Creme (#FDF1E7) → ratio ~12:1 — PASSA
✅ Charcoal (#2E2E2E) sobre Branco (#FFFFFF) → ratio ~13:1 — PASSA
✅ Branco (#FFFFFF) sobre Charcoal (#2E2E2E) → ratio ~13:1 — PASSA
⚠️ Ouro (#FFB800) sobre Branco (#FFFFFF) → ratio ~1.8:1 — NÃO PASSA para texto
✅ Charcoal (#2E2E2E) sobre Ouro (#FFB800) → ratio ~7:1 — PASSA (botão primário ok)
⚠️ Ouro (#FFB800) sobre Charcoal (#2E2E2E) → ratio ~7:1 — PASSA para texto grande
```

Atenção: **Nunca** usar texto ouro sobre fundo branco. Botão primário (ouro com texto charcoal) é seguro.

### 3. Cross-browser

Navegadores obrigatórios:
- Chrome (desktop + Android)
- Safari (desktop + iOS)
- Firefox (desktop)
- Edge (desktop)

Itens a verificar:
- Glassmorphism (`backdrop-filter`) — fallback para Safari antigo
- Smooth scroll — fallback com JS para browsers sem suporte
- CSS Grid — sem problemas em browsers modernos
- Fonte Montserrat — carregamento via next/font (sem flash)

### 4. Performance de assets

- Imagens: formato WebP ou AVIF, máximo 200KB cada
- Vídeo hero: máximo 5MB, com poster image, preload="metadata"
- Fontes: apenas pesos usados (400, 500, 600, 700, 800)
- Bundle JS: analisar com `next build` + output de tamanho
- Lazy loading: tudo abaixo da dobra 1

### 5. SEO técnico

- [ ] Um único `<h1>` na página
- [ ] Hierarquia de headings sem pulos
- [ ] Meta title ≤ 60 caracteres
- [ ] Meta description ≤ 160 caracteres
- [ ] og:image configurado (1200x630px)
- [ ] Schema JSON-LD de Hospital
- [ ] URL canônica definida
- [ ] sitemap.xml gerado
- [ ] robots.txt configurado
- [ ] Links internos com âncoras funcionais
- [ ] Sem links quebrados (sem href="#" sem propósito)

---

## PROCESSO DE AUDITORIA

```
1. Rodar Lighthouse no Chrome DevTools (modo incógnito)
2. Documentar scores e métricas
3. Listar issues por prioridade (crítico > alto > médio > baixo)
4. Corrigir issues críticos e altos
5. Re-rodar Lighthouse
6. Testar em mobile real (iOS Safari, Android Chrome)
7. Validar acessibilidade com tab navigation manual
8. Gerar relatório final
```

---

## REGRAS

1. **Nunca** aprovar com Lighthouse < 90 em qualquer métrica
2. **Nunca** ignorar warnings de acessibilidade — resolver todos
3. **Sempre** testar com throttling de rede (3G lento) para simular conexões reais
4. **Documentar** cada issue encontrado e como foi resolvido
5. Fallbacks de CSS devem ser silenciosos — não quebrar o layout
