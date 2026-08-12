# Business-Logic Assessment Cheatsheet

## Decision Guide

| If the decision depends on... | Read | Record |
|---|---|---|
| Server-calculated price, quantity, tax, shipping, or currency | [Price and quantity assessment](../references/price-quantity.md) | Intended formula and server quote |
| Promotion, test credit, entitlement, or usage cap | [Coupons and credits assessment](../references/coupons-credits.md) | Eligibility and non-consumption proof |
| Object lifecycle or approval state | [State-machine assessment](../references/state-machine.md) | Transition record |
| Ordered screens or API steps | [Workflow-bypass assessment](../references/workflow-bypass.md) | Required step and final state |
| Client or external context influences a decision | [Trust-boundary assessment](../references/trust-boundaries.md) | Data source and authority |
| A property must always remain true | [Invariant-testing assessment](../references/invariant-testing.md) | Assertion and before/after result |
| Intent is uncertain | [Logic puzzles](../references/logic-puzzles.md) | Hypothesis and disposition |

## Safe Operating Rules

- Confirm written scope and stop conditions before testing.
- Use designated accounts, isolated objects, and synthetic or test-mode data.
- Prefer server-side quotes, previews, and reversible transitions.
- Change one condition at a time and preserve a normal baseline.
- Stop before payment, fulfillment, payout, credit consumption, scarce inventory reservation, or privilege change.
- Do not use automated replay, concurrency, or race techniques without explicit authorization.

## Finding Threshold

A reportable result needs an intended rule, a controlled comparison, a reproducible server-side contradiction, a credible impact explanation without realized abuse, and cleanup confirmation. UI differences, client fields, and status codes alone are leads.

## Core Sources

- [PortSwigger: Business logic vulnerabilities](https://portswigger.net/web-security/logic-flaws)
- [OWASP: Transaction Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html)
