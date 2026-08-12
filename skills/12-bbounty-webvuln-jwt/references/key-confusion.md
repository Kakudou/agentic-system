# Key Confusion Controls

**Purpose:** Determine whether asymmetric verification keys can be treated as symmetric secrets, or vice versa, due to generic verification configuration.

**Preconditions:** The system uses asymmetric JWT algorithms or supports multiple key families, and safe confirmation is approved.

**Bounded assessment:** Map each token type to its fixed algorithm family and verification API. Review whether key objects are typed and whether the verifier rejects a key/algorithm family mismatch before processing claims. Use isolated fixtures or configuration review for negative validation.

**Interpretation:** A finding requires an accepted key-family crossover that authorizes a protected operation. The presence of public keys or multiple algorithms alone is not vulnerable.

**False-positive controls:** Confirm the token consumer, key representation, and validation route; exclude proxy re-signing, separate token issuers, and unrelated fallback credentials.

**Evidence:** Token-type mapping, verifier API/configuration, key-family policy, controlled validation trace, and protected-boundary outcome.

**Remediation:** Use algorithm-specific verification calls; bind keys to one family and algorithm; maintain separate key stores for symmetric and asymmetric material; reject algorithm selection from untrusted headers.

**Sources:** [Algorithm confusion attacks](https://portswigger.net/web-security/jwt/algorithm-confusion), [JWT vulnerabilities](https://portswigger.net/web-security/jwt)
