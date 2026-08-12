# Path-Handling Test Techniques

## Purpose And Preconditions

Use to plan a minimal, authorized comparison where a file selector may be assembled from untrusted input. This is not a payload catalog. Require a tester-controlled inert marker, an expected base selection, and explicit permission for the specific input location.

## Bounded Marker Workflow

1. Classify the sink: direct selection, download, preview, import, archive extraction, upload naming, or link-aware resolution.
2. Start with the ordinary marker selection.
3. Test one processing property at a time: logical segments, separator interpretation, encoding boundary, rootedness handling, extension validation, or link/archival resolution when the feature supports it.
4. Manually repeat a positive marker-only observation once, then stop and preserve evidence.

## Normalization And Decoding Model

The relevant question is whether validation, joining, and final resolution agree. Weak designs filter strings before later decoding or normalize before a second parser changes the value. Strong designs map an opaque allowlisted identifier to a known resource, or resolve a single decoded value beneath a fixed base and verify canonical containment after all resolution-relevant transformations.

## Observations And Interpretation

- Differential errors establish a hypothesis about processing order, not unauthorized access.
- A response that identifies the permitted marker but ignores the intended selection boundary is a safe confirmation signal.
- Do not assess impact beyond the demonstrated marker. Do not chain observations into content discovery.

## False-Positive Controls

Use a same-shape invalid marker control. Hold method, authentication, headers, and cache directives constant. Rule out client normalization, routes that treat separators specially, and generic error templates.

## Evidence And Remediation

Keep an ordered baseline/variant table, sanitized response metadata, marker proof, and cleanup outcome. Recommend server-side identifier allowlists, one controlled decode, canonical containment checks, safe link policy, and regression tests at each observed boundary.

## Source

- PortSwigger: <https://portswigger.net/web-security/file-path-traversal>
