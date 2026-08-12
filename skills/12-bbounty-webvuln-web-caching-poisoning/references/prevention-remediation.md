# Prevention And Remediation

## Purpose And Preconditions

Guide owner-approved repair of cache-key coverage and response eligibility. Changes require normal configuration/change-control approval.

## Safe Controlled Methodology

Review response variance, cache-key configuration, normalization order, shared-cache policy, and invalidation workflow. Validate changes with an approved fixture in staging or a production canary controlled by the owner.

## Observations And Interpretation

The repair is effective when each approved response-affecting dimension is keyed or the response cannot enter a shared cache. Confirm across every relevant cache layer.

## False-Positive Controls

Check edge overrides, inherited rules, application caches, and delayed propagation. A declared key change is not sufficient without observed post-change behavior.

## Cleanup And Stop Conditions

Stop or roll back under owner control if the repair changes unrelated public assets, availability, or tenant isolation. Remove fixtures and invalidate test objects after validation.

## Evidence And Remediation

Capture before/after configuration, owner approvals, fixture results, layer-by-layer validation, and invalidation proof. Prefer explicit cache-key policy, canonicalization before keying, narrow public-cache rules, and private/no-store policy for dynamic content.

## Sources

- [PortSwigger: Web cache poisoning](https://portswigger.net/web-security/web-cache-poisoning)
