# Evidence and Stop Checklist

## Before Recording a Finding

- [ ] Authorization, target, route, role, and time window are recorded.
- [ ] A normal-use baseline exists.
- [ ] The observation was reproduced without altered input or state change.
- [ ] Browser/environment and response metadata are recorded.
- [ ] Cache, CDN, role, locale, and feature-flag variation were considered.
- [ ] Sensitive values are redacted or excluded.
- [ ] The security consequence is stated as evidence-supported or conditional.

## Stop and Escalate

- [ ] Scope, method permission, or ownership is unclear.
- [ ] Further checking requires crafted input, automation, state change, elevated access, or broader discovery.
- [ ] Unexpected sensitive data, active compromise, user impact, or rate-limit warnings appear.
- [ ] A production change or third-party interaction would be required.

## Report Closure

- [ ] Evidence supports the claimed route and context.
- [ ] Limitations and untested conditions are explicit.
- [ ] Remediation identifies the desired property and responsible layer.
- [ ] A benign regression check is proposed.
