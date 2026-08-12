# Path-Handling Decision Matrix

Use only after scope, marker ownership, and a baseline request are recorded.

| Decision | Evidence to collect | Permitted next action | Stop condition | Reference |
|---|---|---|---|---|
| Does the input select or construct a path? | Feature description, input location, normal response | Establish marker baseline | Sink is out of scope or unclear | [Basic traversal](../references/basic-traversal.md) |
| Is the marker response stable? | Status, content type, length, marker indicator | Compare one property | Non-marker content or unstable handler | [Marker test cases](../references/traversal-payloads.md) |
| Where might representation change? | Raw representation and response difference | Isolate one decode/normalization boundary | Ambiguous result or rate limit | [Normalization](../references/normalization.md) |
| Does platform behavior matter? | Program-provided platform context, feature semantics | Test one supported marker representation | Need to create links, archives, or files without permission | [Platform paths](../references/platform-paths.md) |
| Did only the authorized marker cross an intended boundary? | Repeatable marker-only result | Preserve sanitized evidence and report | Any sensitive or unrelated data appears | [Path-handling test techniques](../references/traversal-techniques.md) |
| Is a fix being validated? | Expected base, final resolved marker location | Run regression fixture | Final containment cannot be verified | [Prevention and validation](../references/prevention-validation.md) |
