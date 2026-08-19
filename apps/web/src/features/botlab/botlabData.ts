/*
 * BotLab Data & Core Types
 * Parts are 16x16 grids: "." is transparent, letters are palette slots:
 *   o outline  a primary  b shade  c accent  d panel  e glow
 * Layers composite in order: body, head, eyes, mouth, top.
 */

export const _ = "................";

export type Part = {
  name: string;
  grid: string[];
  idle?: { bob?: "head" | "all"; altRows?: Record<number, string> };
};

export const BODIES: Part[] = [
  {
    name: "box",
    grid: [
      _, _, _, _, _, _, _, _,
      "....oooooooo....",
      "..oooaaaaaaooo..",
      "..oaoaddddaoao..",
      "..oaoaddddaoao..",
      "..oooaaaaaaooo..",
      "....oooooooo....",
      ".....oo..oo.....",
      "....ooo..ooo....",
    ],
    idle: { bob: "head" },
  },
  {
    name: "tread",
    grid: [
      _, _, _, _, _, _, _, _,
      "...oooooooooo...",
      "...oaaaaaaaao...",
      "...oaddddddao...",
      "...oaddddddao...",
      "...oaaaaaaaao...",
      "..oooooooooooo..",
      "..obbobbobbobb..",
      "..oooooooooooo..",
    ],
    idle: { altRows: { 14: "..bbobbobbobbo.." } },
  },
  {
    name: "hover",
    grid: [
      _, _, _, _, _, _, _, _,
      ".....oooooo.....",
      "....oaaaaaao....",
      "....oacaacao....",
      "...oaaaaaaaao...",
      "...oaaaaaaaao...",
      "....oooooooo....",
      ".....e.ee.e.....",
      _,
    ],
    idle: { bob: "all", altRows: { 14: ".....ee..ee....." } },
  },
  {
    name: "strider",
    grid: [
      _, _, _, _, _, _, _, _,
      ".....oooooo.....",
      ".....oaaaao.....",
      "...o.oaddao.o...",
      "...o.oaaaao.o...",
      ".....oaaaao.....",
      "......oooo......",
      "......o..o......",
      ".....oo..oo.....",
    ],
    idle: { bob: "head" },
  },
  {
    name: "pod",
    grid: [
      _, _, _, _, _, _, _, _,
      ".....oooooo.....",
      "....oaaaaaao....",
      "...oaaaaaaaao...",
      "...oaaaaaabao...",
      "....oaaaabao....",
      ".....oooooo.....",
      "....oo....oo....",
      _,
    ],
    idle: { bob: "head" },
  },
  {
    name: "spider",
    grid: [
      _, _, _, _, _, _, _, _,
      "....oooooooo....",
      "..oooaaaaaaooo..",
      ".oo.oaddddao.oo.",
      "o...oaaaaaao...o",
      "....oooooooo....",
      "...oo.oooo.oo...",
      "..oo........oo..",
      ".oo..........oo.",
    ],
    idle: { bob: "head" },
  },
  {
    name: "jetpack",
    grid: [
      _, _, _, _, _, _, _, _,
      "...oooooooooo...",
      "..oocoaaaaoco..",
      "..oocoadddoco..",
      "..oocoadddoco..",
      "..oocoaaaaoco..",
      "...oooooooooo...",
      "....e......e....",
      "...eee....eee...",
    ],
    idle: { bob: "all", altRows: { 14: "....ee....ee....", 15: "....e......e...." } },
  },
];

