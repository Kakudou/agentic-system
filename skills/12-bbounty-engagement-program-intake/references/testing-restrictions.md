# Authorization Restrictions

## Purpose

Identify the boundary between explicitly authorized activity and prohibited or conditional activity.

## Preconditions

- A source-traceable scope inventory exists.
- Restrictions are read from the same current source set as scope where possible.

## Documentation Methodology

1. Extract restrictions on availability, authentication, automation, social engineering, physical access, third parties, and data handling.
2. Capture all conditions: account type, rate or volume limits, test windows, notification requirements, and authorization letters.
3. Classify each statement as `authorized`, `prohibited`, `conditional`, or `not stated`.
4. Link each classification to a verbatim source excerpt; retain negations and exceptions.

## Interpretation And Uncertainty Controls

- Explicit prohibition prevails over a broad scope entry.
- Safe harbor language does not authorize actions that a rule separately prohibits.
- `Not stated` means no authorization was established.
- Do not infer permission from historical practice, platform defaults, or another program's policy.

## Evidence And Handoff

State a stop condition for every prohibited or conditional category. Escalate conflicts between scope and restrictions before downstream work begins.

## Concise Sources

- Program rules and linked legal terms are primary.
- US Department of Justice, "A Framework for a Vulnerability Disclosure Program": <https://www.justice.gov/criminal/criminal-ccips/page/file/983996/dl>
- CISA, "Vulnerability Disclosure Policy Template": <https://www.cisa.gov/vulnerability-disclosure-policy-template>
