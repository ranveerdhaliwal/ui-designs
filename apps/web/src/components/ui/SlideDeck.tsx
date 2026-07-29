import React, { useState, useEffect } from 'react';
import styles from './SlideDeck.module.css';

interface Theme {
  id: string;
  name: string;
  slides: React.ReactNode[];
}

interface SlideDeckProps {
  themes: Theme[];
}

export const SlideDeck: React.FC<SlideDeckProps> = ({ themes }) => {
  if (!themes || themes.length === 0) return null;
  const [activeThemeId, setActiveThemeId] = useState(themes[0]?.id || '');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const activeTheme = themes.find(t => t.id === activeThemeId) || themes[0];
  const slides = activeTheme?.slides || [];

  // Reset slide index when changing themes
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [activeThemeId]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlideIndex(prev => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex(prev => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  return (
    <div className={styles.deckContainer}>
      <div className={styles.controls}>
        <select 
          className={styles.select}
          value={activeThemeId}
          onChange={(e) => setActiveThemeId(e.target.value)}
        >
          {themes.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        
        <button 
          className={styles.navButton}
          disabled={currentSlideIndex === 0}
          onClick={() => setCurrentSlideIndex(p => p - 1)}
        >
          &larr;
        </button>
        <span className={styles.slideIndicator}>
          {currentSlideIndex + 1} / {slides.length}
        </span>
        <button 
          className={styles.navButton}
          disabled={currentSlideIndex === slides.length - 1}
          onClick={() => setCurrentSlideIndex(p => p + 1)}
        >
          &rarr;
        </button>
      </div>

      <div className={styles.slideViewport}>
        <div className={styles.slideWrapper} key={`${activeThemeId}-${currentSlideIndex}`}>
          {slides[currentSlideIndex]}
        </div>
      </div>
    </div>
  );
};
