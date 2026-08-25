# Implementation Plan: Wet Paint Flow Integration

> **Status:** Draft for Team Review  
> **Source Inspiration:** [simonxxooxxoo/wet-paint-flow](https://github.com/simonxxooxxoo/wet-paint-flow)  
> **Target Repository:** `browser-designs`  
> **Primary Objective:** Integrate a browser-based Three.js flow-field painter that transforms 2D images and 3D scenes into wet impasto oil paintings with stable Bézier ribbon strokes.

---

## 1. Executive Summary & Vision

We will integrate the **Wet Paint Flow** engine into our UI gallery as a flagship interactive 3D WebGL experiment. Users will be able to upload images or 3D GLB models, or select built-in primitive geometries, to watch them organically repainted in a wet oil impasto style using flow-field directionality.

---

## 2. Target Experience & Features

### 🖌️ Flow Field Rendering Engine
- Extracts structure tensors, depth, and normals to build an unoriented line field.
- Integrates bidirectional cubic Bézier strokes along structural flows.
- Uses Poisson-disk sampling to stratify brush strokes into Coarse, Medium, and Fine layers.

### 🎨 Wet Impasto Shader & Physics
- **Materials:** Renders strokes using a custom height-map, moisture channel, and bristle groove simulation.
- **Lighting:** Real-time GGX microfacet lighting with dynamic light angle controls to reveal thick impasto textures.

### 🛠️ Interactive Controls
- **Source Selection:** Load default 3D geometry (Sphere, Torus, Cube, Knot), local images (JPG, PNG, WebP), or custom 3D models (GLB).
- **Growth Timeline:** Play, pause, or replay the stroke growth sequence.
- **Display Modes:** Toggle between Pure Brush, Canvas background, Blended view, or Flow Field vectors.
- **Brush Settings:** Live adjust stroke size, length, density (brush count), paint thickness, and paint dryness.

---

## 3. Component Architecture & File Layout

We will wrap the core WebGL engine and UI inside a new feature module in our React workspace.

```
apps/web/src/features/wet-paint-flow/
├── WetPaintApp.tsx             # Main React entry point and layout wrapper
├── WetPaintApp.module.css      # Brutalist / Clean CSS for the control panels
├── Engine.ts                   # Ported WebGL/Three.js flow-field engine logic
├── Shaders.ts                  # GLSL vertex/fragment shaders for the wet impasto materials
└── ui/
    ├── ControlPanel.tsx        # React component for sliders and file upload
    └── GrowthScrubber.tsx      # Timeline control for stroke growth animation
```

### Routing & Integration
- **[MODIFY]** `apps/web/src/router.tsx`: Register `/wet-paint-flow` route.
- **[MODIFY]** `apps/web/src/pages/HomePage/HomePage.tsx`: Add a feature card linking to the new flow-field painter.

---

## 4. Technical Strategy & Adaptations

- **Vanilla to React:** The original project uses vanilla JavaScript (`main.js` is ~3600 lines). We will refactor the UI bindings into React state (via Zustand or React Context) while keeping the heavy Three.js operations contained within a stable `useEffect` rendering loop inside `Engine.ts`.
- **Performance:** Instanced `BufferGeometry` will be used for rendering up to 24,000 strokes at 60 FPS without DOM or React rendering bottlenecks.
- **Assets:** Any default textures (like beige canvas backgrounds or built-in gallery images) will be stored in `apps/web/public/wet-paint/` to ensure GitHub Pages subpath compatibility.

---

## 5. Questions & Items for Team Review

1. **Standalone Page vs. Modals:** Should this be a full-screen dedicated route (like `/wet-paint-flow`), or embedded within an existing gallery page? *(Recommendation: Full-screen route to maximize canvas space).*
2. **Video Export:** The original tool supports recording stroke growth to video. Do we want to port over the `MediaRecorder` logic for exporting `.webm` or `.mp4`?
3. **Gallery Presets:** Should we pre-bundle specific public domain paintings (e.g., Starry Night) as one-click demos?

---

*Please leave comments or edit this document directly to add further specifications before we kick off development!*
