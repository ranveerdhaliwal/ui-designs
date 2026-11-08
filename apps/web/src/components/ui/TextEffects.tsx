import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
interface ScrambleTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  speed?: number;
  scrambleCharacters?: string;
}
export function ScrambleText({
  text,
  className,
  style,
  speed = 25,
  scrambleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const previous = useRef(text);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) {
      setDisplay(text);
      previous.current = text;
      return;
    }
    let tick = 0;
    const chars = scrambleCharacters || '01';
    const max = Math.max(12, text.length + 8);
    const timer = window.setInterval(
      () => {
        tick++;
        const resolved = Math.max(0, tick - 5);
        setDisplay(
          text
            .split('')
            .map((char, i) =>
              char === ' '
                ? ' '
                : i < resolved
                  ? char
                  : chars[Math.floor(Math.random() * chars.length)],
            )
            .join(''),
        );
        if (tick >= max) {
          setDisplay(text);
          clearInterval(timer);
        }
      },
      Math.max(10, speed),
    );
    previous.current = text;
    return () => clearInterval(timer);
  }, [text, speed, scrambleCharacters, reduced]);
  return (
    <span className={className} style={style} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
