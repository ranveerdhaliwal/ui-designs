import { type Bot, BODIES, EYES, HEADS, IDLES, INTROS, MOUTHS, PALETTES, TOPS } from './botlabData';
const limits = {
  body: BODIES.length,
  head: HEADS.length,
  eyes: EYES.length,
  mouth: MOUTHS.length,
  top: TOPS.length,
  palette: PALETTES.length,
  intro: INTROS.length,
  idle: IDLES.length,
};
export function isBot(value: unknown): value is Bot {
  if (!value || typeof value !== 'object') return false;
  return Object.entries(limits).every(([key, max]) => {
    const n = (value as Record<string, unknown>)[key];
    return typeof n === 'number' && Number.isInteger(n) && n >= 0 && n < max;
  });
}
export function readBots(raw: string | null): Bot[] {
  try {
    const items: unknown = JSON.parse(raw ?? '[]');
    return Array.isArray(items) ? items.filter(isBot).slice(0, 100) : [];
  } catch {
    return [];
  }
}
