# Testing & Evaluation System

Version 1.3 · reusable cross-project methodology

Subtitle: **A composable evidence system for AI and conventional product work**

## Purpose

Use this method to decide whether a product or AI system:

- meets explicit behavioral contracts;
- performs well enough against defined quality criteria;
- improves on a credible alternative under fair comparison;
- remains reliable and useful on real traffic;
- has enough evidence for the next product or release decision.

Adapt dimensions, thresholds, models, and decision gates to the product. Preserve the evidence types and claim boundaries defined here.

Apply [the task contract](../_shared/task-contract.md) for scope, evidence, authority and decision-ready writing. Read the sections needed for the current deliverable; the full method is a reference, not a mandatory execution sequence.

---

## 1. Choose an evidence mix from the decision

Every feature needs an **evidence strategy**. Combine tests, evals, benchmarks, production monitoring, experiments, and human review in the proportions and sequence that fit the decision, risk, and product maturity.

Start from the decision that must be supported. Choose the smallest trustworthy combination, and set the unit at the level where the uncertainty exists: function, stage, output, task, session, workflow, feature, release, or cohort.

### Three-layer system model

Organize the system around measurement, decision-oriented study designs, and the infrastructure that makes both repeatable:

```text
1. CORE MEASUREMENT
   tests -> do directly checkable behaviors and constraints hold?
   evals -> how well does the system perform against defined criteria?

2. APPLY MEASUREMENTS
   benchmarks -> compare alternatives -> choose a version, model, or workflow
   production validation -> check real-use performance -> expand, repair, or roll back
      product analytics -> observed behavior and association
      online evals/monitoring -> live quality, reliability, and drift
   controlled experiments -> estimate causal impact -> adopt, revise, or stop

3. SYSTEM INFRASTRUCTURE
   contracts + cases + stage handoffs + runners + graders
   manifests + gates + reports + decision logs
```

`Outcomes` are observed results, such as task completion, edits or incidents. Define the signal and its evidence boundary before using it as an eval dimension, benchmark metric, analytics measure, experiment outcome or release gate.

| Decision need | Primary mechanism | It may include | Result |
|---|---|---|---|
| Do directly checkable behaviors and constraints hold? | Assertion-based tests | Unit, contract, integration, E2E, authority, failure/recovery, defined cost or latency limits | Pass/fail and localized failures |
| How well does the system perform against defined criteria? | Evals | Exact metrics, rules, heuristics, model judges, human grading, cost, latency, reliability | Per-case and aggregate scorecards with reasons and uncertainty |
| Which alternative performs better under fair conditions? | Benchmark | Baseline research, frozen cases, context parity, repeated tests/evals, operational measures | Comparative deltas and trade-offs |
| What happens with real users and real traffic? | Production validation | Product analytics, traces, online evals, monitoring, feedback, edits, incidents, adoption | Observed quality, behavior, drift, and real-world relevance |
| Did a specific intervention cause a meaningful change? | Controlled experiment, such as an A/B test | Randomized exposure, control/treatment variants, primary and guardrail metrics | Causal product impact within the experiment design |

### Compose tests and evals for the decision

Tests and evals can use the same cases. Build the combination by choosing how to judge each requirement, then deciding whether repeated runs are needed to understand variability.

- **Directly verifiable rules → code checks.** Check required fields, permissions, state changes or a defined limit against a known rule. A deterministic check gives the same verdict for the same recorded input and result, including results produced by an AI system.
- **Contextual quality → explicit criteria and judgment.** Define what makes an answer grounded, useful or suitable for its intended user. Use qualified human review or a validated model judge where code alone cannot adequately assess that criterion.
- **Variation affects the decision → repeated runs.** Apply the selected checks and graders across repeated trials; report success rates or score distributions with uncertainty. Repeat only where variability matters to the claim.

Use the simplest trustworthy grader for each criterion. The same harness may run several mechanisms while preserving distinct results, provenance and failure semantics; separate infrastructure when execution, ownership or risk genuinely differs.

### Relationship among the mechanisms

```text
baseline research
  -> defines credible comparison arms and fairness conditions

tests + evals + operational measures
  -> measure each arm

benchmark
  -> compares the arms using the shared measures

production monitoring + online evals
  -> detect real-world quality, drift, and unexpected cases

product analytics
  -> describe adoption, task behavior, cohorts, funnels, retention, and associations

controlled experiments
  -> estimate causal product impact when traffic and design permit

production failures and human findings
  -> become new offline cases, graders, and regression tests
```

