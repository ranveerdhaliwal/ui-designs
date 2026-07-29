import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export interface LiquidDistortionProps {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
}

export const LiquidDistortion: React.FC<LiquidDistortionProps> = ({
  children,
  intensity = 30,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const filterId = useRef(`liquid-filter-${Math.random().toString(36).substring(7)}`).current;

  return (
    <div 
      className={className} 
      style={{ filter: `url(#${filterId})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={isHovered ? "0.05 0.05" : "0.01 0.01"}
              numOctaves="2"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values={isHovered ? "0.01 0.01; 0.05 0.05" : "0.05 0.05; 0.01 0.01"}
                dur="0.5s"
                fill="freeze"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={isHovered ? intensity : 0}
              xChannelSelector="R"
              yChannelSelector="G"
            >
              <animate
                attributeName="scale"
                values={isHovered ? `0; ${intensity}` : `${intensity}; 0`}
                dur="0.5s"
                fill="freeze"
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>
      {children}
    </div>
  );
};
