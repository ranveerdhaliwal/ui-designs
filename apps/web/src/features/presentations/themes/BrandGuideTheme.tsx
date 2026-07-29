import React from 'react';
import { AgenticSans } from '@/components/ui/Typography';

/* Brand Guide 2024 Theme (Bauhaus Geometric) */

export const BrandGuideSlides = [
  // Slide 1: Cover
  <div key="1" style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', width: '100%', height: '100%', background: '#F5F5F5' }}>
    <div style={{ background: '#F03A28', color: '#FFF', padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
      <AgenticSans style={{ fontSize: '1rem', textTransform: 'uppercase', marginBottom: '4rem' }}>01 Brand Guidelines</AgenticSans>
      <h1 style={{ fontSize: '8rem', fontWeight: 900, lineHeight: 0.9, margin: 0, fontFamily: 'sans-serif' }}>BRAND<br/>GUIDE<br/>2024</h1>
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '200px', height: '200px', background: '#36A94C', borderTopLeftRadius: '200px' }} />
    </div>
    <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr 1fr' }}>
      <div style={{ background: '#2B5EE8', borderBottomLeftRadius: '100%' }} />
      <div style={{ background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100px', height: '100px', background: '#1A1A1A', borderRadius: '50%' }} />
      </div>
      <div style={{ background: '#F5BE25' }} />
    </div>
  </div>,

  // Slide 2: Purpose
  <div key="2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', height: '100%', background: '#FFF', padding: '4rem' }}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <AgenticSans style={{ fontSize: '1rem', textTransform: 'uppercase', color: '#666', marginBottom: 'auto' }}>02 Our Purpose</AgenticSans>
      <h2 style={{ fontSize: '4rem', fontWeight: 800, margin: '0 0 1rem', fontFamily: 'sans-serif' }}>Design<br/>for people.</h2>
      <h2 style={{ fontSize: '4rem', fontWeight: 800, margin: 0, fontFamily: 'sans-serif' }}>Create<br/>for impact.</h2>
      <div style={{ marginTop: 'auto' }} />
    </div>
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: '20%', width: '200px', height: '200px', background: '#2B5EE8', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', top: '200px', left: '20%', width: '200px', height: '200px', background: '#36A94C', borderTopLeftRadius: '200px' }} />
      <div style={{ position: 'absolute', top: '200px', right: '10%', width: '150px', height: '150px', background: '#F5BE25' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '350px', height: '200px', background: '#8A5DF2' }} />
    </div>
  </div>,
  
  // Slide 3: Typography
  <div key="3" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', width: '100%', height: '100%', background: '#FFF', padding: '4rem' }}>
    <div>
      <AgenticSans style={{ fontSize: '1rem', textTransform: 'uppercase', color: '#666', marginBottom: '4rem' }}>06 Typography</AgenticSans>
      <div style={{ display: 'flex', gap: '4rem' }}>
        <div>
          <h1 style={{ fontSize: '12rem', fontWeight: 800, margin: 0, lineHeight: 1, fontFamily: 'sans-serif' }}>Aa</h1>
          <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: '1rem 0' }}>Neue Haas Grotesk</h3>
          <p style={{ color: '#666', maxWidth: '300px', lineHeight: 1.6 }}>A modern grotesk typeface with clarity, neutrality and strong character.</p>
        </div>
        <div style={{ paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#999', margin: '0 0 0.5rem' }}>Headline (Bold / Tight Tracking)</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
          </div>
          <div>
            <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#999', margin: '0 0 0.5rem' }}>Body Text (Regular)</p>
            <p style={{ fontSize: '1rem', margin: 0, maxWidth: '400px', lineHeight: 1.6 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ flex: 1, background: '#2B5EE8', borderBottomLeftRadius: '200px' }} />
      <div style={{ height: '200px', background: '#36A94C' }} />
      <div style={{ height: '300px', background: '#F03A28' }} />
    </div>
  </div>
];
