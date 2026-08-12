# Identity-Safe Observation Comparison

## Purpose

Compare supplied observations without accidentally joining distinct assets, services, tenants, or routes.

## Preconditions

- Admitted baseline and comparison evidence.
- A declared field set appropriate to the authorized scope, such as hostname, scheme, port, path, service label, or response metadata.

## Evidence-Led Method

Keep the observed identity verbatim, then record any narrow normalization alongside it, such as case normalization for a DNS name or removal of an explicitly irrelevant display field. Compare only identities that share the declared comparison keys and compatible collection context. Preserve redirects, aliases, canonicalization, and differing ports as facts rather than silently collapsing them.

## Interpretation And Attribution Controls

Matching names do not prove the same service; matching content does not prove common ownership. Avoid joins based on branding, IP address, certificate overlap, shared infrastructure, or naming similarity alone. Classify unmatched or ambiguously matched records as inconclusive and state the competing explanations.

## Privacy And Scope Limits

Do not extend the comparison to related-looking targets or third-party endpoints. Use redacted identifiers where required and avoid recording volatile or sensitive response content.

## Evidence And Handoff

For every normalization or match, retain the original values, comparison keys, rationale, and evidence references. Handoff ambiguous identity or ownership relationships for owner confirmation.

## Sources

- [OWASP Asset Discovery](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/01-Conduct_Search_Engine_Discovery_Reconnaissance_for_Information_Leakage)
- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110)
