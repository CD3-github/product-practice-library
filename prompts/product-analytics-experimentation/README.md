# Product Analytics & Experimentation

Agent entry point for measuring product behavior, diagnosing friction, and estimating the causal impact of product changes.

## Start here

Provide:

- the product decision or question;
- the user/account unit and relevant lifecycle stage;
- the repository, data source, analytics workspace, or exported dataset;
- current event, identity, metric, cohort, and exposure definitions;
- privacy, access, runtime, and mutation boundaries.

Inspect available context before asking for missing inputs. Select one mode and keep its claim boundary explicit.

## Route by intent

| User intent | Mode | Required output |
|---|---|---|
| Define or audit product measurement | `measurement-design` | Question map, event/identity/metric contracts, validation gaps, and implementation proposal |
| Understand adoption, funnels, retention, cohorts, or friction | `behavior-analysis` | Reproducible analysis, segments, uncertainty, likely explanations, and next investigation |
| Decide whether and how to run an experiment | `experiment-design` | Hypothesis, eligibility, unit, variants, metrics, power assumptions, guardrails, and decision rule |
| Interpret an experiment that has already run | `experiment-analysis` | Validity checks, effect estimates, uncertainty, segment policy, guardrails, and bounded decision |

Use [the product-evidence workflow](01-product-evidence-workflow.prompt.md) with the selected mode. Load relevant sections of [the canonical method](00-product-analytics-experimentation.md) only when definitions, contracts, or analysis rules are needed.

Questions about model/output quality, deterministic correctness, graders, golden sets, or release-quality gates route to [Testing & Evaluation System](../testing-evaluation-system/README.md). Mixed AI-product decisions may require both practices while keeping their claim types separate.

## Shared operating rules

1. Start from the decision, population, unit, time window, and action the evidence may change.
2. Verify identity, event, exposure, metric, and version semantics before interpreting movement.
3. Separate observation, diagnosis, prediction, and causal attribution.
4. Preserve reproducible queries, data windows, exclusions, versions, and decision records.
5. Automate validity checks and first-pass analysis; escalate ambiguous interpretation and consequential decisions.
6. Report practical significance, uncertainty, guardrails, and heterogeneous effects—not only a top-line average.
7. Link every chart, query, dataset, or experiment record used in the conclusion.

## Source map

- [Browsable visual index](product-analytics-experimentation.html)
- [Canonical method and contracts](00-product-analytics-experimentation.md)
- [Product-evidence workflow](01-product-evidence-workflow.prompt.md)
- [Testing & Evaluation System](../testing-evaluation-system/README.md)

This folder is a reusable **practice module**. A thin `SKILL.md` adapter can later make it automatically discoverable by an agent host.
