# Implementation Plan: ThreeUI 3D WebGL Showcase & Interactive Sites

> **Status:** Draft for Team Review  
> **Source Inspiration:** [MengTo/threeui](https://github.com/MengTo/threeui) (ThreeUI Community Edition)  
> **Target Repository:** `browser-designs`  
> **Primary Objective:** Integrate cutting-edge Three.js, WebGL shaders, 3D landing pages, and a dedicated interactive ThreeUI Explorer into our UI gallery.

---

## 1. Executive Summary & Vision

The `threeui` repository showcases state-of-the-art WebGL techniques combining Three.js 3D scenes, custom GLSL fragment shaders, interactive physics, and high-end typography recipes (Instrument Serif, Onest, Newsreader, Geist). 

We plan to create a dedicated **ThreeUI Showcase Hub** (`/threeui`) along with 4 standalone full-fidelity 3D landing pages in our gallery.

```
┌────────────────────────────────────────────────────────────────────────┐
│                     THREEUI EXPLORER & STUDIO HUB                      │
│                                                                        │
│  [Scene Selector] [Live Uniforms HUD] [Typography Recipes] [Full-Screen]│
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                                                                  │  │
│  │                     Active WebGL Canvas                          │  │
│  │          (Kage / Sylva / Bookshelf / Emerald / Vortex)           │  │
│  │                                                                  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│  [Code / Shader Inspector]  [Performance Metrics]  [Asset Controls]     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Target Experiences for Implementation

### 🌑 A. Kage — Kyoto Temple Night Walk
- **Visual Aesthetic:** Charred cypress wood, vermilion moon, glowing lantern light pools, and falling ember particle fields.
- **Key Technical Mechanics:**
  - Real-time particle simulation with gravity, wind jitter, and depth attenuation.
  - Directional lantern lighting with soft penumbra calculations.
  - Dual Japanese / Western typography hierarchy (`Noto Serif JP` + `Onest`).
  - Chapter-linked narrative scroll progression.

### 🌿 B. Sylva — Living 3D World (Inner Green)
- **Visual Aesthetic:** Subterranean moss greens, layered organic plant root geometries, and soft clay material cards.
- **Key Technical Mechanics:**
  - Cursor-tracking radial light pool on the reference floor.
  - Multi-plane depth parallax responding to scroll and pointer movement.
  - Interactive material inspection cards with subtle normal mapping.

### 📚 C. Field Manuals & Working Volumes — Interactive 3D Bookshelf
- **Visual Aesthetic:** Earth-toned editorial library celebrating modern AI engineering tools (Claude Code, Codex, Cursor).
- **Key Technical Mechanics:**
  - Live 3D book models rendered in WebGL with canvas-generated cover and spine textures.
  - Spine embossing and metallic foil reflections.
  - Hover lift physics, 3D rotational examination, and chapter inspection modal.

### 🌊 D. Emerald Horizon & Procedural GLSL Shaders
- **Visual Aesthetic:** Shimmering refractive liquid waves, neon emerald sweeps, chromatic aberration, and holographic edge glow.
- **Key Technical Mechanics:**
  - Raw GLSL fragment/vertex shader renderer running at 60-120fps with minimal GPU overhead.
  - Dynamic Uniforms exposed to user controls:
    - `u_speed`: Wave propagation speed (0.1x – 3.0x).
    - `u_wave_scale`: Simplex noise frequency and zoom.
    - `u_variation`: Multi-octave turbulence factor.
    - `u_glow`: Spectral luminance and peak glow multiplier.
    - `u_vignette`: Falloff radius.
    - `u_hue`: Real-time color wheel rotation (0° – 360°).

### 🌀 E. Typography Vortex & Stream Convergence
- **Visual Aesthetic:** Hypnotic infinite rotating typography tunnel and high-frequency algorithmic financial data streams.
- **Key Technical Mechanics:**
  - Cylinder geometry with repeated canvas typography textures.
  - Counter-rotating rings with depth fog attenuation and acceleration controls.

---

## 3. Component Architecture & File Layout

```
apps/web/src/features/threeui/
├── ThreeuiExplorer.tsx          # Central studio hub with scene switcher and floating HUD
├── ThreeuiExplorer.module.css   # Dark glassmorphism HUD styling
├── threeuiData.ts               # Shader definitions, catalog metadata, uniforms, recipes
├── EmeraldHorizon.tsx           # Standalone WebGL GLSL wave canvas component
├── TypographyVortex.tsx         # 3D Three.js rotating typography tunnel
├── StreamConvergence.tsx        # Algorithmic financial data stream canvas
├── KagePage.tsx                 # Full-screen Kyoto Night Walk experience
├── SylvaPage.tsx                # Full-screen Living 3D World plant stage
└── BookshelfPage.tsx            # Full-screen 3D interactive bookshelf
```

---

## 4. Design System & Typography Recipes

ThreeUI relies heavily on curated typography recipes. We will support live font swapping:

| Recipe Name | Heading Font | Body Font | Palette Highlight |
|---|---|---|---|
| **Editorial Serif** | *Instrument Serif* | *Newsreader* | `#e0231c` (Vermilion) |
| **Clean Modern** | *Onest* | *Geist* | `#00ffaa` (Emerald) |
| **Technical Brutalist** | *JetBrains Mono* | *Inter* | `#ff007f` (Cyber Pink) |
| **Classic Academic** | *Iowan Old Style* | *Palatino* | `#c3a47b` (Warm Clay) |

---

## 5. Deployment & Asset Strategy

- **GitHub Pages Subpath Handling:** All asset references must route through `getAssetUrl()` to support the `/ui-designs/` base URL without 404s.
- **Bundle Optimization:** Static HTML pages and pre-baked textures will live in `apps/web/public/threeui/` to ensure lazy loading and zero impact on initial homepage load times.
- **Responsive Fallbacks:** Mobile devices with reduced GPU capabilities will automatically clamp `devicePixelRatio` to `2.0` max and reduce particle counts.

---

## 6. Questions & Items for Team Review

Before we proceed with the code implementation, please review the following points:

1. **Integration Style:**
   - **Option A (Recommended):** Build both the unified **ThreeUI Studio Hub** (`/threeui`) with the live tweak HUD *and* individual standalone routes (`/threeui/kage`, `/threeui/sylva`, etc.) for fullscreen sharing.
   - **Option B:** Build only standalone full-page routes linked directly from the home gallery.
2. **Asset Packaging:**
   - Should 3D models and textures be bundled locally in `public/threeui/` or loaded dynamically? (Local bundling recommended for reliability).
3. **Sound Effects / Audio:**
   - Do we want ambient temple/nature sound generators for Kage and Sylva (opt-in with mute toggle)?

---

*Please leave comments or edit this document directly to add further specifications before we kick off development!*
