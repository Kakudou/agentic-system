---
name: 12-bbounty-vuln-source-artifact-exposure
description: Authorization-first, privacy-preserving assessment of an already observed public source or build artifact.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Source Artifact Exposure Assessment

## Purpose

Assess an already observed public artifact for unintended source, build, debug, or deployment information exposure. This skill is observation-oriented: it does not discover paths, enumerate assets, retrieve artifacts, inspect revision history, extract secrets, automate scanning, or validate access beyond the approved observation.

## Prerequisites

- Written authorization identifying the target, permitted public observation, time window, and reporting channel.
- A reporter-supplied or already observed artifact locator and enough context to assess target ownership.
- An approved low-impact method. Obtain explicit approval before any interaction beyond ordinary public viewing.

Stop if authorization, ownership, scope, or the disclosure channel is unclear.

## Assessment

1. Admit the observation only after confirming source, target ownership, and scope. Read [source and ownership admission](references/source-ownership-admission.md).
2. Classify the already observed public artifact without downloading, reconstructing, or enumerating related materials. Read [public artifact classification](references/public-artifact-classification.md).
3. Interpret visible metadata and exposure boundaries without inferring access to underlying source, infrastructure, or accounts. Read [artifact and metadata boundaries](references/artifact-metadata-boundaries.md).
4. Stop immediately if sensitive data appears. Do not copy, retain, test, or seek more data. Follow [sensitive-data handling and stop controls](references/sensitive-data-stop.md).
5. Preserve minimum redacted evidence, request owner confirmation where needed, and hand off remediation through the authorized channel. Read [validation, prevention, and handoff](references/validation-prevention-handoff.md).

## Evidence

- Authorization, scope, observation time, and approved method reference.
- Redacted artifact locator, ownership evidence, and public exposure boundary.
- Artifact classification, confidence, alternative explanations, and false-positive controls.
- Any stop/redaction action and restricted-handoff recipient.
- Recommended remediation theme and owner-validation request, without sensitive content.

## Output

Use the [static artifact exposure manifest](assets/static-artifact-exposure-manifest.md), [classification and confidence matrix](assets/classification-confidence-matrix.md), [sensitive-data stop checklist](assets/sensitive-data-stop-checklist.md), and [remediation handoff template](assets/remediation-handoff-template.md). Do not include source content, secrets, personal data, credentials, internal paths, or instructions enabling access.

## Supplemental Reference Index

- [Source and ownership admission](references/source-ownership-admission.md)
- [Public artifact classification](references/public-artifact-classification.md)
- [Artifact and metadata boundaries](references/artifact-metadata-boundaries.md)
- [Sensitive-data stop controls](references/sensitive-data-stop.md)
- [Validation, prevention, and handoff](references/validation-prevention-handoff.md)
