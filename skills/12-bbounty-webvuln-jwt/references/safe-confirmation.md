# Safe Confirmation

**Purpose:** Confirm an observed JWT validation weakness without credential recovery, token forgery, account takeover, or persistent impact.

**Preconditions:** Written authorization specifies permitted techniques, a disposable identity and harmless endpoint are available, and stop conditions are recorded.

**Bounded assessment:** Prefer code/configuration review, security logs, unit/integration fixtures, or a dedicated staging endpoint. If a live check is expressly allowed, perform one least-privileged request within the approved test boundary and stop after a conclusive result.

**Interpretation:** A confirmed finding ties an unexpected validation decision to a protected authorization boundary. Inconclusive evidence must remain inconclusive.

**False-positive controls:** Remove normal session credentials, control token expiry and time, repeat only when rate limits allow, and correlate with server-side logs where available.

**Evidence:** Approval boundary, test identity, exact harmless action, timestamp/correlation ID, result, cleanup state, and stop decision.

**Remediation:** Preserve the observed decision path for regression testing; do not retain sensitive tokens in reports.

**Sources:** [JWT vulnerabilities](https://portswigger.net/web-security/jwt), [Web Security Academy JWT labs](https://portswigger.net/web-security/all-labs#jwt)
