# Feature Development Deep Analysis → Lark Document

Use the following prompt as a reusable template.

---
Based on `/Users/you/product-context.md` and `founder memory`, conduct a deep, evidence-grounded analysis of the feature below. Then use Lark CLI to create a well-structured Lark document containing the complete analysis.

Inside the document, create one embedded board that visualizes the end-to-end flow, important branches, system states, failure and recovery paths, decision points, and key dependencies. Keep the board readable: use clear lanes, labels, and hierarchy rather than placing every detail into disconnected nodes.

## Feature

[Clearly describe what the feature is]

## Context

[Describe the product context, target users, current flow, business goal, known constraints, known implementation maturity, and existing problems]

## Optional implementation evidence

- Relevant repo or worktree: [path]
- Relevant frontend routes/components: [paths, if known]
- Relevant backend/API: [paths or services, if known]
- Additional source documents: [links or paths]

## Working rules

1. Ground the analysis in `product-context.md`, founder memory, and any provided implementation evidence.
2. Clearly distinguish among:
   - current verified behavior;
   - implemented but unverified behavior;
   - prototype or fixture behavior;
   - proposed behavior;
   - assumptions;
   - unknowns that require confirmation.
3. Do not invent product capabilities, user research, API behavior, data, or production status.
4. Treat the current UI and implementation as evidence, not automatically as the correct product model.
5. Analyze the feature from product, UX, engineering, QA, and user growth/retention perspectives.
6. Optimize for a useful and safe product, not for the maximum number of features.
7. Do not implement or modify product code in this task. The authorized external write is the requested Lark document and its embedded board.

## Analysis requirements

### 1. Problem and success definition

Explain:

- the user and business problem this feature solves;
- the primary user job;
- why the problem matters now;
- the expected user and business value;
- what success looks like;
- leading indicators, outcome indicators, and guardrail metrics;
- what the feature should not claim or attempt to solve.

### 2. Main flow and branch flows

Describe the end-to-end flow in user language, including relevant branches such as:

- entering or starting the flow;
- first-time versus returning-user behavior;
- reviewing prefilled or inferred information;
- editing;
- confirming;
- cancelling;
- retrying;
- leaving midway and returning later;
- waiting for processing;
- completing the flow;
- handling partial completion;
- recovering from failure;
- viewing or changing the result later.

For each important step, identify the user goal, system action, required data, decision, state transition, and recovery path.

### 3. Key use cases and user roles

Cover:

- primary users and permission roles;
- common scenarios;
- less obvious but important scenarios;
- first-time and expert users;
- single-entity and multi-entity users, when relevant;
- different user goals that materially change the flow;
- internal operators or reviewers, when relevant;
- cases that should be explicitly out of scope.

### 4. Edge cases, failure cases, and partial-success cases

Analyze the relevant cases, including:

- missing or incomplete input;
- invalid, conflicting, or unsupported data;
- stale data;
- upload or processing failure;
- timeout;
- permission or authentication issues;
- duplicate actions or repeated submissions;
- concurrent edits;
- third-party API failure;
- rate limits or delayed provider results;
- partial success across multiple objects;
- ambiguous results where the system cannot immediately confirm success or failure;
- user departure during an operation;
- retries that could accidentally duplicate work;
- expired drafts, approvals, previews, or estimates;
- rollback, undo, or reconciliation needs.

For each high-priority case, state what the user sees, what the system does, whether automatic retry is safe, and how recovery works.

### 5. UX confusion, explanation, and control

Identify where users are likely to become confused or lose trust.

Classify information and actions into:

- must be explained;
- must be confirmed;
- must be editable;
- must be reversible;
- should happen automatically;
- may use a safe default;
- must remain under explicit user control;
- belongs in progressive disclosure or an advanced view;
- should be removed because it adds friction without decision value.

Also explain how the experience should communicate system status, uncertainty, missing context, source/freshness, and the consequences of the user's decision.

### 6. System states, data dependencies, and source of truth

Define only the states relevant to this feature. Examples may include:

- draft / saved / submitted / completed;
- queued / processing / partially completed / failed;
- pending approval / approved / rejected / expired;
- unpublished / scheduled / published;
- active / paused / stopped;
- pending provider confirmation / verified / ambiguous / reconciling;
- fresh / stale / unavailable.

For the important state transitions, identify:

- the source of truth;
- which service or system owns the transition;
- required identifiers and versioning;
- freshness and invalidation rules;
- idempotency requirements;
- how frontend state stays synchronized;
- what happens after timeout, refresh, logout, or return visits;
- which derived values must not overwrite canonical facts.

