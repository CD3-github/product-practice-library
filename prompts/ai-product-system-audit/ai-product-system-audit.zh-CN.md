# Prompt：AI 产品与 Agent System 全面审查

## 用途

请对一个已经存在的 AI 产品、agent workflow、generation pipeline 或 orchestration harness 做一次证据优先、端到端、可执行的系统审查。

这不是常规代码风格 review，也不是默认保留现有架构的小修小补。目标是确认系统的真实能力、完整链路、模块边界、可移除性、schema/contract 质量、testing 与 evaluation 覆盖，并提出能够降低迭代成本、提高 output quality 与执行安全的重构方案。

## 我会提供的背景

- 产品或功能：`[名称与简述]`
- 用户希望获得的结果：`[用户 outcome]`
- 仓库或 worktree：`[绝对路径 / URL]`
- 相关入口、route 或 package：`[若已知]`
- 产品文档、设计或 API 文档：`[路径 / URL]`
- 运行环境与命令：`[若已知]`
- 当前使用的模型、provider、tool、data source：`[若已知]`
- 已知问题或担忧：`[若有]`
- 产品成熟度：`[prototype / internal / beta / production / unknown]`
- 审查模式：`[read-only audit + proposal / approved narrow implementation]`

未知内容不要猜。先从仓库、配置、测试、运行结果和 trace 中查证；仍然无法确认时标记为 `Unverified`。

---

## 核心工作原则

1. **先验证，再判断。** 阅读 repo instructions、文档、代码、schema、config、tests、fixtures、migrations 和 telemetry；在安全可行时运行测试、最小 runtime 与关键路径。
2. **分开记录不同层次的真相。** `Documented`、`Configured`、`Implemented`、`Registered`、`Wired`、`Reachable`、`Executed`、`Measured` 和 `Proposed` 不能互相替代。
3. **不要编造发现，也不要一味夸奖。** 有证据说明做得好就明确说好；没有证据就写 `Unverified`。一份什么都挑不出对的评审不是严格，而是没有校准。
4. **不要被当前 layout、prompt、pipeline 或类名锚定。** 先从用户 outcome、系统责任、风险和质量标准判断，再决定现有结构哪些应该保留。
5. **把 probabilistic quality 与 deterministic correctness 分开。** 测试通过不等于生成质量好；eval 分数高也不等于权限、contract、重试和副作用正确。
6. **把关闭和删除能力视为一等架构要求。** 模块化不仅是代码拆成多个文件，而是能力能够被独立替换、关闭、回放、验证和移除。
7. **先查后问。** 只询问代码、配置、文档、运行环境和已有 trace 无法回答，并且答案会改变产品责任、安全边界、审查结论或 eval 设计的问题。
8. **首次审查默认只读。** 在我明确批准 proposal 之前，不实施大规模重写、删除公开 contract、迁移持久化数据或改变生产行为。

---

## 1. 建立 Source-of-Truth 与证据账本

先确认：

- 当前 repo、branch、commit、worktree 和 dirty state。
- 仓库级 instructions 与约束。
- 产品文档、真实代码、API/schema、runtime config、fixtures、测试、eval、telemetry 和 live behavior 分别在哪里。
- 哪些来源是 authoritative，哪些只是示例、历史遗留或 proposal。

为关键判断使用以下证据标签：

- `Verified in code`：当前 checkout 的代码直接支持。
- `Verified by test`：已运行的测试支持，并记录命令和范围。
- `Verified at runtime`：已实际跑到相关路径，并保存可定位的输出或 trace。
- `Measured`：有真实质量、业务或运行指标，并说明时间范围与样本。
- `Documented intent`：文档表达意图，但未证明实现。
- `Inferred`：由多个证据推断，明确说明推理。
- `Proposed`：本次建议，尚未实施。
- `Unverified`：当前无法确认；说明缺少什么证据。

不要把 mock/fixture 成功、tool call 成功、HTTP 200、单元测试通过或页面可见，自动解释成用户 outcome 已经实现。

