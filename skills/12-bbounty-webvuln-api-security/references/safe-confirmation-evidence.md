# Safe Confirmation and Evidence

## Purpose and Preconditions

Confirm a candidate issue without escalating impact. Requires explicit scope, a reproducible observation, dedicated test identities and objects, and a stop contact.

## Bounded Authorized Methodology

Use the smallest single-request baseline-versus-variation comparison that can establish the reported behavior. Prefer denied actions, validation responses, metadata, or owner-observed logs over accessing content. Verify a reversible state change only on the dedicated object, then restore it if restoration is expressly authorized. Complete the checklist before continuing.

## Observations and Interpretation

A finding is verified only when the expected policy and observed result differ under the same approved conditions and the difference is reproducible without increased impact. Otherwise report it as inconclusive.

## False-Positive Controls

Compare the same environment, API version, method, headers, role, object lifecycle state, and timing. Exclude cached responses, stale tokens, eventual consistency, and documented business exceptions.

## Stop Conditions

Immediately stop and notify the designated contact for unexpected sensitive data, unauthorized data access, non-test data or account effects, persistent changes, elevated errors, rate-limit warnings, instability, or any scope doubt.

## Evidence

Use the request-contract evidence template. Include authorization reference, exact approved role and test-object labels, minimal redacted request metadata, status and response category, timestamps, expected policy, observed result, and stop event if applicable.

## Remediation

Provide a minimal reproduction description, affected contract clause, security impact limited to demonstrated behavior, and the prevention control. Do not include secrets, extracted data, payload libraries, or unapproved exploit instructions.

## Sources

- [PortSwigger: API testing](https://portswigger.net/web-security/api-testing)
- [OWASP API Security Project](https://owasp.org/www-project-api-security/)