export const HEADS: Part[] = [
  {
    name: "cube",
    grid: [
      _, _,
      "....oooooooo....",
      "....oaaaaaao....",
      "....oaaaaaao....",
      "....oaaaaaao....",
      "....oaaaaaao....",
      "....oaaaaaao....",
      "....oooooooo....",
      _, _, _, _, _, _, _,
    ],
  },
  {
    name: "dome",
    grid: [
      _, _,
      "......oooo......",
      "....ooaaaaoo....",
      "...oaaaaaaaao...",
      "...oaaaaaaaao...",
      "...oaaaaaaaao...",
      "...oaaaaaaaao...",
      "...oooooooooo...",
      _, _, _, _, _, _, _,
    ],
  },
  {
    name: "crt",
    grid: [
      _, _,
      "..oooooooooooo..",
      "..oaaaaaaaaaao..",
      "..oaddddddddao..",
      "..oaddddddddao..",
      "..oaddddddddao..",
      "..oaddddddddao..",
      "..oooooooooooo..",
      _, _, _, _, _, _, _,
    ],
  },
  {
    name: "wedge",
    grid: [
      _, _,
      ".....oooooo.....",
      "....oaaaaaao....",
      "....oaaaaaao....",
      "...oaaaaaaaao...",
      "...oaaaaaaaao...",
      "..oaaaaaaaaaao..",
      "..oooooooooooo..",
      _, _, _, _, _, _, _,
    ],
  },
  {
    name: "pail",
    grid: [
      _, _,
      "...oooooooooo...",
      "...obbbbbbbbo...",
      "...oaaaaaaaao...",
      "...oaaaaaaaao...",
      "...oaaaaaaaao...",
      "....oaaaaaao....",
      ".....oooooo.....",
      _, _, _, _, _, _, _,
    ],
  },
  {
    name: "cat",
    grid: [
      _,
      "....o......o....",
      "....oa....ao....",
      "...oaaaaaaaao...",
      "...oaaaaaaaao...",
      "...oaaaaaaaao...",
      "...oaaaaaaaao...",
      "...oaaaaaaaao...",
      "...oooooooooo...",
      _, _, _, _, _, _, _,
    ],
  },
  {
    name: "dog",
    grid: [
      _, _,
      "....oooooooo....",
      "..oboaaaaaaobo..",
      "..oboaaaaaaobo..",
      "..oooaaaaaaooo..",
      "....oaaaaaao....",
      "....oaaaaaao....",
      "....oooooooo....",
      _, _, _, _, _, _, _,
    ],
  },
  {
    name: "bear",
    grid: [
      _,
      "...oo......oo...",
      "..oaaooooooaao..",
      "..oaaaaaaaaaao..",
      "..oaaaaaaaaaao..",
      "..oaaaaaaaaaao..",
      "..oaaaddddaaao..",
      "..oaaaddddaaao..",
      "..oooooooooooo..",
      _, _, _, _, _, _, _,
    ],
  },
  {
    name: "lion",
    grid: [
      _,
      "...b.b.bb.b.b...",
      "..bbbbbbbbbbbb..",
      "..bboooooooobb..",
      "..bboaaaaaaobb..",
      "..bboaaaaaaobb..",
      "..bboaaaaaaobb..",
      "..bboaaaaaaobb..",
      "..bboooooooobb..",
      _, _, _, _, _, _, _,
    ],
  },
  {
    name: "raccoon",
    grid: [
      _,
      "...o........o...",
      "...oo......oo...",
      "...oaooooooao...",
      "...obbbbbbbbo...",
      "...obbbbbbbbo...",
      "...oaaaaaaaao...",
      "...oaaddddaao...",
      "...oooooooooo...",
      _, _, _, _, _, _, _,
    ],
  },
  {
    name: "alien",
    grid: [
      _,
      "...oooooooooo...",
      "..oaaaaaaaaaao..",
      ".oaaaaaaaaaaaao.",
      ".oaaaaaaaaaaaao.",
      "..oaaaaaaaaaao..",
      "...oaaaaaaaao...",
      "....oaaaaaao....",
      ".....oooooo.....",
      _, _, _, _, _, _, _,
    ],
  },
  {
    name: "skull",
    grid: [
      _, _,
      "....oooooooo....",
      "...oaaaaaaaaao...",
      "..oaaaaaaaaaaao..",
      "..oaaaaaaaaaaao..",
      "...oaaaaaaaaao...",
      "....oaddddddo....",
      "....oooooooo....",
      _, _, _, _, _, _, _,
    ],
  },
];

