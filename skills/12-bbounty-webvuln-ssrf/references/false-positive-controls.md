# False-Positive Controls

## Use When

Use this reference before assigning a severity or reporting a callback as SSRF evidence.

## Checks

- Confirm the callback correlation value appears only in the one test request.
- Confirm the request originated from the application workflow rather than the tester's browser, proxy, redirect service, or security tooling.
- Compare against a known-safe controlled destination and account for queues, retries, caching, and preview workers.
- Do not infer reachability or data access from timing, a generic error, DNS alone, or an uncorrelated callback.
- Redact endpoint logs and report only information necessary to reproduce the claim.

## Source

- PortSwigger: [Blind SSRF vulnerabilities](https://portswigger.net/web-security/ssrf/blind)
