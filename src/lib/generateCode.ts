import type { GraphicDefinition } from '../graphics/types'

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value)
  }
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(', ')}]`
  }
  const obj = value as Record<string, unknown>
  const keys = Object.keys(obj).sort()
  const entries = keys.map((k) => `${JSON.stringify(k)}: ${stableStringify(obj[k])}`)
  return `{ ${entries.join(', ')} }`
}

export function generateCode(graphic: GraphicDefinition, props: unknown): string {
  const { renderExportName, id, propsTypeName, artboard } = graphic.meta
  return `import { ${renderExportName} } from './graphics/${id}/render'
import type { ${propsTypeName} } from './graphics/${id}/schema'

const props: ${propsTypeName} = ${stableStringify(props)}

const canvas = document.createElement('canvas')
canvas.width = ${artboard.width}
canvas.height = ${artboard.height}

const ctx = canvas.getContext('2d')
if (ctx) {
  ${renderExportName}(ctx, props, { width: canvas.width, height: canvas.height })
}
`
}
