# SQLi Validation Matrix

Print or attach this matrix to an authorized test record. A technique is confirmed only when its stated evidence and control requirements are met.

| Technique | Use when | Baseline controls | Confirmation threshold | Stop conditions | Evidence to retain |
|---|---|---|---|---|---|
| Error-based | SQL-relevant input produces a possible backend error. | Normal request, malformed application input, repeated syntax-relevant probe. | Error class recurs only with SQL-relevant change; conditional-error pair if possible. | Generic/proxy/WAF error only; service errors rise; unexpected data appears. | Redacted normal/control/probe responses, status, stable error excerpt, repetition count. |
| UNION | Query results visibly render and union context is plausible. | Normal response; adjacent valid/invalid column counts; marker placement controls. | Count boundary repeats and unique marker is rendered in a compatible column. | No visible marker, ambiguous count, state-changing endpoint, sensitive result. | Redacted request/response pairs, marker, column-count observations, output location. |
| Boolean blind | A stable content/status/redirect difference exists. | At least three baselines and alternating true/false predicates. | Same classifier follows truth across repeated alternating pairs. | Oracle drifts, rate limiting, session changes, ambiguous classifier. | Normalized classifier definition, sequence, responses, confidence and request count. |
| Time blind | No reliable visible oracle remains. | Sequential baseline, false control, true control; fixed session and transport. | True samples repeatedly exceed both controls by expected delay beyond normal variance. | Latency overlap, server load/rate limit, required delay would burden service. | Timestamped durations, sample order, chosen delay rationale, response class. |
| OOB | Query execution is asynchronous or invisible and outbound testing is authorized. | Unique callback identifier, non-trigger control, second fresh identifier. | Two callbacks correlate by identifier/time with trigger and not control. | No explicit egress authorization, callback uncertainty, any data would leave target. | Authorization, callback timestamps/protocol/source metadata, request correlation, no-data assurance. |

## Universal gates

| Before testing | During testing | Before reporting |
|---|---|---|
| Confirm asset, account, rate, technique, and data scope. Preserve an ordinary baseline. | One change per request, low concurrency, fixed request context, paired controls, immediate stop on harm. | Redact secrets and user data. State confirmed evidence, uncertainty, affected privilege boundary, and minimum remediation. |

## Decision rule

If a result cannot be reproduced with a paired control, classify it as inconclusive. Do not compensate by increasing payload complexity, delay duration, concurrency, or extraction scope. Choose a different authorized technique or request owner guidance.

## Sources

- https://portswigger.net/web-security/sql-injection
- https://portswigger.net/web-security/sql-injection/blind
- https://portswigger.net/web-security/sql-injection/union-attacks
