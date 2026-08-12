# Evidence And Stop Conditions

**Purpose:** Keep JWT assessments authorized, reproducible, redacted, and minimum impact.

**Preconditions:** Program scope, target owner/contact, authorized identity, and confirmation limits are known.

**Bounded assessment:** Before each check, record the target, consumer, expected policy, harmless action, and stop point. Preserve only redacted headers, claim names, timestamps, correlation IDs, request/result summaries, and configuration or log excerpts necessary to establish the decision.

**Interpretation:** Evidence supports a finding only when it links an unexpected validation decision to a protected authorization boundary. Otherwise classify pass, not applicable, or inconclusive.

**False-positive controls:** Eliminate alternate credentials, token expiry, cache, routing, rate-limit, and pre-existing entitlement explanations. Use a second controlled observation only if it remains within the approved boundary.

**Evidence:**

- [ ] Scope and safe-confirmation authorization.
- [ ] Token issuer, consumer, and intended policy.
- [ ] Redacted validation input classification.
- [ ] Timestamped result and correlation ID/log evidence.
- [ ] Affected endpoint and demonstrated boundary.
- [ ] False-positive controls and stop decision.
- [ ] Remediation owner and regression criterion.

**Remediation:** Store report evidence according to program handling rules; revoke or redact test artifacts when required; add the minimal regression test that reproduces the validation decision.

**Sources:** [JWT vulnerabilities](https://portswigger.net/web-security/jwt), [Web Security Academy JWT labs](https://portswigger.net/web-security/all-labs#jwt)
