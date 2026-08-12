# Finding Severity

## Critical

A credible path to severe security compromise, data corruption/loss, catastrophic incorrect
behavior, or production-wide failure.

Normally blocks release.

## Major

A concrete correctness, reliability, security, architectural, or operational defect that can
materially break the feature or create significant downstream cost.

Usually requires change before release.

## Minor

A real engineering weakness with bounded impact that should be improved but does not invalidate the
feature.

## Note

A useful observation, residual risk, or follow-up that is not itself a defect.

Do not use severity to express personal taste.

## Confidence

Use:

- `high`: direct evidence strongly establishes the problem;
- `medium`: evidence is strong but one material runtime/contract assumption remains;
- `low`: plausible risk worth human attention, not established enough for a blocker.

A low-confidence concern should not become a blocking finding without stronger evidence.
