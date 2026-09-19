// Canonical copy instructions for README and HTML. Run with --patch and apply
// the emitted patch; run without arguments to check for drift. No file writes.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const modules = ['testing-evaluation-system', 'product-analytics-experimentation', 'product-research', 'delivery-learning', 'product-ux-rethinking'];
const pages = modules.flatMap(module => module === 'product-ux-rethinking'
  ? ['product-framing', 'ux-rethinking'].map(page => ({module, page}))
  : [{module, page: module}]);
const base = 'https://product-practice-library.vercel.app/prompts/';
function instruction(module, zh, page) {
  const url = base + module + '/README.md';
  const delivery = module === 'testing-evaluation-system'
    ? (zh
      ? '在交付文档开头写决策总览：先给建议，独立理由用短 bullet；说明本轮测什么、具体怎么检查、什么结果支持什么决定，以及何时收尾、哪些留待后续。保留关键不确定性与下一步；技术细节放正文，规划时分项估算工作量。\n'
      : 'Open the deliverable with a decision overview: recommendation, short bullets for independent reasons, the scope of this round, concrete checks, results needed for the decision, when to wrap up, and consequential deferrals. Include key uncertainty and next action; keep technical detail in the body and estimate effort by component when planning.\n')
    : '';
  const focus = page === 'product-framing'
    ? (zh ? '以新功能规划为起点，结合当前任务确认路径。' : 'Start from new-feature planning and confirm the route from my current task. ')
    : page === 'ux-rethinking'
      ? (zh ? '以已有 MVP 的 UX 重新构想为起点，结合当前任务确认路径。' : 'Start from existing-MVP UX reimagination and confirm the route from my current task. ')
      : '';
  return zh
    ? `读取 ${url}，结合当前对话识别本轮交付物，按需加载工作流并直接完成。${focus}\n按任务选择必要的资料检查深度，区分事实、设计假设与待验证项。先完成已有信息支持的部分，将后续实施或运行条件列为执行前提；只询问阻止本轮交付的问题。所有操作遵守本轮授权。\n${delivery}本轮项目：[填写项目或要解决的问题]\n项目上下文：[仓库路径、相关资料或数据]`
    : `Read ${url}. Identify this turn's deliverable from our conversation, load only the relevant workflow, and complete it. ${focus}\nChoose source-inspection depth to fit the task. Separate facts, design assumptions, and unverified items. Complete what available context supports; list later implementation or run requirements as execution prerequisites. Ask only about gaps that block this deliverable. Keep all actions within this turn's authorization.\n${delivery}Project: [describe the project or problem to solve]\nProject context: [repository path, relevant material, or data]`.replace(/ +\n/g, '\n');
}
const escapeHTML = s => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const updates = [];
function update(relative, transform) {
  const file = path.join(root, relative);
  const before = fs.readFileSync(file, 'utf8'), after = transform(before);
  if (before !== after) updates.push({file, relative, before, after});
}
for (const module of modules) {
  update(`prompts/${module}/README.md`, source => {
    let count = 0;
    const next = source.replace(/(```|~~~)text\n([\s\S]*?)\n\1/g, (block, fence, text) => {
      if (!/^(Read https:\/\/product-practice-library|读取 https:\/\/product-practice-library)/.test(text)) return block;
      count++;
      return fence+'text\n'+instruction(module, text.startsWith('读取'))+'\n'+fence;
    });
    if (count !== 2) throw Error(`Expected bilingual README instructions: ${module}, got ${count}`);
    return next;
  });
}
for (const {module, page} of pages) {
  update(`prompts/${module}/${page}.html`, source => {
    let count = 0;
    const next = source.replace(/<pre\b[^>]*class="agent-instruction"[^>]*>[\s\S]*?<\/pre>/g, () => {
      count++;
      const en = escapeHTML(instruction(module, false, page));
      const zh = escapeHTML(instruction(module, true, page));
      return `<pre class="agent-instruction" data-entry="README.md" data-en="${en}" data-zh="${zh}">${en}</pre>`;
    });
    if (count !== 1) throw Error(`Expected one HTML instruction: ${page}, got ${count}`);
    return next;
  });
}
if (process.argv.includes('--patch')) {
  if (updates.length) process.stdout.write('*** Begin Patch\n'+updates.map(({file,before,after}) => {
    const oldLines = before.trimEnd().split('\n'), newLines = after.trimEnd().split('\n');
    if (oldLines.length === newLines.length) {
      return `*** Update File: ${file}\n` + oldLines.flatMap((line, i) =>
        line === newLines[i] ? [] : [`@@\n-${line}\n+${newLines[i]}`]
      ).join('\n');
    }
    let start = 0, end = 0;
    while (oldLines[start] === newLines[start] && start < Math.min(oldLines.length, newLines.length)) start++;
    while (end < Math.min(oldLines.length, newLines.length) - start && oldLines.at(-1-end) === newLines.at(-1-end)) end++;
    return `*** Update File: ${file}\n@@\n` + oldLines.slice(start, oldLines.length-end).map(s=>'-'+s).join('\n') + '\n' + newLines.slice(start, newLines.length-end).map(s=>'+'+s).join('\n');
  }).join('\n')+'\n*** End Patch\n');
} else {
  console.log(updates.length ? `DRIFT: ${updates.map(u=>u.relative).join(', ')}` : 'PASS: 5 bilingual README entries and 6 bilingual HTML copy instructions are in sync.');
  process.exitCode = updates.length ? 1 : 0;
}