---

## 2. 画出真实的 End-to-End System / Harness Map

从用户输入到最终结果与反馈闭环，按真实实现追踪，而不是按文档想象。至少检查这些可能存在的阶段：

`trigger/input → identity & authorization → normalization → context assembly/retrieval/memory → routing/planning → prompt construction → model/tool execution → validation/guardrails → post-processing/ranking → approval/action → persistence → delivery/read-back → telemetry → evaluation/feedback`

并非每个系统都需要所有阶段。不存在的环节不要为了完整而虚构；缺失但必要的环节要标为 gap。

对每个阶段记录：

| 项目 | 要回答的问题 |
|---|---|
| Responsibility | 这个阶段只负责什么？明确不负责什么？ |
| Owner | 哪个 module/service/team 是 owner？ |
| Entry point | 它如何被调用、注册或触发？ |
| Inputs | 输入 schema、来源、required/optional/default 是什么？ |
| Outputs | 输出 schema、状态、错误和 provenance 是什么？ |
| Contract | producer 与 consumer 约定了什么？如何验证？ |
| State | 是 stateless、session、job 还是 durable state？ |
| Side effects | 会写数据、发消息、调用付费模型或执行外部动作吗？ |
| Failure/recovery | timeout、retry、fallback、partial failure、resume、cancel 如何处理？ |
| Observability | log、trace、metric、cost、版本和 correlation ID 是否可见？ |
| Control | 是否有 config、feature flag、kill switch、rollout 与 rollback？ |
| Verification | 有哪些 test、eval、fixture 和 runtime evidence？ |

产出一张简洁的 system map，并指出跨越多个阶段的隐式逻辑、重复逻辑和责任泄漏。

---

## 3. 专门审查 AI Harness

不要只问“用了哪个模型”或“prompt 写了什么”。审查 harness 是否把模型、context、tools、state、authority、quality 和 operations 组织成一个可控系统。

### 3.1 Instructions 与 prompt assembly

- system/developer/user/tool instructions 的优先级和拼装顺序是否明确？
- prompt 是否有稳定 ID、版本、owner、change log 与 rollback 方法？
- 不同场景的 instructions 是组合模块，还是复制粘贴后逐渐漂移？
- 用户 correction 是否更新 canonical intent，而不是累积大量 reactive negative constraints？
- prompt/template 是否真的被当前执行路径加载？是否存在未使用、重复或过时版本？
- prompt 输入是否来自有 schema 的 context object，而不是散乱字符串拼接？

### 3.2 Model 与 provider routing

- 选模型的依据是什么：任务、风险、latency、cost、modality 还是 tenant？
- routing/fallback 是否显式、可观察、可测试？fallback 会不会改变能力或 schema？
- model、provider、temperature、seed、tool mode、token budget、timeout 等配置是否版本化并进入 trace/eval record？
- 是否区分 deterministic stub、recorded replay、gated live call 与 production call？
- 付费调用和不可逆动作是否有预算、权限与确认边界？

### 3.3 Context、retrieval 与 memory

- 每种 context 的来源、freshness、scope、tenant、权限与 provenance 是否可追踪？
- retrieval query、ranking、截断和 token allocation 是否可见并可评估？
- session memory、durable memory、user profile、repo state 与 live data 是否明确分层？
- 谁可以写 memory？何时更新、过期、删除或纠正？
- 输出能否指出关键判断使用了哪些 context；过时或冲突数据如何处理？
- 敏感信息是否在日志、prompt、eval dataset 和 trace 中被最小化或脱敏？

### 3.4 Tools、capabilities 与 authority

