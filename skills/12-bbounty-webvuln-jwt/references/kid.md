# KID Handling

**Purpose:** Verify that `kid` is a constrained identifier for an already trusted key, not a filesystem, query, URL, or arbitrary lookup input.

**Preconditions:** A token or issuer metadata exposes `kid`, and source/configuration review or a safe fixture is authorized.

**Bounded assessment:** Determine the `kid` grammar, lookup store, issuer binding, unknown-key behavior, and logging. Confirm lookup is an exact match against a preloaded trusted key set and does not resolve paths, expressions, or remote locations.

**Interpretation:** A finding requires evidence that untrusted `kid` input changes key selection beyond the trusted set or reaches an unsafe resolver. Unknown identifiers that are rejected are expected.

**False-positive controls:** Distinguish key rotation and multiple valid keys from arbitrary lookup; do not infer backend behavior from one generic error response.

**Evidence:** Redacted `kid`, permitted key-set policy, unknown-key result, relevant logs/configuration, and consumer identity.

**Remediation:** Treat `kid` as an opaque allowlisted identifier; avoid filesystem/database query construction from it; bind it to issuer and algorithm; fail closed on missing or unknown values.

**Sources:** [JWT header parameter injections](https://portswigger.net/web-security/jwt#jwt-header-parameter-injections), [JWT vulnerabilities](https://portswigger.net/web-security/jwt)
