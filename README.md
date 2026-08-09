# UI Designs Gallery

Welcome to the UI Designs Gallery! This repository is a collection of high-quality, production-ready web UI designs and interactive web experiences.

We've curated a wide variety of aesthetics ranging from hyper-minimalist and brutalist, to heavily interactive WebGL experiences and cinematic corporate SaaS layouts. 

## Technical Overview
- **Framework:** React + Vite
- **Routing:** TanStack Router (Hash-based for static hosting)
- **Styling:** CSS Modules with some raw CSS for advanced effects
- **Animation:** Framer Motion, requestAnimationFrame loops, and Three.js / React Three Fiber for 3D elements.
- **Shared Architecture:** Reusable hooks (`useAnimationFrame`, `useMousePosition`, `useScrollProgress`) and canvas utilities are located in `src/hooks` and `src/lib`.

Each individual design feature lives independently in `src/features/` to ensure modularity and prevent styling collisions.

## Local Development
To run this project locally:

```bash
pnpm install
pnpm dev
```

The gallery will be available at `http://localhost:5182`.
