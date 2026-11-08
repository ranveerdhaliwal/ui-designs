export const clamp = (n: number) => Math.max(0, Math.min(1, n));
export const ease = (p: number, from: number, to: number) => {
  const t = clamp((p - from) / (to - from));
  return t * t * (3 - 2 * t);
};
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const chapterAt = (p: number) => Math.min(2, Math.floor(clamp(p) * 3));
export const chapterStops = [0.08, 0.5, 0.94] as const;
export function gearPath(teeth: number, radius: number) {
  return (
    Array.from({ length: teeth * 4 }, (_, i) => {
      const a = (i / (teeth * 4)) * Math.PI * 2;
      const r = radius * (i % 4 === 0 || i % 4 === 3 ? 0.88 : 1);
      return `${i ? 'L' : 'M'}${(Math.cos(a) * r).toFixed(2)},${(Math.sin(a) * r).toFixed(2)}`;
    }).join(' ') + 'Z'
  );
}
export const seeded = (i: number) => {
  const n = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return n - Math.floor(n);
};
