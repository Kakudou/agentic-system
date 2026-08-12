# Comparable Baseline Definition

## Purpose

Decide whether a supplied observation can serve as a defensible baseline for one authorized differential assessment.

## Preconditions

- Written scope and handling constraints.
- A stated security property and supplied observation provenance.

## Low-Impact Methodology

Preserve the observation's source reference, collection time, target boundary, account or role context where permitted, declared method, and redaction status. Define the expected normal outcome and the fields that are meaningful for the property. A baseline is a point-in-time record, not proof of completeness, ownership, or security.

## Interpretation And Uncertainty

Treat two observations as comparable only when their target, authorization context, environment, and collection conditions are known well enough to explain a difference. Missing context is a limitation, not a fact to infer.

## False-Positive And Scope Controls

Do not equate similarly named hosts, routes, accounts, tenants, or deployments. Exclude evidence outside authorization or containing unapproved sensitive material; escalate ambiguous ownership or provenance.

## Evidence And Handoff

Record admitted and excluded evidence, comparability decisions, missing conditions, and the owner question. Use `assets/baseline-variation-worksheet.md` for the packet.

## Sources

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [NIST SP 800-53 Rev. 5, CM-8](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)
