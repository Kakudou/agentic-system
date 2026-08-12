# Identity-Binding Confidence Matrix

| Confidence | Required evidence | Interpretation | Permitted conclusion |
| --- | --- | --- | --- |
| High | Documented policy, approved server-side evidence, and designated-account result agree | Binding is evidenced for the tested boundary | Pass or confirmed concern for that exact boundary |
| Medium | Documented policy plus redacted normal-flow or configuration evidence | Binding appears consistent but server decision is not observed | Observation only; request controlled validation |
| Low | UI, redirect, incomplete metadata, or ambiguous identifier only | Multiple explanations remain | Inconclusive; do not infer impact |

Never use this matrix to generalize across providers, tenants, accounts, or environments.
