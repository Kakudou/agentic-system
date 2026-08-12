# Host-Authority Remediation Lookup

| Observed weakness | Preferred remediation | Validation evidence |
|---|---|---|
| Edge accepts unapproved authority | Exact allowlist and canonical redirect/rejection at edge | Approved marker is consistently rejected or canonicalized |
| Proxy and application disagree | Normalize once at trusted proxy and forward approved canonical authority | Matrix shows consistent deployed-path result |
| Origin accepts direct public traffic | Restrict origin to trusted proxy or enforce same exact allowlist | Direct-origin test fixture is rejected where supported |
| Absolute URLs use request authority | Use configured canonical public origin | Marker never appears in non-sensitive generated URLs |
| Aliases have inconsistent policy | Document aliases and choose canonical redirect or explicit support | Each documented alias has expected result |
| Forwarded authority reaches application unchecked | Strip or overwrite client-supplied forwarding metadata at trust boundary | Application logs/configuration show trusted source only |

## Design Rules

1. Define accepted public hosts in configuration, not through client input.
2. Enforce the same policy at edge, proxy, and origin.
3. Generate public absolute URLs from configured canonical origin data.
4. Restrict direct origin access where architecture permits.
5. Keep marker-only deployed-path regression coverage for each authority boundary.

Source: [PortSwigger Host header attacks](https://portswigger.net/web-security/host-header).
