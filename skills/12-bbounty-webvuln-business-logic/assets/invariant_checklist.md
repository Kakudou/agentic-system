# Invariant Checklist

Select only applicable assertions and state the source and exceptions. These examples use synthetic data and are not test instructions.

## Calculation and Entitlement

- [ ] Server quote is derived from an authoritative catalog or policy source.
- [ ] Quantity stays within the documented permitted range.
- [ ] Discounts, tax, shipping, and currency use documented ordering and rounding.
- [ ] An entitlement is granted only when its documented eligibility is satisfied.
- [ ] A test credit, coupon, or trial has the documented cap and expiry behavior.

## State and Workflow

- [ ] A consequential state change has all documented prerequisites.
- [ ] Terminal states cannot be reversed except through a documented recovery path.
- [ ] Repeating a completed non-consuming step does not create an extra server-side effect.
- [ ] Final actions recheck server-side workflow completion.

## Trust and Consistency

- [ ] Sensitive decisions use authoritative server-side data, not client assertion.
- [ ] Related records agree after the defined consistency window.
- [ ] Exceptions are explicit, scoped, and authorized.

## Evidence Note

For every selected item, record: source, test object, baseline, one controlled variation, server-confirmed result, exception check, and cleanup status.
