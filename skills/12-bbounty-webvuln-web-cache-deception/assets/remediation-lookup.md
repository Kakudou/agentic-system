# Remediation Lookup

| Observation | Preferred remediation | Validation evidence |
|---|---|---|
| Dynamic route eligible for shared caching | Mark dynamic/authenticated responses private or no-store; remove overriding edge rule | Edge and origin policy agree |
| Edge/origin path mismatch | Canonicalize or reject ambiguous paths before cache matching | Route logs agree for approved forms |
| Broad static rule | Restrict rule to known static origin paths | Controlled dynamic fixture is not stored |
| Unclear invalidation ownership | Define owner, trigger, and verification | Invalidation runbook evidence |
