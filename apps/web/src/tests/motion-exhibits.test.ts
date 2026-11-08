import { describe, expect, it } from 'vitest';
import { chapterAt, chapterStops, gearPath } from '@/features/motion-exhibits/sceneMath';
import {
  particlePoint,
  projectPoint,
  type Point3,
} from '@/features/motion-exhibits/particleGeometry';
describe('motion exhibit geometry', () => {
  it('keeps chapter navigation stable through overscroll', () => {
    expect(chapterAt(-0.1)).toBe(0);
    expect(chapterAt(1.1)).toBe(2);
    chapterStops.forEach((p, i) => expect(chapterAt(p)).toBe(i));
  });
  it('keeps all 3000 particles finite and inside the camera across the morph', () => {
    for (const p of [0, 0.2, 0.45, 0.6, 0.78, 1]) {
      for (let i = 0; i < 3000; i++) {
        const point = projectPoint(particlePoint(i, 3000, [(i % 600) - 300, 0, 0], p, 4), 0.3);
        expect(point.every(Number.isFinite)).toBe(true);
        expect(Math.max(...point.map(Math.abs))).toBeLessThan(900);
      }
    }
  });
  it('preserves the type and structure endpoints without time-dependent drift', () => {
    const source: Point3 = [45, 20, 5];
    expect(particlePoint(30, 3000, source, 0, 100)).toEqual(source);
    particlePoint(30, 3000, source, 1, 0).forEach((n, i) =>
      expect(n).toBeCloseTo(particlePoint(30, 3000, source, 1, 100)[i]!, 10),
    );
  });
  it('closes each toothed outline without invalid coordinates', () => {
    for (const teeth of [22, 24, 28, 32, 36]) {
      const path = gearPath(teeth, 96);
      expect(path.startsWith('M')).toBe(true);
      expect(path.endsWith('Z')).toBe(true);
      expect(path).not.toMatch(/NaN|Infinity/);
      expect(path.match(/L/g)).toHaveLength(teeth * 4 - 1);
    }
  });
});
