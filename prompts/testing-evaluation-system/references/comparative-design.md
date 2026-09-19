# Comparative design

Use when a choice between alternatives, versions, or components needs evidence. Select the comparison that answers the question; these are alternatives, not successive requirements. Return to the [design workflow](../01-design-evidence-system.prompt.md) after defining the selected protocol.

## Choose the comparison

| Question | Design | What it establishes |
|---|---|---|
| Did this iteration improve the system? | Current versus candidate version on shared, versioned cases | Change in quality, correctness, cost or reliability under the tested conditions |
| Is this product worth using instead of the user's current approach? | Product versus a credible manual process, existing tool or general-purpose AI | Comparative user value, including preparation, correction and time to usable output |
| Does this component justify its complexity? | Ablation: full system versus the same system with the component removed or replaced by a viable simpler path | Contribution conditional on the surrounding system; interactions may limit attribution |
| Can we obtain acceptable quality more cheaply or quickly? | Feasible configurations compared on quality, cost and latency, with minimum quality/safety constraints | Acceptable trade-offs, rather than a winner from an arbitrary blended score |

General-purpose AI is a candidate when it can realistically perform the same user job. Name the proposed tool/model or selection criteria, input, access, and workflow. Verify capabilities and versions before execution; unknown availability does not prevent proposing a comparison. A deterministic service does not need an AI baseline merely because this library includes one.

## Product-level alternatives and module attribution

For product value, identify the real replacement decision first. If users would supply different context to alternatives, distinguish two possible questions:

- **Natural-use comparison:** each approach receives realistic user input and preparation. Differences in setup and correction effort are part of the result.
- **Context-parity comparison:** give approaches equivalent approved information to ask what the specialized workflow adds beyond access to context. Record format transformations and any human work needed to achieve parity.

Use both only when separating context advantage from workflow value matters. Neither comparison alone isolates one internal component. For ablation, hold the surrounding path stable, provide a valid fallback, and record consequential interactions. Avoid an intentionally broken comparator.

## Specify an executable comparison

- **Arms:** name the actual candidate paths, what changes, and what stays fixed. Two arms are sufficient when they answer the question. Add arms only to resolve another consequential uncertainty.
- **Cases:** use matched tasks with comparable output requirements. Separate development from held-out cases where the claim needs generalization. Record source, segment coverage and contamination risks.
- **Controls:** fix relevant versions, input packets, permissions and evaluation criteria. For natural-use comparisons, document intentional input/resource differences rather than hiding them. Capture human effort and retries; define time or cost limits.
- **Scoring:** apply shared criteria. Blind and randomize presentation where human/model judgment is sensitive to identity or order. Preserve raw outputs and externally observable outcomes, not just agent self-reports.
- **Variation:** choose cases and repeated attempts around the decision's precision needs and cost. Repeated generations of one task are not independent new tasks. Report per-task/segment deltas and uncertainty; a small pilot yields directional evidence, not a significance claim.
- **Decision:** set meaningful improvement, protected dimensions, acceptable cost, and an inconclusive-result action before scoring. Equal quality with less user effort can be valuable; a tiny score gain with greater burden may not be.

Keep a compact arm table in the proposal, with the procedure and scoring details below it. Offline comparative gains do not establish adoption, revenue, or causal production impact; route those questions to [analytics and experimentation](../../product-analytics-experimentation/README.md).
