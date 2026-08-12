# Delta Scoring

Read before assigning the retrospective delta.

## What the Score Means

The delta measures **how much better the improved starting prompt is than the original prompt**, based on observed friction and missing information.

It is not a quality score for the final prompt and not a reward for a clean original request.

## Scale

Use integer scores `0–5` per dimension:

- `0` — no meaningful improvement; original already covered this dimension
- `1` — tiny clarification; little practical effect
- `2` — modest improvement; avoids minor ambiguity or one small correction
- `3` — material improvement; prevents meaningful rework or uncertainty
- `4` — major improvement; fixes several consequential gaps or one severe gap
- `5` — transformative improvement; original was substantially underspecified on this dimension and the new prompt resolves it with strong evidence

## Dimensions

### `specificity`

How much the rewrite replaces vague intent with precise operations/outcomes that proved necessary.

### `boundary_coverage`

How much the rewrite captures must/must-not rules, edge conditions, or acceptance boundaries that surfaced during execution.

### `context_clarity`

How much missing environment, domain, project state, inputs, or audience context was added because the execution demonstrably needed it.

### `scope_discipline`

How much the rewrite prevents expansion, omission, or mixing of tasks relative to the delivered scope.

## Overall

Use the rounded mean of the four dimensions by default.

Override the mean only when one dimension clearly dominated the actual execution cost; if overriding, state the reason in one short note.

## Zero-Friction Runs

Zero friction is valid. A strong original prompt can produce:

`0/5 · 0/5 · 0/5 · 0/5 · overall 0/5`

That is a successful retrospective, not a failure to find issues.
