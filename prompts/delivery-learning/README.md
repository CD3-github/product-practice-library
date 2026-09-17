# Delivery & Learning

Draft 0.1 · Agent entry for scoped delivery, release readiness, handoff, and learning after a change.

[Visual guide](delivery-learning.html) · [GitHub repo](https://github.com/CD3-github/product-practice-library/tree/main/prompts/delivery-learning)

Read [the delivery workflow](01-delivery-learning.prompt.md) completely. Recover the approved proposal, exact checkout, runtime environment, evidence, and authority from available context. Ask only for materially missing inputs. Respond in the user's preferred language.

| Intent | Mode | Return |
|---|---|---|
| Plan implementation of an agreed direction | `slice-plan` | Dependencies, contracts, acceptance, risk gates, ownership |
| Implement explicitly approved work | `approved-slice` | One bounded end-to-end change with test/eval evidence |
| Check whether work is ready to release or hand off | `readiness-review` | Verified status, blockers, rollout/rollback and handoff |
| Learn from delivered work | `learning-review` | Evidence-linked findings, regression candidates, next decision |

## Authority

Default to planning or review. Product approval, code-edit approval, paid/live execution, production migration, release, and external communication are separate permissions. An implementation approval does not implicitly authorize deploying or contacting users. If the proposal is missing or materially changed, return to [product framing or UX rethinking](../product-ux-rethinking/README.md).

## Load only relevant supporting workflows

- [AI product system audit](../ai-product-system-audit/README.md): wiring, harness, contracts, removability, recovery.
- [Testing & eval](../testing-evaluation-system/README.md): evidence design, implementation, or one verification round.
- [Analytics & experiments](../product-analytics-experimentation/README.md): behavior and impact evidence.
- [Context update discipline](../context-update-discipline/README.md): clean canonical intent after feedback.

## Copy instruction

```text
Read https://product-practice-library.vercel.app/prompts/delivery-learning/README.md and select the workflow for this task. Inspect the approved direction, repository, and existing evidence. Work only within explicit authorization; return a scoped plan or verified result, release/rollback readiness, and the next decisions requiring my judgment.
```

```text
读取 https://product-practice-library.vercel.app/prompts/delivery-learning/README.md，并选择当前任务需要的工作流。先检查已确认方向、仓库与现有证据；只在明确授权范围内工作，返回范围清楚的计划或已验证结果、上线与回滚准备情况，以及需要我判断的下一步事项。
```
