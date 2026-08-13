# Independence Protocol

Dual review only adds value if the second reviewer can disagree naturally.

## Shared Inputs

Both arms may receive:

- exact scope;
- repository state/commit/diff identity;
- relevant source;
- repository instructions;
- tests/configuration necessary to understand the scope.

## Forbidden Cross-Exposure Before Seal

Neither arm receives the other's:

- findings;
- summary;
- verdict;
- severity;
- areas of concern;
- questions;
- omitted surfaces.

Do not seed Review B with "check whether Review A is right."

## Review B Quality Bar

Review B is not a superficial challenger.

It should independently inspect:

- correctness;
- boundaries/architecture;
- security;
- state/side effects;
- reliability;
- performance where relevant;
- observability;
- tests.

It may reach the same result, a different result, or a clean review.

## Seal

Each arm is considered sealed when its complete review output is fixed.

Cross-review comparison starts only after both seals exist.

If one arm fails or lacks evidence, report the degraded dual review rather than inventing a second
opinion.
