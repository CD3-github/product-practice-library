// Human-facing maps of the existing agent routes. Emits patches; never writes.
// Keep actual instructions in each README/workflow, not in this display model.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = 'https://github.com/CD3-github/product-practice-library/tree/main/prompts/';
const item = (file, en, zh, useEn, useZh, extra = {}) => ({file, title:[en,zh], use:[useEn,useZh], ...extra});
const shared = item('../_shared/task-contract.md', 'Task and authority', '任务与操作边界', 'Separate the deliverable, evidence needed, and permitted actions.', '分别判断交付物、所需证据与允许的操作。');
const restructure = item('00-general-product-restructuring-workflow.en.md', 'Shared restructuring method', '通用重构方法', 'Read the matching-language method alongside the selected workflow.', '与所选工作流一起读取对应语言的方法。', {alternate:'00-general-product-restructuring-workflow.zh-CN.md'});
const analytics = item('../product-analytics-experimentation/README.md', 'Analytics and experiments', '产品分析与实验', 'For behavior or causal-impact questions.', '涉及用户行为或因果影响时读取。');
const testing = item('../testing-evaluation-system/README.md', 'Testing and eval', '测试与评估', 'For concrete quality, reliability or comparative measurement.', '需要具体质量、可靠性或对照衡量方案时读取。');
const audit = item('../ai-product-system-audit/README.md', 'AI system audit', 'AI 系统审查', 'For material wiring, harness or contract uncertainty.', '接入、harness 或契约存在关键不确定性时读取。');
const context = item('../context-update-discipline/README.md', 'Context update discipline', '上下文更新规范', 'When feedback changes the current scope or intent.', '反馈改变当前范围或意图时读取。');
const general = {...restructure, file:'../product-ux-rethinking/'+restructure.file, alternate:'../product-ux-rethinking/'+restructure.alternate, use:['For deeper evidence, responsibility or structural questions.','需要深入处理证据、责任或结构问题时读取。']};
const planning = item('02-new-feature-product-planning.en.md','Plan a new feature','规划新功能','When the product model or MVP is unsettled.','产品模型或 MVP 尚未确定时选择。',{alternate:'02-new-feature-product-planning.zh-CN.md'});
const ux = item('01-existing-mvp-ux-reimagination.en.md','Rethink an existing MVP','重新构想已有 MVP','When an existing implementation needs a better experience.','已有实现需要重新设计体验时选择。',{alternate:'01-existing-mvp-ux-reimagination.zh-CN.md'});
const defs = [
  {folder:'product-research', page:'product-research', id:'files', title:['Product research','产品研究'], required:[shared],
   note:['Choose the standard research workflow for planning, sources or synthesis, or Product System Probing for behavioral learning through realistic interaction. Read both only for an explicit combined request.','研究规划、来源调查或归纳使用标准研究工作流；通过真实交互理解产品行为时使用 Product System Probing。只有明确的组合任务才读取两者。'],
   routes:[item('01-product-research.prompt.md','Research workflow','研究工作流','Select research planning, source research, or synthesis of supplied evidence.','选择研究规划、来源检索或已有证据归纳。'),item('02-product-system-probing.prompt.md','Product System Probing','产品系统探查','Build or update a behavioral product model through planned, guided, agent-operated or hybrid interaction.','通过规划、人工引导、Agent 直接操作或混合交互建立或更新产品行为模型。')],
   refs:[item('templates/behavioral-product-model.md','Behavioral product model template','产品行为模型模板','Use for a durable evidence ledger, hypotheses, boundaries and next probes.','用于持续记录证据、假设、边界与下一项 probe。'),general,item('../product-ux-rethinking/README.md','Product framing','产品定义','When findings are ready to inform what to build.','研究结论需要转成产品方案时读取。'),testing,analytics,context],
   external:[item('https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service','GOV.UK · Research planning','GOV.UK · 研究规划','Question-led methods and participant planning.','问题导向的方法选择与参与者规划。')]},
  {folder:'product-ux-rethinking',page:'product-framing',id:'files',title:['Product framing','产品定义'],required:[shared,restructure],routes:[planning,ux],
   note:['This page starts with new-feature planning. Use the MVP route only if the task includes rethinking an existing implementation. Read one language version.','本页以新功能规划为起点；任务涉及已有实现重构时才转向 MVP 路线。每份工作流选择一种语言版本。'],
   refs:[item('../product-research/README.md','Product research','产品研究','For unresolved user, alternative or feasibility questions.','用户、替代方案或可行性仍需研究时读取。'),audit,testing,item('../delivery-learning/README.md','Delivery and learning','交付与复盘','For an approved implementation scope.','进入已批准的实施范围时读取。'),context],
   external:[item('https://www.designcouncil.org.uk/resources/the-double-diamond/','Design Council · Double Diamond','Design Council · 双钻模型','Problem discovery and exploration of distinct solutions.','问题发现与不同解决方向的探索。')]},
  {folder:'product-ux-rethinking',page:'ux-rethinking',id:'files',title:['UX rethinking','UX 重构'],required:[shared,restructure],routes:[ux,planning],
   note:['This page starts with an existing MVP. If the product model itself is unsettled, the README can route to framing first; it does not require both routes every time.','本页以已有 MVP 为起点。产品模型本身尚未确定时，README 可先引导产品定义；并非每次都要跑两条路线。'],
   refs:[item('../product-research/README.md','Product research','产品研究','For missing user or task evidence.','缺少用户或任务证据时读取。'),audit,testing,item('../delivery-learning/README.md','Delivery and learning','交付与复盘','For an approved migration slice.','进入已批准的迁移切片时读取。'),context],external:[]},
  {folder:'testing-evaluation-system',page:'testing-evaluation-system',id:'share',title:['Testing and evaluation','测试与评估'],required:[shared],
   note:['Choose files by the requested work. A plan loads design, not implementation or a run; an explicit mixed request may use more than one workflow.','按本轮任务选文件。只做规划时读设计工作流，不进入实施或运行；明确的组合任务可以使用多个工作流。'],
   routes:[item('00-testing-evaluation-system.md','Understand the method','理解方法','Read relevant sections for definitions and architecture.','解释概念或架构时读取相关章节。'),item('01-design-evidence-system.prompt.md','Design the evidence system','设计验证方案','Produce concrete checks, comparisons, criteria and a first slice.','产出具体检查、对照、标准和首个实施切片。'),item('01-audit-existing-system.prompt.md','Audit existing evidence','审查现有体系','Inspect current coverage and substantiate findings.','检查现有覆盖，用证据支持判断。'),item('02-implement-approved-system.prompt.md','Implement an approved slice','实施已批准的切片','Build only the authorized scope.','只搭建已授权的范围。'),item('03-run-eval-round.prompt.md','Run or analyze one round','运行或分析一轮','Execute an authorized round, or analyze saved results without rerunning.','运行获授权的一轮，或只分析已有结果。')],
   refs:[item('references/bounded-round-design.md','Scope, effort and stopping rules','范围、工作量与停止条件','For a finite round: acceptance, effort, deferrals and feedback.','规划有限一轮时：验收、工作量、后续项与反馈接入。'),item('references/comparative-design.md','Comparative design','比较设计','For version, alternative, component or cost comparisons.','需要比较版本、替代方案、模块贡献或成本时。'),item('references/robustness-design.md','Robustness and edge cases','鲁棒性与边界案例','For relevant input, context or customization variation.','输入、上下文或定制变化可能影响判断时。'),item('references/grader-design.md','Grader selection and combination','判定方式选择与组合','When choosing code, human or model judgment, or validating scores.','选择代码、人工或模型判断，或检查分数是否可信时。'),item('references/agent-reliability-design.md','Agent reliability','Agent 可靠性','For stateful tools, authority and recovery.','涉及工具、状态、权限与恢复时。'),item('references/operational-validation.md','Operational validation','上线与运行验证','Select shadow/canary, load or adversarial sections by risk.','按风险选择影子／灰度、负载或对抗验证章节。'),analytics],
   extra:item('01-design-or-audit.prompt.md','Older entry link','旧入口兼容文件','Redirects earlier links to design or audit; not an additional workflow.','把旧链接引导到设计或审查，不是额外工作流。'),
   external:[item('https://developers.openai.com/api/docs/guides/evaluation-best-practices','OpenAI · Evaluation best practices','OpenAI · 评估实践','Eval process, evaluator selection and edge cases.','评估流程、判定方式与边界案例。'),item('https://docs.langchain.com/langsmith/evaluation','LangSmith · Evaluation','LangSmith · Evaluation','Datasets, evaluators and experiments.','数据集、评分器与实验。'),item('https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents','Anthropic · Agent evals','Anthropic · Agent evals','Tasks, graders, harnesses and observed outcomes.','任务、评分器、harness 与实际结果。')]},
  {folder:'product-analytics-experimentation',page:'product-analytics-experimentation',id:'route',title:['Analytics and experiments','产品分析与实验'],required:[shared],
   note:['Five modes share one workflow file. The mode controls which work is performed, not whether the other mode descriptions enter context.','五个模式共用一个工作流文件。模式选择决定执行哪项工作，不意味着其他模式的说明完全不进入上下文。'],
   routes:[item('01-product-evidence-workflow.prompt.md','Product evidence workflow','产品证据工作流','Select measurement design, measurement audit, behavior analysis, experiment design or experiment analysis.','选择衡量设计、衡量审查、行为分析、实验设计或实验分析。')],
   refs:[item('00-product-analytics-experimentation.md','Method and contracts','方法与契约','Read relevant definitions and analysis rules as needed.','按需查阅定义、契约与分析规则。'),testing],
   external:[item('https://amplitude.com/docs/analytics','Amplitude · Analytics','Amplitude · Analytics','Product behavior analysis.','产品行为分析。'),item('https://amplitude.com/docs/feature-experiment/overview','Amplitude · Experiment','Amplitude · Experiment','Controlled experimentation.','受控实验。'),item('https://amplitude.com/docs/analytics/define-cohort','Cohort definitions','Cohort 定义','Group users by shared properties or behavior.','按共同属性或行为定义用户群。'),item('https://amplitude.com/docs/feature-experiment/advanced-techniques/sticky-bucketing','Sticky bucketing','稳定分桶','Keep experiment assignments consistent.','保持实验分配一致。')]},
  {folder:'delivery-learning',page:'delivery-learning',id:'files',title:['Delivery and learning','交付与复盘'],required:[shared],
   note:['One file contains slice planning, approved implementation, readiness review and learning review. Apply only the requested mode within its authority.','一个文件包含切片规划、获批实施、就绪审查和学习复盘；只执行本轮要求且获授权的模式。'],
   routes:[item('01-delivery-learning.prompt.md','Delivery workflow','交付工作流','Choose the mode from the agreed scope and requested outcome.','根据已确定范围和本轮目标选择模式。')],refs:[audit,testing,analytics,general,context],
   external:[item('https://sre.google/workbook/canarying-releases/','Google SRE · Canarying releases','Google SRE · 灰度发布','Bounded exposure, monitoring and rollback.','受控放量、监控与回滚。')]}
];
const esc = s => s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const txt = (pair,tag='span',attrs='') => `<${tag} ${attrs} data-en="${esc(pair[0])}" data-zh="${esc(pair[1])}">${esc(pair[0])}</${tag}>`;
const link = i => `<a href="${esc(i.file)}">${txt(i.title)}</a>${i.alternate?` <span class="map-languages">(<a href="${i.file}">EN</a> / <a href="${i.alternate}">简中</a>)</span>`:''}`;
const row = (i, compact=false) => `<li>${link(i)}<a class="map-path" href="${esc(i.file)}"><code>${esc(i.file)}</code></a>${compact?'':txt(i.use,'p')}</li>`;
const mapName = d => d.folder==='product-ux-rethinking' ? d.page+'-map.md' : 'file-map.md';
function html(d) {
  return `<section class="section" id="${d.id}"><div class="section-head">${txt(['Files and references','文件结构与参考'],'h2')}${txt(['File relationships for this module. Use the workflow sections above for the practical steps.','本模块的文件关系。具体做法见上方工作流内容。'],'p','class="section-intro"')}</div>
<div class="module-resources"><div class="module-map-head">${txt(['Internal files','内部文件'],'h3')}<a href="${base+d.folder}" class="module-repo">${txt(['View this folder on GitHub ↗','在 GitHub 查看本模块文件夹 ↗'])}</a></div>
<div class="module-map" aria-label="Workflow file map"><div class="map-entry">${txt(['Entry','入口'],'span','class="map-caption"')}<a class="map-path" href="README.md"><code>README.md</code></a></div>
<div class="map-step"><h4>${txt(['Shared file dependencies','共用文件'])}</h4><ul class="map-file-list">${d.required.map(i=>row(i,true)).join('')}</ul></div>
<div class="map-step"><h4>${txt([d.routes.length>1?'Workflow branches':'Workflow file · select a mode within it',d.routes.length>1?'工作流分支':'工作流文件 · 在文件内选择模式'])}</h4><ul class="map-file-list map-routes">${d.routes.map(i=>row(i,true)).join('')}</ul></div>
<div class="map-step map-optional"><details class="module-support"><summary>${txt(['Supporting files · read when needed','支持文件 · 按需读取'])}</summary><div class="details-body"><ul class="map-file-list">${d.refs.map(i=>row(i)).join('')}</ul></div></details></div></div>
<div class="module-map-links"><a href="${mapName(d)}">${txt(['Mermaid file map ↗','查看 Mermaid 文件图 ↗'])}</a></div>
<details class="module-runtime"><summary>${txt(['How the agent reads these files','Agent 如何读取这些文件'])}</summary><div class="details-body">${txt(d.note,'p')}${txt(['This package currently starts from the README you give the agent. An installed skill is discovered through its name and description, then its SKILL.md is loaded; references and scripts support the selected task. These maps describe intended reading routes, not a live execution trace or an access-control mechanism.','当前 package 从你交给 Agent 的 README 开始。已安装的 skill 会先通过名称和描述被发现，再读取 SKILL.md，并按任务使用参考文件或脚本。这张图说明预期读取路线，不是实际执行轨迹，也不是权限控制。'],'p')}<a href="https://learn.chatgpt.com/docs/build-skills">${txt(['Official skill documentation ↗','官方 skill 说明 ↗'])}</a></div></details>
<details class="module-external"><summary>${txt(['External references','外部参考'])}</summary><div class="details-body">${d.external.length?`<ul class="map-file-list">${d.external.map(i=>`<li>${link(i)}${txt(i.use,'p')}</li>`).join('')}</ul>`:txt(['No separate external method source is recorded for this module; its core method is the internal restructuring workflow.','此模块目前未单独记录外部方法来源；核心方法来自内部重构工作流。'],'p')}</div></details></div></section>`;
}
function markdown(d) {
  const label = i => `${i.title[1]} / ${i.title[0]}<br/>${i.file}`.replaceAll('"',"'");
  const lines=['flowchart TD',`  H["${d.page}.html<br/>人的浏览入口 / Human index"]`,'  E["README.md · 识别本轮任务 / Select task"]','  H -. "复制指令 / Copy instruction" .-> E'];
  let prev='E';
  d.required.forEach((i,n)=>{lines.push(`  Q${n}["${label(i)}"]`,`  ${prev} --> Q${n}`);prev='Q'+n;});
  lines.push('  S{"按任务选择 / Choose for this task"}',`  ${prev} --> S`);
  d.routes.forEach((i,n)=>lines.push(`  W${n}["${label(i)}"]`,`  S --> W${n}`));
  lines.push('  O["相关细节需要时 / Only when needed"]');
  d.routes.forEach((i,n)=>lines.push(`  W${n} -.-> O`));
  d.refs.forEach((i,n)=>lines.push(`  R${n}["${label(i)}"]`,`  O -.-> R${n}`));
  const rows = [...d.required,...d.routes,...d.refs,...(d.extra?[d.extra]:[])].map(i=>`| [${i.file}](${i.file})${i.alternate?` · [简中](${i.alternate})`:''} | ${i.use[1]} ${i.use[0]} |`).join('\n');
  return `# ${d.title[1]} / ${d.title[0]} — file map\n\nHuman reference, not an additional agent instruction. Generated from current routing declarations with \`scripts/sync-module-maps.mjs\`. The README and workflows remain authoritative.\n\n[GitHub folder](${base+d.folder}) · [Visual guide](${d.page}.html#${d.id})\n\n${d.note[1]}\n\n${d.note[0]}\n\n实线：入口和工作流选择；虚线：按需参考。多条分支表示选项，并非全部必读。\n\nSolid edges: entry and workflow selection. Dotted edges: conditional references. Branches are choices, not an instruction to read everything.\n\n\`\`\`mermaid\n${lines.join('\n')}\n\`\`\`\n\n## Files and purpose / 文件与用途\n\n| File | When to read |\n|---|---|\n${rows}\n\n## Discovery and execution / 发现与执行\n\nThis module currently uses an explicit README entry, not an installed \`SKILL.md\`. Routing is guidance followed by an agent, not a deterministic dispatcher or access boundary. Reading a reference does not authorize actions or make every method applicable. HTML is a human index; this diagram is not a trace of files actually read.\n\n当前由 README 显式进入，尚非已安装的 skill。路由是 Agent 遵循的指引，并非固定程序或权限边界。读取不等于获得执行授权，也不表示所有方法都适用。HTML 是给人阅读的索引，图并非本次真实读取记录。\n\n[Official skill documentation](https://learn.chatgpt.com/docs/build-skills)\n`;
}
const changes=[];
const selected = process.argv.find(arg=>arg.startsWith('--page='))?.slice(7);
for(const d of defs.filter(d=>!selected || d.page===selected)){
  const dir=path.join(root,'prompts',d.folder), f=path.join(dir,d.page+'.html');
  const before=fs.readFileSync(f,'utf8');
  const re=new RegExp(`<section\\b[^>]*id="${d.id}"[^>]*>[\\s\\S]*?<\\/section>`);
  if(!re.test(before))throw Error('Missing section '+f);
  let after=before.replace(re,html(d));
  after=after.replace(new RegExp(`<a([^>]*href="#${d.id}"[^>]*)>[\\s\\S]*?<\\/a>`,'g'),(whole,attrs)=>`<a${attrs.replace(/ data-(en|zh)="[^"]*"/g,'')} data-en="Files & references" data-zh="文件与参考">Files &amp; references</a>`);
  if(before!==after)changes.push({f,before,after});
  const mf=path.join(dir,mapName(d)), mb=fs.existsSync(mf)?fs.readFileSync(mf,'utf8'):null, ma=markdown(d);
  if(mb!==ma)changes.push({f:mf,before:mb,after:ma});
}
if(process.argv.includes('--patch')){
  if(changes.length)process.stdout.write('*** Begin Patch\n'+changes.map(({f,before,after})=>before===null?`*** Add File: ${f}\n`+after.trimEnd().split('\n').map(l=>'+'+l).join('\n'):`*** Update File: ${f}\n@@\n`+before.trimEnd().split('\n').map(l=>'-'+l).join('\n')+'\n'+after.trimEnd().split('\n').map(l=>'+'+l).join('\n')).join('\n')+'\n*** End Patch\n');
}else{console.log(changes.length?'DRIFT: '+changes.map(x=>path.relative(root,x.f)).join(', '):'PASS: six bilingual HTML file maps and six Mermaid references are synchronized.');process.exitCode=changes.length?1:0;}
