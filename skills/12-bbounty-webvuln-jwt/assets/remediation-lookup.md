# JWT Remediation Lookup

| Finding class | Primary remediation | Validation evidence |
|---|---|---|
| Unpinned algorithm | Fixed allowlist per token type and algorithm-specific verifier | Unsupported algorithm rejected before claims are read |
| Unsecured token accepted | Disable unsecured JWTs for authenticated flows | Missing/empty signature rejected |
| Key-family confusion | Separate typed key stores and verifier APIs | Cross-family key/algorithm pair rejected |
| Untrusted JWK/JKU | Reject embedded keys; pin trusted JWKS origins | Foreign/redirected key source rejected |
| Unsafe KID lookup | Opaque allowlisted key IDs and parameterized lookup | Unknown/malformed IDs fail closed |
| Claim validation gap | Validate issuer, audience, time, and claim types | Negative claim cases rejected |
| Authorization binding gap | Enforce server-side entitlement, tenant, and ownership checks | Approved cross-boundary test is denied |
| Replay/lifetime gap | Enforce expiry, rotation, revocation, and replay controls | Expired/revoked fixture is denied |

Use [prevention and validation](../references/prevention.md) for implementation and regression criteria.
