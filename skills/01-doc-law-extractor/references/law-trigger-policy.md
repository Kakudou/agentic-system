# Law Trigger Policy

A law exists to govern future work. Treat law creation as a high bar.

## The Core Test

Create or update a law only when the completed work established, changed, or invalidated a rule that
future work is expected to respect.

A candidate should normally satisfy all three properties:

### 1. Normative

It says what the system or team **must, must not, should, or should not** do under a defined scope.

A descriptive fact is not enough.

Bad candidate:

> The service now uses Redis.

Potential law:

> Shared request deduplication must use the repository's Redis-backed idempotency layer rather than
> process-local state.

### 2. Durable

The rule is expected to survive the feature that revealed it.

If deleting or replacing the current feature would make the statement irrelevant, it is probably
implementation documentation rather than a law.

### 3. Evidence-backed

The rule is supported by actual implementation, tests, accepted constraints, review findings,
incidents, or established repository behavior.

Do not create a law from speculation or preference.

## Strong Triggers

Evaluate for a law when work introduces or modifies a reusable governing rule involving:

- architecture or subsystem boundaries;
- public or cross-module interfaces;
- dependency policy;
- persistence or data-ownership rules;
- authentication, authorization, secrets, trust boundaries, or exposure posture;
- performance strategy with cross-feature consequences;
- concurrency, retries, idempotency, ordering, or consistency guarantees;
- observability or failure-handling conventions;
- naming, schema, serialization, logging, or error contracts;
- compatibility or migration guarantees;
- deployment or operational invariants;
- a convention future implementations are expected to follow.

These are **evaluation triggers**, not automatic reasons to write a law.

## Weak or Invalid Triggers

Do not create a law merely because:

- a feature shipped;
- a file or module was added;
- an existing pattern was reused unchanged;
- a library was used locally;
- an internal helper changed;
- tests were added;
- code was refactored without changing a governing rule;
- a one-off workaround exists;
- the rationale is unknown;
- the rule would only restate code;
- the record would amount to a changelog entry.

## Reuse vs Establishment

Reusing an existing convention does not forge a new law.

A feature establishes a law when it makes a convention explicit, changes the governing pattern, or
creates a precedent future work is expected to follow.

## One Law or Several

Prefer one law when multiple implementation consequences come from the same governing principle.

Split laws when the rules:

- have different scopes;
- can mutate independently;
- have different supersession lifecycles;
- would no longer be quotable as one statement.

## No-Law Outcome

`NO_LAW` is a valid and often correct result.

The reasoning must identify why the observed changes are implementation-local, already governed,
non-normative, temporary, or insufficiently evidenced.
