# Feature Recovery

## Entry-Point Clustering

Group entry points into one feature candidate when they share a business subject, lifecycle, or
external capability.

Do not create one feature per source file.

Flag entanglement when one entry point combines unrelated business concerns.

## Behavior Trace

For each observable path identify:

```text
trigger → precondition → action → state/side effect → observable outcome
```

Trace explicit failure paths too.

## Cross-Call Invariants

Always perform a second pass for four architecture-agnostic signals.

### Shared Persistent State

Operation A writes state that operation B later reads.

Recover the user-visible invariant created by that relationship.

### Probabilistic / Weighted Selection

Random, weighted, ranked, or scored selection changes externally visible behavior.

Recover the selection rule only to the precision encoded by source evidence.

### Accumulators

Counters, histories, ratios, quotas, matrices, or ledgers evolve across calls.

Recover what must remain true across updates.

### Implicit Sequencing

Operation B only makes sense after A, even if source code does not explicitly validate the order.

If the sequence is merely assumed rather than enforced, report the assumption as a gap/implicit
constraint, not implemented behavior.

## Confidence

Use:

- `high`: direct source/test evidence;
- `medium`: code relationship strongly supports behavior but a material assumption remains;
- `low`: plausible interpretation requiring human confirmation.

Low-confidence behavior should normally remain outside assertive Gherkin.
