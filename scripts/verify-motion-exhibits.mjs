import { chromium, firefox } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base = process.env.BASE_URL || 'http://127.0.0.1:5182/ui-designs/';
const routes = ['paper-worlds', 'precision', 'chromatic', 'metamorphosis'];
const browser = await (process.env.BROWSER === 'firefox' ? firefox : chromium).launch({
  headless: true,
  ...(process.env.BROWSER !== 'firefox' && process.env.CHROMIUM_PATH
    ? { executablePath: process.env.CHROMIUM_PATH }
    : {}),
});
const report = [];
try {
  for (const [width, height] of [
    [1440, 1000],
    [390, 844],
    [375, 568],
    [900, 500],
  ])
    for (const reducedMotion of ['no-preference', 'reduce']) {
      const context = await browser.newContext({ viewport: { width, height }, reducedMotion });
      await context.route('https://fonts.googleapis.com/**', (r) => r.abort());
      await context.route('https://fonts.gstatic.com/**', (r) => r.abort());
      const page = await context.newPage();
      for (const route of routes) {
        const errors = [];
        const onError = (e) => errors.push(e.message);
        page.on('pageerror', onError);
        await page.goto(`${base}#/${route}`);
        const stage = page.locator('[data-stage]');
        await stage.waitFor();
        await page.waitForTimeout(250);
        const scroll = async (p) => {
          await page.locator('[data-story]').evaluate(
            (el, p) =>
              scrollTo({
                top: el.getBoundingClientRect().top + scrollY + (el.offsetHeight - innerHeight) * p,
                behavior: 'instant',
              }),
            p,
          );
          await page.waitForFunction(
            (expected) =>
              document.querySelector('[data-stage]')?.getAttribute('data-chapter') ===
              String(expected),
            Math.min(2, Math.floor(p * 3)),
          );
          await page.evaluate(
            () =>
              new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
          );
        };
        const signature = () =>
          page
            .locator('[data-art]')
            .evaluate((el) =>
              el.tagName.toLowerCase() === 'canvas' ? el.toDataURL() : el.innerHTML,
            );
        let initial;
        for (const [chapter, p] of [0.08, 0.5, 0.94].entries()) {
          await scroll(p);
          assert.equal(await stage.getAttribute('data-chapter'), String(chapter));
          assert.equal(
            await page.locator('nav[aria-label$="chapters"] button[aria-current]').count(),
            1,
          );
          assert.ok(
            await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
            'horizontal overflow',
          );
          const bounds = await page.locator('nav[aria-label$="chapters"]').boundingBox();
          assert.ok(
            bounds.y >= 0 && bounds.y + bounds.height <= height,
            `chapter controls within viewport: ${route} ${chapter} ${width} ${reducedMotion} ${JSON.stringify(bounds)}`,
          );
          const artBounds = await page.locator('[data-art]').boundingBox();
          assert.ok(artBounds.height > 150, 'artwork remains visible');
          const current = await signature();
          if (chapter === 0) initial = current;
          else assert.notEqual(current, initial, 'artwork changes between chapters');
          if (width === 1440 && reducedMotion === 'no-preference') {
            const audit = await new AxeBuilder({ page })
              .include('[data-exhibit]')
              .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
              .analyze();
            report.push({
              route,
              chapter,
              violations: audit.violations.map((v) => ({
                id: v.id,
                nodes: v.nodes.map((n) => n.target),
              })),
            });
          }
          if (process.env.CAPTURE_SHOTS === '1' && reducedMotion === 'no-preference')
            await page.screenshot({ path: `/tmp/${route}-${width}-${chapter}.png` });
        }
        await page.locator('nav[aria-label$="chapters"] button').first().focus();
        await page.keyboard.press('Enter');
        await page.waitForFunction(
          () => document.querySelector('[data-stage]')?.getAttribute('data-chapter') === '0',
        );
        assert.equal(await stage.getAttribute('data-chapter'), '0');
        const pause = page.getByRole('button', {
          name: reducedMotion === 'reduce' ? 'Reduced motion' : 'Pause motion',
          exact: true,
        });
        if (reducedMotion === 'reduce') assert.ok(await pause.isDisabled());
        else await pause.click();
        await page.waitForTimeout(100);
        const frozen = await signature();
        await page.waitForTimeout(180);
        assert.equal(await signature(), frozen, 'paused artwork stays still');
        await scroll(0.12);
        assert.equal(await signature(), frozen, 'still mode uses stable chapter snapshots');
        if (reducedMotion === 'no-preference') {
          await page.getByRole('button', { name: 'Resume motion', exact: true }).click();
        }
        if (route === 'chromatic' || route === 'metamorphosis') {
          await scroll(0.5);
          const slider = page.getByRole('slider');
          const before = await slider.inputValue();
          await slider.focus();
          await page.keyboard.press('ArrowRight');
          assert.notEqual(await slider.inputValue(), before);
        }
        assert.deepEqual(errors, []);
        page.off('pageerror', onError);
        console.log(
          `PASS ${route} ${width}x${height} / ${reducedMotion}: chapters, artwork, pause, keyboard, layout.`,
        );
      }
      await context.close();
    }
  await fs.writeFile('/tmp/motion-exhibits-audit.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report));
  assert.ok(
    report.every((r) => r.violations.length === 0),
    'accessibility violations',
  );
} finally {
  await browser.close();
}
