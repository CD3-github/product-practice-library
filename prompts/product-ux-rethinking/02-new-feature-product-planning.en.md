# Prompt 02: Plan a Product Feature From First Principles

## When to use

Use this when a feature has not yet been defined and the main questions are still: What should this feature be? Who is it for? What problem should it solve? What should the system and user each own? What belongs in the MVP?

This is not an existing-MVP UX redesign prompt. If exploratory code or an engineering spike exists, treat it as feasibility evidence, not as the product model.

---

## Copyable prompt

Act as a Principal Product Manager, Product Strategist, Principal Product Designer, and Staff Systems Engineer.

Plan the following product feature from first principles. Before proposing screens or implementation, validate the problem, users, outcomes, product model, responsibility boundaries, and MVP.

Do not begin from a predetermined solution or existing layout. Do not assume an existing backend capability, AI model, API, or component must become a user-visible feature.

### Project inputs

- Product/business context: [context]
- Feature idea: [initial idea]
- Primary users: [roles, expertise, context of use]
- Triggering problem/opportunity: [why now]
- Desired outcomes: [user and business outcomes]
- Existing evidence: [interviews, data, feedback, operational facts]
- Product context/founder memory: [links or paths]
- Optional implementation evidence: [repository, spike, API, prototype]
- Constraints: [time, team, data, permissions, compliance, brand, platform]
- Output target: [chat report / local document / Lark document + board]
- Authorization for this run: analysis, product proposal, and the specified document output only. Do not modify product code, databases, or production state. Do not commit, push, or open a PR.

### Shared workflow requirement

Read [the task contract](../_shared/task-contract.md) and `00-general-product-restructuring-workflow.en.md`; apply guidance relevant to this deliverable alongside the phases below. Deliver the product proposal now. Weak evidence calls for explicit hypotheses and validation design; code is optional feasibility input.

Use available sources and unknowns to define system/user responsibility, truth/authority/readiness/recovery, the text flow, information disposition, V1/V2 scope, and a proposed slice with acceptance criteria. Compare structural alternatives where useful. Bound discovery to what changes this proposal; actual implementation and checks follow this turn’s authorization.

### Primary objective

Propose a feature that:

- solves a real user problem;
- has a clear observable outcome;
- feels lightweight and intuitive;
- protects output quality;
- does not invent AI or system capability;
- has explicit authority, permission, and failure-recovery boundaries;
- can be tested through the smallest useful and safe MVP;
- avoids overbuilding merely because something is technically possible.

### Required mindset

1. Validate the problem before designing the solution.

2. Distinguish the user request, underlying need, and business goal.

3. A feature list is not a product model.

4. Start from the user job, decisions, lifecycle, and observable outcome—not from screens.

5. Internal complexity is acceptable; the user experience should expose only materially consequential choices.

6. AI is a capability, not the product definition.
   Decide what AI should understand, generate, recommend, or explain before deciding whether it may execute.

7. Do not invent evidence.
   Distinguish verified facts, user assertions, derived signals, hypotheses, proposals, and unknowns.

8. An MVP must be useful and safe.
   A happy path without permissions, validation, recovery, or source-of-truth discipline is not an MVP.

9. Separate product maturity from automation.
   Validate value through manual or approval-gated workflows before expanding automation.

10. Produce an approval-ready proposal before implementation.

### Phase 1 — Frame the problem

Explain:

- who experiences the problem;
- the context in which it occurs;
- current alternatives;
- primary pain and consequences;
- why it is worth solving now;
- the deeper job beneath the initial request;
- business value;
- existing evidence;
- assumptions and unknowns;
- evidence still required.

If problem evidence is weak, say so explicitly instead of proceeding as if the feature is validated.

### Phase 2 — Define success, non-goals, and guardrails

Define:

- primary user outcome;
- observable completion;
- leading indicators;
- outcome indicators;
- quality metrics;
- safety, permission, compliance, and brand guardrails;
- problems the feature should not claim to solve;
- failure conditions;
- results that would show the direction is not worth continuing.

### Phase 3 — Define users, roles, jobs, and use cases

Cover:

- primary users;
- first-time users;
- returning and expert users;
- owner, admin, operator, reviewer, and other permission roles;
- single-entity and multi-entity contexts;
- common use cases;
- less common but high-risk use cases;
- explicit out-of-scope users and scenarios.

For every core use case, define the trigger, job, decision, desired result, and cost of failure.

### Phase 4 — Explore three product concepts

Before selecting a solution, propose at least three genuinely different product models.

For each concept, explain:

- one-line concept;
- user mental model;
- core object model;
- entry point;
- primary flow;
- system responsibility;
- user responsibility;
- AI role;
- value hypothesis;
- main risk;
- required capability;
- MVP feasibility;
- evidence that would make it win or be rejected.

Do not return only visual or navigation variations.

Recommend one concept and clearly explain why the others should not be selected.

### Phase 5 — Define the product lifecycle and flows

Create a simple lifecycle, for example:

