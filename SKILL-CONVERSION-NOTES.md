# Future skill conversion notes

Do not treat this folder as an installed skill yet.

When the prompts are stable, package them under the canonical shared skill root:

`~/.agents/skills/product-ux-rethinking/`

Recommended future structure:

```text
product-ux-rethinking/
├── SKILL.md
├── references/
│   ├── general-product-restructuring-workflow.zh-CN.md
│   ├── general-product-restructuring-workflow.en.md
│   ├── existing-mvp-ux-reimagination.zh-CN.md
│   ├── existing-mvp-ux-reimagination.en.md
│   ├── new-feature-product-planning.zh-CN.md
│   └── new-feature-product-planning.en.md
├── templates/
│   └── project-input.md
└── examples/
    ├── mvp-review-output-outline.md
    └── new-feature-plan-output-outline.md
```

The future `SKILL.md` should remain a thin router.

For every route, the main agent should first load the shared general restructuring workflow and then the selected specialized reference. Shared evidence labels, stage gates, artifact-selection rules, and structural-slice validation belong in the general reference rather than being duplicated in the router.

## Routing

- Existing implementation, MVP, engineer-first UI, redesign, reimagine, reduce friction → existing-MVP workflow.
- New feature, first-principles planning, define MVP, product concept, feature architecture → new-feature workflow.
- Hybrid case → new-feature workflow first, then existing-MVP migration audit.

## Required boundaries

- The main agent must read the selected reference completely.
- The main agent must also read the matching-language general restructuring workflow completely.
- The first run is read-only unless the user explicitly authorizes a document write.
- Implementation requires exact proposal-ID and slice approval.
- Product context/founder memory is required only when company strategy or cross-product boundaries matter.
- Current code is evidence for the MVP workflow, but optional feasibility evidence for the new-feature workflow.
- Evidence labels and maturity boundaries are required in both workflows.

## Before installation

1. Test the existing-MVP workflow on at least two different product maturity levels.
2. Test the new-feature workflow on at least two different feature types.
3. Test Chinese and English outputs for functional parity rather than literal translation.
4. Confirm the hybrid routing rule is understandable.
5. Confirm missing repo access, missing memory, and missing Lark authorization degrade clearly.
6. Remove duplicated instructions that belong in shared references.
7. Validate frontmatter for both Claude Code and Codex compatibility.
8. Install through the shared skill workflow without overwriting client-specific entries.
