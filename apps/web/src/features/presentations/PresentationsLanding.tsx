import React from 'react';
import { SlideDeck } from '@/components/ui/SlideDeck';
import { BrandGuideSlides } from './themes/BrandGuideTheme';
import { AuroraSlides } from './themes/AuroraTheme';
import { AtlasSlides } from './themes/AtlasTheme';

export function PresentationsLanding() {
  const themes = [
    {
      id: 'brand-guide',
      name: 'Brand Guide 2024 (Bauhaus)',
      slides: BrandGuideSlides,
    },
    {
      id: 'aurora',
      name: 'Aurora Studio (Corporate Collage)',
      slides: AuroraSlides,
    },
    {
      id: 'atlas',
      name: 'Imaginary Atlas (Surrealist)',
      slides: AtlasSlides,
    }
  ];

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <SlideDeck themes={themes} />
    </div>
  );
}
