# Transparent Surface Indicators

## Purpose

Classify visible, evidence-supported properties of an already known surface without turning them into security conclusions.

## Preconditions

- The surface and source record have passed scope review.
- The reviewer has the original or faithfully preserved evidence needed to trace each indicator.

## Evidence-Led Methodology

Record indicators as bounded observations: declared service role, documented interface type, approved inventory membership, normal client-visible entry point, ownership statement, or documented lifecycle status. Label the source and context for every indicator. Use the [indicator-confidence matrix](../assets/indicator-confidence-matrix.md) to keep indicator type and support separate.

## Interpretation

An indicator helps a reviewer understand what is known and what needs clarification. It is not a vulnerability, a predicted defect, an access path, or a recommendation to test a particular class of issue.

## Bias And False-Positive Controls

- Prefer explicit program documentation and attributable inventory records over branding, filenames, banners, or naming conventions.
- Preserve conflicting records and plausible alternatives.
- Do not merge distinct environments, tenants, hosts, or historical records solely because names look similar.

## Privacy And Scope Limits

Describe only what the admitted record already reveals. Do not derive hidden routes, enumerate interfaces, inspect source code, or retain sensitive request or response bodies.

## Evidence And Handoff

For each indicator, provide the exact source reference, a short factual statement, confidence, alternatives, and the smallest approved question that could clarify it.

## Sources

- NIST, [SP 800-115: Technical Guide to Information Security Testing and Assessment](https://csrc.nist.gov/pubs/sp/800/115/final)
- OWASP, [Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/)