- tool registry 是否是唯一来源？工具声明与真实实现是否一致？
- 每个 tool 的 auth、scope、tenant、rate limit、timeout、retry、idempotency 和 side effect 是否明确？
- read、draft、propose、approve、execute、verify 是否被区分？
- agent 能否在未经用户或 policy 授权时扩大 scope 或执行不可逆操作？
- tool 结果是否被 schema 验证；tool success 是否还需要 durable read-back 才能算完成？
- disabled/unavailable tool 会被干净移除，还是继续出现在 prompt、router 或 UI 中误导模型和用户？

### 3.5 State、orchestration 与 recovery

- run、turn、step、job、artifact、approval 和 execution record 的状态机是否明确？
- timeout、retry、backoff、duplicate delivery、race、concurrency、cancel 与 resume 如何处理？
- 重试是否可能重复副作用；是否有 idempotency key 和 exactly-once/at-least-once 的明确语义？
- 中间产物能否被保存、回放、单独重跑和比较？
- failure 是否对用户可理解并提供 recovery，而不是只在 log 中出现？

### 3.6 Output quality、guardrails 与 validation

- 哪些约束应该 deterministic enforcement，哪些适合 model judgment，哪些必须 human approval？
- structured output 是否在 boundary 做 schema validation、repair 与 failure handling？
- claim、citation、policy、brand、catalog、localization 和 action readiness 如何验证？
- 不确定性、缺少 context、conflict 和 unsupported specificity 如何表达？
- 是否存在“guardrail 写在 prompt 里但没有 post-generation enforcement”的假保护？

### 3.7 Operations、observability 与 deployment

- 每次 run 是否能还原 prompt/version、model/config、context sources、tool calls、stage outputs、latency、cost、errors 和 final disposition？
- log 与 trace 是否保护隐私，同时足以 debug？
- staging、production、local、test config 是否有明确差异，还是依赖隐藏环境变量？
- feature flags、kill switches、rollout percentage、tenant allowlist、rollback 与 incident owner 是否明确？
- eval gate、release gate、quality drift、cost drift 和 provider regression 如何监控？

### Harness 问题规则：我要问吗？问什么？

先在 repo、config、deployment manifests、secrets interface、tests、traces 和 dashboards 中查。只有以下问题仍无法确认，且会改变判断时才问我：

1. **Authority**：agent 最终可以只建议、生成草稿，还是可以代表用户执行？哪些动作必须确认？
2. **Quality bar**：什么叫“好 output”？谁判断？允许什么失败率和人工修订量？
3. **Risk tier**：错误输出最坏后果是什么？是否涉及金钱、隐私、发布、外部通信或合规？
4. **Context policy**：允许读取、保存和复用哪些用户/公司数据？保留多久？如何删除？
5. **Model policy**：是否允许换 provider、降级模型、使用 live call 或上传数据？成本与延迟上限是什么？
6. **Ownership**：谁拥有 prompt、schema、eval dataset、runtime、incident 与 go/no-go 决定？
7. **Maturity**：当前是 demo、prototype、internal tool、beta 还是 production？哪些能力只是未来意图？
8. **Success and feedback**：上线后用什么用户结果、行为或 human review 关闭学习闭环？

每个问题标记为：

- `Blocking`：没有答案就无法安全继续。
- `Material`：可以先作显式假设，但会影响设计优先级。
- `Optional`：有助于优化，但不阻塞当前审查。

提问时给出当前证据、建议默认假设，以及假设错误会造成什么影响。不要把本可从代码查到的问题抛给我。

---

## 4. Capability Lifecycle：查出写了但没接入、接了但没验证的部分

为每个关键 capability、event、prompt、content approach、tool、schema、API、worker、UI surface 和 telemetry hook 建立 lifecycle matrix：

| Capability / Artifact | Documented | Configured | Implemented | Registered | Wired | Reachable | Executed | Measured | Consumer / Owner | Verdict |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|---|

`Verdict` 只能使用：

- `Keep`：有明确用途、owner、consumer 与验证。
- `Connect`：实现合理，但链路未接通。
- `Fix`：已使用，但 contract、可靠性或质量不足。
- `Flag`：需要独立开关或 rollout boundary。
- `Deprecate`：仍有 consumer/data，需要迁移计划。
- `Remove`：无有效 consumer 或已被替代，可以安全删除。
- `Unverified`：当前证据不足。

