# Prompt: Comprehensive AI Product and Agent-System Audit

## Purpose

Perform an evidence-first, end-to-end, actionable audit of an existing AI product, agent workflow, generation pipeline, or orchestration harness.

This is not a routine code-style review, and it must not assume that the current architecture should survive with minor edits. Determine the system's actual capabilities, complete execution path, module boundaries, removability, schema and contract quality, testing coverage, and evaluation coverage. Then propose changes that reduce iteration cost while improving output quality and execution safety.

## Context I will provide

Apply [the task contract](../_shared/task-contract.md). This route audits an existing system. Test/eval planning uses [evidence design](../testing-evaluation-system/01-design-evidence-system.prompt.md). An audit-plan request delivers scope, methods, evidence requirements, and acceptance criteria without conducting the audit. Bound actual audits to accessible, authorized sources; missing code or runtime evidence limits current-state claims, not explicitly proposed designs.

- Product or feature: `[name and short description]`
- User outcome: `[what the user needs to accomplish]`
- Repository or worktree: `[absolute path / URL]`
- Relevant entry points, routes, or packages: `[if known]`
- Product, design, or API documents: `[paths / URLs]`
- Runtime environment and commands: `[if known]`
- Current models, providers, tools, and data sources: `[if known]`
- Known concerns: `[if any]`
- Product maturity: `[prototype / internal / beta / production / unknown]`
- Audit mode: `[read-only audit + proposal / approved narrow implementation]`

Do not guess unknown details. First inspect the repository, configuration, tests, runtime behavior, and traces. Anything that still cannot be established must be labeled `Unverified`.

---

## Core operating principles

1. **Verify before judging.** Inspect the sources needed for the audit: repository instructions, documents, code, schemas, configuration, tests, fixtures, migrations, or telemetry. Execute checks only when authorized and safe; honor planning-only and no-run limits.
2. **Keep truth states separate.** `Documented`, `Configured`, `Implemented`, `Registered`, `Wired`, `Reachable`, `Executed`, `Measured`, and `Proposed` are not interchangeable.
3. **Do not invent findings or praise indiscriminately.** Say what is good when evidence shows that it is good. Label missing evidence `Unverified`. A review that cannot identify anything done well is not rigorous; it is uncalibrated.
4. **Do not anchor on the current layout, prompt, pipeline, or class names.** Start with the user outcome, system responsibility, risk, and quality bar, then decide what should remain.
5. **Preserve required behavior and quality evidence.** Choose code checks, human review or model judgment for each criterion. Keep mandatory constraints visible alongside graded quality; neither an aggregate score nor a schema pass establishes all aspects of system quality.
6. **Treat shutdown and deletion as first-class architecture requirements.** Modularity is not a file count. A capability should be independently replaceable, disableable, replayable, verifiable, and removable.
7. **Inspect before asking.** Ask only questions that cannot be answered from code, configuration, documentation, runtime state, or traces, and whose answers would materially change product responsibility, safety, audit conclusions, or evaluation design.
8. **Default the first pass to read-only.** Do not perform broad rewrites, delete public contracts, migrate persistent data, or change production behavior until I approve a specific proposal.

---

## 1. Establish the source-of-truth map and evidence ledger

First identify:

- The current repository, branch, commit, worktree, and dirty state.
- Repository-level instructions and constraints.
- The locations of product documents, real code, APIs and schemas, runtime configuration, fixtures, tests, evals, telemetry, and live behavior.
- Which sources are authoritative and which are examples, historical remnants, or proposals.

Use these evidence labels for material claims:

- `Verified in code`: directly supported by the current checkout.
- `Verified by test`: supported by a test actually run; record command and scope.
- `Verified at runtime`: the relevant path was executed and a locatable output or trace exists.
- `Measured`: backed by real quality, business, or operational data; state timeframe and sample.
- `Documented intent`: a document states the intent but does not prove implementation.
- `Inferred`: a reasoned synthesis from multiple pieces of evidence; explain the inference.
- `Proposed`: recommended here but not implemented.
- `Unverified`: currently unknown; identify the missing evidence.

Do not treat fixture success, a successful tool call, HTTP 200, a passing unit test, or a visible UI as proof that the user outcome was achieved.

---

## 2. Build the real end-to-end system and harness map

Trace the real implementation from user input to final result and feedback loop, rather than reproducing the documented ideal. Inspect every applicable stage:

