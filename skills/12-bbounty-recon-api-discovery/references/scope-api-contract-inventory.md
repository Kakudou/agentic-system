# Scope And API Contract Inventory

## Purpose

Establish the exact API surface and evidence sources that authorization permits this reconnaissance to observe.

## Preconditions

- Written program rules identify in-scope hosts, applications, or API products.
- The authorized time window, identities, rate limits, and escalation contact are known.

## Methodology

Record the program-provided API contract, linked public documentation, or explicitly approved client flow before contacting a target. Compare each documented host, base URL, service name, and operation with scope. Treat an unlisted host, redirect, tenant, preview environment, or third-party integration as out of scope until the program confirms otherwise.

## Interpretation

An in-scope documentation reference permits observation of that stated surface only; it does not authorize neighboring paths, alternate versions, schema retrieval, authentication, or testing. A contract may be incomplete, stale, or environment-specific.

## False-Positive And Scope Controls

- Do not infer scope from branding, DNS names, code comments, shared infrastructure, or client configuration alone.
- Do not use a contract as a wordlist or request paths not already authorized.
- Stop on scope ambiguity, unexpected login, state-changing flow, rate limiting, or a policy conflict.

## Evidence

Record the authorization reference, scope excerpt, artifact URL or identifier, retrieval time, artifact version/date when supplied, and each boundary decision.

## Handoff

Provide the approved surface and excluded or unresolved boundaries. Request written clarification before any new host, operation, identity, or protocol is observed.

## Sources

- PortSwigger Web Security Academy, [API testing](https://portswigger.net/web-security/api-testing)
- OWASP, [API Security Project](https://owasp.org/API-Security/)
