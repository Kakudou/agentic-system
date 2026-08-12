# XInclude and Parser Behavior

## Purpose and Preconditions

Use this reference for XML fragments embedded in SOAP fields, SVG, feeds, document uploads, or parser stacks known to support XInclude. Confirm the exact accepted format and that a harmless marker-only test is allowed.

## Safe Method

Use a valid baseline and, only where the application accepts the relevant namespace or processing instruction, a structurally valid marker-only variant. Do not include a reference target, URL, path, fallback retrieval, or nested content. Send once at the approved rate.

## Parser and Content-Type Distinctions

XInclude is separate from DTD/entity processing and may be enabled by an application layer after XML parsing. SVG upload processing, XML-aware document converters, and SOAP middleware can differ from a JSON endpoint even when they share a host. Consult the [decision matrix](../assets/parser-input-decision-matrix.md).

## Observations and Interpretation

- Namespace rejection or literal treatment suggests that XInclude processing is not active at that boundary.
- A processor-specific acceptance message or owner log showing include handling warrants configuration review.
- Successful upload alone does not prove that the uploaded XML was parsed.

## False Positives and Limits

Separate XML well-formedness, schema validation, MIME sniffing, and malware-scanner outcomes. Do not test resource loading or external behavior. Stop on processing delays, conversion failures, or user-visible document corruption.

## Evidence and Remediation

Capture upload metadata, content type, parser path, sanitized conversion logs, and paired outcomes. Disable XInclude where unnecessary, require an explicit allowlist where it is needed, and add a regression test that rejects resource-bearing include constructs.

## Source

PortSwigger: <https://portswigger.net/web-security/xxe>
