# Prompt: Run One Testing & Eval Round

## Purpose

Run exactly one reproducible measurement round for an existing testing and eval system. Execute and analyze all authorized automated evidence first, then produce bounded decisions and a prioritized human-review queue.

Do not change the system under test after seeing results unless this round explicitly authorizes measurement-infrastructure repair. Product changes belong to the next round so cause and effect remain interpretable.

## Round inputs

- Repository/worktree: `[absolute path]`
- Round ID: `[ID]`
- Decision this round supports: `[decision]`
- Pre-registered hypothesis: `[expected change]`
- Protected dimensions: `[must not regress]`
- System/baseline versions: `[versions]`
- Scenario partition: `[development / regression / calibration / held-out / release]`
- Approved runners and commands: `[commands]`
- Paid-call/network/side-effect allowance: `[exact boundary]`
- Time/cost ceiling: `[limit]`
- Decision owner: `[owner]`

## Rules

1. Verify code, prompt, model, scenario, rubric, grader, and environment versions before running.
2. Preserve raw outputs and stage artifacts. Never rewrite them to make a report cleaner.
3. Keep deterministic correctness, quality, comparison, operational/economic, and online outcome evidence separate.
4. Do not reuse tuning cases as held-out evidence.
5. Do not trust a model judge beyond its documented human calibration and context boundary.
6. Blind comparative scoring to system identity.
7. Repeat stochastic cases according to the approved variance plan.
8. Stop at the authorized cost or side-effect boundary.
9. If the measurement system is invalid, diagnose the ruler before judging the product.
10. Append the round; do not overwrite prior conclusions.
11. Do not ask a human to inspect every output. Escalate only where human judgment materially changes interpretation, risk acceptance, or the next decision.
12. Do not equate agent analysis with human acceptance.

## Sequence

### 1. Preflight

- Verify repository and environment state.
- Confirm cases, baselines, versions, thresholds, hard caps, and authorization.
- Run a deterministic smoke test and one known-failure control.
- Confirm the judge receives sufficient context and produces schema-valid output.

### 2. Execute

- Run deterministic tests and capture failures.
- Run stage evals and save frozen handoffs.
- Run real-composition E2E/replay as approved.
- Run baseline arms independently as approved.
- Capture latency, cost, retries, reliability, completeness, and human effort.
- Preserve raw and normalized artifacts with run and trace IDs.

### 3. Validate the measurement

Check for:

- missing or unequal context;
- fixture or schema drift;
- judge/parser errors;
- arm identity leakage;
- contaminated or duplicated cases;
- insufficient repeats or high variance;
- failed hard-cap detection;
- hidden fallback/model/provider changes;
- incomplete cost or human-effort accounting.

Classify questionable findings as product signal, measurement artifact, mixed, or unverified.

### 4. Analyze

Report:

- correctness failures by first diverging stage;
- per-dimension quality and segment breakdown;
- hard-cap violations;
- current-vs-prior and product-vs-alternative deltas;
- variance and uncertainty;
- operational and total-cost-per-usable-outcome evidence;
- protected-strength regressions;
- evidence absent for online/business impact.

Do not let a blended score hide a critical dimension, weak segment, hard cap, or uncertain result.

Cluster failures and suspicious passes by likely cause. Distinguish:

- product/system behavior;
- upstream data or context defect;
- harness, fixture, grader, parser, or environment defect;
- mixed evidence;
- unverified cause.

Produce three views from the same evidence:

- **Product:** result, affected goals/users/scenarios, supported decision, trade-off, and next product lever.
- **Engineering:** measurement validity, first diverging stage, reproducible artifact, likely cause, and next diagnostic or repair.
- **Quality & operations:** domain/workflow impact, safety/support/cost concern, judge disagreement, and adjudication need.

### 5. Triage agent and human work

Place every material finding into one queue:

- `No human action` — clear pass or already-understood result with no decision impact.
- `Agent follow-up` — reproducible diagnostic or measurement repair inside the authorized boundary.
- `Human review requested` — borderline/high-risk output, grader disagreement, novel cluster, protected regression, suspicious pass, or consequential product/domain judgment.
- `Blocked / unverified` — missing evidence, invalid measurement, inaccessible system, or authorization boundary.

For each human-review item provide:

1. exact artifact or trace;
2. minimum relevant context;
3. criterion and observed result;
4. agent diagnosis and uncertainty;
5. why automation is insufficient;
6. the precise decision or score requested from the human.

Include a small risk-based sample of apparent passes when judge error, reward hacking, or false confidence is plausible. Do not sample mechanically when it adds no information.

### 6. Decide

Choose one:

- `Ship / advance gate`
- `Iterate one lever`
- `Repair measurement first`
- `Collect more evidence`
- `Rollback`
- `Stop / remove complexity`

Name the single highest-value next lever and why. Do not make the product change in this round unless separately authorized.

## Append-only round record

Write:

1. Purpose.
2. Hypothesis set before measurement.
3. Systems, cases, versions, and commands.
4. Target conclusion and pre-set thresholds.
5. Actual evidence by separate panel.
6. Measurement-validity assessment.
7. Three decision views.
8. Triage queues and human-review packet.
9. Decision and accountable participant.
10. Next lever and protected strengths.
11. Open risks and missing evidence.
12. Links or paths to immutable/raw artifacts.

If the round cannot support a decision, say exactly which missing evidence prevents it. Do not upgrade directional evidence into a gate.