`trigger/input → identity & authorization → normalization → context assembly/retrieval/memory → routing/planning → prompt construction → model/tool execution → validation/guardrails → post-processing/ranking → approval/action → persistence → delivery/read-back → telemetry → evaluation/feedback`

Not every system needs every stage. Do not invent absent stages for completeness; identify an absent stage as a gap only when it is actually required.

For each stage, record:

| Area | Question |
|---|---|
| Responsibility | What is this stage solely responsible for, and explicitly not responsible for? |
| Owner | Which module, service, or team owns it? |
| Entry point | How is it invoked, registered, or triggered? |
| Inputs | What are the input schema, source, required/optional fields, and defaults? |
| Outputs | What are the output schema, state, errors, and provenance? |
| Contract | What do producer and consumer promise, and how is that verified? |
| State | Is it stateless, session-scoped, job-scoped, or durable? |
| Side effects | Does it write data, send a message, invoke a paid model, or execute an external action? |
| Failure/recovery | How are timeout, retry, fallback, partial failure, resume, and cancellation handled? |
| Observability | Are logs, traces, metrics, cost, versions, and correlation IDs visible? |
| Control | Are there configuration, feature flags, kill switches, rollout, and rollback controls? |
| Verification | Which tests, evals, fixtures, and runtime evidence cover it? |

Produce a concise system map and identify implicit logic, duplicated logic, and responsibility leakage across stages.

---

## 3. Audit the AI harness explicitly

Do not stop at “which model is used?” or “what does the prompt say?” Determine whether the harness turns models, context, tools, state, authority, quality, and operations into a controlled system.

### 3.1 Instructions and prompt assembly

- Is the precedence and assembly order of system, developer, user, and tool instructions explicit?
- Does every prompt have a stable ID, version, owner, change history, and rollback path?
- Are instructions composed from modules, or copied into variants that drift independently?
- Does user correction update canonical intent instead of accumulating reactive negative constraints?
- Is each prompt/template loaded by a current execution path? Are unused, duplicate, or stale versions present?
- Is prompt input assembled from a schema-defined context object rather than scattered string concatenation?

### 3.2 Model and provider routing

- What drives selection: task, risk, latency, cost, modality, or tenant?
- Are routing and fallback explicit, observable, and testable? Does fallback alter capability or output schema?
- Are model, provider, temperature, seed, tool mode, token budget, timeout, and related settings versioned and recorded in traces and eval results?
- Are deterministic stubs, recorded replays, gated live calls, and production calls clearly separated?
- Do paid calls and irreversible actions have budgets, permissions, and confirmation boundaries?

### 3.3 Context, retrieval, and memory

- Can every context source be traced with freshness, scope, tenant, permissions, and provenance?
- Are retrieval query, ranking, truncation, and token allocation observable and evaluable?
- Are session memory, durable memory, user profile, repository state, and live data explicitly separated?
- Who may write memory? When is it updated, expired, deleted, or corrected?
- Can an output identify which context supported its material decisions? How are stale and conflicting data handled?
- Are sensitive data minimized or redacted in logs, prompts, eval datasets, and traces?

### 3.4 Tools, capabilities, and authority

- Is the tool registry canonical? Do tool declarations match actual implementations?
- Are auth, scope, tenant, rate limit, timeout, retry, idempotency, and side effects explicit for every tool?
- Are `read`, `draft`, `propose`, `approve`, `execute`, and `verify` distinct authority states?
- Can the agent expand scope or perform irreversible operations without user or policy authorization?
- Are tool results schema-validated? Does apparent tool success require durable read-back before completion?
- When a tool is disabled or unavailable, is it removed from prompts, routing, and UI so it cannot mislead the model or user?

### 3.5 State, orchestration, and recovery

- Are the state machines for run, turn, step, job, artifact, approval, and execution record explicit?
- How are timeout, retry, backoff, duplicate delivery, race, concurrency, cancellation, and resume handled?
- Can retry duplicate a side effect? Are idempotency keys and at-least-once/exactly-once semantics explicit?
- Can intermediate artifacts be persisted, replayed, rerun independently, and compared?
- Are failures understandable and recoverable for the user, rather than visible only in logs?

### 3.6 Output quality, guardrails, and validation

- Which constraints require deterministic enforcement, which allow model judgment, and which require human approval?
- Is structured output schema-validated at the boundary, with explicit repair and failure behavior?
- How are claims, citations, policy, brand, catalog, localization, and action readiness validated?
- How does the product represent uncertainty, missing context, conflict, and unsupported specificity?
- Are there fake protections that exist only as prompt instructions without post-generation enforcement?

