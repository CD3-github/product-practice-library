# Product System Probing

Draft 0.1 · Reusable workflow for learning how a partially observable product behaves through realistic interaction.

## Purpose

Build a progressively more accurate **behavioral product model** when direct access to implementation, internal documentation, proprietary data, integrations, or the full production environment is limited.

Start from a real user job. Observe the multi-turn trajectory from intent toward outcome. Use competing hypotheses and small discriminating probes to learn how the product interprets requests, creates value, makes decisions, uses context, crosses integration boundaries, and changes behavior under incomplete or corrected information.

The objective is not exhaustive feature coverage, a formal benchmark, or proof of internal architecture. The objective is to reduce the uncertainty that would most materially change the current product understanding or next product decision.

Apply [the shared task contract](../_shared/task-contract.md). Use the current conversation, supplied artifacts, accessible product, and authorized tools. Never claim that a probe ran, a behavior occurred, or an internal mechanism exists without the corresponding evidence.

## 1. Recover the task

Infer these fields from context before asking the user to fill out anything:

- **Decision or learning objective:** What understanding or next action could change?
- **Target product and surface:** Which product, URL, workflow, feature, account, or environment is in scope?
- **User job:** What real outcome is the user trying to achieve?
- **Current uncertainty:** What is not understood yet, and which answer would materially change the behavioral model?
- **Available evidence:** Existing conversations, recordings, screenshots, notes, documentation, public access, test account, or internal corroboration.
- **Access and authority:** Whether the work is plan-only, guided, agent-operated, or hybrid; which interactions and evidence capture are allowed.
- **Constraints:** Privacy, account state, geography, cost, time, interaction budget, and prohibited actions.
- **Output:** A probe plan, live next step, executed findings, updated model, or verification handoff.

Ask only about a missing item that blocks the requested deliverable or makes the next interaction unsafe. Missing login or connected data does not block a plan or the parts of the model supported by public or supplied evidence.

## 2. Select the deliverable and execution mode independently

### Deliverable mode

| Mode | Use when | Completion |
|---|---|---|
| `probe-plan` | The user wants a concrete probing strategy but has not authorized execution | User-job scenario, initial hypotheses, baseline, prioritized probes, evidence capture, access prerequisites, stopping rule |
| `execute-probes` | The user asks the agent to interact with the target product | Recorded trajectories and evidence, updated hypotheses and boundaries, next decision or checkpoint |
| `synthesize-observations` | Conversations, recordings, screenshots, or notes already exist | Traceable observations, behavioral inferences, competing explanations, boundary model, highest-information next probe |
| `verification-handoff` | Internal documents, traces, PMs, designers, or engineers are becoming available | Prioritized verification questions and a clear separation of externally inferred versus corroborated knowledge |

Modes may be combined only when the request combines them. Planning is not execution. Synthesis does not authorize rerunning the product.

### Execution mode

| Mode | Operator | Behavior |
|---|---|---|
| `plan-only` | No one during this turn | Design the research and identify prerequisites; do not interact with the target product |
| `human-guided` | User | Give one useful probe or checkpoint at a time; interpret the returned evidence and adapt the next probe |
| `agent-operated` | Agent using authorized browser/computer tools | Execute the bounded interaction, capture evidence, and stop at authorization or human-only gates |
| `hybrid` | Agent plus user | Agent proceeds autonomously within scope; user takes over for login, verification, consent, or another explicit checkpoint |

Do not confuse execution mode with probe type. For example, a boundary probe can be performed by the user, by the agent, or through a hybrid session.

When execution is requested and browser/computer tools are available, prefer `agent-operated` or `hybrid` according to the access boundary. When execution is requested but the required tool is unavailable, continue with a concrete `human-guided` probe or plan and label the unobserved portion; do not imply that execution occurred.

## 3. Establish the research boundary

Before the first executed probe, state or infer a compact boundary:

| Field | Required decision |
|---|---|
| Target | Product, URL, surface, account/environment |
| User job | Realistic outcome being pursued |
| Operator | Human-guided, agent-operated, or hybrid |
| Allowed interaction | Pages, prompts, navigation, uploads, integrations, or actions permitted |
| Prohibited interaction | Production changes, purchases, messages, invitations, exports, deletion, or other excluded effects |
| Evidence capture | Transcript, screenshot, URL, timestamp, visible state, version/build when available |
| Stop conditions | Human checkpoint, material side effect, access failure, interaction budget, sufficient information, or low marginal learning |

Use a public, sandbox, demo, or test environment when available. Treat ordinary prompts or messages entered into a named conversational product as research interactions only when execution was requested. Do not upload private or regulated information unless the user explicitly authorizes that exact data and destination.

Do not request passwords, one-time codes, recovery codes, or secret keys. At login, multi-factor authentication, CAPTCHA, account connection, consent, or another human-only gate, pause with the browser at the checkpoint and ask the user to take over. Resume from the resulting state after the user confirms completion.

