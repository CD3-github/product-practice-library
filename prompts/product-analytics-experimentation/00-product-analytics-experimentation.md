# Product Analytics & Experimentation

Version 0.3 · reusable cross-project method

## Purpose

Use this practice to turn product behavior into decisions:

- define trustworthy product signals;
- understand what users or accounts do across a workflow and over time;
- locate friction and meaningful differences between cohorts;
- turn observations into testable product hypotheses;
- estimate causal impact when a controlled experiment is feasible;
- connect product outcomes to quality, reliability, cost, and safety evidence.

## Position in product development

```text
user need + product responsibility
        ↓
product question and decision
        ↓
measurement contract
identity + events + metrics + cohorts + exposure
        ↓
baseline observation and diagnosis
adoption + funnels + retention + journeys + segments
        ↓
hypothesis and intervention
        ↓
controlled experiment when attribution is required and feasible
        ↓
rollout + production validation + continued learning
```

Testing & Eval runs alongside this path:

```text
system correctness + output quality + safety + reliability
        ↓
quality and release evidence
        ↘
          combined product decision
        ↗
behavior + workflow outcomes + causal product impact
```

A product can improve usage while reducing output quality, or improve an offline eval without changing user behavior. Keep both evidence streams available until the decision is made.

## 1. Define the decision contract

Record:

- **Decision:** what action this evidence may change.
- **Question:** the uncertainty to resolve.
- **Population:** eligible users, accounts, stores, sessions, or other entities.
- **Unit:** the entity counted, assigned, or analyzed.
- **Behavior/window:** what action counts and over what time.
- **Comparison:** prior period, cohort, benchmark, control, or treatment.
- **Metric role:** primary, secondary, diagnostic, guardrail, or data-quality check.
- **Practical threshold:** the smallest difference worth acting on.
- **Claim boundary:** descriptive, diagnostic, predictive, or causal.
- **Owner/consequence:** who decides and what each outcome triggers.

## 2. Match the method to the question

| Product question | Method | Reusable output |
|---|---|---|
| Are eligible users discovering and starting the feature? | Adoption and activation analysis | Eligible population, first-use rule, activation milestone, time-to-value |
| Where does a defined workflow lose users? | Funnel analysis | Ordered events, conversion window, exclusion rules, step and segment conversion |
| Do users or accounts return and receive repeated value? | Retention/cohort analysis | Cohort entry rule, return behavior, interval, retention curve |
| What happens before or after a key action? | Journey/path or sequence analysis | Common paths, loops, detours, exits, and candidate friction |
| Which populations behave differently? | Segment and cohort comparison | Pre-defined slices, effect differences, sample sizes, uncertainty |
| How much effort does the workflow require? | Edit/retry/override/time/cost analysis | Effort distribution, failure clusters, assisted versus completed outcomes |
| Did one intervention cause a change? | Randomized controlled experiment or another defensible causal design | Effect estimate, uncertainty, guardrails, validity checks, and bounded decision |

Product analytics can show what changed, where, for whom, and what is associated. It can generate and prioritize hypotheses. Causal attribution requires an experiment or another design whose assumptions are explicit and defensible.

## 3. Build the measurement foundation

The foundation connects **who is counted → what happened → how the result is calculated**. For example, identify each user consistently, record successful saves, then calculate the share of users who save a draft within seven days of starting it. A measurement contract records these definitions so code, queries, and reports use the same rules.

### Identity contract

Identity determines whether two actions belong to the same person or account. One person using two devices should still count as one user when the metric is defined per user; a team-level metric may instead count a shared account or workspace.

Define:

- user, account, organization, workspace, store, device, and anonymous identity;
- merge and alias rules;
- cross-device and multi-user behavior;
- analysis unit versus experiment-assignment unit;
- eligibility, employee/test traffic, bots, and deletion handling.

### Event contract

An event records an action at a defined moment. A click on Save and a successful save represent different facts. Specify which fact the metric needs, then verify that the event is emitted at that point.

Every decision-critical event should specify:

