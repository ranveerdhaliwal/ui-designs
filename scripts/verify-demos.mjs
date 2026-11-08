/** Run against `pnpm dev` or `pnpm preview`. CAPTURE_PREVIEWS=1 refreshes homepage WebP captures. */
import { chromium,firefox } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const base = process.env.BASE_URL || 'http://127.0.0.1:5182/ui-designs/';
const source = await fs.readFile(path.join(root, 'apps/web/src/data/demos.ts'), 'utf8');
const ids = [...source.matchAll(/id: '([^']+)'/g)].map(match => match[1]);
if (!ids.length || new Set(ids).size !== ids.length) throw new Error('The route inventory must be nonempty and unique.');
const engine=process.env.BROWSER==='firefox'?firefox:chromium;
const browser = await engine.launch({headless:true, ...(process.env.BROWSER!=='firefox'&&process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH}:{}), args:['--enable-unsafe-swiftshader']});
const reports=[];
const previewDir=path.join(root,'apps/web/public/previews');
if(process.env.CAPTURE_PREVIEWS)await fs.mkdir(previewDir,{recursive:true});
try {
 for(const id of ids.filter(id=>!process.env.ONLY_DEMOS||process.env.ONLY_DEMOS.split(',').includes(id))){for(const width of (process.env.FULL_MATRIX?[1440,768,390]:[1440,390])){
  const page=await browser.newPage({viewport:{width,height:width===1440?1000:844},reducedMotion:process.env.NORMAL_MOTION?'no-preference':'reduce'});const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`${base}?verify=${id}#/${id}`,{waitUntil:'domcontentloaded'});
  await page.locator('#demo-content > :not(.route-message)').first().waitFor();
  await page.waitForTimeout(id==='wet-paint-flow'?3000:900);
  await page.evaluate(()=>document.fonts.ready);
  const metrics=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),failedRoute:document.body.innerText.includes('This study couldn’t open.')}));
  const report={id,width,errors,...metrics};reports.push(report);console.log(JSON.stringify(report));
  if(width===1440&&process.env.CAPTURE_PREVIEWS){
   const capture=id==='motionsites'?await page.locator('[class*="deepDiveView"]').screenshot():await page.screenshot({clip:{x:0,y:48,width:1440,height:952}});
   const webp=await page.evaluate(async png=>{const image=new Image();image.src='data:image/png;base64,'+png;await image.decode();const canvas=document.createElement('canvas');canvas.width=960;canvas.height=Math.round(960*image.height/image.width);canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);return canvas.toDataURL('image/webp',.83).split(',')[1];},capture.toString('base64'));
   await fs.writeFile(path.join(previewDir,`${id}.webp`),Buffer.from(webp,'base64'));
  }
  await page.close();
 }}
 for(const width of (process.env.FULL_MATRIX?[1440,768,390]:[1440,390])){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:process.env.NORMAL_MOTION?'no-preference':'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base,{waitUntil:'networkidle'});
  // Scroll the gallery to exercise lazy image loading.
  for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=800){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(100);}
  await page.waitForTimeout(300);const report={id:'home',width,errors,...await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)}))};reports.push(report);console.log(JSON.stringify(report));await page.close();
 }
 await fs.writeFile(process.env.REPORT_PATH||'/tmp/browser-designs-verification.json',JSON.stringify(reports,null,2));
 const failures=reports.filter(r=>r.errors.length||r.overflow||r.brokenImages.length||r.failedRoute);
 if(failures.length)throw new Error(`${failures.length} browser checks failed.`);
 console.log(`PASS: ${reports.length} desktop/mobile route checks.`);
} finally {await browser.close();}
