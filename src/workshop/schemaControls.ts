import { z } from 'zod'

export type ControlField =
  | {
      key: string
      kind: 'number'
      label: string
      min: number
      max: number
      step: number
    }
  | {
      key: string
      kind: 'int'
      label: string
      min: number
      max: number
    }
  | {
      key: string
      kind: 'enum'
      label: string
      options: readonly string[]
    }

function unwrap(schema: z.ZodTypeAny): z.ZodTypeAny {
  if (schema instanceof z.ZodDefault) {
    return unwrap(schema._def.innerType)
  }
  if (schema instanceof z.ZodOptional) {
    return unwrap(schema._def.innerType)
  }
  return schema
}

function labelFromKey(key: string): string {
  return key
    .replace(/Key$/, '')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase())
    .trim()
}

function numberBounds(schema: z.ZodNumber): { min: number; max: number } {
  let min = 0
  let max = 100
  for (const check of schema._def.checks ?? []) {
    if (check.kind === 'min') min = check.value
    if (check.kind === 'max') max = check.value
  }
  return { min, max }
}

export function controlsFromSchema(schema: z.ZodObject<z.ZodRawShape>): ControlField[] {
  const fields: ControlField[] = []
  const shape = schema.shape

  for (const key of Object.keys(shape)) {
    const inner = unwrap(shape[key]!)
    const label = labelFromKey(key)

    if (inner instanceof z.ZodNumber) {
      const { min, max } = numberBounds(inner)
      if (key === 'seed') {
        fields.push({ key, kind: 'int', label: 'Seed', min, max })
      } else {
        const step = max - min <= 1 ? 0.01 : 1
        fields.push({ key, kind: 'number', label, min, max, step })
      }
      continue
    }

    if (inner instanceof z.ZodEnum) {
      fields.push({
        key,
        kind: 'enum',
        label,
        options: inner.options as readonly string[],
      })
    }
  }

  return fields
}
