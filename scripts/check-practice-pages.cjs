// Requires Playwright. Checks local files and a fresh, offline browser context.
// These are packaging/UI tests, not behavioral evals of an AI agent.
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {chromium} = require('playwright');
const root = path.resolve(__dirname, '..');
const pages = [
  'testing-evaluation-system/testing-evaluation-system',
  'product-analytics-experimentation/product-analytics-experimentation',
  'product-research/product-research',
  'product-ux-rethinking/product-framing',
  'product-ux-rethinking/ux-rethinking',
  'delivery-learning/delivery-learning',
];
let checks = 0;
const failures = [];
function check(ok, label) { checks++; if (!ok) failures.push(label); }
function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory()
    ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]);
}
const files = walk(path.join(root,'prompts')).filter(f => /\.(md|html)$/.test(f) && path.dirname(f) !== path.join(root,'prompts'));
files.push(path.join(root,'README.md'));
for (const file of files) {
  const source = fs.readFileSync(file,'utf8');
  const links = file.endsWith('.html')
    ? [...source.matchAll(/(?:href|src)="([^"]+)"/g)].map(m=>m[1])
    : [...source.replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g,'').matchAll(/\]\(([^)]+)\)/g)].map(m=>m[1]);
  for (const href of links) {
    if (/^(?:[a-z]+:|\/\/|#)/i.test(href)) continue;
    const raw = href.split(/[?#]/)[0];
    if (!raw) continue;
    const target = path.resolve(path.dirname(file),decodeURIComponent(raw));
    check(fs.existsSync(target), `Missing link: ${path.relative(root,file)} -> ${href}`);
  }
}
(async () => {
  const browser = await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL ? {channel:process.env.PLAYWRIGHT_CHANNEL} : {})});
  try {
    for (const route of pages) {
      const context = await browser.newContext({reducedMotion:'reduce'});
      await context.route(/^https?:/, r => r.abort());
      await context.addInitScript(() => {
        localStorage.setItem('ppl-language','en');
        localStorage.setItem('ppl-theme','light');
        Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.__copied=text;}}});
      });
      const page = await context.newPage();
      const errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      await page.goto(pathToFileURL(path.join(root,'prompts',route+'.html')).href);
      check(await page.locator('.module-map').count()===1,`${route}: one current file map`);
      check(await page.locator('.module-repo').getAttribute('href')==='https://github.com/CD3-github/product-practice-library/tree/main/prompts/'+route.split('/')[0],`${route}: GitHub folder belongs to current module`);
      check(await page.locator('.module-support[open],.module-runtime[open],.module-external[open]').count()===0,`${route}: secondary references initially collapsed`);
      check(await page.locator('.module-map-links a').count()===1,`${route}: Mermaid source map linked`);
      check(await page.locator('.module-map .map-path').evaluateAll(nodes=>nodes.length>0 && nodes.every(n=>n.tagName==='A' && n.getAttribute('href') && getComputedStyle(n.querySelector('code')).fontSize==='12px')),`${route}: filenames are clickable 12px secondary links`);
      check(await page.locator('.module-map .map-routes p').count()===0,`${route}: file chart does not repeat workflow instructions`);
      check(await page.locator('.module-resources a[href="01-design-or-audit.prompt.md"]').count()===0,`${route}: compatibility entry omitted from normal navigation`);
      check(await page.locator('.module-external a').evaluateAll(nodes=>nodes.every(n=>n.href.startsWith('https://'))),`${route}: external references separated from local workflows`);
      if (route.startsWith('testing-evaluation-system/')) {
        for(const id of ['sequence']) {
          check(await page.locator('#'+id).evaluate(section=>{
            const flow=section.querySelector('.guide-flow'), cards=section.querySelector('.guide-cards');
            return !!(flow.compareDocumentPosition(cards)&Node.DOCUMENT_POSITION_FOLLOWING);
          }),`${route}/${id}: workflow overview before details`);
        }
        check(await page.locator('.section .guide-cards:not(.foundation-cards) article,.section .reference-links,.section details').evaluateAll(nodes=>nodes.every(n=>{
          const s=getComputedStyle(n);return ['Top','Right','Bottom','Left'].every(side=>parseFloat(s['border'+side+'Width'])===0);
        })),`${route}: reading groups without ornamental dividers`);
        check(await page.locator('main > section[id]').evaluateAll(nodes=>nodes.map(n=>n.id).join(','))==='choose,design,system,sequence,share',`${route}: reading order`);
        check(await page.locator('#sequence article#collaboration').count()===1 && await page.locator('.toc a[href="#collaboration"]').count()===0,`${route}: human-agent review integrated into setup stage three`);
        check(await page.locator('#collaboration details').textContent().then(s=>s.includes('Product') && s.includes('Engineering') && s.includes('Quality')),`${route}: review perspectives preserved in progressive detail`);
        check(await page.locator('#choose strong[data-zh="测试 test"],#choose strong[data-zh="评估 eval"],#choose strong[data-zh="方案比较 benchmark"]').count()===3,`${route}: aligned bilingual method names`);
        check(await page.locator('#design details.method-recipe:not([open])').count()===5,`${route}: five conditional method designs`);
        check(await page.locator('#design #evaluators').count()===1,`${route}: shared evaluator guidance`);
        check(await page.locator('.foundation-cards > article').evaluateAll(nodes=>nodes.length===3 && nodes.every(n=>getComputedStyle(n).borderLeftWidth==='1px' && parseFloat(getComputedStyle(n).paddingLeft)>=16)),`${route}: three padded foundation cards`);
        check(await page.locator('.foundation-cards .card-question').count()===3,`${route}: helper questions separate from concept titles`);
        check(await page.locator('.axis-list li').evaluateAll(nodes=>nodes.every(n=>getComputedStyle(n).fontSize==='14px' && parseFloat(getComputedStyle(n).borderRadius)>20)),`${route}: 14px coverage pills`);
        check(await page.locator('.method-recipe .method-table').count()===5 && await page.locator('.method-table th[scope="row"]').count()===20,`${route}: methods use shared semantic tables`);
        await page.locator('#choose a[href="#baseline"]').first().click();
        await page.waitForFunction(()=>document.getElementById('baseline').open);
        check(await page.locator('#baseline[open]').count()===1,`${route}: method links reveal their disclosure`);
        await page.locator('#baseline > summary').click();
        await page.locator('#choose a[href="#baseline"]').first().click();
        await page.waitForFunction(()=>document.getElementById('baseline').open);
        check(await page.locator('#baseline[open]').count()===1,`${route}: same-fragment links reopen their disclosure`);
        check(await page.locator('#sequence #production').count()===1,`${route}: production validation inside setup workflow`);
        check(await page.locator('.toc a[href="#production"]').count()===0,`${route}: unified setup navigation`);
        check(await page.locator('#sequence .phase-cards > article').count()===4,`${route}: four workflow stages`);
        check(await page.locator('#sequence .phase-cards > article').evaluateAll(cards=>cards.every(c=>c.querySelector('a[href]'))),`${route}: workflow links in every stage`);
        check(await page.locator('#choose details').last().locator('summary').getAttribute('data-en')==='Combine rule checks, quality judgments and repeated runs',`${route}: combination guidance has task context`);
        check(await page.locator('#choose details').last().locator('.details-body li strong').count()===3,`${route}: three scannable verification choices`);
      }
      for (const width of [1440,390]) {
        await page.setViewportSize({width,height:1000});
        for (const lang of ['en','zh-CN']) {
          if(await page.locator('html').getAttribute('lang')!==lang) await page.locator('#language-toggle').click();
          check(await page.locator('.content summary').evaluateAll(nodes=>nodes.length>0 && nodes.every(n=>parseFloat(getComputedStyle(n).paddingLeft)>=16 && parseFloat(getComputedStyle(n).paddingRight)>=44)),`${route}/${width}/${lang}: disclosure text and indicator insets`);
          check(await page.locator('.content summary').evaluateAll(nodes=>nodes.every(n=>{const bg=getComputedStyle(n).backgroundColor;return bg!=='transparent'&&bg!=='rgba(0, 0, 0, 0)';})),`${route}/${width}/${lang}: disclosure backgrounds visible at rest`);
          check(await page.locator('.guide-cards p:not(.card-question),.section-intro,.details-body').evaluateAll(nodes=>nodes.every(n=>getComputedStyle(n).fontSize==='14px')),`${route}/${width}/${lang}: 14px reading text`);
          if (route.startsWith('testing-evaluation-system/')) {
            check(await page.locator('#sequence .phase-cards > article').evaluateAll(cards=>{
              const boxes=cards.map(c=>c.getBoundingClientRect());
              return boxes.length===4 && boxes.every((box,i)=>Math.abs(box.left-boxes[0].left)<1 && Math.abs(box.width-boxes[0].width)<1 && (!i || box.top>=boxes[i-1].bottom));
            }),`${route}/${width}/${lang}: sequential full-width vertical stack`);
          }
          check(await page.locator('html').getAttribute('lang')===lang,`${route}/${width}: language ${lang}`);
          if (route.startsWith('product-research/')) await page.locator('.research-route-chip[data-route="all"]').click();
          check(await page.locator('.module-map-head h3').textContent()===(lang==='en'?'Internal files':'内部文件'),`${route}/${width}/${lang}: file map localized`);
          const instruction = page.locator('.agent-instruction');
          const expected=await instruction.getAttribute(lang==='en'?'data-en':'data-zh');
          const publicEntry='https://product-practice-library.vercel.app/prompts/'+path.dirname(route)+'/README.md';
          const preferenceRule=lang==='en'
            ? "Follow the user's current language and established preferences."
            : '跟随用户当前的语言与既有偏好。';
          check(expected.includes(publicEntry),`${route}/${width}/${lang}: public source routing`);
          check(!expected.includes(root),`${route}/${width}/${lang}: no personal path in copied instruction`);
          check(expected.includes(preferenceRule),`${route}/${width}/${lang}: concise language preference`);
          check(await instruction.textContent()===expected,`${route}/${width}/${lang}: rendered copy`);
          if (route.startsWith('testing-evaluation-system/')) {
            check(expected.includes(lang==='en'?'Open the deliverable with a brief decision overview':'在交付文档开头写简短的决策总览'),`${route}/${width}/${lang}: decision overview in copy`);
          }
          await page.locator('.copy-prompt').click();
          check(await page.evaluate(()=>window.__copied)===expected,`${route}/${width}/${lang}: clipboard wiring`);
          const details=page.locator('.quick-start details');
          if (route.startsWith('product-research/')) {
            check(await details.getAttribute('open')!==null,`${route}/${width}/${lang}: selected instruction visible by default`);
            check(await page.locator('.research-route-chip').count()===5,`${route}/${width}/${lang}: five instruction scopes`);
          } else {
            await details.locator('summary').click();
            check(await details.getAttribute('open')!==null,`${route}/${width}/${lang}: expand`);
            await details.locator('summary').click();
          }
          const before=await page.locator('html').getAttribute('data-theme');
          await page.locator('#theme-toggle').click();
          check(await page.locator('html').getAttribute('data-theme')!==before,`${route}/${width}/${lang}: theme`);
          check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${route}/${width}/${lang}: page overflow`);
        }
      }
      const missingAnchors=await page.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href').slice(1)).filter(id=>id&&!document.getElementById(id)));
      check(await page.locator('style,[style]').count()===0,`${route}: styles live in external CSS`);
      check(missingAnchors.length===0,`${route}: anchors ${missingAnchors.join(', ')}`);
      check(errors.length===0,`${route}: JS errors ${errors.join('; ')}`);
      check(await page.locator('meta[name="robots"]').getAttribute('content').then(s=>s.includes('noindex')),`${route}: noindex`);
      if (route.startsWith('product-research/')) {
        const publicResearchBase='https://product-practice-library.vercel.app/prompts/product-research/';
        for (const lang of ['en','zh-CN']) {
          if(await page.locator('html').getAttribute('lang')!==lang) await page.locator('#language-toggle').click();
          const preferenceRule=lang==='en'
            ? "Follow the user's current language and established preferences."
            : '跟随用户当前的语言与既有偏好。';
          for (const scope of ['all','plan','sources','probing','synthesis']) {
            await page.locator(`.research-route-chip[data-route="${scope}"]`).click();
            const scopedInstruction=await page.locator('.agent-instruction').textContent();
            const scopedHref=await page.locator('.research-route-file a').getAttribute('href');
            check(scopedInstruction.includes(publicResearchBase),`${route}/${lang}: ${scope} instruction uses public route`);
            check(!scopedInstruction.includes(root),`${route}/${lang}: ${scope} instruction excludes personal path`);
            check(scopedInstruction.includes(preferenceRule),`${route}/${lang}: ${scope} concise language preference`);
            check(!scopedInstruction.includes('Output language: English for all deliverable files') && !scopedInstruction.includes('输出语言：交付文件与附带回复均用简体中文'),`${route}/${lang}: ${scope} no verbose language directive`);
            check(scopedHref.startsWith(publicResearchBase),`${route}/${lang}: ${scope} link uses public route`);
          }
        }
        await page.locator('.research-route-chip[data-route="probing"]').click();
        const probingInstruction=await page.locator('.agent-instruction').textContent();
        check(probingInstruction.includes('02-product-system-probing.prompt.md'),`${route}: probing chip routes to probing workflow`);
        check(await page.locator('.research-route-file a').getAttribute('href')==='https://product-practice-library.vercel.app/prompts/product-research/02-product-system-probing.prompt.md',`${route}: selected public route file link`);
        await page.locator('.copy-prompt').click();
        check(await page.evaluate(()=>window.__copied)===probingInstruction,`${route}: selected probing instruction copies`);
        check(await page.locator('#system-probing').count()===1 && await page.locator('.toc a[href="#system-probing"]').count()===1,`${route}: probing section and navigation`);
      }

      // Simulate hosted URLs using local files only; this does not inspect or
      // publish the deployed site. Confirm copied routes stay canonical.
      await context.route('https://product-practice-library.vercel.app/**', async request => {
        const relative=decodeURIComponent(new URL(request.request().url()).pathname).slice(1);
        const target=path.resolve(root,relative);
        if(!target.startsWith(root+path.sep)||!fs.existsSync(target)||!fs.statSync(target).isFile()) return request.abort();
        const contentType=target.endsWith('.html')?'text/html':target.endsWith('.js')?'application/javascript':target.endsWith('.css')?'text/css':'text/plain';
        await request.fulfill({body:fs.readFileSync(target),contentType});
      });
      await page.goto('https://product-practice-library.vercel.app/prompts/'+route+'.html');
      for(const lang of ['en','zh-CN']) {
        if(await page.locator('html').getAttribute('lang')!==lang) await page.locator('#language-toggle').click();
        if (route.startsWith('product-research/')) await page.locator('.research-route-chip[data-route="all"]').click();
        const expected=await page.locator('.agent-instruction').textContent();
        const preferenceRule=lang==='en'
          ? "Follow the user's current language and established preferences."
          : '跟随用户当前的语言与既有偏好。';
        check(expected.includes(preferenceRule),`${route}/${lang}: concise language preference`);
        check(!expected.includes('Output language: English for all deliverable files') && !expected.includes('输出语言：交付文件与附带回复均用简体中文'),`${route}/${lang}: page language does not force output language`);
        check(expected.includes('https://product-practice-library.vercel.app/prompts/'+path.dirname(route)+'/README.md'),`${route}/${lang}: hosted source routing`);
        check(!expected.includes(root),`${route}/${lang}: no personal path in hosted copy`);
        if (route.startsWith('testing-evaluation-system/')) {
          check(expected.includes(lang==='en'?'Open the deliverable with a brief decision overview':'在交付文档开头写简短的决策总览'),`${route}/${lang}: hosted decision overview in copy`);
        }
        await page.locator('.copy-prompt').click();
        check(await page.evaluate(()=>window.__copied)===expected,`${route}/${lang}: hosted clipboard wiring`);
      }
      await context.close();
    }
  } finally { await browser.close(); }
  console.log(JSON.stringify({checks,passed:checks-failures.length,failures},null,2));
  process.exitCode=failures.length?1:0;
})().catch(e=>{console.error(e);process.exitCode=1;});
