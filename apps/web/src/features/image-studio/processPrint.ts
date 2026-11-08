import type { PrintRecipe } from './printSettings';
import { renderPrint } from './renderPrint';
/** Each job owns its worker so superseded slider renders can be stopped immediately. */
export async function processPrint(
  image: HTMLImageElement,
  recipe: PrintRecipe,
  maxDim: number,
  signal: AbortSignal,
): Promise<HTMLCanvasElement> {
  const target = document.createElement('canvas');
  if (signal.aborted) throw new DOMException('Cancelled', 'AbortError');
  if (typeof OffscreenCanvas === 'undefined' || typeof createImageBitmap === 'undefined') {
    renderPrint(target, image, recipe, maxDim);
    return target;
  }
  const bitmap = await createImageBitmap(image);
  if (signal.aborted) {
    bitmap.close();
    throw new DOMException('Cancelled', 'AbortError');
  }
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./print.worker.ts', import.meta.url), { type: 'module' });
    const clean = () => {
      worker.terminate();
      signal.removeEventListener('abort', abort);
    };
    const abort = () => {
      clean();
      reject(new DOMException('Cancelled', 'AbortError'));
    };
    signal.addEventListener('abort', abort, { once: true });
    worker.onerror = () => {
      clean();
      reject(new Error('The print worker could not start. Please reload.'));
    };
    worker.onmessage = (event: MessageEvent<{ bitmap?: ImageBitmap; error?: string }>) => {
      clean();
      const result = event.data.bitmap;
      if (!result) {
        reject(new Error(event.data.error));
        return;
      }
      target.width = result.width;
      target.height = result.height;
      const ctx = target.getContext('2d');
      if (!ctx) {
        result.close();
        reject(new Error('Canvas unavailable'));
        return;
      }
      ctx.drawImage(result, 0, 0);
      result.close();
      resolve(target);
    };
    worker.postMessage({ image: bitmap, recipe, maxDim }, [bitmap]);
  });
}
