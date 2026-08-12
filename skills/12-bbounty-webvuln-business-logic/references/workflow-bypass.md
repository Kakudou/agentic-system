# Workflow-Bypass Assessment

## Purpose and Prerequisites

Use when a result depends on ordered pages, API calls, approvals, verification, or acknowledgements. Confirm that the chosen flow is in scope and use only test accounts and objects. Do not repeat consuming requests or bypass payment, identity, or fulfillment controls in a live flow.

## Map Intended Business Rules

Describe the goal, required steps, step-owned data, server-side completion markers, and permitted recovery paths. Identify which step proves each prerequisite and whether the server rechecks it at the final action.

## Safe State, Role, and Object Testing

Run the normal sequence once using a test object. Where authorized, attempt one minimal direct access to a later non-consuming step on a separate object. Confirm only whether the server denies it or requires the missing prerequisite; stop before any value-bearing outcome.

## Observations and Interpretation

A route being reachable does not prove a bypass. Confirm the final protected outcome was available without the prerequisite. Separate intended optional steps, resumable flows, support-assisted paths, and client navigation from server-side enforcement.

## False-Positive Controls

- Check whether the prerequisite was already satisfied by account state or an earlier test.
- Distinguish a visible page from completion of a protected action.
- Verify documented retry, resume, and accessibility paths.

## Evidence

Capture the expected sequence, test object's starting state, missing prerequisite, server response, final state, and confirmation that no payment, entitlement, or real-world action occurred.

## Remediation

Store prerequisite completion server-side and validate it again at every consequential action. Bind workflow tokens to the actor, object, state, and expiration, and make terminal operations idempotent.

## Sources

- [PortSwigger: Business logic vulnerabilities](https://portswigger.net/web-security/logic-flaws)
- [OWASP: Transaction Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html)
