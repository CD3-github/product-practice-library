# Delivery & Learning

Draft 0.1 · Agent entry for scoped delivery, release readiness, handoff, and learning after a change.

[Visual guide](delivery-learning.html) · [GitHub repo](https://github.com/CD3-github/product-practice-library/tree/main/prompts/delivery-learning)

Apply [the task contract](../_shared/task-contract.md) and read [the delivery workflow](01-delivery-learning.prompt.md). Select the requested mode. A slice plan uses the agreed direction and available constraints; exact checkout, current interfaces, and runtime evidence become necessary for implementation or readiness claims. State assumptions and later execution prerequisites. Respond in the user's preferred language.

| Intent | Mode | Return |
|---|---|---|
| Plan implementation of an agreed direction | `slice-plan` | Dependencies, contracts, acceptance, risk gates, ownership |
| Implement explicitly approved work | `approved-slice` | One bounded end-to-end change with test/eval evidence |
| Check whether work is ready to release or hand off | `readiness-review` | Verified status, blockers, rollout/rollback and handoff |
| Learn from delivered work | `learning-review` | Evidence-linked findings, regression candidates, next decision |

## Authority

Default to planning or review. Product approval, code-edit approval, paid/live execution, production migration, release, and external communication are separate permissions. An implementation approval does not implicitly authorize deploying or contacting users. Use an agreed direction in the conversation even without a formal proposal file. Route unresolved product-model decisions to [product framing or UX rethinking](../product-ux-rethinking/README.md); complete the supported delivery plan meanwhile.

## Load only relevant supporting workflows

- [AI product system audit](../ai-product-system-audit/README.md): wiring, harness, contracts, removability, recovery.
- [Testing & eval](../testing-evaluation-system/README.md): evidence design, implementation, or one verification round.
- [Analytics & experiments](../product-analytics-experimentation/README.md): behavior and impact evidence.
- [Context update discipline](../context-update-discipline/README.md): clean canonical intent after feedback.

## Copy instruction

```text
Read https://product-practice-library.vercel.app/prompts/delivery-learning/README.md. Identify this turn's deliverable from our conversation, load only the relevant workflow, and complete it.
Choose source-inspection depth to fit the task. Separate facts, design assumptions, and unverified items. Complete what available context supports; list later implementation or run requirements as execution prerequisites. Ask only about gaps that block this deliverable. Keep all actions within this turn's authorization.
Project: [describe the project or problem to solve]
Project context: [repository path, relevant material, or data]
```

```text
读取 https://product-practice-library.vercel.app/prompts/delivery-learning/README.md，结合当前对话识别本轮交付物，按需加载工作流并直接完成。
按任务选择必要的资料检查深度，区分事实、设计假设与待验证项。先完成已有信息支持的部分，将后续实施或运行条件列为执行前提；只询问阻止本轮交付的问题。所有操作遵守本轮授权。
本轮项目：[填写项目或要解决的问题]
项目上下文：[仓库路径、相关资料或数据]
```