主动寻找：

- orphan module、未注册 handler、永远不会触发的 event consumer。
- 已定义但没有 producer/consumer 的 schema 或 event。
- UI、文档或 prompt 宣称存在，但 runtime path 没有实现的能力。
- 实现存在，但没有 route、registry、feature flag 或入口可以到达的代码。
- fixture/mock 被误当作 live capability。
- 不同目录中的重复 prompt、validator、type、config 或 business rule。
- stale flag、shadow config、无效 environment variable、废弃 model name。
- 测试仍在保护已废弃行为，或只测 helper 而未测真实 composition path。
- live behavior 没有文档、schema、owner、test、eval、telemetry 或 rollback 的反向缺口。

每条发现必须给出具体文件与行号；如果是 runtime/config 问题，给出 trace、命令或可复现路径。提出最小修复，不要只写抽象建议。

---

## 5. 模块化、可替换性与 Removal Drill

不要用“文件很多”“用了 interface”或“有 feature flag”直接证明模块化。对每个关键 module、event、content approach、provider、tool 和 pipeline stage 检查：

- 是否有单一、明确的 entry point 或 registry。
- 是否通过显式 dependency injection / contract 连接，而不是隐藏 import、global singleton 或 shared mutable state。
- 是否有窄而稳定的 input/output schema。
- import、construction 或 registration 是否产生隐藏副作用。
- state、storage、telemetry、cache 与 retries 是否局部归属清楚。
- 是否可以用 config/flag 关闭，同时不让失效能力继续出现在 UI、prompt、router、tool list 或 analytics 中。
- 是否可以替换实现，而不要求所有 consumer 知道 provider-specific detail。
- reusable logic 是否真正只有一个 canonical implementation，而不是多份近似副本。

对拟删除或可能频繁变化的能力执行纸面或实际 removal drill：

1. 用一个明确控制点 disable。
2. 系统仍可启动，核心路径与 CI 仍通过。
3. UI、prompt、router、registry、schema、event、listener、job、analytics、docs 和 eval 中不留下孤儿引用。
4. 已有数据、队列消息、cache 与 persisted state 有 migration/ignore/retention 策略。
5. downstream consumer 能处理能力缺席或版本变化。
6. disabled behavior 有 negative assertion，证明它不会悄悄继续运行或收费。
7. 需要时可以 rollback/re-enable，并知道恢复什么状态。

给出结论：`Cleanly removable`、`Removable with migration`、`Tightly coupled` 或 `Unverified`。

对 content approach / strategy，优先检查是否由 registry + typed strategy contract 驱动。删除一种 approach 时，理想状态是删除一个实现与一条注册配置，而不是同时修改 prompt、router、UI、analytics、eval 和多处条件分支。

明确区分：

- `Disable`：暂时停止使用，代码和数据仍保留。
- `Deprecate`：停止新增使用，并迁移 consumer/data。
- `Delete`：移除实现、contract、数据责任和所有引用。

---

## 6. Schema 与 Contract 审查

先区分以下不同层次，不要让一个巨大 schema 同时承担所有用途：

- **Domain schema**：业务事实与状态。
- **Transport/API schema**：跨进程传输、分页、错误与兼容性。
- **Storage schema**：持久化、索引、retention 与 migration。
- **Event schema**：发生了什么，以及 correlation/causation。
- **Agent/tool contract**：模型或工具被允许接收和返回什么。
- **View model**：UI 真正需要展示和操作什么。
- **Evaluation record**：场景、版本、结果、评分和证据。

逐项检查：

