# Product Research

Draft 0.1 · Agent entry for decision-focused discovery, source research, and evidence synthesis.

[Visual guide](product-research.html) · [GitHub repo](https://github.com/CD3-github/product-practice-library/tree/main/prompts/product-research)

## Start

Inspect the conversation and supplied material to identify the decision, users, uncertainty, sources, and authorization. Ask only for missing information that materially changes the work. Use the user's preferred language.

Read [the research workflow](01-product-research.prompt.md) completely. Select the applicable mode; load adjacent modules only when the immediate decision requires them.

| Intent | Mode / next route | Return |
|---|---|---|
| Decide what to learn next | `research-plan` | Prioritized questions, method, sample/access plan, stopping rule |
| Investigate sources, alternatives, or constraints | `source-research` | Source ledger, comparable findings, contradictions, limits |
| Interpret existing interviews or observations | `synthesis` | Evidence-linked themes, exceptions, hypotheses, implications |
| Define what to build | [Product framing](../product-ux-rethinking/README.md) | Product concepts and a bounded proposal |
| Measure behavior or causal impact | [Analytics & experiments](../product-analytics-experimentation/README.md) | Measurement or experiment workflow |
| Compare implementation performance | [Testing & eval](../testing-evaluation-system/README.md) | Cases, graders, and fair comparison |

## Execution boundary

Default to read-only research and a report. Draft a plan for participant work unless recruitment and contact are explicitly authorized. Never fabricate interviews, users, quotes, field observations, or unavailable source content. Public research does not authorize uploading private context or transcripts to external services. Follow the authorized file-output boundary; implementation, outreach, purchases, and publishing require their own authorization.

## Copy instruction

```text
Read https://product-practice-library.vercel.app/prompts/product-research/README.md and load the workflow for my task. Use the conversation and available sources to identify the decision and evidence gaps. Research within the authorized scope; return source-linked findings, limitations, and the next decision. Ask only for missing information that materially changes the work.
```

```text
读取 https://product-practice-library.vercel.app/prompts/product-research/README.md，并选择当前任务需要的工作流。先结合对话与已有资料，明确决策和证据缺口；在已授权范围内开展研究，返回带来源的发现、局限和下一步判断。只询问会实质改变工作的缺失信息。
```
