# Basic Path Traversal

## Purpose And Preconditions

Use this reference to identify a path sink: an input that influences a server-side file selection or filesystem operation. Proceed only with explicit scope, a baseline request, and an inert marker owned by the tester or supplied as a safe fixture.

## Bounded Marker Workflow

1. Record the normal request selecting the approved marker.
2. Change only the logical path representation while keeping the marker identity and request method fixed.
3. Make requests manually and one at a time; compare status, response headers, length, and a non-sensitive marker indicator.
4. Stop when a response contains anything other than the authorized marker or an expected rejection.

## Normalization And Decoding Model

Risk arises when validation and resolution disagree about a path's meaning. Track the sequence: transport parsing, framework decoding, application validation, path joining, canonicalization, filesystem resolution, and response generation. A safe implementation treats the selected value as an identifier from an allowlist, then resolves it under a fixed base and verifies containment after canonicalization.

## Observations And Interpretation

- A normal marker response establishes only the baseline.
- A representation-specific rejection can indicate validation, routing, or intermediary handling; it is not proof of protection.
- An authorized marker resolving outside its intended logical selection is evidence of a path-handling flaw when the behavior is repeatable.

## False-Positive Controls

Compare against an invalid marker of the same shape. Account for CDN caching, routing rewrites, authorization differences, generic error pages, and response compression. Repeat only the minimal marker-only comparison needed to rule out transient behavior.

## Evidence And Remediation

Capture sanitized request metadata, marker ownership/location, response metadata, and the inferred processing stage. Recommend identifier allowlists, canonical containment checks, and a no-follow policy where link traversal is not required.

## Source

- PortSwigger: <https://portswigger.net/web-security/file-path-traversal>
