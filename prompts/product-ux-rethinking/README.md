# Product & UX Rethinking

Agent entry for two distinct workflows: planning a new feature and reimagining an existing implementation. Use the user's preferred language. Both routes share the general restructuring method and retain their specialized evidence requirements.

[Product framing guide · draft](product-framing.html) · [UX rethinking guide · draft](ux-rethinking.html) · [GitHub repo](https://github.com/CD3-github/product-practice-library/tree/main/prompts/product-ux-rethinking)

## Route automatically

Inspect the conversation, product maturity, evidence, and authorization before asking for missing inputs. Read the selected workflow and the matching-language shared method completely.

| Intent / starting point | Required workflow | Return |
|---|---|---|
| The product model, responsibility, or MVP is not yet settled | New-feature planning: [简中](02-new-feature-product-planning.zh-CN.md) / [EN](02-new-feature-product-planning.en.md) | Evidence, distinct concepts, recommended model, lifecycle, MVP, proposal |
| A real MVP or production implementation needs rethinking | Existing-MVP UX reimagination: [简中](01-existing-mvp-ux-reimagination.zh-CN.md) / [EN](01-existing-mvp-ux-reimagination.en.md) | Verified baseline, friction, structural directions, experience blueprint, migration slices |
| Both the product model and an existing implementation need review | Plan the target model first, then audit migration with the MVP workflow | A coherent proposal with implementation evidence and safe migration |

Shared method: [简中](00-general-product-restructuring-workflow.zh-CN.md) / [EN](00-general-product-restructuring-workflow.en.md).

Current code is required evidence for the MVP route. In new-feature planning, exploratory code is feasibility input; the user job and evidence define the product model. Missing access remains unverified.

## Authority and execution

1. Default to read-only analysis and proposal; create documents only in the authorized destination.
2. Distinguish documented intent, implemented behavior, fixtures, live observations, proposals, and unknowns.
3. Build the source map, user/system responsibility map, and truth/authority/readiness/recovery review before high-fidelity UI.
4. Write the critical text flow and classify information as Keep, Rewrite, Progressive disclosure, Move, Remove, or Add.
5. Compare meaningful product directions. Use mockups only when a structural choice remains.
6. Split scope across V1/V2 and Product/Design versus Engineering. Identify dependencies that visual changes cannot solve.
7. Return a proposal ID and the next bounded slice. Implement only after explicit approval of the proposal and slice.
8. Validate friction, output quality, capability truth, and execution safety together.

## Copy instruction

~~~text
Read https://product-practice-library.vercel.app/prompts/product-ux-rethinking/README.md. Select the new-feature planning or existing-MVP reimagination route from my task and context. Read the required shared method and specialized prompt. Return an evidence-backed proposal and the next decision, staying within the authorized phase.
~~~

~~~text
读取 https://product-practice-library.vercel.app/prompts/product-ux-rethinking/README.md，根据任务与上下文选择新功能规划或已有 MVP 重新构想路径。完整读取所需通用方法与专项 prompt，在授权阶段内交付有证据的提案与下一项决定。
~~~

## Supporting practices

- [Product Research](../product-research/README.md): unresolved user, alternative, or feasibility questions.
- [AI Product System Audit](../ai-product-system-audit/README.md): harness, wiring, schema, contract, and removal risks.
- [Testing & Eval](../testing-evaluation-system/README.md): evidence design and quality verification.
- [Delivery & Learning](../delivery-learning/README.md): approved slice, release readiness, and handoff.
- [Context Update Discipline](../context-update-discipline/README.md): clean canonical intent after feedback.

## Choose useful artifacts

Use a core judgment for product responsibility, tables for comparisons, a text flow for experience, flowcharts for states/recovery, variations for unresolved structure, a checklist for work, and an evidence appendix for traceability. Select only artifacts that help the current decision.

A future skill adapter should route to these canonical files. The package is reusable guidance, not an installed skill.
