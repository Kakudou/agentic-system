# File Upload Prevention

## Control Objectives

Accept only business-required formats, validate them server-side, isolate processing, and ensure untrusted objects cannot be executed or accessed without authorization.

## Prevention Baseline

- Enforce an allowlist using server-side signature and parser validation, not client metadata alone.
- Generate opaque server-side object names and ignore path semantics in supplied names.
- Store originals outside application-executable paths and deny execution in the storage and delivery layers.
- Process supported formats in isolated, resource-limited workers; re-encode images where practical.
- Require authorization for retrieval, use expiring shares where needed, and send conservative response headers.
- Limit size, dimensions, count, rate, and retention; scan and quarantine according to the product threat model.
- Log validation and processing outcomes without retaining unnecessary sensitive file content.

## Verification

Regression tests should prove that unsupported or malformed benign inputs are rejected safely, accepted objects receive server-generated names, unauthorized retrieval is denied, and derivatives are delivered with the intended headers.

## Sources

- [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
- [PortSwigger Web Security Academy: File upload vulnerabilities](https://portswigger.net/web-security/file-upload)
