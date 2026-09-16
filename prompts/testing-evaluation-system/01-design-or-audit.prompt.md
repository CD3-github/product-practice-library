# Prompt: Design or Audit a Testing & Eval System

## Role

Act as a product-minded test and eval architect. Design one shared evidence system that a coding agent can operate and that product, engineering, and quality/operations participants can interpret for different decisions.

This is a **read-only audit and design task**. Do not implement, rewrite product behavior, make paid model calls, modify production data, or create release gates until I approve a specific proposal ID.

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
- Authorization and cost boundary: `[what may be run; what requires approval]`

Unknown fields must remain unknown until verified. Inspect before asking.

## Evidence discipline

1. Read repository instructions first.
2. Record branch, commit, dirty state, environment, and access limitations.
3. Inspect actual code paths, schemas, runners, fixtures, tests, evals, reports, CI, telemetry, and configuration.
4. Run only safe, non-destructive, authorized checks.
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

## Audit and design sequence

### 1. Design the evidence selection map

Start from the decisions the team must make. For each decision specify:

- the uncertainty being resolved;
- the unit: function, stage, output, task, session, workflow, feature, release, or cohort;
- the smallest trustworthy combination of deterministic tests, evals, benchmark comparison, production monitoring/online evals, experiments, and human review;
- operational measures such as latency, reliability, human effort, and cost;
- the result format, threshold or interpretation rule, and decision consequence.

Do not force tests and evals into an either/or choice. An eval may combine exact metrics, code-based checks, heuristics, calibrated model judges, and human judgment. A shared harness is acceptable when result types, failure semantics, and provenance remain distinct.

Organize the result into three layers rather than treating every term as a peer:

- **Core measurement:** tests and evals.
- **Decision extensions:** benchmarks, production validation, product analytics, online evals/monitoring, and controlled experiments when causality matters.
- **System infrastructure:** contracts, cases, handoffs, runners, graders, manifests, gates, reports, and decision logs.

Classify named techniques before recommending them. A golden set is a versioned case asset; an A/B test is a randomized controlled experiment; an A/A test checks the experiment system; red-team/blue-team work is adversarial assurance; robustness is a property tested across perturbations or shifts. Shadow validation observes a new path on real traffic without giving it production authority; canary validation exposes a small controlled share with monitoring and rollback. Choose only the techniques that close a material evidence gap for the current decision and risk.

### 2. Map the real pipeline

Trace actual execution from user input to final delivery/read-back. For every stage record:

- responsibility and owner;
- entry point;
- input/output contract;
- state and side effects;
- deterministic invariants;
- plausible quality dimensions;
- failure and recovery;
- capture/injection points for frozen artifacts;
- existing test/eval/telemetry evidence.

Identify stages that cannot currently be isolated or replayed.

### 3. Inventory current evidence

Build a matrix covering:

- unit, stage, contract, integration, E2E, failure, authority, migration, and smoke tests;
- deterministic graders, programmatic metrics, model judges, human review, online outcomes;
- product analytics events, identities, cohorts, funnels, exposure contracts, experiment assignments, and guardrail metrics where they exist;
- scenario registry, fixtures, development/regression/calibration/held-out partitions;
- internal baseline, external baseline, operational metrics, economic metrics;
- run manifests, reports, round history, decisions, CI/scheduled/release execution.

For every item classify: `Keep`, `Connect`, `Fix`, `Replace`, `Deprecate`, `Remove`, `Propose`, or `Unverified`.

Explicitly find:

- tests and evals that use the same name but answer different questions;
- output-quality assertions incorrectly encoded as brittle exact tests;
- deterministic contract failures delegated to a model judge;
- E2E-only coverage that cannot localize failure;
- stage-only coverage that never exercises real composition;
- duplicate fixtures, conflicting rubrics, shadow runners, stale reports, and unwired scripts;
- paid/live calls hidden in default commands;
- reports that mix latency/cost into quality;
- judge scores used without human calibration or sufficient context;
- tuning cases reused as the final benchmark;
- business or ROI claims unsupported by online evidence.
- observed analytics movement presented as causal without a defensible experiment or causal design.

