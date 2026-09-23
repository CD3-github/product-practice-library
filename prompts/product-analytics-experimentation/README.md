# Product Analytics & Experimentation

Agent entry point for measuring product behavior, diagnosing friction, and estimating the causal impact of product changes.

## Copy to your coding agent

```text
Read https://product-practice-library.vercel.app/prompts/product-analytics-experimentation/README.md. Identify this turn's deliverable from our conversation, load only the relevant workflow, and complete it.
Follow the user's current language and established preferences.
Choose source-inspection depth to fit the task. Separate facts, design assumptions, and unverified items. Complete what available context supports; list later implementation or run requirements as execution prerequisites. Ask only about gaps that block this deliverable. Keep all actions within this turn's authorization.
Project: [describe the project or problem to solve]
Project context: [repository path, relevant material, or data]
```

中文指令：

```text
读取 https://product-practice-library.vercel.app/prompts/product-analytics-experimentation/README.md，结合当前对话识别本轮交付物，按需加载工作流并直接完成。
跟随用户当前的语言与既有偏好。
按任务选择必要的资料检查深度，区分事实、设计假设与待验证项。先完成已有信息支持的部分，将后续实施或运行条件列为执行前提；只询问阻止本轮交付的问题。所有操作遵守本轮授权。
本轮项目：[填写项目或要解决的问题]
项目上下文：[仓库路径、相关资料或数据]
```

[Practice folder](https://github.com/CD3-github/product-practice-library/tree/main/prompts/product-analytics-experimentation) · [Visual guide](product-analytics-experimentation.html)

## Start here

Recover relevant context; these are optional inputs according to the task:

- the product decision or question;
- the user/account unit and relevant lifecycle stage;
- the repository, data source, analytics workspace, or exported dataset;
- current event, identity, metric, cohort, and exposure definitions;
- privacy, access, runtime, and mutation boundaries.

Apply [the task contract](../_shared/task-contract.md). Select by requested deliverable, then choose evidence depth and permitted actions. Designs use available context and explicit assumptions; current-state audits and result interpretation require corresponding evidence. Complete supported work and distinguish later execution prerequisites from current blockers.

## Route by intent

| User intent | Mode | Required output |
|---|---|---|
| Define product measurement | `measurement-design` | Question map, proposed event/identity/metric contracts, and validation plan |
| Audit existing product measurement | `measurement-audit` | Evidence-linked instrumentation/data findings, coverage limits, and remedies |
| Understand adoption, funnels, retention, cohorts, or friction | `behavior-analysis` | Reproducible analysis, segments, uncertainty, likely explanations, and next investigation |
| Decide whether and how to run an experiment | `experiment-design` | Hypothesis, eligibility, unit, variants, metrics, power assumptions, guardrails, and decision rule |
| Interpret an experiment that has already run | `experiment-analysis` | Validity checks, effect estimates, uncertainty, segment policy, guardrails, and bounded decision |

Use [the product-evidence workflow](01-product-evidence-workflow.prompt.md) with the selected mode. Load relevant sections of [the canonical method](00-product-analytics-experimentation.md) only when definitions, contracts, or analysis rules are needed.

Questions about model/output quality, deterministic correctness, graders, golden sets, or release-quality gates route to [Testing & Evaluation System](../testing-evaluation-system/README.md). Mixed AI-product decisions may require both practices while keeping their claim types separate.

## Shared operating rules

1. Start from the decision, population, unit, time window, and action the evidence may change.
2. Verify identity, event, exposure, metric, and version semantics before interpreting movement.
3. Separate observation, diagnosis, prediction, and causal attribution.
4. Preserve reproducible queries, data windows, exclusions, versions, and decision records.
5. Automate validity checks and first-pass analysis; escalate ambiguous interpretation and consequential decisions.
6. Report practical significance, uncertainty, guardrails, and heterogeneous effects—not only a top-line average.
7. Link every chart, query, dataset, or experiment record used in the conclusion.

## Source map

- [Browsable visual index](product-analytics-experimentation.html)
- [Canonical method and contracts](00-product-analytics-experimentation.md)
- [Product-evidence workflow](01-product-evidence-workflow.prompt.md)
- [Testing & Evaluation System](../testing-evaluation-system/README.md)

This folder is a reusable **practice module**. A thin `SKILL.md` adapter can later make it automatically discoverable by an agent host.
