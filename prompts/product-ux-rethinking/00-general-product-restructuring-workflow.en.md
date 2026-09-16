# General Product Restructuring Workflow

## When to use

Use this for engineer-first products that have become functionally complex, information-heavy, or shaped around internal system structures rather than user outcomes.

It is the shared method for both post-MVP UX reimagination and the structural review that precedes solution design for a new feature. It does not replace the two specialized prompts; it defines their common standards for evidence, responsibility, risk, and deliverables.

---

## Core instruction that can be handed to another session

When facing an engineer-first, functionally complex, information-overloaded product, do not begin by optimizing its existing pages and fields. First build a source-of-truth map that distinguishes product documents, real code, API contracts, fixtures, verified capabilities, and future capabilities. Then redefine product responsibility from the outcome the user wants: decide which complexity the system should resolve and which consequential decisions must remain with the user.

Next audit truth, authority, measurement, readiness, error/recovery, and provenance risks. Simulate the complete experience with a critical text flow. Classify existing information as Keep, Rewrite, Progressive disclosure, Move, Remove, or Add. Split scope across V1/V2 and Product/Design versus Engineering.

Create side-by-side mockup variations only when genuinely different information architectures or interaction models remain. Use the same scenario and data for every variation. Finally, implement one end-to-end structural slice and validate user friction, output quality, capability truth, and execution safety together.

Do not treat the current layout, component tree, API shape, or database states as the target product model. They are evidence and migration constraints, not a user-experience mandate.

---

## Complete workflow

### Stage 0 — Establish the task, maturity, and authority

Before beginning, state:

- the outcome the user actually wants;
- current product maturity;
- whether this run is discovery, proposal, mockup, or implementation;
- which repositories, documents, and environments may be read or changed;
- which production state, external systems, and data are out of bounds;
- who owns product decisions, execution approval, and final accountability.

If a boundary is unclear, record the assumption and risk. Do not silently expand authority.

### Stage 1 — Build the source-of-truth map

Do not invent one false “single source of truth.” Record what each artifact is authoritative for:

| Source | What it can prove | Authority | Freshness | Verification | Conflict rule |
|---|---|---|---|---|---|
| Product document | intent, scope, open questions | proposed / approved | date | owner confirmation | does not override runtime behavior |
| Real code | implemented path, state, validation | implemented | commit/branch | code inspection | does not equal live verification |
| API contract/schema | request, response, error contract | contractual | version | contract/test | does not prove provider outcome |
| Fixture/mock | intended or demo state | illustrative | date | fixture inspection | cannot substantiate a real capability |
| Live response | current runtime behavior | observed | timestamp | reproducible check | proves only the observed scenario |
| Analytics/research | behavior, pain, outcome evidence | measured/reported | time window | method/sample | does not automatically prove causality |
| Future proposal | desired capability | proposed | version | not yet verified | must remain separate from current state |

Label claims as `live verified`, `implemented`, `contracted`, `partial`, `fixture only`, `documented intent`, `proposed`, `unknown`, or `unsafe/unproven`.

When sources conflict, do not merge them into a convenient narrative. Record the conflict, its consequence, and the owner of the required verification.

### Stage 2 — Reassign product responsibility from the outcome

Work backward from the user outcome, not forward from screens. Build a responsibility map:

| Responsibility | System resolves automatically | System recommends; user confirms | User must decide | Operator/admin decides |
|---|---|---|---|---|
| Context gathering | known, reliable information | missing or conflicting context | goals and preferences | policy/configuration |
| Analysis | calculation, filtering, validation | hypotheses and explanation | high-impact trade-offs | governance thresholds |
| Execution | low-risk, reversible actions | material action preview | irreversible or high-risk approval | permissions and overrides |
| Recovery | retry, resume, deduplication | recovery recommendation | accept an alternative result | incident handling |

Look for responsibility inversion: is the product asking users to enter or interpret something the system already knows, can infer, or can safely default? Conversely, is AI or automation silently taking over a decision with material consequences?

Every visible control must correspond to a material consequence. Otherwise automate, default, combine, or progressively disclose it.

### Stage 3 — Audit six non-negotiable risk areas

1. **Truth:** Are fact, inference, recommendation, prediction, and measured result distinct?
2. **Authority:** Who can view, edit, approve, execute, reverse, and override?
3. **Measurement:** How is success observed? What are the metric source, window, baseline, and attribution limits?
4. **Readiness:** Which data, permission, validation, and provider conditions must hold before execution?
5. **Error/recovery:** How do failure, timeout, partial success, duplication, stale state, and a returning session recover?
6. **Provenance:** Can users tell where information or advice came from, when it was generated, which context it used, and whether it remains valid?

For AI capabilities, also review confidence, unsupported claims, context freshness, human approval, fallback, reproducibility, and execution boundaries.

