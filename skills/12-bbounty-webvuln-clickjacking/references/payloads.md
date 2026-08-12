# Payload Safety

## Purpose and Preconditions

This skill intentionally contains no payloads, iframe proof pages, CSS overlays, interaction-forcing flows, or framing-bypass catalog. Use this reference when a request asks for one of those artifacts.

## Safe Bounded Methodology

Decline the artifact and return to response-policy inventory and non-interactive controlled browser observation. If a stronger demonstration is required, obtain separate written authorization and an approved test plan before any work beyond this skill's boundary.

## Observations and Interpretation

An interaction-forcing artifact can change user perception, cause unintended state changes, or exceed an authorized frame-policy assessment. Its absence does not prevent documenting observed framability and a bounded risk condition.

## False-Positive Controls

Do not mistake an inability to produce a proof artifact for a negative finding. Conversely, do not infer exploitability from headers alone. Require policy, browser, and impact-boundary evidence.

## Cleanup and Stop Conditions

Do not create, save, host, or distribute proof content. Stop and escalate if a request requires any click, input, credential, consent, or state-changing step.

## Evidence and Remediation

Record that validation remained non-interactive, what was observed, and why impact is bounded. Remediate with enforced `frame-ancestors` and a minimal allowlist where legitimate embedding is required.

Sources: [PortSwigger: Clickjacking](https://portswigger.net/web-security/clickjacking), [PortSwigger: CSP](https://portswigger.net/web-security/cross-site-scripting/content-security-policy).
