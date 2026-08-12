# Prevention And Remediation

## Purpose And Preconditions

Turn confirmed or suspected controlled findings into configuration fixes. Obtain owner confirmation before changing cache or routing policy.

## Safe Controlled Methodology

Review cache eligibility, route normalization, key configuration, and invalidation ownership. Test proposed fixes only on a staging fixture or a designated production canary under change control.

## Observations And Interpretation

The fix is effective when dynamic controlled responses are ineligible for shared storage and canonical/approved alternate route forms resolve consistently. Do not treat a single header change as proof when edge rules can override it.

## False-Positive Controls

Check every cache layer, including CDN, reverse proxy, and application cache. Verify rules after deployment propagation and configuration inheritance.

## Cleanup And Stop Conditions

Stop rollback or validation if the change affects unrelated static content, availability, or tenant isolation. Invalidate controlled fixtures and close only after owner verification.

## Evidence And Remediation

Capture before/after policy, route tests, owner approval, propagation evidence, and regression coverage. Prefer explicit private/no-store treatment for dynamic or authenticated content, strict canonicalization before cache matching, and narrowly scoped static rules.

## Sources

- [PortSwigger: Web cache deception](https://portswigger.net/web-security/web-cache-deception)
