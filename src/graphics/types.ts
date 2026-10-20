import type { z } from 'zod'
import type { ArtboardSize } from '../tokens'

export type GraphicMeta = {
  id: string
  title: string
  description: string
  artboard: ArtboardSize
  propsTypeName: string
  renderExportName: string
}

export type GraphicDefinition = {
  meta: GraphicMeta
  schema: z.ZodObject<z.ZodRawShape>
  defaultProps: Record<string, unknown>
  render: (ctx: CanvasRenderingContext2D, props: Record<string, unknown>, size: ArtboardSize) => void
}
