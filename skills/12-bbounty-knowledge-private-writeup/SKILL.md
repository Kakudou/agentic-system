---
name: 12-bbounty-knowledge-private-writeup
description: Create private, privacy-preserving security writeups from already-observed, authorized evidence without testing, reproducing, or publishing findings.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Private Security Writeup

## Purpose

Document an authorized security observation as a factual private record and restricted handoff. This skill does not test, collect, reproduce, validate, disclose, publish, automate storage, or create exploit guidance.

## Scope First

1. Confirm written authorization, current scope, finding identifier, approved audience/channel, and retention rule. Apply [evidence and scope admission](references/evidence-scope-admission.md) before accepting any material.
2. Stop for unclear authorization, scope, provenance, ownership, classification, recipient access, or retention. Record only permitted non-sensitive metadata and the reason for stopping.
3. Classify material before drafting. Use the [restricted-data and stop checklist](assets/restricted-data-stop-checklist.md) and [access, redaction, and retention controls](references/access-redaction-retention.md).

## Documentation Workflow

1. Separate observed facts, artifact references, interpretation, and unknowns with the [claim and evidence boundaries](references/claim-evidence-boundaries.md) and [claim/evidence matrix](assets/claim-evidence-matrix.md).
2. Draft a factual private narrative using the [private narrative structure](references/private-narrative-structure.md) and [static private-writeup outline](assets/private-writeup-outline.md). State what was observed, under what authorized conditions, and what remains unconfirmed.
3. Include only the minimum necessary sensitive detail. Prefer stable references, classifications, and redacted descriptions over restricted content. Do not include operational sequences, credentials, personal data, session material, private content, or reproduction material unless explicitly approved for the recipient.
4. Obtain review of factual support, classification, redaction, access, and retention decisions. Use [validation and knowledge handoff](references/validation-knowledge-handoff.md) and the [restricted handoff template](assets/restricted-handoff-template.md). A handoff requests review; it never authorizes further action.

## Prerequisites

- Written authorization and current scope covering the prior observation.
- Finding identifier, approved private audience/channel, and retention/access policy.
- Already-observed, provenance-bearing evidence or permitted metadata.

## Evidence

- Authorization, scope, observation window, and recipient references.
- Artifact identifiers, provenance, classification, and admitted form.
- Fact-to-evidence mapping, exclusions, uncertainty, and redaction decisions.
- Review status, retention/access boundary, and requested follow-up approval.

## Output

```yaml
private_security_writeup:
  finding_id: string
  authorization_scope_reference: string
  audience_and_channel: string
  observation_window: RFC-3339 interval
  status: draft | reviewed | stopped
  supported_facts: [string]
  evidence_references: [string]
  interpretation_and_uncertainty: [string]
  classification_and_redaction: string
  retention_and_access_boundary: string
  requested_follow_up_authorization: string | none
```

## Supplemental Index

- [Evidence and scope admission](references/evidence-scope-admission.md)
- [Private narrative structure](references/private-narrative-structure.md)
- [Claim and evidence boundaries](references/claim-evidence-boundaries.md)
- [Access, redaction, and retention](references/access-redaction-retention.md)
- [Validation and knowledge handoff](references/validation-knowledge-handoff.md)
- [Static assets](assets/)