### 3.7 Operations, observability, and deployment

- Can every run be reconstructed from prompt/version, model/config, context sources, tool calls, stage outputs, latency, cost, errors, and final disposition?
- Do logs and traces protect privacy while remaining sufficient for debugging?
- Are local, test, staging, and production differences explicit, or hidden in environment variables?
- Are feature flags, kill switches, rollout percentage, tenant allowlists, rollback, and incident ownership clear?
- How are eval gates, release gates, quality drift, cost drift, and provider regressions monitored?

### Harness question policy: should I ask, and what should I ask?

Inspect the repository, configuration, deployment manifests, secret interfaces, tests, traces, and dashboards first. Ask me only when one of the following remains unknown and the answer would materially change the review:

1. **Authority:** May the agent only recommend or draft, or may it act on the user's behalf? Which actions require confirmation?
2. **Quality bar:** What counts as good output, who judges it, and what failure or human-edit rate is acceptable?
3. **Risk tier:** What is the worst outcome of an error? Does the system touch money, privacy, publishing, external communication, or compliance?
4. **Context policy:** What user or company data may be read, stored, and reused? For how long, and how is it deleted?
5. **Model policy:** May providers be changed, cheaper models substituted, live calls made, or data uploaded? What are the cost and latency ceilings?
6. **Ownership:** Who owns prompts, schemas, eval datasets, runtime, incidents, and go/no-go decisions?
7. **Maturity:** Is this a demo, prototype, internal tool, beta, or production system? Which capabilities are only future intent?
8. **Success and feedback:** Which user outcome, behavior, or human review closes the learning loop after release?

Label each question:

- `Blocking`: safe progress is impossible without the answer.
- `Material`: work can proceed under an explicit assumption, but the answer changes priorities.
- `Optional`: useful for optimization, but not required for the current audit.

For every question, state current evidence, a proposed default assumption, and the consequence if that assumption is wrong. Do not ask me to provide facts that can be found in the system.

---

## 4. Audit the capability lifecycle

For every critical capability, event, prompt, content approach, tool, schema, API, worker, UI surface, and telemetry hook, build a lifecycle matrix:

| Capability / Artifact | Documented | Configured | Implemented | Registered | Wired | Reachable | Executed | Measured | Consumer / Owner | Verdict |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|---|

Use only these verdicts:

- `Keep`: clear purpose, owner, consumer, and verification.
- `Connect`: a reasonable implementation whose path is incomplete.
- `Fix`: in use, but its contract, reliability, or quality is insufficient.
- `Flag`: needs an independent control or rollout boundary.
- `Deprecate`: still has consumers or data and requires migration.
- `Remove`: no valid consumer or superseded; safe deletion is possible.
- `Unverified`: evidence is insufficient.

Actively look for:

- Orphan modules, unregistered handlers, and event consumers that can never fire.
- Schemas or events with no producer or consumer.
- Capabilities claimed by UI, documentation, or prompts but absent from the runtime path.
- Implementations with no reachable route, registry entry, feature flag, or entry point.
- Fixtures or mocks presented as live capability.
- Duplicate prompts, validators, types, configuration, or business rules in different directories.
- Stale flags, shadow configuration, ineffective environment variables, and retired model names.
- Tests preserving obsolete behavior or testing helpers without testing the real composition path.
- The inverse gap: live behavior without documentation, schema, owner, tests, evals, telemetry, or rollback.

Every finding must include specific files and line numbers. For runtime or configuration findings, provide a trace, command, or reproducible path. Recommend a minimum fix, not only an abstract principle.

---

## 5. Audit modularity, replaceability, and removability

Do not use “many files,” “an interface exists,” or “there is a feature flag” as sufficient proof of modularity. For each important module, event, content approach, provider, tool, and pipeline stage, check:

- A single, explicit entry point or registry.
- Explicit dependency injection and contracts rather than hidden imports, global singletons, or shared mutable state.
- Narrow, stable input and output schemas.
- No hidden side effects during import, construction, or registration.
- Clear local ownership of state, storage, telemetry, caching, and retries.
- One configuration or flag can disable it, and disabled capability disappears from UI, prompts, routing, tool lists, and analytics.
- An implementation can be replaced without exposing provider-specific details to every consumer.
- Reusable logic has one canonical implementation rather than several approximate copies.

