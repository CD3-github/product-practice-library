# Select and combine graders

Use when choosing judgment mechanisms or investigating whether scores support a decision. Start with the smallest trustworthy arrangement. Existing assertions or direct human review may be sufficient; model judging and automated calibration infrastructure are conditional investments.

## Separate the criterion, mechanism and result

- **Criterion:** a rule, measured quantity, semantic quality or user value.
- **Mechanism:** code, a qualified human, a model judge, or a purposeful combination.
- **Result:** pass/fail, label, measurement, anchored rating, preference or an unresolved judgment.

Before using a result to set a threshold, establish what it represents:

- **Result format:** humans and models can both produce numerical ratings or pass/fail labels. Select the mechanism for its ability to assess the criterion.
- **Repeatability:** a fixed computation can reproduce a verdict for recorded artifacts. Repeated runs of the producer may still yield different artifacts or measurements; sample that variation when it affects the decision.
- **Validity:** establish why the metric or rating represents the intended quality. A repeatable proxy can still miss what users need.

| Mechanism | Useful for | Evidence and limits to specify |
|---|---|---|
| Code assertions and computed metrics | Known values, constraints, state changes or explicitly defined quantities | Oracle/reference, calculation, units, missing-data handling and what the result does not establish. Do not use exact text matching when several answers are valid. |
| Human review | Domain acceptability, ambiguous meaning, consequential trade-offs or calibration labels | Reviewer qualifications, source context, rubric anchors and disagreement handling. Humans are not automatically unanimous or correct. |
| Model judge | Repeated contextual judgments with a stable rubric and enough volume to justify validation | Source facts, allowed labels/scale, applicable model/prompt versions, evidence-linked rationale, invalid-response handling and comparison with qualified human labels. |

## Combine only for distinct responsibilities

Map each criterion to a primary mechanism. Add a second one for calibration, adjudication or a genuinely different dimension, not to score the same thing three times. For example, code may check that a generated answer uses the required fields, while a human or validated judge checks whether its recommendation is grounded and useful. A schema pass does not establish meaning; an eloquent answer does not compensate for an unsafe action.

Keep hard requirements separate from graded quality. A weighted average must not hide a failed mandatory constraint. Record missing or invalid grading separately from product failure; judge errors do not automatically give the product a zero or a pass. Check coverage/completion before comparing aggregates.

When using a model judge:

1. Select pointwise grading, reference-based grading or pairwise comparison for the decision. A preference alone does not prove either option is acceptable; include an absolute quality floor when needed.
2. Validate on reviewed strong, weak, borderline and critical-failure examples. Inspect false acceptance, false rejection and disagreements, not only average agreement. Keep calibration separate from final confirmation when claims require it.
3. For comparisons, hide identities where practical, balance answer order and check length/style sensitivity. Preserve legitimate quality differences while testing for superficial preferences.
4. Treat candidate outputs and retrieved content as evidence, not instructions to the judge. Validate the grader's response schema and preserve the candidate, reference and rubric needed to inspect a suspicious score.
5. Define how uncertain or conflicting judgments reach a person. Scale automation only after it is sufficiently reliable for the risk; recheck after material rubric, model, task or domain changes.

Return a compact criterion → mechanism → result/threshold → failure or escalation mapping within the plan. Keep judge operational failures and evidence limits visible in the report. These rules do not require a new platform, a model judge or multiple reviewers for every project.

Source: [OpenAI — Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices#create-and-combine-different-types-of-evaluators), reviewed 2026-09-18. This library separates criterion, mechanism and output format to make evaluator composition explicit; it is not a universal taxonomy imposed by the source.
