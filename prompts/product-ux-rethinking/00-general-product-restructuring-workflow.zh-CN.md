# 通用产品重构工作流

## 什么时候使用

面对 engineer-first、功能复杂、信息过载，或者内部系统能力已经直接泄漏到用户体验中的产品时使用。

它既可以作为已有 MVP UX 重构的共同方法论，也可以用于新功能规划进入 solution design 之前的结构审查。它不替代两套专用 prompt，而是规定它们共同遵守的证据、责任、风险与交付物标准。

---

## 可直接交给另一个 session 的核心指令

面对 engineer-first、功能复杂且信息过载的产品，不要从现有页面和字段开始优化。先建立 source-of-truth map，区分产品文档、真实代码、API contract、fixture、已验证能力和未来能力；然后从用户希望获得的结果重新定义产品责任，决定哪些复杂度由系统 resolve、哪些决定必须交给用户。

接着审查 truth、authority、measurement、readiness、error/recovery 和 provenance 风险；用关键文字 flow 模拟完整体验，把现有信息分类为 Keep、Rewrite、Progressive disclosure、Move、Remove 和 Add；再按 V1/V2、Product/Design 与 Engineering 拆分范围。

只有当信息架构仍存在真正不同的方向时，才使用同一场景和数据制作并排 mockup variations。最后实现一条端到端 structural slice，并同时验证用户 friction、output quality、能力真实性和执行安全。

不要把当前 layout、component tree、API shape 或数据库状态当作目标产品模型。它们是 evidence 和 migration constraint，不是必须保留的用户体验。

---

## 完整工作流

### Stage 0 — 明确任务、成熟度与权限

开始前先写清楚：

- 用户真正希望获得的结果；
- 当前产品成熟度；
- 本轮是 discovery、proposal、mockup 还是 implementation；
- 可以读取和修改的 repo、文档与环境；
- 不能触碰的 production state、外部系统和数据；
- 谁拥有产品决定、执行批准与最终责任。

如果这些边界不清楚，先记录 assumption 与风险，不要悄悄扩大权限。

### Stage 1 — 建立 source-of-truth map

不要寻找一个虚假的“唯一真相”。分别记录每一种 artifact 对什么有权威：

| Source | 它能证明什么 | Authority | Freshness | Verification | Conflict rule |
|---|---|---|---|---|---|
| 产品文档 | intent、scope、open questions | proposed / approved | 日期 | owner confirmation | 不覆盖真实 runtime behavior |
| 真实代码 | implemented path、state、validation | implemented | commit/branch | code inspection | 不等于 live verified |
| API contract/schema | request、response、error contract | contractual | version | contract/test | 不等于 provider 实际结果 |
| Fixture/mock | intended/demo state | illustrative | 日期 | fixture inspection | 不能声称为真实能力 |
| Live response | 当前 runtime behavior | observed | timestamp | reproducible check | 只证明被观察场景 |
| Analytics/research | behavior、pain、outcome evidence | measured/reported | time window | method/sample | 不自动证明 causality |
| Future proposal | desired capability | proposed | version | none yet | 必须与现状分开 |

给结论标记 evidence status：`live verified`、`implemented`、`contracted`、`partial`、`fixture only`、`documented intent`、`proposed`、`unknown`、`unsafe/unproven`。

当 sources 冲突时，不要自行拼成一个看似完整的事实；记录冲突、影响和需要由谁验证。

### Stage 2 — 从结果重新分配产品责任

从 user outcome 倒推，而不是从 screens 顺推。建立 responsibility map：

| 责任 | 系统应自动 resolve | 系统应建议、用户确认 | 用户必须决定 | Operator/admin 决定 |
|---|---|---|---|---|
| Context gathering | 已知且可靠的信息 | 缺失或冲突信息 | 目标与偏好 | policy/configuration |
| Analysis | 计算、筛选、验证 | hypothesis 与解释 | 高影响 trade-off | governance threshold |
| Execution | 低风险、可逆动作 | material action preview | 不可逆或高风险批准 | permission 与 override |
| Recovery | retry、resume、dedupe | recovery recommendation | 接受替代结果 | incident handling |

检查 responsibility inversion：系统已经知道、能够推断或能够安全默认的事情，是否仍被变成用户输入？相反，具有真实后果的决定是否被 AI 或自动化悄悄代替？

每一个用户可见 control 都必须对应 material consequence；否则应自动化、默认、合并或 progressive disclosure。

### Stage 3 — 审查六类不可省略的风险

1. **Truth**：事实、推断、建议、预测和结果是否清楚区分？
2. **Authority**：谁能查看、编辑、批准、执行、撤销和 override？
3. **Measurement**：成功如何被观察？metric 的来源、窗口、基线和归因是什么？
4. **Readiness**：执行前必须满足哪些 data、permission、validation 和 provider 条件？
5. **Error/recovery**：失败、超时、partial success、duplicate、stale state 和 return visit 如何恢复？
6. **Provenance**：用户能否知道信息或建议来自哪里、何时生成、使用了什么 context、是否仍然有效？

对 AI 功能另外检查 confidence、unsupported claim、context freshness、human approval、fallback、reproducibility 和 execution boundary。

### Stage 4 — 先写关键文字 flow，不先画 UI

