# Prevention And Validation

**Purpose:** Convert assessment outcomes into durable JWT validation controls and regression evidence.

**Preconditions:** A finding or coverage gap has an identified issuer, consumer, owner, and token use case.

**Bounded assessment:** Define the fixed issuer, audience, algorithm, key family, key source, claim constraints, and authorization boundary for each token type. Add negative tests for unsupported algorithms, unsecured tokens, unknown keys, untrusted key references, expired/not-yet-valid tokens, and cross-tenant/resource access.

**Interpretation:** Remediation is complete only when the affected consumer rejects invalid inputs and preserves valid authorized behavior in the deployment environment.

**False-positive controls:** Test each consumer independently, cover key rotation and clock-skew policy, and verify that changes do not silently fall back to another authentication mechanism.

**Evidence:** Configuration diff or policy record, automated test results, deployment version, safe validation logs, and owner acceptance.

**Remediation:** Use maintained JWT libraries; pin algorithms and trusted issuers; validate all registered claims required by the flow; constrain JWK/JKU/KID handling; authorize resources server-side; rotate keys and monitor validation failures.

**Sources:** [JWT vulnerabilities](https://portswigger.net/web-security/jwt), [JWT best practices](https://portswigger.net/web-security/jwt#how-to-prevent-jwt-attacks)
