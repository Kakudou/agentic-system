# False-Positive Controls and Handoff

## Purpose and Preconditions

Turn low-impact observations into an evidence-bounded handoff. Use after a baseline, redirect, transport, or service-differentiation observation indicates a material difference. This guide does not authorize vulnerability testing.

## Bounded Safe Methodology

State the observation, authorization boundary, and expected behavior source if one exists. Corroborate once only when it remains in scope, low impact, and within rate limits. Separate observed facts from interpretation and list alternate explanations. Stop instead of escalating when additional requests would change request shape, scope, or impact.

## Observations and Interpretation

Classify records as `observed`, `corroborated`, or `inconclusive`. A potential issue requires a reproducible discrepancy and a credible security-relevant consequence; ordinary redirects, CDN variation, and certificate rotations commonly remain informational.

## False-Positive Controls

Preserve timestamps, neutral client context, status and header evidence, and scope decision. Check for caching, WAF, load balancing, geolocation, maintenance, client trust, and authentication differences. Do not present banners, status codes, or a single response as confirmed exposure.

## Scope, Evidence, and Handoff

Include the exact authorized target, rate observed, request count, evidence references, confidence, confounders, stop reason, and recommended owner. Use the [recon handoff template](../assets/recon-handoff-template.md). The receiving workflow must obtain any further validation authorization independently.

## Sources

- [ISO/IEC 29147: Vulnerability Disclosure](https://www.iso.org/standard/72311.html)
- [OWASP Vulnerability Disclosure Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html)
