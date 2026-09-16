# Context Update Discipline: Delete Scope, Do Not Accumulate Negations

## Why this is needed

In multi-turn work, AI often appends user feedback as another “do not” clause instead of updating the current goal. Over time, prompts, specifications, and answers retain removed concepts, accumulate conflicting constraints, and drift away from the result the user actually wants. This rule makes the AI absorb feedback into one clean, coherent current version.

## When to use it

Use it with any coding agent, chatbot, image/video prompt, product plan, copywriting, data-analysis, workflow, or API-design task that is revised repeatedly through context and feedback.

---

## Minimal reusable version

```text
Treat user feedback as an edit to current intent, not appended correction history. Delete out-of-scope content and its dependencies; replace rejected attributes or approaches with the desired positive state instead of “do not X.” Keep negative constraints only for explicit prohibitions or higher-priority safety, compliance, and permission rules. After each turn, return a clean current version without stale, duplicate, or conflicting instructions or revision history.
```

---

## Recommended full version

```text
CONTEXT UPDATE AND SCOPE-DELETION RULE

Treat the current prompt, specification, plan, contract, or answer as mutable canonical state—not as an append-only chat log. New user feedback updates that canonical state. Once an older requirement is removed or superseded, it must no longer influence the result.

Classify each piece of feedback before applying it:

1. SCOPE DELETION
   The user says something is unnecessary, outside the current scope, should be removed, need not be considered, or is no longer relevant.

   Response:
   - remove the item from the current content;
   - also remove fields, steps, branches, examples, explanations, validation, schemas, UI,
     tests, acceptance criteria, and other contract surfaces that exist only for it;
   - do not rewrite it as "do not include X," "avoid X," or another negative constraint;
   - do not keep repeating it in summaries, rationale, or examples unless a formal
     out-of-scope decision must be recorded.
   - scope deletion does not itself authorize destructive implementation; if a public
     contract, persisted data, or external dependency already exists, propose a
     deprecation, migration, compatibility, and rollback plan instead of breaking it.

2. POSITIVE REPLACEMENT
   The user is not rejecting the entire concept. They are changing an attribute,
   degree, tone, visual style, behavior, or implementation approach, and the desired
   direction can be determined reliably from context.

   Response:
   - delete the rejected old description;
   - replace it with the positive target the user actually wants;
   - describe what should appear, which state should hold, or which result should occur;
   - do not preserve revision residue such as "not the old version."

   Examples:
   - "I do not want harsh lighting" → "Use soft, even, natural diffused light with
     clear but restrained depth."
   - "Do not make it so formal" → "Use a natural, direct, conversational tone."
   - "Do not make users fill in so many fields" → "Require only inputs necessary to
     complete the task; resolve the rest from reliable context or validated defaults."

   If the positive replacement cannot be inferred reliably, remove the old requirement,
   retain the issue as an open question, and ask for clarification only when it would
   materially change the result. Do not convert uncertainty into a prohibition.

3. TRUE PROHIBITION
   Create or retain a negative constraint only when:
   - the user explicitly says something must never happen or appear;
   - safety, privacy, compliance, permissions, brand, or another higher-priority rule
     requires a prohibition; or
   - a high-risk failure mode needs an explicit guardrail because positive wording alone
     does not create a reliable boundary.

   Response:
   - make the prohibition specific, narrow, actionable, and testable;
   - name the object and condition it governs;
   - do not escalate an ordinary preference into a permanent ban;
   - do not repeat semantically identical prohibitions;
   - remove the prohibition from canonical state when its condition no longer applies.

4. SUPERSESSION AND CONFLICTS
   - a newer instruction at the same priority supersedes an older conflicting one;
   - higher-priority rules remain in force and cannot be overridden by lower-priority
     feedback;
   - when two still-valid requirements genuinely conflict, surface the conflict and ask
     for a decision instead of pretending more negative constraints resolve it;
   - do not keep both old and new versions merely to preserve conversation history.

5. REBUILD THE CURRENT VERSION
   After a material change, rebuild the result from the updated canonical intent rather
   than appending patch notes to the old text. During the rebuild:
   - remove stale, superseded, duplicate, and contradictory content;
   - consolidate remaining requirements into clear, positive, non-repetitive language;
   - preserve genuinely necessary guardrails;
   - ensure that deletion did not accidentally remove the core outcome, output quality,
     or required contract;
   - present only the clean current version unless the user requests revision history.

Before delivering, check:

- Does a deleted concept still survive as "do not X"?
- Was a preference change incorrectly escalated into a prohibition?
- Can any remaining negative wording be replaced by a positive desired state?
- Do fields, examples, branches, or acceptance criteria remain after their requirement
  was superseded?
- Can the current version be understood without knowing its correction history?
- Do necessary safety, authority, quality, and contract boundaries still hold?

Default output: provide the cleaned, complete current version. Unless explicitly
requested, do not output a change log made primarily of newly added prohibitions.
```

---

## Classification examples

| User feedback | Type | Correct handling | Incorrect handling |
|---|---|---|---|
| “This feature does not need export.” | Scope deletion | Remove export and the UI, fields, and flow that exist only for it | Keep the export model and add “never show the export button” |
| “I do not want harsh lighting.” | Positive replacement | Specify soft, even, natural diffused lighting | Append “no harsh light, no shadows, avoid dramatic lighting” |
| “Do not make it so formal.” | Positive replacement | Specify a natural, direct, conversational tone | Keep the formal-tone instruction and append “not formal” |
| “An unauthorised user must never see another tenant’s data.” | True prohibition | Preserve an explicit, testable authorization guardrail | Write only “keep the experience secure” |
| “Skip collaboration for now; consider it in V2.” | Scope deletion + future boundary | Remove it from V1 and record it only as a future capability | Add many V1 branches saying collaboration must stay disabled |

## Usage guidance

- Use the minimal version when you need one compact guardrail.
- Use the full version when a task spans many turns or must keep specifications, code,
  and contracts aligned.
- This rule governs how context is updated. It does not replace domain-specific safety,
  quality, or technical requirements.
