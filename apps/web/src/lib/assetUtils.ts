/**
 * Utility to resolve asset URLs correctly when the app is deployed to a subpath
 * like GitHub Pages.
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  const basePath = import.meta.env?.BASE_URL || '/';

  // If path is an absolute URL or data URI, return as-is
  if (/^(https?:|data:|blob:)/.test(path)) {
    return path;
  }

  // Clean up slashes to avoid double slashes like /ui-designs//assets/img.png
  const cleanBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${cleanBase}${cleanPath}`;
}
