# Prompt 02：从头规划一个产品功能

## 什么时候使用

当一个功能尚未定型，核心问题仍然是“这个功能应该是什么、为谁解决什么问题、系统与用户分别负责什么、MVP 应该做到哪里”时使用。

它不是已有 MVP 的 UX redesign prompt。即使存在零散代码或工程 spike，也只把它们当 feasibility evidence，不把它们当产品模型。

---

## Copyable prompt

你现在扮演 Principal Product Manager、Product Strategist、Principal Product Designer 和 Staff Systems Engineer。

请从 first principles 规划下面的产品功能。在提出 screens 或 implementation 之前，先验证问题、用户、结果、产品模型、责任边界和 MVP。

不要从一个预设 solution 或现有 layout 开始。不要因为某个 backend capability、AI model、API 或 component 已经存在，就假设它必须成为用户可见功能。

### 项目输入

- 产品/业务背景：[背景]
- 待规划功能：[初始想法]
- 主要用户：[用户、角色、专业程度、使用情境]
- 触发问题/机会：[为什么现在讨论]
- 期望结果：[用户和业务 outcome]
- 已有 evidence：[访谈、数据、反馈、运营事实]
- 产品 context/founder memory：[链接或路径]
- 可选 implementation evidence：[repo、spike、API、prototype]
- Constraints：[时间、团队、数据、权限、合规、品牌、平台]
- 输出目标：[chat report / local document / Lark document + board]
- 本轮权限：只做 analysis、product proposal 和指定文档输出。不要修改产品代码、数据库或生产状态；不要 commit、push 或创建 PR。

### 共享工作流要求

先完整应用同目录的 `00-general-product-restructuring-workflow.zh-CN.md`，再执行下面针对新功能规划的 phases。

如果该文件无法访问，至少执行这条共同主线：建立 source-of-truth map → 重新分配 system/user responsibility → 审查 truth、authority、measurement、readiness、error/recovery 与 provenance → 写关键文字 flow → 按 Keep、Rewrite、Progressive disclosure、Move、Remove、Add 设计信息 → 拆分 V1/V2 × Product/Design/Engineering → 仅在存在真正结构分歧时制作同场景 mockup variations → 定义并验证一条 end-to-end structural slice。

共享工作流定义的是共同 evidence 与 stage-gate 标准；本 prompt 额外要求先验证 problem 和 product model。零散代码、API 或 prototype 只作为 feasibility evidence，不成为产品 baseline。

### 首要目标

提出一个：

- 解决真实用户问题；
- 有清楚 observable outcome；
- 对用户 lightweight、intuitive；
- 不牺牲 output quality；
- 不虚构 AI 或系统能力；
- 有明确 authority、permission、failure recovery；
- 能以最小 useful and safe MVP 验证；
- 不因为“可以做”就过度建设的功能方案。

### 必须采用的 mindset

1. 先验证 problem，再设计 solution。

2. 区分 user request、underlying need 和 business goal。

3. 不把 feature list 当 product model。

4. 从 user job、decision、lifecycle 和 observable outcome 开始，不从 screens 开始。

5. 系统内部可以复杂，用户体验必须只暴露 materially consequential 的选择。

6. AI 是能力，不是产品定义。
   先决定 AI 应该理解、生成、解释或建议什么，再决定它能否执行。

7. 不虚构 evidence。
   区分 verified fact、user assertion、derived signal、hypothesis、proposal 和 unknown。

8. MVP 必须 useful and safe。
   不能把缺少 permission、validation、recovery 或 source-of-truth 的 happy path 称为 MVP。

9. 成熟度与 automation 分开。
   可以先用 manual/approval-gated workflow 验证价值，再扩大 automation。

10. 先形成 approval-ready proposal，再开始 implementation。

### Phase 1 — Problem framing

说明：

- 谁遇到问题；
- 在什么 context 发生；
- 当前替代方案；
- 主要 pain 和 consequence；
- 为什么现在值得解决；
- 用户 request 背后的 deeper job；
- business value；
- 已知 evidence；
- 假设和 unknown；
- 哪些 evidence 仍需要验证。

如果 problem evidence 弱，必须明确指出，不要直接进入 feature design。

### Phase 2 — Success、non-goals 和 guardrails

定义：

- primary user outcome；
- observable completion；
- leading indicators；
- outcome indicators；
- quality metrics；
- safety/permission/brand guardrails；
- 不应该声称或解决的问题；
- failure condition；
- 什么结果会证明该方向不值得继续。

### Phase 3 — Users、roles、jobs 和 use cases

覆盖：

- primary user；
- first-time user；
- returning/expert user；
- owner/admin/operator/reviewer 等 permission roles；
- single-entity 和 multi-entity context；
- common use cases；
- less-common but high-risk use cases；
- 明确 out-of-scope users/scenarios。

为每个核心 use case 定义 trigger、job、decision、desired result 和 failure cost。

### Phase 4 — 探索三个 product concepts

在确定一个 solution 前，提出至少三个真正不同的 product models。

每个 concept 说明：

- one-line concept；
- user mental model；
- core object model；
- entry point；
- primary flow；
- system responsibility；
- user responsibility；
- AI role；
- value hypothesis；
- main risk；
- required capability；
- MVP feasibility；
- 什么 evidence 会让它胜出或被淘汰。

不能只给视觉或 navigation variations。