### Classify method names before adding them

Method names identify different resources and techniques. This classification helps select what each contributes to the evidence plan:

| Term | Classification | Use |
|---|---|---|
| Golden set | Curated, versioned case asset | Regression, judge calibration, stable comparison, and reusable high-risk cases |
| A/B test | Randomized controlled experiment: A is usually the current experience; B contains the intended change | Estimate causal product impact when traffic, exposure logging, metrics, and guardrails are sufficient |
| A/A test | The same experience assigned to both groups | Validate assignment, exposure, metric plumbing, and false-positive behavior before relying on an A/B result |
| Red-team / blue-team exercise | Adversarial assurance practice | Discover abuse, safety, security, and defense-response failures |
| Robustness test | Property-focused test/eval design | Measure behavior under perturbation, distribution shift, failures, or repeated trials |
| Load or stress test | Operational test method | Establish capacity, latency, reliability, and degradation behavior |
| Shadow validation | The new system runs on real traffic without affecting users or production decisions | Compare behavior on real input distributions before granting authority |
| Canary validation | A small, controlled share of real requests uses the new version with monitoring and rollback ready | Validate real execution while limiting blast radius, then expand only while guardrails remain healthy |

Choose methods by the evidence gap and the consequence of being wrong. A feature may use several methods at different stages—for example, a golden set before release, shadow validation on real traffic, and a canary before broader rollout.

A high-stakes medical, financial, legal, security, or compliance system also needs domain-specific validation and governance that this method does not replace.

This method does **not** by itself prove:

- usability or adoption;
- causal business impact;
- regulatory compliance;
- security against all threats;
- model fairness for a protected population;
- profitability at scale.

It creates the controlled evidence those later decisions need.

### Naming

Use **Testing & Evaluation System** for the main title and first definition. After that, use `eval`, `evals/`, and “eval matrix” consistently. `Eval` is a shared AI engineering and product concept this guide is intended to teach. Do not call this a complete “Product Quality System” unless it also owns user research, analytics, experimentation, incident learning, and business attribution.

### Decision perspectives

- **Product:** What result did we get? What user or product goal does it represent? Which decision does it support, and what is the next product lever?
- **Engineering:** Is the result technically valid and reproducible? Where did failure first diverge? Is the problem in the product, data, harness, grader, or environment?
- **Quality & operations:** Does the result reflect domain quality and real operating conditions? What is unsafe, costly, unsupported, ambiguous, or ready for human acceptance?

One person may cover multiple perspectives. Design, research, data/ML, customer success, trust/safety, legal, compliance, or other specialists join when their judgment materially changes the decision.

---

## 2. Agent execution and human decision collaboration

The default workflow should be agent-first and human-directed:

1. The agent runs all authorized automated tests, evals, benchmarks, and analysis.
2. The agent validates the measurement system before interpreting product performance.
3. The agent clusters failures, localizes likely causes, identifies regressions and uncertainty, and produces the three decision perspectives above.
4. The agent automatically separates results into:
   - **No human action:** clear passes and already-understood failures.
   - **Agent follow-up:** reproducible engineering or measurement defects within authorization.
   - **Human review requested:** borderline/high-risk outputs, grader disagreement, novel failure clusters, protected-dimension regressions, suspicious passes, or decisions requiring product/domain judgment.
   - **Blocked/unverified:** insufficient evidence, invalid measurement, missing access, or an authorization boundary.
5. Humans review only the prioritized evidence packet, confirm or override the interpretation, and make the consequential decision.
6. Confirmed human findings become labels, rubric changes, new cases, or regression checks for later rounds.

The agent must never present automated analysis as human acceptance. Each escalation must include the exact artifact, relevant context, criterion, agent assessment, uncertainty, and the specific human decision requested.

---

## 3. The minimum system architecture

The seven parts form one evidence loop rather than seven equal checklist items:

```text
DEFINE
  1. Eval contract
  2. Scenario registry
       |
       v
EXECUTE
  3. Stage contracts and frozen handoffs
  4. Runners
       |
       v
MEASURE
  5. Graders
       |
       v
RECORD
  6. Artifact manifest
       |
       v
DECIDE
  7. Reports, escalations, and append-only decision log
       |
       +--> revise contract, cases, implementation, or release state --> next round
```

