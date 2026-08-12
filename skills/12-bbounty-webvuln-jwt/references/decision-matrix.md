# JWT Assessment Decision Matrix

**Purpose:** Select the minimum safe next assessment step and avoid escalation beyond authorization.

**Preconditions:** Scope, test identity, harmless action, and stop contact are known.

**Bounded assessment:** Classify the current observation once, take only the listed next step, and stop when the table says to stop or classify.

| Observation | Next assessment | Stop or classify |
|---|---|---|
| No JWT observed | Record alternate auth mechanism | Not applicable |
| JWT present, consumer unknown | Complete token inventory | Do not test acceptance |
| Algorithm policy fixed and mismatch rejected | Capture evidence | Pass for this control |
| Algorithm/key policy unclear | Review configuration or isolated fixture | Inconclusive if no safe evidence |
| Dynamic key metadata present | Assess JWK/JKU/KID trust controls | Stop before external callbacks |
| Claim influences access | Assess server-side authorization binding | Use only approved test identities |
| Protected action unexpectedly accepted | Capture minimal evidence and stop | Finding; escalate per program rules |

**Interpretation:** A finding is limited to an unexpected protected authorization decision; otherwise retain the table's pass, not-applicable, or inconclusive classification.

**False-positive controls:** Rule out alternate authentication, routing, cache, expiry, and pre-existing entitlements before classifying a finding.

**Evidence:** Record the observation, selected row, authorization boundary, controlled outcome, and stop decision.

**Remediation:** Route findings to [prevention](prevention.md); add the selected rejection or authorization boundary as a regression test.

**Sources:** [JWT vulnerabilities](https://portswigger.net/web-security/jwt), [JWT attacks](https://portswigger.net/web-security/jwt#jwt-attacks)
