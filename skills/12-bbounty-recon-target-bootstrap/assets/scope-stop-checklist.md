# Scope And Stop-Condition Checklist

- [ ] Current program policy or written authorization is retained.
- [ ] Literal target input and source are recorded.
- [ ] In-scope rule, exclusions, time window, and rate limits are recorded.
- [ ] No inferred hostname, IP, certificate name, or redirect destination is treated as authorized.
- [ ] Each redirect destination has an explicit scope decision before observation.
- [ ] No authentication, state-changing action, enumeration, or automated probing is planned.
- [ ] Collection will remain serial and browser-equivalent unless policy says otherwise.
- [ ] Stop channel is known for scope, ownership, or safety uncertainty.
- [ ] Stop if scope is unclear, authorization expires, rate limiting occurs, or impact is suspected.
