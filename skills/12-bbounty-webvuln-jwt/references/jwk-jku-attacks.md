# JWK And JKU Validation

**Purpose:** Assess whether embedded JWKs or JKU-provided key sets are accepted outside an explicit trust policy.

**Preconditions:** Header parameters are observed or documented, and a safe, program-approved validation method exists. Never host attacker-controlled key material or trigger external callbacks without authorization.

**Bounded assessment:** Inspect policy and implementation for handling of `jwk` and `jku`; establish whether each is ignored, allowlisted, issuer-bound, and constrained to expected key metadata. Use configuration review or isolated test fixtures to confirm rejection behavior.

**Interpretation:** Report only when a consumer accepts an untrusted embedded key or remote key source for signature validation and this affects protected access. Merely parsing the header is not evidence of trust.

**False-positive controls:** Verify actual key selection with logs or controlled fixture evidence; exclude static issuer metadata, trusted reverse proxies, and unreachable network paths.

**Evidence:** Redacted header inventory, configured trust policy, validation trace, controlled outcome, and affected consumer.

**Remediation:** Reject header-supplied keys by default; hardcode or tightly allowlist JWKS origins; validate redirects, TLS, issuer, key ID, key type, intended use, and algorithm; log rejected key-source changes.

**Sources:** [JWK header injection](https://portswigger.net/web-security/jwt/jwk-header-injection), [JKU header injection](https://portswigger.net/web-security/jwt/jku-header-injection)
