---
name: 12-bbounty-webvuln-ssti
description: Authorization-bounded assessment of suspected server-side template injection using inert, reversible confirmation and evidence-led reporting.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Server-Side Template Injection Assessment

## Purpose

Assess a suspected SSTI condition without accessing data, enumerating context, traversing objects, reading files or environment, invoking commands, or attempting code execution. Establish only whether a controlled input appears to be parsed as template syntax, then document the observable security boundary.

## Prerequisites

- Written authorization and a current program policy that permits the exact target, route, method, and test type.
- A low-impact test account when authentication is required; never use another user's data.
- A stable baseline request and a defined rate limit.
- No production-impact, secret-access, denial-of-service, or destructive testing authorization is implied by this skill.

## Workflow

1. Map the input, rendering location, baseline, and expected encoding with [template/input mapping](references/template-input-mapping.md). Record the authorization boundary before sending a test.
2. Use [harmless engine fingerprinting](references/engine-detection.md) only when the input reaches a server-rendered response. Compare a small number of inert syntax markers against a matched control; do not infer an engine from one response.
3. Interpret the output context and escaping behavior with [context and escaping](references/context-escaping.md). Stop if the result is client-side only, normalized by a proxy, or ambiguous.
4. Before confirmation, apply the [safe confirmation guide](references/payload-injection.md) and [harmless confirmation decision matrix](assets/harmless-confirmation-decision-matrix.md). Use a single bounded, non-data-bearing marker. Never adapt into expressions, object references, or delimiters that change template structure.
5. Record request/response deltas using the [evidence and stop checklist](assets/evidence-stop-checklist.md). Follow [validation](references/validation.md) to rule out reflection, caching, WAF transforms, and application logic.
6. State impact only within the [impact boundaries](references/impact.md): confirmed server-side interpretation is a vulnerability condition; confidentiality, integrity, availability, and execution impact remain unproven unless independently demonstrated through program-approved, non-sensitive evidence.
7. Provide fixes from [prevention](references/prevention.md) and [remediation lookup](assets/remediation-lookup.md). Use the [evidence checklist](references/evidence-checklist.md) before reporting.

## Evidence

- Authorization scope, test time, endpoint, method, parameter, and account role.
- Redacted baseline and test request/response pairs, including status, relevant headers, and a stable response comparison.
- The inert marker, its expected outcome, observed outcome, and matched control.
- Rendering context, encoding observations, repeatability result, false-positive checks, and stop decision.
- No secrets, session material, internal addresses, user content, configuration, or sensitive response bodies.

## Output

```yaml
ssti_assessment:
  target: string
  authorization: permitted | unclear | denied
  input_location: string
  rendering_context: html_text | attribute | javascript | url | email | unknown
  observation: literal_reflection | escaped_reflection | suspected_interpretation | confirmed_inert_interpretation | inconclusive
  engine_confidence: none | low | medium
  false_positive_controls: [strings]
  impact_boundary: string
  remediation: [strings]
  evidence: [redacted_strings]
  stop_reason: string
```

## Resource Index

- [Template/input mapping](references/template-input-mapping.md)
- [Harmless engine fingerprinting](references/engine-detection.md)
- [Context and escaping](references/context-escaping.md)
- [Safe confirmation](references/payload-injection.md)
- [Validation](references/validation.md)
- [Impact boundaries](references/impact.md)
- [Prevention](references/prevention.md)
- [Evidence checklist](references/evidence-checklist.md)
- [Engine/context classification worksheet](assets/engine-context-classification-worksheet.md)
- [Harmless confirmation decision matrix](assets/harmless-confirmation-decision-matrix.md)
- [Evidence and stop checklist](assets/evidence-stop-checklist.md)
- [Remediation lookup](assets/remediation-lookup.md)
