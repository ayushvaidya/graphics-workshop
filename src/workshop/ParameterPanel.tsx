import type { ControlField } from './schemaControls'

type ParameterPanelProps = {
  fields: ControlField[]
  values: Record<string, unknown>
  onChange: (key: string, value: unknown) => void
}

export function ParameterPanel({ fields, values, onChange }: ParameterPanelProps) {
  return (
    <div className="panel parameter-panel">
      <h2 className="panel-title">Parameters</h2>
      <div className="parameter-list">
        {fields.map((field) => {
          const value = values[field.key]
          if (field.kind === 'enum') {
            return (
              <label key={field.key} className="field">
                <span className="field-label">{field.label}</span>
                <select
                  value={String(value ?? field.options[0])}
                  onChange={(e) => onChange(field.key, e.target.value)}
                >
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>
            )
          }

          const num = typeof value === 'number' ? value : field.min
          return (
            <label key={field.key} className="field">
              <span className="field-label">
                {field.label}
                <span className="field-value">{field.kind === 'int' ? num : num.toFixed(2)}</span>
              </span>
              <input
                type="range"
                min={field.min}
                max={field.max}
                step={field.kind === 'int' ? 1 : field.step}
                value={num}
                onChange={(e) =>
                  onChange(
                    field.key,
                    field.kind === 'int' ? parseInt(e.target.value, 10) : parseFloat(e.target.value),
                  )
                }
              />
            </label>
          )
        })}
      </div>
    </div>
  )
}
