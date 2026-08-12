# SSRF Assessment Cheatsheet

## Use When

Use this as a compact reminder after reading the workflow-linked resource for the current decision. It does not replace authorization or detailed interpretation guidance.

| Question | Safe answer |
|---|---|
| Is testing authorized? | Require written scope, limits, and a reporting channel. |
| What destination is safe? | An owned callback or program-provided fixture only. |
| What proves SSRF? | Correlated server-side request or response-side confirmation. |
| When should testing stop? | On uncertainty, a sensitive boundary, rate-limit risk, or minimal proof. |
| What should be reported? | Feature, sanitized request, correlation, boundary class, impact, and fix. |

## Source

- PortSwigger: [Server-side request forgery (SSRF)](https://portswigger.net/web-security/ssrf)
