# Algorithm Switching

**Purpose:** Assess whether a verifier can be induced to cross algorithm families or accept an algorithm other than the one assigned to the token type.

**Preconditions:** The issuer uses signed JWTs, the expected algorithm family is known, and safe confirmation is explicitly authorized.

**Bounded assessment:** Compare issuer metadata, verifier configuration, and observed rejection behavior for algorithm-family mismatch in a controlled test path. Review whether the verifier chooses algorithms from a fixed configuration rather than the header.

**Interpretation:** Report only when evidence shows an incompatible algorithm is accepted and reaches the protected authorization decision. Treat a header parsing difference or a rejected request as a control working.

**False-positive controls:** Confirm the same service handled both observations; exclude token expiry, audience mismatch, session cookies, and fallback authentication as causes.

**Evidence:** Expected and observed algorithm policy, redacted header metadata, controlled result, correlation IDs, and affected authorization boundary.

**Remediation:** Pin allowed algorithms per issuer and token use; use algorithm-specific verification APIs; reject symmetric/asymmetric key-family crossover; add negative regression tests.

**Sources:** [Algorithm confusion attacks](https://portswigger.net/web-security/jwt/algorithm-confusion), [JWT vulnerabilities](https://portswigger.net/web-security/jwt)
