# Product Research

Draft 0.2 · Agent entry for decision-focused discovery, source research, product-system probing, and evidence synthesis.

[Visual guide](product-research.html) · [GitHub repo](https://github.com/CD3-github/product-practice-library/tree/main/prompts/product-research)

## Start

Apply [the task contract](../_shared/task-contract.md). Follow the user's current language and established preferences. Recover the decision, users, uncertainty, sources, and authorization from context. For a research plan, deliver the method and sample strategy using explicit assumptions; completed research or participant access is not a prerequisite. For findings, cite actual evidence and its limits.

Select the smallest workflow that can resolve the decision-relevant uncertainty:

- Read [the research workflow](01-product-research.prompt.md) for `research-plan`, `source-research`, or `synthesis`.
- Read [the Product System Probing workflow](02-product-system-probing.prompt.md) when the task is to learn how a partially observable product behaves through realistic interaction.
- Read both only when the request genuinely combines broader research with behavioral probing. Reading a workflow does not make every method or execution mode applicable.

| Intent | Mode / next route | Return |
|---|---|---|
| Decide what to learn next | `research-plan` | Prioritized questions, method, sample/access plan, stopping rule |
| Investigate sources, alternatives, or constraints | `source-research` | Source ledger, comparable findings, contradictions, limits |
| Understand how an existing product behaves without full internal access | [`system-probing`](02-product-system-probing.prompt.md) | Evidence-linked behavioral product model, boundaries, next probe |
| Interpret existing interviews or observations | `synthesis` | Evidence-linked themes, exceptions, hypotheses, implications |
| Define what to build | [Product framing](../product-ux-rethinking/README.md) | Product concepts and a bounded proposal |
| Measure behavior or causal impact | [Analytics & experiments](../product-analytics-experimentation/README.md) | Measurement or experiment workflow |
| Compare implementation performance | [Testing & eval](../testing-evaluation-system/README.md) | Cases, graders, and fair comparison |

## Execution boundary

Default to read-only research and a report. Draft a plan for participant work unless recruitment and contact are explicitly authorized. Never fabricate interviews, users, quotes, field observations, product interactions, or unavailable source content. Public research does not authorize uploading private context or transcripts to external services.

When Product System Probing execution is requested, the agent may use available browser or computer-use tools within the named target and authorized research scope. Default to an isolated or test environment and non-destructive interaction. Login, multi-factor authentication, CAPTCHA, consent, payment, external communication, account connection, and state-changing actions remain explicit human or authorization checkpoints. Tool success is not product evidence; record the actual observable behavior. Follow the authorized file-output boundary; implementation, outreach, purchases, publishing, and product/account changes require their own authorization.

## Copy instruction

```text
Read https://product-practice-library.vercel.app/prompts/product-research/README.md. Identify this turn's deliverable from our conversation, load only the relevant workflow, and complete it.
Follow the user's current language and established preferences.
Available routes: research-plan for a concrete research design; source-research for sources and alternatives; system-probing for a behavioral product model built through realistic interaction; synthesis for supplied evidence. Select only the route or explicit combination needed for the current decision; these are not mandatory stages.
Choose source-inspection depth to fit the task. Separate facts, design assumptions, and unverified items. Complete what available context supports; list later implementation or run requirements as execution prerequisites. Ask only about gaps that block this deliverable. Keep all actions within this turn's authorization.
Project: [describe the project or problem to solve]
Project context: [repository path, relevant material, or data]
```

```text
读取 https://product-practice-library.vercel.app/prompts/product-research/README.md，结合当前对话识别本轮交付物，按需加载工作流并直接完成。
跟随用户当前的语言与既有偏好。
可选路径：research-plan 规划研究；source-research 调查来源与替代方案；system-probing 通过真实交互建立产品行为模型；synthesis 归纳已有证据。只选择当前决策需要的路径，可以明确组合，但不要把所有方式当作必经步骤。
按任务选择必要的资料检查深度，区分事实、设计假设与待验证项。先完成已有信息支持的部分，将后续实施或运行条件列为执行前提；只询问阻止本轮交付的问题。所有操作遵守本轮授权。
本轮项目：[填写项目或要解决的问题]
项目上下文：[仓库路径、相关资料或数据]
```
