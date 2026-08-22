# BotLab & Sprite Maker Studio Plan

## Overview
8-bit robot sprite mascot constructor and dedicated pixel sprite editor inspired by [olexdsgn.com/lab/botlab](https://olexdsgn.com/lab/botlab). Features swappable layered parts, decoupled palette slot rendering, intro/idle animation choreography, WebGL holographic die-cut sticker simulation, and a built-in 16×16 Sprite Maker Studio.

---

## 1. Feature Architecture

### 16×16 Layered System
- Semantic palette slots:
  - `.` Transparent
  - `o` Outline (adaptive dark-mode compensation)
  - `a` Primary base color
  - `b` Shade color
  - `c` Accent color
  - `d` Panel / inner highlight
  - `e` Glow / LED color
- Composite hierarchy: **Body → Head → Eyes → Mouth → Top**.

### Sprite Maker Studio ("Make the Sprites")
- Interactive 16×16 canvas grid with live coordinate tracking.
- Palette slot brush picker with real-time swatch preview.
- Tools: Pencil, Eraser, Paint Bucket (flood fill), Eyedropper, Horizontal Symmetry Mode, Shift/Nudge D-pad, and Undo.
- Live Robot Mascot composite updating in real-time as pixels are drawn.
- Export and import for 16-line ASCII string grids and JSON.

### Holographic Foil WebGL Shader
- Iridescent spectral sweep whose phase shifts with mouse/touch drag tilt.
- Jittered microflake glitter sparkles.
- Export to genuine vector SVG with magenta `CutContour` path for vinyl cutters.

### In-Browser Exporters
- Pure TypeScript client-side GIF89a uncompressed LZW encoder for animated GIFs.
- High-res PNG export.
