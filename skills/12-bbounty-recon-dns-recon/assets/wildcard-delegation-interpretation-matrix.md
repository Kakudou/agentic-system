# Wildcard and Delegation Interpretation Matrix

| Observation pattern | Safe interpretation | Do not infer | Required evidence | Handoff |
| --- | --- | --- | --- | --- |
| Similar answers for known in-scope names | Possible shared routing or wildcard behavior | Separate deployed services | Record type, authority context, timestamps | Request owner routing confirmation |
| Explicit record differs from shared pattern | Name may have explicit DNS treatment | Application ownership or impact | Both observations and scope basis | Note distinction for owner review |
| CNAME points to provider domain | DNS alias to a provider-operated namespace | Customer account control or claimability | Full alias chain and provider context | Ask owner to confirm intended mapping |
| NS indicates child-zone delegation | Authority may move at the delegation boundary | Parent-zone control of child records | Parent and child authority observations | Route to responsible zone owner |
| Negative or inconsistent response | Could reflect caching, propagation, or source variance | Misconfiguration or removal | Response status, TTL, time, source | Mark inconclusive and recheck only if authorized |
