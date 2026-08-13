# Six BDD Phases

## Phase 1 — Gherkin Spec

Purpose: define the observable behavior contract in domain language.

Outputs:

- feature boundary;
- accepted scenarios;
- observable outcomes;
- actor/intent/value when meaningful.

Do not hide implementation assumptions in `Then` steps.

Behavior approval must be explicit when new requirements are being defined.

## Phase 2 — Trap Analysis

Purpose: challenge the happy path before implementation.

Interrogate all seven trap families from `gherkin-and-traps.md`.

Critical/major accepted traps become explicit constraint scenarios under:

```text
# ---- Constraints identified ----
```

Do not convert an unapproved risk hypothesis into a requirement.

## Phase 3 — RED Tests

Purpose: encode accepted behavior as executable failure evidence.

Rules:

- use the repository's existing test stack;
- assertions must be real;
- a failing test must fail because behavior is absent/wrong, not because the test cannot import or collect;
- test authoring and test execution are separate facts.

Phase 3 completes only with actual RED execution evidence.

## Phase 4 — GREEN Implementation

Purpose: implement only enough behavior to satisfy the accepted tests.

Rules:

- implement one failing behavior at a time when practical;
- do not weaken assertions;
- do not perform unrelated architecture cleanup;
- do not add unrequested dependencies;
- respect established architecture and repository conventions.

Implementation and GREEN execution evidence are separate facts.

## Phase 5 — Refactor

Purpose: improve structure without behavior change.

For each atomic refactor:

1. identify preservation risk and simplification objective;
2. make one bounded structural change;
3. run focused tests;
4. require GREEN before another refactor.

Allowed examples:

- rename;
- extract;
- inline;
- move;
- simplify conditionals;
- add types;
- split modules.

Forbidden:

- public behavior change;
- contract/API change;
- new dependency unrelated to the accepted behavior;
- weakening tests to accommodate the refactor.

## Phase 6 — Quality

Purpose: close delivery with applicable mechanical evidence and an independent judgment.

Evidence may include repository-relevant:

- lint;
- formatting;
- type checks;
- import hygiene;
- focused/full tests;
- architecture rules;
- build/package verification.

Missing tooling is unavailable evidence, not a pass.

Avoid endless remediation loops. After repeated material failures, surface the blocker instead of pretending convergence.
