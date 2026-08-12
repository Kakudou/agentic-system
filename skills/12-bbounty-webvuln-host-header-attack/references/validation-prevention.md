# Validation And Prevention

## Purpose And Preconditions

Use after an authorized marker-only assessment or during secure design review. Require intended public hosts, CDN/proxy/origin configuration ownership, and a safe deployed-path regression endpoint.

## Bounded Marker Methodology

1. Define exact accepted hosts, aliases, ports if applicable, and one canonical public origin.
2. Verify canonical request succeeds and documented aliases either redirect canonically or follow approved policy.
3. Verify approved inert marker is rejected or canonically handled without being used in non-sensitive absolute URLs.
4. Repeat through deployed edge and origin path, recording each layer's observed result in the [normalization matrix](../assets/proxy-cdn-normalization-matrix.md).

## Observations And Interpretation

Passing validation means the deployed chain reaches one consistent authority decision and public URL generation does not inherit untrusted authority. A perimeter rejection alone is insufficient when origin remains externally reachable.

## False-Positive Controls, Cleanup, And Evidence

Test aliases separately from authentication, localization, tenancy, and redirect migrations. Do not test malformed headers, cache behavior, outbound requests, or stateful journeys. Stop on non-public data or state change. Retain accepted/rejected marker outcomes, configuration owner, deployment context, and regression result.

## Remediation

Allowlist accepted hosts at the edge and origin; normalize to one canonical origin; strip or overwrite externally supplied forwarding authority at the trusted proxy; use configured canonical origin data for absolute URLs; reject direct-origin traffic where feasible; and add deployed-path regression coverage.

## Source

- PortSwigger: <https://portswigger.net/web-security/host-header>
