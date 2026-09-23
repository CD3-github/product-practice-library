(() => {
  const root = document.documentElement;
  const languageButton = document.getElementById('language-toggle');
  const themeButton = document.getElementById('theme-toggle');
  const readSetting = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const saveSetting = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  let language = readSetting('ppl-language') === 'zh-CN' ? 'zh-CN' : 'en';
  const searchLanguage = new URLSearchParams(location.hash.split('?')[1] || '').get('searchLang');
  if (searchLanguage === 'en' || searchLanguage === 'zh-CN') language = searchLanguage;
  let theme = readSetting('ppl-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const label = (en, zh) => language === 'zh-CN' ? zh : en;

  function showCurrentLibraryPage() {
    requestAnimationFrame(() => {
      const nav = document.querySelector('.library-nav');
      const active = nav?.querySelector('[aria-current="page"]');
      if (!active || nav.scrollWidth <= nav.clientWidth) return;
      const offset = active.getBoundingClientRect().left - nav.getBoundingClientRect().left;
      nav.scrollLeft += offset - (nav.clientWidth - active.clientWidth) / 2;
    });
  }
  window.addEventListener('resize', showCurrentLibraryPage);

  function updateThemeLabel() {
    themeButton.setAttribute('aria-label', theme === 'dark'
      ? label('Switch to light mode', '切换到浅色模式')
      : label('Switch to dark mode', '切换到深色模式'));
  }

  function setLanguage(next) {
    language = next;
    document.querySelectorAll('[data-en][data-zh]').forEach(element => {
      element.textContent = language === 'zh-CN' ? element.dataset.zh : element.dataset.en;
    });
    root.lang = language;
    document.title = (language === 'zh-CN' ? document.body.dataset.pageTitleZh : document.body.dataset.pageTitleEn) + ' · Product Practice Library';
    languageButton.textContent = label('简中', 'EN');
    languageButton.setAttribute('aria-label', label('切换到简体中文', 'Switch to English'));
    document.querySelector('.toc')?.setAttribute('aria-label', label('On this page', '本页目录'));
    document.querySelector('.library-nav')?.setAttribute('aria-label', label('Library sections', '资料库栏目'));
    document.querySelectorAll('.copy-status').forEach(element => { element.textContent = ''; });
    updateThemeLabel();
    saveSetting('ppl-language', language);
    showCurrentLibraryPage();
    document.dispatchEvent(new Event('ppl:languagechange'));
  }

  function setTheme(next) {
    theme = next;
    root.dataset.theme = theme;
    updateThemeLabel();
    saveSetting('ppl-theme', theme);
  }

  languageButton.addEventListener('click', () => setLanguage(language === 'en' ? 'zh-CN' : 'en'));
  themeButton.addEventListener('click', () => setTheme(theme === 'light' ? 'dark' : 'light'));
  setLanguage(language);
  setTheme(theme);

  document.querySelectorAll('.copy-prompt').forEach(button => {
    button.addEventListener('click', async () => {
      const panel = button.closest('.quick-start');
      const instruction = panel.querySelector('.agent-instruction');
      const status = panel.querySelector('.copy-status');
      const text = instruction.textContent;
      let copied = false;
      if (navigator.clipboard?.writeText) {
        try { await navigator.clipboard.writeText(text); copied = true; } catch {}
      }
      if (!copied) {
        const input = document.createElement('textarea');
        input.value = text;
        input.setAttribute('aria-label', label('Instruction to copy', '要复制的指令'));
        input.style.cssText = 'position:fixed;left:-9999px;top:0';
        document.body.appendChild(input);
        input.select();
        try { copied = document.execCommand('copy'); } catch {}
        input.remove();
        button.focus();
      }
      if (copied) {
        status.textContent = label('Copied.', '已复制。');
      } else {
        panel.querySelector('details').open = true;
        const range = document.createRange();
        range.selectNodeContents(instruction);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = label('Select and copy the instruction shown below.', '请复制下方已选中的指令。');
      }
    });
  });

  // Method links can target a closed disclosure, including older saved anchors.
  function revealFragment() {
    if (location.hash.includes('?search=')) return; // Search owns its reveal and focus.
    let id;
    try { id = decodeURIComponent(location.hash.slice(1).split('?')[0]); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    let opened = false;
    for (let node = target; node; node = node.parentElement) {
      if (node.tagName === 'DETAILS' && !node.open) { node.open = true; opened = true; }
    }
    if (opened) requestAnimationFrame(() => target.scrollIntoView({block:'start'}));
  }
  window.addEventListener('hashchange', revealFragment);
  document.addEventListener('click', event => {
    const anchor = event.target.closest('a[href^="#"]');
    if (anchor && anchor.getAttribute('href') === location.hash) revealFragment();
  });
  requestAnimationFrame(revealFragment);

  const links = [...document.querySelectorAll('.toc a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const observer = new IntersectionObserver(entries => {
    entries.filter(entry => entry.isIntersecting).forEach(entry => {
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-18% 0px -65% 0px' });
  sections.forEach(section => observer.observe(section));
})();
