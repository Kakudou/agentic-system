# Classification And Confidence Matrix

| Observed family | Safe classification | Confidence rises when | Do not infer |
| --- | --- | --- | --- |
| Client-delivered asset | Public release artifact | Target ownership and intended release context are confirmed | Source availability or unintended exposure |
| Source-reference indicator | Potential source-reference exposure | Owner confirms the reference was not intended to be public | Reconstructable source, credentials, or impact |
| Debug or diagnostic indicator | Potential diagnostic artifact exposure | The owner confirms production publication is unintended | Operational access or exploitability |
| Backup or archive indicator | Potential retained artifact exposure | Ownership and unintended public publication are owner-confirmed | Contents, records, or recoverability |
| Build or deployment metadata | Potential deployment-information exposure | Expected release boundary is documented and differs | Environment topology, versions, or vulnerabilities |

Use `low` for incomplete ownership or ambiguous public context, `medium` for a clear visible boundary with unresolved intent, and `high` only after target-owner confirmation. A sensitive-data stop event takes priority over confidence scoring.
