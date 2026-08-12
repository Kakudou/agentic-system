# Certificate Transparency Review

## Purpose

Use public certificate-transparency metadata to identify names that were represented in certificates for an explicitly in-scope registrable domain.

## Preconditions

- Confirm the registrable domain is explicitly authorized.
- Use a public CT viewer or log interface without contacting the named host.
- Define the review time window and record the source's observation time.

## Passive Authorized Method

Review certificate subject and SAN names, issuer, and validity dates. Normalize wildcard notation only for comparison, preserve the original value in evidence, and treat each name as a lead rather than an asset. Do not resolve DNS, connect to HTTPS, scan, or use CT output to expand the authorized target set.

## Interpretation And Controls

- CT establishes that a certificate containing a name was logged, not that the name is live, controlled by the target, or in scope.
- Expired certificates, pre-production names, delegated services, and CDN-issued certificates are common stale or third-party signals.
- Corroborate ownership with an independent authorized public source before elevating a lead. Preserve issuance and expiry dates to prevent recency errors.

## Privacy And Scope Limits

Record only certificate metadata needed for an in-scope name. Do not retain unrelated SANs, personnel fields, or bulk log exports. Stop if an observation suggests a sensitive internal naming convention outside the authorized scope.

## Evidence And Handoff

Capture viewer URL or immutable log reference, retrieval time, certificate/log identifier, original name, issuer, validity period, and identity rationale. Handoff names as `observed in CT` with confidence and no implied reachability.

## Sources

- [RFC 9162, Certificate Transparency Version 2.0](https://www.rfc-editor.org/rfc/rfc9162)
- [Certificate Transparency documentation](https://certificate.transparency.dev/)
