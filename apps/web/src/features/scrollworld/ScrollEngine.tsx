import React, { useEffect, useRef } from 'react';
// @ts-ignore
import { mountScrollWorld } from './scrubEngine';

export function ScrollWorldEngine({ config }: { config: any }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const unmount = mountScrollWorld(containerRef.current, config);
    return () => {
      if (unmount) unmount();
    };
  }, [config]);

  return <div ref={containerRef} style={{ width: '100vw' }} />;
}
