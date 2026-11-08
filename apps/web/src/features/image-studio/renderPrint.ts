import { DitherEngine } from './DitherEngine';
import { HalftoneEngine } from './HalftoneEngine';
import { RisoEngine } from './RisoEngine';
import type { PrintRecipe } from './printSettings';
export function renderPrint(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  image: HTMLImageElement | ImageBitmap,
  recipe: PrintRecipe,
  maxDim: number,
) {
  const scale = Math.min(1, maxDim / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale)),
    height = Math.max(1, Math.round(image.height * scale));
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true }) as
    CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  if (!ctx) throw new Error('2D canvas unavailable');
  ctx.drawImage(image, 0, 0, width, height);
  const { settings, effect, pattern, palette, colors } = recipe;
  // Keep the appearance consistent between preview and higher resolution exports.
  const factor = Math.max(width, height) / 900;
  if (effect === 'halftone')
    new HalftoneEngine().render(canvas, image, {
      ...settings,
      dotSize: settings.dotSize * factor,
      pattern,
      colorFg: colors[0]!,
      colorBg: colors[1]!,
    });
  if (effect === 'dither')
    DitherEngine.applyFloydSteinberg(ctx, width, height, palette, settings.contrast);
  if (effect === 'riso')
    RisoEngine.applyRisograph(
      ctx,
      width,
      height,
      settings.offsetX * factor,
      settings.offsetY * factor,
      settings.grain,
    );
}
