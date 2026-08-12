# Host-Routing Inventory

## Purpose And Preconditions

Use before testing to document the public authority chain without discovering hosts or probing internal routes. Require written scope, documented public hostnames, and a safe baseline endpoint.

## Bounded Marker Methodology

1. List only in-scope canonical hosts and aliases supplied by program documentation or ordinary public navigation.
2. For each, record public URL, expected canonical host, TLS/SNI name, observed redirect behavior, and named CDN/proxy when visible.
3. Mark expected host-acceptance decision owner: edge, reverse proxy, application, or unknown.
4. Use one approved inert marker against one safe endpoint only after this inventory.

## Observations And Interpretation

Aliases may intentionally canonicalize to one host. A shared IP, certificate SAN, or CDN response neither authorizes host enumeration nor proves an application route exists. Gaps between documented authority and observed canonicalization are hypotheses only.

## False-Positive Controls, Cleanup, And Evidence

Separate DNS/TLS observations from HTTP routing observations. Record timestamps and avoid resolver logs or headers containing identifiers. Stop if a marker reaches an unexpected application, changes state, or produces non-public content. Preserve the completed [authority/header coverage worksheet](../assets/authority-header-coverage-worksheet.md).

## Remediation

Maintain one documented inventory of accepted public hosts and apply it consistently at the edge and origin.

## Source

- PortSwigger: <https://portswigger.net/web-security/host-header>
