# Evidence and Stop-Condition Checklist

Use before, during, and after every bounded assessment. A stop is a successful safety control, not a failed test.

## Before Testing

- [ ] Written authorization and endpoint scope are recorded.
- [ ] Authentication, account recovery, token, admin, and destructive paths are excluded unless expressly authorized.
- [ ] Expected input type and a non-sensitive test record are known.
- [ ] Normal baseline includes method, headers, status, response shape, and test-record scope.
- [ ] Request budget, low rate, and escalation contact are known.

## Stop Immediately When

- [ ] Session, authentication, authorization, tenant, or ownership behavior changes.
- [ ] A response includes records or fields outside the known test record.
- [ ] The request could write data, enqueue work, send a notification, or trigger a financial or security workflow.
- [ ] The service becomes slow, unstable, rate-limited, or produces an unbounded response.
- [ ] Further confirmation would require expression execution, patterns, timing manipulation, enumeration, brute force, or data retrieval.

## Evidence to Preserve

- [ ] Scope and authorized role.
- [ ] Input contract and query-role hypothesis.
- [ ] Sanitized baseline and differential request metadata.
- [ ] Status, response schema, stable error category, and test-record-only observation.
- [ ] Repeatability under identical controls.
- [ ] Relevant sanitized logs, trace identifiers, or source-review location when available.
- [ ] False-positive controls checked and stop decision.
- [ ] Remediation recommendation and retest limitations.

## Do Not Preserve

- [ ] Credentials, tokens, cookies, personal data, secrets, or full sensitive response bodies.
- [ ] Payload collections, extraction output, or unrelated records.
