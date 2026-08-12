# Unsecured JWT (`none`) Validation

**Purpose:** Determine whether a signed-token consumer improperly accepts unsecured JWTs.

**Preconditions:** Written authorization and a harmless validation observation path. Do not create or submit unsigned production tokens unless the program explicitly provides a safe test mechanism.

**Bounded assessment:** Review token-type policy and verifier configuration for an explicit prohibition on unsecured JWTs. Where an approved test harness exists, confirm the consumer rejects an unsecured token before claims are processed.

**Interpretation:** A finding requires a protected action to be authorized after unsecured-token acceptance. A 401/403, parse failure, or anonymous response is a rejection, not a finding.

**False-positive controls:** Verify that authentication was not supplied through a separate cookie or upstream session; distinguish a format parser from the authorization consumer.

**Evidence:** Token-type policy, redacted header classification, relevant configuration/log evidence, controlled rejection or acceptance result, and endpoint impact.

**Remediation:** Disable unsecured JWT support for authenticated flows, enforce a signed algorithm allowlist, and test missing/empty signatures as negative cases.

**Sources:** [JWT vulnerabilities](https://portswigger.net/web-security/jwt), [Accepting tokens with no signature](https://portswigger.net/web-security/jwt#accepting-tokens-with-no-signature)
