# Delivery & Learning Workflow

Draft 0.1 · From an approved direction to a verifiable change and a useful feedback loop.

## Start and select mode

Apply [the task contract](../_shared/task-contract.md). Recover the user outcome, agreed direction, and authority from context. For implementation or readiness claims, inspect relevant repository instructions, current interfaces, worktree state, tests/evals, and environment evidence. For a slice plan, use available documents and bounded feasibility inspection; mark unknown file locations, versions, and runtime conditions as integration prerequisites.

Select `slice-plan`, `approved-slice`, `readiness-review`, or `learning-review`. If implementation is requested without a stable scope, first propose a bounded slice. Changes to permissions, public contracts, persistent data, deployment, or external communication require specific authority. Preserve unrelated user changes.

Apply sections by mode: `slice-plan` defines outcome, contracts, acceptance and future rollout/recovery; `approved-slice` implements and verifies the authorized change; `readiness-review` evaluates current release evidence without deploying; `learning-review` interprets existing delivery and outcome evidence. A plan does not require changed files, completed runs, or a release-ready artifact.

## 1. Establish the decision and delivery baseline

Keep three independent statuses:

- Decision: proposed / approved / superseded.
- Delivery: not started / implemented locally / integrated / deployed.
- Verification: unverified / checked in a stated environment / observed in production / accepted by the accountable user.

For current-state claims, record the actual commit, environment, evidence, and limitations. For future work, mark versions, interfaces, and acceptance checks as proposed. A deployment notification proves deployment, not user acceptance or output quality.

Identify the assumption whose failure would invalidate substantial work: capability, data access, contract compatibility, authority, quality, or acceptable operating cost. Define a bounded early check and the decision that follows failure. Paid calls and production writes remain gated.

## 2. Define one structural slice

Prefer a user-visible result spanning the real composition path over disconnected file or discipline tasks. Define:

| Contract field | Required content |
|---|---|
| Outcome | User task and observable completed result |
| Scope | Included behavior, exact surfaces, excluded work, approval reference |
| Dependencies | Upstream assumptions, producers, consumers, data, environment |
| Interfaces | Input/output schemas, states, error semantics, permissions, versions |
| Recovery | Retry safety, idempotency, partial/ambiguous outcomes, undo/rollback |
| Acceptance | Tests, eval criteria, manual checks, artifacts, and decision gates |
| Ownership | Implementer, reviewer, release decision, incident response |
| Handoff | Changed files, commands/results, open risks, next action |

Keep the path explicit: input → processing → result/action → persistence/read-back → recovery. Include only stages required for the actual feature.

## 3. Check boundaries before implementation

Use [AI System Implementation Audit](../ai-system-implementation-audit/ai-system-implementation-audit.en.md) when wiring or modularity is uncertain. It owns the detailed audit; do not duplicate it in the plan.

For material interfaces, inspect schema meaning separately from behavioral promises. Confirm producer/consumer, validation point, error and retry semantics, source/tenant scope, version compatibility, and migration. Frozen upstream artifacts enable local stage checks; the real E2E path still needs verification.

For AI systems, include prompt/context assembly, model/provider routing, tool permissions, memory read/write policy, deterministic validation, approval, traces, cost, and output quality. Check configured → wired → reachable → executed evidence. A prompt instruction alone does not enforce a permission boundary.

For a capability being removed, distinguish disable, deprecate, and delete. Plan dependent UI, prompts, registries, events, jobs, analytics, tests, stored records, and consumers. Run a paper removal drill in review mode; execute changes only when approved. Verify that disabled behavior does not continue incurring cost or side effects.

## 4. Implement and produce evidence

In `approved-slice`, implement only the approved boundary. Reconfirm authority when new dependencies materially expand scope. Reuse canonical schemas and shared logic where semantics match; do not create abstraction solely to reduce file count.

Use [Testing & Eval](../testing-evaluation-system/README.md) for the actual evidence run. Run authorized checks and analyze results before requesting human review. Preserve raw outputs, versions, first failing boundary, variance where applicable, and commands actually executed.

Separate rule failure, quality regression, invalid run, and missing coverage. Escalate hard-limit failures, ambiguous outcomes, high-risk trade-offs, and unresolved acceptance. Include the artifact, expected behavior, agent diagnosis, and one specific decision. Also inspect selected passes for false confidence.

## 5. Review release readiness

Create the smallest release checklist appropriate to risk:

- Exact artifact/configuration versions and environment differences.
- Compatibility and data migration with recovery evidence.
- Critical-path checks, output-quality evidence, and accepted residual risks.
- Rollout eligibility, exposure, duration, observability, and stop conditions.
- Flag/kill-switch ownership and whether it actually prevents execution.
- Rollback procedure, limits, and forward-fix path where data cannot be reversed.
- Support/incident contact, runbook, and read-back verification.

Distinguish release readiness from permission to release. Shadow/canary can add live evidence under an authorized exposure plan; determine the observation window and comparison conditions beforehand. An operational rollout comparison does not automatically establish causal product impact.

## 6. Close the learning loop

In `learning-review`, examine the released version, observation window, sample, affected segments, incidents, output review, user effort, and operating metrics. Link to [Analytics & Experiments](../product-analytics-experimentation/README.md) for behavior and causal questions; use the testing practice for quality or reliability questions.

For each important signal, separate observation, explanation, alternative explanations, proposed action, and required owner judgment. Decide whether it updates a regression case, grader calibration, product assumption, workflow, rollout, or documentation. Do not silently write model memory, tune on held-out cases, or expand automation from a single favorable result.

Close with a decision to keep, iterate, expand, pause, or retire. Record evidence and limits, including when no conclusion is yet supported.

## Deliverable by mode

For `slice-plan`, return the actual plan: user outcome, concrete behavior and interfaces, dependency order, representative acceptance cases, proposed verification commands where known, rollout/recovery design, assumptions, and execution prerequisites. Keep likely file locations labeled proposed; provide a bounded next slice rather than a plan to investigate how to plan it.

For `readiness-review`, return verified readiness by criterion, evidence gaps, minimum remedies, and a bounded release recommendation. An inaccessible environment limits the readiness claim; finish the independent checks. For `learning-review`, return evidence-linked observations, alternative explanations, proposed actions, and the decision they support.

## Implementation handoff

For `approved-slice`, return one navigable handoff, linking rather than duplicating existing sources:

1. User outcome, approved scope, and decision/delivery/verification status.
2. Commit, environment, changed files, and contract impact.
3. Run commands, results, evidence links, and checks not performed.
4. Release controls, migration, rollback limits, and operational owner.
5. Open risks, targeted human decisions, and the next bounded action.

Use existing maintained documents when available. Record intent, decisions, current structure, tasks, and verified facts with clear ownership; separate them into files only when change rate or collaboration requires it.

## Reusable sources

- [General restructuring workflow](../product-ux-rethinking/00-general-product-restructuring-workflow.en.md): structural slices and four-axis validation.
- [AI implementation audit](../ai-system-implementation-audit/ai-system-implementation-audit.en.md): harness, capability lifecycle, schemas, and removal drills.
- [Testing & eval](../testing-evaluation-system/README.md): repeatable evidence and human triage.
- [Context discipline](../context-update-discipline/scope-deletion-and-positive-rewrite.en.md): preserve clean current intent while retaining justified safety rules.
- [Google SRE: Canarying Releases](https://sre.google/workbook/canarying-releases/): bounded exposure, release automation, and operating evidence.

This draft is a routing and execution guide. Validate its usefulness on real deliveries before treating it as a mature installed skill.
