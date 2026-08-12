# File Upload Remediation Lookup

| Confirmed control failure | Primary remediation | Verification target |
|---|---|---|
| Client metadata is trusted without server validation | Allowlist required formats and validate signature plus parser result server-side | Unsupported or inconsistent benign input is rejected or quarantined |
| Supplied names influence storage or retrieval paths | Ignore path semantics and generate opaque server-side names | Presented name cannot affect the stored object identity or location |
| Uploads are reachable from executable application storage | Store outside executable paths and deny execution at storage and serving layers | Accepted inert file is delivered only under the intended safe policy |
| Retrieval lacks object-level authorization | Authorize each retrieval against the current requester and object ownership | Designated unauthorized account is denied using an approved test object |
| Untrusted downloads have unsafe delivery headers | Set conservative content type, `X-Content-Type-Options: nosniff`, and attachment disposition where appropriate | Response headers match the file class and product use case |
| Processing accepts invalid input or lacks limits | Isolate parsers, enforce size and resource limits, quarantine failures, and monitor jobs | Benign damaged input fails safely without persistent processing impact |
| Test objects persist without lifecycle control | Add deletion, retention, expiry, and audit controls | Test object removal or expiry is observable and documented |
