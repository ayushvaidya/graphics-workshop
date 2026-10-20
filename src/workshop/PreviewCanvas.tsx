import { useEffect, useRef } from 'react'
import type { ArtboardSize } from '../tokens'

type PreviewCanvasProps = {
  artboard: ArtboardSize
  render: (ctx: CanvasRenderingContext2D, size: ArtboardSize) => void
}

export function PreviewCanvas({ artboard, render }: PreviewCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      const maxW = container.clientWidth - 32
      const maxH = container.clientHeight - 32
      const scale = Math.min(maxW / artboard.width, maxH / artboard.height, 1)
      const displayW = Math.floor(artboard.width * scale)
      const displayH = Math.floor(artboard.height * scale)

      canvas.width = artboard.width
      canvas.height = artboard.height
      canvas.style.width = `${displayW}px`
      canvas.style.height = `${displayH}px`

      render(ctx, artboard)
    }

    draw()
    const observer = new ResizeObserver(draw)
    observer.observe(container)
    return () => observer.disconnect()
  }, [artboard, render])

  return (
    <div className="preview-stage" ref={containerRef}>
      <div className="checkerboard" aria-hidden />
      <canvas ref={canvasRef} className="preview-canvas" />
    </div>
  )
}

export function renderToCanvas(
  canvas: HTMLCanvasElement,
  artboard: ArtboardSize,
  dpr: number,
  render: (ctx: CanvasRenderingContext2D, size: ArtboardSize) => void,
): void {
  canvas.width = artboard.width * dpr
  canvas.height = artboard.height * dpr
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  render(ctx, artboard)
}