1. **Eval contract** — decision question, unit, criteria, thresholds, hard caps, baseline, responsibility, and consequence.
2. **Scenario registry** — versioned cases covering users, contexts, input conditions, risks, and lifecycle states.
3. **Stage contracts and frozen handoffs** — versioned inputs and outputs that let any pipeline stage run independently.
4. **Runners** — deterministic, replay, benchmark, gated-live, and online paths with explicit cost and authority boundaries.
5. **Graders** — deterministic assertions, programmatic metrics, calibrated model judges, and human adjudication.
6. **Artifact manifest** — code, prompt, model, context, fixture, grader, environment, output, trace, cost, and timestamp required to reconstruct a result.
7. **Reports, escalations, and decision log** — automated analysis, prioritized human-review packets, current readout, and append-only decisions.

Keep these parts reusable, but do not force every project into the same directory tree. Small projects may combine documents when authority and change rate remain clear.

### Recommended artifact contract

Every run should be reconstructable from:

```text
run_id
scenario_id + scenario_version
system_version (commit/build)
stage or end_to_end
input_artifact references
context/provenance references
prompt/instruction version
model/provider/settings
tool/retrieval configuration
grader/rubric version
raw output
normalized output
deterministic checks
quality scores + reasons
hard-cap results
operational metrics
human review/adjudication status
timestamp + environment
```

Secrets and sensitive source data should be referenced or redacted, not copied indiscriminately into reports.

---

## 4. Testing suite: required behavior and failure paths

The test suite answers whether the system conforms to explicit contracts.

### Test layers

- **Unit tests:** pure functions, parsers, normalizers, policies, state transitions, scoring math.
- **Stage/component tests:** one pipeline stage with fixed input and observable output or side effects.
- **Contract tests:** API, event, tool, producer/consumer, schema, and compatibility boundaries.
- **Integration tests:** adjacent modules using realistic adapters, storage, queues, or recorded provider responses.
- **End-to-end tests:** a small set of real user paths from entry to durable delivery/read-back.
- **Failure and recovery tests:** timeout, retry, duplicate, partial failure, cancellation, resume, fallback, and rollback.
- **Authority and isolation tests:** permissions, approval boundaries, tenant separation, tool restrictions, and injection boundaries.
- **Migration tests:** old data, old events, version compatibility, and deprecation behavior.

### Test pyramid rule

Choose stage and contract checks that localize likely failures, integration checks for consequential boundaries, and a small set of high-value E2E paths. Stage checks isolate behavior; E2E results provide evidence that the real composition works under the tested conditions. Balance coverage against the decision and risk rather than a fixed test count.

### Model and provider calls

Separate four execution modes:

1. deterministic stubs for fast logic tests;
2. recorded replays for provider-shape and composition regression;
3. gated live calls for real integration and quality checks;
4. production monitoring for behavior under real traffic.

Never let an unmarked paid or side-effecting live call enter the default CI path.

### Suggested cadence

- **On every change:** unit, stage, contract, schema, and fast policy checks.
- **On pull request:** relevant integration, replay, failure, and narrow E2E paths.
- **Nightly or scheduled:** broader matrices, repeated stochastic runs, provider compatibility.
- **At release:** live E2E, comparative benchmark, critical safety cases, rollback/read-back.
- **Post-release:** drift, incident, user outcome, and cost monitoring.

---

## 5. Eval matrix: structured performance evidence

An eval matrix is a versioned set of scenarios crossed with explicit criteria and graders. Criteria can cover correctness, constraint adherence, operational performance, semantic quality or user value; each maps to an appropriate judgment mechanism. The matrix shows how performance changes across meaningful variation.

### Scenario axes

Choose axes that can change behavior or risk. Common examples:

- user segment, domain, vertical, geography, language, and locale;
- business goal or user job;
- input richness: complete, typical, sparse, noisy, conflicting, stale;
- supported representations: input format, language and modality;
- contextual complexity: active intents, relevant history, corrections and evidence ambiguity;
- allowed customization: presentation or preference changes, their priority and protected requirements;
- lifecycle state: first use, edit, retry, recovery, insufficient permission, historical data;
- risk tier and allowed authority;
- tool, retrieval, memory, or provider availability;
- model, prompt, routing, content approach, and configuration;
- expected scale, duration, or output size.

Do not build a full Cartesian product by default. Use a balanced fractional matrix that isolates the most important effects while remaining affordable to repeat.

Use [edge-case design](references/robustness-design.md) to turn selected variations into observable checks. Specify what should remain stable, change, require clarification or follow a safe fallback. Persistence and handoff coverage depend on actual mechanisms, not on the presence of those terms in a method catalog.

