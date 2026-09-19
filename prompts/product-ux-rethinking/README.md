# Product & UX Rethinking

Agent entry for two distinct workflows: planning a new feature and reimagining an existing implementation. Use the user's preferred language. Both routes share the general restructuring method and retain their specialized evidence requirements.

[Product framing guide · draft](product-framing.html) · [UX rethinking guide · draft](ux-rethinking.html) · [GitHub repo](https://github.com/CD3-github/product-practice-library/tree/main/prompts/product-ux-rethinking)

## Route automatically

Apply [the task contract](../_shared/task-contract.md). Infer the deliverable, maturity, required evidence, and authorization from context. Read the selected workflow and matching-language shared method; apply only phases relevant to this deliverable. Shared implementation guidance specifies future acceptance for a proposal, not permission to execute it.

| Intent / starting point | Required workflow | Return |
|---|---|---|
| The product model, responsibility, or MVP is not yet settled | New-feature planning: [简中](02-new-feature-product-planning.zh-CN.md) / [EN](02-new-feature-product-planning.en.md) | Evidence, distinct concepts, recommended model, lifecycle, MVP, proposal |
| A real MVP or production implementation needs rethinking | Existing-MVP UX reimagination: [简中](01-existing-mvp-ux-reimagination.zh-CN.md) / [EN](01-existing-mvp-ux-reimagination.en.md) | Verified baseline, friction, structural directions, experience blueprint, migration slices |
| Both the product model and an existing implementation need review | Plan the target model first, then audit migration with the MVP workflow | A coherent proposal with implementation evidence and safe migration |

Shared method: [简中](00-general-product-restructuring-workflow.zh-CN.md) / [EN](00-general-product-restructuring-workflow.en.md).

Current-code claims in the MVP route require current-code evidence. If access is partial, bound the current-state assessment and still propose a target experience from supplied materials; mark compatibility and migration assumptions. In new-feature planning, code is optional feasibility input. The source map may contain documents, observations, explicit assumptions, and unknowns; it does not require a complete implementation inventory.

## Authority and execution

1. Default to read-only analysis and proposal; create documents only in the authorized destination.
2. Distinguish documented intent, implemented behavior, fixtures, live observations, proposals, and unknowns.
3. Build the source map, user/system responsibility map, and truth/authority/readiness/recovery review before high-fidelity UI.
4. Write the critical text flow and classify information as Keep, Rewrite, Progressive disclosure, Move, Remove, or Add.
5. Compare meaningful product directions. Use mockups only when a structural choice remains.
6. Split scope across V1/V2 and Product/Design versus Engineering. Identify dependencies that visual changes cannot solve.
7. Return the requested proposal and a bounded next slice. Use a stable proposal reference where useful; implement only when the scope is explicitly authorized, without requiring a literal approval phrase.
8. Validate friction, output quality, capability truth, and execution safety together.

## Copy instruction

~~~text
Read https://product-practice-library.vercel.app/prompts/product-ux-rethinking/README.md. Identify this turn's deliverable from our conversation, load only the relevant workflow, and complete it.
Choose source-inspection depth to fit the task. Separate facts, design assumptions, and unverified items. Complete what available context supports; list later implementation or run requirements as execution prerequisites. Ask only about gaps that block this deliverable. Keep all actions within this turn's authorization.
Project: [describe the project or problem to solve]
Project context: [repository path, relevant material, or data]
~~~

~~~text
读取 https://product-practice-library.vercel.app/prompts/product-ux-rethinking/README.md，结合当前对话识别本轮交付物，按需加载工作流并直接完成。
按任务选择必要的资料检查深度，区分事实、设计假设与待验证项。先完成已有信息支持的部分，将后续实施或运行条件列为执行前提；只询问阻止本轮交付的问题。所有操作遵守本轮授权。
本轮项目：[填写项目或要解决的问题]
项目上下文：[仓库路径、相关资料或数据]
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