export const EYES: Part[] = [
  {
    name: "dots",
    grid: [_, _, _, _, _, "......o..o......", _, _, _, _, _, _, _, _, _, _],
  },
  {
    name: "blocks",
    grid: [
      _, _, _, _,
      ".....ee..ee.....",
      ".....ee..ee.....",
      _, _, _, _, _, _, _, _, _, _,
    ],
  },
  {
    name: "visor",
    grid: [_, _, _, _, _, ".....eeeeee.....", _, _, _, _, _, _, _, _, _, _],
  },
  {
    name: "cyclops",
    grid: [
      _, _, _, _,
      "......oooo......",
      "......oeeo......",
      "......oooo......",
      _, _, _, _, _, _, _, _, _,
    ],
  },
  {
    name: "sleep",
    grid: [_, _, _, _, _, ".....oo..oo.....", _, _, _, _, _, _, _, _, _, _],
  },
  {
    name: "angry",
    grid: [
      _, _, _, _,
      "....ee....ee....",
      ".....ee..ee.....",
      _, _, _, _, _, _, _, _, _, _,
    ],
  },
  {
    name: "star",
    grid: [
      _, _, _, _,
      ".....e....e.....",
      "....eee..eee....",
      ".....e....e.....",
      _, _, _, _, _, _, _, _, _,
    ],
  },
];

export const MOUTHS: Part[] = [
  {
    name: "grill",
    grid: [_, _, _, _, _, _, _, "......o.o.o.....", _, _, _, _, _, _, _, _],
  },
  {
    name: "line",
    grid: [_, _, _, _, _, _, _, "......oooo......", _, _, _, _, _, _, _, _],
  },
  {
    name: "smile",
    grid: [
      _, _, _, _, _, _,
      ".....o....o.....",
      "......oooo......",
      _, _, _, _, _, _, _, _,
    ],
  },
  {
    name: "speaker",
    grid: [_, _, _, _, _, _, _, ".....oeoeoe.....", _, _, _, _, _, _, _, _],
  },
  {
    name: "teeth",
    grid: [
      _, _, _, _, _, _, _,
      ".....oddddo.....",
      ".....oddddo.....",
      _, _, _, _, _, _, _,
    ],
  },
  { name: "none", grid: Array(16).fill(_) },
];

export const TOPS: Part[] = [
  {
    name: "antenna",
    grid: [
      ".......e........",
      ".......o........",
      ".......o........",
      _, _, _, _, _, _, _, _, _, _, _, _, _,
    ],
  },
  {
    name: "horns",
    grid: [
      ".....e....e.....",
      ".....o....o.....",
      ".....o....o.....",
      _, _, _, _, _, _, _, _, _, _, _, _, _,
    ],
  },
  {
    name: "beacon",
    grid: [
      ".......ee.......",
      "......eeee......",
      "......oooo......",
      _, _, _, _, _, _, _, _, _, _, _, _, _,
    ],
  },
  {
    name: "fin",
    grid: [
      "........c.......",
      ".......cc.......",
      "......ccc.......",
      _, _, _, _, _, _, _, _, _, _, _, _, _,
    ],
  },
  {
    name: "cap",
    grid: [
      _,
      ".....cccccc.....",
      "....cccccccc....",
      _, _, _, _, _, _, _, _, _, _, _, _, _,
    ],
  },
  {
    name: "crown",
    grid: [
      ".....e..e..e....",
      ".....c.ccc.c....",
      ".....ccccccc....",
      _, _, _, _, _, _, _, _, _, _, _, _, _,
    ],
  },
  {
    name: "halo",
    grid: [
      "....eeeeeeee....",
      "....e......e....",
      "....eeeeeeee....",
      _, _, _, _, _, _, _, _, _, _, _, _, _,
    ],
  },
  { name: "none", grid: Array(16).fill(_) },
];

export type Palette = {
  name: string;
  colors: { o: string; a: string; b: string; c: string; d: string; e: string };
  oDark: string;
};

