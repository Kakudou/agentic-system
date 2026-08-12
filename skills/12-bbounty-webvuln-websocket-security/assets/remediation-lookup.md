# WebSocket Remediation Lookup

## Use

Map a demonstrated observation to the narrowest relevant server-side improvement. Validate fixes with the same authorized, harmless normal-flow observation.

| Observed control gap | Primary remediation | Supporting controls | Validation evidence |
|---|---|---|---|
| Plain `ws` transport where sensitive authenticated use is expected | Require `wss` and redirect or disable insecure endpoints | HSTS for HTTPS site, secure cookie policy | Sanitized endpoint inventory shows secure transport |
| Origin policy absent or inconsistent in approved review | Enforce a strict server-side origin allowlist | Reject unexpected origins, avoid permissive reflection | Approved configuration or server decision evidence |
| Connection session handling unclear or stale | Bind connection to validated server session and revalidate by policy | Logout/session-expiry lifecycle handling; secret-safe logs | Normal test-account lifecycle observation |
| Message shape accepted without defined handling | Define and validate schemas per operation | Reject unknown fields/types; size and rate limits | Harmless marker accepted or rejected as documented |
| Action accepted without clear resource authorization | Authorize actor, action, and resource on every message server-side | Derive identity from session; deny by default; audit decisions | Test-account permitted action maps to server response |
| Sensitive message content or secrets exposed in diagnostics | Minimize payload logging and redact secrets | Correlation IDs, access controls, retention limits | Sanitized logs or approved review evidence |

## Boundaries

This table does not establish a vulnerability by itself. Tie every remediation recommendation to a recorded observation and preserve untested conditions as limitations.