### Case-design rules

- Cover every material segment; one segment does not predict another.
- Use multiple examples for important segments; one case can be a quirk.
- Change one main axis at a time when the goal is causal diagnosis.
- Include messy and failure-prone inputs, not only polished demos.
- Separate development/tuning, regression, calibration, and held-out cases.
- Rotate cases over time to detect overfitting.
- Give every case a stable ID, version, rationale, expected behavior, and risk label.
- Prefer coverage of distinct mechanisms and failure modes over raw case volume.

### Rubric design

Write the rubric before building the graders. It is the quality contract.

Each dimension should have:

- a precise name and definition;
- why it matters to the user or business result;
- positive and negative anchors for the score scale;
- weight, if a blend is needed;
- hard-cap or mandatory-gate behavior;
- eligible grader types;
- minimum acceptable threshold;
- owner and change policy.

Dimensions should be collectively sufficient and minimally overlapping. Do not force perfect MECE language when real product qualities interact; instead, define boundaries well enough that two graders would not repeatedly score the same defect twice.

### Scorecards, blends, and hard caps

Keep the per-dimension scorecard. A weighted blend supports comparison, but it must never hide:

- a failed critical dimension;
- a hard-cap safety or integrity violation;
- high variance;
- a weak segment;
- missing coverage;
- a statistically or practically insignificant delta.

Use hard caps for disqualifying failures such as fabrication, impossible execution, permission violations, missing required output, or dangerous action. A small weight is not an adequate representation of a disqualifying failure.

---

## 6. Graders and judge validation

To make a score useful for a decision, connect three choices:

- **Criterion:** what behavior or quality needs to meet a standard.
- **Judgment mechanism:** which code check, qualified reviewer or validated model can assess it.
- **Result:** the pass/fail verdict, measured quantity, rating or preference, including its limits and uncertainty.

Choose the mechanism for the criterion rather than the result format: both humans and models can produce numerical ratings or binary labels. Use [grader design](references/grader-design.md) when composition, calibration, bias or escalation needs further specification.

Use the simplest trustworthy grader for each dimension:

1. **Code-based grading:** assertions for exact values, schema, prohibited states and required fields; computed metrics for defined quantities such as coverage, ranking, latency or domain calculations. Specify the reference, formula and limits of any proxy.
2. **Human review:** direct domain or user-level judgment, calibration, adjudication and consequential trade-offs.
3. **Model judge:** repeated semantic or contextual judgments under a defined rubric, with reliability checked against qualified human review.

Production traces and outcomes can supply cases and signals, but they are not automatically graders. Convert them into an explicit metric, evaluator, human judgment, or experiment before using them as decision evidence.

### Model-judge requirements

- Give the judge all context required to verify the producer's claims; less context creates false failures.
- Do not give it irrelevant identity signals about which system produced the output.
- Use explicit anchored scales. For example: 3 = usable but mediocre, 4 = clearly professional, 5 = exceptional.
- Require a reason tied to observable evidence, not an unexplained number.
- Use structured output and runtime schema validation.
- Version the judge model, prompt, rubric, context packet, and parser.
- Prefer a different judge model or human adjudication when self-preference is plausible.
- Revalidate after material rubric, model, domain, or context changes.

### Human calibration

Before a model judge controls a decision:

1. Select a deliberately varied calibration set, including weak, borderline, strong, and hard-cap examples.
2. Have qualified humans score independently using the same rubric.
3. Measure agreement appropriate to the scale: exact/adjacent agreement, rank correlation, per-dimension error, and hard-cap false-positive/false-negative rate.
4. Inspect disagreements, refine rubric/context/judge instructions, and repeat.
5. Set a go/no-go threshold before looking at the final calibration result.
6. Route borderline and high-risk cases to human adjudication.

“About ten examples” can be a pilot, not a universal proof. Sample size should reflect decision risk, output variance, number of dimensions, and segment diversity.

---

## 7. Staged and end-to-end eval

A multi-stage system needs visibility into relevant stage behavior and evidence that the selected composition works. A bounded first round can use one real-path runner with captured intermediate artifacts. Independent runners, replay and dedicated reports are investments for stages that need repeated isolation, not prerequisites for every stage check. See [scope and stopping rules](references/bounded-round-design.md).

### Stage-level

