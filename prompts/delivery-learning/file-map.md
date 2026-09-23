# 交付与复盘 / Delivery and learning — file map

Human reference, not an additional agent instruction. Generated from current routing declarations with `scripts/sync-module-maps.mjs`. The README and workflows remain authoritative.

[GitHub folder](https://github.com/CD3-github/product-practice-library/tree/main/prompts/delivery-learning) · [Visual guide](delivery-learning.html#files)

一个文件包含切片规划、获批实施、就绪审查和学习复盘；只执行本轮要求且获授权的模式。

One file contains slice planning, approved implementation, readiness review and learning review. Apply only the requested mode within its authority.

实线：入口和工作流选择；虚线：按需参考。多条分支表示选项，并非全部必读。

Solid edges: entry and workflow selection. Dotted edges: conditional references. Branches are choices, not an instruction to read everything.

```mermaid
flowchart TD
  H["delivery-learning.html<br/>人的浏览入口 / Human index"]
  E["README.md · 识别本轮任务 / Select task"]
  H -. "复制指令 / Copy instruction" .-> E
  Q0["任务与操作边界 / Task and authority<br/>../_shared/task-contract.md"]
  E --> Q0
  S{"按任务选择 / Choose for this task"}
  Q0 --> S
  W0["交付工作流 / Delivery workflow<br/>01-delivery-learning.prompt.md"]
  S --> W0
  O["相关细节需要时 / Only when needed"]
  W0 -.-> O
  R0["AI 系统实现审查 / AI implementation audit<br/>../ai-system-implementation-audit/README.md"]
  O -.-> R0
  R1["测试与评估 / Testing and eval<br/>../testing-evaluation-system/README.md"]
  O -.-> R1
  R2["产品分析与实验 / Analytics and experiments<br/>../product-analytics-experimentation/README.md"]
  O -.-> R2
  R3["通用重构方法 / Shared restructuring method<br/>../product-ux-rethinking/00-general-product-restructuring-workflow.en.md"]
  O -.-> R3
  R4["上下文更新规范 / Context update discipline<br/>../context-update-discipline/README.md"]
  O -.-> R4
```

## Files and purpose / 文件与用途

| File | When to read |
|---|---|
| [../_shared/task-contract.md](../_shared/task-contract.md) | 分别判断交付物、所需证据与允许的操作。 Separate the deliverable, evidence needed, and permitted actions. |
| [01-delivery-learning.prompt.md](01-delivery-learning.prompt.md) | 根据已确定范围和本轮目标选择模式。 Choose the mode from the agreed scope and requested outcome. |
| [../ai-system-implementation-audit/README.md](../ai-system-implementation-audit/README.md) | 接入、harness 或契约存在关键不确定性时读取。 For material wiring, harness or contract uncertainty. |
| [../testing-evaluation-system/README.md](../testing-evaluation-system/README.md) | 需要具体质量、可靠性或对照衡量方案时读取。 For concrete quality, reliability or comparative measurement. |
| [../product-analytics-experimentation/README.md](../product-analytics-experimentation/README.md) | 涉及用户行为或因果影响时读取。 For behavior or causal-impact questions. |
| [../product-ux-rethinking/00-general-product-restructuring-workflow.en.md](../product-ux-rethinking/00-general-product-restructuring-workflow.en.md) · [简中](../product-ux-rethinking/00-general-product-restructuring-workflow.zh-CN.md) | 需要深入处理证据、责任或结构问题时读取。 For deeper evidence, responsibility or structural questions. |
| [../context-update-discipline/README.md](../context-update-discipline/README.md) | 反馈改变当前范围或意图时读取。 When feedback changes the current scope or intent. |

## Discovery and execution / 发现与执行

This module currently uses an explicit README entry, not an installed `SKILL.md`. Routing is guidance followed by an agent, not a deterministic dispatcher or access boundary. Reading a reference does not authorize actions or make every method applicable. HTML is a human index; this diagram is not a trace of files actually read.

当前由 README 显式进入，尚非已安装的 skill。路由是 Agent 遵循的指引，并非固定程序或权限边界。读取不等于获得执行授权，也不表示所有方法都适用。HTML 是给人阅读的索引，图并非本次真实读取记录。

[Official skill documentation](https://learn.chatgpt.com/docs/build-skills)
