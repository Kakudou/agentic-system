# Input Location And Type Confidence Matrix

| Location | Minimum evidence | Type claim allowed | Common false positive | Confidence ceiling without correlation |
| --- | --- | --- | --- | --- |
| Query | Naturally generated allowed request | Observed value shape | Analytics, cache-busting, UI state | Observed |
| Form/body | Naturally generated allowed request | Media type and observed field shape | Disabled or conditional control | Observed |
| JSON body | Naturally generated request or first-party schema | Path and observed/documented kind | Response-only key, optional model field | Observed/documented |
| Header | Naturally generated request or first-party contract | Header name and redacted shape | Browser/proxy default, tracing field | Observed/documented |
| Cookie | Approved client traffic | Name, direction, visible attributes | Consent, load-balancer, third-party cookie | Observed |

Use **corroborated** only when an observed request and attributable first-party documentation agree on endpoint, method, location, and name/path. Never infer requiredness, server acceptance, authorization, or security impact.
