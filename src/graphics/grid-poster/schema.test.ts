import { describe, expect, it } from 'vitest'
import { gridPosterDefaultProps, gridPosterSchema } from './schema'

describe('gridPosterSchema', () => {
  it('parses defaults', () => {
    expect(gridPosterSchema.safeParse(gridPosterDefaultProps).success).toBe(true)
  })

  it('rejects out-of-range columns', () => {
    expect(
      gridPosterSchema.safeParse({ ...gridPosterDefaultProps, columns: 100 }).success,
    ).toBe(false)
  })

  it('rejects invalid shape', () => {
    expect(
      gridPosterSchema.safeParse({ ...gridPosterDefaultProps, shape: 'triangle' }).success,
    ).toBe(false)
  })
})
