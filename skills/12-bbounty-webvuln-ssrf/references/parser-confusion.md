# Parser Confusion And Redirects

## Use When

Use this reference only when input validation, URL parsing, DNS resolution, or redirect following may be performed by different components and the program permits this class of validation.

## Safe Assessment

Use controlled, benign endpoints to compare documented canonicalization and redirect policy. Confirm that validation occurs after parsing a complete URL, after DNS resolution where applicable, and on every redirect destination. Do not test alternate address encodings, user-info tricks, fragments, malformed URLs, or redirect chains that leave controlled infrastructure.

## Remediation Constraints

Use one mature URL parser consistently. Allowlist schemes and destinations, canonicalize before comparison, resolve and validate addresses against blocked ranges, pin or revalidate the connected address where feasible, and disable redirects unless required. If redirects are needed, reapply the full policy at each hop.

## Source

- PortSwigger: [Bypassing common SSRF defenses](https://portswigger.net/web-security/ssrf/bypassing-common-defenses)
- PortSwigger: [URL validation bypass cheat sheet](https://portswigger.net/web-security/ssrf/url-validation-bypass-cheat-sheet)
