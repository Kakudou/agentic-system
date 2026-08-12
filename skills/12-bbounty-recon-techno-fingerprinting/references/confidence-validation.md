# Confidence and Validation

## Purpose

Turn permitted observations into falsifiable, bounded claims and preserve enough evidence for another authorized operator to review them.

## Preconditions

- Each source is within scope and has a source locator and collection time.
- Evidence storage and redaction follow the program's handling rules.

## Method

Capture the smallest necessary excerpt or response metadata from passive sources or normal authorized visits. Associate every claim with its layer, source, alternative explanations, and collection conditions. Validation means checking consistency of permitted evidence, not sending differentiating probes.

## Interpretation

- **High:** current, direct, target-specific evidence corroborated independently.
- **Moderate:** one current direct observation with clear target mapping.
- **Low:** indirect, historical, or ambiguous indication.
- **Unknown:** insufficient evidence, evidence outside scope, or unresolved conflict.

## False-Positive Controls

- Keep competing interpretations rather than selecting a preferred vendor or product.
- Do not merge evidence from different hostnames, environments, or time periods without an explicit relationship.
- Never convert confidence into a vulnerability claim or testing authorization.

## Scope and Rate Limits

Do not collect credentials, tokens, personal data, private endpoints, or unnecessary full-page content. Honor program retention and reporting rules. Stop and escalate when content appears sensitive, access changes unexpectedly, or evidence conflicts materially.

## Evidence

Use the [technology-evidence worksheet](../assets/technology-evidence-worksheet.md) and [confidence/conflict matrix](../assets/confidence-conflict-matrix.md). Include source, timestamp, permitted method, excerpt hash or secure capture reference where allowed, redaction, confidence rationale, and conflict disposition.

## Sources

- https://www.nist.gov/privacy-framework
- https://owasp.org/www-project-web-security-testing-guide/
