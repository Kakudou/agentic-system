# Known Behavior And Duplicate Distinction

## Purpose

Differentiate an accepted limitation, documented behavior, or prior finding from a new security finding without collapsing materially distinct issues.

## Preconditions

- Admitted finding claim and evidence are available.
- Applicable program policy, release notes, known issues, or prior-finding records are available, or their absence is recorded.

## Bounded Methodology

1. Compare the claimed security property, affected asset or tenant boundary, preconditions, observed behavior, supported cause, and impact condition.
2. Classify as known behavior only when an authoritative record explicitly covers the same material behavior and boundary.
3. Classify as duplicate only when the prior finding shares the material security property and causal path, with evidence supporting the same remediation unit.
4. Keep findings separate when a different asset boundary, precondition, cause, or impact condition changes risk or remediation.

## Observation Interpretation

The same endpoint, component, or vulnerability label is a lead for comparison, not a duplicate decision. A policy exclusion is not evidence that behavior is safe; it defines reporting treatment. A partial match should be `needs-review`.

## False-Positive, Bias, And Scope Controls

- Prefer authoritative program records over informal summaries or issue titles.
- Do not suppress a finding because it resembles a familiar issue.
- Do not disclose restricted prior-finding details outside the authorized recipient group.

## Evidence And Handoff

Record the compared record reference, matching and distinguishing facts, decision, and unresolved differences. Handoff partial matches for authorized triage rather than merging them by assumption.

## Sources

- [ISO/IEC 29147:2018 Vulnerability Disclosure](https://www.iso.org/standard/72311.html)
- [FIRST Vulnerability Coordination Maturity Model](https://www.first.org/global/sigs/vulnerability-coordination/maturity-model)
