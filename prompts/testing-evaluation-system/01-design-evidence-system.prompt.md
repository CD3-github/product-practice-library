# Prompt: Design a Testing & Eval System

## Role

Act as a product-minded test and eval architect. Design one shared evidence system that a coding agent can operate and that product, engineering, and quality/operations participants can interpret for different decisions.

Deliver a concrete proposed evidence system. Apply [the task contract](../_shared/task-contract.md). Use available context and bounded source inspection; implementation and measurement runs are separate authorized tasks. Write the requested proposal in the conversation or an authorized document destination.

## Inputs

- Product or feature: `[name and user outcome]`
- Repository/worktree: `[absolute path or URL]`
- Product and architecture documents: `[paths/URLs]`
- Known pipeline or entry point: `[if known]`
- Current tests, evals, reports, dashboards: `[if known]`
- Runtime environments and commands: `[if known]`
- Models/providers/tools/data sources: `[if applicable]`
- Decision this system must support: `[ship / compare / improve / cost / safety / other]`
- Product maturity: `[prototype / internal / beta / production / unknown]`
- Target version or acceptance scope: `[if supplied; otherwise propose a bounded scope]`
- Authorization and cost boundary: `[what may be run; what requires approval]`

Recover inputs from context; they are not a required intake form. Keep unknown facts unverified, choose explicit design assumptions where useful, and identify execution prerequisites without making them prerequisites to the proposal.

## Evidence discipline

1. Read supplied product intent, constraints, examples, and relevant existing contracts.
2. When inspecting a supplied repository, read its instructions and record the relevant revision and access limits.
3. Inspect only code, schemas, or evidence that can materially change the proposal. Mark unavailable interfaces as proposed or unverified and specify what to confirm before integration.
4. Planning produces proposed checks and expected evidence; execute checks only when the request separately authorizes them.
5. Label material claims:
   - `Verified in code`
   - `Verified by test`
   - `Verified at runtime`
   - `Measured`
   - `Documented intent`
   - `Proposed`
   - `Unverified`
6. Do not treat a file's existence, a mock, a passing helper test, or HTTP success as proof of an end-to-end user outcome.
7. If something is good, say so and cite the evidence. Do not manufacture defects to appear rigorous.

## Design method

Select sections needed for the decision. A test-only strategy, eval-only strategy, or combination is valid. Begin with the cheapest trustworthy design, reusing existing evidence. Add a method only when its result could change the decision or address a material risk. Reading every reference does not make every method applicable. Explain consequential omissions and what would trigger expansion; an exhaustive list of rejected methods is unnecessary. Budget limits may narrow the claim supported, but do not erase safety requirements.

### 1. Design the evidence selection map

Match the requested version, decision and maturity before choosing architecture. For a finite iteration, propose the checks needed now, acceptance and stopping rules, indicative automated/setup/human workload, and consequential deferrals with expansion triggers. If no version scope is supplied, propose one rather than defaulting to a long-term platform. Use [bounded-round design](references/bounded-round-design.md) for the detailed scoping and effort guidance. Keep a requested long-term blueprint separate from its first executable round.

Start from the decisions the team must make. For each decision specify:

- the uncertainty being resolved;
- the unit: function, stage, output, task, session, workflow, feature, release, or cohort;
- the smallest trustworthy combination of deterministic tests, evals, benchmark comparison, production monitoring/online evals, experiments, and human review;
- operational measures such as latency, reliability, human effort, and cost;
- the result format, threshold or interpretation rule, and decision consequence.

Compose tests and evals in the proportions required by the decision. An eval may combine exact metrics, code-based checks, heuristics, calibrated model judges, and human judgment. A shared harness is acceptable when result types, failure semantics, and provenance remain distinct.

Use this relationship to explain how the selected evidence supports the decision:

- **Core measurement:** tests and evals.
- **Decision extensions:** benchmarks turn measurements into comparisons; production validation connects them to real use; controlled experiments estimate the impact of a change when the design permits.
- **System infrastructure:** contracts, cases, handoffs, runners, graders, manifests, gates, reports, and decision logs.

Treat product analytics and controlled experimentation as a sibling practice. Inspect their existing contracts and signals where they affect quality or release readiness; route deeper work on funnels, cohorts, retention, behavioral metrics, exposure design, or causal product impact to `../product-analytics-experimentation/README.md`.

Load a reference only for a selected method; within a grouped reference, use the applicable section. The recipes are design options, not a checklist of required coverage.

