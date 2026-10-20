import { createSeededRandom } from '../../lib/seededRandom'
import { resolvePaletteColor, type ArtboardSize } from '../../tokens'
import type { GridPosterProps } from './schema'

export function renderGridPoster(
  ctx: CanvasRenderingContext2D,
  props: GridPosterProps,
  size: ArtboardSize,
): void {
  const random = createSeededRandom(props.seed)
  const bg = resolvePaletteColor(props.backgroundKey)
  const fill = resolvePaletteColor(props.fillKey)
  const stroke = resolvePaletteColor(props.strokeKey)

  ctx.clearRect(0, 0, size.width, size.height)
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, size.width, size.height)

  const cellW = size.width / props.columns
  const cellH = size.height / props.rows
  const pad = Math.min(cellW, cellH) * 0.12

  for (let row = 0; row < props.rows; row++) {
    for (let col = 0; col < props.columns; col++) {
      const jx = (random() - 0.5) * props.jitter * cellW
      const jy = (random() - 0.5) * props.jitter * cellH
      const cx = col * cellW + cellW / 2 + jx
      const cy = row * cellH + cellH / 2 + jy
      const angle = ((random() - 0.5) * 2 * props.rotationMax * Math.PI) / 180
      const scale = 0.55 + random() * 0.35
      const w = (cellW - pad * 2) * scale
      const h = (cellH - pad * 2) * scale

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(angle)
      ctx.fillStyle = (row + col) % 2 === 0 ? fill : stroke
      ctx.strokeStyle = stroke
      ctx.lineWidth = props.strokeWidth

      if (props.shape === 'rect') {
        ctx.fillRect(-w / 2, -h / 2, w, h)
        if (props.strokeWidth > 0) {
          ctx.strokeRect(-w / 2, -h / 2, w, h)
        }
      } else {
        const r = Math.min(w, h) / 2
        ctx.beginPath()
        ctx.arc(0, 0, r, 0, Math.PI * 2)
        ctx.fill()
        if (props.strokeWidth > 0) {
          ctx.stroke()
        }
      }

      ctx.restore()
    }
  }
}
