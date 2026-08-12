# Similarity And Attribution Uncertainty

## Purpose And Preconditions

Use when admitted sources appear related to the documented subject. Require at least one attributable source and enough non-sensitive context to state the compared characteristic without recreating technical details.

## Documentation Methodology

List shared and materially different characteristics separately, such as affected product boundary, reported behavior, publication period, or stated remediation. Attribute a statement only to its source. Rate confidence from source quality and specificity, not a numeric similarity score. Use `supported`, `partial`, `unknown`, or `withheld` for attribution.

## Uncertainty And Privacy Controls

Similarity does not prove identical root cause, reporter identity, report priority, duplicate status, exploitability, impact, or reward eligibility. Avoid matching on secrets, private report text, customer data, or distinctive reproduction details. Withhold attribution where it could identify a reporter or violate an embargo.

## Evidence And Handoff

Complete the [source/confidence matrix](../assets/source-confidence-matrix.md) with each observation, difference, limitation, and confidence rationale. Hand off qualified observations, never a duplicate verdict.

## Responsible-Disclosure Sources

- [CERT Guide to Coordinated Vulnerability Disclosure](https://insights.sei.cmu.edu/library/the-cert-guide-to-coordinated-vulnerability-disclosure/)
- [FIRST Vulnerability Coordination Maturity Model](https://www.first.org/global/sigs/vulnerability-coordination/maturity-model/)
