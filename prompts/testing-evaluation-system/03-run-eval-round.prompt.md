# Prompt: Run One Testing & Eval Round

## Purpose

Apply [the task contract](../_shared/task-contract.md). Use this workflow for an authorized run, or its analysis sections for existing results. If the user asks for a run plan, use [design](01-design-evidence-system.prompt.md) and deliver cases, commands, analysis criteria, and prerequisites without executing them. Analysis-only requests do not authorize reruns or repairs.

Run exactly one reproducible measurement round for an existing testing and eval system. Execute and analyze the selected, authorized evidence first, then produce bounded decisions and a prioritized human-review queue. Use the approved protocol; method references can clarify a selected check but do not authorize adding methods, arms, or infrastructure to the round.

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

Recover the agreed version/acceptance scope, sufficient-evidence stopping rule, and resource ceiling from the plan. If a material rule is missing, propose it before scoring; ask only when the missing choice prevents a responsible run. Use [bounded-round guidance](references/bounded-round-design.md) as needed. An existing command or direct review can be the execution path; do not require a new platform merely to run a bounded check.

## Rules

1. Verify code, prompt, model, scenario, rubric, grader, and environment versions before running.
2. Preserve raw outputs and stage artifacts. Never rewrite them to make a report cleaner.
3. Keep deterministic correctness, quality, comparison, operational/economic, and online outcome evidence separate.
4. Do not reuse tuning cases as held-out evidence.
5. Do not trust a model judge beyond its documented human calibration and context boundary.
6. Blind comparative scoring to system identity.
7. Repeat stochastic cases according to the approved variance plan.
8. Stop at the authorized cost or side-effect boundary.
9. If measurement is invalid, inspect the grader, source context, fixtures and parser before drawing a product conclusion.
10. Append the round; do not overwrite prior conclusions.
11. Do not ask a human to inspect every output. Escalate only where human judgment materially changes interpretation, risk acceptance, or the next decision.
12. Do not equate agent analysis with human acceptance.

## Sequence

### 1. Preflight

For a run, validate the selected evidence mix; apply judge, benchmark, stage, and E2E checks only when those components are included. An unavailable harness or missing execution permission can block the run; still return the bounded preflight result. For existing-results analysis, inspect supplied manifests and artifacts and state any missing validity evidence.

- Verify repository and environment state.
- Confirm cases, baselines, versions, thresholds, hard caps, and authorization.
- Verify the selected runner and scoring path with an appropriate smoke/control case; use a known failure when checking failure detection.
- Confirm each selected criterion has an appropriate grader and interpretable result. Use [grader design](references/grader-design.md) only to clarify the approved scoring path.
- For a selected model judge, confirm sufficient context, schema-valid output and applicable validation evidence.

### 2. Execute

Execute only the components selected for this round. Skip this section for analysis-only work.

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

Record missing or invalid grading separately from product failures. Report assessment completion before comparing aggregate scores; neither a zero nor a pass should stand in for an unavailable judgment.

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

Address the relevant perspectives from the same evidence; combine them in one concise analysis for a small round:

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

Evaluate the pre-set acceptance and evidence requirements within the agreed scope. Stop safely at the authorized time/cost/retry boundary and wrap up partial results if needed. Record the termination reason separately from product acceptance: sufficient evidence, actionable failure, invalid/inconclusive evidence, or exhausted resources. Do not extend runs or change criteria merely to obtain a pass.

Choose one:

- `Ship / advance gate`
- `Iterate one lever`
- `Repair measurement first`
- `Collect more evidence`
- `Rollback`
- `Stop / remove complexity`

Name the single highest-value next lever and why. Do not make the product change in this round unless separately authorized.

On completion, record the actual scope and applicable versions, remaining risks, and consequential deferred checks with their triggers. A completed diagnostic round may support a repair rather than a release. If authorized usage feedback is available, briefly identify which privacy-safe failures should become cases or change priority; deeper product analysis is a separate task.

## Append-only round record

Write:

0. **Decision overview:** use [Decision-ready deliverables](README.md#decision-ready-deliverables). Lead with the supported decision or why evidence is insufficient, the material results, assessed scope/units, confidence limits, and next action or targeted human review. Link to the detailed evidence below. When analyzing saved results without rerunning, state that boundary here.
1. Purpose.
2. Hypothesis set before measurement.
3. Systems, cases, versions, and commands.
4. Target conclusion and pre-set thresholds.
5. Actual evidence by separate panel.
6. Measurement-validity assessment.
7. Relevant decision perspectives, combined where useful.
8. Triage queues and human-review packet.
9. Decision and accountable participant.
10. Stopping reason, acceptance scope, next lever, protected strengths, and consequential deferrals with triggers.
11. Open risks and missing evidence.
12. Links or paths to immutable/raw artifacts.

If the round cannot support a decision, say exactly which missing evidence prevents it. Do not upgrade directional evidence into a gate.
