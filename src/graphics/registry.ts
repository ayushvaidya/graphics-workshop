import { gridPosterGraphic } from './grid-poster'
import type { GraphicDefinition } from './types'

export const graphicsRegistry: GraphicDefinition[] = [gridPosterGraphic]

export const defaultGraphic = gridPosterGraphic

export function getGraphicById(id: string): GraphicDefinition | undefined {
  return graphicsRegistry.find((g) => g.meta.id === id)
}