Default to non-destructive interaction. If studying an action boundary would require changing a campaign, publishing, purchasing, sending a message, inviting a person, modifying permissions, or creating another material external effect, stop at the last confirmation point and describe what remains unobserved unless that exact action is explicitly authorized in an appropriate environment.

## 4. Start from a realistic user job

Do not begin with abstract questions such as “Do you understand Amazon Ads?” or arbitrary stress tests such as “Can you remember after five turns?”

Construct or recover a scenario containing:

- a real user goal and consequential decision;
- enough ambiguity to reveal interpretation or clarification behavior;
- realistic domain context;
- an opportunity for refinement or correction;
- a possible information, integration, or action boundary.

Make synthetic scenario details clearly illustrative. Do not present them as evidence about real users or the target product.

## 5. Run the core learning loop

Use this loop until the decision is supported, access becomes the limiting factor, or marginal learning becomes low:

1. **Baseline trajectory** — Run the realistic task naturally before optimizing for edge cases.
2. **Decision points** — Identify consequential choices: what the product asks, assumes, retrieves, recommends, invokes, refuses, remembers, or offers to execute.
3. **Competing hypotheses** — Write the leading explanation and at least one plausible alternative when the distinction matters.
4. **Discriminating probe** — Change the smallest meaningful variable that makes the hypotheses predict different behavior.
5. **Observe and compare** — Record actual behavior, relevant state, and how it differs from the baseline. Tool failure, network failure, and access failure are environment observations, not product failures unless demonstrated otherwise.
6. **Update the model** — Strengthen, weaken, split, or retire hypotheses. Record the approximate behavioral boundary.
7. **Choose the next uncertainty** — Ask what remains unknown that would most materially change the model, then select the smallest useful next probe.

Do not run every probe type. Optimize for information gain per interaction rather than coverage.

## 6. Observe through six lenses

Use the lenses that fit the current uncertainty; they are not six mandatory test suites.

| Lens | Core question |
|---|---|
| User job and value path | What outcome does the product help produce, when does value appear, and what remains with the user? |
| Interaction trajectory | How does the experience move from intent through clarification, diagnosis, recommendation, refinement, action, and follow-up? |
| Domain capability | What domain concepts and relationships can the product apply to a decision, including incomplete or conflicting situations? |
| Agency and orchestration | How does it choose when to ask, investigate, invoke a capability, recommend, wait, or act? |
| Context and state | Which goals, facts, corrections, preferences, assumptions, and derived conclusions remain behaviorally active, at what scope, and with what precedence? |
| Integration boundary | What works from general knowledge, user-supplied context, connected retrieval, and authorized action? |

## 7. Select a probe type

| Probe | Use it to learn |
|---|---|
| Baseline | How the product handles a realistic task without experimental interference |
| Follow-up | How behavior develops when the same task is refined over multiple turns |
| Perturbation | Whether changing one meaningful variable changes the relevant behavior |
| Context | Whether earlier information remains active and influences later behavior |
| Conflict | Which goal, source, instruction, or constraint takes precedence |
| Boundary | Where competent behavior changes form, requires more information, or stops |
| Recovery | Whether the product genuinely revises a mistaken assumption after correction |
| Transfer | Which behavior generalizes to a structurally similar task or subdomain |
| Integration | What can be done from supplied context versus connected retrieval or action permission |

Prefer controlled comparisons. Preserve the core task and change one consequential factor when practical. Exact wording need not be identical when natural interaction is part of the product experience; record wording differences that could affect interpretation.

## 8. Preserve evidence and certainty

Every material finding uses one of these certainty types:

- **DECLARED** — The product or its documentation states the claim; this is a hypothesis source, not observed capability.
- **OBSERVATION** — Directly visible behavior under recorded conditions.
- **BEHAVIORAL INFERENCE** — A bounded explanation supported by observations.
- **IMPLEMENTATION HYPOTHESIS** — A possible internal mechanism; several architectures may produce the same behavior.
- **UNKNOWN** — Available evidence does not distinguish the explanations.
- **VERIFIED** — Confirmed through an authoritative internal source, trace, owner, or implementation evidence whose scope is recorded.

For important hypotheses, keep:

| Field | Meaning |
|---|---|
| Observation IDs | Exact evidence that motivates the hypothesis |
| Current hypothesis | Best current explanation |
| Alternative hypothesis | Another plausible explanation that predicts different behavior |
| Supporting evidence | What favors the hypothesis |
| Weakening evidence | What conflicts with or narrows it |
| Boundary | Conditions under which the behavior changes |
| Confidence | Low, medium, or high, with a short reason rather than invented precision |
| Next probe | Smallest interaction likely to distinguish the remaining explanations |

Use this qualitative evidence ladder only when it helps communicate maturity:

- **E0 Declared** — stated but not behaviorally observed;
- **E1 Observed** — seen once under recorded conditions;
- **E2 Pattern** — consistent across meaningful realistic variations;
- **E3 Discriminating** — evidence favors one competing hypothesis;
- **E4 Boundary model** — conditions where behavior changes are approximately understood;
- **E5 Corroborated** — relevant internal evidence confirms or corrects the model.

