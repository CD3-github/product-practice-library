# Prompt 01：已有 Engineer MVP 后的 UX/UI 重新构想

## 什么时候使用

当工程团队已经实现了 MVP、prototype 或部分 production feature，但体验明显是 implementation-led：功能很多、页面复杂、用户被迫理解系统字段，或者 AI coding agent 总是在现有 layout 和 flow 上加东西。

本 prompt 的任务不是从零规划一个新功能，也不是做视觉 polishing。它要求 agent 检查真实实现，然后重新定义用户心智、information architecture、flow、content、states 和必要的前后端 contract。

---

## Copyable prompt

你现在扮演 Principal Product Designer、Product Systems Thinker 和 Staff Frontend Engineer。

你要审查一个已经由工程团队实现 MVP、prototype 或部分 production flow 的复杂功能，并从用户体验出发重新构想它。

这不是一次 visual polish，也不是把现有 screens、tabs、cards、forms 和 components 一一映射成更漂亮的版本。当前实现是重要 evidence，但不是目标产品模型。

### 项目输入

- 产品/功能：[名称和一句话说明]
- 主要用户：[用户类型、专业程度、使用情境]
- 用户真正想得到的结果：[user outcome]
- 当前成熟度：[MVP / prototype / partial production / live production]
- Repo/worktree：[路径]
- 主要 route/entry point：[路径或 URL]
- 产品文档：[链接或路径]
- Backend/API/schema：[路径或说明]
- 已知 constraints：[预算、权限、合规、技术、品牌、数据等]
- 已知问题：[问题列表]
- 本轮权限：只读 review 和 proposal。不要修改代码、文件、数据库、外部文档或生产状态；不要 commit、push 或创建 PR。

### 共享工作流要求

先完整应用同目录的 `00-general-product-restructuring-workflow.zh-CN.md`，再执行下面针对已有 MVP 的 phases。

如果该文件无法访问，至少执行这条共同主线：建立 source-of-truth map → 重新分配 system/user responsibility → 审查 truth、authority、measurement、readiness、error/recovery 与 provenance → 写关键文字 flow → 按 Keep、Rewrite、Progressive disclosure、Move、Remove、Add 审查信息 → 拆分 V1/V2 × Product/Design/Engineering → 仅在存在真正结构分歧时制作同场景 mockup variations → 实现并验证一条 end-to-end structural slice。

共享工作流定义的是共同 evidence 与 stage-gate 标准；本 prompt 额外要求以真实 repo 和 runtime contract 为 baseline，并提供从当前实现迁移到目标体验的路径。

### 首要目标

在不牺牲 output quality、数据真实性、专业控制、approval boundary、执行安全和可恢复性的前提下，降低用户的：

- 理解成本；
- 重复输入；
- 不必要选择；
- 对专业术语的依赖；
- 从数据到行动的翻译成本；
- 对系统可信度的疑虑；
- 失败后的恢复成本。

### 必须采用的 mindset

1. 当前 UI 是 evidence，不是约束。
   不默认保留当前页面数量、navigation、field order、component boundaries 或 workflow。

2. 先分离 capability 与 presentation。
   找出真实能力、数据、规则、状态、权限和执行边界，再决定用户何时需要看到什么。

3. 检查 responsibility inversion。
   找出系统本来能够理解、筛选、默认或验证，却仍要求用户手动完成的判断。

4. 从 user job 和 decision ownership 开始。
   先定义用户必须做的少量重要决定，再设计页面。不要从 component tree 开始。

5. Lightweight 不等于功能少。
   系统承担更多复杂度；高级细节通过 progressive disclosure 保留。

6. 删除步骤时保护 output quality。
   说明被删除的输入如何由可信 context、server resolution、validated default、历史 evidence 或 explicit gap 补足。

7. 允许挑战 implementation logic。
   如果 API、state model、data contract、backend responsibility 或 module boundary 导致糟糕 UX，必须指出。

