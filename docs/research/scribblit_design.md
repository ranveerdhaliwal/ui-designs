# Scribblit Design tokens and structure

## Overview
A friendly, modern productivity app/SaaS aesthetic. Highly accessible, heavily rounded, utilizing soft gradients and glassmorphism.

## Design Tokens

### Colors
- `--scribblit-sky-light`: `#e0f2fe`
- `--scribblit-sky-primary`: `#38bdf8`
- `--scribblit-sky-dark`: `#0284c7`
- `--scribblit-green-light`: `#dcfce7`
- `--scribblit-green-primary`: `#4ade80`
- `--scribblit-bg`: `#ffffff`
- `--scribblit-text`: `#334155`

### Typography
- `--scribblit-font-sans`: `'Nunito', 'Rounded Mplus 1c', 'Inter', sans-serif` (Friendly, rounded sans)

### Spacing & Borders
- `--scribblit-radius-lg`: `16px`
- `--scribblit-radius-xl`: `24px`
- `--scribblit-radius-pill`: `999px`
- `--scribblit-shadow-soft`: `0 10px 40px -10px rgba(56, 189, 248, 0.2)`
- `--scribblit-shadow-glass`: `inset 0 1px 1px rgba(255, 255, 255, 0.4)`

## Component Inventory
1. **Soft Hero**: Large rounded container with a sky blue gradient, floating clouds, and a crisp white app interface floating inside.
2. **Glassmorphic App Window**: White translucent background (`rgba(255, 255, 255, 0.7)`), background blur (`backdrop-filter: blur(10px)`).
3. **Bubbly Cards**: Features broken down into heavily rounded cards with pastel backgrounds (green, blue, grey).
4. **Pricing Table**: Two-column layout, "Starter" and "Pro". "Pro" is highlighted with a shadow and solid background.
5. **Mountain Footer**: Footer graphic featuring a photorealistic mountain blending into the blue gradient.

## Layout Architecture
- Lots of negative space.
- Floating components (items don't touch the edges of their containers).
- Centered alignments for feature highlights.
