import { useEffect, useRef } from 'react';
import { mountScrollWorld, type ScrollWorldConfig } from './scrubEngine';

export function ScrollWorldEngine({ config }: { config: ScrollWorldConfig }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const unmount = mountScrollWorld(containerRef.current, config);
    return () => {
      if (unmount) unmount();
    };
  }, [config]);

  return <div ref={containerRef} style={{ width: '100%' }} />;
}