export const PALETTES: Palette[] = [
  {
    name: "factory",
    colors: { o: "#23262d", a: "#9aa3ae", b: "#6f7680", c: "#e2582a", d: "#d9dee4", e: "#ffd23e" },
    oDark: "#4d545f",
  },
  {
    name: "copper",
    colors: { o: "#2b1d10", a: "#c98a4b", b: "#9c6430", c: "#3fb8af", d: "#eed9b4", e: "#9ef5dc" },
    oDark: "#6a4a28",
  },
  {
    name: "dmg",
    colors: { o: "#0f380f", a: "#8bac0f", b: "#306230", c: "#306230", d: "#9bbc0f", e: "#e0f8d0" },
    oDark: "#2b542b",
  },
  {
    name: "sakura",
    colors: { o: "#42213d", a: "#f085a6", b: "#c65b85", c: "#7bd1f0", d: "#ffd9e6", e: "#fff3a0" },
    oDark: "#6d3a64",
  },
  {
    name: "stealth",
    colors: { o: "#0c0f14", a: "#333a46", b: "#232833", c: "#ff3860", d: "#49525f", e: "#27e0ff" },
    oDark: "#4d5666",
  },
  {
    name: "hazard",
    colors: { o: "#221f18", a: "#e6c229", b: "#b7941a", c: "#2b2f36", d: "#f4e9b6", e: "#ff4136" },
    oDark: "#5f5735",
  },
  {
    name: "cyber",
    colors: { o: "#0a0a1a", a: "#2a1b4e", b: "#150d2a", c: "#00ffcc", d: "#7b2cbf", e: "#ff007f" },
    oDark: "#44317a",
  },
  {
    name: "synthwave",
    colors: { o: "#120224", a: "#ff2a85", b: "#8b008b", c: "#00f0ff", d: "#ffe600", e: "#ffffff" },
    oDark: "#561a7a",
  },
];

export type Anim = {
  dy?: number;
  dx?: number;
  bob?: boolean;
  blink?: boolean;
  layers?: number;
  hide?: boolean;
  reveal?: number;
};

export type Frames = [Anim, number][];
export const total = (f: Frames) => f.reduce((s, [, d]) => s + d, 0);
export const frameAt = (f: Frames, t: number): Anim => {
  for (const [a, d] of f) {
    if (t < d) return a;
    t -= d;
  }
  return {};
};

export const INTROS: { name: string; frames: Frames }[] = [
  {
    name: "hop",
    frames: [
      [{ dy: -16 }, 55],
      [{ dy: -11 }, 55],
      [{ dy: -6 }, 55],
      [{ dy: -2 }, 55],
      [{ bob: true }, 110],
      [{ dy: -4 }, 55],
      [{ dy: -2 }, 55],
      [{ bob: true }, 55],
      [{}, 55],
    ],
  },
  {
    name: "print",
    frames: Array.from({ length: 16 }, (_, i) => [{ reveal: i }, 24] as [Anim, number]),
  },
  {
    name: "slide",
    frames: [
      [{ dx: -16 }, 45],
      [{ dx: -12 }, 45],
      [{ dx: -8 }, 45],
      [{ dx: -5 }, 45],
      [{ dx: -3 }, 45],
      [{ dx: -1 }, 45],
      [{ dx: 1 }, 45],
      [{}, 45],
    ],
  },
  {
    name: "assemble",
    frames: [
      [{ layers: 1 }, 110],
      [{ layers: 2 }, 110],
      [{ layers: 3 }, 110],
      [{ layers: 4 }, 110],
      [{ layers: 5 }, 110],
    ],
  },
  {
    name: "teleport",
    frames: [
      [{ hide: true }, 70],
      [{}, 70],
      [{ hide: true }, 70],
      [{}, 70],
      [{ hide: true }, 70],
      [{}, 70],
    ],
  },
];