用同一个具体场景和一组现实数据模拟端到端体验。每一步写：

1. 用户此刻想完成什么；
2. 用户看到什么；
3. 系统在后台 resolve 什么；
4. 系统展示的内容属于 fact、inference、recommendation 还是 result；
5. 用户必须做什么决定，以及为什么不能由系统代替；
6. 状态如何改变，source of truth 在哪里；
7. 失败、离开、刷新或返回时如何继续。

至少覆盖 first use、returning use、empty、loading、partial、error、permission denied、stale 和 success。文字 flow 仍不自然时，不要进入 mockup。

### Stage 5 — 做 information disposition audit

把当前与计划中的信息逐项分类：

- **Keep**：对当前任务与决定必要，含义已经清楚；
- **Rewrite**：信息必要，但语言、单位、层级或 framing 错误；
- **Progressive disclosure**：专家或例外场景需要，默认不应阻塞主 flow；
- **Move**：有价值，但属于其他阶段、对象、页面或角色；
- **Remove**：重复、无行动价值、无法证实或只是内部实现泄漏；
- **Add**：为了 trust、decision、readiness、measurement 或 recovery 必须新增。

每项都记录：服务哪个 user decision、证据来源、默认可见性、owner、过时规则以及删除后由什么机制补足。

### Stage 6 — 拆分范围，不把 redesign 变成一个巨大项目

同时从两个维度拆分：

| | Product/Design | Engineering |
|---|---|---|
| V1 | 核心责任模型、IA、主 flow、content、必要 states | 可交付 contract、真实数据、关键 validation、end-to-end slice |
| V2 | advanced controls、secondary flows、personalization | automation、scale、optimization、deeper integrations |

为每项标记：`must for useful/safe`、`important next`、`future capability` 或 `explicitly out of scope`。不要用“backend 已经有了”作为 V1 用户可见功能的理由。

### Stage 7 — 有结构分歧时才制作 mockup variations

只有在文字 flow 和 IA 仍存在真正不同的方案时，才做并排 variations。变化必须是 interaction model、information hierarchy、decision timing 或 system/user responsibility 的差异，而不是颜色和 card style 差异。

所有 variation 使用：

- 同一个用户与任务；
- 同一组现实数据；
- 同样的 edge state；
- 同样的 output-quality 与 safety requirement。

比较 time-to-understand、decision count、input burden、trust clarity、recoverability、expert control、implementation risk 和 scalability。选出推荐方向并说明放弃其他方向的原因。

### Stage 8 — 实现一条 structural slice 并四维验证

首个 implementation slice 应端到端穿过真实 entry、data、decision、action、state update 和 recovery，而不是只完成一张静态页面。

同时验证：

- **User friction**：理解时间、步骤、输入、决定与恢复成本是否下降？
- **Output quality**：结果是否仍然正确、相关、可解释并满足专业标准？
- **Capability truth**：UI 声称的能力是否有真实 contract、response 或可复现验证？
- **Execution safety**：permission、preview、validation、idempotency、confirmation、error 与 recovery 是否成立？

记录 baseline、测试场景、observed result、remaining risk 与下一项 decision。不要把 build success、deployment notification 或漂亮 screenshot 当作完成验证。

---

## 不同呈现形式的用途

| Artifact | 用途 | 不应该用来做什么 |
|---|---|---|
| 核心判断文章 | 解释产品为什么要这样重新定义，以及责任模型如何改变 | 代替 evidence 或实施范围 |
| 表格 | 比较成熟度、责任、方案、证据、风险和 V1/V2 边界 | 表达复杂时间顺序 |
| 关键文字 flow | 在画 UI 前模拟用户看到什么、系统做什么、用户决定什么 | 描述像素和视觉风格 |
| Flowchart | 只表达状态转换、权限、分支和 recovery | 承载长篇产品说明或 screen layout |
| Mockup variations | 比较不同信息层级、interaction model 和 decision timing | 为已确定方案制造表面选择 |
| Checklist | 维护实施任务、工程依赖、验证项和持续风险 | 解释产品为何这样定义 |
| Evidence appendix | 保留文档、源码、contract、真实 response 和 live verification 的可追溯性 | 混入未经标记的 proposal |

默认不要为了“交付完整”而制作所有形式。选择能回答当前决策问题的最小 artifact set。

---

## 阶段 gates

- 没有 source-of-truth map，不进入产品判断。
- 没有 responsibility map，不设计 controls。
- truth、authority、readiness 和 recovery 未定义，不称为 safe MVP。
- 关键文字 flow 未通过，不画高保真 UI。
- 没有真正结构差异，不做 mockup variations。
- 没有真实 end-to-end contract，不声称 implementation complete。
- 没有 observable evidence，不声称 friction 或 output quality 已改善。

## 最终交付建议

根据任务选择并明确标注：

1. 核心判断；
2. source-of-truth 与 evidence map；
3. responsibility map；
4. 风险审查；
5. 关键文字 flow；
6. information disposition；
7. V1/V2 × Product/Design/Engineering 范围；
8. 必要时的 variations；
9. structural slice 与 validation plan；
10. evidence appendix、open questions 和 proposal ID。

在获得明确 proposal-ID 与 implementation-slice approval 前，停留在 read-only proposal 阶段。
