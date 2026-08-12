---
name: 12-bbounty-webvuln-jwt
description: JWT testing. Algorithm switching, secret cracking, claim manipulation, header injection, kid attacks, and token forgery.
metadata:
  version: 1.0
  opencode/slash: "true"
---

# Authorized JWT Assessment

Assess JWT issuance, validation, and authorization binding only within the program's written scope and rate limits. Do not recover signing keys, forge tokens, take over accounts, or use production identities beyond the authorization granted.

## Purpose

Determine whether the application accepts or relies on JWTs contrary to its intended validation and authorization policy, then produce reproducible, minimum-impact evidence and remediation guidance.

## Prerequisites

- Written authorization, in-scope hosts, permitted test accounts, and a defined stop/escalation contact.
- A valid test-session token or documented issuer flow; never collect unrelated user tokens.
- A harmless target action or dedicated test endpoint that can distinguish reject from accept without changing data.

## Decision Workflow

1. **Establish scope and stop conditions.** Record the endpoint, test identity, expected authorization boundary, and approved confirmation level. Load [evidence and stop conditions](references/evidence-checklist.md).
2. **Inventory token use and claims.** Record where tokens are issued, transported, refreshed, and consumed. Decode only for inspection and map registered and application claims with [token inventory and claim review](references/claims.md). Use the [claim and validation coverage worksheet](assets/jwt_cheatsheet.md).
3. **Assess signature and algorithm policy.** Identify the declared algorithm, verifier allowlist, key type, and rejection behavior for malformed or unsupported inputs. Consult [signature and algorithm validation](references/algorithms.md), then only applicable [algorithm switching](references/algorithm-switching.md) or [none algorithm](references/none-algorithm.md) guidance.
4. **Assess key-distribution controls.** If headers or discovery metadata indicate `jwk`, `jku`, or `kid`, assess trust boundaries, pinning, and lookup handling using [key-distribution configuration](references/jwk-jku.md), [JWK/JKU validation](references/jwk-jku-attacks.md), and [KID handling](references/kid.md). For asymmetric keys, include [key-confusion controls](references/key-confusion.md).
5. **Assess authorization binding.** Verify that identity, tenant, audience, issuer, lifetime, and privilege decisions are validated server-side and bound to the requested resource. Load [authorization binding](references/claim-manipulation.md).
6. **Confirm safely or stop.** Use only the least-privileged, pre-authorized confirmation on a disposable test identity. Do not alter claims or signatures outside an approved non-production test mechanism. Apply [safe confirmation](references/safe-confirmation.md) and the [operational decision matrix](assets/jwt_payloads.md).
7. **Report and prevent recurrence.** Classify the observed result, preserve redacted request/response evidence, and map findings to [prevention and validation](references/prevention.md) and the [remediation lookup](assets/remediation-lookup.md).

## Evidence

- Scope authorization, endpoint, test identity class, and safe-action boundary.
- Redacted token header/claim inventory and validation expectations.
- Timestamped request/response or server-side audit evidence showing the relevant accept/reject decision.
- Reproduction conditions, false-positive controls, impact limited to the demonstrated boundary, and remediation validation criteria.

## Output

```yaml
jwt_assessment:
  target: string
  authorization_scope: string
  coverage: complete | partial | blocked
  decisions:
    signature_validation: pass | finding | inconclusive
    key_distribution: pass | finding | not_applicable | inconclusive
    authorization_binding: pass | finding | inconclusive
  evidence: [redacted strings]
  stop_conditions: [strings]
  remediation: [strings]
```

## Supplemental Index

- [Decision matrix](references/decision-matrix.md)
- [Evidence checklist](references/evidence-checklist.md)
- [PortSwigger JWT overview](https://portswigger.net/web-security/jwt)