Evidence levels describe the support for a bounded claim, not a universal score for the product.

## 9. Agent-operated and hybrid browser protocol

When operating the target product directly:

1. Confirm the intended target and use the user-supplied URL, app, or named product. Do not search for or enter a similarly named production surface when the target is ambiguous.
2. Record the visible product state and relevant date/version before the baseline when available.
3. Use a clean session, new conversation, or isolated context when prior state would contaminate a comparison. Preserve existing state when context retention is the object of study; state which choice was made.
4. Enter the scenario naturally. Capture exact consequential prompts, outputs, tool/action requests, visible state transitions, errors, and integration gates.
5. Continue across turns when the product's value or state is multi-turn. Do not use an arbitrary turn count as the learning objective.
6. At a login or human gate, leave the product at the checkpoint, state what the user must do, and wait. Do not infer post-login behavior from the gate.
7. Before any material external effect, stop and obtain the required explicit authorization. A preview or confirmation screen is evidence only of the pre-action experience.
8. Distinguish browser/tool errors from target-product behavior. Retry only when a safe bounded retry can clarify the source; record unresolved infrastructure uncertainty.
9. After each informative interaction, update the evidence ledger and hypotheses before selecting the next probe. Do not accumulate undirected screenshots or transcripts.

## 10. Build the integration boundary model

When integrations matter, locate the transition among these levels:

1. **Knowledge only** — The product can explain domain concepts without account-specific context.
2. **Reasoning over supplied context** — It can analyze information the user provides manually.
3. **Connected retrieval** — It needs an integration to fetch information unavailable to the user or prompt.
4. **Authorized action** — It needs both connection and permission to change external state.

Do not treat an early request to connect as proof that reasoning requires integration. Conversely, a plausible answer without connection does not prove access to current account data. Use discriminating probes and label the boundary actually observed.

## 11. Stop proportionally

Stop the current round when one or more of these conditions applies:

- the current behavioral model is sufficient for the named decision;
- a new probe is unlikely to materially change the model;
- remaining uncertainty requires unavailable internal evidence, login, integration, proprietary data, or authorization;
- the agreed interaction/time/cost budget is reached;
- further interaction would create an unapproved external effect or privacy risk.

Stopping because of access or budget leaves uncertainty unresolved; it does not validate the hypothesis. Convert remaining uncertainty into the smallest useful next probe or verification question.

## 12. Output contract

Use [the behavioral product model template](templates/behavioral-product-model.md) when a durable artifact is useful. Scale the output to the task; do not fill sections with “not applicable” merely because the template contains them.

Open a substantial deliverable with:

1. **Current conclusion** — What the evidence currently supports about the product.
2. **Evidence strength and boundary** — What was planned, supplied, observed, inferred, or internally verified.
3. **Decision relevance** — What this changes in the product understanding or next action.
4. **Next step** — Highest-information next probe, required human checkpoint, or verification question.

For `probe-plan`, return:

- the user job, decision, scope, and execution mode;
- baseline scenario and expected trajectory checkpoints;
- initial competing hypotheses;
- a prioritized, bounded probe sequence with the variable changed and evidence to capture;
- authorization/access prerequisites and stopping rules;
- the proposed behavioral-model artifact, without fabricated observations or findings.

For `execute-probes`, return:

- the actual scope, environment, operator, and actions performed;
- the observed trajectory with stable evidence IDs;
- consequential decisions, corrections, state changes, and boundaries;
- updated hypotheses with supporting and weakening evidence;
- product findings separated from tool/access failures;
- the next probe or supported stopping decision.

For `synthesize-observations`, return:

- traceable observations from the supplied material;
- the current behavioral model across relevant lenses;
- competing explanations, exceptions, confidence, and unresolved uncertainty;
- the highest-information next probe rather than an exhaustive test inventory.

For `verification-handoff`, return:

- current observations and bounded behavioral inferences;
- implementation hypotheses that remain unverified;
- prioritized questions for product, design, engineering, data, or operations;
- the internal source or trace that could confirm each question;
- updates that should become `VERIFIED` only after corroboration.

## Direct invocation

Use this block to start a concrete run after providing this file to the agent:

```text
Use the Product System Probing workflow in this file for the task below.

Target product or URL: [product, URL, app, or supplied artifact]
User job or product area: [real task to investigate]
Decision or current uncertainty: [what understanding could change]
Available access and evidence: [public access, test account, transcripts, screenshots, docs]
Requested deliverable: [probe plan / execute probes / synthesize observations / verification handoff]
Preferred execution: [plan-only / human-guided / agent-operated / hybrid]
Allowed actions: [for example, browse and converse in a test account; no external changes]
Interaction or time boundary: [optional limit]
Output destination: [reply or file path]

Infer reasonable defaults from our conversation. Ask only about a missing item that blocks this deliverable or makes the next interaction unsafe. If direct execution is authorized and browser tools are available, begin the bounded interaction; pause only at a genuine human or authorization checkpoint. Keep declared behavior, direct observation, behavioral inference, implementation hypothesis, unknowns, and verified internal knowledge separate.
```
