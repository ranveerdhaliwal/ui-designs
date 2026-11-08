/** All motion is a reversible function of scroll position; no timers or random frames. */
export const chapters = [
  {
    name: 'Observe',
    label: 'A study in balance',
    title: ['A measure', 'of wonder.'],
    text: 'An imaginary instrument for a very real feeling. The quiet pleasure of watching everything find its place.',
    target: 0.04,
  },
  {
    name: 'Unfold',
    label: 'The beauty between things',
    title: ['Nothing moves', 'alone.'],
    text: 'Separate the layers. Follow the counterweights. Every small motion belongs to something larger.',
    target: 0.48,
  },
  {
    name: 'Connect',
    label: 'A different kind of order',
    title: ['A little', 'infinity.'],
    text: 'The instrument falls away. What remains is a pattern — and the possibility of seeing something new.',
    target: 0.94,
  },
] as const;
export const clamp = (n: number) => Math.max(0, Math.min(1, n));
export function interval(value: number, start: number, end: number) {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
}
export function chapterAt(p: number) {
  return p < 0.32 ? 0 : p < 0.72 ? 1 : 2;
}
export function sceneAt(p: number) {
  const progress = clamp(p);
  const unfold = interval(progress, 0.16, 0.56);
  const connect = interval(progress, 0.64, 0.94);
  return {
    progress,
    unfold,
    connect,
    turn: progress * 150,
    ringOpacity: 1 - connect * 0.94,
    starOpacity: interval(progress, 0.66, 0.82),
  };
}
export const stars = Array.from({ length: 72 }, (_, i) => ({
  x: 65 + ((i * 197 + 53) % 870),
  y: 70 + ((i * 283 + 91) % 850),
  r: i % 9 === 0 ? 2.5 : 1,
}));
export const constellation = [
  [260, 285],
  [420, 205],
  [535, 355],
  [730, 275],
  [805, 510],
  [650, 665],
  [465, 565],
  [285, 730],
  [195, 495],
] as const;
export const constellationPath = `${constellation.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ')} Z M420 205L465 565L730 275 M535 355L650 665 M195 495L535 355`;

/** Choose readable foregrounds throughout the day-to-night transition, not just at its ends. */
export function themeAt(p: number) {
  const t = interval(p, 0.64, 0.84);
  const from = [241, 237, 223],
    to = [23, 47, 44];
  const rgb = from.map((n, i) => Math.round(n + (to[i]! - n) * t));
  const background = '#' + rgb.map((n) => n.toString(16).padStart(2, '0')).join('');
  const luminance = (hex: string) =>
    [1, 3, 5]
      .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((n) => (n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4))
      .reduce((sum, n, i) => sum + n * [0.2126, 0.7152, 0.0722][i]!, 0);
  const light = luminance(background);
  const contrast = (hex: string) => {
    const value = luminance(hex);
    return (Math.max(value, light) + 0.05) / (Math.min(value, light) + 0.05);
  };
  const fallback = light > 0.179 ? '#000000' : '#ffffff';
  const color =
    contrast('#303f36') >= 5 ? '#303f36' : contrast('#f0ebd9') >= 5 ? '#f0ebd9' : fallback;
  const muted =
    contrast('#66705d') >= 4.6 ? '#66705d' : contrast('#c0c7b4') >= 4.6 ? '#c0c7b4' : color;
  return { background, color, muted };
}
