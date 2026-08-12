# Request Desynchronization Boundaries

## Purpose

Provide conceptual context for why inconsistent HTTP framing matters while keeping assessment limited to safe detection and remediation.

## Preconditions

This material supports only explicitly authorized, low-impact assessment. It does not permit constructing ambiguous requests, automation, exploitation chains, cache manipulation, request hijacking, browser/client impact testing, or response-queue testing.

## Safe Methodology

Use the architecture map to identify where a client, intermediary, and origin might make different message-boundary decisions. Use only the approved differential validation process and stop at a potential signal. Refer to the applicable [HTTP/1](h1-smuggling.md) or [HTTP/2](h2-smuggling.md) interpretation guidance.

## Interpretation

The security concern is disagreement over where one request ends and another begins. A finding requires controlled, repeatable evidence of that disagreement, not a theoretical vector, malformed-request error, or latency anomaly.

## False-Positive And Stop Controls

Transport instability, policy enforcement, upstream overload, and application behavior are common alternatives. Apply the [decision matrix](../assets/confirmation-false-positive-decision-matrix.md) and [impact checklist](../assets/impact-stop-condition-checklist.md); stop rather than attempting to prove impact.

## Evidence

Record only redacted architecture, baseline/control, trace, and classification evidence. The evidence must show both the observed behavior and the controls used to rule out benign causes.

## Remediation

The corrective goal is a single, consistent framing policy at every boundary. See [prevention and evidence requirements](prevention-evidence.md).

## Sources

- [PortSwigger: HTTP request smuggling](https://portswigger.net/web-security/request-smuggling)
- [PortSwigger Research: HTTP desync attacks: request smuggling reborn](https://portswigger.net/research/http-desync-attacks-request-smuggling-reborn)
