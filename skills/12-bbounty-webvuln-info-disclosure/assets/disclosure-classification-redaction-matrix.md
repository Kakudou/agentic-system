# Disclosure Classification and Redaction Matrix

| Classification | Decision marker | Handling | Report evidence |
| --- | --- | --- | --- |
| Informational | Intended public detail with no material security consequence | Record only if useful context | Structural description |
| Implementation detail | Non-public component, topology, or diagnostic detail without direct sensitive content | Assess plausible impact and controls | Redacted marker and context |
| Sensitive exposure | Secret, personal data, private source, or non-public customer/operational content | Stop immediately and use incident path | Category placeholder only |

Redaction format: `[REDACTED: credential|token|personal-data|private-source|configuration|other]`.
