# Confirmation and Stop Checklist

## Before Assessment

- [ ] Written authorization identifies hosts, versions, operations, roles, test objects, limits, window, and stop contact.
- [ ] Dedicated test accounts and objects are available.
- [ ] The selected operation is in the supplied inventory.
- [ ] The proposed request is single, manual, bounded, and reversible.

## Before Confirmation

- [ ] A known-good baseline exists.
- [ ] The variation differs in one approved, contract-relevant way.
- [ ] No non-test object, privilege change, destructive action, or bulk activity is involved.
- [ ] Evidence is redacted and limited to required metadata.

## Stop Immediately

- [ ] Sensitive or non-test data appears.
- [ ] Any persistent or unexpected state change occurs.
- [ ] Rate limits, elevated errors, instability, or scope uncertainty occurs.
- [ ] Confirmation would require guessing endpoints or fields, enumeration, extraction, privilege changes, or automation.

On any stop condition: preserve minimal redacted evidence, cease requests, and notify the designated contact.
