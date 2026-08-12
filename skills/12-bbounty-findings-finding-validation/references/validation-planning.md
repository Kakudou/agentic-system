# Validation Planning

## Purpose

Set a narrow documentation plan before interpreting a captured finding. The plan defines claims to assess, evidence needed, stop conditions, and the recipient decision; it never directs active verification.

## Preconditions

- Admitted evidence and an authorization reference.
- A finding identifier or stable source-record reference.
- Known program constraints and a named recipient.

## Bounded Documentation Method

1. State the candidate observation in one neutral sentence using only supplied facts.
2. List the minimum claims that need review: asset association, observed behavior, reproducibility record, and bounded consequence.
3. Attach existing evidence IDs to each claim and identify missing or conflicting evidence.
4. Select one decision: hand off for authorized review, hold pending clarification, or close as unsupported, out of scope, duplicate, or known behavior.
5. Set stop conditions for new sensitive data, scope uncertainty, third-party impact, or any need for active testing.

## Interpretation And Uncertainty

Planning is not validation. A complete plan may conclude that the record cannot support a claim. Use "not established" instead of converting an absent record into a negative result.

## False-Positive And Privacy Controls

- Do not expand the claim to related routes, accounts, tenants, or environments without evidence.
- Do not use a vulnerability category as evidence of mechanism or impact.
- Reference protected artifacts by ID and approved location rather than reproducing their contents.

## Evidence And Handoff

Attach the plan to the worksheet and name the owner for each unresolved question. Handoff must preserve the plan boundary so the recipient can authorize any later work explicitly.

## Sources

- [NIST SP 800-115](https://csrc.nist.gov/pubs/sp/800/115/final)
- [OWASP Vulnerability Management Guide](https://owasp.org/www-project-vulnerability-management-guide/)
