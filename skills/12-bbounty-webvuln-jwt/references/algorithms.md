# Signature And Algorithm Validation

**Purpose:** Establish whether each JWT consumer enforces an explicit algorithm allowlist and compatible key type before trusting claims.

**Preconditions:** Authorized target, valid test token or documented issuer behavior, and a harmless reject/accept observation point.

**Bounded assessment:** Inventory each consumer's accepted token type, declared `alg`, key family, and error handling. Compare observed configuration and documented library settings with the issuer policy. Verify unsupported, missing, or incompatible algorithm declarations are rejected through approved non-production controls or server-side configuration review.

**Interpretation:** A finding requires evidence that a consumer selects validation based on untrusted token metadata, lacks a fixed allowlist, or accepts an incompatible key/algorithm pair. A parse error alone is not acceptance.

**False-positive controls:** Separate gateways from downstream services, account for token-type routing, cache effects, clock skew, and generic authentication failures. Do not infer verification success from a redirect or unchanged anonymous response.

**Evidence:** Redacted header fields, intended algorithm policy, consumer location, request/result pair, relevant safe logs, and validation outcome.

**Remediation:** Configure a per-token-type algorithm allowlist; bind key type and issuer to that allowlist; reject missing/unknown algorithms before claim processing; maintain regression tests for rejection paths.

**Sources:** [JWT vulnerabilities](https://portswigger.net/web-security/jwt), [algorithm confusion](https://portswigger.net/web-security/jwt/algorithm-confusion)
