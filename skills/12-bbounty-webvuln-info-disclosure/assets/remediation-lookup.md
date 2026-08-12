# Remediation Lookup

| Observation category | Primary remediation boundary | Safe validation marker |
| --- | --- | --- |
| Excess response metadata | Response construction and public header policy | Unnecessary marker absent or generalized |
| Verbose error context | Production error handling and protected logging | Generic user-facing error only |
| Linked client artifact exposure | Build and deployment packaging | Original linked asset excludes private content |
| Sensitive response field | Data minimization and audience authorization | Field absent for the original audience |

Use the smallest corrective boundary that removes the exposure without degrading the intended user flow.
