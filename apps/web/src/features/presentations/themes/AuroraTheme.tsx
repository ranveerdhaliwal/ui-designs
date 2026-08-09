import React from 'react';
import { AgenticSerif, AgenticSans } from '@/components/ui/Typography';
import { RisographImage, TornEdgeContainer } from '@/components/ui/VintageTexture';
import { getAssetUrl } from '@/lib/assetUtils';

/* Aurora Studio Theme (Corporate Collage) */

export const AuroraSlides = [
  // Slide 1: Cover
  <div key="1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', height: '100%', background: '#FAF8F5', color: '#1A1A1A' }}>
    <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <AgenticSans style={{ fontSize: '1rem', textTransform: 'uppercase', marginBottom: '2rem' }}>Aurora Studio</AgenticSans>
      <AgenticSerif style={{ fontSize: '6rem', lineHeight: 0.9, margin: '0 0 2rem' }}>Ideas<br/>That Move<br/>Business</AgenticSerif>
      <AgenticSans style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 1rem' }}>Strategy. Design. Impact.</AgenticSans>
      <AgenticSans style={{ fontSize: '0.9rem', color: '#666', maxWidth: '300px', lineHeight: 1.6 }}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</AgenticSans>
    </div>
    <div style={{ position: 'relative', overflow: 'hidden', borderLeft: '4px solid #1A1A1A' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#FAF8F5' }} />
      {/* Torn edge wrapper for the image */}
      <TornEdgeContainer style={{ position: 'absolute', top: '10%', right: '10%', width: '80%', height: '80%' }}>
         {/* Using one of our vintage risograph images to simulate the eye collage */}
         <RisographImage src={getAssetUrl("/assets/aeterna_hero.png")} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </TornEdgeContainer>
      <div style={{ position: 'absolute', bottom: '20%', left: '-10%', width: '200px', height: '200px', background: '#00A896', borderRadius: '50%', mixBlendMode: 'multiply' }} />
      <div style={{ position: 'absolute', top: '20%', right: '0', width: '150px', height: '300px', background: '#F2A65A', mixBlendMode: 'multiply' }} />
    </div>
  </div>,

  // Slide 2: Approach
  <div key="2" style={{ display: 'grid', gridTemplateColumns: '400px 1fr', width: '100%', height: '100%', background: '#FAF8F5' }}>
    <div style={{ background: '#1A1A1A', color: '#FFF', padding: '4rem', display: 'flex', flexDirection: 'column' }}>
      <AgenticSerif style={{ fontSize: '12rem', margin: 'auto 0' }}>02</AgenticSerif>
      <h3 style={{ fontSize: '2rem', borderBottom: '2px solid #F2A65A', paddingBottom: '1rem', margin: '0 0 1rem' }}>Our Approach</h3>
      <p style={{ color: '#CCC', lineHeight: 1.6 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Abstract geometric shapes overlapping */}
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: '40%', height: '40%', background: '#00A896' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: '30%', height: '50%', background: '#F2A65A', borderTopLeftRadius: '300px' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '400px', height: '400px', background: '#2B5EE8', borderRadius: '50%' }} />
    </div>
  </div>,

  // Slide 3: SWOT
  <div key="3" style={{ padding: '4rem', width: '100%', height: '100%', background: '#FAF8F5', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem' }}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <AgenticSerif style={{ fontSize: '4rem', lineHeight: 1, margin: '0 0 1rem' }}>SWOT<br/>Analysis</AgenticSerif>
      <AgenticSans style={{ color: '#2B5EE8', fontWeight: 600 }}>Finding clarity in<br/>the bigger picture.</AgenticSans>
      <div style={{ marginTop: 'auto', position: 'relative' }}>
         {/* Vintage texture filler */}
         <div style={{ width: '150px', height: '150px', background: '#F2A65A', borderRadius: '50%', position: 'absolute', bottom: 0, left: 0, mixBlendMode: 'multiply' }} />
         <RisographImage src={getAssetUrl("/assets/aeterna_hero.png")} style={{ width: '200px', height: '200px', objectFit: 'cover', clipPath: 'circle(50% at 50% 50%)', position: 'relative', zIndex: 10 }} />
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '2rem' }}>
      {['Strengths', 'Weaknesses', 'Opportunities', 'Threats'].map((item, idx) => (
        <div key={item} style={{ border: '1px solid #DDD', padding: '2rem', background: '#FFF' }}>
          <AgenticSerif style={{ fontSize: '3rem', color: ['#00A896', '#F03A28', '#2B5EE8', '#1A1A1A'][idx], margin: '0 0 1rem' }}>{item[0]}</AgenticSerif>
          <AgenticSans style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem' }}>{item}</AgenticSans>
          <AgenticSans style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.5 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</AgenticSans>
        </div>
      ))}
    </div>
  </div>
];