export const IDLES: { name: string; frames: Frames }[] = [
  {
    name: "calm",
    frames: [
      [{}, 1500],
      [{ blink: true }, 200],
      [{}, 1300],
      [{ bob: true }, 250],
      [{}, 250],
      [{ bob: true }, 250],
      [{}, 250],
    ],
  },
  {
    name: "bounce",
    frames: [
      [{}, 400],
      [{ bob: true }, 400],
    ],
  },
  {
    name: "doze",
    frames: [
      [{ blink: true }, 700],
      [{ blink: true, bob: true }, 700],
      [{ blink: true }, 700],
      [{ blink: true, bob: true }, 700],
      [{}, 1200],
    ],
  },
  {
    name: "twitch",
    frames: [
      [{}, 900],
      [{ bob: true }, 80],
      [{}, 90],
      [{ bob: true }, 80],
      [{}, 1300],
      [{ blink: true }, 120],
      [{}, 1430],
    ],
  },
  {
    name: "dance",
    frames: [
      [{ dx: -1, dy: -1 }, 120],
      [{ dx: 0, dy: 0, bob: true }, 120],
      [{ dx: 1, dy: -1 }, 120],
      [{ dx: 0, dy: 0, bob: true }, 120],
      [{ dx: -1, dy: 0 }, 120],
      [{ dx: 1, dy: 0 }, 120],
      [{ blink: true }, 150],
      [{}, 250],
    ],
  },
  { name: "off", frames: [[{}, 1000]] },
];

export type Bot = {
  body: number;
  head: number;
  eyes: number;
  mouth: number;
  top: number;
  palette: number;
  intro: number;
  idle: number;
  customPart?: {
    slot: "body" | "head" | "eyes" | "mouth" | "top";
    part: Part;
  };
};

export const BOT_KEYS = [
  "body",
  "head",
  "eyes",
  "mouth",
  "top",
  "palette",
  "intro",
  "idle",
] as const;

export const SLOTS = [
  ["body", BODIES],
  ["head", HEADS],
  ["eyes", EYES],
  ["mouth", MOUTHS],
  ["top", TOPS],
] as const;

function makeBot(
  body: string,
  head: string,
  eyes: string,
  mouth: string,
  top: string,
  palette: string,
  intro = "hop",
  idle = "calm",
): Bot {
  return {
    body: Math.max(0, BODIES.findIndex((p) => p.name === body)),
    head: Math.max(0, HEADS.findIndex((p) => p.name === head)),
    eyes: Math.max(0, EYES.findIndex((p) => p.name === eyes)),
    mouth: Math.max(0, MOUTHS.findIndex((p) => p.name === mouth)),
    top: Math.max(0, TOPS.findIndex((p) => p.name === top)),
    palette: Math.max(0, PALETTES.findIndex((p) => p.name === palette)),
    intro: Math.max(0, INTROS.findIndex((v) => v.name === intro)),
    idle: Math.max(0, IDLES.findIndex((v) => v.name === idle)),
  };
}

export const PRESETS: { name: string; bot: Bot }[] = [
  { name: "worker", bot: makeBot("box", "cube", "dots", "grill", "antenna", "factory") },
  { name: "scout", bot: makeBot("strider", "wedge", "visor", "none", "horns", "stealth", "slide", "twitch") },
  { name: "heavy", bot: makeBot("tread", "pail", "cyclops", "grill", "none", "hazard", "assemble", "calm") },
  { name: "buddy", bot: makeBot("pod", "dome", "blocks", "smile", "beacon", "sakura", "hop", "bounce") },
  { name: "handheld", bot: makeBot("box", "crt", "sleep", "line", "cap", "dmg", "print", "calm") },
  { name: "drifter", bot: makeBot("hover", "dome", "sleep", "none", "fin", "copper", "teleport", "doze") },
  { name: "spiderbot", bot: makeBot("spider", "alien", "angry", "teeth", "halo", "cyber", "hop", "dance") },
  { name: "jetcat", bot: makeBot("jetpack", "cat", "star", "smile", "crown", "synthwave", "slide", "bounce") },
  { name: "doggo", bot: makeBot("pod", "dog", "dots", "smile", "none", "factory", "hop", "bounce") },
  { name: "bear", bot: makeBot("pod", "bear", "dots", "none", "none", "sakura", "assemble", "doze") },
  { name: "lion", bot: makeBot("box", "lion", "dots", "line", "none", "hazard", "assemble", "off") },
  { name: "raccoon", bot: makeBot("strider", "raccoon", "dots", "none", "none", "factory", "teleport", "twitch") },
];

