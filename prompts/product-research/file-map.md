# 产品研究 / Product research — file map

Human reference, not an additional agent instruction. Generated from current routing declarations with `scripts/sync-module-maps.mjs`. The README and workflows remain authoritative.

[GitHub folder](https://github.com/CD3-github/product-practice-library/tree/main/prompts/product-research) · [Visual guide](product-research.html#files)

三个模式位于同一个工作流文件中：读取该文件，再执行与任务相关的模式。

One workflow file contains three modes. Read it, then apply the mode relevant to the request.

实线：入口和工作流选择；虚线：按需参考。多条分支表示选项，并非全部必读。

Solid edges: entry and workflow selection. Dotted edges: conditional references. Branches are choices, not an instruction to read everything.

```mermaid
flowchart TD
  H["product-research.html<br/>人的浏览入口 / Human index"]
  E["README.md · 识别本轮任务 / Select task"]
  H -. "复制指令 / Copy instruction" .-> E
  Q0["任务与操作边界 / Task and authority<br/>../_shared/task-contract.md"]
  E --> Q0
  S{"按任务选择 / Choose for this task"}
  Q0 --> S
  W0["研究工作流 / Research workflow<br/>01-product-research.prompt.md"]
  S --> W0
  O["相关细节需要时 / Only when needed"]
  W0 -.-> O
  R0["通用重构方法 / Shared restructuring method<br/>../product-ux-rethinking/00-general-product-restructuring-workflow.en.md"]
  O -.-> R0
  R1["产品定义 / Product framing<br/>../product-ux-rethinking/README.md"]
  O -.-> R1
  R2["测试与评估 / Testing and eval<br/>../testing-evaluation-system/README.md"]
  O -.-> R2
  R3["产品分析与实验 / Analytics and experiments<br/>../product-analytics-experimentation/README.md"]
  O -.-> R3
  R4["上下文更新规范 / Context update discipline<br/>../context-update-discipline/README.md"]
  O -.-> R4
```

## Files and purpose / 文件与用途

| File | When to read |
|---|---|
| [../_shared/task-contract.md](../_shared/task-contract.md) | 分别判断交付物、所需证据与允许的操作。 Separate the deliverable, evidence needed, and permitted actions. |
| [01-product-research.prompt.md](01-product-research.prompt.md) | 选择研究规划、来源检索或已有证据归纳。 Select research planning, source research, or synthesis of supplied evidence. |
| [../product-ux-rethinking/00-general-product-restructuring-workflow.en.md](../product-ux-rethinking/00-general-product-restructuring-workflow.en.md) · [简中](../product-ux-rethinking/00-general-product-restructuring-workflow.zh-CN.md) | 需要深入处理证据、责任或结构问题时读取。 For deeper evidence, responsibility or structural questions. |
| [../product-ux-rethinking/README.md](../product-ux-rethinking/README.md) | 研究结论需要转成产品方案时读取。 When findings are ready to inform what to build. |
| [../testing-evaluation-system/README.md](../testing-evaluation-system/README.md) | 需要具体质量、可靠性或对照衡量方案时读取。 For concrete quality, reliability or comparative measurement. |
| [../product-analytics-experimentation/README.md](../product-analytics-experimentation/README.md) | 涉及用户行为或因果影响时读取。 For behavior or causal-impact questions. |
| [../context-update-discipline/README.md](../context-update-discipline/README.md) | 反馈改变当前范围或意图时读取。 When feedback changes the current scope or intent. |

## Discovery and execution / 发现与执行

This module currently uses an explicit README entry, not an installed `SKILL.md`. Routing is guidance followed by an agent, not a deterministic dispatcher or access boundary. Reading a reference does not authorize actions or make every method applicable. HTML is a human index; this diagram is not a trace of files actually read.

当前由 README 显式进入，尚非已安装的 skill。路由是 Agent 遵循的指引，并非固定程序或权限边界。读取不等于获得执行授权，也不表示所有方法都适用。HTML 是给人阅读的索引，图并非本次真实读取记录。

[Official skill documentation](https://learn.chatgpt.com/docs/build-skills)
