import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ScrambleText } from '@/components/ui/TextEffects';
import styles from './EffectsLabLanding.module.css';

export function EffectsLabLanding() {
  const [inputText, setInputText] = useState('INITIATING SEQUENCE');
  
  // Optional: Debounce or update on submit, but typing live is very fun for scramble text.
  // We'll update live for maximum interaction.

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>&larr; Back to Hub</Link>
      
      <ScrambleText 
        text={inputText || ' '} // provide a space if empty so it doesn't collapse
        className={styles.scrambleText} 
        speed={40}
      />

      <div className={styles.inputWrapper}>
        <label className={styles.label}>Enter new text string:</label>
        <input 
          type="text"
          className={styles.input}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type something..."
          autoFocus
        />
      </div>
    </div>
  );
}
