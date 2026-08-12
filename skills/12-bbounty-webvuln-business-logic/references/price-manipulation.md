# Price Manipulation Assessment

## Purpose and Prerequisites

Use when a client can observe or submit monetary, tax, shipping, discount, currency, or product-selection values. Work in a quote, sandbox, or designated test-order flow and never proceed to payment or fulfillment.

## Map Intended Business Rules

Map each calculation stage and its authority: catalog lookup, quantity validation, eligibility, discount ordering, tax, shipping, currency conversion, and finalization. Identify the point at which the server commits an authoritative amount.

## Safe Testing

Use a single low-impact synthetic comparison to determine whether the final server quote is derived from authoritative records. Compare an ordinary path with a documented boundary condition, such as an eligible versus ineligible test promotion. Preserve normal quantities and avoid negative, extreme, or exploit-oriented values.

## Observations and Interpretation

The key question is whether the committed server amount violates the intended rule. Client echoes, draft totals, and cosmetic displays are leads only. Consider price-version changes, currency display conventions, rounding, and asynchronous recalculation.

## False-Positive Controls

- Use the same test account, region, time window, and catalog version for comparisons.
- Confirm that apparent differences are not test-mode, tax-inclusive, or currency-display behavior.
- Stop if an action could charge, reserve, or issue value.

## Evidence

Record the intended formula, authoritative source, safe test context, baseline and comparison server totals, and proof that no transaction completed.

## Remediation

Ignore client-submitted authoritative monetary values. Recalculate server-side immediately before commitment, use immutable price snapshots where needed, and reject inconsistent client context.

## Sources

- [PortSwigger: Excessive trust in client-side controls](https://portswigger.net/web-security/logic-flaws/examples)
- [OWASP: Transaction Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html)