Every current-system finding must cite files and lines, or a reproducible runtime/CI trace.

### 4. Define the eval contract

Propose:

- the unit under eval;
- quality dimensions with definitions, anchors, thresholds, owners, and eligible grader types;
- hard caps and mandatory gates;
- operational metrics and total-cost-per-usable-outcome model;
- internal and external baselines;
- minimum meaningful deltas and protected non-regression dimensions;
- release, iterate, collect-more-evidence, rollback, and stop consequences.

Do not invent weights or thresholds silently. Derive them from documented product responsibility or mark them as decisions requiring an owner.

### 5. Design the scenario registry

Choose the smallest repeatable matrix that covers meaningful variation across:

- users/segments/domains;
- goals;
- input richness and data quality;
- lifecycle and failure states;
- risk and authority;
- context, retrieval, memory, tools, providers, languages, or scale where relevant.

Separate development, regression, calibration, and held-out sets. Explain what each axis isolates and avoid a wasteful full Cartesian product.

### 6. Design grader strategy and validation

For every dimension, choose the simplest trustworthy grader. For model judges define:

- complete judge context;
- blinding;
- structured output and schema validation;
- version recording;
- human calibration set and agreement metrics;
- go/no-go threshold set before final scoring;
- revalidation triggers;
- borderline/high-risk human adjudication.

### 7. Design stage plus E2E evidence

Define:

- versioned stage inputs/outputs;
- artifact manifest and trace IDs;
- frozen handoffs and replay;
- commands that can start/stop at a stage;
- one real-composition E2E;
- how a failure is assigned to the first diverging stage;
- how upstream-input defects are separated from current-stage defects.

### 8. Design baseline and economics

Research before selecting the baseline. Identify the user's credible current alternative, a prior-version baseline, and the strongest fair external comparison. Distinguish:

```text
baseline research -> comparison arms and fairness conditions
shared tests/evals/operational measures -> benchmark run
benchmark results -> comparative decision
```

When relevant, use:

- A: natural/minimal-input alternative;
- B: context-parity alternative without the specialized workflow;
- C: the product.

Keep quality, correctness, and operational/economic panels separate. Include human preparation, review, correction, retry, and remediation cost. Do not equate offline quality with revenue or ROI.

### 9. Design agent analysis and human escalation

The default should be agent-first and human-directed. Define how the system will:

- automatically run authorized checks and analyze results;
- validate the measurement system before judging the product;
- cluster failures, localize first divergence, detect protected regressions, and summarize uncertainty;
- produce separate Product, Engineering, and Quality & Operations result views;
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

Define the smallest end-to-end slice that proves:

- deterministic test execution;
- one stage-quality eval;
- one real-composition E2E;
- artifact persistence/replay;
- separated quality and operational reporting;
- automated result analysis and a bounded human-review queue;
- one decision entry;
- no unauthorized paid call or side effect.

Assign a `Proposal ID`. Stop before implementation.

## Necessary questions only

Ask only questions that cannot be answered from evidence and materially change the design. Classify each as:

- `Blocking`
- `Material assumption`
- `Optional`

For every question include current evidence, recommended default, and consequence if wrong. Likely topics include product quality ownership, risk tier, acceptable failure, external alternative, cost ceiling, authority, human reviewers, release decision owner, and real-world outcome measurement.

## Required output

1. Executive assessment and current maturity level.
2. Evidence ledger and verification boundary.
3. Decision-to-evidence selection map, including units and combinations.
4. Real pipeline/stage map.
5. Current test/eval evidence inventory with gaps and redundancies.
6. Proposed eval contract.
7. Scenario registry design.
8. Grader and judge-validation plan.
9. Stage/E2E/replay architecture.
10. Baseline-research, benchmark, and economics design.
11. Agent-analysis and human-escalation design.
12. Proportional artifact/document map.
13. Prioritized findings with file/line evidence and minimum fixes.
14. Necessary questions.
15. One approval-ready structural slice with `Proposal ID`, acceptance evidence, migration/rollback, commands, cost boundary, and explicit non-goals.

Do not proceed beyond the approved scope.
