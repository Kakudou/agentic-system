# SSRF Test Matrix

| Test | Preconditions | Maximum activity | Evidence | Stop condition |
|---|---|---|---|---|
| Baseline feature behavior | In-scope URL input | One normal request | Sanitized request and response | Feature is not a server-side fetch. |
| Controlled fetch validation | Owned endpoint or assigned fixture | One correlated request, then one reproduction if needed | Endpoint log and correlation value | Minimal proof is obtained. |
| Blind callback validation | Explicit OOB authorization | One passive callback request | Callback timestamp and correlation | Attribution is uncertain. |
| Redirect policy check | Redirects explicitly permitted | Controlled redirect only | Final destination policy result | Redirect exits controlled infrastructure. |
| Internal fixture check | Named internal fixture authorization | One request | Fixture log | Any enumeration or live system access. |
| Cloud fixture check | Dedicated cloud fixture authorization | One identity-only check | Fixture log | Any real metadata service or sensitive data. |

Record authorization and rate limits before testing. This matrix does not authorize tests.
