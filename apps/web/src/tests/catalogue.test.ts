import { describe, it, expect } from 'vitest';
import { demos, filterDemos } from '@/data/demos';
import { routeTree } from '@/router';
import { getAssetUrl } from '@/lib/assetUtils';
describe('gallery navigation', () => {
  it('registers every gallery entry exactly once', () => {
    const paths = routeTree.children?.map((route) =>
      'path' in route.options ? route.options.path : undefined,
    );
    expect(demos).toHaveLength(31);
    expect(new Set(demos.map((d) => d.path)).size).toBe(demos.length);
    for (const demo of demos) expect(paths).toContain(demo.path);
  });
  it('restores the four previously unreachable studies', () => {
    for (const id of ['quasar', 'conversion', 'aeterna', 'presentations'])
      expect(demos.find((d) => d.id === id)).toBeDefined();
  });
  it('searches across words and combines category filters', () => {
    expect(filterDemos('  PIXEL   companion ', 'Tools').map((d) => d.id)).toEqual(['botlab']);
    expect(filterDemos('pixel companion', 'Templates')).toEqual([]);
    expect(filterDemos('')).toHaveLength(31);
    expect(filterDemos('nothing-matches-this')).toEqual([]);
  });
  it('preserves remote and local-upload URLs', () => {
    expect(getAssetUrl('blob:local-image')).toBe('blob:local-image');
    expect(getAssetUrl('data:image/png;base64,abc')).toBe('data:image/png;base64,abc');
    expect(getAssetUrl('https://example.com/image.png')).toBe('https://example.com/image.png');
    expect(getAssetUrl('/assets/a.png')).toMatch(/\/assets\/a.png$/);
  });
});
