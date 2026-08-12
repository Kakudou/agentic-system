# Flow/State Confidence Matrix

| Observation | Evidence minimum | Confidence | Interpretation boundary | Required handoff |
| --- | --- | --- | --- | --- |
| Visible journey label and link | Redacted page context and time | High | Describes presentation, not backend behavior | Journey row |
| Displayed provider or MFA method | Exact displayed label | Medium | Does not prove enabled configuration | Provider/method note |
| Supplied-account UI state | Approved account class and redacted context | Medium | Does not establish other roles or tenants | Account-bound observation |
| Artifact category | Host, category, and redacted attributes | Low to medium | Does not establish security properties | State classification |
| Redirect or external boundary | Source, destination host category, and time | High | Does not authorize traversal | Scope question or stop event |

Use `not observed` for unavailable journeys. Use `unclear` when labels or ownership conflict. Never raise confidence by guessing endpoints, submitting data, or inspecting artifact values.
