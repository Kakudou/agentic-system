# Harmless Engine Fingerprinting

## Purpose and Preconditions

Use this guide to determine whether a suspected server-rendered sink warrants an inert confirmation test. Confirm written scope, a stable baseline, and that the tested input is allowed. This guide identifies only broad syntax-family signals; it does not identify a product or enable exploitation.

## Inert and Bounded Methodology

1. Complete the [template/input mapping](template-input-mapping.md) and save a baseline.
2. Send one unique plain-text sentinel through the same request shape to establish reflection and encoding.
3. If scope permits, send one non-executing delimiter-shaped marker from the approved [decision matrix](../assets/harmless-confirmation-decision-matrix.md). It must contain no operation, variable, property, function, directive, include, or control structure.
4. Compare only the marker's placement, literal preservation, escaping, server error classification, and response metadata with the baseline.
5. Use at most two syntax-family markers on one input. Do not use an error oracle repeatedly or vary multiple request dimensions.

## Observations and Interpretation

- Literal, correctly encoded reflection suggests no interpretation at that location.
- Consistent server-side parsing errors may support a *suspected* template boundary, not engine identity.
- A repeatable, controlled change unique to the marker can support *low-to-medium confidence* syntax-family classification.
- WAF blocks, generic error pages, timeouts, and inconsistent output are inconclusive.

## False-Positive Controls

Repeat the plain-text sentinel, use a matched control parameter when available, compare cached and uncached behavior, and confirm whether client-side code transforms the value after delivery. Do not treat framework headers, file names, or a single error string as proof.

## Stop Conditions

Stop on a scope conflict, rate-limit signal, authentication/session anomaly, sensitive output, unexpected state change, repeated server error, or any result that would require contextual inspection to explain. Escalation beyond inert confirmation requires separate written authorization.

## Evidence

Retain redacted baseline/control/test pairs, timestamps, marker class, response comparison, and the classification rationale. Record confidence and uncertainty explicitly.

## Remediation

Remove user-controlled template source construction, pass input as data to a fixed template, and ensure output encoding is context-aware. See [prevention](prevention.md).

## Sources

- PortSwigger, [Server-side template injection](https://portswigger.net/web-security/server-side-template-injection)
- PortSwigger, [SSTI methodology](https://portswigger.net/web-security/server-side-template-injection#how-does-server-side-template-injection-arise)
