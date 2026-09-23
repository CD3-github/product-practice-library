(() => {
  const launcher = document.querySelector('.quick-start');
  const instruction = launcher?.querySelector('.agent-instruction');
  const details = launcher?.querySelector('details');
  if (!launcher || !instruction || !details) return;

  launcher.classList.add('research-launcher');
  details.open = true;

  const initial = {
    en: instruction.dataset.en,
    zh: instruction.dataset.zh,
  };

  const routes = [
    { id: 'all', entry: 'README.md', en: 'Complete research', zh: '完整研究' },
    { id: 'plan', entry: '01-product-research.prompt.md', en: 'Research plan', zh: '研究规划' },
    { id: 'sources', entry: '01-product-research.prompt.md', en: 'Source research', zh: '来源研究' },
    { id: 'probing', entry: '02-product-system-probing.prompt.md', en: 'System probing', zh: '系统探查' },
    { id: 'synthesis', entry: '01-product-research.prompt.md', en: 'Synthesis', zh: '证据归纳' },
  ];
  const publicBase = 'https://product-practice-library.vercel.app/prompts/product-research/';

  const text = {
    plan: {
      en: entry => `Read ${entry} completely. Use the research-plan mode only and deliver a concrete plan for the current decision.\nFollow the user's current language and established preferences.\nRecover the decision, users, uncertainty, constraints and available access from our conversation. Select only the methods that can change this decision. Include prioritized questions, method and sample/source strategy, a usable interview/task guide or comparison rubric, analysis approach, access and consent prerequisites, and a stopping rule.\nDo not run participant research, contact people, use paid access, or claim findings in this planning turn unless I explicitly authorize execution. Complete the design with explicit assumptions and ask only about gaps that block the plan.\nProject: [describe the project or decision]\nProject context: [repository path, relevant material, or data]`,
      zh: entry => `完整读取 ${entry}，本轮只使用 research-plan 模式，为当前决策直接交付一份具体研究方案。\n跟随用户当前的语言与既有偏好。\n从当前对话恢复决策、用户、不确定性、约束与可用访问条件，只选择能改变本轮决策的方法。包括优先问题、方法与样本或来源策略、可直接使用的访谈或任务指南或比较标准、分析方式、访问与同意前提，以及停止条件。\n本轮未明确授权时，不执行参与者研究、不联系他人、不使用付费访问，也不把规划写成已有发现。用明确假设完成方案，只询问真正阻止方案交付的问题。\n本轮项目：[填写项目或决策]\n项目上下文：[仓库路径、相关资料或数据]`,
    },
    sources: {
      en: entry => `Read ${entry} completely. Use the source-research mode only.\nFollow the user's current language and established preferences.\nFrame the current decision, collect only authorized and decision-relevant sources, preserve exact links and dates or versions, distinguish public claims from exercised capability, and return source-linked findings, contradictions, limits and a supported next action. Prefer primary sources and verify material claims.\nDo not add participant research, Product System Probing, product planning, analytics or Testing & Evaluation unless the current evidence creates a specific need and I authorize that expansion. Mark inaccessible sources and complete what available evidence supports.\nProject: [describe the product or question]\nSources or starting context: [links, files, repository, or search scope]`,
      zh: entry => `完整读取 ${entry}，本轮只使用 source-research 模式。\n跟随用户当前的语言与既有偏好。\n围绕当前决策，只收集已授权且会影响决定的来源；保留准确链接、日期或版本，区分公开声明与实际验证过的能力，交付带来源的发现、矛盾、局限和有依据的下一步。优先使用第一方来源并核实重要结论。\n除非现有证据产生了明确需要且我授权扩展，否则不要加入参与者研究、Product System Probing、产品规划、产品分析或 Testing & Evaluation。标记无法访问的来源，先完成已有证据支持的部分。\n本轮项目：[填写产品或问题]\n来源或起始上下文：[链接、文件、仓库或检索范围]`,
    },
    probing: {
      en: entry => `Read ${entry} completely and use Product System Probing for this task.\nFollow the user's current language and established preferences.\nStart from a real user job and build or update an evidence-linked behavioral product model. Infer whether this turn needs a probe plan, executed probes, synthesis of supplied observations, or a verification handoff. Keep DECLARED, OBSERVATION, BEHAVIORAL INFERENCE, IMPLEMENTATION HYPOTHESIS, UNKNOWN and VERIFIED separate.\nChoose plan-only, human-guided, agent-operated or hybrid execution from my request and available tools. If direct execution is authorized and browser/computer tools are available, begin the bounded interaction. Default to non-destructive research; pause for me at login, MFA, CAPTCHA, consent, account connection or any material external effect. Optimize for information gain per interaction rather than exhaustive coverage.\nTarget product or URL: [product, URL, app, or supplied artifact]\nUser job or product area: [real task]\nDecision or current uncertainty: [what understanding could change]\nAvailable access and allowed actions: [public/test access, evidence, execution boundary]`,
      zh: entry => `完整读取 ${entry}，本轮使用 Product System Probing。\n跟随用户当前的语言与既有偏好。\n从一个真实用户任务开始，建立或更新一份带证据的产品行为模型。根据本轮请求判断交付 probe plan、实际执行、已有观察归纳，还是内部验证交接。始终分开 DECLARED、OBSERVATION、BEHAVIORAL INFERENCE、IMPLEMENTATION HYPOTHESIS、UNKNOWN 与 VERIFIED。\n根据我的请求与可用工具选择 plan-only、human-guided、agent-operated 或 hybrid。已授权直接执行且 browser/computer-use 可用时，开始有限交互。默认只做非破坏性研究；遇到登录、MFA、CAPTCHA、同意、账号连接或任何重要外部状态变更时暂停并让我接管。优化每次交互的信息增益，不追求穷尽覆盖。\n目标产品或 URL：[产品、URL、App 或已有材料]\n用户任务或产品区域：[真实任务]\n当前决策或不确定性：[什么认知会改变]\n现有访问与允许操作：[公开或测试访问、已有证据、执行边界]`,
    },
    synthesis: {
      en: entry => `Read ${entry} completely. Use the synthesis mode only and analyze the supplied research evidence.\nFollow the user's current language and established preferences.\nFrame the decision, preserve source IDs and context, separate observation from interpretation, cluster repeated mechanisms rather than repeated words, retain contradictions and exceptions, and return evidence-linked findings, confidence and limits, decision implications, and targeted next questions.\nDo not invent prevalence, participants, quotes or missing observations. Do not collect new sources, rerun the product, or expand into product planning unless I explicitly request it.\nDecision: [what this synthesis should inform]\nEvidence: [transcripts, notes, screenshots, recordings, source ledger, or file paths]`,
      zh: entry => `完整读取 ${entry}，本轮只使用 synthesis 模式，分析已提供的研究证据。\n跟随用户当前的语言与既有偏好。\n明确要支持的决策，保留来源 ID 与上下文，分开观察与解释，按重复机制而不是重复词语归纳，并保留矛盾与例外；交付带证据的发现、可信度与局限、决策影响和有针对性的下一问题。\n不要虚构普遍程度、参与者、引语或缺失观察。除非我明确要求，否则不收集新来源、不重新运行产品，也不扩张到产品规划。\n本轮决策：[这次归纳要支持什么]\n已有证据：[访谈、笔记、截图、录屏、来源记录或文件路径]`,
    },
  };

  const currentLanguage = () => document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
  const publicRoute = route => new URL(route.entry, publicBase).href;

  const switcher = document.createElement('div');
  switcher.className = 'research-route-switcher';
  switcher.innerHTML = `<span class="research-route-label" data-en="Choose the instruction scope" data-zh="选择要复制的 instruction 范围">Choose the instruction scope</span><div class="research-route-chips" role="tablist" aria-label="Research instruction scope"></div><div class="research-route-file"><span data-en="Routes to" data-zh="路由到">Routes to</span><a href="README.md"><code>README.md</code></a></div>`;
  details.before(switcher);

  const chips = switcher.querySelector('.research-route-chips');
  const switcherLabel = switcher.querySelector('.research-route-label');
  const routeFileLabel = switcher.querySelector('.research-route-file span');
  const routeLink = switcher.querySelector('.research-route-file a');
  const routeCode = routeLink.querySelector('code');
  const status = launcher.querySelector('.copy-status');
  const summary = details.querySelector('summary');
  summary.dataset.en = 'Selected instruction';
  summary.dataset.zh = '当前选择的 instruction';

  let selected = 'all';

  function render() {
    const route = routes.find(item => item.id === selected) || routes[0];
    const lang = currentLanguage();
    const content = route.id === 'all' ? initial[lang] : text[route.id][lang](publicRoute(route));
    const english = route.id === 'all' ? initial.en : text[route.id].en(publicRoute(route));
    const chinese = route.id === 'all' ? initial.zh : text[route.id].zh(publicRoute(route));
    instruction.dataset.entry = route.entry;
    instruction.dataset.en = english;
    instruction.dataset.zh = chinese;
    instruction.textContent = content;
    switcherLabel.textContent = lang === 'zh' ? switcherLabel.dataset.zh : switcherLabel.dataset.en;
    routeFileLabel.textContent = lang === 'zh' ? routeFileLabel.dataset.zh : routeFileLabel.dataset.en;
    routeLink.href = publicRoute(route);
    routeCode.textContent = route.entry;
    summary.textContent = lang === 'zh' ? summary.dataset.zh : summary.dataset.en;
    chips.setAttribute('aria-label', lang === 'zh' ? '研究 instruction 范围' : 'Research instruction scope');
    if (status) status.textContent = '';
  }

  function select(id, moveFocus = false) {
    selected = id;
    chips.querySelectorAll('.research-route-chip').forEach(button => {
      const active = button.dataset.route === selected;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
      if (active && moveFocus) button.focus();
    });
    render();
  }

  routes.forEach(route => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'research-route-chip';
    button.dataset.route = route.id;
    button.dataset.en = route.en;
    button.dataset.zh = route.zh;
    button.setAttribute('role', 'tab');
    button.textContent = currentLanguage() === 'zh' ? route.zh : route.en;
    button.addEventListener('click', () => select(route.id));
    chips.append(button);
  });

  chips.addEventListener('keydown', event => {
    const buttons = [...chips.querySelectorAll('.research-route-chip')];
    const index = buttons.findIndex(button => button.dataset.route === selected);
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % buttons.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + buttons.length) % buttons.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = buttons.length - 1;
    else return;
    event.preventDefault();
    select(buttons[next].dataset.route, true);
  });

  const methodsLink = document.querySelector('.toc a[href="#methods"]');
  if (methodsLink && !document.querySelector('.toc a[href="#system-probing"]')) {
    const link = document.createElement('a');
    link.href = '#system-probing';
    link.dataset.en = 'Product System Probing';
    link.dataset.zh = '产品系统探查';
    link.textContent = currentLanguage() === 'zh' ? link.dataset.zh : link.dataset.en;
    methodsLink.after(link);
  }

  document.addEventListener('ppl:languagechange', render);
  select('all');
})();
