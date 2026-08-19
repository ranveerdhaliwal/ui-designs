import React, { useEffect, useMemo, useRef, useState } from "react";

type Cell = string | null;
const N = 16;
const PAD = 1;
const G = N + 2 * PAD;

const spriteAt = (grid: Cell[][], y: number, x: number): Cell =>
  grid[y - PAD]?.[x - PAD] ?? null;

const R_DEFAULT = 0.42;

/* sprite dilated by PAD cells (8-connected), enclosed holes filled */
export function stickerMask(grid: Cell[][]): boolean[][] {
  const m: boolean[][] = Array.from({ length: G }, () => Array(G).fill(false));
  for (let y = 0; y < G; y++)
    for (let x = 0; x < G; x++) {
      if (!spriteAt(grid, y, x)) continue;
      for (let dy = -PAD; dy <= PAD; dy++)
        for (let dx = -PAD; dx <= PAD; dx++) m[y + dy][x + dx] = true;
    }
  const outside: boolean[][] = Array.from({ length: G }, () =>
    Array(G).fill(false),
  );
  const stack: [number, number][] = [];
  for (let i = 0; i < G; i++)
    stack.push([0, i], [G - 1, i], [i, 0], [i, G - 1]);
  while (stack.length) {
    const [y, x] = stack.pop()!;
    if (y < 0 || x < 0 || y >= G || x >= G || outside[y][x] || m[y][x])
      continue;
    outside[y][x] = true;
    stack.push([y + 1, x], [y - 1, x], [y, x + 1], [y, x - 1]);
  }
  return m.map((row, y) => row.map((v, x) => v || !outside[y][x]));
}

/* mask silhouette as closed loops: emit each cell's exposed edges clockwise */
export function outlinePath(m: boolean[][], R: number): string {
  const at = (y: number, x: number) =>
    y >= 0 && x >= 0 && y < G && x < G && m[y][x];
  const edges = new Map<string, [number, number][]>();
  const add = (x1: number, y1: number, x2: number, y2: number) => {
    const k = `${x1},${y1}`;
    if (!edges.has(k)) edges.set(k, []);
    edges.get(k)!.push([x2, y2]);
  };
  for (let y = 0; y < G; y++)
    for (let x = 0; x < G; x++) {
      if (!m[y][x]) continue;
      if (!at(y - 1, x)) add(x, y, x + 1, y);
      if (!at(y, x + 1)) add(x + 1, y, x + 1, y + 1);
      if (!at(y + 1, x)) add(x + 1, y + 1, x, y + 1);
      if (!at(y, x - 1)) add(x, y + 1, x, y);
    }
  let d = "";
  for (const [start, ends] of edges) {
    while (ends.length) {
      const [sx, sy] = start.split(",").map(Number);
      const pts: [number, number][] = [];
      let cur: [number, number] = [sx, sy];
      for (let guard = 0; guard < G * G * 4; guard++) {
        const list = edges.get(`${cur[0]},${cur[1]}`);
        if (!list?.length) break;
        pts.push(cur);
        cur = list.pop()!;
        if (cur[0] === sx && cur[1] === sy) break;
      }
      const simple = pts.filter((p, i) => {
        const a = pts[(i + pts.length - 1) % pts.length];
        const b = pts[(i + 1) % pts.length];
        return !((a[0] === p[0] && p[0] === b[0]) || (a[1] === p[1] && p[1] === b[1]));
      });
      if (simple.length < 3) continue;
      const n = simple.length;
      const f = (v: number) => +v.toFixed(2);
      if (R <= 0) {
        d += "M" + simple.map(([x, y]) => `${x} ${y}`).join("L") + "Z";
        continue;
      }
      let seg = "";
      for (let i = 0; i < n; i++) {
        const a = simple[(i + n - 1) % n];
        const p = simple[i];
        const b = simple[(i + n + 1) % n];
        const din = [Math.sign(p[0] - a[0]), Math.sign(p[1] - a[1])];
        const dout = [Math.sign(b[0] - p[0]), Math.sign(b[1] - p[1])];
        const p1 = [p[0] - din[0] * R, p[1] - din[1] * R];
        const p2 = [p[0] + dout[0] * R, p[1] + dout[1] * R];
        const sweep = din[0] * dout[1] - din[1] * dout[0] > 0 ? 1 : 0;
        seg += `${i === 0 ? "M" : "L"}${f(p1[0])} ${f(p1[1])}A${R} ${R} 0 0 ${sweep} ${f(p2[0])} ${f(p2[1])}`;
      }
      d += seg + "Z";
    }
  }
  return d;
}

