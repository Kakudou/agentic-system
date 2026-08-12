# Authorization Binding

**Purpose:** Verify that validated claims are correctly bound to the server-side identity, tenant, audience, and requested resource.

**Preconditions:** Two authorized test identities or equivalent fixture data, a documented least-privilege action, and no production data modification.

**Bounded assessment:** Trace each security-relevant claim from issuer to consumer. Compare server-side authorization decisions for permitted test identities and resources. Confirm `iss`, `aud`, temporal claims, subject, tenant, and privileges are independently validated where applicable.

**Interpretation:** A finding requires evidence that a protected resource or privilege is granted outside the expected binding. A changed display name, client state, or token decode result is insufficient.

**False-positive controls:** Account for role inheritance, delegated access, multi-tenant support workflows, eventual consistency, and pre-existing test permissions.

**Evidence:** Authorized identity/resource matrix, expected policy, request/result pairs, server-side audit correlation, and demonstration limited to the approved boundary.

**Remediation:** Derive authorization from server-side identity and entitlement data where feasible; validate registered claims consistently; enforce resource ownership and tenant predicates independently of presentation claims.

**Sources:** [JWT vulnerabilities](https://portswigger.net/web-security/jwt), [JWT payload claims](https://portswigger.net/web-security/jwt#jwt-payload)
