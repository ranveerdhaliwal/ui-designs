import React, { useState, useEffect } from 'react';

const sequence = [
  "NEXT 16.X",
  "SANITY V6",
  "TS: STRICT",
  "AGENTS.MD: LOADED",
  "MCP: ONLINE"
];

export function TypewriterFooter() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentString = sequence[index];
    if (!currentString) return;
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < currentString.length) {
      // Typing forward
      timeoutId = setTimeout(() => {
        setText(prev => prev + currentString[charIndex]);
        setCharIndex(c => c + 1);
      }, 50); // fast typing
    } else if (isDeleting && charIndex > 0) {
      // Deleting backward
      timeoutId = setTimeout(() => {
        setText(prev => prev.slice(0, -1));
        setCharIndex(c => c - 1);
      }, 30);
    } else if (!isDeleting && charIndex === currentString.length) {
      // Pause at end of word
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, 2000); // Wait 2s before deleting
    } else if (isDeleting && charIndex === 0) {
      // Move to next word
      setIsDeleting(false);
      setIndex((i) => (i + 1) % sequence.length);
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, index]);

  return (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "0.875rem",
      color: "#1F1F1F",
      fontWeight: 700,
      letterSpacing: "0.05em",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }}>
      <span>{text}</span>
      <span style={{ 
        display: "inline-block", 
        width: "10px", 
        height: "1em", 
        backgroundColor: "#1F1F1F",
        animation: "blink 1s step-end infinite" 
      }} />
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
