# Message-Framing Remediation Lookup

| Finding boundary | Remediation | Verification evidence |
| --- | --- | --- |
| HTTP/1 intermediary/origin disagreement | Reject ambiguous length metadata at the first hop; normalize exactly once; close affected connections on malformed framing. | Configuration review plus controlled regression showing consistent reject behavior. |
| Duplicate or conflicting length metadata accepted | Reject the request before routing; do not select a preferred value. | Gateway logs and regression result for rejected ambiguity. |
| Transfer-coding disagreement | Disable unsupported transfer codings or enforce one parser policy across hops. | Versioned configuration and controlled negative test result. |
| HTTP/2 downgrade mismatch | Preserve validated request boundaries during translation; reject forbidden HTTP/2 framing metadata rather than synthesizing ambiguous HTTP/1. | Gateway translation review and controlled H2/H1 consistency result. |
| Unknown ownership or inconsistent intermediaries | Simplify the chain, document ownership, and align patch/configuration rollout. | Current architecture map and owner sign-off. |

Retest only in an authorized controlled environment. Record version, owner, deployment time, and baseline/control result.