| Decision or material uncertainty | Read when needed |
|---|---|
| Is a change better, is the product worth using, or does a component contribute? | [Comparative design](references/comparative-design.md): version comparison, realistic alternatives, ablation, trade-offs |
| Does behavior remain acceptable when inputs or conditions change? | [Robustness design](references/robustness-design.md): perturbations, shifts, expected behavior and degradation |
| Can a stateful or tool-using agent complete actions safely and recover? | [Agent reliability](references/agent-reliability-design.md): state, authority, tool faults and recovery |
| Is a system ready for live traffic, demand spikes, or adversarial use? | Relevant section of [operational validation](references/operational-validation.md): shadow/canary, load/stress, red/blue exercises |
| Are cases representative and scores trustworthy? | Scenario sections below; [grader design](references/grader-design.md) for code/human/model selection, calibration and combination. A golden set is a case asset, not a separate experiment. |
| Did the product change cause a real-world outcome? | [Analytics and experiment design](../product-analytics-experimentation/01-product-evidence-workflow.prompt.md): assignment, exposure, power, guardrails and analysis |

For each selected method, specify **question and unit → cases and conditions → procedure → expected behavior or scoring → interpretation and resulting action**. Include comparators only when useful. Add sample/repeat rationale, validity limits, artifacts, and execution budget in proportion to the decision. Unknown parameters can remain explicit assumptions or execution prerequisites; method names alone are not a usable design.

### 2. Define the measurement boundaries

Map the known or proposed path from input to delivery/read-back. Label documented, inspected, and proposed stages separately. For each included stage specify:

- responsibility and owner;
- entry point;
- input/output contract;
- state and side effects;
- deterministic invariants;
- plausible quality dimensions;
- failure and recovery;
- capture/injection points for frozen artifacts;
- existing test/eval/telemetry evidence.

Identify required isolation/replay points and which need verification. Field, stage, and whole-task units may coexist when each answers a different decision.

### 3. Reuse available evidence

Identify supplied contracts, tests, fixtures, cases, rubrics, runners, reports, and telemetry that materially affect this design. Specify what to reuse, adapt, or add; mark unknown wiring as an integration check for later. Cite exact sources for current-state claims. A comprehensive inventory and defect search belong to [the audit workflow](01-audit-existing-system.prompt.md) when requested.

### 4. Define the eval contract

Propose:

- the unit under eval;
- quality dimensions with definitions, anchors, thresholds, owners, and eligible grader types;
- hard caps and mandatory gates;
- operational metrics and total-cost-per-usable-outcome model;
- internal or external baselines when comparison supports the decision;
- minimum meaningful deltas and protected non-regression dimensions;
- release, iterate, collect-more-evidence, rollback, and stop consequences.

Do not invent weights or thresholds silently. Derive them from documented product responsibility or mark them as decisions requiring an owner.

### 5. Design the scenario registry

Choose the smallest repeatable matrix that covers meaningful variation across:

- users/segments/domains;
- goals;
- input richness and data quality;
- supported input languages, formats and modalities;
- context complexity and allowed personalization/customization;
- lifecycle and failure states;
- risk and authority;
- context, retrieval, memory, tools, providers, languages, or scale where relevant.

Define development, regression, calibration, and held-out partitions where needed. Assign cases according to actual use and contamination risk: an iterated case can support regression, but not an unbiased held-out claim. Explain what each axis isolates and avoid a wasteful full Cartesian product.

When variation in input, context or customization could change success, use [edge-case design](references/robustness-design.md). Specify initial conditions, variation, expected behavior and observable judgment for selected cases. Separate allowed adaptation from protected requirements; memory and multi-agent checks depend on actual mechanisms. Label unresolved behavior as proposed.

### 6. Design grader strategy and validation

Separate what is judged, who/what judges it, and the result format. Numerical scores are not necessarily deterministic; human or model judgments can be pass/fail. Use [grader design](references/grader-design.md) when selecting or combining mechanisms. Map each criterion to a primary grader, preserving hard gates, invalid measurements and escalation separately from quality scores.

Choose graders by the criterion, not whether the producing stage calls an LLM. Code, human, or model grading can apply at different boundaries; model output does not automatically require a model judge. For selected model judges define:

- complete judge context;
- blinding;
- structured output and schema validation;
- version recording;
- human calibration set and agreement metrics;
- go/no-go threshold set before final scoring;
- revalidation triggers;
- borderline/high-risk human adjudication.

### 7. Design stage plus E2E evidence

Map the critical stages in scope and choose how to observe each relevant behavior. Start from the real composition path and available intermediate inputs/outputs; preserve enough versions and provenance to distinguish upstream defects from current-stage failures. Check actual service effects and consumer read-back where the claim requires them.

Independent replay, start/stop commands, runners and dedicated reports are optional investments for frequently changed, stochastic, expensive or hard-to-diagnose stages. Selected stages can share a runner and result record. For contract changes in this version, specify the necessary compatibility and recovery checks; future contract architecture belongs in deferred work unless required for current safety or correctness.

### 8. Design baseline and economics

When comparison informs the decision, use [comparative design](references/comparative-design.md) to choose the comparison that answers it. For product value, consider what users realistically do instead, including general-purpose AI when it can serve the same job. For component attribution, isolate the component rather than substituting an entire product. Name concrete candidate arms and what differs; label unresearched capabilities as provisional. Distinguish:

