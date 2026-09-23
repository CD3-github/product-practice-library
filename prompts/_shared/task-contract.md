# Task contract

Use this contract when selecting a practice workflow. Read the current request and conversation first; infer the following rather than asking the user to fill out a form.

## Select the deliverable, evidence depth, and authority independently

| Deliverable | Evidence needed | Completion |
|---|---|---|
| Explanation or recommendation | Relevant context and authoritative references | Answer the question and explain the consequential trade-offs |
| Plan or design | Supplied intent and constraints; bounded source inspection when it changes the design | Deliver the actual proposed design, acceptance criteria, assumptions, and execution prerequisites |
| Audit or readiness review | Scoped implementation, data, or runtime evidence supporting current-state claims | Evidence-linked findings, strengths, limitations, and minimum remedies |
| Implementation | Agreed scope, relevant current interfaces, and authorization to edit | Scoped changes with proportionate verification and an honest handoff |
| Run or results analysis | For a run: usable harness/data and execution permission. For analysis: sufficient existing results | Reproducible evidence or analysis, limitations, and a supported next decision |

These are selectable routes, not mandatory stages. A request may combine them explicitly; complete the requested combination without promoting it into broader work. A clear user-approved scope is sufficient authority for that scope; proposal IDs help traceability but are not a required approval phrase.

## Inspect proportionally

For a plan, use the available brief, documents, examples, and constraints to construct the proposal. Inspect supplied repository entry points only where compatibility or feasibility affects that proposal. End discovery when additional searching would not change the design; record unresolved implementation details as `unverified` or parameters to confirm. A complete repository audit is a separate deliverable.

For an audit, substantiate current-state claims with exact source locations. Missing access limits the audit conclusion; it does not prove absence or failure. Code inspection establishes implementation evidence, not runtime behavior. Record any checks actually performed and their scope. A clean worktree does not establish the absence of concurrent work.

For implementation or execution, confirm relevant interfaces, environment, command side effects, and permissions before acting. A test command may use network, paid APIs, or persistent state; its name alone does not establish safety. Honor explicit limits such as “plan only” or “do not run tests.”

## Handle uncertainty at the right stage

- **Known fact:** cite the source that supports the claim and its verification level.
- **Design assumption:** state a reasonable default, its consequence, and how to validate it.
- **Execution prerequisite:** identify what must be available before a later implementation or run, while completing the current design.
- **Current blocker:** ask only when a missing choice, resource, or permission prevents the requested deliverable itself. Explain the affected part and complete independent parts first.

Return the requested artifact now. A design includes concrete coverage, contracts, criteria, or flows appropriate to its topic—not just a schedule for producing those later. Give targeted questions with a recommended default where safe. Link existing evidence; label proposed paths, commands, schemas, and thresholds as proposed. Preserve real safety and authorization boundaries.

## Decision-ready writing

Follow the user's current language and established preferences.

Open a substantial deliverable with a short recommendation, the concrete reasons that change the decision, material uncertainty, and the next action. Write this opening for a teammate with basic subject knowledge; retain technical precision in the body. Explain behavior with an actor or system, an action, and an observable result. Use established terms when useful, with a brief explanation at first consequential use; avoid inventing compressed labels that force the reader to decode the proposal.

Separate the question being answered, the procedure, and the result that would support a decision. Mention a measurement unit when it changes interpretation; put formal unit definitions, schemas, exact identifiers and complete procedures in the relevant technical section. A short overview should summarize the reasoning, not merely shorten each technical section or repeat the task title. Examples clarify an established point and remain distinguishable from source evidence.

- **Establish the relationship first:** introduce what a section helps the reader decide and how its concepts connect to the surrounding framework. Then explain the terms or mechanisms needed for that decision.
- **Make independent points scannable:** use short, labeled bullets for distinct reasons or choices, a table for repeated comparisons, and numbered steps for an actual sequence. Keep the main label separate from its supporting explanation.
- **Present the settled model:** write for a reader without the conversation history. Preserve genuine risks, evidence limits and authority boundaries; leave feedback rebuttals and correction history out of the guidance.
- **Keep terminology recognizable:** in Chinese, pair important terms directly when useful, such as `评估 eval` or `方案比较 benchmark`. Expand unfamiliar acronyms at first use, followed by the acronym in parentheses. Ordinary navigation labels do not need English translations.

## 简中摘要

分别判断本轮交付物、所需证据深度与操作权限。规划直接交付具体方案，按需核对资料；审计用证据支持现状结论；实施和运行遵守授权。已知事实、设计假设、后续执行前提与本轮阻塞分开表达。缺少代码或运行权限可能限制现状判断或后续执行，但不自动阻止规划。只加载当前任务相关的方法，先完成已有信息能够支持的部分。

写作先说明各概念如何帮助当前决定，再展开机制；独立理由用带标签的短条目，重复比较用表格。总览面向只有基础知识的读者，技术细节放在正文，呈现不依赖对话历史的完整结论。
