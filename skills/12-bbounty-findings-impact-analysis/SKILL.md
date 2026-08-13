---
name: 12-bbounty-findings-impact-analysis
description: Document evidence-supported security impact within an authorized finding's scope.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Evidence-Led Impact Analysis

## Purpose

Turn a validated finding into bounded, reviewable impact claims. Assess only effects supported by authorized observation; do not test beyond the validated behavior, estimate losses, infer affected populations, or assert unobserved outcomes.

## Prerequisites

- A validated finding and its evidence package.
- Current program authorization, in-scope assets, and testing constraints.
- A defined handoff recipient or report format.

## Workflow

1. Establish the exact asset, authorization boundary, affected party, and stopping conditions with the [scope and affected-party guide](references/scope-boundaries.md).
2. Record only admissible observations in the [impact-evidence worksheet](assets/impact-evidence-worksheet.md). Redact secrets, personal data, and unnecessary identifiers.
3. Map each supported effect to [confidentiality, integrity, availability, or authorization-boundary dimensions](references/cia-authorization-dimensions.md); assess a dimension only when evidence warrants it.
4. Rate each claim's confidence and identify validation gaps using the [uncertainty and validation guide](references/uncertainty-validation.md) and [claim confidence matrix](assets/dimension-claim-confidence-matrix.md).
5. Stop when validation would exceed authorization or add no material evidence. Apply the [scope and stop checklist](assets/scope-stop-checklist.md).
6. Produce a bounded, evidence-linked handoff using the [handoff template](assets/impact-handoff-template.md) and [handoff guide](references/evidence-handoff.md).

## Evidence

Admit reproducible finding evidence, authorized request/response metadata, configuration or product documentation, and explicit program scope. The [impact evidence guide](references/impact-evidence.md) defines collection and redaction rules. Separate observed facts from interpretations and unresolved hypotheses.

## Output

Provide an impact record containing:

- Finding and in-scope asset identifiers.
- Authorization and affected-party boundaries.
- CIA or authorization-boundary claims, each linked to evidence.
- Confidence, limitations, and validation needs for every claim.
- Redacted evidence references and a clear reviewer handoff.

Do not assign severity, CVSS scores, financial loss, user counts, or downstream outcomes without separately authorized, supporting evidence.

## Resources

- [Impact evidence](references/impact-evidence.md)
- [CIA and authorization dimensions](references/cia-authorization-dimensions.md)
- [Scope boundaries](references/scope-boundaries.md)
- [Uncertainty and validation](references/uncertainty-validation.md)
- [Evidence handoff](references/evidence-handoff.md)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [CVSS v4.0 specification](https://www.first.org/cvss/v4-0/specification-document)
