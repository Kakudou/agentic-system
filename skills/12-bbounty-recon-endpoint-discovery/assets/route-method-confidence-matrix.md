# Route/Method Confidence Matrix

| Claim | Minimum evidence | Confidence | Do not infer |
| --- | --- | --- | --- |
| Route identity | One redacted, authorized observed request or exact official documentation | Medium | Other paths, hosts, or versions |
| Route and method | Observed request showing both | High | Other methods or method safety |
| Parameter name/type | Observed request or official contract | Medium | Requiredness, accepted values, validation |
| Protocol classification | Protocol-specific request/response evidence or official contract | Medium | Schema completeness or operational access |
| Client artifact correlation | Artifact reference plus matching observed request | Medium | Route liveness for unobserved references |
| Live behavior confirmation | Explicitly approved low-impact action with retained evidence | High | Authorization or vulnerability impact |

Reduce confidence when evidence is stale, third-party, cross-tenant, redirected, contradictory, or lacks a confirmed scope decision.
