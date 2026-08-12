# Cleanup, Stop, And Evidence Checklist

## Before

- [ ] Scope and confirmation permission recorded.
- [ ] Fixture or low-impact transition selected.
- [ ] Invariant, observation, limits, and cleanup owner declared.

## Stop Immediately If

- [ ] Authorization, ownership, or scope is unclear.
- [ ] A rate limit, alert, unexpected notification, privilege change, or third-party effect occurs.
- [ ] State cannot be observed or restored safely.
- [ ] The predeclared request or side-effect cap is reached.

## After

- [ ] Restore or remove test state.
- [ ] Verify cleanup using the authoritative source.
- [ ] Preserve timestamps, redacted correlation IDs, baseline, final state, and audit evidence.
- [ ] Classify as confirmed, not reproduced, inconclusive, or stopped.
