// UI acceptance for bilingual, offline cross-page search. Requires Playwright.
const fs=require('node:fs'), path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require('playwright');
const {spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const routes=['product-research/product-research','product-ux-rethinking/product-framing','product-ux-rethinking/ux-rethinking','testing-evaluation-system/testing-evaluation-system','product-analytics-experimentation/product-analytics-experimentation','delivery-learning/delivery-learning'];
let count=0; const failures=[];
function check(ok,label){count++;if(!ok)failures.push(label);}
const href=route=>pathToFileURL(path.join(root,'prompts',route+'.html')).href;
(async()=>{
  const freshness=spawnSync('python3',['scripts/build-search-index.py'],{cwd:root,encoding:'utf8'});
  check(freshness.status===0,'search index freshness: '+freshness.stdout+freshness.stderr);
  const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{})});
  try {
    const context=await browser.newContext({reducedMotion:'reduce'});
    await context.route(/^https?:/,route=>route.abort());
    await context.addInitScript(()=>{localStorage.setItem('ppl-language','en');localStorage.setItem('ppl-theme','light');});
    const page=await context.newPage(), errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    for(const route of routes){
      console.log('Checking '+route);
      await page.goto(href(route));
      check(await page.locator('#library-search-trigger').count()===1,route+': header entry');
      check(await page.evaluate(()=>window.PPL_SEARCH_INDEX.length)===42,route+': loaded index');
      for(const width of [320,390,1440,1920]){
        await page.setViewportSize({width,height:900});
        check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),route+'/'+width+': page width');
        await page.locator('#library-search-trigger').click();
        check(await page.locator('#library-search-dialog').getAttribute('open')!==null,route+'/'+width+': modal opens');
        check(await page.locator('#library-search-input').evaluate(e=>e===document.activeElement),route+'/'+width+': initial focus');
        await page.locator('#library-search-input').fill('GoLdEn');
        check(await page.locator('.search-result').count()===1,route+'/'+width+': case-insensitive global search');
        check((await page.locator('.search-result').first().getAttribute('href')).includes('testing-evaluation-system.html'),route+'/'+width+': cross-page destination');
        check(await page.locator('.search-result mark').count()>0,route+'/'+width+': result highlights');
        check(await page.locator('#library-search-dialog').evaluate(e=>{const r=e.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.bottom<=innerHeight;}),route+'/'+width+': dialog fits');
        await page.keyboard.press('Escape');
        check(await page.locator('#library-search-trigger').evaluate(e=>e===document.activeElement),route+'/'+width+': focus restored');
      }
    }
    await page.goto(href(routes[0]));
    await page.setViewportSize({width:1440,height:1000});
    await page.keyboard.press('Meta+k');
    check(await page.locator('#library-search-dialog').getAttribute('open')!==null,'keyboard shortcut');
    const input=page.locator('#library-search-input');
    await input.fill('system probing');
    check(await page.locator('.search-result').count()>=1,'Product System Probing indexed');
    check((await page.locator('.search-result').first().getAttribute('href')).includes('product-research.html#system-probing'),'probing search destination');
    await input.fill('同期群');
    check(await page.locator('.search-result').count()===1,'Chinese query in English UI');
    check((await page.locator('.search-result').getAttribute('href')).includes('searchLang=zh-CN'),'destination language follows match');
    const destination=new URL(await page.locator('.search-result').getAttribute('href'));
    check(destination.search===''&&destination.hash.includes('search='),'search terms remain in fragment');
    await page.keyboard.press('ArrowDown');
    check(await page.locator('.search-result').evaluate(e=>e===document.activeElement),'arrow navigation');
    await page.keyboard.press('Enter');
    await page.waitForURL(/product-analytics-experimentation\.html/);
    check(await page.locator('html').getAttribute('lang')==='zh-CN','Chinese result rendered after navigation');
    check(await page.locator('mark.library-search-hit').count()>0,'destination highlights');
    await page.locator('#library-search-trigger').click();
    await input.fill('Golden calibration');
    check(await page.locator('.search-result').count()===1,'multi-term query');
    await input.fill('golden 评分');
    check(await page.locator('.search-result').count()===1,'mixed English and Chinese query');
    await input.fill('golden');
    await page.keyboard.press('Enter');
    await page.waitForURL(/testing-evaluation-system\.html/);
    check(await page.locator('details[open] mark.library-search-hit').count()>0,'collapsed matches revealed');
    check(await page.locator('mark.library-search-hit').first().evaluate(e=>{const r=e.getBoundingClientRect();return r.top>=0&&r.top<innerHeight;}),'match scrolled into view');
    await page.locator('#library-search-trigger').click();
    await input.fill('nonexistent-67249');
    check(await page.locator('.search-empty').count()===1,'no-result guidance');
    await input.fill('');
    check(await page.locator('.search-result').count()===0,'empty-query state');
    await input.fill('<img src=x onerror=alert(1)>');
    check(await page.locator('#library-search-dialog img').count()===0,'query treated as text');
    await input.fill('[ a+b .*');
    check(await page.locator('.search-empty').count()===1,'regex punctuation safe');
    await input.evaluate(e=>{e.dispatchEvent(new CompositionEvent('compositionstart',{bubbles:true}));e.value='同期群';e.dispatchEvent(new Event('input',{bubbles:true}));});
    check(await page.locator('.search-result').count()===0,'IME waits until composition end');
    await input.evaluate(e=>e.dispatchEvent(new CompositionEvent('compositionend',{bubbles:true})));
    check(await page.locator('.search-result').count()===1,'IME completed query');
    await page.keyboard.press('Escape');
    await page.locator('#theme-toggle').click();
    await page.locator('#library-search-trigger').click();
    await input.fill('recovery');
    check(await page.locator('html').getAttribute('data-theme')==='dark','dark theme');
    check(await page.locator('.search-result').count()>2,'multiple-page results');
    if(process.env.SEARCH_SCREENSHOT_DIR){
      fs.mkdirSync(process.env.SEARCH_SCREENSHOT_DIR,{recursive:true});
      await page.screenshot({path:path.join(process.env.SEARCH_SCREENSHOT_DIR,'search-desktop-dark.png')});
      await page.setViewportSize({width:390,height:844});
      await page.screenshot({path:path.join(process.env.SEARCH_SCREENSHOT_DIR,'search-mobile-dark.png')});
    }
    // Serve local files at a simulated hosted origin; no external request is made.
    await context.route('https://product-practice-library.vercel.app/**',async route=>{
      let file=path.resolve(root,decodeURIComponent(new URL(route.request().url()).pathname).slice(1));
      if(!path.extname(file))file+='.html';
      if(!file.startsWith(root+path.sep)||!fs.existsSync(file))return route.abort();
      await route.fulfill({body:fs.readFileSync(file),contentType:file.endsWith('.js')?'application/javascript':file.endsWith('.css')?'text/css':'text/html'});
    });
    await page.goto('https://product-practice-library.vercel.app/prompts/product-research/product-research');
    await page.locator('#library-search-trigger').click();
    await input.fill('golden');
    check((await page.locator('.search-result').getAttribute('href')).startsWith('https://product-practice-library.vercel.app/'),'hosted relative destination');
    check(errors.length===0,'no runtime errors: '+errors.join('; '));
  } finally {await browser.close();}
  console.log(JSON.stringify({checks:count,passed:count-failures.length,failures},null,2));
  process.exitCode=failures.length?1:0;
})().catch(error=>{console.error(error);process.exitCode=1;});
