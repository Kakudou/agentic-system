# Engine and Context Classification Worksheet

Use this static worksheet before and during inert assessment. Do not record sensitive response content.

| Field | Record |
|---|---|
| Authorization reference and expiry | |
| Target, route, method, and input | |
| Test account role | |
| Rate limit / test window | |
| Baseline correlation token | |
| Plain-text control outcome | absent / rejected / literal / escaped / transformed / stored |
| Response renderer | server / client / mixed / unknown |
| Output context | HTML text / attribute / URL / JavaScript / email / document / unknown |
| Encoding observed | none / context-aware / normalized / unknown |
| Syntax-family marker class | delimiter-only / none |
| Server response signal | literal / escaped / parser-like error / marker-specific change / inconclusive |
| Engine confidence | none / low / medium |
| Alternative explanation | cache / WAF / validation / client transform / other |
| Decision | stop / validate once / report inconclusive / report confirmed inert interpretation |
| Evidence IDs and redaction status | |

## Classification Rules

- Never classify a specific engine from a single response.
- A delimiter-only marker is evidence of a parser boundary only when a matched plain-text control rules out ordinary transformation.
- Any data disclosure, state change, rate-limit response, or instability overrides classification: stop and follow the incident/reporting policy.
- This worksheet permits no capability testing, context enumeration, file access, environment access, object traversal, or code execution.
