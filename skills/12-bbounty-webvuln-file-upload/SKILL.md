---
name: 12-bbounty-webvuln-file-upload
description: Authorized assessment of file upload validation, processing, storage, serving, and impact boundaries using inert test files.
metadata:
  version: 1.0
  opencode/slash: "true"
---

# File Upload Assessment

## Purpose

Assess whether an authorized upload feature consistently validates files, isolates storage, and serves accepted content safely. Use only designated accounts, in-scope endpoints, and inert files. Do not upload executable content, active documents, web shells, polyglots, configuration files, or files intended to bypass controls. Do not automate uploads, enumerate storage, or test concurrency unless the engagement explicitly authorizes those actions.

## Prerequisites

- Written scope covering the target, upload feature, test account, permitted file classes, and any upload-volume limit.
- A cleanup owner and stop condition for retained files, processing failures, unexpected publication, or access to another user's object.
- Inert test files from the [benign sample-file manifest](assets/benign_sample_file_manifest.md), prepared only as allowed by the program.
- A way to observe the authorized upload response and the resulting object through its intended access path.

## Workflow

### 1. Map the normal upload path

Use one permitted baseline upload and record the client-visible constraints, request fields, server response, object identifier, retrieval path, and deletion or expiry behavior. Read [upload behavior mapping](references/upload-behavior-mapping.md) before mapping a new endpoint and use the [upload test and evidence matrix](assets/upload_test_evidence_matrix.md) to keep coverage bounded.

### 2. Establish validation behavior with inert samples

Compare only a small number of approved, inert sample files that differ in one declared attribute. Record the filename presented, declared media type, actual benign format, acceptance decision, and resulting object metadata. Read [extension and content-type validation](references/extension-content-type-validation.md) when validation is relevant, and the [decision matrix](assets/file_type_processing_serving_decision_matrix.md) when choosing a safe comparison.

### 3. Observe filename, storage, and serving controls

For accepted samples, use the application's intended retrieval path to determine whether names are normalized, object access is correctly authorized, and response headers and disposition suit the file class. Do not guess paths or access unrelated objects. Read [filename, storage, and serving behavior](references/filename-storage-serving.md) before interpreting identifiers, URLs, or delivery headers.

### 4. Assess transformations and format integrity

When the feature resizes, converts, previews, extracts metadata, or otherwise processes files, compare a known-good inert source with its returned derivative. Read [image processing](references/image-processing.md) for image-specific observations. Read [safe format-integrity testing](references/safe-format-integrity-testing.md) only when the program authorizes a benign malformed or truncated sample; stop on parser errors, resource pressure, or unexpected processing behavior.

### 5. Bound payload and execution context

Assess the destination context, not an active payload: whether accepted content is stored outside application-executable locations, isolated by authorization, and delivered with appropriate headers. Read [payload and context assessment](references/payload-context-assessment.md) before making any execution-related claim. A permissive client check, filename echo, or accepted inert sample alone is not a finding.

### 6. Validate, clean up, and report

Confirm observations with the minimum reproducible authorized comparison. Apply the [evidence, cleanup, and stop conditions](assets/evidence_cleanup_stop_conditions.md), remove test objects through the intended mechanism when allowed, and record any retained object for the owner. Read [prevention](references/prevention.md) and the [remediation lookup](assets/remediation_lookup.md) when framing corrective action. Use the [upload assessment cheatsheet](assets/upload_assessment_cheatsheet.md) for a final scope and false-positive review.

## Validation

- Authorization, test account, permitted samples, and stop conditions were recorded before testing.
- Each comparison changed one inert, approved attribute and used the intended feature path.
- Storage and serving conclusions are supported by an authorized observation, not inferred from a filename or URL pattern.
- Potential impact is bounded to the confirmed behavior; no active payload or unauthorized-object access was used.
- Test files were deleted, expired, or explicitly handed off for cleanup.

## Evidence

- Scope authorization, account role, sample manifest entry, and safety limits.
- Redacted baseline and comparison request/response observations.
- Accepted-object identifier, authorized retrieval observation, relevant response headers, and transformation result.
- False-positive checks, impact boundary, cleanup status, and remediation mapping.

## Output Format

```yaml
file_upload_report:
  target: string
  authorized_scope: string
  upload_paths: [strings]
  observations:
    - test_id: string
      sample_id: string
      changed_attribute: string
      expected_result: string
      observed_result: string
      storage_or_serving_observation: string
      false_positive_checks: [strings]
      evidence: [strings]
      cleanup_status: not_applicable | deleted | expired | handed_off
  findings:
    - id: string
      confirmed_control_failure: string
      impact_boundary: string
      remediation: string
  overall_impact: informational | low | medium | high | critical
```

## Detailed Resources

- [Upload behavior mapping](references/upload-behavior-mapping.md)
- [Extension and content-type validation](references/extension-content-type-validation.md)
- [Filename, storage, and serving behavior](references/filename-storage-serving.md)
- [Image processing](references/image-processing.md)
- [Safe format-integrity testing](references/safe-format-integrity-testing.md)
- [Payload and context assessment](references/payload-context-assessment.md)
- [Prevention](references/prevention.md)
- [Sources](references/sources.md)
- [File-type, processing, and serving decision matrix](assets/file_type_processing_serving_decision_matrix.md)
- [Benign sample-file manifest](assets/benign_sample_file_manifest.md)
- [Upload test and evidence matrix](assets/upload_test_evidence_matrix.md)
- [Evidence, cleanup, and stop conditions](assets/evidence_cleanup_stop_conditions.md)
- [Remediation lookup](assets/remediation_lookup.md)
- [Upload assessment cheatsheet](assets/upload_assessment_cheatsheet.md)
