# Evidence, Cleanup, And Stop Checklist

## Before Testing

- [ ] Scope and authorization cover this endpoint, method, and marker use.
- [ ] Baseline request and expected marker response are recorded.
- [ ] Marker ownership and permitted location are documented.
- [ ] Disclosure contact and rate limits are known.

## During Testing

- [ ] One manually issued marker-only comparison is active at a time.
- [ ] Request representation, response metadata, and handler identity are captured in sanitized form.
- [ ] No content discovery, enumeration, uploads, link creation, archive creation, or state-changing action is performed.
- [ ] Testing stops immediately on non-marker content, sensitive data, unexpected state change, or rate limiting.

## After Testing

- [ ] A positive marker-only observation was repeated once at most.
- [ ] Evidence records scope, marker ownership, baseline, variant label, timestamps, and interpretation.
- [ ] Tester-controlled markers are removed if permitted; otherwise ownership is handed to the program.
- [ ] Sensitive content was not retained; any accidental exposure was reported through the approved channel.
- [ ] Remediation and regression guidance is linked.

See [prevention and validation](../references/prevention-validation.md).
