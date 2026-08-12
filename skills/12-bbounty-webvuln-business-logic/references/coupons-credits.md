# Coupons and Credits Assessment

## Purpose and Prerequisites

Use when promotions, loyalty credits, gift balances, referrals, trials, or account entitlements alter an outcome. Use only designated test promotions or non-redeeming previews, and obtain explicit approval before any action that could consume a code or balance.

## Map Intended Business Rules

Record eligibility, scope, expiry, single-use semantics, combinations, priority, cap, and reversal behavior. Identify whether the rule applies to an account, order, item, tenant, or campaign and where the server records redemption.

## Safe Testing

Compare documented eligible and ineligible synthetic scenarios in preview, quote, or test mode. Check whether the server consistently applies its own eligibility and cap rules after cart or account context changes. Never seek a financial benefit, redeem a real credit, or repeat a consuming action.

## Observations and Interpretation

A coupon appearing in a UI is not proof of redemption. Confirm the server-side quote, entitlement ledger in test mode, or controlled order state. An unexpected discount can be legitimate due to campaign priority, customer segment, or inclusive pricing.

## False-Positive Controls

- Verify code status, campaign dates, account tier, item exclusions, and test environment configuration.
- Distinguish preview calculations from finalized server-side application.
- Confirm that a test code was not intentionally reusable or automatically replaced by a better offer.

## Evidence

Capture the rule source, test-code authorization, eligibility context, baseline and comparison server outcomes, and confirmation that no real value was consumed.

## Remediation

Enforce eligibility, usage count, combination policy, caps, and expiration atomically on the server. Bind redemptions to an authoritative account and transaction record, and re-evaluate them when relevant order context changes.

## Sources

- [PortSwigger: Business logic vulnerabilities](https://portswigger.net/web-security/logic-flaws)
- [OWASP: Transaction Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html)