export function stickerSvg(
  grid: Cell[][],
  colors: Record<string, string>,
  mask: boolean[][],
  radius: number,
): string {
  const fillAt = (y: number, x: number): string | null => {
    const ch = spriteAt(grid, y, x);
    return ch ? colors[ch] : mask[y][x] ? "#ffffff" : null;
  };
  let art = "";
  for (let y = 0; y < G; y++) {
    let x = 0;
    while (x < G) {
      const f = fillAt(y, x);
      let w = 1;
      while (x + w < G && fillAt(y, x + w) === f) w++;
      if (f) art += `<rect x="${x}" y="${y}" width="${w}" height="1" fill="${f}"/>`;
      x += w;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${G} ${G}" width="76.2mm" height="76.2mm" shape-rendering="crispEdges">
<g id="artwork">${art}</g>
<g id="cutline"><title>CutContour</title><path d="${outlinePath(mask, radius)}" fill="none" stroke="#ff00ff" stroke-width="0.05"/></g>
</svg>`;
}

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = vec2(aPos.x, -aPos.y) * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uTilt;
uniform float uGrid;
uniform vec2 uRes;
uniform float uRadius;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
vec3 spectrum(float x) {
  return clamp(0.5 + 0.5 * cos(6.28318 * (x + vec3(0.0, 0.33, 0.67))), 0.0, 1.0);
}

bool solidAt(vec2 cell) {
  if (cell.x < 0.0 || cell.y < 0.0 || cell.x >= uGrid || cell.y >= uGrid) return false;
  return texture2D(uTex, (cell + 0.5) / uGrid).a > 0.5;
}

float cutDist(vec2 cell, vec2 f, bool s) {
  float r = uRadius;
  bool L = solidAt(cell + vec2(-1.0, 0.0)), Rt = solidAt(cell + vec2(1.0, 0.0));
  bool T = solidAt(cell + vec2(0.0, -1.0)), B = solidAt(cell + vec2(0.0, 1.0));
  float d = s ? 1e3 : -1e3;
  if (s) {
    if (!L) d = min(d, f.x);
    if (!Rt) d = min(d, 1.0 - f.x);
    if (!T) d = min(d, f.y);
    if (!B) d = min(d, 1.0 - f.y);
  }
  for (int k = 0; k < 4; k++) {
    bool right = (k == 1 || k == 3);
    bool bottom = (k >= 2);
    vec2 uv = vec2(right ? 1.0 - f.x : f.x, bottom ? 1.0 - f.y : f.y);
    if (uv.x >= r || uv.y >= r) continue;
    bool A = right ? Rt : L;
    bool Bv = bottom ? B : T;
    bool Dg = solidAt(cell + vec2(right ? 1.0 : -1.0, bottom ? 1.0 : -1.0));
    if (s) {
      if (!A && !Bv) d = r - length(uv - vec2(r, r));
      else if (!A && Bv && Dg) d = length(uv - vec2(-r, r)) - r;
      else if (A && !Bv && Dg) d = length(uv - vec2(r, -r)) - r;
    } else if (A && Bv && Dg) {
      d = max(d, length(uv - vec2(r, r)) - r);
    }
  }
  return d;
}

void main() {
  vec2 cell = floor(vUv * uGrid);
  vec2 f = fract(vUv * uGrid);
  bool s = solidAt(cell);
  float d = cutDist(cell, f, s);
  float px = uGrid / uRes.x;
  float alpha = smoothstep(-0.5 * px, 0.5 * px, d);
  if (alpha <= 0.0) discard;
  vec4 c = s ? texture2D(uTex, vUv) : vec4(1.0);

  vec3 N = normalize(vec3(sin(uTilt.x), -sin(uTilt.y), cos(uTilt.x) * cos(uTilt.y)));
  vec3 V = normalize(vec3((0.5 - vUv) * vec2(0.5, -0.5), 1.4));
  vec3 L = normalize(vec3(-0.45, 0.55, 0.75));
  vec3 H = normalize(L + V);
  float ndl = max(dot(N, L), 0.0);
  float ndh = max(dot(N, H), 0.0);
  float ndv = max(dot(N, V), 0.0);
  float fresnel = pow(1.0 - ndv, 4.0);
  float specBroad = pow(ndh, 22.0);
  float specTight = pow(ndh, 260.0);

  vec2 uvS = vUv * vec2(1.0, uRes.y / uRes.x);
  float ang = N.x * 1.3 - N.y * 0.9;
  float coord = uvS.x * 0.9 + uvS.y * 0.7;
  float w = coord * 1.35 + ang * 2.6 + (noise(uvS * 4.0) - 0.5) * 0.22;
  vec3 iri = spectrum(w);
  vec3 field = (0.45 + 0.85 * iri) * (0.75 + 0.35 * ndl);

  vec2 flake = floor(gl_FragCoord.xy * 100.0 / uRes.x);
  vec2 jit = (vec2(hash(flake), hash(flake + 7.31)) - 0.5) * 0.9;
  vec3 Nf = normalize(N + vec3(jit, 0.0));
  float glint = pow(max(dot(Nf, H), 0.0), 420.0) * step(0.55, hash(flake + 3.3));
  vec3 glintCol = glint * (0.7 + 1.1 * spectrum(hash(flake + 1.7)));
  vec3 gloss = vec3(specBroad * 0.35 + specTight * 0.9 + fresnel * 0.18);

  vec3 silver = vec3(0.78, 0.80, 0.85);
  vec3 foil = silver * field + glintCol + gloss;

  float grain = 1.0 + (noise(uvS * 160.0) - 0.5) * 0.14;
  vec3 ink = c.rgb * grain * (0.84 + 0.24 * ndl);
  ink += vec3(specBroad * 0.30 + specTight * 0.85 + fresnel * 0.14);
  float lum = dot(c.rgb, vec3(0.299, 0.587, 0.114));
  float thin = smoothstep(0.45, 0.95, lum);
  vec3 inkHolo = c.rgb * grain * field + glintCol * 0.8 + gloss;
  ink = mix(ink, inkHolo, thin);

  float white = smoothstep(0.86, 0.97, min(c.r, min(c.g, c.b)));
  vec3 col = mix(ink, foil, white);

  float edge = 1.0 - smoothstep(1.1 * px, 3.4 * px, d);
  col *= 1.0 - 0.22 * edge;
  col += (hash(gl_FragCoord.xy) - 0.5) * 0.02;
  gl_FragColor = vec4(col * alpha, alpha);
}`;

function initGl(canvas: HTMLCanvasElement, tex: Uint8Array) {
  const gl = canvas.getContext("webgl", { antialias: false });
  if (!gl) return null;
  const sh = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const aPos = gl.getAttribLocation(prog, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    G,
    G,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    tex,
  );

  const uTilt = gl.getUniformLocation(prog, "uTilt");
  const uGrid = gl.getUniformLocation(prog, "uGrid");
  const uRes = gl.getUniformLocation(prog, "uRes");
  const uRadius = gl.getUniformLocation(prog, "uRadius");
  gl.uniform1f(uGrid, G);
  gl.uniform1f(uRadius, R_DEFAULT);

  return {
    draw(tiltX: number, tiltY: number, w: number, h: number) {
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      gl.uniform2f(uTilt, tiltX, tiltY);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
  };
}

export function primeMotionPermission() {
  if (typeof DeviceOrientationEvent !== "undefined" && "requestPermission" in DeviceOrientationEvent) {
    try {
      // @ts-ignore
      DeviceOrientationEvent.requestPermission();
    } catch {
      /* ignore */
    }
  }
}

export function StickerOverlay({
  grid,
  colors,
  onClose,
}: {
  grid: Cell[][];
  colors: Record<string, string>;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mask = useMemo(() => stickerMask(grid), [grid]);
  const [tilt, setTilt] = useState({ x: 0.15, y: -0.1 });
  const [dragging, setDragging] = useState(false);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);

  const texData = useMemo(() => {
    const bytes = new Uint8Array(G * G * 4);
    for (let y = 0; y < G; y++)
      for (let x = 0; x < G; x++) {
        const idx = (y * G + x) * 4;
        const ch = spriteAt(grid, y, x);
        const isMask = mask[y][x];
        if (ch) {
          const hex = colors[ch] || "#ffffff";
          bytes[idx] = parseInt(hex.slice(1, 3), 16);
          bytes[idx + 1] = parseInt(hex.slice(3, 5), 16);
          bytes[idx + 2] = parseInt(hex.slice(5, 7), 16);
          bytes[idx + 3] = 255;
        } else if (isMask) {
          bytes[idx] = 255;
          bytes[idx + 1] = 255;
          bytes[idx + 2] = 255;
          bytes[idx + 3] = 255;
        } else {
          bytes[idx + 3] = 0;
        }
      }
    return bytes;
  }, [grid, colors, mask]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const glCtx = initGl(canvas, texData);
    if (!glCtx) return;

    let raf = 0;
    const render = () => {
      glCtx.draw(tilt.x, tilt.y, canvas.width, canvas.height);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [texData, tilt]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    lastPointer.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || !lastPointer.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    setTilt((prev) => ({
      x: Math.max(-0.6, Math.min(0.6, prev.x + dx * 0.006)),
      y: Math.max(-0.6, Math.min(0.6, prev.y + dy * 0.006)),
    }));
  };

  const handlePointerUp = () => {
    setDragging(false);
    lastPointer.current = null;
  };

  const handleDownloadSvg = () => {
    const svgStr = stickerSvg(grid, colors, mask, R_DEFAULT);
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = `bot-sticker-cutcontour.svg`;
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        color: "#fff",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "#111",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: "12px",
          padding: "2rem",
          maxWidth: "480px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
        }}
      >
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600, letterSpacing: "0.05em", margin: 0, textTransform: "lowercase" }}>
            holographic sticker
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#aaa",
              padding: "0.25rem 0.6rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            width: "300px",
            height: "300px",
            position: "relative",
            cursor: dragging ? "grabbing" : "grab",
            touchAction: "none",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "8px",
            }}
          />
        </div>

        <p style={{ margin: 0, fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.6)", textAlign: "center" }}>
          drag sticker to tilt & catch holographic rainbow reflections and glitter glints
        </p>

        <div style={{ display: "flex", gap: "0.75rem", width: "100%" }}>
          <button
            onClick={handleDownloadSvg}
            style={{
              flex: 1,
              background: "#fff",
              color: "#000",
              border: "none",
              padding: "0.6rem 1rem",
              borderRadius: "6px",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.85rem",
            }}
          >
            download svg (cutcontour)
          </button>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#fff",
              padding: "0.6rem 1rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.85rem",
            }}
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
}