### 7. Permissions and module connections

If relevant, explain:

- who can view, create, edit, approve, execute, publish, cancel, undo, or delete;
- organization, account, location, or object scope;
- dependencies on other modules;
- how changes propagate to connected modules;
- privacy, consent, and data-isolation requirements;
- what a user without permission can still inspect;
- how permission failures should appear in the UX.

### 8. AI responsibility boundaries, context, and validation

Explain:

- what AI should do;
- what AI should not decide or execute;
- the context AI requires;
- source, freshness, scope, and provenance requirements;
- which outputs require deterministic validation, human review, or provider verification;
- how uncertainty and missing context are represented;
- how users can edit, reject, regenerate, or override AI output;
- what must be preserved for auditability and reproducibility;
- how to prevent AI-generated advice from being confused with an executable action;
- what quality and safety evaluations are needed.

### 9. Risks, limitations, pros/cons, and trade-offs

Cover:

- product and adoption risks;
- UX complexity and trust risks;
- engineering and operational risks;
- data-quality and measurement risks;
- privacy, permission, compliance, or brand risks;
- third-party dependency risks;
- maintainability and scaling risks;
- assumptions that may be wrong;
- decisions that create future lock-in;
- trade-offs between automation and user control;
- trade-offs between a lightweight experience and preserving output quality.

### 10. MVP versus later versions

Define:

- the smallest useful and safe version;
- must-have capabilities and states;
- must-have validation, permissions, error recovery, and QA;
- what can come later;
- what should not be built now;
- what should remain manual or approval-gated;
- what evidence is required before expanding automation;
- a recommended phased sequence.

Do not describe a feature as MVP if it works only on the happy path but cannot preserve data, authority, or recovery safety.

### 11. Highest-priority QA and testing cases

Do not attempt to list every possible test. Prioritize:

- core happy paths;
- the most damaging edge cases;
- permission and scope isolation;
- duplicate-action and idempotency risks;
- timeout and third-party failure;
- partial and ambiguous results;
- leave-and-return recovery;
- stale data and version conflicts;
- important browser/responsive/accessibility behavior;
- regression risks to adjacent modules;
- observability or operational checks required before launch.

For each priority case, state the expected result and the main failure it prevents.

### 12. Questions requiring confirmation

List only questions that could materially change scope, user value, information architecture, system ownership, data truth, permissions, safety, or implementation order.

Group them by:

- product;
- design/UX;
- engineering/data;
- QA/release;
- growth/measurement.

Where possible, provide a recommended default and explain the consequence of choosing differently.

## Required embedded board

Create one board inside the Lark document. It should contain:

1. Actor or role lanes.
2. Entry points and prerequisites.
3. The primary happy path.
4. Material user decision points.
5. Edit, cancel, retry, leave-and-return, and completion branches.
6. Important error, partial-success, ambiguous, and recovery branches.
7. Relevant system states and transitions.
8. External systems or modules involved.
9. Source-of-truth ownership where it changes across the flow.
10. Human approval or AI authority boundaries.

Use visual hierarchy and a legend. Keep detailed prose in the document; use the board to make relationships and transitions understandable at a glance.

## Required Lark document structure

Create the final Lark document with this structure:

1. Title and document status
2. Executive summary
3. Recommendation and product principle
4. Evidence and maturity notes
5. Problem and success definition
6. Users, roles, and use cases
7. Main flow and branch flows
8. Embedded end-to-end board
9. Edge, failure, partial-success, and recovery cases
10. UX explanation and control model
11. System states, dependencies, and source of truth
12. Permissions and module connections
13. AI responsibilities, context, and validation
14. Risks, limitations, pros/cons, and trade-offs
15. MVP, later versions, and explicit non-goals
16. Priority QA and testing matrix
17. Critique: where to avoid overbuilding
18. Questions requiring confirmation
19. Most important next decisions and recommended next steps

Use concise paragraphs, decision tables, and checklists where appropriate. Preserve useful English product and engineering terms when they are clearer than forced translations.

## Final critique and next-step requirement

End the document with:

1. A critique of where the current or proposed design may be overbuilt.
2. Elements that should be simplified, deferred, kept manual, or removed.
3. Assumptions with the weakest evidence.
4. The five most important questions to resolve next.
5. A recommended immediate next step, owner, and decision evidence.

After creating the document and board, return:

- the Lark document title;
- the Lark document URL;
- a one-paragraph summary of the recommendation;
- any source, permission, or implementation limitations encountered;
- confirmation that no product code was modified.

---
