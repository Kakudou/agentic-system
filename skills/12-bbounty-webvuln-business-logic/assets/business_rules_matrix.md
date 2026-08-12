# Rule-to-Test Coverage Matrix

Use this record to map a rule before testing. Add only rules supported by documentation, a normal server-confirmed flow, or an owner clarification. Synthetic examples illustrate structure only.

| Rule ID | Rule source | Actor / object | Preconditions | Expected server outcome | Safe comparison | Evidence ID | Status |
|---|---|---|---|---|---|---|---|
| BR-001 | Test catalog policy | Test shopper / sample item | Eligible test account | Server quote uses catalog amount | Eligible versus ineligible test promotion preview | EV-001 | planned |
| BR-002 | Test workflow diagram | Test requester / sample request | Approval absent | Final action is denied | Normal approved path versus isolated unapproved test object | EV-002 | planned |
| BR-003 | Test lifecycle spec | Test operator / sample order | State is `draft` | Only permitted next state is accepted | Normal transition versus one reversible invalid transition | EV-003 | planned |

## Field Guidance

- **Rule source:** cite a document section, normal server-confirmed baseline, or named owner clarification.
- **Actor / object:** use only designated test identities and objects.
- **Safe comparison:** change one bounded condition without seeking value, access, or fulfillment.
- **Status:** use `planned`, `confirmed`, `explained`, or `inconclusive`.

## Coverage Review

- [ ] Each consequential rule has an authoritative source.
- [ ] Actor, object, role, and state conditions are explicit.
- [ ] A safe baseline and comparison are defined.
- [ ] Exceptions and asynchronous behavior are noted.
- [ ] Confirmed results link to evidence and remediation.
