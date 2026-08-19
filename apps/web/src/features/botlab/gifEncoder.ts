import { Bot, BODIES, HEADS, PALETTES, IDLES, composeGrid, Part } from "./botlabData";

/* GIF-flavored LZW, uncompressed variant: emit literal 4-bit codes and a
   clear code every 6 pixels so the code table (8 colors) never grows */
export function lzwEncode(pixels: Uint8Array): number[] {
  const clear = 8;
  const eoi = 9;
  const size = 4;
  const out: number[] = [];
  let acc = 0;
  let bits = 0;
  const emit = (code: number) => {
    acc |= code << bits;
    bits += size;
    while (bits >= 8) {
      out.push(acc & 255);
      acc >>= 8;
      bits -= 8;
    }
  };
  emit(clear);
  let n = 0;
  for (const p of pixels) {
    emit(p);
    if (++n === 6) {
      emit(clear);
      n = 0;
    }
  }
  emit(eoi);
  if (bits > 0) out.push(acc & 255);
  return out;
}

export function exportGif(
  b: Bot,
  customParts?: {
    body?: Part;
    head?: Part;
    eyes?: Part;
    mouth?: Part;
    top?: Part;
  }
) {
  const scale = 8;
  const w = 16 * scale;
  const letters = ["o", "a", "b", "c", "d", "e"];
  const transp = 7;
  const colors: Record<string, string> = PALETTES[b.palette].colors;
  const bytes: number[] = [];
  const push = (...v: number[]) => bytes.push(...v);
  // header + logical screen descriptor (8-entry global color table)
  push(...[..."GIF89a"].map((c) => c.charCodeAt(0)));
  push(w & 255, w >> 8, w & 255, w >> 8, 0xf2, 0, 0);
  for (const L of letters) {
    const hex = colors[L] ?? "#ffffff";
    push(
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16),
    );
  }
  push(0, 0, 0, 0, 0, 0); // pad table to 8 entries
  // netscape extension: loop forever
  push(0x21, 0xff, 11);
  push(...[..."NETSCAPE2.0"].map((c) => c.charCodeAt(0)));
  push(3, 1, 0, 0, 0);

  const idleVariant = IDLES[b.idle] || IDLES[0];
  for (const [anim, ms] of idleVariant.frames) {
    const grid = composeGrid(b, anim, customParts);
    const delay = Math.max(2, Math.round(ms / 10)); // centiseconds
    // graphic control: dispose to background, transparent index
    push(0x21, 0xf9, 4, 0x09, delay & 255, delay >> 8, transp, 0);
    push(0x2c, 0, 0, 0, 0, w & 255, w >> 8, w & 255, w >> 8, 0);
    const px = new Uint8Array(w * w);
    let p = 0;
    for (let y = 0; y < 16; y++) {
      for (let sy = 0; sy < scale; sy++) {
        for (let x = 0; x < 16; x++) {
          const ch = grid[y][x];
          const idx = ch ? letters.indexOf(ch) : transp;
          px.fill(idx < 0 ? transp : idx, p, p + scale);
          p += scale;
        }
      }
    }
    push(3); // lzw minimum code size
    const data = lzwEncode(px);
    for (let i = 0; i < data.length; i += 255) {
      const chunk = data.slice(i, i + 255);
      push(chunk.length, ...chunk);
    }
    push(0);
  }
  push(0x3b);
  const url = URL.createObjectURL(
    new Blob([Uint8Array.from(bytes)], { type: "image/gif" }),
  );
  const a = document.createElement("a");
  const bodyName = customParts?.body?.name ?? BODIES[b.body]?.name ?? "bot";
  const headName = customParts?.head?.name ?? HEADS[b.head]?.name ?? "head";
  a.download = `bot-${bodyName}-${headName}-${PALETTES[b.palette].name}.gif`;
  a.href = url;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportPng(
  b: Bot,
  customParts?: {
    body?: Part;
    head?: Part;
    eyes?: Part;
    mouth?: Part;
    top?: Part;
  },
  scale = 16
) {
  const c = document.createElement("canvas");
  c.width = c.height = 16 * scale;
  const ctx = c.getContext("2d")!;
  const pal = PALETTES[b.palette] || PALETTES[0];
  const grid = composeGrid(b, {}, customParts);
  grid.forEach((row, y) => {
    row.forEach((ch, x) => {
      if (!ch) return;
      ctx.fillStyle = pal.colors[ch as keyof typeof pal.colors] ?? "#ff00ff";
      ctx.fillRect(x * scale, y * scale, scale, scale);
    });
  });
  const a = document.createElement("a");
  const bodyName = customParts?.body?.name ?? BODIES[b.body]?.name ?? "bot";
  const headName = customParts?.head?.name ?? HEADS[b.head]?.name ?? "head";
  a.download = `bot-${bodyName}-${headName}-${pal.name}.png`;
  a.href = c.toDataURL("image/png");
  a.click();
}
