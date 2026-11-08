import type { DotPattern } from './HalftoneEngine';
export type Effect = 'riso' | 'halftone' | 'dither';
export const defaults = {
  dotSize: 10,
  sharpness: 1.1,
  screenAngle: 45,
  brightness: 0.08,
  contrast: 1,
  offsetX: 5,
  offsetY: 5,
  grain: 0.15,
};
export interface PrintRecipe {
  effect: Effect;
  settings: typeof defaults;
  pattern: DotPattern;
  palette: string;
  colors: string[];
}
export const initialRecipe: PrintRecipe = {
  effect: 'riso',
  settings: defaults,
  pattern: 'hex',
  palette: 'retroPC',
  colors: ['#234e52', '#f0e5c9'],
};
export function isRecipe(v: unknown): v is PrintRecipe {
  if (!v || typeof v !== 'object') return false;
  const p = v as PrintRecipe;
  const ranges: Record<keyof typeof defaults, [number, number]> = {
    dotSize: [3, 30],
    sharpness: [0.1, 3],
    screenAngle: [0, 180],
    brightness: [-0.5, 0.5],
    contrast: [0.5, 2],
    offsetX: [-20, 20],
    offsetY: [-20, 20],
    grain: [0, 0.5],
  };
  return (
    ['riso', 'halftone', 'dither'].includes(p.effect) &&
    ['hex', 'square', 'radial'].includes(p.pattern) &&
    ['retroPC', 'gameboy', 'macClassic', 'vaporwave'].includes(p.palette) &&
    Array.isArray(p.colors) &&
    p.colors.length === 2 &&
    p.colors.every((c) => typeof c === 'string' && /^#[0-9a-f]{6}$/i.test(c)) &&
    !!p.settings &&
    Object.entries(ranges).every(([k, [min, max]]) => {
      const n = p.settings[k as keyof typeof defaults];
      return typeof n === 'number' && Number.isFinite(n) && n >= min && n <= max;
    })
  );
}
