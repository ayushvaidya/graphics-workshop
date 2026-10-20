export const palette = {
  primary: '#E63946',
  accent: '#457B9D',
  background: '#F1FAEE',
  ink: '#1D3557',
} as const

export type PaletteKey = keyof typeof palette

export const paletteKeys = ['primary', 'accent', 'background', 'ink'] as const satisfies readonly PaletteKey[]

export const defaultArtboard = {
  width: 1200,
  height: 1600,
} as const

export type ArtboardSize = {
  width: number
  height: number
}

export const typography = {
  displayFamily: 'system-ui, sans-serif',
  sizes: {
    sm: 24,
    md: 48,
    lg: 72,
  },
} as const

export const exportPresets = {
  dpr1: 1,
  dpr2: 2,
} as const

export function resolvePaletteColor(key: PaletteKey): string {
  return palette[key]
}
