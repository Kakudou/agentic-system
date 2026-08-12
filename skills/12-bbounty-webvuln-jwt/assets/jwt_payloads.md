# Operational Decision Matrix

| Control area | Inspect | Safe confirmation boundary | Finding threshold | Stop condition |
|---|---|---|---|---|
| Token inventory | Issuer, consumers, transport, lifecycle | Decode for review only | Missing consumer or policy mapping | Token source is outside scope |
| Algorithms | Allowlist, token type, key family | Config review or isolated negative fixture | Incompatible algorithm accepted for protected access | Requires live token mutation without approval |
| Unsecured tokens | Explicit `none` prohibition | Isolated reject test | Unsecured token reaches protected decision | No dedicated safe path |
| JWK/JKU | Trusted origin, issuer binding, redirects | Metadata/configuration review | Untrusted key source affects verification | External hosting or callback is required |
| KID | Opaque allowlist and lookup behavior | Unknown-key fixture or logs | Arbitrary key selection or unsafe lookup | Backend behavior cannot be safely established |
| Claims | Server validation and resource binding | Two approved test identities | Cross-identity, tenant, or privilege boundary is granted | Test action would change data |
| Lifetime/replay | `exp`, `nbf`, `iat`, `jti`, refresh policy | Time-controlled fixture | Expired, premature, or replayed token is accepted contrary to policy | Clock/session controls unavailable |

Use with [safe confirmation](../references/safe-confirmation.md) and [evidence checklist](../references/evidence-checklist.md).
