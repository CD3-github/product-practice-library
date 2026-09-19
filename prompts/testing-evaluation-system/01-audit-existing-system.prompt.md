# Prompt: Audit an Existing Testing & Eval System

Assess whether the current evidence system supports the requested decision. Apply [the task contract](../_shared/task-contract.md). This route examines present implementation; use [design](01-design-evidence-system.prompt.md) for a prospective strategy. For an explicit audit-plus-design request, complete a scoped audit and then the requested proposal, keeping facts and proposals separate.

## Establish the audit boundary

Recover the target feature, decision, repository/data location, revision, supplied contracts, and allowed checks from context. Read repository instructions and inspect the relevant entry points. Follow actual calls to the stages and reports necessary for the audit. Mark inaccessible paths as `unverified`; absence from inspected sources is not proof of absence everywhere. Stop searching when the remaining access gap is clear and report its effect on conclusions.

Use source inspection and safe, scoped diagnostic checks appropriate to the review request. Explicit code-only or no-run limits take precedence. Inspect command side effects before execution; paid calls, production access, persistent mutations, and release need their corresponding authorization. Separate `documented intent`, `verified in code`, `verified by test`, `verified at runtime`, `measured`, `proposed`, and `unverified` claims.

## Inspect decision-critical coverage

Trace user input → processing → delivered result/read-back, including relevant failures and recovery. Record stage responsibilities, actual entry points, input/output contracts, side effects, invariants, quality dimensions, isolation/replay points, and existing evidence.

Inventory only relevant assets:

- Unit, stage, contract, integration, E2E, failure, authority, migration, and smoke checks.
- Code metrics, model judges, human review, online signals, and their validity limits.
- Scenario registry, fixtures, development/regression/calibration/held-out usage.
- Baselines, comparison fairness, quality and operational metrics.
- Runners, manifests, raw artifacts, reports, CI, thresholds, gates, and decision history.
- Analytics identity/event/exposure contracts where they affect this decision; deeper behavior or causal work belongs to the sibling analytics practice.

Classify material assets as Keep, Connect, Fix, Replace, Deprecate, Remove, Propose, or Unverified. Check for:

- Brittle exact assertions used for subjective quality, or deterministic invariants delegated to judges.
- Stage-only coverage without composition evidence, or E2E-only coverage without failure localization.
- Unwired scripts, duplicate fixtures, conflicting rubrics, stale reports, and hidden live/paid calls.
- Unsupported judge scores, incomplete context, contaminated holdouts, and unfair comparison arms.
- Blended scores hiding hard failures, weak segments, cost, latency, or uncertainty.
- Material input, context or customization boundaries missing from actual cases; consult [edge-case design](references/robustness-design.md) only for applicable dimensions. Check expected and observed behavior, not category names alone.
- Confusion between numerical output and reliable judgment, or duplicated graders without a distinct purpose; use [grader design](references/grader-design.md) when score validity is material.
- Offline scores presented as business impact, or observed movement presented as causation.

Judge choice follows the criterion, not the producer technology. Fault attribution may be checked offline with controlled failures or replay. Inspect actual case use before deciding whether it supports regression, calibration, or held-out claims. For a material gap in a selected method, consult the relevant [method reference](01-design-evidence-system.prompt.md#1-design-the-evidence-selection-map). A method's absence is a finding only when it leaves a consequential decision or risk unsupported; do not score completeness by the number of techniques present.

## Return

0. **Decision overview:** use [Decision-ready deliverables](README.md#decision-ready-deliverables). State the bounded assessment, recommended action, assessed scope/units, and the few findings or unknowns that change the decision. Keep detailed inventories and findings below; preserve verification limits in the overview.
1. Calibrated assessment: what works, what fails, and what remains unknown for this decision.
2. Scoped pipeline and evidence inventory, with source revision and access/verification boundaries.
3. Prioritized findings: observed behavior, expected requirement, exact file/line or trace, consequence, and minimum remedy. Label design recommendations separately from defects.
4. Checks performed and results; checks not performed and what they leave unverified.
5. Recommended next action and any current blocker. Complete independent audit areas before asking for access.

An audit can be complete within a stated evidence boundary even when the product is not ready to ship. Recommend a follow-up design only when needed; produce it in this run only when requested. Code fixes, test execution, paid calls, production changes, and release each remain within the user's actual authorization.
