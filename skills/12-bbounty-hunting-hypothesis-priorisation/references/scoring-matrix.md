# Review-Order Indicators

## Purpose

Compare admitted hypotheses consistently without converting incomplete evidence into a score, probability, severity, or predicted outcome.

## Preconditions

- The hypothesis is within written authorization.
- Each observation has a source, locator, and capture time.
- The reviewer can distinguish observed facts from assumptions.

## Evidence-Led Method

For each hypothesis, record these qualitative indicators:

| Indicator | Evidence question | Review-order effect |
|---|---|---|
| Scope clarity | Is the asset and proposed activity explicitly allowed? | Unclear scope means defer or exclude. |
| Observation specificity | Does evidence identify a concrete asset, feature, or behavior? | Specific, recent observations support earlier review. |
| Test safety | Can a planning owner define a bounded, reversible check? | Unbounded or disruptive work moves to defer. |
| Verification path | Is there a non-invasive way to distinguish support from contradiction? | A clear path supports earlier review. |
| Dependency clarity | Are required accounts, states, or approvals known? | Unknown dependencies require an uncertainty note. |

Use the worksheet to place items in `first`, `next`, `defer`, or `exclude`. These labels are a transparent work sequence, not a claim about exploitability, impact, or report outcome.

## Interpretation And Controls

- Do not infer an indicator from a vulnerability label, framework, target popularity, or anecdote.
- Treat absent, stale, or contradictory evidence as unknown rather than negative or positive evidence.
- Ask a second reviewer to inspect ties and any item promoted on a single observation.
- Revisit the order when scope or source evidence changes.

## Scope And Privacy

Do not collect or preserve credentials, personal data, secrets, unpublished reports, or out-of-scope observations merely to improve ordering. Keep evidence references minimal and follow the program's data-handling rules.

## Evidence And Handoff

Provide the completed indicator rows, source references, assumptions, and unresolved questions to the planning owner.

## Sources

- [NIST SP 800-115, Technical Guide to Information Security Testing and Assessment](https://csrc.nist.gov/pubs/sp/800/115/final)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
