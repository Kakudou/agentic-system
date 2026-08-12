# Evidence And Stop Checklist

## Before Testing

- [ ] Written scope covers target, endpoint, method, and authority marker.
- [ ] Canonical baseline and expected safe response are recorded.
- [ ] Marker is inert, tester-controlled, and program-approved.
- [ ] Disclosure contact and rate limits are known.

## During Testing

- [ ] One manual baseline-versus-marker comparison is active at a time.
- [ ] Only authority changes; no override, duplicate, malformed, or alternate-target headers are used.
- [ ] Sanitized status, redirect, content type, and stable headers are captured.
- [ ] Testing stops on sensitive content, state change, unexpected routing, rate limiting, or scope uncertainty.

## After Testing

- [ ] Positive marker-only observation was repeated once at most.
- [ ] Evidence includes scope, marker ownership, endpoint, baseline, variant, timestamp, and interpretation.
- [ ] No tokens, cookies, user data, request bodies, or sensitive response bodies were retained.
- [ ] Cleanup is recorded as not needed, complete, or program-owned.
- [ ] Remediation and regression guidance are linked.

See [validation and prevention](../references/validation-prevention.md).
