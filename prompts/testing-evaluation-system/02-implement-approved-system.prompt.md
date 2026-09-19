# Prompt: Implement an Approved Testing & Eval System Slice

## Authorization boundary

Apply [the task contract](../_shared/task-contract.md). Use this workflow only for requested implementation. Recover the agreed scope from conversation or a referenced proposal; a literal proposal ID is optional when the authorized change is already clear. A plan-only request routes to [design](01-design-evidence-system.prompt.md).

Implement only the approved proposal and structural slice below:

- Approved proposal ID: `[ID]`
- Approved scope: `[exact scope]`
- Repository/worktree: `[absolute path]`
- Allowed files/systems: `[paths and systems]`
- Explicit non-goals: `[items]`
- Paid-call/network/side-effect authorization: `[none or exact allowance]`
- Acceptance evidence: `[criteria]`

If the repository no longer matches the approved baseline, stop and report the drift before changing architecture. Do not reinterpret approval as permission for a broader cleanup.

## Before implementation

1. Read repository instructions and the approved design/audit.
2. Verify branch, commit, worktree, dirty state, dependencies, and existing test status.
3. Identify user-owned or unrelated changes and preserve them.
4. Confirm the exact source-of-truth files for stage contracts, scenarios, rubric, configuration, and commands.
5. Run the narrow existing baseline checks that will prove non-regression.
6. Mark any unverified premise that affects the slice.

## Implementation requirements

Apply the requirements below to components in the approved slice. Use method references only to clarify those components; they are not an instruction to add a benchmark, judge, replay system, or rollout mechanism outside the agreed scope.

### 1. Preserve separation of concerns

- Deterministic tests and judged evals may share a harness, but result types, failure semantics, graders, and report panels must remain explicit.
- Quality dimensions and operational/economic metrics remain separate panels.
- Eval code calls the real production contract or a thin adapter; do not create a parallel implementation of business logic.
- Scenario data is separate from graders and runner orchestration.
- Generated reports do not become hand-maintained sources of truth.

### 2. Observe relevant stages and isolate when needed

- Use the actual stage contracts; capture or reference intermediate inputs/outputs needed for failure attribution.
- Add independent replay or a stage runner only where the approved design justifies it. Several stage checks may share the real-path runner and report.
- Preserve case/run identity and enough provenance to distinguish upstream-input and current-stage defects.
- Validate deterministic invariants before semantic grading where they are prerequisites.
- Keep missing product capabilities separate from measurement setup; implement product repairs only within their approved scope.

### 3. Record reproducible evidence

Record applicable versions and settings in existing logs or a compact manifest; a new manifest service or schema is not required:

- code/build;
- scenario and fixture;
- prompt/instructions;
- model/provider/settings;
- tools/retrieval/context;
- rubric/grader;
- environment;
- raw and normalized output;
- checks, scores, hard caps, operational metrics, and review status.

Do not copy secrets or sensitive raw data into reports.

### 4. Keep execution modes explicit

Separate deterministic stub, recorded replay, gated live, and production paths. Default commands must not make paid calls, write production data, send messages, or execute irreversible actions.

### 5. Implement only approved graders

- Map each selected criterion to its primary grader, result format and applicable validation status. Use [grader design](references/grader-design.md) only to clarify the approved scope.
- Prefer deterministic or programmatic graders where valid.
- Model judges must use structured output and runtime validation.
- A model judge that is not human-calibrated must be labeled provisional and cannot become a release gate.
- Preserve per-dimension reasons and hard-cap evidence.

### 6. Produce one real structural slice

Implement the evidence mix selected in the approved design. Select applicable items below; a test-only or eval-only slice need not add unrelated infrastructure:

- a deterministic stage/contract test;
- a stage-level quality eval;
- a real-composition E2E or replayed E2E;
- a reconstructable artifact;
- separated correctness, quality, comparison, and operational evidence;
- agent analysis that groups failures and distinguishes product signal from measurement defects; persistent automation only when warranted;
- a prioritized human-review queue with explicit escalation reasons and requested decisions;
- a report or decision entry tied to the approved question.

### 7. Keep it removable and reusable

- Use one clear entry point or registry for scenarios and graders.
- Avoid hidden global state and duplicated fixtures.
- Put project-specific dimensions and thresholds in project-owned configuration/contracts, not generic harness code.
- Ensure a grader, scenario group, provider, or content approach can be disabled without leaving runner, report, or CI references behind.

### 8. Implement agent analysis and human escalation

- Analyze all authorized results before asking for human review.
- Address the relevant product, engineering and quality/operations decisions in one concise analysis; split views only when useful to different readers.
- Classify results as `No human action`, `Agent follow-up`, `Human review requested`, or `Blocked / unverified`.
- Escalate hard-cap/high-risk cases, borderline thresholds, grader disagreement, novel clusters, protected regressions, suspicious passes, and decisions requiring product/domain judgment.
- For every escalated item include the artifact, relevant context, criterion, agent assessment, uncertainty, and exact decision requested.
- Include a small, risk-based sample of apparent passes when needed to detect false confidence or grader hacking.
- Preserve human decisions as labels, adjudication records, or proposed rubric/case updates; never silently rewrite raw results.

## Verification

Run, as applicable:

- affected unit/stage/contract tests;
- failure and negative assertions;
- the narrow real-composition path;
- report generation;
- typecheck/lint/build relevant to changed files;
- a no-network/no-paid-call default-path check;
- replay from a saved artifact;
- one known failing case proving the harness detects failure.
- one synthetic or known case proving the escalation queue routes the right item and includes the required review context.

Do not claim unrun checks passed. Distinguish implementation success, test evidence, live verification, judge validation, and product acceptance.

## Required handoff

0. **Decision overview:** use [Decision-ready deliverables](README.md#decision-ready-deliverables). Summarize what changed, what the checks establish within the implemented scope, remaining decision-critical uncertainty, and the recommended next action. A successful implementation is not automatically product acceptance. For a short chat-only handoff, put the overview first without creating a separate document solely for this structure.
1. Outcome first: what the approved slice now proves.
2. Files changed and the responsibility of each.
3. Commands run and exact results.
4. Sample artifact/report location.
5. Automated analysis summary and human-review queue location.
6. Evidence labels and remaining unverified areas.
7. Known limitations, cost/live-call boundaries, and judge status.
8. Migration, rollback, disable, and cleanup procedure.
9. Next proposed slice, clearly unimplemented and requiring separate approval.

If acceptance cannot be met inside the approved boundary, stop with a concrete blocker rather than expanding scope.