### Stage 4 — Write the critical text flow before drawing UI

Use one concrete scenario and a realistic dataset to simulate the complete experience. At each step state:

1. what the user is trying to accomplish now;
2. what the user sees;
3. what the system resolves in the background;
4. whether displayed content is fact, inference, recommendation, or result;
5. which decision the user must make and why the system cannot make it safely;
6. how state changes and where the source of truth lives;
7. how the experience resumes after failure, exit, refresh, or return.

Cover at least first use, returning use, empty, loading, partial, error, permission denied, stale, and success. Do not enter mockup work while the text flow still feels unnatural.

### Stage 5 — Perform an information disposition audit

Classify every current and proposed information element:

- **Keep:** necessary for the current task or decision, with clear meaning;
- **Rewrite:** necessary, but expressed with the wrong language, unit, hierarchy, or framing;
- **Progressive disclosure:** needed by experts or exceptions, but should not block the default flow;
- **Move:** valuable, but belongs to another stage, object, destination, or role;
- **Remove:** redundant, unactionable, unsubstantiated, or leaked from internal implementation;
- **Add:** required for trust, decision quality, readiness, measurement, or recovery.

For each item, record the user decision it serves, evidence source, default visibility, owner, staleness rule, and the mechanism that replaces it if removed.

### Stage 6 — Split scope without turning redesign into one giant project

Split on two dimensions:

| | Product/Design | Engineering |
|---|---|---|
| V1 | core responsibility model, IA, primary flow, content, required states | deliverable contracts, real data, critical validation, end-to-end slice |
| V2 | advanced controls, secondary flows, personalization | automation, scale, optimization, deeper integrations |

Label every item `must for useful/safe`, `important next`, `future capability`, or `explicitly out of scope`. “The backend already supports it” is not a reason to expose a capability in V1.

### Stage 7 — Create mockup variations only for structural disagreement

Make side-by-side variations only when the text flow and IA still support genuinely different models. The variation must concern interaction model, information hierarchy, decision timing, or system/user responsibility—not color or card styling.

Every variation must use:

- the same user and task;
- the same realistic data;
- the same edge state;
- the same output-quality and safety requirements.

Compare time to understand, decision count, input burden, trust clarity, recoverability, expert control, implementation risk, and scalability. Recommend one direction and explain why the others were rejected.

### Stage 8 — Implement one structural slice and validate four dimensions

The first implementation slice should cross the real entry point, data, decision, action, state update, and recovery path end to end. It should not be only a static screen.

Validate together:

- **User friction:** Did time to understand, steps, inputs, decisions, and recovery cost decrease?
- **Output quality:** Is the result still correct, relevant, explainable, and professionally adequate?
- **Capability truth:** Does every UI claim have a real contract, response, or reproducible verification?
- **Execution safety:** Do permission, preview, validation, idempotency, confirmation, errors, and recovery work?

Record the baseline, test scenario, observed result, remaining risk, and next decision. Do not treat a successful build, deployment notification, or attractive screenshot as completed validation.

---

## What each artifact is for

| Artifact | Use | Do not use it to |
|---|---|---|
| Core judgment article | explain why the product should be redefined and how responsibility changes | replace evidence or implementation scope |
| Table | compare maturity, responsibility, options, evidence, risk, and V1/V2 boundaries | communicate a complex temporal sequence |
| Critical text flow | simulate what the user sees, what the system does, and what the user decides before UI design | specify pixels or visual style |
| Flowchart | express state transitions, permissions, branches, and recovery only | carry long product prose or screen layout |
| Mockup variations | compare information hierarchy, interaction model, and decision timing | manufacture superficial options after the model is settled |
| Checklist | maintain implementation tasks, engineering dependencies, validation, and ongoing risk | explain why the product is defined this way |
| Evidence appendix | preserve traceability across documents, source code, contracts, real responses, and live verification | mix in unlabeled proposals |

Do not produce every format merely to appear complete. Choose the smallest artifact set that answers the current decision.

---

## Stage gates

- No source-of-truth map: do not enter product judgment.
- No responsibility map: do not design controls.
- Undefined truth, authority, readiness, or recovery: do not call it a safe MVP.
- Unresolved critical text flow: do not draw high-fidelity UI.
- No genuine structural difference: do not create mockup variations.
- No real end-to-end contract: do not claim implementation completion.
- No observable evidence: do not claim improved friction or output quality.

## Recommended final deliverables

Select and label the relevant artifacts:

1. core judgment;
2. source-of-truth and evidence map;
3. responsibility map;
4. risk audit;
5. critical text flow;
6. information disposition;
7. V1/V2 × Product/Design/Engineering scope;
8. variations only when needed;
9. structural slice and validation plan;
10. evidence appendix, open questions, and proposal ID.

Remain in read-only proposal mode until the exact proposal ID and implementation slice are approved.
