# Product & UX Rethinking Prompt Pack

This package contains two different prompt families. They should not be merged into one generic “UX prompt,” because they start from different evidence and authorize different kinds of reasoning.

Both prompt families use one shared restructuring workflow:

- `00-general-product-restructuring-workflow.zh-CN.md`
- `00-general-product-restructuring-workflow.en.md`

The shared workflow defines source-of-truth mapping, responsibility allocation, risk review, critical text flows, information disposition, scope splitting, artifact selection, structural-slice validation, and stage gates. The two specialized prompts then apply those standards to different starting conditions.

## Choose the correct prompt

### 01 — Existing MVP UX reimagination

Use when engineers have already implemented an MVP, prototype, or partial production feature and the current UI/flow has become implementation-led, dense, or difficult to use.

The agent must:

- inspect the real repository, routes, components, services, states, and contracts;
- treat the current UI as evidence, not as the target model;
- separate underlying capability from its current presentation;
- identify where engineering structures leaked into the user experience;
- propose materially different UX directions;
- preserve output quality, data truth, permissions, and execution safety;
- stop for approval before modifying code.

Files:

- `01-existing-mvp-ux-reimagination.zh-CN.md`
- `01-existing-mvp-ux-reimagination.en.md`

### 02 — New feature product planning

Use when a product feature is being planned from first principles, before its product model, user flow, system boundary, and MVP have been settled.

The agent must:

- validate the problem before designing the solution;
- define users, jobs, outcomes, authority, and non-goals;
- explore genuinely different product concepts;
- design the lifecycle, flows, states, permissions, and recovery model;
- define AI and system responsibilities;
- separate MVP from later capability;
- produce an approval-ready product plan before implementation.

Files:

- `02-new-feature-product-planning.zh-CN.md`
- `02-new-feature-product-planning.en.md`

## Decision rule

Use **01** when there is a real implementation whose behavior and constraints must be audited.

Use **02** when the main question is still “what should this feature be?” rather than “how should this implemented feature be redesigned?”

If a project is in between:

1. Run **02** first to establish the intended product model.
2. Run **01** second to compare that model with the existing MVP and design a safe migration.

## Important distinction

The two prompts share principles—user outcomes, evidence, progressive disclosure, authority, safety, and approval-first execution—but their baselines differ:

| Prompt | Starting point | Primary question | Role of current code |
|---|---|---|---|
| Existing MVP UX reimagination | Real implementation | How should this experience be reconceived? | Required evidence and migration constraint |
| New feature product planning | User/business problem | What should this feature become? | Optional feasibility input, not the product model |

## Usage

1. Read the shared workflow in the preferred language.
2. Choose prompt 01 or prompt 02 using the decision rule above.
3. Copy both the shared workflow and the selected specialized prompt into the agent session, or give the agent their exact paths.
4. Replace every `[placeholder]`.
5. Add exact document and repo paths when available.
6. Keep the first run read-only and proposal-only.
7. Approve the proposal ID and implementation slice explicitly before code changes.

## Artifact selection

Do not request every format by default:

- use a core judgment article to explain why the product definition must change;
- use tables for maturity, responsibility, options, evidence, risk, and V1/V2 boundaries;
- use a critical text flow before UI to simulate what the user sees, what the system resolves, and what the user decides;
- use a flowchart only for state, permission, branching, and recovery logic;
- use mockup variations only when materially different information hierarchies or interaction models remain;
- use a checklist for implementation tasks, engineering dependencies, validation, and ongoing risk;
- use an evidence appendix for traceability across documents, code, contracts, real responses, and live verification.

## Future skill conversion

This folder is intentionally structured so it can later become a shared skill. A future `SKILL.md` should be a thin router:

- route implemented MVP redesign requests to prompt 01;
- route first-principles feature planning requests to prompt 02;
- load the shared restructuring workflow before either specialized reference;
- define evidence and memory requirements;
- preserve read-only versus implementation authorization boundaries;
- keep the bilingual prompt bodies as references rather than embedding them in the router.

The eventual skill should be installed under the shared root `~/.agents/skills/`, not made tool-specific.
