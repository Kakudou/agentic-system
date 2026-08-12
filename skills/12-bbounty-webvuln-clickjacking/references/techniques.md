# Assessment Techniques

## Purpose and Preconditions

Use to choose the minimum authorized assessment technique. Have a defined target page, parent-context authorization, and an explicit no-interaction boundary.

## Safe Bounded Methodology

Use only three techniques: response-policy inventory, ordinary redirect inspection, and clean-browser non-interactive render/block observation in an approved context. Record results in the supplied worksheets. Do not create proof pages, alter visual presentation, force interactions, or enumerate bypasses.

## Observations and Interpretation

Header inventory shows declared intent; browser observation shows enforcement for the assessed condition; page/action classification bounds relevance. None independently demonstrates that a user can be deceived or that an action completes.

## False-Positive Controls

Use final response headers, distinguish enforced and report-only policy, remove extension/cache effects, and verify that the parent context is actually unauthorized when that is the claim.

## Cleanup and Stop Conditions

Close browser contexts and delete only transient locally captured evidence according to engagement rules. Stop before any interactive element, login challenge, consent prompt, or unapproved origin.

## Evidence and Remediation

Preserve one redacted result per technique and note untested assumptions. Apply a minimal enforced `frame-ancestors` policy appropriate to the route.

Sources: [PortSwigger: Clickjacking](https://portswigger.net/web-security/clickjacking), [PortSwigger: CSP](https://portswigger.net/web-security/cross-site-scripting/content-security-policy).
