import { useCallback, useMemo, useRef, useState } from 'react'
import { z } from 'zod'
import { generateCode } from '../lib/generateCode'
import { exportPresets } from '../tokens'
import { defaultGraphic, graphicsRegistry } from '../graphics/registry'
import type { GraphicDefinition } from '../graphics/types'
import { CodePanel } from './CodePanel'
import { ParameterPanel } from './ParameterPanel'
import { PreviewCanvas, renderToCanvas } from './PreviewCanvas'
import { controlsFromSchema } from './schemaControls'
import './workshop.css'

export function WorkshopLayout() {
  const [graphic] = useState<GraphicDefinition>(defaultGraphic)
  const [props, setProps] = useState<Record<string, unknown>>(() => ({
    ...graphic.defaultProps,
  }))
  const exportCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const objectSchema = graphic.schema as z.ZodObject<z.ZodRawShape>
  const fields = useMemo(() => controlsFromSchema(objectSchema), [objectSchema])

  const parsed = useMemo(() => graphic.schema.safeParse(props), [graphic.schema, props])
  const validProps = parsed.success ? parsed.data : graphic.defaultProps

  const handleChange = useCallback(
    (key: string, value: unknown) => {
      setProps((prev) => {
        const next = { ...prev, [key]: value }
        const result = graphic.schema.safeParse(next)
        return result.success ? (result.data as Record<string, unknown>) : next
      })
    },
    [graphic.schema],
  )

  const handleReset = () => {
    setProps({ ...graphic.defaultProps } as Record<string, unknown>)
  }

  const code = useMemo(() => generateCode(graphic, validProps), [graphic, validProps])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
  }

  const handleDownload = () => {
    let canvas = exportCanvasRef.current
    if (!canvas) {
      canvas = document.createElement('canvas')
      exportCanvasRef.current = canvas
    }
    renderToCanvas(canvas, graphic.meta.artboard, exportPresets.dpr2, (ctx, size) => {
      graphic.render(ctx, validProps, size)
    })
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const seed =
        typeof validProps === 'object' &&
        validProps !== null &&
        'seed' in validProps &&
        typeof validProps.seed === 'number'
          ? validProps.seed
          : 'export'
      a.download = `${graphic.meta.id}-${seed}.png`
      a.click()
      URL.revokeObjectURL(url)
    }, 'image/png')
  }

  const renderPreview = useCallback(
    (ctx: CanvasRenderingContext2D, size: typeof graphic.meta.artboard) => {
      graphic.render(ctx, validProps, size)
    },
    [graphic, validProps],
  )

  return (
    <div className="workshop">
      <header className="workshop-header">
        <div>
          <h1>{graphic.meta.title}</h1>
          <p className="subtitle">{graphic.meta.description}</p>
        </div>
        <div className="toolbar">
          <button type="button" onClick={handleReset}>
            Reset
          </button>
          <button type="button" onClick={handleCopy}>
            Copy code
          </button>
          <button type="button" className="primary" onClick={handleDownload}>
            Download PNG
          </button>
        </div>
      </header>

      {!parsed.success && (
        <p className="parse-warning" role="status">
          Some parameters are invalid; preview uses last valid values.
        </p>
      )}

      <div className="workshop-grid">
        <aside className="sidebar">
          <ParameterPanel fields={fields} values={props} onChange={handleChange} />
          <div className="panel graphic-list">
            <h2 className="panel-title">Graphics</h2>
            <ul>
              {graphicsRegistry.map((g) => (
                <li key={g.meta.id} className={g.meta.id === graphic.meta.id ? 'active' : ''}>
                  {g.meta.title}
                </li>
              ))}
            </ul>
            <p className="hint">Add more in src/graphics/ and register in registry.ts</p>
          </div>
        </aside>

        <main className="preview-panel panel">
          <h2 className="panel-title">Preview</h2>
          <PreviewCanvas artboard={graphic.meta.artboard} render={renderPreview} />
        </main>

        <section className="code-section">
          <CodePanel code={code} />
        </section>
      </div>
    </div>
  )
}
