# Product Evidence Workflow

Use this workflow to design product measurement, analyze behavior, design an experiment, or interpret experiment results. Select exactly one primary mode for the current run while preserving links to adjacent evidence.

Apply [the task contract](../_shared/task-contract.md). Design modes deliver proposed contracts and plans from available context; actual data is required for measured conclusions. Bound source inspection to the requested deliverable. Mark unknown baseline rates, traffic, schemas, and permissions as design assumptions or execution prerequisites where a useful plan can still be completed.

## Inputs

Start from the available context:

- product decision or uncertainty;
- eligible population, analysis unit, and lifecycle stage;
- repository, analytics workspace, warehouse, exported dataset, or experiment platform;
- current identity, event, metric, cohort, assignment, and exposure definitions;
- relevant releases, feature flags, quality evidence, and operational incidents;
- privacy, access, runtime, mutation, and communication boundaries.

Inspect available sources before asking for missing information. Mark unavailable facts `unverified`; do not infer definitions from chart labels alone.

## Select the mode

Choose the mode that matches the requested decision:

- `measurement-design`: propose product measurement contracts and validation.
- `measurement-audit`: assess existing instrumentation and data validity.
- `behavior-analysis`: understand adoption, activation, funnels, retention, cohorts, journeys, or friction.
- `experiment-design`: decide whether and how to run a controlled experiment.
- `experiment-analysis`: validate and interpret a completed or running experiment.

If the request mixes modes, identify the immediate decision and complete the smallest coherent mode first. State the next route rather than silently expanding scope.

## Evidence preflight for audits and results analysis

Before interpreting results:

1. Restate the decision, claim type, population, unit, window, and action the evidence may change.
2. Locate repository and data-source instructions and preserve their authority boundaries.
3. Trace each decision-critical metric to its identity, event, eligibility, version, and window definitions.
4. Verify data freshness, completeness, deduplication, ordering, identity joins, exclusions, and release coverage.
5. For experiments, verify assignment, exposure, eligibility, unit consistency, and sample-ratio behavior.
6. Record queries, parameters, data windows, versions, and artifacts required to reproduce the result.
7. Separate observed fact, interpretation, hypothesis, and causal claim.

In design modes, specify these checks as the future validation plan. Verify supplied facts only where needed to choose the design; complete the plan with labeled parameters when data or implementation does not yet exist.

Route model/output quality, deterministic correctness, graders, golden sets, or release-quality gates to the sibling Testing & Evaluation practice. Join the evidence only at the product decision.

## Mode: `measurement-design`

### Work

1. Map each product decision to the behavior or outcome that can inform it.
2. Reuse supplied identity, event, metric, cohort, exposure, dashboard, and query definitions where applicable.
3. Specify producers, consumers, transformation boundaries, and intended validation points. Inspect actual paths only when compatibility changes the design.
4. Label reused verified definitions, proposed definitions, and unverified dependencies separately.
5. Propose the minimum contracts and instrumentation needed for one end-to-end decision slice.
6. Define validation checks, ownership, versioning, privacy handling, and retirement rules.
7. Keep implementation proposal-only unless the user explicitly authorizes changes.

### Return

- decision-to-measurement map;
- proposed identity, event, metric, cohort, and exposure contracts, including representative event payloads and counting rules;
- reuse decisions and supporting sources where inspected;
- minimum implementation slice and validation plan;
- assumptions, execution prerequisites, and questions that genuinely block this design.

## Mode: `measurement-audit`

### Work

1. Scope the decisions and existing signals to inspect; run the evidence preflight only within authorization.
2. Trace relevant emitters, transformations, identity joins, metric definitions, reports, and consumers.
3. Check lifecycle coverage, duplication, ordering, exclusions, privacy/deletion, versioning, and unused signals.
4. Classify evidence as present and valid, present with caveat, missing in inspected scope, unused, duplicated, or unverified.
5. Separate documented intent, code behavior, queried data, and observed runtime evidence. Bound conclusions when access is missing.

### Return

- Scoped current-state map and evidence limitations.
- Strengths and actionable findings with exact source locations, consequences, and minimum remedies.
- Checks performed and results; unperformed checks and remaining uncertainty.
- Recommended repair or design follow-up. Produce a full redesign only if requested.

## Mode: `behavior-analysis`

### Work

