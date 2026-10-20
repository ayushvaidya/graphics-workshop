import { z } from 'zod'

const paletteKeyEnum = z.enum(['primary', 'accent', 'background', 'ink'])

export const gridPosterSchema = z.object({
  columns: z.number().min(2).max(24),
  rows: z.number().min(2).max(32),
  jitter: z.number().min(0).max(1),
  strokeWidth: z.number().min(0).max(20),
  rotationMax: z.number().min(0).max(180),
  shape: z.enum(['circle', 'rect']),
  backgroundKey: paletteKeyEnum,
  fillKey: paletteKeyEnum,
  strokeKey: paletteKeyEnum,
  seed: z.number().int().min(0).max(999_999),
})

export type GridPosterProps = z.infer<typeof gridPosterSchema>

export const gridPosterPropsTypeName = 'GridPosterProps'

export const gridPosterDefaultProps: GridPosterProps = gridPosterSchema.parse({
  columns: 8,
  rows: 10,
  jitter: 0.35,
  strokeWidth: 2,
  rotationMax: 45,
  shape: 'rect',
  backgroundKey: 'background',
  fillKey: 'primary',
  strokeKey: 'ink',
  seed: 42,
})
