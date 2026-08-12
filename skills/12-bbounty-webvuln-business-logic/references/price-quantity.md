# Price and Quantity Assessment

## Purpose and Prerequisites

Use when a workflow calculates totals from products, quantities, taxes, shipping, currencies, or thresholds. Confirm authorization, use synthetic catalog items or test-mode data, and stop before any charge, fulfillment, credit grant, or inventory commitment.

## Map Intended Business Rules

Document the authoritative source for each value: catalog price, quantity limit, tax rule, shipping threshold, exchange-rate timestamp, rounding policy, and entitlement. State the expected equation in plain language, such as `server total = server catalog price x permitted quantity + applicable charges - permitted discounts`.

## Safe Testing

Compare a normal cart or quote with one bounded synthetic variation at a documented threshold. Verify whether the server recalculates values rather than trusting a displayed or client-supplied value. Test only designated accounts, products, and reversible quote or test-order states.

## Observations and Interpretation

A client field being present is not a finding. Evidence is stronger when a server-confirmed quote or test order contradicts the documented calculation. Distinguish display rounding from the stored amount, and account for tax jurisdiction, price schedules, cached catalog data, and promotion timing.

## False-Positive Controls

- Confirm the currency, tax region, customer tier, and price-effective time are identical.
- Check published rounding and threshold semantics before comparing values.
- Do not infer a flaw from client-side totals when the final server quote is correct.

## Evidence

Capture the rule source, synthetic item identifiers, baseline and comparison inputs, server-confirmed totals, calculation notes, and cleanup status. Redact account and session material.

## Remediation

Derive prices, quantities, tax, shipping, currency rates, and final totals server-side from authoritative data. Use fixed-precision monetary types, explicit rounding rules, and server-side quantity and eligibility validation.

## Sources

- [PortSwigger: Business logic vulnerabilities](https://portswigger.net/web-security/logic-flaws)
- [OWASP: Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
