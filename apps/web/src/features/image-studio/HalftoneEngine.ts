export type DotPattern = 'square' | 'hex' | 'radial';

export interface HalftoneOptions {
  dotSize: number;
  sharpness: number;
  screenAngle: number;
  brightness: number;
  contrast: number;
  pattern: DotPattern;
  colorBg: string;
  colorFg: string;
}

export class HalftoneEngine {
  private offscreenCanvas: HTMLCanvasElement;
  private offscreenCtx: CanvasRenderingContext2D;

  constructor() {
    this.offscreenCanvas = document.createElement('canvas');
    this.offscreenCtx = this.offscreenCanvas.getContext('2d', { willReadFrequently: true })!;
  }

  public render(
    canvas: HTMLCanvasElement,
    image: HTMLImageElement,
    options: HalftoneOptions
  ) {
    const ctx = canvas.getContext('2d')!;
    const width = canvas.width;
    const height = canvas.height;

    // 1. Draw source image to offscreen canvas to sample pixels
    this.offscreenCanvas.width = width;
    this.offscreenCanvas.height = height;
    
    // Apply Brightness & Contrast via CSS filter
    // Brightness default is 1, Contrast default is 1. We map UI sliders to these values.
    // Assuming UI gives brightness around -1 to 1 (add to 1), and contrast around 0 to 2.
    // We will use standard CSS filters: brightness(x) contrast(y)
    // Wait, the UI screenshot shows brightness 0.22, contrast 1.25. 
    // We can map brightness: 0 -> 1, 0.22 -> 1.22
    const b = 1 + options.brightness;
    const c = options.contrast;
    this.offscreenCtx.filter = `brightness(${b}) contrast(${c})`;
    
    // Draw image scaling to cover the canvas
    const imgRatio = image.width / image.height;
    const canvasRatio = width / height;
    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    } else {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    }

    this.offscreenCtx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    
    // Get pixel data
    const imgData = this.offscreenCtx.getImageData(0, 0, width, height);
    const data = imgData.data;

    // Helper to get pixel luminance at (x,y)
    const getLuminance = (x: number, y: number) => {
      x = Math.max(0, Math.min(width - 1, Math.floor(x)));
      y = Math.max(0, Math.min(height - 1, Math.floor(y)));
      const idx = (y * width + x) * 4;
      const r = data[idx] || 0;
      const g = data[idx + 1] || 0;
      const b = data[idx + 2] || 0;
      // Standard luminance formula
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    };

    // 2. Clear output canvas and fill with background color
    ctx.fillStyle = options.colorBg;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = options.colorFg;

    const angleRad = (options.screenAngle * Math.PI) / 180;
    const sinA = Math.sin(angleRad);
    const cosA = Math.cos(angleRad);
    
    const spacing = options.dotSize;
    // Calculate bounding box for rotated grid
    const diag = Math.sqrt(width * width + height * height);
    const halfDiag = diag / 2;
    const cx = width / 2;
    const cy = height / 2;

    const startX = -halfDiag;
    const endX = halfDiag;
    const startY = -halfDiag;
    const endY = halfDiag;

    ctx.save();
    // We will draw dots manually without canvas rotation for performance, 
    // or we can use ctx.translate and ctx.rotate. Actually translating is easier.
    ctx.translate(cx, cy);
    ctx.rotate(angleRad);
    
    // We want the dots to be sharper or softer. We can use arc for circles.
    // Sharpness could just be a multiplier for the radius, or perhaps an alpha falloff.
    // The UI shows sharpness as a slider. We'll use it as a radius multiplier for now.
    const maxRadius = (spacing * 1.414) / 2 * options.sharpness;

    if (options.pattern === 'square' || options.pattern === 'hex') {
      for (let y = startY; y < endY; y += spacing) {
        let isHexRowStaggered = false;
        let rowSpacing = spacing;
        let yPos = y;
        
        if (options.pattern === 'hex') {
           rowSpacing = spacing * Math.sqrt(3) / 2;
           yPos = Math.floor((y - startY) / spacing) * rowSpacing + startY;
           isHexRowStaggered = Math.floor((y - startY) / spacing) % 2 === 1;
        }

        for (let x = startX; x < endX; x += spacing) {
          let xPos = x;
          if (options.pattern === 'hex' && isHexRowStaggered) {
            xPos += spacing / 2;
          }

          // Convert rotated coordinates back to screen space to sample the image
          const screenX = cx + xPos * cosA - yPos * sinA;
          const screenY = cy + xPos * sinA + yPos * cosA;

          if (screenX >= -spacing && screenX <= width + spacing && screenY >= -spacing && screenY <= height + spacing) {
            const lum = getLuminance(screenX, screenY);
            // In a halftone, dark areas have large dots of the foreground color.
            // If background is paper (white) and foreground is ink (black).
            // So dot radius is proportional to (1 - lum).
            const r = maxRadius * Math.sqrt(1 - lum);
            
            if (r > 0.5) {
              ctx.beginPath();
              ctx.arc(xPos, yPos, r, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }
    } else if (options.pattern === 'radial') {
      // Radial pattern: concentric circles from center
      const maxDist = halfDiag;
      for (let r = spacing; r < maxDist; r += spacing) {
        const circumference = 2 * Math.PI * r;
        const numDots = Math.max(1, Math.floor(circumference / spacing));
        const angleStep = (Math.PI * 2) / numDots;
        
        for (let i = 0; i < numDots; i++) {
          const a = i * angleStep;
          const xPos = r * Math.cos(a);
          const yPos = r * Math.sin(a);
          
          const screenX = cx + xPos * cosA - yPos * sinA;
          const screenY = cy + xPos * sinA + yPos * cosA;

          if (screenX >= -spacing && screenX <= width + spacing && screenY >= -spacing && screenY <= height + spacing) {
            const lum = getLuminance(screenX, screenY);
            const dotR = maxRadius * Math.sqrt(1 - lum);
            
            if (dotR > 0.5) {
              ctx.beginPath();
              ctx.arc(xPos, yPos, dotR, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }
    }
    
    ctx.restore();
  }
}
