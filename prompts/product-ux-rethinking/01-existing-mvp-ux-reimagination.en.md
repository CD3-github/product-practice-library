# Prompt 01: UX/UI Reimagination After an Engineer-Built MVP

## When to use

Use this when an engineering team has already implemented an MVP, prototype, or partial production feature, but the experience has become implementation-led: too many controls, exposed system fields, fragmented workflows, or an AI coding agent that keeps adding to the existing layout instead of rethinking it.

This is not a greenfield feature-planning prompt and not a visual-polish prompt. It requires the agent to inspect the real implementation and then reconsider the user mental model, information architecture, flows, content, states, and necessary frontend/backend contracts.

---

## Copyable prompt

Act as a Principal Product Designer, Product Systems Thinker, and Staff Frontend Engineer.

Review a complex feature that already has an engineer-built MVP, prototype, or partial production implementation. Reimagine it from the user's point of view.

This is not a visual-polish exercise and not a one-to-one redesign of the existing screens, tabs, cards, forms, or components. The current implementation is important evidence, but it is not the target product model.

### Project inputs

- Product/feature: [name and one-sentence description]
- Primary users: [roles, expertise, context of use]
- Desired user outcome: [outcome]
- Current maturity: [MVP / prototype / partial production / live production]
- Repository/worktree: [path]
- Primary route/entry point: [path or URL]
- Product documents: [links or paths]
- Backend/API/schema: [paths or description]
- Known constraints: [budget, permission, compliance, technical, brand, data]
- Known problems: [list]
- Authorization for this run: read-only review and proposal. Do not modify code, files, databases, external documents, or production state. Do not commit, push, or open a PR.

### Shared workflow requirement

Read [the task contract](../_shared/task-contract.md) and `00-general-product-restructuring-workflow.en.md`; apply guidance relevant to this deliverable alongside the phases below. Ground current-state claims in inspected implementation. With partial access, bound the assessment and still propose the target experience, labeling compatibility and migration assumptions.

Use available sources and unknowns to define system/user responsibility, truth/authority/readiness/recovery, the text flow, information disposition, V1/V2 scope, and a proposed slice with acceptance criteria. Compare structural alternatives where useful. Bound discovery to what changes this proposal; actual implementation and checks follow this turn’s authorization.

### Primary objective

Reduce the user's:

- comprehension cost;
- repeated input;
- unnecessary choices;
- dependence on specialist terminology;
- effort translating data into action;
- uncertainty about whether the system is trustworthy;
- recovery cost after failure;

without weakening output quality, data truth, professional control, approval boundaries, execution safety, or recoverability.

### Required mindset

1. The current UI is evidence, not a constraint.
   Do not assume the current page count, navigation, field order, component boundaries, or workflow should survive.

2. Separate capability from presentation first.
   Identify the real capabilities, data, rules, states, permissions, and execution boundaries before deciding what the user should see.

3. Look for responsibility inversion.
   Identify decisions the system could understand, filter, default, or validate but still pushes onto the user.

4. Start from the user job and decision ownership.
   Define the few important decisions the user must make before designing screens. Do not start from the component tree.

5. Lightweight does not mean less capable.
   The system should absorb complexity; advanced details remain available through progressive disclosure.

6. Protect output quality when removing steps.
   Explain how removed input will be replaced by trusted context, server resolution, validated defaults, historical evidence, or an explicit gap.

7. Challenge implementation logic when necessary.
   Call out API, state-model, data-contract, backend-responsibility, or module-boundary problems that create bad UX.

8. Do not invent capability.
   Distinguish live verified, implemented, partial, prototype/fixture, planned/open, and unsafe/unproven behavior.

9. Do not turn backend subsystems into navigation.
   Audit, AI, optimizer, creative, context, approval, and execution may be lifecycle capabilities rather than separate tabs.

10. Propose before implementing.
    This run should produce evidence, options, trade-offs, a recommendation, and migration slices only.

### Phase 1 — Establish the real baseline

Inspect and cite:

- routes and entry points;
- component tree;
- services, hooks, and API calls;
- backend contracts and schemas;
- sources of truth;
- loading, empty, error, permission, partial, and stale states;
- fixture, mock, standalone prototype, and production-rendering differences;
- actions that really execute versus demo-only controls;
- the current end-to-end user journey;
- worktree state, branch, and baseline commit.

Assign evidence labels:

- Live verified;
- Implemented but not live-verified;
- Partial;
- UI hidden/unwired;
- Prototype/fixture only;
- Planned/open;
- Unsafe/unproven.

State which findings come from code, documents, or inference.

### Phase 2 — Diagnose the current experience

Analyze friction in six categories:

- Comprehension: does the user know why they are here, what is happening, and what to do next?
- Input: are they re-entering information the system already knows?
- Choice: are they selecting technical mechanisms the system should filter?
- Trust: are facts, AI hypotheses, derived signals, measured outcomes, and executable actions conflated?
- Execution: are authority, consequences, readiness, and provider results clear?
- Recovery: how do failure, timeout, partial success, ambiguity, refresh, and return visits recover?

Find implementation leakage such as:

- API fields becoming form fields;
- database states becoming user copy;
- one endpoint becoming one card;
- backend subsystems becoming tabs;
- component reuse combining different user jobs;
- many booleans substituting for a domain state machine;
- frontend code silently guessing material defaults;
- missing data rendered as zero;
- create, ready, and activate treated as one success state.

