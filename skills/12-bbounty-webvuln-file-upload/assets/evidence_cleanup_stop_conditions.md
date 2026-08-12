# Evidence, Cleanup, and Stop Conditions

## Minimum Evidence

| Field | Record |
|---|---|
| Scope | Target, authorized feature, account role, permitted samples, and rate limit |
| Test | Sample ID, one changed attribute, expected outcome, and timestamp |
| Observation | Redacted response, processing state, returned object reference, and authorized retrieval result |
| Interpretation | Confirmed control behavior, false-positive checks, and bounded impact |
| Cleanup | `deleted`, `expired`, `handed_off`, or `not_applicable`, with owner and confirmation |

## Cleanup

Use the application's intended deletion path where authorized. If deletion is unavailable, record the object reference, retention expectation, and responsible owner. Do not attempt storage-layer deletion, path guessing, or account changes.

## Stop Conditions

Stop testing and notify the engagement contact if any test object becomes publicly available unexpectedly; another user's object is exposed; processing produces elevated errors, resource pressure, or unexpected jobs; a file cannot be cleaned up; scope or sample authorization is unclear; or further confirmation would require active content, automation, concurrency, or an unapproved request pattern.
