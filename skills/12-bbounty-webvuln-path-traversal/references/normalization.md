# Normalization

## Purpose And Preconditions

Use when a path-bearing value crosses more than one parser, proxy, framework, archive handler, or filesystem API. Require written authorization, a stable baseline, and an inert marker whose permitted location is documented.

## Bounded Marker Workflow

1. Select one marker and one input location.
2. Compare the baseline with one semantically equivalent marker representation per request.
3. Record where observed behavior changes, then stop after the smallest set that isolates the boundary.
4. Never expand to non-marker resources or use a response to discover paths.

## Normalization And Decoding Model

Normalization can collapse separators, dot segments, case, Unicode forms, or trailing components. Decoding can occur at the client, intermediary, router, framework, application, or filesystem boundary. The security property is consistent interpretation: reject disallowed forms before use, normalize once with the intended platform API, resolve beneath a fixed base, and enforce canonical containment after resolution.

## Observations And Interpretation

- Equal handling across variants suggests, but does not prove, consistent processing.
- Different handling identifies a boundary worth documenting, not an exploit by itself.
- Marker-only access inconsistent with the documented base selection supports a reportable finding.

## False-Positive Controls

Check that variants reach the same handler and authorization context. Exclude cache artifacts, load-balancer variance, URL rewriting, and client-side encoding changes. Preserve raw request representation and server-visible evidence where available.

## Evidence And Remediation

Document the input representation, observed result, expected marker location, and suspected normalization stage. Centralize decoding and canonicalization, reject ambiguous input, and test the validation and resolver as one unit.

## Source

- PortSwigger: <https://portswigger.net/web-security/file-path-traversal>
