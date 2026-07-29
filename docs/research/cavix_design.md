# CAVIX Design tokens and structure

## Overview
A retro-tech, brutalist, and pixel-art infused aesthetic. It evokes 80s/90s technical manuals and digital realms.

## Design Tokens

### Colors
- `--cavix-bg-beige`: `#f3ebd7` (Warm, aged paper beige)
- `--cavix-ink-black`: `#1c1c1c` (Charcoal/black)
- `--cavix-accent-yellow`: `#d4b06a`

### Typography
- `--cavix-font-pixel`: `'Press Start 2P', 'VT323', monospace` (For large numbers, logos, accents)
- `--cavix-font-mono`: `'Space Mono', monospace` (For data readouts)
- `--cavix-font-sans`: `'Helvetica', sans-serif` (For longer readable descriptions)

### Spacing & Borders
- `--cavix-border-thin`: `1px solid var(--cavix-ink-black)`
- Elements are often surrounded by visible borders or grid lines.
- Corners are sharp, `border-radius: 0`.

## Component Inventory
1. **Dossier Card**: Card containing small technical details (Studio ID, Division, Status, Role) rendered in monospace.
2. **Pixelated Logo/Number**: Massive pixel art numbers ("2026") intersecting with solid black backgrounds.
3. **Halftone Image**: Photographs treated with a bitmap/dither or halftone filter to look retro.
4. **Blueprint Frame**: Main container has corner crop marks or framing dots.

## Layout Architecture
- Strict box-model grid.
- Elements touch borders directly.
- Heavy use of solid block colors with contrasting text.
