# Token And Claim Evidence Checklist

Use this checklist without retaining bearer artifacts or their complete payloads.

| Item | Access token | ID token | Refresh token | Evidence / observation |
| --- | --- | --- | --- | --- |
| Consumer and intended purpose identified | [ ] | [ ] | [ ] |  |
| Artifact issued only to controlled test account | [ ] | [ ] | [ ] |  |
| Trusted issuer / authority identified | [ ] | [ ] | [ ] |  |
| Signature, key provenance, and allowed algorithm validated where applicable | [ ] | [ ] | n/a / [ ] |  |
| Audience and authorized party validated where applicable | [ ] | [ ] | n/a / [ ] |  |
| Expiry, not-before, issued-at, and clock tolerance validated | [ ] | [ ] | [ ] |  |
| Nonce validated where applicable | n/a | [ ] | n/a |  |
| Stable subject bound to local account | [ ] | [ ] | n/a |  |
| Requested, granted, and enforced scopes compared | [ ] | n/a | [ ] |  |
| Tenant, organization, and object authorization checked separately | [ ] | n/a | n/a |  |
| Rotation / revocation policy documented where applicable | n/a | n/a | [ ] |  |

## Report-Safe Evidence

- Artifact type and consumer, never its value.
- Claim and header names, trusted configuration source, and validation outcome.
- Controlled-account role, expected result, observed result, timestamp, and environment.
- Redacted screenshots or trace references retained according to the program policy.
