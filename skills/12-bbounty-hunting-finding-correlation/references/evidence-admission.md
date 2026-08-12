# Evidence Admission

## Purpose And Preconditions

Decide whether a finding can be compared without converting incomplete observations into facts. Use material collected within the engagement's authorization and retain the original finding record. This guide does not direct testing, reproduction, or exploitation.

## Evidence-Led Method

1. Assign or preserve a stable finding ID.
2. Record the authorized scope, collection date or window, affected surface, observation, and exact evidence locator.
3. Record relevant conditions: authenticated role, configuration/version context when known, and any sanitization or redaction applied.
4. Mark evidence as admissible only when another authorized reviewer can locate the source and distinguish observation from interpretation.
5. Exclude items with missing provenance, ambiguous surfaces, altered evidence without an original locator, or scope uncertainty. Keep the exclusion reason.

## Interpretation And Uncertainty

Admission means the observation is suitable for comparison, not that its severity, impact, cause, or reportability is established. Architecture notes may orient comparison, but they are not proof that two surfaces share implementation or ownership.

## Controls

- Avoid collecting or copying credentials, personal data, customer content, or unrelated records into the worksheet.
- Prefer opaque IDs and precise locators over request/response dumps in broad handoffs.
- Do not fill missing fields from naming similarity, scanner labels, or memory.
- Pause correlation when scope, authorization, provenance, or data handling is unclear; escalate to the engagement owner.

## Evidence And Handoff

For each admitted item, hand off the finding ID, locator, scope statement, observed fact, collection conditions, redaction note, and admission decision. Preserve excluded candidates separately so they cannot silently influence a group.

## Sources

- [NIST SP 800-115, Technical Guide to Information Security Testing and Assessment](https://csrc.nist.gov/pubs/sp/800/115/final)
- [FIRST PSIRT Services Framework, Evidence Collection](https://www.first.org/standards/frameworks/psirts/)