- canonical name and user meaning;
- trigger point and source owner;
- required properties and types;
- actor, target entity, session, feature, and version identifiers;
- client/server authority and deduplication key;
- timestamp semantics and late-arrival policy;
- success, failure, cancellation, retry, and recovery distinctions;
- privacy classification and retention rule;
- validation query or test.

### Metric contract

A metric turns records into a number using a defined population, formula, and time window. If 40 of 100 users who started a draft save it within seven days, user completion is 40%. Counting save events instead of distinct users answers a different question.

Record:

- plain-language definition;
- numerator, denominator, unit, aggregation, and window;
- eligible population and exclusions;
- source events and accepted versions;
- directionality and practical threshold;
- owner and decision use;
- known failure modes and validation checks.

### Cohort contract

A cohort is a reusable group sharing a property or behavior. Define its entry rule, observation window, whether membership is fixed or dynamic, and the entity being grouped. Avoid post-treatment cohorts when interpreting experiments because the treatment itself may change membership.

Distinguish these terms:

| Term | Meaning | Example |
|---|---|---|
| Cohort | People or accounts sharing a defined characteristic or behavior | Users who saved a draft last month |
| Time cohort | A cohort defined by a shared starting period; “同期群” is clearest in this context | Users who signed up in the same week |
| Experiment assignment | Assigning an eligible unit to a variant according to the experiment design | Randomly assign eligible new users to A or B |
| Bucketing | A technical mechanism for repeatable assignment; stability depends on identifiers and configuration | A stable user identifier maps to the same group across visits |
| Exposure | Reaching the defined point where the assigned variant can affect the experience | Opening the editor containing the changed button |

A cohort may define experiment eligibility; eligible members can then be randomized into variants. Cohort membership and variant assignment have different purposes. In Chinese reader-facing explanations, prefer `Cohort（按共同条件定义的人群）` and `实验分组`; introduce `分桶（bucketing）` when explaining assignment mechanics.

### Exposure contract

A user assigned to a new editor may never open it. Record assignment and exposure separately; choose the analysis population in advance. Exposure-conditioned analysis can be biased if the treatment changes who becomes exposed.

For experiments and staged rollouts, record assignment and actual exposure separately:

- experiment and variant version;
- assignment unit and hashing/bucketing rule;
- eligibility and exclusion timing;
- exposure event and trigger;
- first-exposure timestamp;
- cross-device/account consistency;
- contamination and fallback behavior;
- rollback and kill-switch state.

## 4. Verify the records and calculations before interpreting change

Missing success events can make completion appear to fall; duplicate events can inflate an event-count metric. Verify a few known user actions end to end and check that the same definition is used across periods and variants before attributing movement to the product.

Check:

- event volume and property completeness;
- duplicate, missing, late, or reordered events;
- identity merge and account rollup behavior;
- client/server disagreement;
- release/version coverage;
- timezone and analysis-window consistency;
- eligibility and denominator drift;
- assignment/exposure mismatch;
- sample-ratio mismatch for experiments;
- bot, employee, QA, and repeated-test traffic;
- dashboard/query agreement on the same contract.

Classify each conclusion as `valid`, `valid with caveat`, `measurement repair required`, or `unverified`.

## 5. Analyze behavior without overclaiming

Use this sequence:

1. Reproduce the metric from its contract.
2. Establish the baseline level and historical variance.
3. Break down the workflow by lifecycle stage or funnel step.
4. Compare pre-defined cohorts and segments with sample sizes.
5. Inspect distributions, not only averages.
6. Connect anomalies to releases, incidents, quality signals, seasonality, or population mix.
7. Generate alternative explanations.
8. Identify the next observation, qualitative research, product change, or experiment that would separate those explanations.

Every finding should include:

- evidence and reproducible query;
- scope and time window;
- observed difference and uncertainty;
- plausible explanations;
- disconfirming evidence or missing data;
- claim boundary;
- next decision or investigation.

## 6. Design a controlled experiment

Pre-register:

