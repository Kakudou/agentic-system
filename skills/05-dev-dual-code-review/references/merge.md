# Merge and Adjudication

The merge is an evidence reconciliation, not majority voting.

## Duplicate / Agreement

Two findings are equivalent when they describe the same underlying defect and failure mode.

Merge them into one finding with:

- combined strongest evidence;
- provenance `both`;
- severity justified from evidence;
- confidence normally increased only when the evidence is genuinely independent.

## Unique Finding

A finding from only one arm survives when its evidence is valid.

Provenance:

- `arm_a`
- `arm_b`

Do not penalize discovery uniqueness.

## Contradiction

Examples:

- one arm says a race exists, the other says locking prevents it;
- one arm considers an API change breaking, the other sees internal-only usage;
- reviewers disagree on whether a test proves the invariant.

Resolve by inspecting the controlling evidence.

Record:

- claim A;
- claim B;
- evidence;
- resolution;
- remaining uncertainty.

If evidence cannot resolve it, mark `unresolved` and include it in residual risks.

## Severity Merge

Do not blindly choose the maximum severity.

Choose the severity supported by the merged evidence and actual failure impact.

## Verdict Derivation

- any established critical release blocker → `BLOCK`;
- established major blocker(s) → at least `CHANGES_REQUIRED`;
- only bounded minor findings → `APPROVE_WITH_NOTES`;
- no material finding → `APPROVE`.

An unresolved potentially major/critical disagreement may itself justify `CHANGES_REQUIRED` until
resolved.
