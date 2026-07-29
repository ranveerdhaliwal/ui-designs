import React from 'react';
import { Link } from '@tanstack/react-router';
import { ScrollWorldEngine } from './ScrollEngine';

export function ScrollWorldLanding() {
  const config = {
    brand: { name: 'Veo World', href: '#' },
    diveScroll: 1.5, // 1.5 viewport heights of scroll per clip
    connScroll: 0,   // no connectors since we use Architecture A (forward take)
    crossfade: 0.12, // seamless blending width
    hint: 'SCROLL DOWN TO FLY IN',
    sections: [
      { 
        id: 'scene1', 
        label: 'The Journey Begins', 
        // We use placeholder videos here. Once you generate your Veo videos,
        // simply drop them into the `public/assets/` folder and update these paths!
        clip: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        scroll: 1.5, 
        linger: 0.3,
        accent: '#F97316', 
        eyebrow: 'Chapter 1', 
        title: 'Enter the Veo World', 
        body: 'A buttery smooth scrolling experience. The camera gently glides forward. Once your Veo clips are ready, replace these placeholder MP4s.', 
        tags: ['Seamless', 'Cinematic'] 
      },
      { 
        id: 'scene2', 
        label: 'The Middle', 
        clip: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        scroll: 1.5, 
        linger: 0.3,
        accent: '#3B82F6', 
        eyebrow: 'Chapter 2', 
        title: 'Deep in the Dream', 
        body: 'Notice how the scroll position directly ties to the current time of the video. It stops exactly when you stop.', 
        tags: ['Smooth Scrubbing'] 
      },
      { 
        id: 'scene3', 
        label: 'The Finale', 
        clip: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        scroll: 2.0, 
        linger: 0.5,
        accent: '#E11D48', 
        eyebrow: 'Chapter 3', 
        title: 'The Destination', 
        body: 'By keeping a forward glide and matching the first and last frames, your Veo videos will transition without any cuts.', 
        tags: ['Google Veo', 'Perfection'],
        cta: { primary: { label: 'Go Back to Hub', href: '/' } }
      }
    ],
    // Architecture A doesn't use connector clips! 
    connectors: []
  };

  return (
    <>
      <Link 
        to="/" 
        style={{ 
          position: 'fixed', 
          top: '20px', 
          left: '20px', 
          zIndex: 9999, 
          background: 'rgba(255,255,255,0.8)', 
          padding: '10px 20px', 
          borderRadius: '99px',
          textDecoration: 'none',
          color: '#000',
          fontWeight: 'bold',
          backdropFilter: 'blur(10px)'
        }}
      >
        &larr; Back to Hub
      </Link>
      <ScrollWorldEngine config={config} />
    </>
  );
}
