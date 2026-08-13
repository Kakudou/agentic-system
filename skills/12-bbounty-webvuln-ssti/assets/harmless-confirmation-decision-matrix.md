# Harmless Confirmation Decision Matrix

| Condition | Permitted action | Interpretation | Next step |
|---|---|---|---|
| No explicit authorization | Do not test | Out of scope | Obtain written permission |
| Input is not server-rendered | Plain-text mapping only | SSTI not supported by this route | Stop and record that another assessment category may be relevant |
| Plain-text sentinel is rejected | Record validation behavior | No parser conclusion | Stop unless owner supplies a safe test path |
| Sentinel reflects literally | One delimiter-only marker, if policy permits | Baseline established | Compare to matched control |
| Marker reflects literally or is encoded | No further marker variation | No interpretation evidence | Report inconclusive or no finding |
| Marker-specific parser-like error | Repeat once with plain-text control | Suspected boundary only | Validate, then stop |
| Stable marker-specific server-side change | Do not test capabilities | Confirmed inert interpretation | Collect evidence and report |
| Sensitive output, state change, instability, WAF block, or throttling | Stop immediately | Safety or reliability boundary reached | Redact and notify per program policy |

## Approved Marker Constraints

- A marker may contain only delimiter-shaped punctuation plus a unique correlation token.
- It must contain no expression, identifier, variable, property, helper, filter, method, directive, operation, quote-breaking sequence, or control structure.
- Send no more than one marker class and one validation repeat for an input location.
- Never use this matrix to develop a payload or infer template capabilities.
