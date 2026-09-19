# Testing & Evaluation System

Agent entry point for designing, implementing, or operating a reusable product evidence system.

## Copy to your coding agent

```text
Read https://product-practice-library.vercel.app/prompts/testing-evaluation-system/README.md. Identify this turn's deliverable from our conversation, load only the relevant workflow, and complete it.
Choose source-inspection depth to fit the task. Separate facts, design assumptions, and unverified items. Complete what available context supports; list later implementation or run requirements as execution prerequisites. Ask only about gaps that block this deliverable. Keep all actions within this turn's authorization.
Open the deliverable with a decision overview: recommendation, short bullets for independent reasons, the scope of this round, concrete checks, results needed for the decision, when to wrap up, and consequential deferrals. Include key uncertainty and next action; keep technical detail in the body and estimate effort by component when planning.
Project: [describe the project or problem to solve]
Project context: [repository path, relevant material, or data]
```

中文指令：

```text
读取 https://product-practice-library.vercel.app/prompts/testing-evaluation-system/README.md，结合当前对话识别本轮交付物，按需加载工作流并直接完成。
按任务选择必要的资料检查深度，区分事实、设计假设与待验证项。先完成已有信息支持的部分，将后续实施或运行条件列为执行前提；只询问阻止本轮交付的问题。所有操作遵守本轮授权。
在交付文档开头写决策总览：先给建议，独立理由用短 bullet；说明本轮测什么、具体怎么检查、什么结果支持什么决定，以及何时收尾、哪些留待后续。保留关键不确定性与下一步；技术细节放正文，规划时分项估算工作量。
本轮项目：[填写项目或要解决的问题]
项目上下文：[仓库路径、相关资料或数据]
```

