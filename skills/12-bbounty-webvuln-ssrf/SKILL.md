---
name: 12-bbounty-webvuln-ssrf
description: "Assess an authorized server-side URL-fetch surface for SSRF using controlled endpoints, bounded callbacks, redirect/parser checks, and strict trust-boundary evidence without internal-network enumeration or metadata retrieval."
metadata:
  version: "1.0"
  opencode/slash: "true"
---

# Server-Side Request Forgery (SSRF)

Assess a suspected server-side URL fetch only within explicit written authorization. Establish whether the application makes an unintended request and whether that request crosses a meaningful trust boundary. Do not enumerate internal networks, scan ports, access credentials or secrets, or use non-HTTP schemes.

## Preconditions

- Written scope identifies the in-scope application, permitted test accounts, permitted callback infrastructure, request-rate limits, and disclosure channel.
- The program permits SSRF testing and states whether blind callbacks, redirects, cloud environments, or internal service checks are allowed.
- Use a controlled, owned HTTP endpoint or a program-provided test fixture. Do not target production internal services, metadata services, or third parties.
- Stop if authorization, attribution, or impact limits are unclear. Read [evidence and stop conditions](assets/evidence-stop-conditions.md) before sending a request.

## Authorized Workflow

1. **Triage the input.** Identify a feature that accepts a URL, hostname, webhook destination, import source, preview source, or integration callback. Read [basic SSRF](references/basic-ssrf.md) when a server-side fetch is observable or suspected. Record the normal request and expected behavior.
2. **Choose the least-impact validation.** Consult the [decision matrix](assets/decision-matrix.md) and [test matrix](assets/test-matrix.md). Prefer one controlled HTTP callback and one minimal request. Do not automate requests or expand scope based on errors.
3. **Classify the signal.** If the application returns fetched content or a destination-specific result, use [basic SSRF](references/basic-ssrf.md). If no response content is available but the authorized callback receives a correlated request, read [blind SSRF](references/blind-ssrf.md). Treat timing alone as inconclusive.
4. **Assess URL handling only when authorized.** When validation and fetching appear to disagree, read [parser confusion and redirects](references/parser-confusion.md). Test only documented, benign normalization or redirect behavior against controlled endpoints; do not use encoding catalogs or bypass payloads.
5. **Constrain protocol handling.** If the product claims to fetch URLs, read [protocol handling](references/protocol-handling.md) to determine whether it enforces HTTPS or HTTP and rejects everything else. Do not attempt non-HTTP protocols.
6. **Differentiate controlled services cautiously.** If the program explicitly authorizes internal-boundary validation, read [controlled internal service differentiation](references/controlled-internal-services.md). Use only a program-owned fixture or assigned test service, one request at a time. No network discovery, port enumeration, banner collection, or service interaction.
7. **Handle cloud indicators safely.** If deployment evidence identifies a cloud provider, read [cloud metadata safety](references/cloud-metadata-safety.md) and the [cloud endpoint reference](assets/cloud-metadata-reference.md). These distinguish provider protections and identity-only metadata concepts; they do not authorize metadata requests. Stop rather than attempting any metadata endpoint unless the program supplies a dedicated fixture and written permission.
8. **Control false positives and preserve evidence.** Read [false-positive controls](references/false-positive-controls.md) before concluding that a callback proves SSRF. Capture the minimum correlated evidence described in [evidence and stop conditions](assets/evidence-stop-conditions.md).
9. **Report and remediate.** Use [prevention and remediation](references/prevention.md) and the [remediation lookup](assets/remediation-lookup.md) to map the confirmed behavior to a fix. Consult the [SSRF assessment cheatsheet](references/cheatsheet.md) for concise boundaries; it is supplemental, not a substitute for the decision-point references.

## Validation And Evidence

A finding requires reproducible, scope-compliant evidence that a server-side component initiated an unintended request to an authorized controlled destination, with a request-to-callback correlation or an equivalent response-side confirmation. Preserve the affected feature, sanitized request, timestamp, unique correlation value, response behavior, callback logs, and tested safety boundaries. Never retain secrets, sensitive response bodies, or internal topology in reusable material.

## Output

```yaml
ssrf_report:
  target: string
  feature_and_input: string
  authorization_reference: string
  validation_method: response | controlled_callback
  correlation_evidence: string
  affected_boundary: external_callback | controlled_fixture | redirect_validation
  false_positive_checks: [strings]
  impact: informational | low | medium | high
  remediation: [strings]
```

## Resource Index

- [Basic SSRF](references/basic-ssrf.md)
- [Blind SSRF](references/blind-ssrf.md)
- [Parser confusion and redirects](references/parser-confusion.md)
- [Protocol handling](references/protocol-handling.md)
- [Controlled internal service differentiation](references/controlled-internal-services.md)
- [Cloud metadata safety](references/cloud-metadata-safety.md)
- [False-positive controls](references/false-positive-controls.md)
- [Prevention and remediation](references/prevention.md)
- [SSRF assessment cheatsheet](references/cheatsheet.md)
- [Decision matrix](assets/decision-matrix.md)
- [Cloud metadata reference](assets/cloud-metadata-reference.md)
- [Test matrix](assets/test-matrix.md)
- [Evidence and stop conditions](assets/evidence-stop-conditions.md)
- [Remediation lookup](assets/remediation-lookup.md)
