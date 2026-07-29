import { chromium } from 'playwright';

(async () => {
  console.log("Launching browser...");
  const browser = await chromium.launch();
  
  console.log("Creating context with video recording...");
  const context = await browser.newContext({
    recordVideo: {
      dir: './videos/',
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();
  
  console.log("Navigating to inkdrum...");
  await page.goto('https://inkdrum.greathousefall.com/', { waitUntil: 'networkidle' });

  // Wait a bit to let initial animations play
  await page.waitForTimeout(2000);

  // Scroll down slowly
  console.log("Scrolling down the page slowly to capture animations...");
  for (let i = 0; i < 20; i++) {
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(600); // let animations play
  }

  console.log("Closing context and browser...");
  await context.close();
  await browser.close();
  
  console.log("Video recorded successfully to ./videos/ directory!");
})();