export function randomBot(): Bot {
  const r = (n: number) => Math.floor(Math.random() * n);
  return {
    body: r(BODIES.length),
    head: r(HEADS.length),
    eyes: r(EYES.length),
    mouth: r(MOUTHS.length),
    top: r(TOPS.length),
    palette: r(PALETTES.length),
    intro: r(INTROS.length),
    idle: r(IDLES.length),
  };
}

export function composeGrid(
  b: Bot,
  anim: Anim = {},
  customParts?: {
    body?: Part;
    head?: Part;
    eyes?: Part;
    mouth?: Part;
    top?: Part;
  }
): (string | null)[][] {
  const grid: (string | null)[][] = Array.from({ length: 16 }, () =>
    Array(16).fill(null),
  );
  if (anim.hide) return grid;

  const bodyPart = customParts?.body ?? (b.customPart?.slot === "body" ? b.customPart.part : BODIES[b.body]);
  const headPart = customParts?.head ?? (b.customPart?.slot === "head" ? b.customPart.part : HEADS[b.head]);
  const eyesPart = customParts?.eyes ?? (b.customPart?.slot === "eyes" ? b.customPart.part : EYES[b.eyes]);
  const mouthPart = customParts?.mouth ?? (b.customPart?.slot === "mouth" ? b.customPart.part : MOUTHS[b.mouth]);
  const topPart = customParts?.top ?? (b.customPart?.slot === "top" ? b.customPart.part : TOPS[b.top]);

  const { dy = 0, dx = 0, bob = false, blink = false, layers: n = 5 } = anim;
  const idle = bodyPart?.idle ?? {};
  let bodyGrid = bodyPart ? bodyPart.grid : BODIES[0].grid;
  if (bob && idle.altRows) {
    bodyGrid = bodyGrid.map((row, y) => idle.altRows![y] ?? row);
  }
  const dyAll = dy + (bob && idle.bob === "all" ? 1 : 0);
  const dyHead = dy + (bob && idle.bob ? 1 : 0);

  const eyes = blink ? (EYES.find((e) => e.name === "sleep") || EYES[0]) : (eyesPart || EYES[0]);

  const layers: [string[], number][] = [
    [bodyGrid, dyAll],
    [headPart ? headPart.grid : HEADS[0].grid, dyHead],
    [eyes ? eyes.grid : EYES[0].grid, dyHead],
    [mouthPart ? mouthPart.grid : MOUTHS[0].grid, dyHead],
    [topPart ? topPart.grid : TOPS[0].grid, dyHead],
  ];

  for (const [part, d] of layers.slice(0, n)) {
    part.forEach((row, y) => {
      const yy = y + d;
      if (yy < 0 || yy > 15) return;
      for (let x = 0; x < 16; x++) {
        const xx = x + dx;
        if (row[x] !== "." && xx >= 0 && xx <= 15) grid[yy][xx] = row[x];
      }
    });
  }
  return grid;
}

export function paint(
  ctx: CanvasRenderingContext2D,
  b: Bot,
  scale: number,
  anim: Anim = {},
  dark = false,
  customParts?: {
    body?: Part;
    head?: Part;
    eyes?: Part;
    mouth?: Part;
    top?: Part;
  }
) {
  ctx.clearRect(0, 0, 16 * scale, 16 * scale);
  const pal = PALETTES[b.palette] || PALETTES[0];
  const colors: Record<string, string> = dark
    ? { ...pal.colors, o: pal.oDark }
    : pal.colors;
  composeGrid(b, anim, customParts).forEach((row, y) =>
    row.forEach((ch, x) => {
      if (!ch || y < 16 - (anim.reveal ?? 16)) return;
      ctx.fillStyle = colors[ch] ?? "#ff00ff";
      ctx.fillRect(x * scale, y * scale, scale, scale);
    }),
  );
}
