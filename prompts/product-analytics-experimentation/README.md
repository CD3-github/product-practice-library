# Product Analytics & Experimentation

Status: **emerging practice module**. This branch defines the boundary and initial method map; it is not yet a complete workflow or agent prompt package.

## Why this is separate from Testing & Evaluation

Testing & Evaluation asks whether a system is correct, capable, reliable, safe, and ready. Product Analytics & Experimentation asks how people actually use the product, what changes over time, and whether a product intervention caused an outcome.

The two practices share evidence infrastructure, but they do not make the same claims:

| Practice | Primary question | Typical evidence | Claim it can support |
|---|---|---|---|
| Testing & Evaluation | Does the system behave correctly and perform well enough? | Tests, offline/online evals, traces, graders, human review | Correctness, quality, readiness, regression, reliability |
| Product analytics | What is happening in real use, for whom, and where? | Events, funnels, cohorts, retention, adoption, edits, acceptance, incidents | Observed behavior and association |
| Controlled experimentation | Did a specific intervention cause a meaningful change? | Randomized exposure, control/treatment variants, primary and guardrail metrics | Causal product impact within the experiment design |

Observed movement is not automatically causal. An experiment is not automatically a quality evaluation. A feature can improve adoption while reducing output quality, or improve an offline eval without changing user outcomes. Important decisions therefore need both the relevant quality evidence and the relevant product evidence.

## Initial architecture

```text
PRODUCT QUESTION
  What decision must this evidence support?
        |
        +--> QUALITY EVIDENCE
        |      tests + offline evals + benchmarks
        |      online evals + monitoring + human review
        |
        +--> PRODUCT EVIDENCE
               product analytics + qualitative feedback
               controlled experiments when causality matters

SHARED FOUNDATION
  identity and cohort definitions
  event and exposure contracts
  scenario and metric registries
  versioned variants and release state
  traces, manifests, provenance, and decision logs
```

## Product analytics branch

Use product analytics to describe and diagnose real behavior:

- adoption and activation;
- funnels and task completion;
- retention and repeated use;
- edits, retries, overrides, and abandonment;
- segment and cohort differences;
- reliability, incidents, latency, and cost in context;
- connections between quality signals and user behavior.

Analytics can reveal where to investigate and generate hypotheses. Without a defensible causal design, it should not claim that a release caused the observed movement.

## Experimentation branch

Use a controlled experiment when the decision requires causal attribution and there is enough traffic, time, ethical permission, and instrumentation quality.

Minimum contract:

- hypothesis and decision consequence;
- experimental unit and eligibility rules;
- control and treatment variants;
- assignment and exposure semantics;
- one primary metric linked closely to the intervention;
- guardrail metrics, including relevant quality and safety measures;
- minimum detectable effect or practical-significance threshold;
- duration, stopping rule, and analysis plan;
- sample-ratio and instrumentation checks;
- segment policy, novelty risk, and rollout/rollback plan;
- versioned result and decision record.

Use an A/A test selectively to validate assignment, exposure, and metric plumbing when experimentation infrastructure is new or materially changed. Do not run one before every experiment by habit.

## Shared boundary with AI evals

For an AI feature, connect but do not collapse these layers:

```text
offline eval quality
  -> release candidate evidence

production traces + online eval
  -> real-distribution quality and drift

product analytics
  -> observed user behavior and workflow outcomes

controlled experiment
  -> causal impact of a product or model intervention
```

Examples of shared metrics include cost, latency, reliability, human correction effort, and acceptance. Preserve the source and claim type so an observational metric is not presented as causal and an offline score is not presented as business impact.

## Method classification

Common terms often sit on different dimensions:

| Term | What it is | Where it belongs |
|---|---|---|
| Golden set | A curated, versioned reference dataset or case asset | Scenario registry; supports regression, judge calibration, and benchmark comparison |
| A/B test | A randomized controlled experiment design | Product experimentation and causal production validation |
| A/A test | An experiment-infrastructure validation technique | Assignment, exposure, and metric-plumbing QA |
| Red-team / blue-team exercise | An adversarial assurance practice and defense-response exercise | Security/safety validation; may produce test cases and eval scenarios |
| Robustness test | A property-focused test or eval across perturbations, shifts, failures, or repeated trials | Test/eval matrix and release gates |
| Load or stress test | A performance and reliability method | Operational tests, capacity evidence, and production readiness |
| Shadow or canary validation | A release and exposure pattern | Production validation and operational risk control |

If “red/blue testing” means a deployment strategy rather than adversarial security work, classify it under release engineering instead. Record the exact intended meaning rather than relying on the label.

## What belongs in the shared infrastructure

- canonical user, account, session, and cohort identity;
- event names, properties, versions, and ownership;
- exposure events and variant assignment;
- metric definitions and allowed windows;
- eval and experiment IDs carried through traces;
- quality, safety, cost, and latency guardrails;
- reproducible queries and analysis versions;
- privacy, consent, retention, and access rules;
- append-only findings and accountable decisions.

## Future package

A mature package should eventually add:

1. a canonical method for analytics and experiment design;
2. a read-only instrumentation and experiment-readiness audit prompt;
3. an implementation prompt for approved event/exposure contracts;
4. a prompt for analyzing one experiment without overstating causality;
5. reusable artifact schemas for metric registry, experiment brief, analysis, and decision log;
6. validation examples for deterministic, AI-assisted, and multi-stage product features.

Until those artifacts are tested across several product types, this folder remains guidance rather than a promoted skill.

## Primary references

- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — evals alongside production monitoring, A/B testing, user feedback, transcript review, and human studies.
- [Amplitude: Experiment overview](https://amplitude.com/docs/feature-experiment/overview) — controlled variants, exposure, product metrics, and the distinction between observation and causal experimentation.
- [Amplitude: A/A testing](https://amplitude.com/docs/feature-experiment/aa-testing) — validating randomization, exposure, and metric instrumentation.
- [NIST: TEVV-Athlon](https://www.nist.gov/artificial-intelligence/ai-research/tevv-athlon-framework-evaluating-ai-systems) — broader test, evaluation, verification, and validation framing.
