# XXE Prevention

## Purpose and Preconditions

Use this reference after a confirmed unsafe behavior, a credible configuration concern, or a preventive review. Identify the actual parser library, version, configuration layer, and XML-bearing input paths before changing controls.

## Safe Validation Method

In a test environment, verify that the normal XML baseline still succeeds while a harmless declaration or include marker is rejected or treated as inert. Review logs to confirm the resolver is never invoked. Do not validate by attempting file access, network access, or expansion pressure.

## Parser and Content-Type Distinctions

Apply controls at every parser boundary: API XML, SOAP, SVG/image conversion, feeds, office/document conversion, and background workers. Gateway content-type checks are useful but cannot replace parser configuration because valid XML can arrive through uploads or internal queues.

## Observations and Interpretation

Safe outcomes are explicit DTD prohibition, disabled external resolution, disabled XInclude where unused, and bounded processing. A generic rejection is insufficient if logs show resolver activity. If a business requirement needs DTD-like features, isolate that workload and use a strict allowlist with an owner-reviewed threat model.

## False Positives and Limits

Do not infer configuration from framework name alone. Defaults vary by version and wrapper API. Confirm the effective runtime configuration and regression coverage; do not alter production configuration without the owner's change process.

## Evidence and Remediation

Record library/version, effective settings, affected paths, safe regression results, and deployment owner. Use the [secure parser configuration lookup](../assets/secure-parser-remediation-lookup.md) for control objectives, then link vendor documentation for exact APIs.

## Source

PortSwigger: <https://portswigger.net/web-security/xxe>
