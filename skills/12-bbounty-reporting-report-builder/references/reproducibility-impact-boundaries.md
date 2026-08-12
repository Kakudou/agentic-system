# Reproducibility And Impact Boundaries

## Purpose And Preconditions

Use when documenting the minimum reproducibility context and keeping observed behavior separate from impact. Require an already-authorized observation; this reference does not authorize replay, proof-of-concept development, or new testing.

## Documentation Methodology

Record only the minimum known preconditions: affected boundary, relevant authorized state, observation sequence at a high level, observed result, and exclusions. Separately state the impact claim as observed, bounded inference, or unverified. Explain the evidence required to move an impact statement to a stronger status.

## False-Claim And Privacy Controls

Do not convert a reproducible observation into a claim of confidentiality, integrity, availability, account access, data exposure, or business loss without direct support. Do not include payloads, commands, credentials, secrets, or procedural detail that creates unnecessary exploitation guidance.

## Evidence And Handoff

Link each stated condition and result to admitted evidence. If independent reproduction is needed, request explicit authorization and leave the report claim bounded until that evidence exists.

## Disclosure Sources

- [NIST SP 800-61 Rev. 2, Computer Security Incident Handling Guide](https://csrc.nist.gov/pubs/sp/800/61/r2/final)
- [FIRST CVSS v4.0 Specification](https://www.first.org/cvss/specification-document)
