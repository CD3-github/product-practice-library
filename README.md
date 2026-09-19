# Product Practice Library

A library of reusable practice modules for product analysis, product planning, UX reimagination, evidence design, and AI-assisted development. A module may contain an agent router, canonical method, executable workflows, references, or a visual index.

These modules can be used from Claude Code, Codex, or another capable agent. A mature module can later gain a thin `SKILL.md` adapter for automatic discovery without duplicating its canonical method.

## Visual practice guides

| Practice | Visual guide | Agent workflow |
|---|---|---|
| Product Research · draft | [Open page](https://product-practice-library.vercel.app/prompts/product-research/product-research) | [Research entry](prompts/product-research/README.md) |
| Product Framing · draft | [Open page](https://product-practice-library.vercel.app/prompts/product-ux-rethinking/product-framing) | [Planning entry](prompts/product-ux-rethinking/README.md) |
| UX Rethinking · draft | [Open page](https://product-practice-library.vercel.app/prompts/product-ux-rethinking/ux-rethinking) | [MVP reimagination entry](prompts/product-ux-rethinking/README.md) |
| Testing & Evaluation | [Open page](https://product-practice-library.vercel.app/prompts/testing-evaluation-system/testing-evaluation-system) | [Evidence entry](prompts/testing-evaluation-system/README.md) |
| Product Analytics & Experimentation | [Open page](https://product-practice-library.vercel.app/prompts/product-analytics-experimentation/product-analytics-experimentation) | [Analytics entry](prompts/product-analytics-experimentation/README.md) |
| Delivery & Learning · draft | [Open page](https://product-practice-library.vercel.app/prompts/delivery-learning/delivery-learning) | [Delivery entry](prompts/delivery-learning/README.md) |

The four draft guides are reviewable first versions. Framing and UX reuse the existing bilingual workflows; research and delivery add draft routing/execution guidance. These modules are not installed skills.

## Promoted shared skills

### Project Document System

Canonical local skill: `~/.agents/skills/project-document-system/`

Use it to design or audit the minimum documentation system for a complex, multi-stage, or multi-agent project; define source-of-truth ownership, contract-first parallelization, risk gates, vertical slices, writer boundaries, and integration evidence.

This method is maintained as a shared skill rather than a copyable prompt. The skill contains the generic `PROJECT-DOC-SYSTEM.md` methodology and the Pokémon collection `PROJECT-DOCS.md` as a clearly labeled worked example.

## Practice modules and prompt packages

### Context Update Discipline

Folder: `prompts/context-update-discipline/`

A feature-agnostic bilingual prompt for preventing multi-turn AI revisions from accumulating reactive negative constraints. It distinguishes scope deletion, positive replacement, and true prohibition, then requires the agent to rebuild a clean canonical version instead of preserving correction history.

Canonical files:

- `prompts/context-update-discipline/scope-deletion-and-positive-rewrite.zh-CN.md`
- `prompts/context-update-discipline/scope-deletion-and-positive-rewrite.en.md`

### Product & UX Rethinking

Folder: `prompts/product-ux-rethinking/`

This package deliberately separates two tasks that should not share one generic prompt:

1. **Existing MVP UX reimagination** — inspect an engineer-built implementation, then reconsider the UX/UI without being anchored to its current layout and flow.
2. **New feature product planning** — plan a product feature from first principles before its product model, system boundary, and MVP are settled.

Both prompts are available in Chinese and English. See the package README for the selection rule and hybrid workflow.

Canonical files:

- `prompts/product-ux-rethinking/00-general-product-restructuring-workflow.zh-CN.md`
- `prompts/product-ux-rethinking/00-general-product-restructuring-workflow.en.md`
- `prompts/product-ux-rethinking/01-existing-mvp-ux-reimagination.zh-CN.md`
- `prompts/product-ux-rethinking/01-existing-mvp-ux-reimagination.en.md`
- `prompts/product-ux-rethinking/02-new-feature-product-planning.zh-CN.md`
- `prompts/product-ux-rethinking/02-new-feature-product-planning.en.md`

### AI Product System Audit

Folder: `prompts/ai-product-system-audit/`

A feature- and repository-agnostic bilingual prompt for auditing an existing AI product, agent workflow, generation pipeline, or orchestration harness. It verifies the real end-to-end path; identifies documented-but-unwired, unreachable, redundant, and unmeasured capabilities; tests modularity through removal drills; separates schema and contract layers; and combines tests and evals with appropriate code, human or model graders so stage-level and E2E quality can be improved safely.

Canonical files:

- `prompts/ai-product-system-audit/ai-product-system-audit.zh-CN.md`
- `prompts/ai-product-system-audit/ai-product-system-audit.en.md`

### Testing & Evaluation System

Folder: `prompts/testing-evaluation-system/`

A cross-project method with independently selectable design, audit, implementation, and run workflows for composing tests, evals, benchmarks, production monitoring, and human review around a concrete decision. It supports stage and real-composition evidence, baseline research and fair comparison, automated result analysis, prioritized human escalation, and Product, Engineering, and Quality & Operations views over the same artifacts.

Canonical files:

- `prompts/testing-evaluation-system/README.md`
- `prompts/testing-evaluation-system/00-testing-evaluation-system.md`
- `prompts/testing-evaluation-system/01-design-evidence-system.prompt.md`
- `prompts/testing-evaluation-system/01-audit-existing-system.prompt.md`
- `prompts/testing-evaluation-system/02-implement-approved-system.prompt.md`
- `prompts/testing-evaluation-system/03-run-eval-round.prompt.md`
- `prompts/testing-evaluation-system/testing-evaluation-system.html`

### Product Analytics & Experimentation

Folder: `prompts/product-analytics-experimentation/`

An independent practice module for designing product measurement, analyzing adoption, funnels, retention, cohorts and friction, and designing or interpreting controlled experiments. It connects product behavior and causal impact to tests, offline/online evals, reliability, cost, and safety without mixing their claim boundaries.

Canonical files:

- `prompts/product-analytics-experimentation/README.md`
- `prompts/product-analytics-experimentation/00-product-analytics-experimentation.md`
- `prompts/product-analytics-experimentation/01-product-evidence-workflow.prompt.md`
- `prompts/product-analytics-experimentation/product-analytics-experimentation.html`

## Preserved initial prompts

The following earlier prompt files remain available for history and specialized use. The Product & UX Rethinking package above is the canonical source for the two reusable prompt families.

### Initial engineer-first UX review prompt

File: `prompts/01-ai-coding-agent-ux-reimagination.zh-CN.md`

Language: Chinese.

### Feature deep analysis with mandatory Lark output

File: `prompts/02-feature-development-deep-analysis-lark-doc.en.md`

This remains useful when the required deliverable is specifically a Lark document plus embedded board.

Language: English.

## How to use

Copy the instruction at the top of the relevant visual guide, or give the agent its README link and your task. The agent inspects context, selects the workflow, and reads the required sources. Specify repository/source locations and allowed actions when needed. Proposals, implementation, live execution, and publishing retain separate approval boundaries.

The shared [task contract](prompts/_shared/task-contract.md) separates deliverables, evidence depth, and permissions. Designs return concrete proposals; audits substantiate current-state claims; execution follows its own authorization. [Routing cases](validation/routing-cases.md) define behavioral acceptance. Check bilingual copy consistency with `node scripts/sync-copy-instructions.mjs`.

## Library conventions

### Reading hierarchy and shared styles

The [task contract](prompts/_shared/task-contract.md#decision-ready-writing) defines context-first, decision-ready writing across workflows. In the guides, `prompts/_shared/practice-shell.css` supplies layout and theme tokens; `practice-guide.css` supplies reusable reading components, including always-visible disclosure backgrounds. Page-specific layouts live in external CSS beside their HTML. Keep presentation rules out of agent workflow instructions.

### Header search

The six HTML guides share bilingual, section-level full-text search, including collapsed content. The index contains published guide text only; it does not index repository files or send queries to a service. Result links select the matching language, reveal matching disclosures, and highlight the destination. Local `file://` previews work offline.

After changing guide content, update the generated index using the patch from `python3 scripts/build-search-index.py --patch`. Check freshness with `python3 scripts/build-search-index.py` and exercise the UI with `node scripts/check-library-search.cjs` (Playwright required; `PLAYWRIGHT_CHANNEL=chrome` selects installed Chrome). The page list lives in the index builder. Search UI/styles are maintained in `prompts/_shared/library-search.js` and `library-search.css`.

### Module conventions

- One prompt family per folder when it has multiple languages or variants.
- Use numbered filenames so the index remains stable.
- State the trigger and the situations where a prompt should not be used.
- State whether a prompt is read-only, document-writing, or implementation-authorized.
- Require evidence labels when implementation and proposed behavior may differ.
- Keep source-of-truth, permissions, AI authority, failure recovery, and QA explicit.
- Do not create a `SKILL.md` until triggers, output contracts, tool dependencies, and validation steps have been tested.

See `SKILL-CONVERSION-NOTES.md` for the future shared-skill structure.
