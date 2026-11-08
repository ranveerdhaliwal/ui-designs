# Project References & Inspiration

This document serves as a permanent archive of the brilliant links, inspiration sources, and libraries we discussed while building this highly polished UI collection.

### Websites & Libraries
- [OriginKit](https://www.originkit.dev/): A fantastic showcase of 23 complex animations (mesh, infinite gallery, kinetic grid, etc). Major inspiration for the Quasar showcase.
- [Backgrounds Supply](https://backgrounds.supply/freebies): Beautiful background inspiration and freebies for the Big Bold Hero concepts.
- [Scroll-World (oso95)](https://github.com/oso95/scroll-world): The incredible vanilla JS scrub engine that we ported into our React `ScrollEngine` to power seamless Veo video scrubbing.
- [MotionSites AI](https://motionsites.ai/): Curated collection of high-aesthetic 3D & motion landing pages, creative footers, editorial waitlists, and interactive prompt designs.

### Images
All historical reference images (including Shopify screenshots, Big Bold Hero inspiration, Ostra/Lumen/Vanta concepts, and the massive gradient/marketing moodboards) have been permanently archived in `apps/web/public/references/` within this project.
- `motionsites_references.png`: 4 distinct archetypes (Vitra sunny editorial waitlist, Floren painterly landscape & footer, Castle 1-bit dithered stone waitlist, and Monochrome film grain auth card).


## Living verification ledger — 2026-10-18

The links and attachments above predate this implementation pass. Their original receipt dates were not recorded; **2026-10-18 is the ledger review date, not a reconstructed receipt date**. No external source was downloaded or independently reverified during this pass. Local testing validates this repository's implementation, not claims made by the original sites.

| Exact source / attachment identity | Received | Intended use | Verification state | Local test / result | Decision / next action |
| --- | --- | --- | --- | --- | --- |
| https://www.originkit.dev/ | Previously received; date unknown | Inspiration for 23 reusable motion studies | reviewed (existing local implementation); external source unverified | All 23 cards retained; desktop/mobile route smoke passed | adopted as inspiration; preserve attribution, validate copied components individually |
| https://backgrounds.supply/freebies | Previously received; date unknown | Visual inspiration for hero identities | reviewed (existing artwork only); external terms unverified | Seven identities use repository-local assets | adopted locally; verify asset provenance before commercial reuse |
| https://github.com/oso95/scroll-world | Previously received; date unknown | Portable scroll-scrubbing engine | reviewed (local adapter); upstream version unrecorded | Typed adapter retained; active Elsewhere route uses local images and passed route smoke | deferred for video integration until suitable footage is supplied |
| https://motionsites.ai/ | Previously received; date unknown | Vitra, Floren, Castle, and Cinema illustration/form concepts | reviewed (local components); external source unverified | Base-aware local assets; callback rejection and local preview regression tests pass | adopted as inspiration; connect real services only through typed callbacks |
| apps/web/public/references/motionsites_references.png | Previously attached; date unknown | Four illustrated archetypes | reviewed as existing repository source material | Existing artwork preserved; no re-generation or source-quality claims | retained |
| apps/web/public/references/ref_vitra.png; ref_floren.png; ref_castle.png; ref_welcome.png | Previously attached; date unknown | Cropped visual reference material | received; not independently authenticated | Not used as evidence of functional behavior | retained for visual comparison |

Implementation baseline: `6e125db9399bc3648860e08fd0d53f295548366e` plus the user's existing uncommitted changes. Validation refers to the working-tree upgrade on 2026-10-18, not that baseline commit. Node 22.22.2, pnpm 9.15.0, TypeScript 5.7.3, and the installed Chromium 1228 build were used locally; exact dependency resolutions are in `pnpm-lock.yaml`.

Retained local scroll engine SHA-256: `d8f05cb4c2dcb0113797b545976b2b0905ee2caf79716819e98ce613d0017362`.

## Local implementation review — 2026-10-29

No new external research sources were introduced in this pass. The exact source URLs, attachment identities, and unknown original receipt dates above remain unchanged. External claims, licensing, and upstream versions remain unverified; the following results concern only this repository.

- **OriginKit inspiration — adopted / tested locally:** all 23 experiment cards retain pause/replay behavior and now expose their repository source on demand. Shared animation scheduling suspends supported canvas loops offscreen and in hidden tabs.
- **Background and MotionSites inspiration — adopted / tested locally:** seven identity studies retain local artwork; the four illustrated forms share cancellation-safe request state and honest local-preview responses. No backend submission was enabled.
- **Scroll-World — deferred for video integration:** the active landscape journey gained chapter navigation. The retained scrub adapter is unchanged; this is not new evidence about upstream video performance.
- **Existing artwork and attachments — retained:** Alethia and the collection viewers use existing local images. Atlas measurements are explicitly authored sample data, not observations inferred from the artwork.

Local validation includes strict TypeScript with exact optional properties, hook-aware ESLint, 27 unit regressions, Chromium and Firefox workflow checks, and automated WCAG checks of BotLab, Alethia, Print Studio, and Relay. The four audited routes had no automated violations after repairs. This does not certify the source websites or establish commercial rights to their artwork.

Tested working tree based on commit `6e125db9399bc3648860e08fd0d53f295548366e`. Dependency resolutions are pinned in `pnpm-lock.yaml`, SHA-256 `e278c8c95f4be2e52c0f50f254b8405b3828f33fdedae7f1169eb3fcdfd99cac`. Local browser builds: Chromium 1228 and Firefox 1532. Retained Wet Paint renderer SHA-256: `a96bd2d31778e9c39aff39fe8c4df470901833dac67ec6f2ecb99b2dc5c65e04`; its new recipe boundary is typed and validated, while the renderer remains a documented legacy typing exception.
