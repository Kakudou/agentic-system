# Business-Logic Evidence Fields

Capture the minimum proof required for independent review. Redact credentials, session material, personal data, and sensitive business details.

| Field | Required content |
|---|---|
| Evidence ID | Stable local identifier |
| Scope | Target, authorization, permitted method, and stop condition |
| Rule source | Document, owner statement, or normal server-confirmed baseline |
| Rule statement | Actor, object, preconditions, and expected server outcome |
| Test context | Designated account role and synthetic object identifiers |
| Baseline | Redacted normal request context and server-confirmed outcome |
| Comparison | One controlled, safe difference from the baseline |
| Observation | Redacted server response and authoritative final state or quote |
| Interpretation | Why the outcome confirms, explains, or fails to confirm the rule violation |
| False-positive checks | Rounding, timing, flags, exceptions, roles, and test-mode checks |
| Impact | Credible consequence without realized financial, inventory, or privilege abuse |
| Cleanup | `not_applicable`, `restored`, or `pending`, with confirmation |
| Remediation | Server-side control and affected decision point |

## Evidence Quality Checks

- [ ] The evidence demonstrates a server-side result, not only a client display.
- [ ] The comparison is reproducible within authorized test conditions.
- [ ] No sensitive data or real-value transaction is included.
- [ ] The impact statement matches the confirmed rule violation.
