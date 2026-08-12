# Six BDD Phases

## Phase 1 — Gherkin Spec

Purpose: define the observable behavior contract in domain language.

Outputs:

- Feature boundary.
- Approved scenarios.
- Observable outcomes.
- Explicit actor/intent/value when meaningful.

Do not include implementation identifiers in `Then`.

The user owns behavior approval. Silence is not consent.

## Phase 2 — Trap Analysis

Purpose: challenge the happy path before implementation.

Interrogate all seven trap families from `gherkin-and-traps.md`.

Critical/major approved traps become explicit constraint scenarios under:

```text
# ---- Constraints identified ----
```

Do not convert an unapproved trap into a requirement.

## Phase 3 — RED Tests

Purpose: encode approved behavior as executable failure evidence.

Rules:

- use the repository's existing test stack;
- for Python repositories using this doctrine's preferred convention, raw pytest with
  `_given/_when/_then` helpers is valid;
- do not introduce pytest-bdd merely because the behavior was expressed in Gherkin;
- assertions must be real;
- a failing test must fail because behavior is absent/wrong, not because the test cannot import.

Test authoring and test execution are separate operations.

Phase 3 completes only with actual RED evidence.

## Phase 4 — GREEN Implementation

Purpose: implement only enough behavior to satisfy the approved tests.

Rules:

- one failing behavior at a time when practical;
- no assertion weakening;
- no unrelated architecture cleanup;
- no unrequested dependencies;
- respect established architecture and repository conventions.

Implementation and GREEN test execution are separate operations.

Phase 4 completes only with actual GREEN evidence.

## Phase 5 — Refactor

Purpose: improve structure without behavior change.

Sequence:

1. Keima performs one bounded preservation-risk challenge.
2. Fuhyō performs one atomic refactor.
3. Focused tests run.
4. GREEN must remain.
5. Repeat only for the next independent refactor.

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
- new dependency;
- weakening/modifying tests to accommodate the refactor.

## Phase 6 — Quality

Purpose: close delivery with mechanical evidence and independent judgment.

Mechanical evidence may include repository-relevant:

- lint;
- formatting;
- type checks;
- import hygiene;
- focused/full tests;
- architecture rules;
- build/package verification.

Fuhyō produces the evidence.

Ginshō independently judges whether the evidence meets the accepted bar.

Remediation may loop, but do not hide endless cycles. After three material remediation cycles,
escalate the remaining problem instead of pretending convergence.
