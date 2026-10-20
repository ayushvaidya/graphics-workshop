import { describe, expect, it } from 'vitest'
import { generateCode } from './generateCode'
import { gridPosterGraphic } from '../graphics/grid-poster'

describe('generateCode', () => {
  it('includes render export and key prop values', () => {
    const code = generateCode(gridPosterGraphic, gridPosterGraphic.defaultProps)
    expect(code).toContain('renderGridPoster')
    expect(code).toContain('"seed": 42')
    expect(code).toContain('GridPosterProps')
  })
})
