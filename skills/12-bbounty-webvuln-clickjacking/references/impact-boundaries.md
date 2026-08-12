# Impact Boundaries

## Purpose and Preconditions

Use to distinguish a framing configuration observation from a reportable security outcome. Require a documented page purpose and an action category derived without performing the action.

## Safe Bounded Methodology

Classify the selected page as no action, low-risk action, sensitive action, or out of scope. Identify independent safeguards visible before an action, such as reauthentication or explicit confirmation, without attempting to traverse them. Use [assessment techniques](techniques.md) for the bounded classification process.

## Observations and Interpretation

Framing a static page has no demonstrated UI-redressing impact. A meaningful action category supports a bounded risk statement only when the observed page can render in an unauthorized context and no confirmed independent safeguard prevents the relevant step. Do not claim credential theft, transaction completion, consent, or account change without separately authorized evidence.

## False-Positive Controls

Consider intentional embeds, read-only content, CSRF protections, server-side authorization, MFA, reauthentication, explicit confirmations, and action availability changes by role or account state. These controls may limit impact even when framing is permitted.

## Cleanup and Stop Conditions

Stop at any action boundary, prompt, or data exposure. Do not test whether safeguards can be bypassed; hand off such questions only under separate written authorization.

## Evidence and Remediation

Record the action category, observed safeguards, policy/browser result, and explicitly untested boundaries. Apply strict frame policy to sensitive pages and retain confirmation or reauthentication as defense in depth.

Sources: [PortSwigger: Clickjacking](https://portswigger.net/web-security/clickjacking), [PortSwigger: CSP](https://portswigger.net/web-security/cross-site-scripting/content-security-policy).
