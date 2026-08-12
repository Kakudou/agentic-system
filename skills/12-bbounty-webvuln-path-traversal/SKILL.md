---
name: 12-bbounty-webvuln-path-traversal
description: Path traversal testing. Directory traversal, file reading, symlink attacks, null byte injection, and OS-specific path testing.
metadata:
  version: 1.0
  opencode/slash: "true"
---

# Path-Handling Assessment

Assess only in-scope, authorized file or path handling. Use harmless, tester-controlled markers and stop before retrieving production, user, credential, configuration, or system data. Do not automate requests, create links, upload files, or alter target state unless the program explicitly authorizes that activity.

## Prerequisites

- Written scope and authorization covering the endpoint and test method.
- A reproducible baseline request and a tester-controlled inert marker available within the permitted storage area, or a program-provided safe test fixture.
- A defined stop contact or disclosure channel for suspected exposure.

## Workflow

1. **Identify file/path sinks.** Inventory inputs that select, construct, archive, preview, download, import, extract, or resolve a path. Record the request shape, expected base location, and whether the operation reads, writes, or enumerates. See [basic traversal](references/basic-traversal.md).
2. **Establish normalization behavior with harmless markers.** Compare a valid marker request with a small, manually chosen set of semantically equivalent marker representations. Change one representation property per request and preserve the baseline. See [normalization](references/normalization.md) and the [decision matrix](assets/path-handling-decision-matrix.md).
3. **Interpret platform and encoding boundaries.** Determine where decoding, separator treatment, Unicode handling, extension validation, archive extraction, and filesystem resolution occur. Do not infer a platform from error text alone. See [platform paths](references/platform-paths.md), [encoding](references/encoding.md), and the [comparison worksheet](assets/encoding-normalization-worksheet.md).
4. **Confirm safely.** Confirm only that an authorized marker outside the intended logical selection is distinguishable or reachable. Use the minimum manual requests needed to reproduce, and stop immediately if any non-marker content, personal data, credentials, source, or configuration is returned. See [traversal techniques](references/traversal-techniques.md) and [marker test cases](references/traversal-payloads.md).
5. **Preserve evidence and prevent recurrence.** Capture sanitized request/response metadata, marker ownership, timestamps, and observed normalization boundary. Remove tester-controlled markers when permitted, report exposure immediately, and recommend allowlists plus canonical containment checks. See [evidence and prevention](references/prevention-validation.md), the [stop checklist](assets/evidence-cleanup-stop-checklist.md), and [remediation lookup](assets/remediation-lookup.md).

## Evidence And Output

Record scope authorization, endpoint and input location, baseline and variant identifiers, marker ownership, response status/length/content-type, relevant sanitized excerpts or hashes, observed decode/normalization stage, impact limited to demonstrated marker access, cleanup status, and remediation advice. Do not retain sensitive response bodies.

```yaml
path_handling_assessment:
  scope_authorization: reference
  sink: request-location-and-operation
  marker: ownership-and-permitted-location
  normalization_observation: statement
  confirmation: not-demonstrated | marker-only | stopped-on-exposure
  evidence: sanitized-request-response-metadata
  cleanup: not-needed | complete | program-owned
  remediation: references
```

## Reference Index

- [Basic traversal](references/basic-traversal.md)
- [Normalization](references/normalization.md)
- [Platform paths](references/platform-paths.md)
- [Encoding](references/encoding.md)
- [Traversal techniques](references/traversal-techniques.md)
- [Marker test cases](references/traversal-payloads.md)
- [Prevention and validation](references/prevention-validation.md)
- [Decision matrix](assets/path-handling-decision-matrix.md)
- [Encoding/normalization worksheet](assets/encoding-normalization-worksheet.md)
- [Evidence, cleanup, and stop checklist](assets/evidence-cleanup-stop-checklist.md)
- [Remediation lookup](assets/remediation-lookup.md)
