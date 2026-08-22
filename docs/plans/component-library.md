# Reusable UI Component Library

## Location
`apps/web/src/components/ui/`

## Components

### `Button` (`Button.tsx`, `Button.module.css`)
- **Variants**: `primary`, `secondary`, `outline`, `ghost`
- **Options**: `fullWidth`, `disabled`
- **Styling**: Tactile borders, sleek hover transitions, dark-mode adapted.

### `Slider` (`Slider.tsx`, `Slider.module.css`)
- **Props**: `label`, `value`, `min`, `max`, `step`, `formatValue(val)`, `onChange(val)`
- **Styling**: Minimal 2px track, circular thumb, uppercase label, monospace readout.

### `Accordion` (`Accordion.tsx`, `Accordion.module.css`)
- **Props**: `title`, `defaultOpen`, `children`
- **Features**: Native HTML `<details>` and `<summary>` styling with smooth open indicator.

### `Panel` (`Panel.tsx`, `Panel.module.css`)
- **Props**: `side` (`'left' | 'right'`), `children`, `style`
- **Features**: Rigid boundary layouts with custom subtle brutalist scrollbars.

### `Glassmorphism` (`Glassmorphism.tsx`, `Glassmorphism.module.css`)
- **Components**: `GlassCard`, `GlassPill`
- **Features**: Backdrop blur filters, frosted highlights, glowing borders.
