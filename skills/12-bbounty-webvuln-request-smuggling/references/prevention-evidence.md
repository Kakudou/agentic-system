# Prevention And Evidence Requirements

## Purpose

Turn a framing observation into a reproducible, minimally sensitive remediation record. This reference does not authorize testing.

## Preconditions

Use only after a scoped assessment. Any confirmation or retest must remain in the controlled environment or under the original explicit authorization and request cap.

## Safe Methodology

Document the affected route, components, protocol transitions, observed baseline/control difference, false-positive controls, and stop decision. Ask component owners to review parser configuration and request translation. Retest only the corrected boundary with the same benign, low-volume validation method.

## Interpretation

Call a result confirmed only when it repeats in a controlled environment, stable ordinary controls and trace evidence support a framing disagreement, and an independent reviewer accepts the evidence. Otherwise report `potential-desync` or `inconclusive`.

## Volume And Impact Limits

Use the existing authorization cap. Do not broaden routes, test cache or client effects, or investigate cross-user impact. Stop on every condition in the [impact checklist](../assets/impact-stop-condition-checklist.md).

## Evidence

The report must include authorization, environment, architecture map, protocol boundary, timestamps, request total, redacted observations, false-positive analysis, classification, remediation owner, and retest result. Exclude credentials, personal data, raw sensitive bodies, and exploit material.

## Remediation

Apply the applicable entry in the [remediation lookup](../assets/remediation-lookup.md): reject ambiguity at the first hop, align parsers and translators, close malformed connections, and regression-test behavior across every deployed protocol boundary.

## Sources

- [PortSwigger: HTTP request smuggling](https://portswigger.net/web-security/request-smuggling)
- [PortSwigger: Advanced request smuggling](https://portswigger.net/web-security/request-smuggling/advanced)
