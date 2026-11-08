import { getAssetUrl } from '@/lib/assetUtils';
export function WetPaintFrame() {
  return (
    <iframe
      title="Wet Paint interactive painting studio"
      src={getAssetUrl('/wet-paint.html')}
      style={{
        display: 'block',
        border: 0,
        width: '100%',
        height: 'calc(100dvh - 48px)',
        minHeight: 600,
      }}
      allow="fullscreen"
    />
  );
}
