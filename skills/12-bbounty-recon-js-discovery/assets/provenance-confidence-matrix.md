# Provenance and Confidence Matrix

| Provenance | Permitted claim | Confidence | Required control |
|---|---|---|---|
| Browser delivered during authorized navigation | Artifact was delivered in this session | observed | Record source page, origin, timestamp, and session limits |
| Redacted browser-network record tied to a visible action | That request or label was observed for that action | corroborated when independently repeated passively | Preserve action linkage; do not replay or alter it |
| Target documentation | Target documents the stated behavior | documented | Record publication date and scope uncertainty |
| Artifact string or build metadata alone | A label or reference is present | inconclusive | Do not claim route availability, ownership, or configuration state |
| Conflicting, third-party, cached, or out-of-scope evidence | No reliable conclusion | needs-review | Stop expansion and request guidance |
