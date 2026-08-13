---
name: 12-bbounty-vuln-secrets-exposure
description: Privacy-preserving assessment and restricted reporting of a potentially exposed secret within explicit authorization.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Secret-Exposure Assessment

## Purpose

Document a suspected secret exposure without using, reproducing, retrieving, or retaining secret material. This skill supports only explicitly authorized targets and reporting channels.

## Prerequisites

- Written scope, authorization, and a designated disclosure channel.
- A minimal source locator or reporter-supplied observation.
- A named recipient authorized to receive restricted evidence.

Stop if scope, ownership, or the reporting channel is unclear. Do not probe, authenticate, test validity, or seek additional secret material.

## Assessment

1. Admit only the minimum source context needed to identify the exposure boundary. See [evidence and source admission](references/evidence-admission.md).
2. Classify the observation by exposure and handling risk, never by attempting use. See [exposure classification](references/exposure-classification.md).
3. On observing possible secret material, stop further inspection and minimize or redact the record. See [immediate stop and redaction](references/minimization-redaction.md).
4. Record ownership and validity as unknown unless the authorized owner independently confirms them. See [ownership and validity uncertainty](references/ownership-validity.md).
5. Send only restricted, redacted evidence through the designated channel; recommend prevention without handling the material. See [restricted handoff and prevention](references/restricted-handoff-prevention.md).

## Evidence

- Authorization and scope reference.
- Redacted source locator, observation time, and exposure boundary.
- Classification, uncertainty statement, and minimization actions.
- Restricted-handoff recipient and delivery status, without reproducing sensitive content.

## Output

Use the [restricted remediation and handoff template](assets/restricted-remediation-handoff-template.md). Reports must state that no validity testing or secret use occurred.

## Supplemental Resources

- [Static exposure manifest](assets/static-exposure-manifest.md)
- [Classification and redaction matrix](assets/classification-redaction-matrix.md)
- [Immediate-stop and retention checklist](assets/immediate-stop-retention-checklist.md)
- [Reference index](references/README.md)
