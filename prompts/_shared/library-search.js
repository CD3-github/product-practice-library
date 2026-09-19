(() => {
  'use strict';
  const records = window.PPL_SEARCH_INDEX || [];
  const trigger = document.getElementById('library-search-trigger');
  if (!trigger) return;
  const language = () => document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
  const label = (en, zh) => language() === 'zh' ? zh : en;
  const normalize = value => value.normalize('NFKC').toLocaleLowerCase();
  const termsFor = value => [...new Set(normalize(value.slice(0,240)).trim().split(/\s+/).filter(Boolean))];
  const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5" stroke-linecap="round"/></svg>';
  const dialog = document.createElement('dialog');
  dialog.className = 'library-search-dialog';
  dialog.id = 'library-search-dialog';
  dialog.setAttribute('aria-labelledby','library-search-title');
  dialog.innerHTML = `<div class="search-topline"><h2 id="library-search-title"></h2><button type="button" class="search-close">×</button></div><label class="search-field">${icon}<input type="search" id="library-search-input" maxlength="240" autocomplete="off" spellcheck="false" aria-controls="library-search-results" aria-describedby="library-search-summary"></label><p class="search-summary" id="library-search-summary" role="status" aria-live="polite"></p><ul class="search-results" id="library-search-results"></ul><p class="search-footer"></p>`;
  document.body.append(dialog);
  const input = dialog.querySelector('input');
  const list = dialog.querySelector('.search-results');
  const summary = dialog.querySelector('.search-summary');
  const close = dialog.querySelector('.search-close');
  let lastFocus;
  let priorOverflow;
  let composing = false;

  // A static JS index works offline under file:// without fetch/CORS or a service.
  const corpus = records.map(record => ({...record, normalized: {
    en: normalize(record.page.en+' '+record.title.en+' '+record.text.en),
    zh: normalize(record.page.zh+' '+record.title.zh+' '+record.text.zh),
  }}));

  function search(query) {
    const terms = termsFor(query);
    if (!terms.length) return [];
    const preferred = language();
    return corpus.flatMap(record => {
      if (!terms.every(term => record.normalized.en.includes(term) || record.normalized.zh.includes(term))) return [];
      const scoreFor = lang => terms.reduce((score,term) => score
        + (normalize(record.title[lang]).includes(term) ? 12 : 0)
        + (normalize(record.page[lang]).includes(term) ? 3 : 0)
        + (normalize(record.text[lang]).includes(term) ? 1 : 0), 0);
      const en = scoreFor('en'), zh = scoreFor('zh');
      const matchedLanguage = en === zh ? preferred : en > zh ? 'en' : 'zh';
      return [{record, matchedLanguage, score:Math.max(en,zh)}];
    }).sort((a,b) => b.score-a.score || a.record.path.localeCompare(b.record.path) || a.record.anchor.localeCompare(b.record.anchor));
  }

  function highlighted(element, text, terms) {
    if (!terms.length) { element.textContent=text; return; }
    const expression = new RegExp(terms.slice().sort((a,b)=>b.length-a.length).map(escapeRegex).join('|'),'giu');
    let offset = 0;
    for (const match of text.matchAll(expression)) {
      element.append(document.createTextNode(text.slice(offset,match.index)));
      const mark = document.createElement('mark');
      mark.textContent=match[0];
      element.append(mark);
      offset=match.index+match[0].length;
    }
    element.append(document.createTextNode(text.slice(offset)));
  }

  function snippet(text, terms) {
    const positions = terms.map(term=>normalize(text).indexOf(term)).filter(index=>index>=0);
    const position = positions.length ? Math.min(...positions) : 0;
    const start = Math.max(0,position-65), end=Math.min(text.length,start+240);
    return (start?'…':'')+text.slice(start,end)+(end<text.length?'…':'');
  }

  function render() {
    if (composing) return;
    list.replaceChildren();
    const query=input.value.trim(), terms=termsFor(query);
    if (!terms.length) {
      summary.textContent='';
      return;
    }
    if (!records.length) {
      summary.textContent=label('Search index unavailable. Reload this page to try again.','搜索索引未加载，请刷新页面重试。');
      return;
    }
    const results=search(query);
    const pages=new Set(results.map(result=>result.record.path)).size;
    summary.textContent=label(`${results.length} matching section${results.length===1?'':'s'} · ${pages} page${pages===1?'':'s'}`,`${results.length} 个匹配章节 · ${pages} 个页面`);
    if (!results.length) {
      const empty=document.createElement('li');
      empty.className='search-empty';
      empty.textContent=label('No matches. Try a shorter keyword, its English or Chinese name, or fewer terms.','没有找到结果。可以缩短关键词、换用中英文名称，或减少搜索词。');
      list.append(empty);
    }
    for (const {record,matchedLanguage} of results) {
      const item=document.createElement('li'), link=document.createElement('a');
      const url=new URL('../'+record.path,window.location.href);
      // Fragments stay in the browser; search terms are not request parameters.
      const fragment=new URLSearchParams({search:query,searchLang:matchedLanguage === 'zh'?'zh-CN':'en'});
      url.hash=record.anchor+'?'+fragment.toString();
      link.href=url.href;
      link.className='search-result';
      const context=document.createElement('span');
      context.className='search-result-context';
      context.textContent=record.page[language()]+' · '+(matchedLanguage==='zh'?'简中':'EN');
      const title=document.createElement('span');
      title.className='search-result-title';
      highlighted(title,record.title[matchedLanguage],terms);
      const excerpt=document.createElement('span');
      excerpt.className='search-result-snippet';
      highlighted(excerpt,snippet(record.text[matchedLanguage],terms),terms);
      link.append(context,title,excerpt);
      item.append(link);
      list.append(item);
    }
  }

  function updateLanguage() {
    trigger.setAttribute('aria-label',label('Search the library','搜索全文'));
    trigger.title=label('Search the library (⌘/Ctrl K)','搜索全文（⌘/Ctrl K）');
    trigger.querySelector('.search-trigger-label').textContent=label('Search','搜索');
    dialog.querySelector('h2').textContent=label('Search the library','全文搜索');
    close.setAttribute('aria-label',label('Close search','关闭搜索'));
    input.setAttribute('aria-label',label('Search keywords in English or Chinese','输入中文或英文关键词'));
    input.placeholder=label('Keywords in English or Chinese…','输入中文或英文关键词…');
    dialog.querySelector('.search-footer').textContent=label('↑ ↓ Navigate · Enter Open · Esc Close','↑ ↓ 选择结果 · Enter 打开 · Esc 关闭');
    render();
  }

  function openSearch() {
    if (dialog.open) return;
    lastFocus=document.activeElement;
    priorOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    dialog.showModal();
    trigger.setAttribute('aria-expanded','true');
    input.focus();
    input.select();
    render();
  }
  trigger.addEventListener('click',openSearch);
  close.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{
    trigger.setAttribute('aria-expanded','false');
    document.body.style.overflow=priorOverflow;
    (lastFocus && document.contains(lastFocus)?lastFocus:trigger).focus();
  });
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog) return;
    const rect=dialog.getBoundingClientRect();
    if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom) dialog.close();
  });
  input.addEventListener('compositionstart',()=>{composing=true;});
  input.addEventListener('compositionend',()=>{composing=false;render();});
  input.addEventListener('input',render);
  document.addEventListener('keydown',event=>{
    if(event.isComposing||composing) return;
    if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k') {
      event.preventDefault();
      if(dialog.open) dialog.close(); else openSearch();
    }
  });
  dialog.addEventListener('keydown',event=>{
    if(event.isComposing||composing) return;
    if(event.key==='Escape') { event.preventDefault(); dialog.close(); return; }
    const links=[...list.querySelectorAll('a')];
    if(event.key==='Enter'&&event.target===input&&links.length) { event.preventDefault(); links[0].click(); }
    if((event.key==='ArrowDown'||event.key==='ArrowUp')&&links.length) {
      event.preventDefault();
      const index=links.indexOf(document.activeElement);
      const next=index<0?(event.key==='ArrowDown'?0:links.length-1):(index+(event.key==='ArrowDown'?1:-1)+links.length)%links.length;
      links[next].focus();
    }
  });

  // Resolve matches after language rendering, including text inside nested details.
  function revealMatch(scroll) {
    document.querySelectorAll('mark.library-search-hit').forEach(mark=>mark.replaceWith(document.createTextNode(mark.textContent)));
    const [rawAnchor,parameters='']=location.hash.slice(1).split('?');
    const query=new URLSearchParams(parameters).get('search');
    if(!query) return;
    let anchor;
    try { anchor=decodeURIComponent(rawAnchor); } catch { return; }
    const destination=document.getElementById(anchor);
    if(!destination) return;
    const scope=destination.matches('section')?destination:(destination.closest('section')||destination);
    const terms=termsFor(query);
    if(!terms.length) return;
    const walker=document.createTreeWalker(scope,NodeFilter.SHOW_TEXT,{acceptNode(node){
      return node.parentElement.closest('script,style,.quick-start,svg')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;
    }});
    const nodes=[];
    while(walker.nextNode()) if(terms.some(term=>normalize(walker.currentNode.textContent).includes(term))) nodes.push(walker.currentNode);
    let first;
    nodes.forEach(node=>{
      for(let parent=node.parentElement;parent&&parent!==scope.parentElement;parent=parent.parentElement) if(parent.tagName==='DETAILS') parent.open=true;
      const span=document.createElement('span');
      highlighted(span,node.textContent,terms);
      span.querySelectorAll('mark').forEach(mark=>{mark.className='library-search-hit';first ||= mark;});
      node.replaceWith(...span.childNodes);
    });
    const target=first||destination;
    target.classList.add('search-target');
    if(scroll) requestAnimationFrame(()=>{
      target.scrollIntoView({block:'center',behavior:'instant'});
      target.setAttribute('tabindex','-1');
      target.focus({preventScroll:true});
    });
  }
  document.addEventListener('ppl:languagechange',()=>{updateLanguage();revealMatch(false);});
  window.addEventListener('hashchange',()=>revealMatch(true));
  updateLanguage();
  revealMatch(true);
})();
