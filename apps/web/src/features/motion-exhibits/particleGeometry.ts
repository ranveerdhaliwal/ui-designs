import { ease, mix, seeded } from './sceneMath';
export type Point3 = readonly [number, number, number];
export function clothPoint(i: number, count: number, time: number): Point3 {
  const columns = Math.ceil(Math.sqrt(count * 1.8));
  const rows = Math.ceil(count / columns);
  const u = (i % columns) / (columns - 1),
    v = Math.floor(i / columns) / (rows - 1);
  return [
    (u - 0.5) * 660,
    (v - 0.5) * 350 + Math.sin(u * 9 + v * 3 + time * 0.7) * 65,
    Math.sin(u * 7 + time * 0.4) * 100 + Math.cos(v * 7 + u * 3) * 60,
  ];
}
export function towerPoint(i: number, count: number): Point3 {
  const perRing = 70,
    ring = Math.floor(i / perRing),
    rings = Math.ceil(count / perRing);
  const h = ring / (rings - 1),
    a = ((i % perRing) / perRing) * Math.PI * 2;
  // A square cross-section twists into a spiralling architectural volume.
  const r =
    (140 + 30 * Math.sin(h * Math.PI)) / Math.max(Math.abs(Math.cos(a)), Math.abs(Math.sin(a)));
  return [Math.cos(a + h * 2.5) * r, (h - 0.5) * 440, Math.sin(a + h * 2.5) * r];
}
export function particlePoint(
  i: number,
  count: number,
  source: Point3,
  progress: number,
  time: number,
): Point3 {
  const cloth = clothPoint(i, count, time),
    tower = towerPoint(i, count);
  const a = ease(progress, 0.12, 0.45),
    b = ease(progress, 0.58, 0.92);
  const coordinate = (axis: 0 | 1 | 2) => mix(mix(source[axis], cloth[axis], a), tower[axis], b);
  return [coordinate(0), coordinate(1), coordinate(2)];
}
export function projectPoint(point: Point3, angle: number): Point3 {
  const [x, y, z] = point;
  const px = x * Math.cos(angle) + z * Math.sin(angle);
  const pz = z * Math.cos(angle) - x * Math.sin(angle);
  const scale = 900 / (900 - pz);
  return [px * scale, y * scale, pz];
}
export function sampleType(count: number): Point3[] {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 250;
  const ctx = canvas.getContext('2d');
  if (!ctx) return Array.from({ length: count }, (_, i) => clothPoint(i, count, 0));
  ctx.font = '900 210px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('FORM', 400, 135);
  const data = ctx.getImageData(0, 0, 800, 250).data,
    points: Point3[] = [];
  for (let y = 0; y < 250; y += 3)
    for (let x = 0; x < 800; x += 3)
      if (data[(y * 800 + x) * 4 + 3]! > 128) points.push([x - 400, y - 125, 0]);
  if (!points.length) return Array.from({ length: count }, (_, i) => clothPoint(i, count, 0));
  return Array.from({ length: count }, (_, i) => {
    const p = points[Math.floor(seeded(i) * points.length)]!;
    return [p[0], p[1], (seeded(i + count) - 0.5) * 24];
  });
}
