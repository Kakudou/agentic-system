# HTTP/2 Interpretation And Downgrade Boundaries

## Purpose

Assess whether an HTTP/2-facing component and a downstream HTTP/1 or HTTP/2 component preserve the same request boundaries. Use when HTTP/2 is accepted, terminated, translated, or hidden behind a gateway.

## Preconditions

Testing requires a controlled environment or explicit written authorization with a named protocol path, non-state-changing route, request cap, and escalation contact. Confirm that HTTP/2 negotiation and the downstream protocol are in scope. Do not test shared caches, browser-facing behavior, or authenticated routes.

## Safe Methodology

Map the client-to-origin protocol transitions first. Compare a minimal ordinary HTTP/2 baseline with one approved benign differential check, and compare results to the equivalent ordinary HTTP/1 route only when both are authorized. Assess parser consistency, not downstream impact. Do not use header injection, request splitting, pseudo-header manipulation, or follow-up traffic to consume a possible desynchronization.

## Interpretation

Consistent protocol-specific rejection or normalization is expected. A repeatable controlled-environment difference localized to a translation boundary is a potential desynchronization signal. Negotiation failure, gateway-generated errors, stream resets, and latency changes require baseline comparison and trace evidence before they support a finding.

## False-Positive And Stop Controls

Use the [decision matrix](../assets/confirmation-false-positive-decision-matrix.md) and [impact checklist](../assets/impact-stop-condition-checklist.md). Stop on unexpected response association, state change, cache/client signal, instability, or any limit reached.

## Evidence

Capture negotiated protocol, mapped translation hop, baseline/control response metadata, timestamps, request count, correlation values, and redacted gateway/origin traces where supplied by the owner.

## Remediation

Reject forbidden or ambiguous framing metadata at the HTTP/2 edge. Ensure downgrade logic creates exactly one unambiguous downstream request boundary, and keep intermediary and origin parser policies aligned. Verify after deployment in a controlled environment.

## Sources

- [PortSwigger: Advanced request smuggling](https://portswigger.net/web-security/request-smuggling/advanced)
- [PortSwigger Research: HTTP/2: The sequel is always worse](https://portswigger.net/research/http2)
