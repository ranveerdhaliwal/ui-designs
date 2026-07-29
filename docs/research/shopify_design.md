# Shopify Editions Winter 2026

## Overview
Shopify Editions pages are pinnacle examples of modern design engineering. The Winter '26 "Renaissance" edition relies on stark monochromatic contrast, massive typography, scroll-linked animations, and complex data-viz/bento-box layouts to showcase 150+ product updates.

## Design Tokens

### Colors
- `--sh-bg-dark`: `#000000`
- `--sh-bg-light`: `#F7F7EE` (Parchment white)
- `--sh-text-primary`: `#FFFFFF`
- `--sh-text-inverse`: `#000000`
- `--sh-text-muted`: `#8C8C8C`
- `--sh-accent-purple`: `#8051FF`
- `--sh-border-dark`: `rgba(255, 255, 255, 0.1)`

### Typography
- `--sh-font-sans`: `'Manrope', 'Inter', sans-serif` (Substituting PP Neue Montreal)
- Titles: Often rendered as massive SVGs to guarantee perfect kerning, but we will emulate with massive `12vw` typography and tight tracking (`letter-spacing: -0.04em`).

### Spacing & Borders
- Generous internal padding within cards (`2rem` to `4rem`).
- Fine `1px` borders separating bento box items (`rgba(255, 255, 255, 0.1)`).

## Layout Architecture & Component Inventory

1. **Global Navigation**: Fixed, transparent to solid on scroll. Uses a deep blur (`backdrop-filter`) and features a left-aligned dropdown menu and right-aligned CTA ("Start for free").
2. **Massive Hero Typography**: The word "RENAISSANCE" takes up the entire viewport, masked with gradients or SVG clipping paths. 
3. **Bento Grid**: A heavily structured grid layout with 1px borders between cells. Some cells are purely typographic ("Sidekick", "Agentic"), others feature dark overlays.
4. **Scroll Animations**: Elements fade and translate upwards (`translateY`) as they enter the viewport. We will emulate this with CSS keyframes or static polished states.