1. Reproduce each requested metric from its contract before using an existing dashboard number.
2. Establish baseline level, historical variance, and relevant release or incident context.
3. Analyze the workflow at the unit that matches the decision: adoption, activation, funnel, retention, journey, cohort, or effort.
4. Compare pre-defined segments with their sample sizes and uncertainty; inspect distributions as well as averages.
5. Check whether observed movement can be explained by population mix, seasonality, measurement drift, release coverage, quality, latency, incidents, or cost.
6. Generate competing explanations and identify evidence that would distinguish them.
7. Recommend the smallest next step: measurement repair, qualitative research, product change, controlled experiment, or continued monitoring.

### Return

- decision summary and claim boundary;
- reproducible analysis with source, query, window, exclusions, and versions;
- baseline, key patterns, uncertainty, and affected populations;
- plausible explanations and disconfirming or missing evidence;
- prioritized next action and any question requiring human judgment.

Do not convert association into causation. Label exploratory slices and post-hoc hypotheses.

## Mode: `experiment-design`

### Feasibility gate

First decide whether a controlled experiment is appropriate. Check traffic, assignment control, exposure observability, interference, ethical and privacy constraints, implementation cost, reversibility, decision value, and whether a simpler analysis can answer the question.

If inputs are unknown, give a conditional feasibility recommendation. Specify the baseline rate/variance, traffic, effect size, and allocation parameters needed for power and duration calculations; provide justified illustrative scenarios if useful. A numeric sample-size promise requires those inputs, but the rest of the experiment design can be completed. A launch requires resolved safety, consent, assignment, and exposure conditions.

### Work

Draft the following pre-registration for approval before launch:

- problem, hypothesis, and intended mechanism;
- eligibility, assignment unit, analysis unit, and exclusion timing;
- control, treatment, and the single intended difference between variants;
- assignment, exposure, contamination, fallback, and version semantics;
- one primary metric, secondary diagnostics, and quality/safety/business guardrails;
- baseline rate or variance, practical-significance threshold, minimum detectable effect, power assumptions, and expected duration;
- statistical model, confidence or decision rule, and multiple-comparison policy;
- sample-ratio, instrumentation, novelty, seasonality, interference, and peeking checks;
- ramp, stopping, rollback, follow-up, and decision rules.

Use A/A when new or materially changed assignment, exposure, metric, or analysis infrastructure needs validation. Treat A/A as an infrastructure check, not an uplift estimate.

### Return

- feasibility decision and rationale;
- experiment contract and implementation dependencies;
- metric and guardrail contracts;
- validity checks and analysis plan;
- ramp, rollback, and decision table;
- unresolved product, domain, or risk decisions for humans.

## Mode: `experiment-analysis`

### Work

1. Compare the actual run with the pre-registered contract.
2. Validate eligibility, assignment, exposure, units, versions, duration, and stopping behavior.
3. Check sample-ratio mismatch, missing exposure, contamination, instrumentation drift, and data completeness.
4. Report the primary effect estimate with uncertainty and practical significance.
5. Review guardrails and pre-registered secondary metrics.
6. Separate intent-to-treat from triggered or exposed analyses and state the trade-off.
7. Keep pre-defined heterogeneous effects separate from exploratory slices; account for multiple comparisons.
8. Connect the result to quality, reliability, cost, and operational evidence without changing the causal boundary.
9. Record limitations, decision, rollout or rollback plan, and follow-up measurement.

### Return

- validity status: `valid`, `valid with caveat`, `measurement repair required`, or `unverified`;
- effect estimate, uncertainty, practical significance, and metric versions;
- guardrail and segment results;
- interpretation and alternative explanations;
- bounded recommendation: ship/expand, iterate/retest, keep control/stop, collect more evidence, repair/rerun, or roll back;
- linked analysis manifest and decision record.

## Agent and human boundary

For human-facing explanations, lead with the product question and the relationship between concepts. Define an unfamiliar term at first use with a short example; keep implementation detail in a linked reference or expandable section where the format supports it. Preserve exact technical names in contracts. Use `experiment assignment` for the product concept and `bucketing` for its implementation; explain cohorts separately.

The agent performs reproducible checks, analysis, alternative-explanation review, and first-pass triage. Escalate only the decisions that require product intent, domain interpretation, acceptable risk, practical value, or authorization for implementation, rollout, communication, or live side effects.

Never claim that a query, test, or tool run constitutes human acceptance. Never modify production data, instrumentation, feature flags, experiments, or dashboards without explicit authorization.
