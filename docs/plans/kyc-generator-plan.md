# KYC Generative 3D Portrait & Ink Cross-Hatching Plan

## Overview
Recreation of the [jack.art/kyc/create](https://jack.art/kyc/create) generative portrait app. Provides real-time 3D geometry manipulation, lighting elevation and direction controls, and custom WebGL cross-hatching/ink shaders with direct image export capabilities.

---

## 1. Feature Breakdown

### 3D Stage & Geometry
- Interactive Three.js canvas with smooth camera orbit constraints.
- Real-time geometric subdivision and vertex displacement mapped to the "Face Shape" slider.
- High-precision normal and view vector calculation.

### Custom Ink Cross-Hatching Shader
- Multi-directional screen-space line hatching based on diffuse light thresholds.
- Configurable uniforms:
  - `uLineSpacing`: Line pitch and frequency.
  - `uInkWeight`: Line thickness and dark area saturation.
  - `uInvert`: Stark black-on-white or white-on-black inverted print mode.
  - `uLightDir`: Vector computed from elevation & direction angles.

### Brutalist 3-Column Workspace
- **Left Panel**: Patron edition details, live auction counter, wallet connect CTA.
- **Center Stage**: Square 1080×1080 canvas viewport, download PNG snapshot button, reset and invert controls.
- **Right Panel**: Accordion groups for Head, Light, and Ink parameters.
