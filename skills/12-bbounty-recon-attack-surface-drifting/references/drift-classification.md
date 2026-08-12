# Drift Classification

## Purpose

Classify supported differences between admitted observations without turning change evidence into a vulnerability or ownership claim.

## Preconditions

- Identity-safe comparison records.
- Sufficient source detail to identify the observed field and time for each difference.

## Evidence-Led Method

Use `addition` only when a comparable identity or attribute appears in the comparison evidence and is absent from the admitted baseline evidence. Use `removal` only for the reverse. Use `modification` when the same comparison identity has a supported changed attribute. Use `inconclusive` when coverage, identity, timing, or collection context prevents a reliable classification. State exact observed values and evidence references.

## Interpretation And Attribution Controls

An addition can be a baseline coverage gap; a removal can be a transient failure or collection omission; a modification can be expected deployment variation, personalization, or intermediary behavior. Do not infer exposure, exploitability, ownership transfer, or security impact from classification alone.

## Privacy And Scope Limits

Classify only supplied, authorized records. Do not use a classification as a reason to collect more data, contact an owner, or inspect a related target.

## Evidence And Handoff

Include the classification, observed facts, confounders, confidence, and scope status in the handoff. Route material or ambiguous changes for owner-directed assessment.

## Sources

- [NIST SP 800-137: Information Security Continuous Monitoring](https://csrc.nist.gov/pubs/sp/800/137/final)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
