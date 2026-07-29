---
name: clone-website
description: A skill to clone and reverse-engineer existing websites into highly-polished React components using Vanilla CSS. Follows a systematic approach of Visual Audit, Component Inventory, Layout Architecture, Technical Stack Analysis, and Documentation Output.
---

# clone-website

This skill provides a systematic approach to reverse-engineering a target website into a clean, modern React codebase using Vanilla CSS.

## Workflow

### Phase 1: Visual Audit
Capture design tokens:
- **Colors**: background, text (primary/secondary/muted), accent, border, hover, error, success, warning
- **Typography**: font family, sizes, weights, line heights, letter spacing
- **Spacing**: padding/margin patterns (scale: 4px, 8px, 12px, 16px, 24px, 32px)
- **Border radius**: buttons, cards, avatars, inputs
- **Shadows/elevation**: card shadows, dropdown shadows, modal overlay

### Phase 2: Component Inventory
Document distinct UI components:
1. **Name**: Component name
2. **Structure**: HTML elements / child components
3. **Variants**: Sizes, colors, states
4. **States**: Default, hover, active, disabled, loading, error, empty
5. **Responsive behavior**: Breakpoints
6. **Interactions**: Click, hover, focus
7. **Animations**: Transitions, micro-interactions

### Phase 3: Layout Architecture
Analyze:
- Grid system (CSS Grid, Flexbox, Fixed widths)
- Max-width (Main content area)
- Sticky elements
- Z-index layers

### Phase 4: Technical Stack Analysis
Analyze CSS approach, state management, font loading, image strategy, animation libraries.

### Phase 5: Documentation Output
Create markdown files in `docs/research/` detailing the extracted information. Use this information to accurately build the frontend without relying on UI libraries like shadcn or Tailwind, unless explicitly requested. Rely on our highly-polished Vanilla CSS setup.
