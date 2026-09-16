# Testing & Evaluation System

Agent entry point for designing, implementing, or operating a reusable product evidence system.

## Copy to your coding agent

```text
Read https://product-practice-library.vercel.app/prompts/testing-evaluation-system/README.md and follow its links to load the workflow needed for this task.
My task: [describe the problem to solve]
Project context: [repository path, relevant material, or data]
Select the appropriate workflow, work within the authorized scope, and return result analysis, evidence links, and decisions that need my judgment.
```

中文指令：

```text
读取 https://product-practice-library.vercel.app/prompts/testing-evaluation-system/README.md，并按其中链接读取当前任务需要的工作流。
我的任务：[写下要解决的问题]
项目上下文：[仓库路径、相关资料或数据]
根据任务选择合适路径，在已授权范围内开展工作；返回结果分析、证据链接，以及需要我判断的事项。
```

[Practice folder](https://github.com/CD3-github/product-practice-library/tree/main/prompts/testing-evaluation-system) · [Visual guide](testing-evaluation-system.html)

## Start here

Provide:

- the product question or decision;
- the exact repository/worktree and relevant source documents;
- current tests, evals, telemetry, reports, or known gaps;
- product maturity and risk;
- the allowed cost, network, production, and side-effect boundary.

Inspect available context before asking for missing inputs. Route the task automatically using the table below; do not ask the user to assemble a file packet.

## Route by intent

| User intent | Load | Authorized outcome |
|---|---|---|
| Understand the method or choose evidence | Relevant sections of [the canonical method](00-testing-evaluation-system.md) | Explanation, decision map, or recommendation |
| Review an existing product or design its evidence system | [Design or audit workflow](01-design-or-audit.prompt.md); consult the canonical method only for definitions or schemas needed by the task | Read-only evidence map, findings, and proposed design |
| Implement an explicitly approved proposal | Approved proposal plus [implementation workflow](02-implement-approved-system.prompt.md) | One bounded, verified structural slice |
| Run an existing suite or eval round | Existing harness, round inputs, and [round workflow](03-run-eval-round.prompt.md) | Reproducible run, automated analysis, triage, human-review queue, and decision record |
| Measure user behavior, funnels, cohorts, retention, or causal product impact | [Product Analytics & Experimentation](../product-analytics-experimentation/README.md) | Product-measurement or experiment workflow |

For a mixed request, select the smallest route that can support the immediate decision. Finish a read-only design before requesting implementation approval; do not silently advance into a higher-authority mode.

## Shared operating rules

1. Start from the decision and uncertainty, then choose the evidence mix and unit of analysis.
2. Verify repository truth, runtime state, existing evidence, and permissions before making claims.
3. Distinguish deterministic correctness, judged quality, comparison, production observation, and causal evidence.
4. Preserve provenance, versions, raw artifacts, and append-only decision history.
5. Run and analyze all authorized automation before escalating targeted cases to people.
6. Keep proposals, implementation evidence, live verification, and human acceptance separate.
7. Use links to exact artifacts and files in the handoff.
8. In human-facing explanations, start with the question, how the concepts connect, and one concrete example. Define unfamiliar terms at first use and place detailed implementation rules in linked references or expandable sections when supported.

## Source map

- [Browsable visual index](testing-evaluation-system.html)
- [Canonical method and artifact schemas](00-testing-evaluation-system.md)
- [Design or audit workflow](01-design-or-audit.prompt.md)
- [Approved implementation workflow](02-implement-approved-system.prompt.md)
- [Run one evidence round](03-run-eval-round.prompt.md)

This folder is a reusable **practice module**. It can later receive a thin `SKILL.md` adapter for automatic host discovery without changing the canonical method or workflows.
