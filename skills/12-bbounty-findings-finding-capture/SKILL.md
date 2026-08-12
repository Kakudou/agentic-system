---
name: 12-bbounty-findings-finding-capture
description: Capture an in-scope security observation as a bounded, evidence-led finding handoff without active testing, severity scoring, or report generation.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Finding Capture

## Purpose

Create a factual, review-ready finding record from already collected, authorized evidence. This skill documents observations; it does not test targets, assess severity, classify vulnerabilities, or write a disclosure report.

## Prerequisites

- An authorized engagement and an available scope decision.
- Existing evidence collected within that authorization.
- A designated private storage or handoff channel approved by the program.

## Workflow

1. **[Admit scope and evidence](references/scope-and-evidence-admission.md).** Stop when scope, authorization, source, or custody is unclear.
2. **[Capture finding facts](references/finding-facts.md).** Record only directly observed facts and stable asset identifiers.
3. **[Bound the reproducibility record](references/reproduction-record.md).** Describe the minimum safe conditions and expected observation without instructions that cause or extend impact.
4. **[Separate claims from uncertainty](references/uncertainty-and-validation.md).** Mark inference, missing corroboration, and required independent validation explicitly.
5. **[Apply sensitive-data controls](references/sensitive-data-handling.md).** Redact or stop before copying unnecessary personal data, credentials, tokens, or other protected material.
6. **[Prepare the handoff](references/handoff.md).** Package the worksheet, admitted evidence references, and unresolved questions for the authorized reviewer.

## Evidence

- Scope and authorization reference.
- Immutable or access-controlled evidence references with source, capture time, and integrity information when available.
- Completed [finding-capture worksheet](assets/finding-capture-worksheet.md).
- Completed [claim/evidence confidence matrix](assets/claim-evidence-confidence-matrix.md).
- Completed [redaction and stop checklist](assets/redaction-stop-checklist.md).

## Output

One bounded finding-capture packet containing factual observations, evidence provenance, a minimal safe reproducibility record, uncertainty labels, redaction status, and an authorized-reviewer handoff. It contains no severity claim, active-test instruction, or disclosure-report prose.

## Supplemental Index

- [Scope and evidence admission](references/scope-and-evidence-admission.md)
- [Finding facts](references/finding-facts.md)
- [Minimal reproducibility record](references/reproduction-record.md)
- [Uncertainty and validation](references/uncertainty-and-validation.md)
- [Sensitive-data handling](references/sensitive-data-handling.md)
- [Handoff](references/handoff.md)
- [Finding-capture worksheet](assets/finding-capture-worksheet.md)
- [Claim/evidence confidence matrix](assets/claim-evidence-confidence-matrix.md)
- [Redaction and stop checklist](assets/redaction-stop-checklist.md)
- [Handoff template](assets/handoff-template.md)
