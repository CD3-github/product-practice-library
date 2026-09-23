# Product Research Workflow

Draft 0.1 · Decision-focused research; cross-product and cross-repository.

## Objective and inputs

Turn uncertainty about users, alternatives, constraints, or feasibility into evidence that supports a concrete decision. Use the current conversation, supplied artifacts, accessible repository, and approved public sources. Recover the decision, population, task, timeframe, maturity, access, privacy, time/cost budget, and output destination before asking questions.

Apply [the task contract](../_shared/task-contract.md). Select `research-plan`, `source-research`, or `synthesis` and complete its deliverable. If the task is to learn how a partially observable product behaves through realistic interaction, route to [Product System Probing](02-product-system-probing.prompt.md) instead of stretching source research into behavioral claims. Default to read-only analysis and report; planning does not authorize participant contact, paid access, private-data upload, product changes, or publishing.

| Mode | Apply | Completion |
|---|---|---|
| `research-plan` | Frame questions, select methods, design sampling/tasks, and define interpretation and stopping rules | A usable research plan with draft session questions or source strategy, expected evidence, assumptions, and access/consent prerequisites |
| `source-research` | Frame, collect authorized sources, synthesize, and recommend | Actual source-linked findings and their limits |
| `synthesis` | Frame the decision, interpret supplied evidence, and recommend | Traceable themes, exceptions, competing explanations, and implications |

These are selectable routes rather than a complete research checklist. Do not add Product System Probing, participant work, product planning, analytics, or testing merely because the method exists. If several methods are materially relevant, label each `use now`, `planned later`, `not applicable`, or `blocked by prerequisite`; otherwise state only the selected route.

For a plan, source inspection is bounded to what changes the method. Participant evidence and findings are future outputs, not entry requirements. For synthesis, missing raw material limits conclusions; analyze available evidence and ask only for the missing material needed for the requested conclusion. Sections below supply methods for the selected mode, not an obligatory collection sequence.

## 1. Frame the uncertainty

Write a short decision brief:

- Who needs to decide what, by when, and what action could change?
- What user job, context, and current alternative matter?
- What is known, assumed, disputed, or inaccessible?
- Which wrong assumption would invalidate the largest amount of downstream work?
- What finding would change the recommendation or justify stopping?

Turn feature requests into investigable questions. Separate reported preferences, observed behavior, feasibility, and value. Rank questions by decision impact, uncertainty, and cost of delay; explain the ranking without invented numerical precision.

## 2. Choose evidence proportionally

| Question | Evidence approach | Claim boundary |
|---|---|---|
| How is the task performed and where does it fail? | Existing interviews, observation, task artifacts, support cases; plan new participant work if needed | Contextual patterns; frequency is limited by sampling |
| What alternatives and constraints exist? | Primary documents, current product behavior, comparable task walkthroughs | Capability under documented or observed conditions |
| How does a partially observable product interpret, decide, retain context, degrade, or cross an integration boundary? | [Product System Probing](02-product-system-probing.prompt.md) through realistic multi-turn trajectories | Observed behavior and bounded inference; internal architecture remains hypothetical until corroborated |
| Where and how often does friction occur? | Validated behavior data, segment analysis, carefully designed surveys | Population/window and sampling limits must be explicit |
| Can the proposed capability work? | Contracts, provider docs, bounded technical spike or eval with approval | Feasibility under tested conditions, not proven demand |
| Did a change cause an outcome? | Route to controlled-experiment or causal-analysis practice | Causal claims require an appropriate identification design |

Use more than one source type when it resolves a material blind spot. Define sample inclusion/exclusion, important segments, accessibility needs, selection bias, and source freshness. Do not prescribe one participant count for every question.

## 3. Collect and preserve evidence

For public research, prefer primary sources and verify current dates, versions, availability, and regional constraints. Keep the exact URL and passage/location supporting each claim. A search snippet is a lead, not verified page content. If a source is inaccessible, label it and pursue safe alternatives.

For provided participant evidence, preserve context, speaker/source ID, session date, consent scope, and exact quote or observation when available. Distinguish what was said from what was observed. Redact unnecessary personal information and respect retention rules. Never generate synthetic participants as evidence of real demand.

For planned sessions, draft neutral prompts about recent real tasks, workarounds, decisions, artifacts, and consequences. Separate interview questions from prototype tasks. Flag recruitment, consent, recording, and participant contact as pending authorization.

For alternative research, compare the same task, input, deliverable, effort, capability limits, and failure states. Record version/date. Label a public feature claim separately from a capability actually exercised.

## 4. Synthesize with traceability

Keep four linked levels:

`Source → observation → interpretation → decision implication`

Use a stable evidence ID for each material finding. Maintain this schema:

| Field | Required meaning |
|---|---|
| Source | URL or artifact location; date/version; method and population |
| Observation | What the evidence directly says or shows |
| Interpretation | What you infer, including alternative explanations |
| Confidence and limits | Coverage, source quality, recency, contradictions, missing evidence |
| Implication | Which option, assumption, scope, or next action changes |

Cluster repeated mechanisms, not merely repeated words. Preserve negative cases, conflicting reports, non-users, abandoned tasks, and segment differences. Do not convert mentions into prevalence without a defensible denominator. Do not convert association, stakeholder opinion, or a competitor feature into proof of value.

## 5. Recommend a next decision

Return the smallest recommendation supported by the evidence: proceed to framing, narrow the audience or job, investigate a high-risk assumption, compare feasible alternatives, or pause the direction. Separate reversible working assumptions from decisions requiring an owner.

Use a stopping rule: stop when the decision-relevant questions have sufficient evidence, when marginal research is unlikely to change the next action, or when the approved budget is exhausted. Budget exhaustion means unresolved uncertainty, not validation.

## Output contract

For `research-plan`, return:

1. Decision, prioritized questions, and what evidence would change the recommendation.
2. Method and sample/source strategy: why each approach fits, inclusion/exclusion, segments, and bias risks.
3. Draft interview/task guide or source-comparison rubric; analysis approach and stopping rules.
4. Execution sequence, resource assumptions, consent/access prerequisites, and genuine current blockers.

For `source-research` or `synthesis`, return:

1. Decision brief and supported recommendation.
2. Findings with evidence IDs, source links, confidence, implications, and conflicting cases.
3. Sampling/access limits, unverified claims, and selected task maps or comparisons.
4. Targeted next questions and actions requiring human judgment or authorization.

Keep the main report short enough to review. Put source excerpts, detailed methods, and secondary comparisons in an appendix. Separate proposed work, performed work, and validated outcomes.

## Handoff and reusable sources

- [General restructuring workflow](../product-ux-rethinking/00-general-product-restructuring-workflow.en.md): source authority, responsibility, risks, and artifact selection.
- [Product System Probing](02-product-system-probing.prompt.md): build and update a behavioral product model through planned, guided, agent-operated, or hybrid interaction.
- [Product framing](../product-ux-rethinking/02-new-feature-product-planning.en.md): move from supported problem to product concepts.
- [Testing & eval](../testing-evaluation-system/README.md): formal performance measurement and benchmarks.
- [Analytics & experiments](../product-analytics-experimentation/README.md): behavior measurement and causal impact.
- [Context update discipline](../context-update-discipline/scope-deletion-and-positive-rewrite.en.md): synthesize feedback into the current intent.
- [GOV.UK research planning](https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service): question-led method and participant planning.

This draft combines the library's evidence discipline with research-planning guidance. Its routing and output usefulness still need validation on real projects.