### Phase 3 — Reframe the product problem

Define:

- the core user job;
- observable success;
- the minimum decisions the user must make;
- work the system should perform automatically;
- human authority that must remain explicit;
- evidence required for trust;
- internal mechanisms the user should not need to understand;
- a simple lifecycle or mental model.

Determine whether the primary problem is information overload or a deeper responsibility inversion, incorrect object model, or source-of-truth boundary.

### Phase 4 — Audit information and content

Classify the main information and controls:

- Keep: required for the current decision;
- Rewrite: important, but expressed incorrectly;
- Progressive disclosure: specialist detail hidden by default;
- Move: belongs in details, history, settings, debug, or another moment;
- Remove: repeated, misleading, non-actionable, or unsupported;
- Add: missing information required for a good decision.

For each item, explain:

- user value;
- correct moment;
- recommended copy;
- data dependency;
- missing state;
- effect on output quality or safety.

Check whether:

- feature language dominates outcome language;
- card walls and equal-weight information destroy hierarchy;
- activity metrics dominate business outcomes;
- CTAs compete;
- unsupported “optimal,” “best,” or “will improve ROI” claims appear;
- advisor insights look executable;
- users must understand internal technical fields.

### Phase 5 — Propose three genuinely different directions

At minimum, propose:

#### A. Conservative integration

Preserve most of the existing structure while correcting severe friction, truth, and authority problems.

#### B. Structural rethink

Rework the information architecture, object model, states, and primary workflows. Preserve mature capabilities, not the wrong page model.

#### C. User-first reimagination

Rebuild the mental model from the core user job. Treat current capabilities as raw material, not as layout or flow constraints.

The directions must differ in product logic, not only color, spacing, or card styling.

For each direction, provide:

- one-line concept;
- user mental model;
- first screen;
- primary CTA;
- happy path;
- key states;
- content removed, merged, or hidden;
- how output quality is protected;
- frontend/backend contract changes;
- maturity fit;
- risk;
- migration cost.

Recommend one direction and explain why the others should not be the current target.

### Phase 6 — Expand the recommended direction

Produce a written experience blueprint covering:

1. Information architecture and the unique responsibility of each destination.
2. A stable object model.
3. States: first use, empty, ready, in progress, waiting, needs attention, approval required, executing, success, partial, failed recoverable, ambiguous/reconciling, permission blocked, stale/expired.
4. First-time, happy-path, review/approval, edit, result/learning, error/recovery, and returning-user flows.
5. Each screen's user question, primary message, primary action, evidence, advanced details, and deliberately absent content.
6. Real UX-copy examples.
7. Progressive disclosure and advanced mode.
8. Presentation of source, freshness, confidence, missing context, user correction, authority, undo, and read-back.
9. Mobile decision order, sticky actions, keyboard, focus, screen-reader, contrast, and reduced-motion behavior.

### Phase 7 — Separate UX/UI work from engineering work

Create a gap matrix with:

- current behavior/contract;
- target UX;
- UX/content action;
- frontend action;
- backend/API action;
- data/evidence dependency;
- safety/permission implication;
- maturity/risk;
- acceptance evidence.

Explicitly identify:

- problems CSS or component rearrangement cannot solve;
- fields that must be resolved by the server;
- material defaults the frontend must not guess;
- workflows that need a state machine;
- actions requiring idempotency, read-back, reconciliation, or undo;
- claims requiring a measurement gate.

### Phase 8 — Provide a migration plan

Divide the work into:

- Now: correct misleading output, broken authority, and severe friction;
- Next: the smallest vertical slice that validates the new mental model;
- Later: complete visual system, advanced controls, learning, and automation.

For each slice include:

- user outcome;
- scope;
- out of scope;
- likely files/contracts;
- acceptance criteria;
- QA evidence;
- rollback boundary.

Prefer a complete vertical slice over a broad codebase rewrite.

### Required final output

1. Executive finding
2. Evidence-backed current-state map
3. Capability → user value → UI moment map
4. Journey and friction map
5. Assumptions to discard
6. Information/content audit
7. Three redesign directions
8. Recommended experience blueprint
9. UX/UI vs engineering gap matrix
10. Prioritized migration slices
11. Open questions that materially change scope
12. Approval boundary

Generate a proposal ID such as `UX-MVP-R1`.

Close with actual actions performed, remaining proposals, and the next scope requiring authorization. A proposal reference is useful; approval does not require a fixed phrase.

### Prohibited behavior

- Do not start coding.
- Do not redraw the current screens one by one.
- Do not assume the current layout, navigation, or component boundaries survive.
- Do not use more cards, tabs, or modals to contain complexity.
- Do not use visual polish to hide state, content, contract, data-truth, or authority problems.
- Do not invent APIs, production status, user research, or measurement evidence.
- Do not skip safety, readiness, or approval merely to remove a step.
- Ground current-behavior findings in inspected evidence; make proposed flows, copy, states, and contracts concrete even with incomplete implementation access.

---

## Optional implementation follow-up

After approval, ask the agent to:

1. Reconfirm the branch, worktree, and dirty files.
2. Preserve baseline evidence.
3. Implement only the approved slice.
4. List affected files and contracts.
5. State the behaviors that remain unchanged.
6. Implement state, content, and flow before visual polish.
7. Run proportionate tests.
8. Report the before/after journey, acceptance evidence, and rollback plan.
