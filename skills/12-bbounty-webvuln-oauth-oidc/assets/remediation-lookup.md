# OAuth/OIDC Remediation Lookup

| Observation | Primary remediation | Validation criterion |
| --- | --- | --- |
| Callback acceptance is broader than the registered client value | Register and compare exact callback values per client; remove unused entries | An authorized inert non-matching value is rejected before login or consent |
| Login transaction is not demonstrably bound to its browser session | Generate high-entropy state, bind it server-side, expire and consume it once | An abandoned test transaction cannot create a local session |
| Public client lacks effective PKCE | Require `S256` challenge and matching verifier; bind code to client and callback | A sanctioned invalid-verifier test is rejected and normal flow still succeeds |
| Token consumer trusts unconstrained claims or keys | Enforce issuer, trusted JWKS, algorithm allowlist, audience, time bounds, and token type | Controlled validation logs show each required check and reject wrong context |
| Local account maps from mutable profile data | Bind to validated issuer plus stable subject; require explicit linking confirmation | Two controlled accounts with similar profile attributes remain distinct |
| Granted scope or tenant exceeds intended authorization | Apply least-privilege consent and resource-server scope, tenant, and object checks | Harmless controlled actions match only the assigned scope and role |
| Unneeded provider feature is enabled | Disable unused response/grant types, registration, or advanced request features | Metadata and client configuration show only required capabilities |
| Evidence is inconclusive | Add observability and repeat only the original bounded test | Expected and observed result are reproducible without sensitive artifacts |
