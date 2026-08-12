# Trust-Boundary Mapping

## Purpose

Describe evidence-supported crossings between components, identities, data classifications, or administrative domains so a reviewer can see where assumptions need validation.

## Preconditions

- A surface-model record identifies the observed endpoints or components.
- Evidence supports the crossing, or the relationship is explicitly labelled unconfirmed.

## Method

1. Define a boundary by the observed change in trust context, such as user to application, application to dependency, or one administrative domain to another.
2. Record source, destination, direction, observed identity context, data classification if known, and evidence IDs.
3. Mark controls, authorization state, encryption state, and data handling as observed only when directly evidenced; otherwise mark unknown.
4. Identify the validation question a recipient would need answered, without directing active verification.

## Interpretation

A boundary is a modeling aid, not proof that traffic flows, controls fail, or data is exposed. Unknown control state is not evidence of missing controls.

## False-Positive And Attribution Controls

- Do not convert co-location, DNS association, or a vendor name into a data flow.
- Do not infer a privilege transition from a route name or generic identity label.
- Keep alternate relationship explanations beside the boundary when evidence is ambiguous.

## Privacy And Scope Limits

Use data classes and minimal descriptors instead of values. Exclude credentials, tokens, personal data, and partner details unless their handling is expressly authorized.

## Evidence And Handoff

Put each boundary in the worksheet with its evidence, confidence, unresolved assumptions, and recipient validation question.

## Sources

- [NIST SP 800-154, Guide to Data-Centric System Threat Modeling](https://csrc.nist.gov/pubs/sp/800/154/ipd)
- [OWASP Threat Modeling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html)
