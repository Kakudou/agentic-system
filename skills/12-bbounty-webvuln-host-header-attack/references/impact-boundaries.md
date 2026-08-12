# Safe Confirmation And Impact Boundaries

## Purpose And Preconditions

Use after a repeatable marker-only routing or link-generation observation. Require explicit scope, a documented safe endpoint, and a disclosure contact. Demonstrate the trust-boundary defect, not access to another host or expanded impact.

## Bounded Marker Methodology

1. Reproduce baseline-versus-marker comparison once on the same idempotent endpoint.
2. Confirm only unapproved authority acceptance, absence of canonicalization, inconsistent edge/application decision, or inert marker in a non-sensitive absolute URL.
3. Stop after confirmation. Do not follow marker redirects, enumerate virtual hosts, access privileged paths, trigger emails, test caches, or cause server-side network activity.

## Observations And Interpretation

Marker-only results establish a flawed trust boundary only for the observed route and layer. They do not establish cross-tenant access, account compromise, cache impact, SSRF, or request-smuggling impact. State these as untested and out of scope.

## False-Positive Controls, Cleanup, And Evidence

Rule out ordinary alias redirects, maintenance windows, edge blocks, authentication state, and nondeterministic experiments. No target data or persistent artifact should be created. If state changes or data appears, stop and disclose. Preserve only sanitized request/response metadata and scope citation.

## Remediation

Prioritize a consistent authority allowlist and canonical-origin configuration across every public layer, then verify the deployed path with a marker-only regression test.

## Source

- PortSwigger: <https://portswigger.net/web-security/host-header>
