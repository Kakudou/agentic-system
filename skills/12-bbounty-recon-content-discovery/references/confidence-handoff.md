# Confidence, Validation, and Handoff

## Purpose and Preconditions

Turn authorized content observations into reviewable, evidence-bounded handoff facts. Use after a content or metadata observation could matter to a later authorized workflow. Require source locators, timestamps, scope decisions, and evidence handling consistent with program rules.

## Passive or Approved Low-Impact Methodology

State the direct observation before interpretation. Where permitted, corroborate once through an independent passive source or a second normal in-scope observation. Preserve access context and alternate explanations. Validation here checks evidence consistency only; it does not authorize vulnerability testing, expanded collection, or active probing.

## Interpretation

Classify confidence as `observed` for one direct target-specific record, `corroborated` for consistent independent permitted evidence, or `inconclusive` when ambiguity or conflict remains. A content observation is not a vulnerability finding unless another authorized workflow establishes a reproducible security consequence.

## False-Positive and Scope Controls

Check for caching, CDN or proxy transformations, content negotiation, localization, authentication differences, deployment drift, user-generated content, and third-party embeds. Do not merge evidence across different hosts, environments, dates, or account states without an explicit verified relationship. Stop when further work would exceed scope or raise impact.

## Evidence and Handoff

Use the [artifact-confidence matrix](../assets/artifact-confidence-matrix.md) and [recon handoff template](../assets/recon-handoff-template.md). Include authorization, locator, source relationship, method, timestamp, redaction, evidence reference, confidence rationale, alternatives, limitations, and recommended owner. The receiving workflow must obtain its own authorization for any validation.

## Sources

- [ISO/IEC 29147: Vulnerability Disclosure](https://www.iso.org/standard/72311.html)
- [OWASP Vulnerability Disclosure Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html)
