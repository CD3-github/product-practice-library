# Context Update Discipline

A bilingual, feature-agnostic prompt for preventing reactive AI revisions from accumulating unnecessary negative constraints.

## Files

- `scope-deletion-and-positive-rewrite.zh-CN.md`
- `scope-deletion-and-positive-rewrite.en.md`

## Core model

Classify feedback before rewriting:

1. **Scope deletion** — remove the concept and related contract surfaces.
2. **Positive replacement** — replace a rejected attribute or approach with the desired positive state.
3. **True prohibition** — retain a negative constraint only for an explicit ban or a genuine higher-priority guardrail.

After applying feedback, rebuild the clean canonical version rather than preserving an append-only history of corrections.

Each language file contains a compact version for easy injection and a full version for long-running agent workflows.
