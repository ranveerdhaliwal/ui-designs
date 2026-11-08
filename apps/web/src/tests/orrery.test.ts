import { describe, it, expect } from 'vitest';
import { chapterAt, chapters, sceneAt, themeAt } from '@/features/orrery/scene';
const luminance = (hex: string) => {
  const parts = hex
    .slice(1)
    .match(/../g)!
    .map((h) => parseInt(h, 16) / 255)
    .map((n) => (n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4)));
  return parts[0]! * 0.2126 + parts[1]! * 0.7152 + parts[2]! * 0.0722;
};
const contrast = (a: string, b: string) => {
  const x = luminance(a),
    y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
describe('Orrery scroll choreography', () => {
  it('keeps every chapter destination inside its own active interval', () => {
    chapters.forEach((c, i) => expect(chapterAt(c.target)).toBe(i));
  });
  it('keeps text readable through intermediate day-to-night colors', () => {
    for (let i = 0; i <= 200; i++) {
      const theme = themeAt(i / 200);
      expect(contrast(theme.background, theme.color)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(theme.background, theme.muted)).toBeGreaterThanOrEqual(4.5);
    }
  });
  it('clamps overscroll and gives the final constellation a complete path', () => {
    expect(sceneAt(-1)).toEqual(sceneAt(0));
    expect(sceneAt(2)).toEqual(sceneAt(1));
    expect(sceneAt(1).connect).toBe(1);
    expect(sceneAt(1).starOpacity).toBe(1);
    expect(sceneAt(chapters[1].target).connect).toBe(0);
  });
});
