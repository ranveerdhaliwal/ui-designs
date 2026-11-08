# Demo quality standard

Each demo has its own visual identity. Share behavior and lifecycle rules before sharing page composition.

## Shared behavior

- Use `Dialog` for native focus containment, Escape, backdrop dismissal, and focus restoration. `DemoAction` composes the caller’s click handler and respects `preventDefault`.
- Use `Slider` for an explicitly associated label, displayed value, keyboard input, and formatted value text. Use `SegmentedControl` for mutually exclusive settings; it supports arrow, Home, and End keys.
- Use `useHistoryState` for bounded undo/redo. Group continuous slider or drawing changes into one edit. Use `useStoredHistory` when edits should survive reloads; it persists the committed value without a second state mirror.
- Validate persisted and imported data before applying it. Version portable documents. Reject invalid fields and out-of-range values atomically, retain a usable in-memory session when storage is blocked, and offer export for authored work.
- Use `useAsyncAction` to prevent stale asynchronous completions after cancellation, reset, or unmount. An absent integration must clearly announce a local preview.
- Use `startAnimationLoop` for decorative canvas work. Stop offscreen and hidden-tab work, provide a meaningful reduced-motion frame, repaint after resize, and dispose resources on unmount.
- Keep processing out of the UI thread when practical. Print Studio jobs own cancellable workers, close transferred bitmaps, and reject stale output. Its fallback renderer works without OffscreenCanvas. Exports preserve source aspect ratio and never upscale beyond the source dimensions.

## Feature organization

Separate state schemas and transforms from rendering. BotLab’s project validation, sprite renderer, pixel editor, and exports are independent modules. Alethia’s observations and pan/zoom geometry live outside its page. Print Studio separates recipe validation, processing, and worker transport. Relay separates seed records, validation, filtering, and CSV serialization from the workspace.

Use CSS Modules and semantic shared tokens. Remove superseded declarations instead of accumulating visual override layers. Avoid global element selectors in feature styles. Give scroll containers their own positioning context so offscreen accessible labels remain contained.

TypeScript is strict with exact optional properties. React hook ordering and dependency linting are errors. Existing indexed-access exceptions remain; Wet Paint’s retained imperative renderer is still an explicitly documented legacy exception. Its typed recipe boundary validates inputs before handing them to the isolated engine.

## Meaningful review

1. The primary action completes a useful local task, with visible state and recovery. Never imply an actual order, email, or live measurement.
2. Empty, selected, loading, success, failure, and disabled states make sense for the feature. Cancellation and repeated actions remain safe.
3. Desktop, tablet, and phone layouts work without page overflow. Deliberately wide tables scroll inside their own region.
4. Keyboard users can reach and operate controls, dialogs restore focus, and input labels name the actual input. Text and controls meet contrast requirements.
5. Normal and reduced motion both show a usable result. Observe canvas output, not just the absence of JavaScript errors.
6. Exported files contain the expected content. Imported projects round-trip custom artwork. Persistence survives an immediate reload.
7. Regenerate the gallery’s real WebP previews after material visual changes.

## Automated checks

`pnpm check` runs types, hook-aware lint, unit regressions, and the production build. `pnpm browser:check` starts a production preview and runs the route, existing interaction, and refinement suites. The refinement suite verifies the four flagship workflows and audits them with axe-core. Use `FULL_MATRIX=1`, `NORMAL_MOTION=1`, and `BROWSER=firefox` with the route suite for broader coverage. Browser checks use disposable contexts and fictional records.

The suite does not certify accessibility, replace manual visual review, or connect backend services. The large Three.js vendor chunk is loaded only for graphics routes; the homepage does not require it.
