# Evidence and Stop-Condition Checklist

## Before Testing

- [ ] Scope, allowed inputs, methods, rate limits, impact ceiling, and stop contact are recorded.
- [ ] Designated account/test data and cleanup path are available where needed.
- [ ] Baseline request metadata and normal latency variation are captured.
- [ ] Chosen observation is the least-impactful applicable method.
- [ ] Timing or controlled callback testing has explicit permission.

## Evidence for a Confirmed Observation

- [ ] Target, input, platform hypothesis, and observation type are identified.
- [ ] Redacted baseline and differential metadata show one changed variable.
- [ ] Inline evidence includes repeatable paired comparison and parser/validation alternatives considered.
- [ ] Timing evidence includes sample order, distribution, threshold, and repeated result.
- [ ] Callback evidence includes unique identifier, timestamp correlation, and background-traffic controls.
- [ ] No command output, target-derived data, filesystem artifact, or unauthorized account data was collected.

## Stop Immediately When

- [ ] Errors, latency, resource use, or availability exceed the agreed limit.
- [ ] Output appears sensitive, execution seems to have occurred, or state changes unexpectedly.
- [ ] A callback is unexpected, duplicated, unrelated, or cannot be confidently attributed.
- [ ] Scope, authorization, platform hypothesis, or observation interpretation is uncertain.
- [ ] Minimum proof has been collected.

## Closeout

- [ ] Restore or remove controlled state if any was created.
- [ ] Redact secrets, cookies, identifiers, and personal data.
- [ ] Record false-positive controls, stop reason, cleanup status, and remediation direction.

## Source

- PortSwigger: <https://portswigger.net/web-security/os-command-injection>
