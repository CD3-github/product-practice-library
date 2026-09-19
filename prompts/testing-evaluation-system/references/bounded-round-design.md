# Scope, effort and stopping rules

Use when planning a finite verification or improvement round. Match an explicit version/release scope first. Without one, propose a bounded decision and acceptance scope from the known user task and risks; label that scope as proposed. A request for a long-term evidence-system blueprint still deserves a blueprint, with its first executable round clearly separated.

## Define enough evidence for this decision

Keep a compact round agreement inside the plan, not a new required file:

| Choice | Specify |
|---|---|
| Scope and claim | Target version/path, users or input/task range, decision to support, and what a successful round could establish |
| Must cover now | Critical-path behavior, consequential stage boundaries, applicable safety/authority/data-integrity requirements, and representative quality conditions |
| Acceptance | Observable expected behavior, quality rubric anchors or justified thresholds, protected capabilities, coverage/sample and uncertainty requirements |
| Stop and wrap up | Conditions for sufficient evidence, failed acceptance, invalid measurement, or exhausted authorized resources; what each outcome permits |
| Deferred work | Only consequential deferrals, why they can wait, remaining risk, and a trigger such as a new consumer, broader audience, recurring failure or rising volume |

Derive criteria from the product responsibility and decision. A score such as 80/100 needs defined dimensions and anchors; it is not a universal completion threshold. Set criteria before measurement and preserve unmet criteria in the result. If thresholds are uncertain, propose an initial calibration/pilot and name the later decision it enables. A diagnostic round can complete by locating an actionable failure without making the product release-ready.

## Cover stages without building a platform

Trace the real path and capture enough existing intermediate inputs/outputs to localize consequential failures. Use code assertions for directly checkable behavior and a targeted rubric or human review for judged quality. Inspect existing artifacts when they answer the question; rerun only what needs fresh evidence. Saved artifacts cannot establish unobserved service effects, integration behavior or current permissions.

Add independent stage replay/runners where frequent changes, expensive upstream work, stochastic behavior or difficult attribution justify them. Add model judges, persistent failure clustering, richer manifests or role-specific reports when their benefit at the expected volume exceeds setup and maintenance cost. The agent can analyze a small result set directly and prepare a focused human-review list without building reporting infrastructure.

Separate **measurement setup** from **product changes**. An absent product capability may be a finding, a prerequisite for a particular claim, or a separately approved fix; it does not automatically belong in the test-harness implementation scope. Cover actual version requirements, not every future feature. Reducing scope limits the claim; it does not waive applicable safety or integrity requirements.

## Estimate the work actually proposed

Give indicative ranges with assumptions, not a generic multi-day engineering estimate:

- **Setup and integration:** available fixtures/harness versus missing adapters, access or instrumentation; separate agent engineering effort from waiting on people or environments.
- **Automated workload:** selected cases × arms × repeats at each executed boundary, plus any scoring calls and bounded retries. Reused artifacts and skipped stages reduce work; do not multiply all pipeline stages mechanically.
- **Elapsed runtime and cost:** use existing timings, provider limits, dependency chains and safe concurrency. A pilot may refine the estimate only when execution is authorized. Without timing evidence, report workload counts and unknown timing instead of fabricated precision.
- **Human work:** outputs or disputes to review, expected review effort, and any required approval. Keep review time separate from automated runtime.

An indicative estimate is not a timeout. Propose per-call timeouts, retry limits and an overall time/cost ceiling separately where relevant. Honor user-supplied limits; never expand paid-call or live-operation authority to meet an estimate. Re-estimate when the observed cost or failure rate materially differs from the assumption.

## End the round deliberately

| Outcome | Wrap-up action |
|---|---|
| Planned coverage and acceptance criteria met with sufficient evidence | Record the accepted scope and candidate versions, residual risks and supported next action. Release still needs its own authority. |
| Acceptance fails but evidence identifies a useful next change | Preserve the failure and first divergence; propose or make the bounded repair only if authorized. Confirm it in a separately identified run. |
| Measurement is invalid or evidence remains inconclusive | State which claim remains unsupported and the smallest repair or additional evidence needed. |
| Time, cost, retry or authority boundary reached | Stop safely, save valid partial evidence and summarize what remains. Resource exhaustion is not a pass. |

For improvement work, a useful pattern is diagnosis → authorized focused change → confirmation on shared cases and fresh cases where generalization matters. It is not a mandatory two-round template. Additional runs need a decision-relevant reason and must stay within authorization. Preserve distinct versions and runs; do not rerun indefinitely until a favorable score appears or repeatedly peek at held-out cases without accounting for selection bias.

Wrap-up preserves cases/expectations, relevant artifacts, check/score results, and changes/decisions, with enough applicable code/prompt/model/policy/contract/rubric versions to reproduce the result. These can share existing files. A finalized round freezes its version and acceptance scope, not the product schema forever.

## Bring real usage back into the cases

When authorized feedback or usage data is available, add a brief recommendation: turn reproducible failures and high-friction tasks into privacy-safe regression/eval cases, and use reliable frequency/severity evidence to reprioritize coverage. Validate the signal's meaning and sampling limits; complaints alone do not establish prevalence or causality. Keep tuning cases distinguishable from held-out confirmation. Escalate newly discovered critical risks now; route deeper behavioral or causal questions to [analytics and experimentation](../../product-analytics-experimentation/README.md) only when needed.