- Freeze the upstream artifact and assess one stage's output.
- Use the same stage contract in production and eval.
- Save relevant stage outputs for diagnosis; add replay where its benefit justifies the setup.
- Attribute defects to the first stage where behavior diverges.
- Distinguish an upstream-input defect from a current-stage defect.

### End-to-end

- Start from the real user entry point.
- Use the real composition path, not a parallel eval-only implementation.
- Verify final delivery, persistence, and read-back when those are part of the outcome.
- Preserve stage artifacts and trace IDs so E2E failure can be localized.

### Coverage map

```text
local behavior       stage contract tests + stage evals
composition          integration + replayed or gated E2E
live system          production monitoring + sampled online evals
human judgment       calibration + prioritized adjudication
```

These are complementary coverage levels, not a mandatory maturity sequence. Evidence from one level does not establish another level by itself.

---

## 8. Baseline research and comparative benchmarks

Every comparison needs a credible reference for its decision. For product value, the baseline should represent what users would realistically do today; for a version change, the current system may be sufficient. A benchmark applies shared measures to comparable tasks under documented conditions. Natural-use comparisons can retain realistic input and effort differences; context-parity comparisons control information access.

Use [comparative design](references/comparative-design.md) when specifying a benchmark: it distinguishes version comparisons, realistic alternatives, component ablation, and quality/cost trade-offs. Select the relevant design rather than requiring each type.

### Baseline research

Before freezing comparison arms, investigate what users actually do today. Record the alternative's current capability and version, the inputs and context it receives, the preparation effort it requires, the expected output, cost, and access constraints. This prevents an unrealistically weak comparator from making the product look better than it is.

```text
credible alternative research
→ baseline definition
→ fair comparison arms
→ shared tests, evals, and operational measures
→ benchmark result
```

### Internal baseline

Compare the system to its prior version using frozen cases, versions, and settings. This shows whether an iteration improved the product.

### External baseline

Compare against a credible alternative a user could access, including general-purpose AI when it serves the same job. When separating context advantage from workflow value matters, consider this three-arm pattern:

- **A — natural alternative:** the manual process or general tool with the minimal input a user would naturally provide.
- **B — context-parity alternative:** the same general tool with all approved context available to the specialized system, but without the specialized workflow.
- **C — specialized product:** the real feature through its production-equivalent path.

A versus C addresses realistic replacement value. B versus C helps assess value beyond context access; neither isolates one internal component. Equal quality with less preparation or correction can be valuable. Choose the arms needed for the decision, and use a controlled ablation for component attribution.

### Fair-comparison rules

- Freeze inputs, context packets, model versions, settings, output requirements, and run date.
- Generate arms independently and save untouched raw outputs.
- Blind the quality judge to arm identity.
- Require comparable deliverables, but do not prescribe identical reasoning.
- Compare total effort to a usable result, including human preparation, review, and correction—not only model-call latency.
- Repeat stochastic arms enough to estimate variance.
- Report per-dimension deltas and confidence, not only a blended winner.
- Rerun when the alternative, context packet, product method, or decision threshold changes.

### Value delta

For each dimension and the approved blend:

```text
value_delta = specialized_product - strongest_relevant_alternative
```

A release gate should define the minimum meaningful delta, critical non-regression dimensions, hard-cap behavior, and uncertainty rule before results are known.

---

## 9. Operational and economic evidence

Keep operational metrics separate from judged quality:

- end-to-end latency and time to usable result;
- token, model, tool, infrastructure, and storage cost;
- human setup, review, correction, and escalation time;
- retry, repair, fallback, and failure rate;
- completeness and usable-output rate;
- throughput and concurrency;
- incident, remediation, and support burden.

The decision-useful unit is usually not “cost per model call.” Prefer:

```text
total cost per usable outcome
= automated run cost
+ expected human preparation/review cost
+ expected retry/failure/remediation cost
```

For planning, add volume, provider-price, reviewer-time, and failure-rate sensitivity ranges. Do not convert an offline quality lift directly into revenue or ROI without an attribution design.

---

## 10. Reporting: one evidence package, several lenses

