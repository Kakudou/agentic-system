# SSRF Remediation Lookup

| Finding condition | Primary remediation | Defense in depth | Verify after change |
|---|---|---|---|
| Arbitrary destination accepted | Replace with server-managed integration configuration. | Egress allowlist and isolated fetch worker. | Unapproved controlled destination is rejected. |
| URL validation differs from fetch | Parse once and validate canonical destination and resolved address. | Revalidate before connect and at redirects. | Controlled normalization and redirects remain within policy. |
| Redirect escapes allowlist | Disable redirects or validate every hop. | Limit redirect count and response size. | Controlled redirect to an unapproved destination is blocked. |
| Unsupported scheme is accepted | Allow HTTP(S) only, preferably HTTPS only. | Reject embedded credentials and malformed URLs. | Unsupported scheme causes no outbound request. |
| Sensitive network reachable | Deny sensitive address classes and metadata services. | Segmented egress, firewall policy, provider metadata hardening. | Assigned fixture cannot cross the restricted boundary. |

See [prevention and remediation](../references/prevention.md) for context and sources.