Run a paper or real removal drill for capabilities likely to be removed or changed:

1. Disable through one explicit control point.
2. The system still boots and core paths and CI still pass.
3. No orphan references remain in UI, prompts, routers, registries, schemas, events, listeners, jobs, analytics, docs, or evals.
4. Existing data, queue messages, caches, and persisted state have migration, ignore, or retention rules.
5. Downstream consumers tolerate capability absence or version change.
6. A negative assertion proves disabled behavior does not continue silently or keep incurring cost.
7. The capability can be rolled back or re-enabled, with the restored state understood.

Classify each result as `Cleanly removable`, `Removable with migration`, `Tightly coupled`, or `Unverified`.

For a content approach or strategy, prefer a registry plus a typed strategy contract. Ideally, removing one approach deletes one implementation and one registration, rather than requiring edits to prompts, routers, UI, analytics, evals, and scattered conditionals.

Keep these operations distinct:

- `Disable`: stop use temporarily while retaining code and data.
- `Deprecate`: stop new use and migrate consumers or data.
- `Delete`: remove implementation, contract, data responsibility, and every reference.

---

## 6. Audit schemas and contracts

Separate these layers instead of forcing one large schema to serve all purposes:

- **Domain schema:** business facts and state.
- **Transport/API schema:** process boundaries, pagination, errors, and compatibility.
- **Storage schema:** persistence, indexes, retention, and migration.
- **Event schema:** what happened and its correlation/causation.
- **Agent/tool contract:** what a model or tool may receive and return.
- **View model:** exactly what the UI needs to display and operate.
- **Evaluation record:** scenario, versions, result, scores, and evidence.

Check each contract for:

- Names that express business semantics rather than current implementation details.
- Explicit meanings for required, optional, nullable, absent, and default.
- Enums, discriminated unions, and state machines where free-form strings are unsafe.
- Explicit IDs, tenant, actor, subject, correlation ID, causation ID, and idempotency key.
- Explicit time, timezone, currency, units, locale, precision, and ordering semantics.
- Propagated provenance, freshness, confidence, and verification state for material data.
- Permission, authority, approval state, and side-effect classification in the contract rather than informal caller assumptions.
- An error envelope distinguishing validation, authorization, retryable, provider, partial-success, and permanent failures.
- Schema version, backward and forward compatibility, migrations, deprecation window, and unknown-field policy.
- Contract tests for producers and consumers, plus explicit change ownership.
- Actual runtime validation at boundaries; a TypeScript type, prompt, or document is not runtime validation.
- No unbounded `any`, catch-all `metadata`, hidden defaults, or same-name/different-meaning fields.
- Types, validators, and documentation generated or derived from a canonical schema where useful, to prevent drift.

A recommended event envelope includes at least:

```text
event_id
event_type
event_version
occurred_at
source
actor / tenant
subject
correlation_id
causation_id
payload
provenance / trace reference
```

For every important contract, report producer, consumer, owner, version, validation point, compatibility policy, failure semantics, test coverage, and evidence.

---

## 7. Separate quality dimensions before scoring

Do not let one aggregate score hide distinct failures. Define dimensions appropriate to the product's real risks, including:

- Functional correctness.
- Task completion.
- Usefulness and relevance.
- Factuality and grounding.
- Instruction and constraint adherence.
- Safety and authority.
- Reliability and recovery.
- Consistency across runs, stages, and channels.
- Latency and performance.
- Cost and resource use.
- UX clarity and user control.
- Maintainability and modularity.
- Observability and provenance.
- Compatibility and migration safety.

Give every dimension its own metric, rubric, threshold, sample, owner, and release consequence. Do not average everything into an attractive but unactionable score.

---

## 8. Review the testing suite

The testing suite primarily answers: **Under the selected inputs and conditions, does the system meet its required behavior, constraints and failure-handling rules?**

Inventory and safely run applicable:

- Unit tests for pure functions, parsers, normalizers, routers, validators, policies, and state transitions.
- Module/component tests for one stage or adapter, including input, output, and side effects.
- Contract/schema tests for producers, consumers, APIs, events, tools, and version compatibility.
- Integration tests for real compositions of neighboring modules, storage, queues, and provider adapters.
- End-to-end tests from a real entry point through final delivery and durable read-back.
- Failure/recovery tests for timeout, retry, duplicate, partial failure, cancellation, resume, and fallback.
- Security/authority tests for tenant isolation, permission, approval, and prompt/tool-injection boundaries.
- Migration and backward-compatibility tests.
- Deployment smoke tests and feature-flag/kill-switch tests.