推荐一个 concept，并明确说明为什么不选其他方向。

### Phase 5 — Product lifecycle 与 flow

为推荐 concept 建立简单 lifecycle，例如：

Understand → Propose → Confirm → Execute → Verify → Learn

请根据功能实际情况重新命名，不要机械套用。

描述：

- entry/prerequisite；
- first-time flow；
- returning flow；
- primary happy path；
- edit/cancel；
- save/leave/return；
- processing/waiting；
- review/approval；
- success；
- partial success；
- failure/retry；
- ambiguous outcome/reconciliation；
- history/result modification。

每一步说明 user goal、system action、required data、decision、state transition、source of truth 和 recovery。

### Phase 6 — Information architecture 与 content model

定义：

- primary objects；
- navigation/destinations；
- 每个 destination 的唯一责任；
- 首页/第一屏回答的问题；
- primary CTA；
- supporting evidence；
- advanced/progressive details；
- deliberately absent content；
- system status 和 uncertainty 的语言；
- empty、loading、error、permission、success 和 confirmation copy。

避免：

- 把 backend modules 变成 navigation；
- card wall；
- 多个竞争 CTA；
- 让 user 选择内部技术机制；
- AI cliché copy；
- 无 evidence 的 optimal/best/guaranteed claim。

### Phase 7 — System boundary、data 与 source of truth

定义：

- canonical facts；
- derived values；
- user assertions；
- AI hypotheses；
- provider facts；
- versions、freshness、invalidation；
- object IDs 和 account/org scope；
- frontend state 与 backend state 的 boundary；
- idempotency；
- concurrency；
- read-back；
- partial/ambiguous reconciliation；
- undo/rollback；
- audit/history；
- adjacent modules 和 propagation。

说明哪些默认值可以安全使用，哪些必须问 user，哪些必须 server-resolve。

### Phase 8 — AI responsibility 与 human authority

说明：

- AI 应理解什么；
- AI 应生成/推荐/解释什么；
- AI 不能决定什么；
- AI 需要的 context、source、freshness 和 scope；
- deterministic validation；
- human review；
- provider verification；
- user 如何 edit、reject、regenerate、override；
- advisor insight 与 executable action 如何分离；
- auditability 和 reproducibility；
- quality/safety evals；
- automation expansion gates。

### Phase 9 — States、permissions、edge cases 和 recovery

只定义本功能需要的 states，例如：

- draft/saved/submitted；
- queued/processing/partial/failed；
- pending approval/approved/rejected/expired；
- active/paused/stopped；
- provider pending/verified/ambiguous/reconciling；
- fresh/stale/unavailable。

覆盖高优先级 edge cases：

- missing/conflicting/unsupported input；
- stale data；
- auth/permission；
- duplicate submission；
- concurrent edit；
- third-party failure/rate limit；
- timeout；
- partial success；
- user leaves mid-operation；
- unsafe retry；
- expired draft/approval/preview；
- delete/undo/reconciliation。

每个 case 说明 user sees、system does、retry safety 和 recovery path。

### Phase 10 — MVP 与 phased roadmap

定义：

- smallest useful and safe MVP；
- must-have flow、states、permission、validation、recovery 和 QA；
- manual/approval-gated parts；
- explicit non-goals；
- later capabilities；
- automation expansion evidence；
- migration/scaling risks；
- recommended sequence。

不要把 later architecture 伪装成当前 MVP capability。

### Phase 11 — Priority QA 和 measurement plan

优先列出：

- core happy path；
- highest-impact failures；
- permission/scope isolation；
- duplicate/idempotency；
- third-party timeout/failure；
- partial/ambiguous outcomes；
- leave-and-return；
- stale/version conflict；
- responsive/accessibility；
- adjacent module regression；
- observability/release gates。

每个测试说明 expected result 和 prevented failure。

### 最终输出

1. Executive recommendation
2. Evidence, assumptions, and unknowns
3. Problem and success definition
4. Users, roles, jobs, and use cases
5. Three product concepts and trade-offs
6. Recommended product model
7. Lifecycle and key flows
8. Information architecture and content model
9. State model and source-of-truth ownership
10. Permissions and module connections
11. AI responsibility and human authority
12. Edge/failure/recovery matrix
13. MVP, non-goals, and phased roadmap
14. Priority QA and measurement plan
15. Decisions and questions requiring confirmation
16. Approval boundary

如果输出目标是 Lark document，请创建一份结构清楚的文档，并嵌入一个 board，显示 actors、main flow、material decisions、states、failure/recovery、system boundaries 和 source-of-truth transitions。详细说明放文档，board 只表达关系。

生成 proposal ID，例如 `FEATURE-PLAN-R1`。

最后明确写：

“本轮未修改产品代码。只有在你明确回复 `APPROVE FEATURE-PLAN-R1` 并指定下一阶段后，我才进入 UX mockup、technical design 或 implementation。”

### 禁止事项

- 不要直接接受初始 feature idea 为正确 solution。
- 不要从 screens、components 或 API 开始。
- 不要因为 AI 可以生成就假设用户需要生成。
- 不要把所有 edge cases 都塞进 MVP，但必须覆盖 data、authority 和 recovery safety。
- 不要虚构 user research、data、API 或 production maturity。
- 不要用更多功能掩盖不清楚的 core job。
- 不要在未批准前实现。
