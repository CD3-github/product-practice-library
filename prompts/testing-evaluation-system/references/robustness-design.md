# Robustness and edge-case design

Use when realistic variation or failure conditions could undermine the decision. Select risk-relevant dimensions; this is not a requirement to perturb every field or build their full Cartesian product.

## Choose meaningful boundaries

Start from supported tasks, accepted inputs and actual mechanisms. A condition can be routine for one product and an edge case for another. Keep representative normal use alongside selected boundaries; label adversarial samples so they do not imply typical traffic prevalence.

| Dimension | Select when | Design the check |
|---|---|---|
| Input variability | The task can arrive in different representations | Present equivalent facts through supported languages, structures or media; verify preserved meaning and output obligations. Check the documented response to unsupported or damaged input separately. |
| Contextual complexity | Meaning depends on history, evidence or several intents | Identify active facts, corrections and requests. Vary ambiguity or distracting history; observe completion, clarification and evidence use. For actual tool chains or handoffs, inspect argument and state continuity. |
| Personalization and customization | Preferences or output options change behavior | Specify allowed adaptation and protected constraints. Change a supported preference, checking content as well as form. Judge conflicting instructions against documented authority rules. |

Preference persistence is a separate mechanism: test update, reset, opt-out or cross-user isolation only if preferences are stored or shared. Use synthetic or authorized de-identified profiles. A one-shot formatting option does not imply memory infrastructure. Unsupported customization should follow the defined fallback rather than silently promise support.

## Turn a dimension into evidence

Record **initial input/context → material variation → expected stable or changed behavior → observation/grader → decision consequence**. Input format, user preference and instruction authority remain distinct axes even when a case combines them.

- For recoverable intent, check task completion; for ambiguity that could materially change an action, check the specified clarification or safe fallback.
- For long interactions, assert which current requirements survive and which superseded details no longer apply. Freeze relevant history for reproduction.
- For customization, verify semantic quality and requested presentation separately. For disallowed requests, check both the protected behavior and usefulness of the allowed response.
- Pair normal and varied cases when diagnosis benefits; combine axes only for a credible interaction. Uncertain product behavior is a proposed criterion, not an invented requirement.

Use [agent reliability](agent-reliability-design.md) for actual tool/state/authority mechanisms and [operational validation](operational-validation.md) for selected adversarial exercises. Neither route is required merely because this reference was read.

## Define what should change and what should stay stable

Pair an original case with a controlled variation. State the expected relationship before running:

| Variation | Expected relationship to define |
|---|---|
| Equivalent wording, ordering, harmless formatting | Relevant meaning or correctness should remain stable; exact wording need not |
| Missing, noisy, conflicting or stale evidence | Confidence, clarification, abstention or fallback should follow the product contract |
| Material change to the user's goal or facts | The answer or action should change in the intended way; unchanged output can be a failure |
| Language, domain, segment or scale shift | Quality and protected requirements should remain within a specified acceptable range |
| Dependency or permission failure | Safe degradation and recovery; use [agent reliability](agent-reliability-design.md) for stateful/tool behavior |

When a single correct output is unavailable, these expected relationships can support **metamorphic testing**: check how outputs should relate under a known input change. The relationship still needs justification from the product's responsibility.

## Specify the selected cases

1. Choose a representative original case, the changed dimension, plausible severity levels, and why they matter. Start with high-impact boundaries and known failures.
2. Hold other factors stable to diagnose the effect. Add combined perturbations only for credible interactions, such as missing context during a tool outage.
3. Define the expected invariant, intended change, or permitted degradation. Include unacceptable outcomes and recovery behavior, not only average score loss.
4. Choose code assertions, a rubric, human review or a combination based on the criterion. For stochastic outputs, use a repeat plan that separates normal run variation from sensitivity to the perturbation.
5. Report original versus perturbed results, failure rate or quality delta, affected segments, and uncertainty. Critical failures remain visible even when the overall mean is good.

Expand after a pilot if failures, variance or uncovered high-risk conditions justify it. A small hand-built perturbation set establishes behavior on those conditions, not robustness to all distribution shifts. Save confirmed failures as regression cases; keep evaluation-only cases separate from tuning when making generalization claims.

Source: [OpenAI — Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices#handle-edge-cases), reviewed 2026-09-18. Dimension names follow that guide; the conditional selection and observable case protocol are this library's implementation guidance.
