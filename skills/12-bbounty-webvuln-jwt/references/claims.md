# Token Inventory And Claim Review

**Purpose:** Map token issuance, consumers, and claims that influence authentication, tenancy, authorization, or replay controls.

**Preconditions:** An in-scope token from an authorized test identity and a defined redaction procedure.

**Bounded assessment:** Record header metadata and claim names without publishing secrets or personal data. Map `iss`, `aud`, `sub`, `exp`, `nbf`, `iat`, `jti`, tenant identifiers, scopes, roles, and application claims to their server-side validation and use.

**Interpretation:** A claim is security-relevant only when a consumer uses it to make an access, tenancy, or lifecycle decision. Readability of payload claims is normal JWT behavior.

**False-positive controls:** Do not treat client-displayed claims as authoritative without demonstrating server reliance; distinguish UI hints from enforced permissions.

**Evidence:** Redacted claim inventory, issuer/consumer mapping, expected constraints, and source of each assertion.

**Remediation:** Minimize claims, validate type and value server-side, bind issuer/audience/subject to the consumer and resource, and avoid relying on client-only role display.

**Sources:** [JWT vulnerabilities](https://portswigger.net/web-security/jwt), [JWT payload claims](https://portswigger.net/web-security/jwt#jwt-payload)
