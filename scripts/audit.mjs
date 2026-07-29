import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = process.argv[2];
const name = process.argv[3] || 'site';

if (!url) {
  console.error("Usage: node scripts/audit.mjs <url> <name>");
  process.exit(1);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1080 }
  });
  
  await page.goto(url, { waitUntil: 'networkidle' });
  
  const outDir = path.join(__dirname, '..', 'docs', 'design-references');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  // Take screenshot
  const outPath = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: outPath, fullPage: true });
  
  // Extract design tokens
  const designTokens = await page.evaluate(() => {
    const getComputedStyles = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        fontFamily: styles.fontFamily,
        fontSize: styles.fontSize,
        padding: styles.padding,
        borderRadius: styles.borderRadius
      };
    };

    const getColors = () => {
      const elements = document.querySelectorAll('*');
      const colors = new Set();
      const bgColors = new Set();
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.color && style.color !== 'rgba(0, 0, 0, 0)') colors.add(style.color);
        if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)') bgColors.add(style.backgroundColor);
      });
      return { colors: Array.from(colors).slice(0, 10), bgColors: Array.from(bgColors).slice(0, 10) };
    };

    return {
      body: getComputedStyles('body'),
      h1: getComputedStyles('h1'),
      button: getComputedStyles('button') || getComputedStyles('a.button') || getComputedStyles('.btn'),
      nav: getComputedStyles('nav') || getComputedStyles('header'),
      palette: getColors()
    };
  });
  
  const jsonPath = path.join(outDir, `${name}_tokens.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(designTokens, null, 2));
  
  await browser.close();
  console.log(`Saved screenshot to ${outPath}`);
  console.log(`Saved design tokens to ${jsonPath}`);
})();
