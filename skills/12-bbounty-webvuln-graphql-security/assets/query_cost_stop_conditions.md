# Query-Cost And Stop-Condition Checklist

This checklist limits validation to a fixed, low-risk comparison. It is not a performance-testing plan.

## Before A Cost Check

- [ ] Written permission names aliases, batching, or nesting as permitted.
- [ ] The exact maximum alias count, batch size, nesting depth, pagination size, and request count are recorded.
- [ ] The operation is read-only, uses controlled known-safe values, and returns minimal fields.
- [ ] A normal baseline exists using the same role, object, response shape, and network context.
- [ ] A rate limit, maintenance window, program contact, and stop procedure are known.
- [ ] No mutation, credentials, discount/token verification, user lookup enumeration, or guessable input is involved.

## During The One Comparison

- [ ] Use only the approved fixed ceiling; do not scale, repeat, automate, or combine techniques.
- [ ] Observe only response classification, server-provided control feedback, and timing as supplemental information.
- [ ] Preserve no more response data than is needed to show the control decision.

## Stop Immediately On

- Increased latency compared with baseline, timeout, 5xx response, connection instability, or background processing.
- Rate limiting, throttling, query-cost/depth rejection, resource warning, partial response, or unexpected error.
- Unexpected data, any state indication, inability to redact safely, or uncertainty about scope.
- Any desire to increase aliases, batch elements, query depth, breadth, pagination, concurrency, or request rate.

## Interpretation

| Result | Meaning |
|---|---|
| Control rejects or constrains the comparison | Protective behavior; record and stop. |
| Comparison succeeds within its approved small limit | Normal behavior unless a material policy gap is independently demonstrated. |
| Timing changes without server-side evidence | Inconclusive; do not claim performance impact. |
| Unexpected protected data | Stop cost testing and follow the authorization validation workflow. |
