export interface DitherPalette {
  name: string;
  colors: number[][]; // Array of [R, G, B]
}

export const PALETTES: Record<string, DitherPalette> = {
  retroPC: {
    name: 'Retro PC (EGA)',
    colors: [
      [0, 0, 0], [0, 0, 170], [0, 170, 0], [0, 170, 170],
      [170, 0, 0], [170, 0, 170], [170, 85, 0], [170, 170, 170],
      [85, 85, 85], [85, 85, 255], [85, 255, 85], [85, 255, 255],
      [255, 85, 85], [255, 85, 255], [255, 255, 85], [255, 255, 255]
    ]
  },
  gameboy: {
    name: 'Gameboy Classic',
    colors: [
      [15, 56, 15], [48, 98, 48], [139, 172, 15], [155, 188, 15]
    ]
  },
  macClassic: {
    name: 'Mac Classic (1-bit)',
    colors: [
      [0, 0, 0], [255, 255, 255]
    ]
  },
  vaporwave: {
    name: 'Vaporwave',
    colors: [
      [255, 113, 206], [1, 205, 254], [5, 255, 161], [185, 103, 255], [255, 251, 150], [0,0,0], [255,255,255]
    ]
  }
};

function closestColor(r: number, g: number, b: number, palette: number[][]) {
  let minDistance = Infinity;
  let closest = palette[0]!;

  for (const color of palette) {
    const dr = r - color[0]!;
    const dg = g - color[1]!;
    const db = b - color[2]!;
    const distance = dr * dr + dg * dg + db * db;
    if (distance < minDistance) {
      minDistance = distance;
      closest = color;
    }
  }
  return closest;
}

export class DitherEngine {
  public static applyFloydSteinberg(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    paletteName: string,
    contrast: number = 1.0
  ) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const palette = PALETTES[paletteName]?.colors || PALETTES.retroPC!.colors;

    // Apply contrast
    if (contrast !== 1.0) {
      const intercept = 128 * (1 - contrast);
      for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i]! * contrast + intercept;
        data[i + 1] = data[i + 1]! * contrast + intercept;
        data[i + 2] = data[i + 2]! * contrast + intercept;
      }
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;

        const oldR = data[i] || 0;
        const oldG = data[i + 1] || 0;
        const oldB = data[i + 2] || 0;

        const [newR, newG, newB] = closestColor(oldR, oldG, oldB, palette);

        data[i] = newR || 0;
        data[i + 1] = newG || 0;
        data[i + 2] = newB || 0;

        const errR = oldR - (newR || 0);
        const errG = oldG - (newG || 0);
        const errB = oldB - (newB || 0);

        // Distribute error
        const distribute = (dx: number, dy: number, quant: number) => {
          if (x + dx < width && x + dx >= 0 && y + dy < height) {
            const index = ((y + dy) * width + (x + dx)) * 4;
            data[index] = (data[index] || 0) + errR * quant;
            data[index + 1] = (data[index + 1] || 0) + errG * quant;
            data[index + 2] = (data[index + 2] || 0) + errB * quant;
          }
        };

        distribute(1, 0, 7 / 16);
        distribute(-1, 1, 3 / 16);
        distribute(0, 1, 5 / 16);
        distribute(1, 1, 1 / 16);
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }
}
