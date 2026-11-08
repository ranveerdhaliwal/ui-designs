import { it, expect, vi } from 'vitest';
import { RisoEngine } from '@/features/image-studio/RisoEngine';
import { createOffscreenCanvas } from '@/lib/canvasUtils';
vi.mock('@/lib/canvasUtils', () => ({
  clampPixel: (n: number) => Math.max(0, Math.min(255, Math.round(n))),
  createOffscreenCanvas: vi.fn(),
}));
it('separates subtractive ink channels without turning every multiply layer black', () => {
  const layers: Uint8ClampedArray[] = [];
  vi.mocked(createOffscreenCanvas).mockImplementation(() => ({
    canvas: {} as HTMLCanvasElement,
    ctx: {
      createImageData: () => ({ data: new Uint8ClampedArray(4) }),
      putImageData: (d: ImageData) => layers.push(d.data),
    } as unknown as CanvasRenderingContext2D,
  }));
  const ctx = {
    getImageData: () => ({ data: new Uint8ClampedArray([120, 170, 220, 255]) }),
    fillRect: vi.fn(),
    drawImage: vi.fn(),
    globalCompositeOperation: 'source-over',
  } as unknown as CanvasRenderingContext2D;
  RisoEngine.applyRisograph(ctx, 1, 1, 0, 0, 0);
  expect(layers.map((a) => Array.from(a))).toEqual([
    [120, 255, 255, 255],
    [255, 170, 255, 255],
    [255, 255, 220, 255],
  ]);
  expect(ctx.globalCompositeOperation).toBe('source-over');
});
