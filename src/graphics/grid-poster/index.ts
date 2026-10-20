import { defaultArtboard } from '../../tokens'
import type { GraphicDefinition } from '../types'
import { gridPosterDefaultProps, gridPosterPropsTypeName, gridPosterSchema } from './schema'
import { renderGridPoster } from './render'
import type { GridPosterProps } from './schema'

export const gridPosterGraphic: GraphicDefinition = {
  meta: {
    id: 'grid-poster',
    title: 'Grid Poster',
    description: 'Parametric grid of shapes with jitter, rotation, and palette slots.',
    artboard: { ...defaultArtboard },
    propsTypeName: gridPosterPropsTypeName,
    renderExportName: 'renderGridPoster',
  },
  schema: gridPosterSchema,
  defaultProps: gridPosterDefaultProps as Record<string, unknown>,
  render: (ctx, props, size) => {
    renderGridPoster(ctx, gridPosterSchema.parse(props) as GridPosterProps, size)
  },
}
