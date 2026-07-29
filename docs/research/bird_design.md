# Bird Design tokens and structure

## Overview
A high-end venture capital or startup fund aesthetic. It combines stark brutalist white space with incredibly vibrant, glowing rainbow gradients and sophisticated serif typography.

## Design Tokens

### Colors
- `--bird-bg-light`: `#ffffff`
- `--bird-bg-dark`: `#0f172a` (Deep navy/black)
- `--bird-text-dark`: `#111827`
- `--bird-text-light`: `#ffffff`
- `--bird-gradient-vivid`: `linear-gradient(135deg, #4f46e5, #ec4899, #f59e0b)`
- `--bird-accent-orange`: `#f97316`

### Typography
- `--bird-font-serif`: `'Playfair Display', 'Garamond', serif` (Used for massive headings)
- `--bird-font-sans`: `'Inter', sans-serif` (Used for readable body copy)

### Spacing & Borders
- Generous padding (`120px` section gaps)
- Sharp corners or very minimal rounding (`2px` border-radius max) to maintain the brutalist edge.

## Component Inventory
1. **Split Hero**: 1/3 white left panel with serif headline, 2/3 dark right panel featuring a vivid glowing graphic.
2. **Stat Block**: Large numbers (`36M+`) with small sans-serif labels.
3. **Timeline Grid**: 3-column grid for "How it works" with square images and step labels.
4. **Vivid Banner**: Full-width gradient banner with a stark white logo.
5. **Icon Grid**: Minimalist black-and-white abstract symbols inside a 3x3 grid.
6. **Accordion FAQ**: Clean white rows with minimal black borders.

## Layout Architecture
- Primarily CSS Grid.
- Left-aligned typography.
- High contrast blocks (pure white blocks adjacent to pure dark blocks).