- problem statement and hypothesis;
- intervention and single intended difference between variants;
- eligibility and assignment unit;
- control, treatment, and exposure semantics;
- one primary metric closely linked to the intervention;
- secondary diagnostics and quality/safety/business guardrails;
- baseline rate/variance;
- minimum detectable effect or practical-significance threshold;
- power/sample-size assumptions and expected duration;
- statistical model and confidence/decision rule;
- sample-ratio and instrumentation checks;
- segment policy and multiple-comparison handling;
- novelty, seasonality, interference, and contamination risks;
- stopping, rollback, ramp, and follow-up rules.

Use A/A selectively when assignment, exposure, metric plumbing, or statistical behavior is new or materially changed. A/A validates the experiment system; it does not estimate product uplift.

## 7. Analyze an experiment

Run validity checks before interpreting impact:

1. Confirm planned eligibility, assignment, exposure, and analysis unit.
2. Check sample-ratio mismatch, missing exposure, contamination, and instrumentation drift.
3. Confirm duration, stopping rule, and metric versions.
4. Report the primary effect estimate, interval/uncertainty, and practical significance.
5. Review guardrails and pre-registered secondary metrics.
6. Examine pre-defined heterogeneous effects; label exploratory slices clearly.
7. Separate triggered/exposed analysis from intent-to-treat and state the trade-off.
8. Record the decision, limitations, rollout plan, and follow-up measurement.

Allowed conclusions include:

- `Ship or expand`
- `Iterate and retest`
- `Keep control / stop`
- `Collect more evidence`
- `Repair measurement and rerun`
- `Roll back`

## 8. Connect AI quality to product outcomes

| Evidence | Question | Claim boundary |
|---|---|---|
| Offline eval | Does the candidate perform well on curated or historical cases? | Pre-release quality and regression evidence |
| Online eval + monitoring | Does quality remain acceptable on live traces? | Live quality, safety, reliability, and drift |
| Product analytics | How do users behave and where does the workflow succeed or fail? | Observation and association |
| Controlled experiment | Did the intervention change the selected product outcome? | Causal impact within the experiment design |

Useful shared measures include latency, cost, retries, human correction effort, acceptance, override, abandonment, and incident rate. Carry a common feature/release/variant version and trace identifier so evidence can be joined without losing provenance.

## 9. Agent and human collaboration

The agent should:

- verify contracts and data validity;
- run approved reproducible queries or analysis;
- check alternative explanations and uncertainty;
- produce charts/tables only when they clarify the decision;
- classify each finding by claim type;
- identify the smallest next evidence step;
- escalate precise interpretation or decision questions.

Humans decide:

- which user or business outcome matters;
- whether practical impact justifies cost and trade-offs;
- whether a hypothesis matches product/domain context;
- whether risk and guardrail movement is acceptable;
- whether to ship, iterate, stop, or collect more evidence.

## 10. Reusable artifacts

Maintain only the artifacts required by the current workflow:

- decision contract;
- identity/event/metric/cohort/exposure registry;
- reproducible query or analysis manifest;
- dashboard with decision purpose and owner;
- experiment brief and pre-registration;
- experiment validity and result report;
- append-only finding and decision log;
- links to related quality/eval evidence.

## Primary references

- [Amplitude cohort definitions](https://amplitude.com/docs/analytics/define-cohort): groups based on shared characteristics, behavior, and time windows.
- [Amplitude consistent and sticky bucketing](https://amplitude.com/docs/feature-experiment/advanced-techniques/sticky-bucketing): assignment stability and configuration changes.
- [Amplitude Analytics](https://amplitude.com/docs/analytics): adoption, funnels, retention, journeys, cohorts, and reusable behavioral analysis.
- [Amplitude Experiment overview](https://amplitude.com/docs/feature-experiment/overview): hypotheses, variants, traffic allocation, exposure, metrics, and experiment analysis.
- [OpenAI evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices): objectives, datasets, metrics, comparison, and continuous evaluation for AI quality.
- [LangSmith evaluation types](https://docs.langchain.com/langsmith/evaluation-types): offline evals, online evals, production traces, and the production-to-dataset feedback loop.
