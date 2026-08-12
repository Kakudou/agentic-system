# Claimability-Confidence Matrix

| Evidence state | Allowed interpretation | Claimability confidence | Required action |
| --- | --- | --- | --- |
| No admitted evidence or out-of-scope target | No assessment | none | Stop and clarify scope. |
| One stale, unavailable, or provider-branded observation | Lifecycle concern only | none | Record alternatives; hand off for owner validation. |
| Corroborated in-scope relationship and owner inventory conflict | Likely stale mapping | low | Request internal DNS and service review. |
| Corroborated relationship plus owner-confirmed decommissioning | Orphaned delegation concern | medium | Owner validates account state and remediates. |
| Any state without owner-side control-plane confirmation | Never confirm resource availability | none | Do not claim, register, or test takeover. |
