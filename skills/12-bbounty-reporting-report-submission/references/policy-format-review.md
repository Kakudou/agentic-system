# Policy and Format Review

## Purpose

Map an admitted report to reporting rules supplied for the current program or platform. It does not browse for rules, use APIs, fill a platform form, or invent requirements.

## Preconditions

- Admitted report and evidence references.
- Supplied rule source with locator, retrieval date, and applicable program or platform.
- Named reviewer for unresolved requirements.

## Documentation Process

1. Extract only explicit requirements from the supplied rules: required sections, permitted evidence types, disclosure restrictions, and any required acknowledgements.
2. Map each requirement to an existing report section or evidence reference in the [policy/format confidence matrix](../assets/policy-format-confidence-matrix.md).
3. Label each mapping `confirmed`, `partial`, `unknown`, or `conflicting`. Preserve the source locator for every `confirmed` mapping.
4. Use neutral section labels where rules do not prescribe wording. Do not add ratings, payout claims, platform field names, or procedural assertions.
5. Treat `partial`, `unknown`, and `conflicting` entries as readiness blockers until an authorized reviewer resolves them.

## Uncertainty and Privacy Controls

- Supplied rules may be stale or incomplete; record that limitation rather than treating them as current.
- Do not place private program terms or sensitive report content in reusable documentation.
- Never transform a rule gap into a guess or a submission instruction.

## Evidence and Handoff

Hand off the completed matrix, source references, unresolved questions, and a clear `passed` or `blockers-present` decision.

## Sources

- [HackerOne: Code of Conduct](https://www.hackerone.com/policies/code-of-conduct)
- [Intigriti: Responsible Disclosure](https://www.intigriti.com/researchers/ethical-hacking/what-is-responsible-disclosure)
- [ISO/IEC 29147 overview](https://www.iso.org/standard/72311.html)
