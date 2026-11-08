# Browser Designs

An independent collection of 31 interactive interface studies: editorial websites, illustrated forms, motion experiments, mobile flows, and creative tools. Each study has its own visual identity; navigation, accessibility primitives, state handling, and quality checks are shared.

These are frontend demos. Authentication, mailing lists, orders, and marketing workflows run as local previews unless an explicit integration callback is supplied. The planner, wellness journal, robot projects, field notes, print recipes, sample bag, speaker notes, and operations workspace use validated browser storage. Image processing and exports happen locally; Print Studio uses a cancellable worker where OffscreenCanvas is available.

## Development

Use Node 22 and pnpm 9.15.0 (pinned in `packageManager`).

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open **http://127.0.0.1:5182/ui-designs/**. Routes use hash history for static hosting. The `/ui-designs/` base is intentional; asset URLs must go through `getAssetUrl`.

```sh
pnpm check             # TypeScript, ESLint, regression tests, production build
pnpm format:check      # Consistent source formatting
pnpm format            # Apply formatting
pnpm --filter @browser-designs/web preview
```

## Browser verification

Start the dev server, then:

```sh
pnpm exec playwright install chromium
pnpm verify:demos         # 31 demos + homepage at desktop and phone widths
pnpm verify:interactions  # Forms, variants, storage, downloads, dialogs, navigation
pnpm verify:refinements   # Editor project round trips, operations workflows, WCAG checks
pnpm verify:orrery        # SVG scroll choreography, still mode, export, accessibility
pnpm previews            # Regenerate committed WebP gallery previews
pnpm browser:check       # Start a preview server and test the production build
```

`BASE_URL` overrides the server URL. `CHROMIUM_PATH` can select an existing browser binary. `REPORT_PATH` overrides the route report location (default `/tmp/browser-designs-verification.json`). `FULL_MATRIX=1` adds a tablet viewport. `NORMAL_MOTION=1` enables animation. `BROWSER=firefox` selects Firefox after `pnpm exec playwright install firefox`. The route suite checks uncaught errors, missing images, error fallbacks, and horizontal page overflow. The interaction suite checks meaningful flows and nonempty downloaded files. It uses temporary browser storage and sample form data.

## Structure

- `apps/web/src/data/demos.ts`: typed catalogue consumed by the homepage and router. Add entries here and a lazy component mapping in `router.tsx`.
- `components/gallery`: shared navigation, cards, and gallery styles. Previews live in `public/previews`.
- `components/ui`: buttons, sliders, native dialogs, presentation controls, workflow previews, and graphics fallback boundaries.
- `features`: isolated demos and their CSS Modules. A shared component should describe behavior; brand styling stays inside its feature.
- `hooks/useStoredState.ts` and `useStoredHistory.ts`: validated persistence, bounded undo/redo, and a usable fallback when storage is blocked.
- `lib/animation.ts`: shared offscreen, background-tab, reduced-motion, and cleanup behavior.
- `features/operations`: Relay, a complete local operations workflow with filters, sorting, bulk updates, notes, assignment, CSV export, and derived workload metrics.
- `lib`: base-aware asset paths, canvas helpers, and export lifecycle helpers.
- `tests`: regression coverage for route registration, search, invalid stored data, failed callbacks, onboarding, and image processing.

### Motion and graphics

Respect reduced motion and clean up timers, observers, animation frames, and graphics resources. The motion library mounts experiments near the viewport and offers pause/replay controls. Three.js loads with the relevant routes; its vendor chunk remains relatively large, but is not required by the homepage.

Wet Paint is an isolated second Vite entry (`wet-paint.html`) inside an iframe. Its existing imperative engine owns its document, CSS, listeners, and WebGL lifecycle. This prevents global styles from breaking the gallery and disposes the engine on navigation. **The retained engine is a documented legacy TypeScript/lint exception**, not a fully typed React implementation. The scroll-scrub engine is also retained behind a typed adapter for future video use; the current Elsewhere study uses local landscape imagery.

See [the demo quality standard](docs/DEMO_STANDARD.md) for the reusable patterns and review checklist.

### Orrery: an asset-free scroll study

`features/orrery` contains a three-act SVG instrument: counter-rotating scales, an exploded view, and a drawn constellation. Motion is derived from scroll position, so reversing scroll reverses the sequence without timers or accumulated state. `scene.ts` keeps geometry and readable transition colors separate from the SVG and page layout. The demo uses existing Framer Motion, system fonts, and authored SVG; no new dependencies or artwork are required. It includes chapter navigation, still/reduced-motion modes, and export of the current SVG plate. Browser tests also run with the shared app shell’s external fonts blocked.

## Reusing a study

Copy its component, CSS Module, local assets, and imported helpers. Keep accessible labels, focus states, native validation, error feedback, and reduced-motion behavior intact. Illustrated forms accept typed asynchronous callbacks: resolving `false` or rejecting shows an error; an absent callback announces a local preview. Connect and test real backend services before using these forms as production authentication or subscription flows.

CI runs formatting, lint, typecheck, tests, and build on pull requests. Deployment uses the pinned toolchain and a frozen lockfile. CI also runs the Chromium browser suites against the production build. The flagship workflow suite includes automated WCAG 2.0/2.1 AA checks. Firefox route checks are also available locally; automated checks are not an accessibility certification.

## References

See [REFERENCES.md](REFERENCES.md) for preserved inspiration sources and their verification status. Brand-inspired studies are independent concepts. Existing artwork and reference files are retained; review their provenance and usage rights before publishing them as a commercial product.

### Four more motion exhibits

- **Paper Worlds** (`#/paper-worlds`): layered SVG terrain, parallax travel, and day-to-night lighting.
- **Precision** (`#/precision`): a lifting watch dial, counter-rotating gears, and exploded assembly.
- **Chromatic** (`#/chromatic`): prism refraction, interference waves, and an adjustable light angle.
- **Metamorphosis** (`#/metamorphosis`): 3,000 canvas particles moving continuously between typography, fabric, and architecture.

All artwork is generated in code. No new dependencies, downloaded artwork, or remote assets are required by these studies. The exhibits share native scroll navigation, chapter snapshots for reduced motion, pause/resume, and the existing animation lifecycle for offscreen and hidden-tab suspension. Each renderer and its geometry remain separate. `pnpm verify:motion` checks all four across desktop, mobile, short-screen, normal/reduced-motion, keyboard, and accessibility scenarios. Set `BROWSER=firefox` for Firefox, or `CAPTURE_SHOTS=1` to save chapter screenshots under `/tmp`.
