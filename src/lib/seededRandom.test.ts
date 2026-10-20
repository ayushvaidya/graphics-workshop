import { describe, expect, it } from 'vitest'
import { createSeededRandom } from './seededRandom'

describe('createSeededRandom', () => {
  it('returns the same sequence for the same seed', () => {
    const a = createSeededRandom(42)
    const b = createSeededRandom(42)
    const seqA = Array.from({ length: 20 }, () => a())
    const seqB = Array.from({ length: 20 }, () => b())
    expect(seqA).toEqual(seqB)
  })

  it('returns different sequences for different seeds', () => {
    const a = createSeededRandom(1)
    const b = createSeededRandom(2)
    expect(a()).not.toBe(b())
  })
})