Check whether:

- Critical paths are over-mocked and skip the most failure-prone contracts.
- Fixtures represent real shapes, missing fields, dirty data, long inputs, and cross-tenant cases.
- Checks use explicit oracles and independent, reproducible setup. When live behavior varies, distinguish genuine product variation from test instability and define repeats or tolerance appropriate to the claim.
- Model calls are split into deterministic stubs/recorded replays and explicitly gated live tests.
- Tests cover the real registration and composition path, not only helpers and happy paths.
- Disabled capabilities, fallback, rollback, and read-back are tested.
- A failure points to a stage and contract rather than only producing an opaque E2E failure.

Provide a testing pyramid/map, commands actually run, results, reasons for anything not run, and the highest-risk gaps.

---

## 9. Review the eval matrix

The eval matrix connects **scenarios → criteria → graders → results and decisions**. Use it to see whether the selected rules, quality dimensions and operational measures are adequately covered.

Executable tests can supply results to this matrix. For each criterion, use a code check, qualified human or validated model judge according to what can reliably assess it. Specify repeated trials when variation affects the decision.

Select relevant fields for the current scope and maturity:

- A stable `scenario_id` and clear scenario description.
- User/use case, vertical/domain, locale, and language.
- Input quality: complete, sparse, conflicting, stale, noisy, and extreme length.
- Lifecycle state: first use, recovery, edit, retry, published, insufficient permission, and so on.
- Risk tier and allowed authority.
- Prompt, model, provider, tool, retrieval, and configuration versions.
- Expected behavior and boundaries that must not be crossed.
- Quality dimensions, rubric, threshold, and failure taxonomy.
- Grader: code assertion/computed metric, qualified human review or validated model judge. Online outcomes supply data; specify the measurement or interpretation applied to them.
- Repeats, variance, and confidence interval where applicable.
- Latency, cost, and token/tool use.
- Artifacts, trace, stage outputs, and provenance.

Cover materially different mechanisms and risks. Use [robustness design](../testing-evaluation-system/references/robustness-design.md) for relevant variation and [grader design](../testing-evaluation-system/references/grader-design.md) when scoring reliability needs investigation. Select the applicable checks below; defer the rest with a trigger when consequential:

- Whether sparse context avoids unsupported specificity without collapsing into empty safe prose.
- Conflicting context, stale memory, retrieval misses, tool failures, schema drift, and partial success.
- Multiple languages, long-tail inputs, edge cases, adversarial/prompt injection, and authority boundaries.
- Comparisons and ablations across content approaches, models, and routing policies.
- Whether model judges are calibrated against humans and rubrics avoid vague “sounds good” scoring.
- Whether individual dimensions, failure reasons, and concrete artifacts remain visible instead of only an aggregate score.
- Whether eval datasets are versioned, deduplicated, contamination-aware, and separated into development, regression, and holdout sets.

---

## 10. Support both E2E and stage-level testing and evaluation

Start with the critical stages on the real path and reuse available intermediate artifacts. Assess the capabilities below where needed for the current decision. Add independent replay only when it materially improves diagnosis, iteration or risk coverage; a missing general-purpose runner is not automatically a V1 blocker.

1. Critical stage boundaries have clear input/output contracts with applicable versions.
2. One scenario carries the same `scenario_id` and `trace_id` through the full pipeline.
3. Stages selected for isolation can accept a frozen upstream artifact through an existing entry point or a justified small adapter.
4. Relevant stage outputs can be captured or referenced with enough provenance to compare results and locate failures.
5. Stage evals can assess retrieval, planning, tool choice, drafting, validation, or delivery without invoking the entire system.
6. E2E evals still use the real composition path so independently passing stages cannot hide composition failures.
7. Deterministic contract checks run before entering the next stage; semantic graders do not perform schema validation.
8. Every result record identifies code commit, prompt, schema, model, provider, configuration, dataset, and grader versions.
9. Baseline, candidate, ablation, and regression comparisons are retained rather than overwritten.
10. A failure can be traced to the first diverging stage and distinguished as an upstream-input defect or current-stage defect.

Recommended bounded loop:

`selected stage checks + real-composition evidence → locate the first divergence → rerun affected cases after an authorized repair → decide within the agreed acceptance scope`

