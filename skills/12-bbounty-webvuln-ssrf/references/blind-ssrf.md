# Blind SSRF

## Use When

Use this reference when the application provides no fetched response body, but the program authorizes a controlled out-of-band callback endpoint.

## Safe Assessment

Use one unique, non-sensitive correlation value per manually initiated test. Confirm that the callback arrived after the tested request and that its method, host, path, and timing match the authorized test. Keep callback collection passive; it must not redirect, return payloads, or request further resources.

## Interpretation And Limits

Delayed jobs, link preview workers, security scanners, monitoring, retries, and other tenants can create callbacks. Reproduce only within the stated rate limit and distinguish application behavior from automated infrastructure. A DNS event alone may establish attempted resolution, not an HTTP fetch or data exposure. Stop after confirming the minimal claim.

## Source

- PortSwigger: [Blind SSRF vulnerabilities](https://portswigger.net/web-security/ssrf/blind)
