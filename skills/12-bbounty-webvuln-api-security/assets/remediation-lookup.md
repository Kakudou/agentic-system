# Remediation Lookup

| Observation class | Primary prevention | Regression expectation |
|---|---|---|
| Undocumented or unmanaged version | Version inventory, owner, lifecycle, retirement control | Only approved versions route and enforce current controls |
| Authentication gap | Server-side authentication for every protected operation | Unauthenticated and invalid sessions are denied consistently |
| Object authorization gap | Server-side ownership or policy check, deny by default | Each role-object pair receives its documented decision |
| Property visibility or mutability gap | Response projection and writable-field allowlist | Each role sees and changes only documented properties |
| Function authorization gap | Server-side action policy | Privileged actions are denied outside approved roles |
| Contract validation gap | Strict schema, type, format, range, and unknown-field rejection | Invalid or unapproved input is safely rejected without state change |
| Excessive resource behavior | Request bounds, pagination controls, quotas, and rate limits | Documented limits hold under approved low-impact checks |

Validate remediation in the deployed API version with the same approved role-object-action coverage row that established the observation.