State which capabilities exist, which are proposed and which were not run because of cost, environment or authorization. Keep release safety requirements; defer broader coverage and infrastructure according to risk and the next decision.

---

## 11. Explain the testing-suite versus eval-matrix boundary

When this distinction informs the audit, adapt the following roles to the actual system. A shared harness can support both assets:

| Dimension | Testing Suite | Eval Matrix |
|---|---|---|
| Primary role | Executable checks of required behavior and failure paths | Map selected cases to criteria, graders and decision thresholds |
| Evidence | Assertions, measurements and execution artifacts | Linked results across rules, quality and operational dimensions |
| Judgment | Explicit oracle, calculation or a referenced grader | Code, human or model mechanisms selected per criterion |
| Variation | Repeats or tolerance when execution varies | Aggregate and compare repeated evidence where claims require it |
| Localization | Function, module, contract or execution path | Scenario, dimension, stage or configuration |
| Decision support | Evidence for specified requirements and regressions | Coverage, trade-offs and sufficient evidence for the scoped decision |

The two systems should share scenario IDs, version metadata, and artifacts, but never one ambiguously defined “pass rate.”

---

## 12. Required output

Deliver the audit in this structure:

### A. Executive verdict

- In 5–10 points, state the system's actual maturity.
- Identify the 3–5 most important risks and opportunities.
- Identify what is done well and cite the evidence.

### B. Evidence ledger and verification boundary

- What was read, run, inaccessible, or not verified.
- Evidence labels for every material conclusion.

### C. End-to-end system and harness map

- Stages, responsibilities, owners, contracts, state, side effects, recovery, and observability.
- Implicit coupling and responsibility leakage.

### D. Capability lifecycle matrix

- Identify documented-but-unimplemented, implemented-but-unwired, wired-but-unreachable, executed-but-unmeasured, and live-but-unowned capabilities.

### E. Dead, redundant, and shadow-surface inventory

- Every finding includes file/line or runtime evidence, impact, and a minimum fix.

### F. Modularity and removal report

- Classify key capabilities as `Cleanly removable`, `Removable with migration`, `Tightly coupled`, or `Unverified`.
- Perform a removal drill on the 1–3 most important modules.

### G. Schema and contract review

- Separate domain, transport, storage, event, agent/tool, view-model, and eval-record concerns.
- Identify specific gaps, owners, and compatibility plans.

### H. Testing-suite map

- Current coverage, actual run results, critical gaps, and flakiness or over-mocking risks.

### I. Eval-matrix proposal

- Scenario axes, quality dimensions, graders, thresholds, versions, and stage/E2E coverage.

### J. Open questions

- Only necessary `Blocking`, `Material`, and `Optional` questions, each with current evidence, a default assumption, and consequence.

### K. Prioritized action plan

Every action includes:

- `Finding ID`
- Problem and user/system impact
- Evidence and verification status
- Recommended change
- Minimum fix or structural slice
- Owner and dependency
- Risk, migration, and rollback
- Test and eval proof of completion
- Priority: `P0 / P1 / P2`

### L. Proposed target architecture

- Propose only the minimum target architecture required by observed problems.
- State what becomes reusable, what remains local, and what should be removed.
- Define one end-to-end structural slice that jointly validates contract, quality, authority, recovery, and observability.
- Assign a specific `Proposal ID`. Do not begin broad implementation until I approve that ID.

---

## 13. Prohibited review failure modes

- Do not claim that a capability is wired, shipped, verified, or valuable without evidence.
- Do not infer reachability from a file's existence or backend reality from visible UI.
- Do not treat test count or coverage percentage as test quality.
- Do not treat one aggregate eval score as proof that every quality dimension passes.
- Do not use a model judge instead of deterministic tests for permissions, schemas, side effects, or state transitions.
- Do not treat a feature flag as sufficient proof of modularity.
- Do not propose a “full rewrite” without migration, rollback, a vertical slice, and verification.
- Do not delete a public contract, active consumer, historical data responsibility, or compliance obligation for tidiness.
- Do not return only abstract best practices; every material finding must point to a concrete system location and minimum action.
- Do not push all unknowns back to me; complete everything that evidence can establish first.

The goal is not to make the system appear more complex or more “agentic.” The goal is to make its capabilities real, its boundaries explicit, its user friction lower, its output quality continuously improvable, and every stage understandable, verifiable, replaceable, disableable, and safely recoverable.
