# Graphics Workshop

A React workshop for designing **2D visual graphics** on Canvas—not app UI components. Adjust parameters derived from a Zod schema, see a live preview, and copy generated code that stays in sync with your settings.

**v1:** parameters drive the design; the code panel is **read-only** (generated usage). **v2 (planned):** live editing via Sandpack or react-live using the same `render` API.

## Quick start

```bash
npm install
npm run dev
```

Open the local URL from Vite. Use the parameter panel, preview, and toolbar (reset, copy code, download PNG at 2× DPR).

## Architecture

Each graphic lives under `src/graphics/<id>/` and exposes:

| Piece | Role |
|-------|------|
| `schema.ts` | Zod schema (source of truth for props) |
| `render.ts` | Pure Canvas 2D `render*(ctx, props, size)` |
| `index.ts` | Bundles `meta`, schema, defaults, and render |

Shared pieces:

- `src/tokens/` — artboard defaults, palette slots, export DPR presets
- `src/lib/seededRandom.ts` — deterministic PRNG (same seed ⇒ same output)
- `src/workshop/` — schema-driven controls, preview, codegen shell
- `src/graphics/registry.ts` — list of available graphics

## Add a second graphic

1. Copy `src/graphics/grid-poster/` to `src/graphics/<your-id>/`.
2. Rename schema types, render function, and `meta.id` / `renderExportName`.
3. Implement `render` using tokens and seeded randomness where needed.
4. Register the graphic in `src/graphics/registry.ts`.
5. Add tests: schema validation, `generateCode` snippet, render determinism (see `render.test.ts`).

No changes to the workshop layout are required—the UI reads from the registry and schema.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm test` | Vitest (schema, codegen, PRNG, render determinism) |
| `npm run lint` | Oxlint |

## Starter graphic: Grid Poster

Parametric grid of rectangles or circles with jitter, rotation, stroke, palette keys, and seed— sized for a 1200×1600 artboard by default.

## License

MIT
