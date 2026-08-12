# Evidence and Friction Model

Read when identifying friction points.

## Friction Test

An event qualifies as prompt friction only when all three hold:

1. **Observed:** there is concrete evidence the event happened.
2. **Material:** it caused rework, confusion, wrong output, unnecessary branching, scope churn, or a meaningful correction.
3. **Prompt-addressable:** clearer initial information could reasonably have prevented or reduced it.

If any condition is missing, do not list it as friction.

## Common Friction Types

- `missing-context` — required environment/domain/project information arrived late
- `missing-edge-case` — a necessary edge condition was discovered through failure/correction
- `unstated-constraint` — a must/must-not rule surfaced after work began
- `scope-ambiguity` — unclear boundaries caused expansion, omission, or rework
- `contested-assumption` — the initial execution relied on an assumption later corrected
- `success-bar-gap` — “done/good” was underspecified and caused acceptance rework
- `format-gap` — required output shape was learned only after an incorrect form was produced

Use another concise type only when none of these fits.

## Evidence Anchor

Each friction point should identify the smallest useful anchor, such as:

- user correction or clarification
- failed test/assertion
- specific diff or changed decision
- rejected output section
- acceptance criterion introduced after failure

Do not use vague anchors such as “the conversation showed this”.

## Cost

Describe actual effect, not hypothetical catastrophe:

- extra revision
- wrong implementation branch
- unnecessary question
- duplicated work
- delayed validation
- scope correction

## Preventive Instruction

State the missing information that belonged in the starting prompt.

Good:

> Preserve the existing public API; change only internal retry behavior.

Bad:

> Be more careful about scope.

## Confidence

- `high` — directly supported by explicit correction/test/result
- `medium` — strongly inferred from multiple aligned events
- `low` — plausible but weakly supported; normally omit unless materially useful

CRITICAL downstream rule: no downstream skill may turn a low-confidence or invented friction point into a hard constraint without separate evidence.
