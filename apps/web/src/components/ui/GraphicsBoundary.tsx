import { Component, useEffect, useState, type ReactNode } from 'react';
class GraphicsError extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div role="status" style={{ padding: 32, color: '#839577', fontSize: 13 }}>
        This graphics preview isn’t available. Try another browser with WebGL enabled.
      </div>
    ) : (
      this.props.children
    );
  }
}
export function GraphicsBoundary({ children }: { children: ReactNode }) {
  const [supported, setSupported] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2');
      setSupported(!!gl);
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
    } catch {
      setSupported(false);
    }
  }, []);
  return supported === null ? (
    <p role="status">Preparing the canvas…</p>
  ) : supported ? (
    <GraphicsError>{children}</GraphicsError>
  ) : (
    <p role="status" style={{ padding: 32, fontSize: 13, color: '#839577' }}>
      This study needs WebGL 2. You can still browse the controls or explore another design.
    </p>
  );
}
