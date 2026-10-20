import { describe, expect, it } from 'vitest'
import { RecordingContext, snapshotLog } from '../../test/recordingContext'
import { gridPosterDefaultProps } from './schema'
import { renderGridPoster } from './render'

describe('renderGridPoster', () => {
  it('produces identical draw logs for the same props and size', () => {
    const size = { width: 400, height: 500 }
    const ctxA = new RecordingContext()
    const ctxB = new RecordingContext()
    renderGridPoster(ctxA as unknown as CanvasRenderingContext2D, gridPosterDefaultProps, size)
    renderGridPoster(ctxB as unknown as CanvasRenderingContext2D, gridPosterDefaultProps, size)
    expect(snapshotLog(ctxA)).toBe(snapshotLog(ctxB))
    expect(snapshotLog(ctxA).length).toBeGreaterThan(0)
  })

  it('changes output when seed changes', () => {
    const size = { width: 400, height: 500 }
    const ctxA = new RecordingContext()
    const ctxB = new RecordingContext()
    renderGridPoster(ctxA as unknown as CanvasRenderingContext2D, gridPosterDefaultProps, size)
    renderGridPoster(
      ctxB as unknown as CanvasRenderingContext2D,
      { ...gridPosterDefaultProps, seed: 99 },
      size,
    )
    expect(snapshotLog(ctxA)).not.toBe(snapshotLog(ctxB))
  })
})
