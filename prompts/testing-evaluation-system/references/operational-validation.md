# Operational validation recipes

Read only the section selected for the current risk or decision. These methods answer different questions and are not a maturity checklist. A design proposal can specify safe prerequisites without requesting live access or launching anything.

## Shadow and canary

Use **shadow** to observe a candidate on mirrored or replayed real inputs while the existing path remains authoritative. Use **canary** to expose a bounded part of real traffic to the candidate with monitoring and rollback. Shadow can reveal integration/quality differences; it cannot establish users' reaction to outputs they never see. Canary is a rollout-safety technique, not automatically a randomized causal experiment.

Specify:

- Traffic eligibility, privacy/consent constraints, comparison window and versions. Shadow writes must be disabled, sandboxed or otherwise prevented from producing real side effects.
- What is observed: errors, output quality, latency, cost and critical safety signals as relevant. Include sufficient denominator/traffic context to interpret rates.
- Exposure/ramp limits, minimum evidence before advancing, stop thresholds and accountable operator. Low-volume “no incidents” evidence has limited strength.
- Rollback or shutoff mechanism and read-back verification. For persistent changes, account for effects that cannot be undone by routing traffic back.

Route a causal product-impact question to [controlled experimentation](../../product-analytics-experimentation/01-product-evidence-workflow.prompt.md). Randomization, exposure validity and statistical design require additional choices.

Method reference: [Google SRE — Canarying releases](https://sre.google/workbook/canarying-releases/), for bounded exposure, evaluation signals and rollout decisions.

## Load, stress and recovery

Use when concurrency, volume, resource limits or sustained demand could change reliability or cost. **Load testing** checks expected demand; **stress testing** explores beyond it to locate limits and safe failure behavior. Select either or both according to the decision.

Define the workload mix, arrival/concurrency pattern, duration, environment and resource limits. Choose measures such as throughput, tail latency, queue growth, errors and cost per successful task. Distinguish provider throttling from local bottlenecks. Check recovery after pressure subsides; a system that meets latency goals but silently drops work is not healthy.

Set stop limits and use authorized, isolated infrastructure. Do not generate unbounded provider calls or production traffic. Record how the test environment differs from production before extrapolating capacity.

## Adversarial assurance: red and blue

Use when a realistic actor or hostile input could bypass a consequential safeguard. Start with a threat model: protected assets, attacker access, trust boundaries, prohibited outcomes and likely entry points. Select attacks from that model rather than collecting dramatic but irrelevant prompts.

**Red-team work** attempts the scoped failure. **Blue-team work** evaluates detection, containment and recovery, and proposes defenses. Define permitted targets, tools, data and stop conditions; use synthetic secrets and isolated fixtures. Record attempted attacks as well as successful ones, severity, reproducibility and traces. An unsuccessful attack set does not prove general safety.

Retest fixes on the original failures and fresh variants. Keep protection against legitimate-use regressions visible. Reuse [agent reliability](agent-reliability-design.md) for tool authority and state assertions; do not count the same evidence twice as independent assurance.
