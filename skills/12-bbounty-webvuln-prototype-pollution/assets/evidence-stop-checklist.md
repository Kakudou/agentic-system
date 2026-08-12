# Evidence And Stop Checklist

## Before Observation

- [ ] Target, route, account, and active-testing permission are in scope.
- [ ] Normal baseline and rollback or isolation plan are recorded.
- [ ] Rate limits, sensitive-data rules, and escalation contact are known.

## Evidence Quality

- [ ] Source, parser/merge boundary, and consumer are separately identified.
- [ ] Baseline and observation are timestamped and redacted.
- [ ] Client/server classification and false-positive controls are recorded.
- [ ] Observed facts are separated from hypotheses and untested impact.

## Stop Immediately

- [ ] Unexpected mutation, persistence, shared-state influence, or performance degradation occurs.
- [ ] Testing would require unsafe property names, data access, execution, privileged action, or cross-user activity.
- [ ] Sensitive data appears outside the agreed evidence process.
- [ ] Scope, authorization, or reproducibility is unclear.

## Closeout

- [ ] Remove permitted test data through normal application controls.
- [ ] Preserve only required redacted evidence.
- [ ] Provide boundary-specific remediation and safe regression criteria.
