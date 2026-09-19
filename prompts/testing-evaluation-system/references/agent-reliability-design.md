# Agent and harness reliability

Use for systems that call tools, retain state, cross authority boundaries or take external actions. Inspect or describe the actual mechanisms first; a text-only generator does not need a fabricated tool or memory test suite. Mark undocumented behavior as an assumption or integration question.

## Choose the consequential failure paths

| Mechanism present | Selected condition to exercise | Evidence to observe |
|---|---|---|
| Tools and external services | Timeout, malformed response, unavailable dependency, or partial success | Bounded retries, explicit failure/fallback, preserved error context |
| Writes or irreversible actions | Duplicate request; timeout after the action actually completed | Idempotency or reconciliation prevents duplicate effects; read-back matches intended state |
| Multi-step state | Interruption, restart, concurrent update, or stale handoff | Consistent durable state; safe resume, conflict handling or escalation |
| Permissions and approvals | Missing/revoked permission or changed approval scope | Action remains within current authority; no silent bypass |
| Retrieval or persistent memory | Stale/wrong-tenant content or failed deletion | Relevant isolation, provenance, freshness and deletion requirements hold |
| Untrusted instructions | Injection through a document or tool result | Data is not promoted into authority; restricted actions remain restricted |
| Agent loops | Repeated unsuccessful attempts or unproductive tool use | Termination, cost/step limits, and useful escalation rather than runaway work |

Choose conditions from actual risks; do not turn each row into a required suite.

## Make the check observable

For each selected path, specify the initial state, controlled fault or trigger, expected state transitions, allowed side effects, terminal outcome and recovery. Assertions should inspect tool effects and durable state where available: an agent saying “done” does not prove completion.

Use fakes or isolated fixtures for reproducible fault injection, and label what those tests cannot establish about live integration. Add a gated integration check only where the decision requires it. A frozen stage replay isolates a boundary; a real-composition E2E tests how selected boundaries work together. Choose each for a distinct uncertainty.

Separate product failure from measurement failure: a broken harness adapter, missing judge context or invalid fixture can invalidate a score. Retain the minimum trace needed to locate divergence—input/state version, tool call/result, observed effect and recovery outcome. Redact secrets and personal data; replay must not duplicate live side effects.

Run within explicit permissions and cost/step limits. Tool-fault, deletion, permission, and attack simulations belong in a safe isolated environment unless live actions are specifically authorized. Define stop/escalation conditions in the plan; do not repair the product during a measurement round without authorization.

Method reference: [Anthropic — Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), for task-dependent graders, trials, harnesses and externally verified final state.
