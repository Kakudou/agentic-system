---
name: 12-bbounty-vuln-cloud-exposure
description: Authorization-first, evidence-led assessment of publicly observable cloud exposure without retrieval, enumeration, or exploitation.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Cloud Exposure Assessment

## Purpose

Assess a clearly authorized cloud-exposure observation, establish whether an observed public surface belongs to the target, and produce a minimal, privacy-preserving handoff. This skill is observation-oriented: it does not enumerate assets, retrieve configuration or credentials, access metadata services, scan automatically, or exploit a suspected weakness.

## Prerequisites

- Written authorization that states the in-scope organization, public assets, permitted observation method, time window, and reporting channel.
- Ownership evidence sufficient to distinguish a target-operated asset from shared provider infrastructure, a vendor, or a third party.
- An approved low-impact method. If an observation would require interaction beyond ordinary public browsing or a provider-approved console review, obtain explicit approval first.

## Workflow

1. Confirm scope, authorization, asset identity, and ownership before recording an exposure claim. Read [scope, provider, and ownership evidence](references/cloud-exposure-boundaries.md).
2. Use only passive public observation or an explicitly approved low-impact check. Read [public-exposure observation](references/public-configuration-observation.md).
3. Interpret visible configuration and identity boundaries without retrieving protected content, configuration, credentials, or metadata. Read [configuration and identity boundaries](references/metadata-services.md).
4. Stop immediately if sensitive data appears. Do not download, copy, validate, or use it. Follow [sensitive-data stop and redaction controls](references/object-storage.md).
5. Record only the minimum reproducible evidence, rate confidence, and hand off through the authorized channel. Read [evidence, validation, prevention, and handoff](references/aws.md).

## Evidence

- Authorization reference, scope statement, and observation timestamp.
- Asset identifier and source of ownership/attribution evidence.
- Redacted public observation, method, response class, and expected-versus-observed boundary.
- Confidence, alternative explanations, false-positive checks, and any stop event.
- Recommended owner, remediation theme, and authorized handoff reference.

## Output

Use the [cloud asset and ownership worksheet](assets/cloud-asset-ownership-worksheet.md), [exposure-confidence matrix](assets/exposure-confidence-matrix.md), [sensitive-data stop checklist](assets/sensitive-data-stop-checklist.md), and [remediation handoff template](assets/remediation-handoff-template.md). Do not include secrets, personal data, credentials, unredacted sensitive content, or instructions that enable access.

## Supplemental Reference Index

- [AWS boundary notes](references/aws.md)
- [Azure boundary notes](references/azure.md)
- [Google Cloud boundary notes](references/gcp.md)
- [Public configuration observation](references/public-configuration-observation.md)
- [Cloud exposure boundaries](references/cloud-exposure-boundaries.md)