- 名称是否表达业务语义，而不是泄露当前 implementation detail。
- required、optional、nullable、absent 和 default 是否明确且彼此不混淆。
- enum、discriminated union 和 state machine 是否比自由字符串更适合。
- ID、tenant、actor、subject、correlation ID、causation ID、idempotency key 是否明确。
- 时间、时区、货币、单位、locale、精度与排序语义是否明确。
- provenance、freshness、confidence、verification status 是否随关键数据传播。
- permission、authority、approval state 和 side-effect classification 是否进入 contract，而不是只靠调用方约定。
- error envelope 是否区分 validation、auth、retryable、provider、partial success 与 permanent failure。
- schema version、backward/forward compatibility、migration、deprecation window 与 unknown-field policy 是否明确。
- producer 和 consumer 是否都有 contract tests；谁拥有变更审批是否明确。
- boundary 是否实际 validation；TypeScript type、prompt 文本或文档本身不是 runtime validation。
- 是否存在无边界的 `any`、catch-all `metadata`、隐式 default 或同名异义字段。
- canonical schema 能否生成或派生 types、validators 和 docs，避免手写漂移。

Event 建议至少使用明确 envelope：

```text
event_id
event_type
event_version
occurred_at
source
actor / tenant
subject
correlation_id
causation_id
payload
provenance / trace reference
```

对每个 contract 输出：producer、consumer、owner、version、validation point、compatibility policy、failure semantics、test coverage 和 evidence。

---

## 7. 先把 Quality Dimensions 分开

不要用一个总分掩盖不同问题。根据产品实际风险定义独立维度，至少考虑：

- Functional correctness：逻辑和状态是否正确。
- Task completion：是否真的完成用户任务。
- Usefulness/relevance：结果是否可行动、切题、适合场景。
- Factuality/grounding：事实、引用与数据来源是否可靠。
- Instruction/constraint adherence：是否遵循用户与系统约束。
- Safety/authority：是否越权、泄露或执行不应执行的动作。
- Reliability/recovery：失败、重试、恢复和部分成功是否可靠。
- Consistency：多次运行、跨阶段与跨渠道是否自洽。
- Latency/performance：用户等待和系统吞吐是否达标。
- Cost/resource use：token、provider、tool 与人工成本是否可控。
- UX clarity/control：用户是否知道系统在做什么、需要决定什么、如何撤销。
- Maintainability/modularity：能否独立替换、关闭和验证。
- Observability/provenance：能否解释输入、版本、路径、结果与失败。
- Compatibility/migration：变更是否破坏 consumer 或已有数据。

每个维度分别定义 metric、rubric、threshold、sample、owner 和 release consequence。不要把所有维度平均成一个漂亮但无法行动的分数。

---

## 8. 审查 Testing Suite

Testing suite 主要回答：**在给定输入和确定 contract 下，系统是否按预期运行？**

盘点并运行可安全执行的：

- Unit tests：pure function、parser、normalizer、router、validator、policy、state transition。
- Module/component tests：单个 stage 或 adapter 的输入输出与副作用。
- Contract/schema tests：producer/consumer、API、event、tool、version compatibility。
- Integration tests：真实组合的相邻模块、storage、queue、provider adapter。
- End-to-end tests：从真实入口到最终交付/read-back 的关键用户路径。
- Failure/recovery tests：timeout、retry、duplicate、partial failure、cancel、resume、fallback。
- Security/authority tests：tenant isolation、permission、approval、prompt/tool injection boundary。
- Migration/backward-compatibility tests。
- Deployment smoke tests 与 feature-flag/kill-switch tests。

检查：

- 关键路径是否被 over-mock；mock 是否跳过了最容易出错的 contract。
- fixtures 是否代表真实数据形态、缺失值、脏数据、长输入和跨 tenant 情况。
- 测试是否 deterministic、独立、可重复；flaky test 是否被长期忽略。
- model call 是否分成 deterministic stub/recorded replay 与明确 gated 的 live test。
- 是否只测 happy path 或 helper，却没有测真实 registration/composition。
- disabled capability、fallback、rollback 与 read-back 是否有测试。
- test failure 能否定位到 stage 和 contract，而不是只得到模糊的 E2E failure。

