# Non-Exploitative Prioritization Rationale

## Purpose

Set a transparent order for human review of authorized surface records without forecasting security outcomes.

## Preconditions

- Entries are in scope and supported by admissible evidence.
- The review objective, capacity constraint, and receiving owner are known.

## Evidence-Led Methodology

Assign `now`, `next`, or `hold` by recording four bounded considerations: closeness to the stated review objective, strength and freshness of evidence, clarity of operational ownership, and whether an ambiguity blocks a responsible decision. Explain the choice in plain language using the [prioritization worksheet](../assets/prioritization-worksheet.md). A `hold` entry remains evidence, not a dismissal.

## Interpretation

Review order expresses allocation of authorized analyst attention. It is not a severity rating, vulnerability probability, reward estimate, exploit queue, or direction to interact with a system.

## Bias And False-Positive Controls

- Do not elevate an entry because of technology labels, public reputation, market value, or assumed defect patterns.
- Apply the same considerations to every entry and preserve ties rather than inventing precision.
- Have a second reviewer challenge entries moved to `now` when the evidence is indirect or stale.

## Privacy And Scope Limits

Prioritization uses retained evidence only. It does not authorize discovery, validation, exploitation, automation, or collection of personal or sensitive data.

## Evidence And Handoff

Hand off the order, stated considerations, evidence references, uncertainty, entries on hold, and the owner decision or authorization needed before any later work.

## Sources

- NIST, [SP 800-30 Rev. 1: Guide for Conducting Risk Assessments](https://csrc.nist.gov/pubs/sp/800/30/r1/final)
- FIRST, [CVSS v4.0 Specification](https://www.first.org/cvss/v4-0/)