[Practice folder](https://github.com/CD3-github/product-practice-library/tree/main/prompts/testing-evaluation-system) · [Visual guide](testing-evaluation-system.html)

## Start here

Recover relevant context rather than requiring every field:

- the product question or decision;
- the exact repository/worktree and relevant source documents;
- current tests, evals, telemetry, reports, or known gaps;
- product maturity and risk;
- the allowed cost, network, production, and side-effect boundary.

Read [the task contract](../_shared/task-contract.md). Infer the requested deliverable, necessary evidence depth, and permitted actions independently. Load only the selected workflow. For a design, supplied documents and explicit assumptions can be sufficient; code availability and execution permission govern later verification, not whether a proposal can be written.

## Route by intent

| User intent | Load | Authorized outcome |
|---|---|---|
| Understand the method or choose evidence | Relevant sections of [the canonical method](00-testing-evaluation-system.md) | Explanation, decision map, or recommendation |
| Design a strategy, suite, eval matrix, or run plan | [Design workflow](01-design-evidence-system.prompt.md) | Concrete coverage, criteria, architecture, assumptions, and execution prerequisites |
| Audit existing implementation or evidence quality | [Audit workflow](01-audit-existing-system.prompt.md) | Scoped evidence inventory, supported strengths/findings, and minimum remedies |
| Implement an explicitly approved proposal | Approved proposal plus [implementation workflow](02-implement-approved-system.prompt.md) | One bounded, verified structural slice |
| Run an existing suite or eval round | Existing harness, round inputs, and [round workflow](03-run-eval-round.prompt.md) | Reproducible run, automated analysis, triage, human-review queue, and decision record |
| Analyze existing results without rerunning | Analysis sections of [round workflow](03-run-eval-round.prompt.md) | Artifact-based interpretation, validity limits, and next decision |
| Measure user behavior, funnels, cohorts, retention, or causal product impact | [Product Analytics & Experimentation](../product-analytics-experimentation/README.md) | Product-measurement or experiment workflow |

For a mixed request, complete the requested combination and keep current-state findings separate from proposals. These routes are alternatives, not a mandatory sequence. A clear agreed implementation scope is sufficient; a proposal ID is a reference, not a required approval phrase.

## Shared operating rules

1. Start from the decision and uncertainty, then choose the smallest sufficient evidence mix and unit of analysis. Reading a method does not make it required: include it only when its result could change the decision or address a material risk. Reuse sound existing evidence; expand coverage when a gap, uncertainty, or risk justifies the added cost.
2. Verify the sources needed for each factual claim; label proposed contracts and assumptions separately. Runtime claims require runtime evidence.
3. Keep rule-check results, quality judgments, comparison evidence, production observations and causal estimates identifiable. Preserve the criterion, grader and uncertainty for each.
4. Preserve provenance, versions, raw artifacts, and append-only decision history.
5. In execution mode, analyze authorized results before escalating targeted cases. In planning mode, define that analysis and escalation process.
6. Keep proposals, implementation evidence, live verification, and human acceptance separate.
7. Use links to exact artifacts and files in the handoff.
8. Present deliverables using the decision-first structure below. Keep technical detail traceable and accessible behind the overview.

## Decision-ready deliverables

For a substantial document, open the artifact itself with **0. Decision overview / 决策总览**. A reader should be able to choose the next action from this section alone. Synthesize the work; a list of section contents or completed activities is not the overview.

- **Recommendation and reasons:** lead with what to do next. Put independent reasons in short bullets, each connecting a concrete issue or finding to why it changes this decision. In a plan, these are proposed choices; in an audit or run, distinguish observed results from recommendations.
- **What to assess and how:** state the actual system boundary. For multiple questions, use a compact table: **Question to answer → How to check → What result meets the criterion → Decision supported**. Describe the check as a concrete action on an object or input, followed by what to observe; add the test/eval method or comparator where it helps. In a measured report, show actual results and limits instead of proposed expectations. Mention the analysis unit only where it changes interpretation, explaining what is counted or compared; keep its formal definition in the technical matrix. A single question can use a short paragraph instead.
- **Confidence and trade-off:** surface the few limitations, risks, or alternatives that could change the recommendation. Preserve source status here: a documented defect is not a reproduced failure; a proposed threshold is not a validated standard.
- **Action for the reader:** state the specific choice, recommended default and consequence, if a choice is needed now. Otherwise give the next step without inventing an approval request. Separate later execution requirements from blockers to this deliverable.

For a bounded plan, make the current version or acceptance scope, sufficient-evidence stopping point, and consequential deferrals visible in the overview. Estimate setup, automated execution and human review separately in the body. With no supplied version scope, propose a limited round and its claim boundary. Use the design workflow's [scoping guidance](references/bounded-round-design.md); a budget stop records incomplete evidence rather than changing the acceptance standard.

Keep this opening to one short reading pass. Combine headings or rows when helpful; its purpose is decision support, not completing a fixed form. Put exact commands, source inventories, case IDs, schemas, exhaustive prerequisites, and detailed scoring rules in linked body sections or appendices. Keep any material safety or evidence limitation visible in the overview, expressed through its consequence for the decision. Preserve a usable overview in plain Markdown; use collapsible detail only when the renderer supports it.

### Explain enough to make a decision

State the conclusion or relationship before naming its mechanisms. In section 0, describe observable behavior in ordinary language rather than compressing a technical requirement into a new label. Give enough procedural detail to picture the check: what is supplied or changed, what is observed, and why that result matters. A method name alone, such as “contract tests” or “paired eval,” is not the procedure. Keep exact technical names, scenario axes, units, contracts and scoring detail in the body, with a brief explanation at first consequential use. Separate the purpose of a dimension from examples within it.

Use an example only when it resolves a specific ambiguity. Introduce what it illustrates, distinguish a sourced case from a hypothetical illustration, and connect it back to the decision. An example is optional, not a required opening for every section. Write naturally in the requested language while preserving useful technical terms; translation alone does not replace explanation.

Write the overview so a teammate with basic technical knowledge can understand what is assessed, how, against what when relevant, why it matters, and what the result would change. Preserve the evidence strength of each source in summary claims. Section openings establish their purpose before details or examples. State delivery status and operation limits once where relevant; use scope descriptions for the system being assessed, rather than repeating the document's title or task type.

The accompanying chat reply should link the artifact, state the main recommendation or result, and mention the next human decision or material limitation when applicable. Keep it shorter than the overview; the file remains self-contained.

## Source map

- [Browsable visual index](testing-evaluation-system.html)
- [Canonical method and artifact schemas](00-testing-evaluation-system.md)
- [Design an evidence system](01-design-evidence-system.prompt.md)
- [Audit existing evidence](01-audit-existing-system.prompt.md)
- [Approved implementation workflow](02-implement-approved-system.prompt.md)
- [Run one evidence round](03-run-eval-round.prompt.md)

This folder is a reusable **practice module**. It can later receive a thin `SKILL.md` adapter for automatic host discovery without changing the canonical method or workflows.
