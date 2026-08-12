# Claim And Validation Coverage Worksheet

| Token type / consumer | Issuer | Audience | Algorithm/key family | Key source | Required claims | Authorization binding | Evidence | Status |
|---|---|---|---|---|---|---|---|---|
| | | | | | | | | not started |
| | | | | | | | | not started |
| | | | | | | | | not started |

## Registered Claim Checks

| Claim | Required by flow | Expected validation | Consumer evidence | Result |
|---|---|---|---|---|
| `iss` | | Exact trusted issuer | | |
| `aud` | | Exact intended audience | | |
| `sub` | | Bound to server-side identity | | |
| `exp` | | Expiry enforced with defined skew | | |
| `nbf` | | Not-before enforced | | |
| `iat` | | Plausibility/freshness policy | | |
| `jti` | | Replay/revocation policy where required | | |

## Stop-Condition Checklist

- [ ] Written scope and permitted confirmation method recorded.
- [ ] Disposable test identity and harmless target action confirmed.
- [ ] No key recovery, signing, token forgery, account takeover, or persistent state change planned.
- [ ] Sensitive tokens, claims, keys, and personal data redacted from evidence.
- [ ] Stop after one conclusive minimum-impact observation and escalate through the program channel.

See [token inventory and claim review](../references/claims.md), [authorization binding](../references/claim-manipulation.md), and [prevention](../references/prevention.md).