给出 testing pyramid/map、已运行命令、结果、未运行原因和最关键缺口。

---

## 9. 审查 Eval Matrix

Eval matrix 主要回答：**当输出存在概率性、语义性和情境差异时，质量是否在足够多的场景和维度上达到标准？**

它不替代 testing suite。测试更适合确定性 contract 与 behavior；eval 更适合 relevance、usefulness、factuality、style、judgment、tool choice 和整体 outcome quality。

建立或审查 eval matrix 时，至少包含：

- `scenario_id` 与清晰场景说明。
- user/use case、vertical/domain、locale/language。
- input quality：完整、稀疏、冲突、过时、噪声、极端长度。
- lifecycle/state：首次使用、恢复、编辑、重试、已发布、权限不足等。
- risk tier 与允许的 authority。
- prompt/model/provider/tool/retrieval/config 版本。
- expected behavior 与禁止越过的边界。
- quality dimensions、rubric、threshold 与 failure taxonomy。
- grader：deterministic assertion、programmatic check、calibrated model judge、human review 或 online outcome。
- repeats、variance、confidence interval（适用时）。
- latency、cost 与 token/tool usage。
- artifacts、trace、stage outputs 与 provenance。

矩阵必须覆盖真正不同的 mechanism 和风险，而不是只把同一案例换名词。特别检查：

- sparse context 能否避免 unsupported specificity，而不是只产出空洞安全话术。
- conflicting context、stale memory、retrieval miss、tool failure、schema drift 与 partial success。
- 多语言、长尾输入、edge case、adversarial/prompt injection 与权限边界。
- 不同 content approach、model 或 routing policy 的对照与 ablation。
- model judge 是否经过 human calibration；rubric 是否避免“听起来不错”式模糊评分。
- 是否同时保留单维度分数、失败原因和具体 artifact，而不是只看 aggregate score。
- eval dataset 是否版本化、去重、防污染，并区分开发集、回归集与 holdout。

---

## 10. 同时支持 E2E 与分阶段测试/评估

判断系统是否具备以下架构；缺少时提出最小改造：

1. 所有 stage 有稳定、版本化的 input/output contract。
2. 一个 scenario 使用同一 `scenario_id` 和 `trace_id` 贯穿全链路。
3. pipeline runner 可以从任意 stage 开始、在任意 stage 停止，并注入冻结的 upstream artifact。
4. 每个 stage output 可以保存为可重放、可比较、带 provenance 的 artifact。
5. stage eval 可以单独判断 retrieval、planning、tool choice、draft、validation 或 delivery，而不必每次调用完整系统。
6. E2E eval 仍使用真实 composition path，防止分阶段都通过但组合失败。
7. deterministic contract checks 在进入下一 stage 前执行；semantic graders 不承担 schema validation。
8. 每个 result record 包含 code commit、prompt、schema、model、provider、config、dataset 与 grader version。
9. 支持 baseline、candidate、ablation 与 regression comparison，而不是覆盖旧结果。
10. 失败可回溯到首个偏离的 stage，并区分 upstream input defect 与 current-stage defect。

推荐的 eval ladder：

`pure deterministic tests → stage contract tests → stage quality evals → adjacent integration tests → replayed E2E → gated live E2E → human/online outcome validation`

明确指出哪些层已存在、哪些只是 proposal、哪些因成本或权限没有运行。

---

## 11. Testing Suite 与 Eval Matrix 的区别

请在报告中保留一张针对当前系统的比较表，至少说明：