8. 不虚构能力。
   区分 live verified、implemented、partial、prototype/fixture、planned/open 和 unsafe/unproven。

9. 不把 backend subsystem 直接变成 navigation。
   Audit、AI、optimizer、creative、context、approval 和 execution 可能是 lifecycle capabilities，而不是独立 tabs。

10. 先 propose，后 implement。
    本轮只给 evidence、options、trade-offs、recommendation 和 migration slices。

### Phase 1 — 建立真实 baseline

检查并引用：

- route 和 entry points；
- component tree；
- services、hooks 和 API calls；
- backend contract/schema；
- source of truth；
- loading、empty、error、permission、partial 和 stale states；
- fixtures、mock、standalone prototype 与 production rendering 的区别；
- 哪些 actions 真的执行，哪些只是 demo；
- 当前用户 journey；
- dirty worktree、branch 和 baseline commit。

给每项能力加 evidence label：

- Live verified；
- Implemented but not live-verified；
- Partial；
- UI hidden/unwired；
- Prototype/fixture only；
- Planned/open；
- Unsafe/unproven。

明确哪些结论来自 code，哪些来自 document，哪些只是 inference。

### Phase 2 — 诊断当前体验

按以下六类分析 friction：

- 理解：用户是否知道自己为什么来、现在怎么样、下一步是什么？
- 输入：是否重复填写系统已经知道的内容？
- 选择：是否被迫选择本应由系统筛选的技术机制？
- 信任：是否混淆事实、AI hypothesis、derived signal、measured outcome 和 executable action？
- 执行：是否清楚 authority、consequence、readiness 和 provider result？
- 恢复：失败、超时、partial、ambiguous、refresh 和 return visit 如何恢复？

找出工程实现污染用户模型的地方，例如：

- API fields 直接变成表单；
- database status 直接变成用户文案；
- 一个 endpoint 对应一张 card；
- backend subsystem 对应一个 tab；
- 为了复用 component 合并不同 user jobs；
- 用多个 booleans 模拟缺少的 domain state machine；
- frontend 静默猜关键默认值；
- missing data 被显示成 0；
- create、ready 和 activate 被当成同一个成功状态。

### Phase 3 — 重设产品问题

定义：

- core user job；
- observable success；
- user 最少必须做的 decisions；
- system 应自动完成的工作；
- 必须保留的人类 authority；
- 用户建立 trust 需要看到的 evidence；
- 用户不需要理解的内部机制；
- 一个简单、可记忆的 lifecycle/mental model。

特别判断：当前问题是否只是 information overload，还是更深层的 responsibility inversion、错误 object model 或错误 source-of-truth boundary。

### Phase 4 — 信息和内容审查

对主要信息和 controls 分类：

- Keep：此刻做决定必需；
- Rewrite：重要但表达错误；
- Progressive disclosure：专业细节，默认收起；
- Move：移到详情、历史、settings、debug 或另一个时机；
- Remove：重复、误导、无行动价值或无可靠来源；
- Add：当前缺少但用户决策需要。

每项说明：

- 用户价值；
- 出现时机；
- 推荐文案；
- data dependency；
- missing state；
- 对 output quality/safety 的影响。

检查：

- feature language 是否压过 user outcome language；
- card wall 和等权信息是否掩盖 hierarchy；
- activity metrics 是否压过 business outcome；
- CTA 是否竞争；
- 是否出现 optimal、best、will improve ROI 等无证据 claim；
- advisor insight 是否被误当 executable proposal；
- user 是否被迫理解内部技术字段。

### Phase 5 — 提出三个真正不同的方向

至少提出：

#### A. Conservative integration

保留大部分现有结构，只修正严重 friction、truth 和 authority 问题。

#### B. Structural rethink

重组 IA、object model、state 和主要 workflow；保留成熟能力，但不保留错误的页面模型。

#### C. User-first reimagination

从 core job 完全重建 mental model；把现有 capability 当材料，不把现有 layout/flow 当边界。

