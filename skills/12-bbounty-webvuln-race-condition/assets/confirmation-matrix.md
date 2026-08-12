# Confirmation And False-Positive Matrix

| Observation | Required corroboration | Likely false positive | Action |
| --- | --- | --- | --- |
| Different response status | Authoritative final state and operation ID | Retry or frontend variance | Classify inconclusive if state is consistent |
| Delayed state visibility | Audit record after documented consistency interval | Queue, replica, cache | Wait once; do not repeat or add load |
| Duplicate acknowledgment | One durable outcome and idempotency record | Safe replay handling | Not a finding if state converges |
| Invariant mismatch | Before/after state and audit correlation | Fixture reset or stale read | Stop, preserve evidence, escalate |
| Unexpected side effect | Cleanup status and scope review | None assumed | Stop immediately and notify program contact |

## Bounds

- One disposable identity and one reversible transition.
- Use the predeclared minimum confirmation cap only.
- No automation, timing manipulation, request amplification, or testing of real value or other users.
