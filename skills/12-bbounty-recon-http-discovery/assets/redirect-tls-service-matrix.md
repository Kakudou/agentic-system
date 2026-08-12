# Redirect, TLS, and Service Interpretation Matrix

| Observation | Plausible interpretation | Common confounders | Safe disposition |
| --- | --- | --- | --- |
| HTTP redirects to HTTPS | Expected transport upgrade | CDN or policy rollout | Record chain; compare once if permitted |
| Canonical-host redirect | Intended hostname consolidation | Locale or tenant routing | Record boundary; stop if destination is out of scope |
| Redirect loop or downgrade | Configuration discrepancy | Client cache or proxy behavior | Hand off with neutral reproduction evidence |
| Certificate name or date anomaly | Transport configuration needs review | Clock skew, TLS interception, certificate rotation | Record metadata; request authorized validation |
| Different baseline responses | Separate service or delivery behavior | A/B test, WAF, CDN edge, authentication | Compare stable features; label tentative |
| Connection failure | Endpoint or transport availability issue | Network path, trust store, temporary outage | Retry once only if permitted; otherwise report inconclusive |
