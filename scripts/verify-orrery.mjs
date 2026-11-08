import { chromium, firefox } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base = process.env.BASE_URL || 'http://127.0.0.1:5182/ui-designs/';
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
    [768, 844],
    [390, 844],
    [375, 568],
    [900, 500],
  ])
    for (const reducedMotion of ['no-preference', 'reduce']) {
      const context = await browser.newContext({ viewport: { width, height }, reducedMotion });
      await context.route('https://fonts.googleapis.com/**', (route) => route.abort());
      await context.route('https://fonts.gstatic.com/**', (route) => route.abort());
      const page = await context.newPage();
      const errors = [],
        assets = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('request', (r) => {
        if (
          ['image', 'media'].includes(r.resourceType()) &&
          r.url().startsWith('http') &&
          !r.url().endsWith('/vite.svg')
        )
          assets.push(r.url());
      });
      await page.goto(`${base}#/orrery`);
      const stage = page.locator('[data-chapter]');
      await stage.waitFor();
      await page.waitForTimeout(150);
      const scroll = async (p) => {
        await page.locator('section[data-static]').evaluate((el, p) => {
          scrollTo({
            top: el.getBoundingClientRect().top + scrollY + (el.offsetHeight - innerHeight) * p,
            behavior: 'instant',
          });
        }, p);
        await page.waitForTimeout(150);
      };
      let first;
      for (const [i, p] of [0.04, 0.48, 0.94].entries()) {
        await scroll(p);
        assert.equal(await stage.getAttribute('data-chapter'), String(i));
        assert.equal(
          await page
            .getByRole('navigation', { name: 'Observatory chapters' })
            .locator('[aria-current="step"]')
            .count(),
          1,
        );
        const illustration = page.getByRole('img', {
          name: 'An imaginary astronomical instrument',
        });
        const transform = await illustration.locator('[data-part=outer]').getAttribute('style');
        if (i === 0) first = transform;
        else assert.notEqual(transform, first);
        const metrics = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          navBottom: document
            .querySelector('nav[aria-label="Observatory chapters"]')
            .getBoundingClientRect().bottom,
          stageTop: document.querySelector('[data-chapter]').getBoundingClientRect().top,
        }));
        assert.equal(metrics.overflow, false);
        assert.ok(
          metrics.navBottom <= height + 1,
          `Chapter controls clipped: ${JSON.stringify(metrics)}`,
        );
        if (process.env.CAPTURE_SHOTS)
          await page.screenshot({ path: `/tmp/orrery-${width}-${i}-${reducedMotion}.png` });
        if (width === 1440 && reducedMotion === 'no-preference') {
          const audit = await new AxeBuilder({ page })
            .include('[data-chapter]')
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
            .analyze();
          report.push({
            width,
            reducedMotion,
            chapter: i,
            violations: audit.violations.map((v) => ({
              id: v.id,
              nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
            })),
          });
        }
      }
      await scroll(0.04);
      assert.equal(
        await page
          .getByRole('img', { name: 'An imaginary astronomical instrument' })
          .locator('[data-part=outer]')
          .getAttribute('style'),
        first,
        'Reverse scrolling must restore the same geometry.',
      );
      if (reducedMotion === 'no-preference') {
        await page.getByRole('button', { name: 'Still mode', exact: true }).click();
        await page.evaluate(
          () =>
            new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
        );
        const before = await page
          .getByRole('img', { name: 'An imaginary astronomical instrument' })
          .innerHTML();
        await scroll(0.2);
        assert.equal(
          await page.getByRole('img', { name: 'An imaginary astronomical instrument' }).innerHTML(),
          before,
          'Still mode must not animate within a chapter.',
        );
      } else
        assert.ok(
          await page.getByRole('button', { name: 'Reduced motion', exact: true }).isDisabled(),
        );
      await page.getByRole('button', { name: /^(03 )?Connect$/ }).focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(150);
      assert.equal(await stage.getAttribute('data-chapter'), '2');
      assert.ok(page.url().endsWith('#/orrery'));
      const event = page.waitForEvent('download');
      await page.getByRole('button', { name: 'Save plate', exact: true }).click();
      const downloaded = await event;
      const content = await fs.readFile(await downloaded.path(), 'utf8');
      assert.ok(content.includes('viewBox="0 0 1000 1000"'));
      assert.ok(content.includes('<path'));
      assert.equal(downloaded.suggestedFilename(), 'orrery-connect.svg');
      assert.ok(!content.includes('href="http'));
      await page.evaluate(async (markup) => {
        const url = URL.createObjectURL(new Blob([markup], { type: 'image/svg+xml' }));
        try {
          const image = new Image();
          image.src = url;
          await image.decode();
          if (image.naturalWidth !== 1000) throw new Error('Invalid exported SVG dimensions');
        } finally {
          URL.revokeObjectURL(url);
        }
      }, content);
      assert.deepEqual(
        assets,
        [],
        'The demo must not request image or video assets; shared shell fonts are blocked.',
      );
      assert.deepEqual(errors, []);
      console.log(
        `PASS Orrery ${width}px / ${reducedMotion}: chapters, reversible geometry, controls, SVG export, no artwork requests, works with external fonts blocked.`,
      );
      await context.close();
    }
  await fs.writeFile('/tmp/orrery-audit.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report));
  assert.deepEqual(
    report.flatMap((r) => r.violations),
    [],
  );
  console.log('PASS Orrery accessibility audits.');
} finally {
  await browser.close();
}
