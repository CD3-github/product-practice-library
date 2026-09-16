# Testing & Evaluation System

A reusable, composable evidence system for product and AI features.

This package was distilled from applied feature work, then generalized across repositories and product domains. It is written for product, engineering, coding agents, and quality/operations specialists who need shared evidence but different decision views.

**One-sentence rule:** every feature needs an evidence strategy; tests, evals, benchmarks, production monitoring, experiments, and human review are selectable building blocks—not an either/or choice or mandatory sequence.

## Why this is a package, not one long prompt

The stable methodology, the setup decision, the implementation work, and each measurement round change at different speeds and have different authorization boundaries. Combining them into one prompt would encourage an agent to jump from analysis into implementation or to rewrite historical results.

The package therefore separates:

- `00-testing-evaluation-system.md` — canonical, human-readable method.
- `01-design-or-audit.prompt.md` — read-only prompt for mapping an existing project and proposing the system.
- `02-implement-approved-system.prompt.md` — implementation prompt for an explicitly approved design slice.
- `03-run-eval-round.prompt.md` — repeatable prompt for running one evidence-producing round and recording a decision.
- `testing-evaluation-system.html` — visual decision guide for choosing and combining evidence, understanding the system, and interpreting results.

## Scope

Set the unit where the uncertainty exists: function, stage, output, task, session, workflow, feature, release, or cohort. Use the smallest trustworthy evidence mix needed for the decision.

The package is especially useful for:

- generative AI and agent workflows;
- search, retrieval, RAG, recommendation, and ranking;
- automated planning, analysis, classification, or decision support;
- creative generation and content systems;
- multi-stage transformations where each stage can be correct while the composed result is still weak.

A deterministic feature may be test-heavy. An open-ended AI feature may be eval-led while still using deterministic graders for schemas, tool calls, cost, and latency. A benchmark applies shared measures to alternatives. Production monitoring and online evals detect real-world quality and drift; controlled experiments are needed when causal impact matters.

Use three layers when explaining the system: tests and evals are core measurements; benchmarks and production validation extend those measurements into comparison and real-world decisions; contracts, cases, runners, graders, manifests, and gates form the infrastructure. Product analytics supplies observational production signals, while controlled experiments support causal product claims.

For security, compliance, forecasting, or causal business-impact claims, this system is a foundation, not a substitute for domain-specific validation, red teaming, statistical analysis, or controlled experimentation.

## Naming recommendation

Use **Testing & Evaluation System** for the main title and first definition. After that, use `eval`, `evals/`, and “eval matrix” consistently. `Eval` is an important shared AI engineering and product concept; the guide should teach it rather than translate it away.

Do not broaden this module to “Product Quality System” yet. That would imply ownership of usability research, analytics, experimentation, incident management, and business attribution. This package connects to those systems but does not replace them.

## Three result perspectives

- **Product** — what result was produced, which goal it represents, what decision it supports, and the next product lever.
- **Engineering** — whether the result is valid and reproducible, where failure first diverged, and what should be diagnosed or repaired.
- **Quality & operations** — whether the result reflects domain quality and real operating conditions, and what needs acceptance, escalation, or risk treatment.

These are perspectives, not prescribed job titles. One person may cover several; specialists join when their judgment changes the decision.

## Agent-first, human-directed operation

The agent should run all authorized automated checks, analyze the results, localize likely causes, and prepare separate decision views. Humans should not inspect every output manually.

The agent must triage results into:

- no human action;
- agent follow-up;
- human review requested;
- blocked or unverified.

Human review is reserved for borderline or high-risk outputs, grader disagreement, novel failure clusters, protected regressions, suspicious passes, and consequential product/domain decisions. Human decisions then update labels, rubrics, cases, gates, or the next round.

## Place in a larger product-building library

This is one module, not the future site's top-level scope. A larger library can add sibling modules such as:

- Research and evidence gathering;
- Product framing and brainstorming;
- UX and interaction rethinking;
- Testing & Eval;
- Delivery, launch, and learning.

Each module should own its method, agent workflows, artifacts, and visual chapter. The shared shell should provide navigation, vocabulary, evidence discipline, and a consistent handoff pattern without forcing every module into the same internal steps.

## Use order

1. Read the methodology.
2. Run the design/audit prompt in read-only mode.
3. Approve one design proposal and one structural slice.
4. Run the implementation prompt.
5. Use the round prompt repeatedly; keep round evidence append-only.

## What to share

For a first review with an engineer or coding agent, share only:

1. this README;
2. `00-testing-evaluation-system.md`;
3. `01-design-or-audit.prompt.md`;
4. the exact repository/worktree and project-specific source documents.

The HTML is the human-facing explainer and is optional for the coding agent. Share `02-implement-approved-system.prompt.md` only after approving a specific proposal. Share `03-run-eval-round.prompt.md` once the harness exists and someone is ready to run a real round.

## Relationship to other packages

- Use `ai-product-system-audit` for a broad review of an AI system, including harness, authority, contracts, modularity, and dead/unwired surfaces.
- Use this package when the test, eval, benchmark, production-monitoring, analysis, escalation, and release-evidence system itself needs to be designed or repaired.
- Use `project-document-system` when deciding the wider project documentation, ownership, contracts, and multi-agent collaboration model.
- Use `product-analytics-experimentation` for the emerging practice boundary between observed product behavior, controlled causal experiments, and quality evidence. It currently provides guidance, not a complete agent workflow.

## Future skill boundary

Promote this package to a skill only after it has been exercised across multiple product types and the setup triggers, artifact schema, runner expectations, judge-validation protocol, and verification commands are stable.
