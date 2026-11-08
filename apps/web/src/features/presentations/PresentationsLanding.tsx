import { SlideDeck } from '@/components/ui/SlideDeck';
import { AtlasSlides } from './themes/AtlasTheme';
import { AuroraSlides } from './themes/AuroraTheme';
import { BrandGuideSlides } from './themes/BrandGuideTheme';

export function PresentationsLanding() {
  const themes = [
    {
      id: 'brand-guide',
      name: 'Form & Color / Brand Guide',
      slides: BrandGuideSlides,
    },
    {
      id: 'aurora',
      name: 'Aurora / Studio Notes',
      slides: AuroraSlides,
    },
    {
      id: 'atlas',
      name: 'Atlas / Imagined Places',
      slides: AtlasSlides,
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <SlideDeck themes={themes} />
    </div>
  );
}
