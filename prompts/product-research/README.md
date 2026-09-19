# Product Research

Draft 0.1 · Agent entry for decision-focused discovery, source research, and evidence synthesis.

[Visual guide](product-research.html) · [GitHub repo](https://github.com/CD3-github/product-practice-library/tree/main/prompts/product-research)

## Start

Apply [the task contract](../_shared/task-contract.md). Recover the decision, users, uncertainty, sources, and authorization from context. For a research plan, deliver the method and sample strategy using explicit assumptions; completed research or participant access is not a prerequisite. For findings, cite actual evidence and its limits. Use the user's preferred language.

Read [the research workflow](01-product-research.prompt.md) completely. Select the applicable mode; load adjacent modules only when the immediate decision requires them.

| Intent | Mode / next route | Return |
|---|---|---|
| Decide what to learn next | `research-plan` | Prioritized questions, method, sample/access plan, stopping rule |
| Investigate sources, alternatives, or constraints | `source-research` | Source ledger, comparable findings, contradictions, limits |
| Interpret existing interviews or observations | `synthesis` | Evidence-linked themes, exceptions, hypotheses, implications |
| Define what to build | [Product framing](../product-ux-rethinking/README.md) | Product concepts and a bounded proposal |
| Measure behavior or causal impact | [Analytics & experiments](../product-analytics-experimentation/README.md) | Measurement or experiment workflow |
| Compare implementation performance | [Testing & eval](../testing-evaluation-system/README.md) | Cases, graders, and fair comparison |

## Execution boundary

Default to read-only research and a report. Draft a plan for participant work unless recruitment and contact are explicitly authorized. Never fabricate interviews, users, quotes, field observations, or unavailable source content. Public research does not authorize uploading private context or transcripts to external services. Follow the authorized file-output boundary; implementation, outreach, purchases, and publishing require their own authorization.

## Copy instruction

```text
Read https://product-practice-library.vercel.app/prompts/product-research/README.md. Identify this turn's deliverable from our conversation, load only the relevant workflow, and complete it.
Choose source-inspection depth to fit the task. Separate facts, design assumptions, and unverified items. Complete what available context supports; list later implementation or run requirements as execution prerequisites. Ask only about gaps that block this deliverable. Keep all actions within this turn's authorization.
Project: [describe the project or problem to solve]
Project context: [repository path, relevant material, or data]
```

```text
读取 https://product-practice-library.vercel.app/prompts/product-research/README.md，结合当前对话识别本轮交付物，按需加载工作流并直接完成。
按任务选择必要的资料检查深度，区分事实、设计假设与待验证项。先完成已有信息支持的部分，将后续实施或运行条件列为执行前提；只询问阻止本轮交付的问题。所有操作遵守本轮授权。
本轮项目：[填写项目或要解决的问题]
项目上下文：[仓库路径、相关资料或数据]
```