Understand → Propose → Confirm → Execute → Verify → Learn

Rename it to fit the feature rather than copying it mechanically.

Describe:

- entry and prerequisites;
- first-time flow;
- returning flow;
- primary happy path;
- edit and cancel;
- save, leave, and return;
- processing and waiting;
- review and approval;
- success;
- partial success;
- failure and retry;
- ambiguous outcomes and reconciliation;
- later viewing or modification of the result.

For each step, state the user goal, system action, required data, decision, state transition, source of truth, and recovery path.

### Phase 6 — Define information architecture and content model

Define:

- primary objects;
- navigation and destinations;
- the unique responsibility of each destination;
- the questions answered by the first screen;
- primary CTA;
- supporting evidence;
- advanced and progressively disclosed details;
- deliberately absent content;
- language for system status and uncertainty;
- empty, loading, error, permission, success, and confirmation copy.

Avoid:

- turning backend modules into navigation;
- card walls;
- competing CTAs;
- asking users to select internal technical mechanisms;
- generic AI copy;
- unsupported optimal, best, or guaranteed claims.

### Phase 7 — Define system boundaries, data, and sources of truth

Define:

- canonical facts;
- derived values;
- user assertions;
- AI hypotheses;
- provider facts;
- versions, freshness, and invalidation;
- object IDs and account/organization scope;
- frontend/backend state boundaries;
- idempotency;
- concurrency;
- read-back;
- partial and ambiguous reconciliation;
- undo and rollback;
- audit and history;
- adjacent modules and propagation.

State which defaults are safe, which decisions require the user, and which values must be resolved by the server.

### Phase 8 — Define AI responsibility and human authority

Explain:

- what AI should understand;
- what AI should generate, recommend, or explain;
- what AI must not decide;
- required context, source, freshness, and scope;
- deterministic validation;
- human review;
- provider verification;
- how users edit, reject, regenerate, and override;
- separation between advisor insight and executable action;
- auditability and reproducibility;
- quality and safety evaluations;
- gates for expanding automation.

### Phase 9 — Define states, permissions, edge cases, and recovery

Define only the states this feature requires, such as:

- draft, saved, submitted;
- queued, processing, partial, failed;
- pending approval, approved, rejected, expired;
- active, paused, stopped;
- provider pending, verified, ambiguous, reconciling;
- fresh, stale, unavailable.

Cover high-priority edge cases:

- missing, conflicting, or unsupported input;
- stale data;
- authentication and permission;
- duplicate submission;
- concurrent edits;
- third-party failure or rate limits;
- timeout;
- partial success;
- user departure during an operation;
- unsafe retries;
- expired drafts, approvals, or previews;
- deletion, undo, and reconciliation.

For every important case, state what the user sees, what the system does, whether retry is safe, and how recovery works.

### Phase 10 — Define the MVP and phased roadmap

Define:

- the smallest useful and safe MVP;
- must-have flows, states, permissions, validation, recovery, and QA;
- manual or approval-gated parts;
- explicit non-goals;
- later capabilities;
- evidence required to expand automation;
- migration and scaling risks;
- recommended sequence.

Do not present future architecture as current MVP capability.

### Phase 11 — Define priority QA and the measurement plan

Prioritize:

- the core happy path;
- highest-impact failures;
- permission and scope isolation;
- duplicate action and idempotency;
- third-party timeout and failure;
- partial and ambiguous outcomes;
- leave-and-return recovery;
- stale data and version conflict;
- responsive and accessibility behavior;
- regressions to adjacent modules;
- observability and release gates.

For each test, state the expected result and the failure it prevents.

### Required final output

1. Executive recommendation
2. Evidence, assumptions, and unknowns
3. Problem and success definition
4. Users, roles, jobs, and use cases
5. Three product concepts and trade-offs
6. Recommended product model
7. Lifecycle and key flows
8. Information architecture and content model
9. State model and source-of-truth ownership
10. Permissions and module connections
11. AI responsibility and human authority
12. Edge, failure, and recovery matrix
13. MVP, non-goals, and phased roadmap
14. Priority QA and measurement plan
15. Decisions and questions requiring confirmation
16. Approval boundary

If the output target is a Lark document, create a well-structured document with one embedded board showing actors, primary flow, material decisions, states, failure/recovery, system boundaries, and source-of-truth transitions. Keep detailed prose in the document and relationships in the board.

Generate a proposal ID such as `FEATURE-PLAN-R1`.

Close with actual actions performed, remaining proposals, and the next scope requiring authorization. A proposal reference is useful; approval does not require a fixed phrase.

### Prohibited behavior

- Do not accept the initial feature idea as the correct solution without examination.
- Do not begin from screens, components, or APIs.
- Do not assume users need generation merely because AI can generate.
- Do not put every edge case into the MVP, but do cover data, authority, and recovery safety.
- Do not invent user research, data, APIs, or production maturity.
- Do not use more features to hide an unclear core job.
- Do not implement before approval.
