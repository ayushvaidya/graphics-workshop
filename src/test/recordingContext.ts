/** Minimal Canvas 2D mock that records operations for deterministic render tests. */
export class RecordingContext {
  log: string[] = []

  fillStyle = ''
  strokeStyle = ''
  lineWidth = 1

  save(): void {
    this.log.push('save')
  }

  restore(): void {
    this.log.push('restore')
  }

  translate(x: number, y: number): void {
    this.log.push(`translate:${x.toFixed(4)},${y.toFixed(4)}`)
  }

  rotate(angle: number): void {
    this.log.push(`rotate:${angle.toFixed(6)}`)
  }

  clearRect(_x: number, _y: number, _w: number, _h: number): void {
    this.log.push('clearRect')
  }

  fillRect(_x: number, _y: number, _w: number, _h: number): void {
    this.log.push(`fillRect:${this.fillStyle}`)
  }

  strokeRect(_x: number, _y: number, _w: number, _h: number): void {
    this.log.push(`strokeRect:${this.strokeStyle}:${this.lineWidth}`)
  }

  beginPath(): void {
    this.log.push('beginPath')
  }

  arc(_x: number, _y: number, r: number, _s: number, _e: number): void {
    this.log.push(`arc:r=${r.toFixed(4)}`)
  }

  fill(): void {
    this.log.push(`fill:${this.fillStyle}`)
  }

  stroke(): void {
    this.log.push(`stroke:${this.strokeStyle}`)
  }
}

export function snapshotLog(ctx: RecordingContext): string {
  return ctx.log.join('\n')
}
