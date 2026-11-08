export interface PaintRecipe {
  version: 1;
  values: Record<string, string>;
}
export function readRecipe(root: ParentNode = document): PaintRecipe {
  return {
    version: 1,
    values: Object.fromEntries(
      Array.from(root.querySelectorAll<HTMLInputElement>('input[type="range"][id]')).map(
        (input) => [input.id, input.value],
      ),
    ),
  };
}
export function applyRecipe(value: unknown, root: ParentNode = document): boolean {
  if (!value || typeof value !== 'object') return false;
  const p = value as PaintRecipe;
  if (p.version !== 1 || !p.values || typeof p.values !== 'object' || Array.isArray(p.values))
    return false;
  const entries = Object.entries(p.values);
  if (entries.length > 50) return false;
  const controls = Array.from(root.querySelectorAll<HTMLInputElement>('input[type="range"][id]'));
  const changes: [HTMLInputElement, string][] = [];
  for (const [id, v] of entries) {
    const input = controls.find((el) => el.id === id);
    if (
      !input ||
      typeof v !== 'string' ||
      v.trim() === '' ||
      !Number.isFinite(Number(v)) ||
      Number(v) < Number(input.min) ||
      Number(v) > Number(input.max)
    )
      return false;
    changes.push([input, v]);
  }
  for (const [input, v] of changes) {
    input.value = v;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }
  return true;
}
