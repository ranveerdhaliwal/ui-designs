const fs = require('fs');

const html = fs.readFileSync('/tmp/wet-paint-flow/index.html', 'utf-8');
const match = html.match(/<main id="app">([\s\S]*?)<\/main>/);
if (!match) throw new Error("No main element found");

let jsx = `<main id="app">\n${match[1]}\n</main>`;

// Basic JSX conversions
jsx = jsx.replace(/class=/g, 'className=');
jsx = jsx.replace(/for=/g, 'htmlFor=');
jsx = jsx.replace(/<input([^>]*[^/])>/g, '<input$1 />');
jsx = jsx.replace(/checked/g, 'defaultChecked');
jsx = jsx.replace(/disabled/g, 'disabled={true}');
jsx = jsx.replace(/hidden/g, 'hidden={true}');
jsx = jsx.replace(/selected/g, 'defaultValue'); // not perfect but OK for select
// Fix <br> or <hr> if any (none seen but just in case)
jsx = jsx.replace(/<br>/g, '<br />');

const reactCode = `import React, { useEffect, useRef } from 'react';
import './WetPaintApp.css';
import { initEngine } from './Engine';

export default function WetPaintApp() {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      // Wait for next frame to ensure DOM is ready
      requestAnimationFrame(() => {
        try {
          initEngine();
        } catch (e) {
          console.error("Engine failed to init", e);
        }
      });
    }
  }, []);

  return (
    ${jsx.split('\n').join('\n    ')}
  );
}
`;

fs.writeFileSync('apps/web/src/features/wet-paint-flow/WetPaintApp.tsx', reactCode);
console.log("Converted successfully");
