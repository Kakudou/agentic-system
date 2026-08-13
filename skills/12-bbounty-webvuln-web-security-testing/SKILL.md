---
name: 12-bbounty-webvuln-web-security-testing
description: Authorized, observation-first assessment of web transport, response posture, and browser-facing behavior.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# General Web Security Assessment

## Purpose

Assess an explicitly authorized web target for security-relevant transport, response, and browser behavior. Start with passive or normal-use observation. Do not scan, fuzz, send exploit payloads, alter state, access other users' data, or expand beyond the written authorization.

## Prerequisites

- Written authorization identifying target hosts, paths, accounts, permitted methods, and testing window.
- A defined contact and stop/escalation path.
- A normal-use baseline or documented expected behavior.
- No production-impacting action unless the authorization explicitly permits it.

## Workflow

1. **Confirm scope and establish a baseline.** Record the authorized origin, route, account role, timestamp, and normal request/response behavior. Stop if scope, method, or impact limits are unclear. See [baseline methodology](references/baseline-methodology.md).
2. **Review transport and response-security posture.** Compare normal HTTP-to-HTTPS handling and security controls only where the program permits observation. Treat headers as context, not proof. See [transport and header posture](references/transport-header-posture.md).
3. **Review browser behavior, content type, and encoding.** Observe how a supported browser handles normal content, redirects, framing, downloads, and declared media types. Do not use crafted input or encoding payloads. See [browser and content behavior](references/browser-content-encoding.md).
4. **Confirm safely.** Reproduce an observation with the same authorized, non-destructive interaction and compare it to the baseline. Stop rather than escalating if confirmation would create data, change state, bypass access control, or affect availability. See [validation and evidence](references/validation-evidence.md).
5. **Report evidence and remediation.** State the observed condition, impact hypothesis, confidence, false-positive checks, and safe remediation. Do not report a missing control as a vulnerability without an applicable risk path. See [validation and evidence](references/validation-evidence.md) and [prevention guidance](references/prevention.md).

## Evidence

- Authorization and scope record, including exclusions.
- Timestamped baseline and reproduction observations with sensitive values redacted.
- Relevant request/response metadata, browser version, and environmental conditions.
- Expected-versus-observed comparison, false-positive controls, and stop decision.
- Remediation guidance tied to the demonstrated risk.

## Output

```yaml
web_security_assessment:
  target: origin and authorized route
  authorization: scope reference and testing window
  baseline: expected and observed normal behavior
  observations:
    - area: transport | headers | browser-content
      observation: concise factual description
      impact_hypothesis: conditional security consequence
      confidence: low | medium | high
      false_positive_controls: [checks performed]
      evidence: redacted references
      stop_status: completed | stopped | escalated
      remediation: safe corrective action
  limitations: [unperformed or excluded checks]
```

## Resource Index

- [Baseline methodology](references/baseline-methodology.md)
- [Transport and header posture](references/transport-header-posture.md)
- [Browser and content behavior](references/browser-content-encoding.md)
- [Validation and evidence](references/validation-evidence.md)
- [Prevention guidance](references/prevention.md)
- [Baseline, header, and browser coverage worksheet](assets/coverage-worksheet.md)
- [Interpretation matrix](assets/interpretation-matrix.md)
- [Evidence and stop checklist](assets/evidence-stop-checklist.md)
- [Remediation lookup](assets/remediation-lookup.md)
