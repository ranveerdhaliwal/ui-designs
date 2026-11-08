import { renderPrint } from './renderPrint';
import type { PrintRecipe } from './printSettings';
self.onmessage = (
  event: MessageEvent<{ image: ImageBitmap; recipe: PrintRecipe; maxDim: number }>,
) => {
  const { image, recipe, maxDim } = event.data;
  try {
    const canvas = new OffscreenCanvas(1, 1);
    renderPrint(canvas, image, recipe, maxDim);
    const bitmap = canvas.transferToImageBitmap();
    self.postMessage({ bitmap }, { transfer: [bitmap] });
  } catch {
    self.postMessage({ error: 'The image could not be processed. Try a smaller image.' });
  } finally {
    image.close();
  }
};