```text
baseline research -> comparison arms and fairness conditions
shared tests/evals/operational measures -> benchmark run
benchmark results -> comparative decision
```

Keep quality, correctness, and operational/economic panels separate. Include human preparation, review, correction, retry, and remediation cost. Do not equate offline quality with revenue or ROI.

### 9. Design agent analysis and human escalation

Keep analysis agent-first and human-directed. For a small round, the agent can read results, identify patterns and prepare one decision summary directly; persistent clustering/reporting infrastructure is optional. Define how the selected workflow will:

- automatically run authorized checks and analyze results;
- validate the measurement system before judging the product;
- cluster failures, localize first divergence, detect protected regressions, and summarize uncertainty;
- address the relevant product, engineering or quality/operations decisions, with separate views only when they help the intended readers;
- classify each result as `No human action`, `Agent follow-up`, `Human review requested`, or `Blocked / unverified`;
- escalate borderline/high-risk outputs, grader disagreement, novel failure clusters, suspicious passes, or decisions requiring product/domain judgment;
- present each escalation with artifact, context, criterion, agent assessment, uncertainty, and exact decision requested;
- feed confirmed human findings back into labels, rubrics, scenarios, and regression checks.

### 10. Choose proportional artifacts

Recommend the minimum files and directories needed. For each artifact state:

- purpose and authoritative scope;
- owner/writer;
- mutation model: current truth, generated, or append-only;
- create/update/merge/archive/omit recommendation;
- upstream and downstream dependencies.

Do not create a fixed ceremony. Reuse existing authoritative artifacts instead of duplicating them.

### 11. Propose one structural slice

Specify the smallest slice that answers the chosen question. Select applicable acceptance evidence from:

- deterministic test execution;
- one stage-quality eval;
- one real-composition E2E;
- artifact persistence/replay;
- separated quality and operational reporting;
- automated result analysis and a bounded human-review queue;
- one decision entry;
- no unauthorized paid call or side effect.

Provide concrete checks or dimensions, representative cases, expected results, artifacts, and acceptance criteria. Add stage isolation, E2E, replay, comparisons, and human review only where they support the decision or a material risk. Separate measurement setup from any proposed product repair. State when evidence is sufficient to wrap up, when failed or invalid evidence requires a new action, and when resource limits stop the run without a pass. For iteration, link diagnosis to an authorized focused change and separately recorded confirmation; do not require a fixed number of rounds. Label uninspected integration points and commands as proposed. Give the design a stable reference; stop at the requested proposal.

If real usage signals are available, briefly recommend how privacy-safe failures and high-friction tasks can update cases and priorities. Keep their provenance and sampling limits; a full production-validation plan is a separate scope.

## Necessary questions only

Complete the supported design first. Ask only when a missing choice prevents this deliverable; otherwise state a recommended assumption or later prerequisite. Classify uncertainties as:

- `Current blocker` — this part of the design cannot be responsibly specified.
- `Design assumption` — proceed with a labeled default and validation consequence.
- `Execution prerequisite` — needed before implementation or a run.

For every question include current evidence, recommended default, and consequence if wrong. Likely topics include product quality ownership, risk tier, acceptable failure, external alternative, cost ceiling, authority, human reviewers, release decision owner, and real-world outcome measurement.

## Required output

0. **Decision overview:** follow [Decision-ready deliverables](README.md#decision-ready-deliverables). Lead with the proposed strategy and short, separate reasons. Connect this round's scope and questions to concrete checks/comparisons, acceptance and resulting decisions. Make the stopping point and consequential deferrals clear. Surface the main trade-off or evidence limit and next action. Put this inside the design document, ahead of source inventories and technical detail. This is a design recommendation, not a report of measured performance.
1. Strategy rationale and consequential trade-offs: explain the choices behind the overview at the depth needed to assess the design.
2. Concrete decision-to-evidence matrix: unit, scenarios, checks or quality dimensions, expected behavior/rubric, grader, interpretation, and decision consequence.
3. Selected architecture: contracts, stage/E2E boundaries, cases, runners, provenance, analysis, and targeted human review. Include only relevant components.
4. Baseline/benchmark and judge-calibration design where needed.
5. First executable round: scope, acceptance/stopping rules, workload estimate and assumptions, dependencies, consequential deferrals and their triggers. Include proposed commands where useful; give a wider implementation sequence only when requested or needed.
6. Evidence boundary, design assumptions, execution prerequisites, and genuinely blocking questions.

Provide the proposed contracts, coverage, criteria, and representative cases—not only future tasks to design them. Current-state inventory and file/line findings support the current-state claims actually made; they are not prerequisites to a greenfield design.

Use the body to explain and substantiate the overview, with detailed matrices and implementation references available for deeper review. Summarize only decision-changing details up front. Introduce each section's purpose before technical lists; examples are optional and should clarify an already stated point. Preserve the evidence status of claims throughout.

Do not proceed beyond the approved scope.
