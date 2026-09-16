# Product Practice Library

A reusable prompt collection for product analysis, product planning, UX reimagination, and AI-assisted development.

This folder is intentionally a prompt library, not an installed Claude Code skill. Prompts can be copied into Claude Code, Codex, or another coding agent. The collection is structured so stable prompt families can later be packaged as a shared skill.

## Promoted shared skills

### Project Document System

Canonical local skill: `~/.agents/skills/project-document-system/`

Use it to design or audit the minimum documentation system for a complex, multi-stage, or multi-agent project; define source-of-truth ownership, contract-first parallelization, risk gates, vertical slices, writer boundaries, and integration evidence.

This method is maintained as a shared skill rather than a copyable prompt. The skill contains the generic `PROJECT-DOC-SYSTEM.md` methodology and the Pokémon collection `PROJECT-DOCS.md` as a clearly labeled worked example.

## Prompt packages

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

A feature- and repository-agnostic bilingual prompt for auditing an existing AI product, agent workflow, generation pipeline, or orchestration harness. It verifies the real end-to-end path; identifies documented-but-unwired, unreachable, redundant, and unmeasured capabilities; tests modularity through removal drills; separates schema and contract layers; and redesigns deterministic testing and probabilistic evals so both stage-level and E2E quality can be improved safely.

Canonical files:

- `prompts/ai-product-system-audit/ai-product-system-audit.zh-CN.md`
- `prompts/ai-product-system-audit/ai-product-system-audit.en.md`

### Testing & Evaluation System

Folder: `prompts/testing-evaluation-system/`

A cross-project method and three-prompt workflow for composing tests, evals, benchmarks, production monitoring, and human review around a concrete decision. It supports stage and real-composition evidence, baseline research and fair comparison, automated result analysis, prioritized human escalation, and Product, Engineering, and Quality & Operations views over the same artifacts.

Canonical files:

- `prompts/testing-evaluation-system/00-testing-evaluation-system.md`
- `prompts/testing-evaluation-system/01-design-or-audit.prompt.md`
- `prompts/testing-evaluation-system/02-implement-approved-system.prompt.md`
- `prompts/testing-evaluation-system/03-run-eval-round.prompt.md`
- `prompts/testing-evaluation-system/testing-evaluation-system.html`

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

1. Read the general restructuring workflow in the preferred language.
2. Choose the correct prompt family and language.
3. Replace every `[placeholder]`.
4. Add exact repo/worktree and source-document paths when implementation evidence matters.
5. Keep the initial run read-only and proposal-only.
6. Require exact proposal-ID approval before implementation.

## Library conventions

- One prompt family per folder when it has multiple languages or variants.
- Use numbered filenames so the index remains stable.
- State the trigger and the situations where a prompt should not be used.
- State whether a prompt is read-only, document-writing, or implementation-authorized.
- Require evidence labels when implementation and proposed behavior may differ.
- Keep source-of-truth, permissions, AI authority, failure recovery, and QA explicit.
- Do not create a `SKILL.md` until triggers, output contracts, tool dependencies, and validation steps have been tested.

See `SKILL-CONVERSION-NOTES.md` for the future shared-skill structure.
