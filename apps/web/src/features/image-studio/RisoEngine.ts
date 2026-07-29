import { createOffscreenCanvas, clampPixel } from '@/lib/canvasUtils';

export class RisoEngine {
  static applyRisograph(
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number, 
    offsetX: number, 
    offsetY: number, 
    grainLevel: number
  ) {
    // Get the original image data
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    // Create three separate canvases for R, G, B channels using shared util
    const { canvas: rCanvas, ctx: rCtx } = createOffscreenCanvas(width, height);
    const { canvas: gCanvas, ctx: gCtx } = createOffscreenCanvas(width, height);
    const { canvas: bCanvas, ctx: bCtx } = createOffscreenCanvas(width, height);

    const rImgData = rCtx.createImageData(width, height);
    const gImgData = gCtx.createImageData(width, height);
    const bImgData = bCtx.createImageData(width, height);

    // Split channels
    for (let i = 0; i < data.length; i += 4) {
      // Red channel
      rImgData.data[i] = data[i]!;
      rImgData.data[i+1] = 0;
      rImgData.data[i+2] = 0;
      rImgData.data[i+3] = data[i+3]!;

      // Green channel
      gImgData.data[i] = 0;
      gImgData.data[i+1] = data[i+1]!;
      gImgData.data[i+2] = 0;
      gImgData.data[i+3] = data[i+3]!;

      // Blue channel
      bImgData.data[i] = 0;
      bImgData.data[i+1] = 0;
      bImgData.data[i+2] = data[i+2]!;
      bImgData.data[i+3] = data[i+3]!;
    }

    rCtx.putImageData(rImgData, 0, 0);
    gCtx.putImageData(gImgData, 0, 0);
    bCtx.putImageData(bImgData, 0, 0);

    // Clear main canvas to white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Blend modes for risograph overlapping effect
    ctx.globalCompositeOperation = 'multiply';

    // Draw channels with offsets
    // Green stays in center, Red offsets negative, Blue offsets positive
    ctx.drawImage(rCanvas, -offsetX, -offsetY);
    ctx.drawImage(gCanvas, 0, 0);
    ctx.drawImage(bCanvas, offsetX, offsetY);

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';

    // Apply procedural grain
    if (grainLevel > 0) {
      const finalImgData = ctx.getImageData(0, 0, width, height);
      const finalData = finalImgData.data;
      
      for (let i = 0; i < finalData.length; i += 4) {
        // Random noise between -grainLevel/2 and +grainLevel/2
        const noise = (Math.random() - 0.5) * (grainLevel * 255);
        
        finalData[i] = clampPixel(finalData[i]! + noise);
        finalData[i+1] = clampPixel(finalData[i+1]! + noise);
        finalData[i+2] = clampPixel(finalData[i+2]! + noise);
      }
      
      ctx.putImageData(finalImgData, 0, 0);
    }
  }
}
