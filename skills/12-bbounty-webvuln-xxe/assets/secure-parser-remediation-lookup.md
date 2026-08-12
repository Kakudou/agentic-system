# Secure XML Parser Configuration and Remediation Lookup

## Purpose and Preconditions

Use for an owner-approved remediation review after identifying a parser boundary or library. Verify effective runtime settings, not only source-code intent. Exact API calls vary by version; use the vendor documentation for the deployed library.

## Control Lookup

| Control objective | Apply to | Safe verification | Evidence | Remediation note |
|---|---|---|---|---|
| Prohibit DTD processing | All untrusted XML parsers | Valid baseline succeeds; harmless declaration is rejected before resolution. | Effective config and parser log. | Prefer a parser mode that disallows DTDs outright. |
| Disable external entity resolution | Parsers that expose resolver settings | Owner test confirms no resolver invocation from marker fixture. | Resolver configuration and test output. | Use a deny-all resolver as defense in depth where a DTD cannot be disabled. |
| Disable XInclude | XML transformation and document processing | Marker-only include structure is rejected or inert. | Transform configuration and regression result. | Enable only for a documented business need with strict allowlisting. |
| Disable validation that fetches external schemas | Validators and transformation pipelines | Validation uses local, approved schemas only. | Schema catalog/allowlist and logs. | Bundle trusted schemas; do not fetch at runtime. |
| Bound parser resources | Every XML parser and worker | Normal documents meet size/time limits without queue impact. | Limits, metrics, and load-safe test record. | Set input, depth, time, and concurrency limits appropriate to workload. |
| Isolate parser workloads | Uploads and background conversion | Worker lacks unnecessary outbound capability. | Network policy and service identity review. | Apply egress restrictions and least privilege independently of parser settings. |

## Parser and Content-Type Distinctions

Inventory direct XML APIs, SOAP middleware, SVG/image processors, feeds, document converters, and asynchronous workers separately. A secure API parser does not secure an upload converter. Enforce content-type and schema expectations at the boundary, but do not rely on them as the sole XXE defense.

## Safe Method, Observations, False Positives, and Authorization Limits

A framework's documented secure default may be overridden by a wrapper, compatibility mode, or runtime version. Generic parser errors do not prove that resolution is disabled. Verify the effective configuration and a harmless no-resolver regression test. Do not validate controls with paths, URLs, callbacks, or expansion stress, and apply changes only through the owner's approved change process.

## Evidence and Source

Capture component name/version, effective configuration, parser boundary, regression result, owner, and rollout status. Pair the controls with PortSwigger's prevention guidance and the library vendor's deployed-version documentation.

PortSwigger: <https://portswigger.net/web-security/xxe>