Open a substantial report with a decision overview using [the delivery contract](README.md#decision-ready-deliverables): recommendation, supporting result or design rationale, scope and units, material uncertainty, and next action. The panels below substantiate that overview; they are not all equally important to the first reading. Put the complete evidence in the body, with links from decision-changing claims. Plans describe how evidence will support a decision; measured reports describe what the collected evidence actually supports.

Preserve separate panels for the evidence actually selected and collected. Include a missing panel as a limitation only when its absence changes the decision:

1. **Correctness panel:** deterministic pass/fail, contract failures, safety gates.
2. **Quality scorecard:** every dimension, reason, hard cap, segment, and variance.
3. **Comparative panel:** current vs previous and product vs alternative, with meaningful deltas.
4. **Operational/economic panel:** latency, cost, effort, reliability, and usable-output rate.
5. **Outcome panel:** human acceptance or post-release behavior, when available.

Then provide three decision perspectives without changing the underlying evidence:

- **Product:** result, affected users/scenarios, goal impact, supported decision, trade-off, and next product lever.
- **Engineering:** measurement validity, first diverging stage, reproducible artifact, suspected cause, and next diagnostic or repair.
- **Quality & operations:** domain defect, workflow impact, safety/support/cost concern, judge disagreement, and adjudication need.

The agent should analyze the complete run first. Humans should receive only prioritized review queues plus enough sampled passes to detect false confidence—not every raw output.

### Human-review queue

Escalate at least:

- hard-cap or safety violations;
- borderline results near a decision threshold;
- disagreement among graders or between grader and deterministic evidence;
- novel or high-frequency failure clusters;
- protected-dimension regressions;
- suspicious passes, possible reward hacking, or measurement artifacts;
- cases where product, domain, legal, or operational judgment changes the consequence.

Every queued item must name the artifact, criterion, agent diagnosis, confidence/uncertainty, and requested human decision.

Never collapse all panels into one score. A system can be high quality but economically poor, cheap but unsafe, correct but useless, or promising offline but unproven in production.

---

## 11. Measurement rounds and retrospective

Treat each measurement as an append-only round:

1. **Purpose:** what decision this round exists to support.
2. **Pre-registered hypothesis:** expected change and protected dimensions.
3. **System under test:** versions, configuration, cases, and execution mode.
4. **Measurement plan:** graders, thresholds, repeats, baseline, and cost boundary.
5. **Target conclusion:** what each possible result permits the team to decide.
6. **Actual evidence:** raw artifacts, scorecards, operational metrics, and failures.
7. **Measurement validity:** judge calibration, missing context, contamination, coverage, and uncertainty.
8. **Decision:** ship, iterate, rollback, collect more evidence, or stop.
9. **Next lever:** one highest-value change with protected strengths.

Do not rewrite old rounds to match current understanding. Append a correction or superseding decision so the team can reconstruct what was known at the time.

### Three retrospective disciplines

- **Check the ruler before blaming the output.** A bad score may reveal a missing judge context, grader bug, or invalid fixture.
- **Change one highest-value lever.** Fixing many things at once prevents attribution.
- **Re-measure and protect strengths.** Confirm the target moved, critical dimensions did not regress, and the result generalizes beyond tuning cases.

---

## 12. Agent-handable setup workflow

Select the requested route in [README](README.md) and apply [the task contract](../_shared/task-contract.md). The phases below describe an implementation lifecycle, not prerequisites to every task. A design specifies concrete contracts, cases, criteria, architecture, and future verification; an audit substantiates current-state claims; implementation and runs require their respective authorization. Apply only the components selected for this evidence strategy.

### Phase 0 — establish relevant context

- For a design, use supplied intent, examples, and constraints; inspect sources only where they change the proposal. For an audit or implementation, inspect relevant repository instructions, code, contracts, and existing evidence.
- Record branch/commit, dirty state, available environments, paid-call boundaries, and inaccessible evidence.
- Label claims as verified, implemented, proposed, or unverified.

### Phase 1 — define the decision contract

- Name the decision, user outcome, and unit of evidence.
- Bound the version or acceptance scope, define sufficient-evidence and resource stopping rules, and identify consequential deferrals with triggers. Separate setup, automated runtime and human-review effort; use [bounded-round design](references/bounded-round-design.md).
- Select the smallest trustworthy mix of tests, evals, benchmark comparison, production monitoring/online evals, experiments, and human review.
- Define criteria, hard caps, operational metrics, thresholds, accountable participants, and decision consequences.
- Identify the highest-risk measurement assumption, often judge validity, data availability, or context parity.

### Phase 2 — map the pipeline and scenario registry

- Map proposed stages/contracts for design, and inspected stages/contracts for audit or implementation. Label the distinction.
- Identify stable injection and capture points.
- Build the smallest representative case matrix; separate tuning, regression, calibration and held-out usage where those purposes apply.

### Phase 3 — verify selected required behaviors

- Implement selected unit/stage/contract checks; add narrow E2E evidence where composition affects the decision.
- Add failure, authority, and read-back checks where relevant.
- Keep the default path free of paid network calls and irreversible side effects.

### Phase 4 — build quality eval

- Map each quality criterion to its primary grader; use code where it validly measures the criterion.
- Use direct human review for a bounded judged-quality sample where practical; add calibrated model judges when volume or repetition warrants them.
- Human-calibrate judges before using them as gates.
- Preserve enough applicable versions and artifacts to reconstruct the selected measurements, using existing records where suitable.

### Phase 5 — establish baselines and economics

- Research the user's credible alternatives and the conditions required for a fair comparison.
- Select an internal baseline, external alternative or other comparison according to the decision; add context parity when separating information access from workflow value matters.
- Run the benchmark with shared tests, evals, and operational measures.
- Measure total cost and effort to a usable result.

### Phase 6 — run one structural slice

- Execute one scenario from entry to final result.
- Verify the selected measurement path and its analysis/reporting. Include stage isolation, composition, replay, grading, and human escalation where the decision requires them.
- Only then scale the matrix or automate release gates.

### Phase 7 — operationalize

- Assign change cadences to checks.
- Add CI/scheduled/release commands.
- Define drift, incident, judge revalidation, and case-rotation policies.
- Define production monitoring and online-eval sampling where applicable.
- Name accountable participants for rubric, scenarios, harness, judge, business threshold, and release decision.

---

## 13. Proportional document and directory map

A mature project may use:

```text
docs/testing-evaluation/
  ARCHITECTURE.md          current source of truth
  EVAL-CONTRACT.md         rubric, thresholds, gates, owners
  SCENARIOS.md             matrix design and partitions
  BASELINES.md             comparison design and fairness rules
  rounds/                  append-only evidence and decisions
tests/
  unit/
  contract/
  integration/
  e2e/
evals/
  scenarios/
  graders/
  runners/
  reports/
artifacts/                 manifests or references, usually generated
```

Do not create this entire tree by default. Combine files for a small project. Separate them when they have different owners, mutation models, or sources of truth. Generated reports should not become the manually maintained architecture source.

---

## 14. Maturity model

### Level 0 — anecdotal

Demo outputs and manual impressions; no stable cases, rubric, or reproducibility.

### Level 1 — deterministic safety

Core stage and contract tests, narrow E2E, explicit failure behavior.

### Level 2 — repeatable offline quality

Versioned scenarios, rubric, graders, run manifests, and internal baseline.

### Level 3 — calibrated comparative value

Human-validated judges, held-out cases, variance, fair external baseline, operational economics, and release gates.

### Level 4 — production monitoring and online eval loop

Offline-to-online correlation, sampled online evals, drift monitoring, incident learning, outcome validation, case rotation, and threshold governance.

Advancing a level requires evidence, not more files.

---

## 15. Reusable checklist

Select items for the current version, decision and evidence mix. This is a coverage reference, not a requirement to build every component before the first round. Deferred material risks need a rationale and trigger; absent optional infrastructure is not itself a defect.

### Decision contract

- [ ] The user outcome and unit under eval are explicit.
- [ ] The evidence mix follows the decision; tests and evals are not forced into false either/or categories.
- [ ] Every gate names an owner and a decision consequence.
- [ ] Acceptance scope, sufficient-evidence stopping point, resource limits and consequential deferrals are explicit.

### Tests

- [ ] Stage and contract tests are deterministic and fast.
- [ ] A small real-composition E2E path exists.
- [ ] Failure, recovery, authority, and read-back behavior are covered where relevant.
- [ ] Default CI has no accidental paid calls or irreversible side effects.

### Evals

- [ ] The rubric is written before graders.
- [ ] Dimensions have anchors, thresholds, owners, and hard caps.
- [ ] Scenario coverage reflects real segments, input conditions, lifecycle states, and risks.
- [ ] Development, calibration, regression, and held-out cases are separated.
- [ ] Model judges receive sufficient context, are blinded, versioned, and human-calibrated.
- [ ] Stochastic variance and borderline adjudication are handled.

### Baselines and economics

- [ ] Baseline research identifies the user's credible alternatives before comparison arms are frozen.
- [ ] Selected comparison arms answer the decision; internal and external baselines are included only where relevant.
- [ ] The external comparison includes context parity where relevant.
- [ ] Inputs, versions, deliverables, and effort accounting are fair.
- [ ] Total cost per usable outcome is reported separately from quality.
- [ ] Offline scores are not represented as revenue or ROI.

### Reproducibility and learning

- [ ] Every run has a reconstructable artifact manifest.
- [ ] Stage outputs can be frozen, replayed, and compared.
- [ ] Reports preserve per-dimension and per-segment evidence.
- [ ] Rounds and decisions are append-only.
- [ ] Each iteration states its hypothesis and protected strengths before measurement.
- [ ] Automated analysis triages results before human review.
- [ ] Human escalation criteria and requested decisions are explicit.
- [ ] Confirmed production failures feed the offline scenario and regression sets.

---

## Glossary

- **Test:** a check of behavior or a property; in this guide, primarily an assertion against an expected value, state, or invariant. Software testing also includes exploratory and statistical approaches.
- **Eval:** structured measurement against defined criteria; it may combine deterministic metrics, code-based graders, model judges, and human judgment.
- **Eval contract:** the decision question, rubric, thresholds, baselines, owners, and consequences governing an eval.
- **Operational metric:** objective cost, time, reliability, throughput, or completeness measurement.
- **Quality dimension:** one defined aspect of output goodness.
- **Rubric:** dimensions, anchors, weights, thresholds, and hard-cap rules defining quality.
- **Scorecard:** per-dimension results retained for diagnosis.
- **Weighted blend:** a summary across approved quality dimensions; never a substitute for the scorecard.
- **Hard cap:** disqualifying failure that limits or fails the result regardless of other scores.
- **Grader:** deterministic rule, programmatic metric, model judge, or human judgment used to assess a result.
- **Judge calibration:** comparison of a judge against qualified human ratings before it controls decisions.
- **Scenario registry:** versioned set of cases, partitions, risks, and expected behavior.
- **Frozen handoff:** saved output from one stage used as stable input to another.
- **Replay:** rerun using recorded inputs or provider outputs without repeating the original external action.
- **Internal baseline:** comparison with a prior version of the same system.
- **External baseline:** comparison with the best relevant alternative available to the user.
- **Baseline research:** evidence used to select credible comparison arms and define fair inputs, context, effort, and conditions.
- **Benchmark:** controlled comparison that applies shared tests, evals, and operational measures across baseline and candidate arms.
- **Context parity:** competing systems receive equivalent approved source information.
- **Held-out set:** scenarios excluded from tuning and used to test generalization.
- **Round:** one pre-specified measurement cycle ending in a decision.
- **Online eval:** automated or sampled grading of production traces to monitor real-world quality and discover new cases.
- **Production monitoring:** observation of live reliability, quality, safety, drift, cost, incidents, and user behavior.
- **Product analytics:** observational measurement of real user behavior, segments, funnels, adoption, retention, and workflow outcomes; association is not automatically causation.
- **Controlled experiment:** a pre-specified comparison with defensible assignment and exposure, used to estimate causal impact within the design's limits.
- **Golden set:** curated, versioned reference cases used for regression, calibration, or comparison; it is an asset, not a separate evidence layer.
- **Artifact manifest:** version and provenance record required to reconstruct a run.
- **Total cost per usable outcome:** automated cost plus expected human preparation, review, correction, and failure cost.

---

## External validation basis

This method aligns with current first-party guidance while remaining tool-agnostic:

- [OpenAI evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices): eval-driven development, mixed evaluator types, continuous evaluation, and human calibration of automated scoring.
- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents): code-, model-, and human-based graders; end-to-end harnesses; transcript review; production monitoring; A/B testing; and product/domain participation in defining success.
- [LangSmith evaluation](https://docs.langchain.com/langsmith/evaluation): the common distinction between offline evals and online evals over production traces, with production failures feeding back into datasets.
- [Google Cloud generative AI evaluation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/eval-python-sdk/view-evaluation): pointwise, pairwise, and computation-based metrics, including candidate-versus-baseline results.
- [Amplitude Experiment overview](https://amplitude.com/docs/feature-experiment/overview): randomized product variants, exposure, metrics, and the distinction between observed movement and controlled causal evidence.
- [Amplitude A/A testing](https://amplitude.com/docs/feature-experiment/aa-testing): selective validation of assignment, exposure, randomization, and metric instrumentation.
- [NIST TEVV-Athlon](https://www.nist.gov/artificial-intelligence/ai-research/tevv-athlon-framework-evaluating-ai-systems): a broader test, evaluation, verification, and validation frame for system evidence.
