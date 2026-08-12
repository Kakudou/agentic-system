# Prevention And Owner Handoff

## Purpose And Preconditions

Use after an authorized evidence review identifies a confirmed or suspected unsafe deserialization boundary.

## Inert Bounded Methodology

Describe the input, trust source, parser, control gap, confidence, and redacted evidence locator. Recommend a data-only contract, fixed schema, explicit types, and validation before binding. Assign remediation ownership and retest evidence.

## Observations And Interpretation

The primary fix is removing unsafe object restoration at trust boundaries. Signatures and dependency updates are defense-in-depth, not substitutes for constrained parsing.

## False-Positive Controls

Avoid generic version-only recommendations. Confirm compatibility, producer ownership, and migration constraints with the application owner.

## Evidence And Remediation

Use the remediation lookup. Close only when the owner provides evidence that the affected boundary no longer accepts untrusted runtime type selection and the replacement is covered by tests or review.

Source: [PortSwigger: Insecure deserialization](https://portswigger.net/web-security/deserialization)
