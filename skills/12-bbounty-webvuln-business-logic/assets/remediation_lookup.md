# Business-Logic Remediation Lookup

| Confirmed failure | Primary remediation | Supporting control | Verification target |
|---|---|---|---|
| Server accepts a non-authoritative price or quantity | Recalculate from authoritative server records at finalization | Fixed-precision money, range validation, immutable price snapshot | Server quote remains correct when client context differs |
| Promotion or entitlement eligibility is inconsistent | Enforce eligibility, caps, expiry, and combination rules server-side | Atomic redemption record and idempotency | Ineligible test context cannot obtain a finalized benefit |
| Invalid lifecycle transition persists | Validate transition from persisted current state | Transactional update or optimistic concurrency, idempotency | Separate test object cannot reach prohibited state |
| Required workflow step is not enforced | Store and recheck prerequisite completion at consequential action | Actor/object-bound, expiring workflow token | Later action is denied without required state |
| Client or external context drives a sensitive decision | Resolve decision from an authoritative service-side source | Provenance validation and signed context where appropriate | Safe altered context does not change server decision |
| Cross-record invariant diverges | Centralize enforcement and validate consistency at commit | Reconciliation monitoring and regression tests | Controlled action preserves the stated invariant |

## Remediation Notes

- Fix the decision point on the server, not only the UI or API schema.
- Define rule ownership, exceptions, rounding, and lifecycle semantics explicitly.
- Add regression coverage using isolated test data and safe assertions.
- Monitor rejected invalid transitions and calculation inconsistencies without logging sensitive values.
