# Impact And Stop-Condition Checklist

## Allowed Boundary

- [ ] Testing is limited to an owned, non-state-changing endpoint and assessor-controlled correlation value.
- [ ] No shared cache, browser/client population, authentication boundary, payment flow, or third-party integration is in scope.
- [ ] No attempt will be made to cause, consume, observe, or route a second request.

## Stop Immediately

- [ ] Request budget or authorized window is reached.
- [ ] Two consecutive unexpected timeouts, resets, or service errors occur.
- [ ] Response content, trace data, or headers suggest another user, session, request, or tenant.
- [ ] Any state change, cache anomaly, authentication change, or unexpected upstream action is observed.
- [ ] The observed route differs from the authorized architecture map.

## Escalation Evidence

Provide time, target, route, protocol boundary, redacted correlation value, request count, baseline/control summaries, and the exact stop condition. Do not include replay material or sensitive response bodies.
