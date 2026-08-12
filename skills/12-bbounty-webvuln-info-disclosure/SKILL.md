---
name: 12-bbounty-webvuln-info-disclosure
description: Assess authorized web targets for unintended information disclosure using minimal, non-invasive observation and redacted evidence.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Information Disclosure Assessment

## Purpose

Identify and report unintended exposure of implementation, operational, or user-sensitive information on explicitly authorized web targets. This skill is observation-led: it does not enumerate hidden locations, bypass controls, retrieve bulk data, or validate secrets.

## Prerequisites

- Written authorization, in-scope target list, and program rules.
- Defined test account or unauthenticated posture, rate limits, and reporting channel.
- A way to retain minimal, redacted evidence locally or in the authorized report system.

Stop if scope, authorization, or data-handling requirements are unclear.

## Workflow

1. Establish the permitted surface and a normal-response baseline. Record only the endpoint class, status family, response type, and relevant exposure markers. See [response and metadata baseline](references/disclosure-basics.md).
2. Review naturally occurring error or debug signals from normal, permitted interactions. Do not induce failures beyond program-approved validation. See [error and debug signals](references/error-metadata-handling.md).
3. Review client-delivered artifacts and deployment-visible references already linked by the application. Do not guess names, enumerate directories, or retrieve unlinked artifacts. See [client artifacts and deployment exposure](references/artifact-exposure.md).
4. Classify a marker before confirming it. Use the least data possible and stop immediately at sensitive content. See [safe confirmation and data minimization](references/safe-confirmation-redaction.md).
5. Preserve a redacted, reproducible observation and separate harmless implementation detail from material exposure. See [evidence and redaction](references/safe-confirmation-redaction.md).
6. Map a confirmed issue to an owner-facing corrective action and verify the fix with the same minimal observation. See [prevention and validation](references/prevention-validation.md).

Use the static tools as needed: [surface and evidence worksheet](assets/surface-evidence-worksheet.md), [classification and redaction matrix](assets/disclosure-classification-redaction-matrix.md), [stop and cleanup checklist](assets/stop-cleanup-checklist.md), and [remediation lookup](assets/remediation-lookup.md).

## Evidence

- Authorization and scope reference.
- Timestamp, target, request context, and minimal exposure marker.
- Redacted response excerpt or non-sensitive structural proof.
- Classification, impact rationale, false-positive checks, and stop decision.
- Remediation and minimal retest result, if authorized.

## Output

```yaml
info_disclosure_report:
  target: string
  timestamp: timestamp
  authorization_reference: string
  surface: string
  observation: string
  classification: informational | implementation_detail | sensitive_exposure
  evidence: redacted string
  false_positive_controls: [strings]
  impact: none | low | medium | high | critical
  remediation: string
  retest: not_attempted | confirmed | not_confirmed
```

## Resource Index

- [Disclosure basics](references/disclosure-basics.md)
- [Error and metadata handling](references/error-metadata-handling.md)
- [Artifact exposure](references/artifact-exposure.md)
- [Safe confirmation and redaction](references/safe-confirmation-redaction.md)
- [Prevention and validation](references/prevention-validation.md)
