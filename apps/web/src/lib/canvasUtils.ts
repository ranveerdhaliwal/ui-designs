/**
 * Shared canvas utilities used by multiple image processing engines
 * (HalftoneEngine, DitherEngine, RisoEngine).
 */

/** Clamp a pixel value to the valid 0–255 range */
export function clampPixel(value: number): number {
  return Math.min(255, Math.max(0, Math.round(value)));
}

/** Create an offscreen canvas with the specified dimensions and return both canvas and context */
export function createOffscreenCanvas(
  width: number,
  height: number,
): {
  canvas: HTMLCanvasElement | OffscreenCanvas;
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
} {
  const canvas =
    typeof document === 'undefined'
      ? new OffscreenCanvas(width, height)
      : document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true }) as
    CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  if (!ctx) throw new Error('2D canvas unavailable');
  return { canvas, ctx };
}

/** Load an image and draw it to a canvas, scaling to fit within maxDim. Returns { canvas, ctx, width, height } */
export function drawImageToCanvas(
  targetCanvas: HTMLCanvasElement,
  img: HTMLImageElement,
  maxDim: number = 1200,
): { ctx: CanvasRenderingContext2D; width: number; height: number } {
  let w = img.width;
  let h = img.height;
  if (w > maxDim || h > maxDim) {
    if (w > h) {
      h = (h / w) * maxDim;
      w = maxDim;
    } else {
      w = (w / h) * maxDim;
      h = maxDim;
    }
  }
  w = Math.max(1, Math.round(w));
  h = Math.max(1, Math.round(h));
  targetCanvas.width = w;
  targetCanvas.height = h;
  const ctx = targetCanvas.getContext('2d', { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, w, h);
  return { ctx, width: w, height: h };
}

/** Apply a per-pixel transformation to image data in place */
export function mapPixels(
  imageData: ImageData,
  fn: (
    r: number,
    g: number,
    b: number,
    a: number,
    index: number,
  ) => [number, number, number, number],
): void {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = fn(data[i]!, data[i + 1]!, data[i + 2]!, data[i + 3]!, i);
    data[i] = clampPixel(r);
    data[i + 1] = clampPixel(g);
    data[i + 2] = clampPixel(b);
    data[i + 3] = clampPixel(a);
  }
}
