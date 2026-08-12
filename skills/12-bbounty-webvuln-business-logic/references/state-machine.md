# State-Machine Assessment

## Purpose and Prerequisites

Use when an object has lifecycle states, approvals, verification, cancellation, fulfillment, or recovery transitions. Use isolated test objects and an agreed restoration path. Do not use parallel requests or trigger irreversible transitions without explicit authorization.

## Map Intended Business Rules

For each state, record the allowed actor, entry conditions, allowed next states, side effects, and terminal-state rules. Include asynchronous actors such as payment processors or background jobs. Use the state-transition test record to distinguish a documented transition from a hypothesis.

## Safe State, Role, and Object Testing

Establish a normal transition on one designated object. On a separate reversible test object, make one minimal out-of-sequence or unauthorized-state attempt only where permitted. Verify the object through the authoritative server view and restore it when possible.

## Observations and Interpretation

A successful HTTP response is not enough. Confirm that the server persisted a prohibited state or issued a protected side effect. Delayed processing, eventual consistency, state aliases, and privileged operational roles may explain an apparent mismatch.

## False-Positive Controls

- Verify the documented lifecycle and actor permissions with the owner when available.
- Wait for the defined processing window before concluding that state diverged.
- Avoid concurrent testing unless separately approved and safely isolated.

## Evidence

Capture the transition model, object state before and after, actor role, attempted transition, server confirmation, side-effect check, and cleanup result.

## Remediation

Enforce transition guards server-side, derive permitted transitions from the persisted current state, make critical changes idempotent, and use transactional or optimistic-concurrency controls where state consistency requires them.

## Sources

- [PortSwigger: Business logic vulnerabilities](https://portswigger.net/web-security/logic-flaws)
- [OWASP: Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/)
