# Evidence and Stop Checklist

## Evidence

- [ ] Written authorization, target, permitted parent context, and rate limit recorded.
- [ ] Test-account/test-data label is harmless and no secret values were retained.
- [ ] Redirect chain and final response headers are redacted and retained.
- [ ] Policy is identified as enforced, report-only, absent, or conflicting.
- [ ] Browser/version, clean-profile status, and non-interactive rendered/block result recorded.
- [ ] Page purpose and action category were classified without invoking an action.
- [ ] Documented embeds, caches, proxies, extensions, and independent safeguards considered.
- [ ] Impact statement is bounded to observed conditions and untested boundaries are explicit.

## Stop and Cleanup

- [ ] Stop before a click, input, submission, consent, credential prompt, or state transition.
- [ ] Stop on scope ambiguity, unexpected sensitive data, unapproved host, or required bypass.
- [ ] Close test tabs and clear transient test-browser state where engagement rules require it.
- [ ] Record cleanup status and escalate any unexpected behavior to the engagement owner.
