# Evidence and Severity

Every material finding needs enough evidence for another reviewer to understand and challenge it.

## Finding Shape

Use:

```text
lens: <lens>
severity: critical | major | minor | note
confidence: high | medium | low
claim: <specific issue>
evidence: <concrete observation/source>
impact: <why it matters>
recommendation: <bounded improvement, when useful>
```

## Severity

### Critical

Credible path to catastrophic failure, severe security/safety harm, data loss/corruption, or complete failure of the stated purpose.

### Major

Material correctness, reliability, feasibility, usability, or requirement failure that should be addressed before relying on the submission.

### Minor

Real weakness with bounded impact.

### Note

Useful context, residual risk, preference, or optional improvement that is not itself a defect.

## Confidence

- `high` — direct or strongly corroborated evidence.
- `medium` — meaningful evidence with one material assumption or uncertainty.
- `low` — plausible concern requiring verification.

Low-confidence concerns should not become critical blockers without stronger evidence.
