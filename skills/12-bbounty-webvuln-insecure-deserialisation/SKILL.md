---
name: 12-bbounty-webvuln-insecure-deserialisation
description: Authorized, non-exploit assessment of unsafe deserialization boundaries, evidence, and remediation.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Unsafe Deserialization Assessment

## Purpose

Assess whether an explicitly authorized target accepts attacker-controlled serialized state and crosses an unsafe runtime or framework boundary. This skill is observation-only: it does not construct or submit serialized objects, execute code, access data or files, or automate requests.

## Prerequisites

- Written scope explicitly permits deserialization assessment.
- A defined target, owner contact, and stop/escalation path.
- Existing authorized evidence, such as documented traffic, logs, source review, or owner-provided test observations.
- No production-impact testing without the owner's separate written approval.

## Workflow

1. Confirm authorization and record the target, evidence source, and approved observation boundary. Read [strict stop conditions](references/stop-conditions.md).
2. Map known inputs to their claimed or observed serialization format with the [format/framework handling worksheet](assets/format-framework-handling-worksheet.md) and [format/input mapping](references/format-input-mapping.md).
3. Record only harmless handling observations from already-authorized evidence. Use [harmless format/handling observation](references/harmless-observation.md) and the [safe confirmation matrix](assets/safe-confirmation-matrix.md).
4. Interpret whether parsing remains data-only or crosses a runtime/framework boundary. Use [runtime/framework boundary interpretation](references/runtime-framework-boundaries.md), then load the relevant platform reference: [Java](references/java.md), [.NET](references/dotnet.md), or [PHP](references/php.md).
5. Corroborate a finding with independent, non-invasive evidence. Follow [safe confirmation/evidence](references/safe-confirmation-evidence.md) and the [evidence/stop checklist](assets/evidence-stop-checklist.md).
6. State impact only at the demonstrated boundary. For signed containers, read [signed objects](references/signed-objects.md). Treat library reachability as an owner-review question, not evidence of impact.
7. Provide prevention and an owner handoff using [prevention and handoff](references/prevention-handoff.md) and the [remediation lookup](assets/remediation-lookup.md).

## Evidence

- Scope authorization and test boundary.
- Redacted request/response or source/log locator showing the input and handling path.
- Format and runtime/framework classification with confidence and alternatives considered.
- Corroborating observation, false-positive controls, and applicable stop conditions.
- Owner-safe remediation and retest criteria.

## Output

```yaml
unsafe_deserialization_assessment:
  target: string
  authorization: confirmed | missing
  input_boundary: string
  format_confidence: confirmed | likely | unknown
  runtime_boundary: data_only | typed_binding | unsafe_candidate | unknown
  evidence_locators: [strings]
  false_positive_controls: [strings]
  demonstrated_impact: none | handling_only | bounded_integrity_risk | owner_review_required
  stop_condition: none | triggered
  remediation_handoff: [strings]
```

## Supplemental Index

- [Java detail](references/java-deserialization.md)
- [.NET detail](references/dotnet-deserialization.md)
- [PHP detail](references/php-deserialization.md)
