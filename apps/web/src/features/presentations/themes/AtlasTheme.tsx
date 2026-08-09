import React from 'react';
import { AgenticSerif, AgenticSans } from '@/components/ui/Typography';
import { RisographImage } from '@/components/ui/VintageTexture';
import { getAssetUrl } from '@/lib/assetUtils';

/* Imaginary Atlas Theme (Surrealist Risograph) */

export const AtlasSlides = [
  // Slide 1: Cover
  <div key="1" style={{ display: 'flex', width: '100%', height: '100%', background: '#EAE5DB', color: '#111' }}>
    <div style={{ flex: 1, padding: '4rem', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 10 }}>
      <AgenticSerif style={{ fontSize: '8rem', lineHeight: 0.85, margin: 0 }}>
        IMAGINARY<br/>ATLAS
      </AgenticSerif>
      <div style={{ width: '80px', height: '80px', background: '#D9422E', borderRadius: '50%', margin: '2rem 0' }} />
      <AgenticSans style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, maxWidth: '200px' }}>
        An editorial exploration of dreams & structures
      </AgenticSans>
      <div style={{ marginTop: 'auto', borderTop: '1px solid #111', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700 }}>
        <span>EXHIBITION CATALOGUE</span>
        <span>VOL 1</span>
      </div>
    </div>
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      <RisographImage src={getAssetUrl("/assets/aeterna_hero.png")} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  </div>,

  // Slide 2: Concept
  <div key="2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', height: '100%', background: '#EAE5DB', color: '#111' }}>
    <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <AgenticSans style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4rem', borderBottom: '2px solid #111', display: 'inline-block', paddingBottom: '0.5rem', width: 'max-content' }}>Concept</AgenticSans>
      <AgenticSans style={{ fontSize: '5rem', fontWeight: 800, lineHeight: 1, margin: '0 0 2rem' }}>
        SEE<br/>BEYOND<br/>THE<br/>OBVIOUS.
      </AgenticSans>
      <AgenticSans style={{ fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 700, maxWidth: '200px' }}>
        A manifesto for curious minds
      </AgenticSans>
    </div>
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '50%', height: '40%', background: '#3155A3' }} />
      <RisographImage src={getAssetUrl("/assets/aeterna_hero.png")} style={{ width: '80%', height: '80%', objectFit: 'contain', position: 'absolute', top: '10%', left: '10%' }} />
    </div>
  </div>,

  // Slide 3: Quote
  <div key="3" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', width: '100%', height: '100%', background: '#EAE5DB', color: '#111', padding: '4rem' }}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <AgenticSans style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 'auto', borderBottom: '2px solid #111', display: 'inline-block', paddingBottom: '0.5rem', width: 'max-content' }}>Quote</AgenticSans>
      <AgenticSerif style={{ fontSize: '6rem', lineHeight: 1, margin: 0 }}>
        "We do not see things as they are, we see them as we are."
      </AgenticSerif>
      <AgenticSans style={{ alignSelf: 'flex-end', marginTop: '2rem', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem' }}>Anaïs Nin</AgenticSans>
    </div>
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: '30%', left: '30%', width: '200px', height: '200px', background: '#3155A3', borderRadius: '50%' }} />
      <RisographImage src={getAssetUrl("/assets/aeterna_hero.png")} style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'relative', zIndex: 10, mixBlendMode: 'multiply' }} />
    </div>
  </div>
];
