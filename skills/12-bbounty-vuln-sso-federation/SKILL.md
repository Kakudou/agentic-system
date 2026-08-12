---
name: 12-bbounty-vuln-sso-federation
description: Authorization-first, observation-oriented assessment of in-scope SSO and federation boundaries.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Authorized SSO and Federation Assessment

## Purpose

Assess whether an observed, in-scope SSO or federation integration has a clearly bounded trust relationship, expected identity binding, and defensible validation controls. This skill preserves evidence and prepares a remediation handoff. It does not probe providers, automate requests, manipulate tokens or assertions, alter account links, attempt account takeover, or test LDAP or Kerberos services.

## Prerequisites

- Written authorization naming in-scope relying parties, identity providers, permitted methods, designated test accounts, exclusions, and a stop contact.
- Provenance-labelled observations from supplied documentation, browser captures, application logs, or authorized prior artifacts.
- A secure evidence location and a named security or identity-platform handoff recipient.

## Workflow

1. Admit only the authorized relying-party, IdP, test-account, and boundary observations. Record uncertainty and stop conditions with [scope, test-account, and IdP boundaries](references/federation-boundaries.md) and the [sensitive-data and stop checklist](assets/sensitive-data-stop-checklist.md).
2. Map the observed federation journey and published configuration without interacting with unapproved endpoints. Use [federation flow and metadata observation](references/flow-metadata-observation.md) and the [IdP/SP flow evidence worksheet](assets/idp-sp-flow-evidence-worksheet.md). For protocol-specific context, consult [OIDC observation](references/oidc.md) or [SAML observation](references/saml.md).
3. Interpret how the relying party binds the observed issuer, audience or service-provider context, stable subject, tenant, and attributes to the designated identity. Use [claim and identity-binding interpretation](references/identity-linking.md) and the [identity-binding confidence matrix](assets/identity-binding-confidence-matrix.md). Do not change claims, assertions, tokens, or account associations.
4. Confirm only through passive evidence or a specifically approved, low-impact test-account check. Apply [safe confirmation and evidence](references/validation-prevention-handoff.md). Treat a redirect, metadata field, UI message, or client-side display as a lead, not proof of a server-side trust failure.
5. Minimize retention, redact sensitive artifacts, stop on any boundary conflict, and deliver a bounded prevention handoff. Follow [privacy, stop, and handoff controls](references/privacy-handoff.md) and the [remediation and handoff template](assets/remediation-handoff-template.md).

## Evidence

- Authorization, scope decision, permitted account identifiers, exclusions, and stop-contact reference.
- Timestamped, redacted observations of the flow, IdP/SP relationship, and supplied metadata or logs with provenance.
- Identity-binding interpretation, alternative explanations, confidence, and the exact confirmed or unconfirmed boundary.
- Evidence handling, redaction, stop decisions, and remediation owner.

## Output

```yaml
sso_federation_handoff:
  scope_reference: string
  assessed_at: RFC-3339 timestamp
  coverage: complete | partial | blocked
  federation:
    relying_party: string
    identity_provider: string
    protocol: saml | oidc | other | unknown
    observed_flow: string
  identity_binding:
    stable_identifier: documented | observed | unknown
    tenant_or_organization_binding: documented | observed | unknown
    confidence: low | medium | high
  assessment: pass | concern | inconclusive
  evidence_references: [string]
  stopped_or_excluded: [string]
  remediation_owner: string
```

## Supplemental Index

- [Scope, test-account, and IdP boundaries](references/federation-boundaries.md)
- [Federation flow and metadata observation](references/flow-metadata-observation.md)
- [OIDC observation](references/oidc.md)
- [SAML observation](references/saml.md)
- [Claim and identity-binding interpretation](references/identity-linking.md)
- [Safe confirmation and prevention](references/validation-prevention-handoff.md)
- [Privacy, stop, and handoff controls](references/privacy-handoff.md)
- [IdP/SP flow evidence worksheet](assets/idp-sp-flow-evidence-worksheet.md)
- [Identity-binding confidence matrix](assets/identity-binding-confidence-matrix.md)
- [Sensitive-data and stop checklist](assets/sensitive-data-stop-checklist.md)
- [Remediation and handoff template](assets/remediation-handoff-template.md)
