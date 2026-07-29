import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = process.argv[2];
const outputName = process.argv[3] || 'screenshot.png';

if (!url) {
  console.error("Usage: node scripts/screenshot.mjs <url> [output_filename.png]");
  process.exit(1);
}

(async () => {
  console.log(`Launching browser to screenshot ${url}...`);
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1080 }
  });
  
  await page.goto(url, { waitUntil: 'networkidle' });
  
  const outDir = path.join(__dirname, '..', 'docs', 'design-references');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  const outPath = path.join(outDir, outputName);
  await page.screenshot({ path: outPath, fullPage: true });
  
  await browser.close();
  console.log(`Screenshot successfully saved to ${outPath}`);
})();
