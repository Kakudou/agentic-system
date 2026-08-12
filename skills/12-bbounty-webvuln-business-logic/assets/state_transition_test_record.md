# State-Transition Test Record

Use one record per controlled state or workflow comparison. Do not use it to plan parallel or consuming tests.

| Field | Record |
|---|---|
| Record ID | `ST-TEST-001` |
| Rule source | Test lifecycle documentation, section 2 |
| Test actor and role | Designated test approver |
| Test object | Isolated sample request |
| Starting server-confirmed state | `draft` |
| Required preconditions | Test approval recorded |
| Attempted transition | `draft` to `submitted` |
| Expected outcome | Accepted only after required preconditions |
| Safe comparison | Separate test object lacking one documented prerequisite |
| Observed server outcome | Record response and persisted state |
| Side-effect check | No notification, charge, fulfillment, or entitlement created |
| Alternative explanations checked | Async processing, role exception, feature flag |
| Cleanup status | `not_applicable`, `restored`, or `pending` |
| Evidence references | `EV-001`, `EV-002` |
| Disposition | `confirmed`, `explained`, or `inconclusive` |

## Review Checks

- [ ] Starting state came from an authoritative server view.
- [ ] The expected transition rule is sourced.
- [ ] The comparison used a separate, designated test object.
- [ ] No irreversible or value-bearing effect occurred.
- [ ] Final state and cleanup were verified.
