import React, { useState, useEffect, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string | undefined;
  style?: React.CSSProperties;
  speed?: number; // ms per frame
  scrambleCharacters?: string;
}

const DEFAULT_CHARS = '!<>-_\\/[]{}—=+*^?#________';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  style,
  speed = 40,
  scrambleCharacters = DEFAULT_CHARS,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const queueRef = useRef<Array<{ from: string; to: string; start: number; end: number; char?: string }>>([]);
  const frameRef = useRef<number>(0);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    let oldText = displayText;
    const newText = text;
    
    // Pad old text to match new text length so animation looks smooth
    const length = Math.max(oldText.length, newText.length);
    
    queueRef.current = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      // Stagger the start and end frames for a cascading left-to-right effect
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40) + (i * 2); 
      queueRef.current.push({ from, to, start, end });
    }

    let frame = 0;
    
    const update = () => {
      let output = '';
      let complete = 0;
      
      for (let i = 0; i < queueRef.current.length; i++) {
        const item = queueRef.current[i]!;
        let { from, to, start, end, char } = item;
        
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = scrambleCharacters[Math.floor(Math.random() * scrambleCharacters.length)] || '?';
            queueRef.current[i]!.char = char;
          }
          // Wrap random character in a span for a lighter grey color? (Optional, kept simple here)
          output += char;
        } else {
          output += from;
        }
      }
      
      setDisplayText(output);
      
      if (complete === queueRef.current.length) {
        cancelAnimationFrame(requestRef.current);
      } else {
        // Slow down the animation slightly by only updating every N frames, or using timeout
        requestRef.current = requestAnimationFrame(() => {
          setTimeout(update, speed);
        });
        frame++;
      }
    };
    
    cancelAnimationFrame(requestRef.current);
    update();
    
    return () => cancelAnimationFrame(requestRef.current);
  }, [text]); // Re-run whenever text prop changes

  return (
    <span className={className} style={style}>
      {displayText}
    </span>
  );
};