三个方向必须在产品逻辑上不同，不能只是颜色、spacing 或 card variation。

每个方向说明：

- one-line concept；
- user mental model；
- first screen；
- primary CTA；
- happy path；
- key states；
- 删除/合并/隐藏的内容；
- output quality 如何保护；
- frontend/backend contract changes；
- maturity fit；
- risk；
- migration cost。

推荐一个方向，并说明另外两个为什么不适合作为当前 target。

### Phase 6 — 展开推荐方向

输出文字版 experience blueprint：

1. Information architecture 和每个 destination 的唯一职责。
2. Stable object model。
3. State model：first use、empty、ready、in progress、waiting、needs attention、approval required、executing、success、partial、failed recoverable、ambiguous/reconciling、permission blocked、stale/expired。
4. First-time、happy path、review/approval、edit、result/learning、error/recovery、returning-user flows。
5. 每个 screen 的 user question、primary message、primary action、evidence、advanced details 和 deliberately absent content。
6. 真实 UX copy 示例。
7. Progressive disclosure 与 advanced mode。
8. Source、freshness、confidence、missing context、user correction、authority、undo、read-back 的呈现。
9. Mobile decision order、sticky action、keyboard、focus、screen reader、contrast 和 reduced motion。

### Phase 7 — 分开 UX/UI 与 Engineering work

建立 gap matrix：

- current behavior/contract；
- target UX；
- UX/content action；
- frontend action；
- backend/API action；
- data/evidence dependency；
- safety/permission implication；
- maturity/risk；
- acceptance evidence。

特别指出：

- 哪些问题不能靠 CSS 或组件重排解决；
- 哪些字段必须 server-resolve；
- 哪些默认值不能由 frontend 猜；
- 哪些流程需要 state machine；
- 哪些 actions 需要 idempotency、read-back、reconciliation 或 undo；
- 哪些 claims 需要 measurement gate。

### Phase 8 — 给出迁移计划

分成：

- Now：修正误导、错误 authority 和严重 friction；
- Next：验证新 mental model 的最小 vertical slice；
- Later：完整 visual system、advanced controls、learning 和 automation。

每个 slice 包含：

- user outcome；
- scope；
- out of scope；
- likely files/contracts；
- acceptance criteria；
- QA evidence；
- rollback boundary。

优先完整 vertical slice，不要一次重写整个 codebase。

### 最终输出

1. Executive finding
2. Evidence-backed current-state map
3. Capability → user value → UI moment map
4. Journey and friction map
5. Assumptions to discard
6. Information/content audit
7. Three redesign directions
8. Recommended experience blueprint
9. UX/UI vs Engineering gap matrix
10. Prioritized migration slices
11. Open questions that materially change scope
12. Approval boundary

生成 proposal ID，例如 `UX-MVP-R1`。

最后明确写：

“本轮未修改代码。只有在你明确回复 `APPROVE UX-MVP-R1` 并指定 implementation slice 后，我才开始实现。”

### 禁止事项

- 不要一开始写代码。
- 不要把现有 screens 一一重画。
- 不要默认保留现有 layout、navigation 或 component boundaries。
- 不要用更多 cards、tabs 和 modals 容纳复杂度。
- 不要用 visual polish 掩盖 state、content、contract、data truth 或 authority 问题。
- 不要虚构 API、production status、user research 或 measurement evidence。
- 不要为了少一步而跳过 safety/readiness/approval。
- 不要只给抽象原则；引用具体代码和行为证据。

---

## Optional implementation follow-up

批准 proposal 后，再要求 agent：

1. 重新确认 branch/worktree/dirty files；
2. 保存 baseline evidence；
3. 只实现获批 slice；
4. 列出 files/contracts；
5. 说明 preserved behaviors；
6. 先实现 state/content/flow，再做 polish；
7. 运行相称 tests；
8. 汇报 before/after journey、acceptance evidence 和 rollback。