| 维度 | Testing Suite | Eval Matrix |
|---|---|---|
| 核心问题 | 系统是否按 contract 正确运行？ | 概率性/语义性输出是否足够好？ |
| 典型断言 | exact value、state、schema、side effect | rubric、ranking、judgment、task success |
| 稳定性 | 应尽量 deterministic | 可能需要重复运行与方差 |
| 数据 | fixtures、edge cases、integration env | scenario corpus、goldens、human labels |
| Grader | test assertion/programmatic oracle | programmatic、model judge、human、online metric |
| 失败定位 | function/module/contract/path | scenario/dimension/stage/config |
| Release role | correctness、safety、compatibility gate | quality、regression、go/no-go evidence |
| 不能证明 | 用户是否觉得结果好 | schema、权限和副作用一定正确 |

两者应共享 scenario IDs、version metadata 和 artifacts，但不能共用一个含义模糊的“pass rate”。

---

## 12. 输出要求

请按以下结构交付：

### A. Executive verdict

- 用 5–10 条说明系统当前真正成熟到哪里。
- 最重要的 3–5 个风险与机会。
- 哪些地方做得好，并说明证据。

### B. Evidence ledger 与 verification boundary

- 已阅读、已运行、未能访问、未能验证的内容。
- 每条关键结论的证据标签。

### C. End-to-end system / harness map

- 阶段、责任、owner、contract、state、side effect、recovery、observability。
- 隐式耦合与责任泄漏。

### D. Capability lifecycle matrix

- 找出 documented-but-unimplemented、implemented-but-unwired、wired-but-unreachable、executed-but-unmeasured 和 live-but-unowned。

### E. Dead / redundant / shadow surface inventory

- 每条包含文件行号或 runtime evidence、影响与最小修复。

### F. Modularity 与 removal report

- 对关键能力给出 `Cleanly removable / Removable with migration / Tightly coupled / Unverified`。
- 对最重要的 1–3 个模块完成 removal drill。

### G. Schema / contract review

- 区分 domain、transport、storage、event、agent/tool、view model 与 eval record。
- 给出具体 contract gap、owner 与 compatibility 方案。

### H. Testing suite map

- 当前覆盖、真实运行结果、关键缺口、flakiness/over-mocking 风险。

### I. Eval matrix proposal

- 场景轴、quality dimensions、grader、threshold、versions、stage 与 E2E coverage。

### J. Open questions

- 只列 `Blocking`、`Material`、`Optional` 的必要问题；附当前证据、默认假设与影响。

### K. Prioritized action plan

每项包含：

- `Finding ID`
- 问题与用户/系统影响
- 证据与验证状态
- 推荐改变
- 最小修复或 structural slice
- owner / dependency
- risk 与 migration/rollback
- 如何用 test 和 eval 证明完成
- 优先级：`P0 / P1 / P2`

### L. Proposed target architecture

- 只提出解决已发现问题所需的最小目标架构。
- 明确哪些可复用、哪些应局部化、哪些应删除。
- 提供 1 条端到端 structural slice，能够同时验证 contract、quality、authority、recovery 与 observability。
- 为方案分配明确 `Proposal ID`。未经我批准该 ID，不进入大规模实现。

---

## 13. 评审失败模式：禁止

- 不得在没有证据时断言 capability 已接入、已上线、已验证或已产生用户价值。
- 不得因为代码文件存在就认为功能可到达，也不得因为 UI 可见就认为后端是真实能力。
- 不得把测试数量或 coverage percentage 当作测试质量。
- 不得把一个 eval 总分当作所有质量维度都达标。
- 不得用 model judge 替代权限、schema、side effect 和 state transition 的确定性测试。
- 不得把 feature flag 当作模块化的充分证据。
- 不得提出“全面重写”而不给 migration、rollback、vertical slice 与验证方法。
- 不得为了整洁直接删除仍有 consumer、公开 contract、历史数据或合规义务的部分。
- 不得只列抽象 best practices；每个重要发现必须落到当前系统的具体位置和最小行动。
- 不得把所有问题都推回给我；先完成可从证据中得到的审查。

最终目标不是让系统看起来更复杂或更“agentic”，而是让它的能力真实、边界清楚、用户 friction 更低、output quality 可持续提高，并且每个环节都能被理解、验证、替换、关闭和安全恢复。
