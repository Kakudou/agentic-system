# Remediation Lookup

| Observed boundary | Primary control | Defense in depth | Safe regression evidence |
| --- | --- | --- | --- |
| API structured input | Strict schema validation and unknown-key rejection | Request-size and depth limits | Valid normal fields accepted; unsupported normal fields rejected |
| Recursive object composition | Explicit allowlisted mapping instead of broad merge | Defensive object structures | Nested expected fields remain deterministic |
| Security-sensitive lookup | Own-property checks and explicit defaults | Separate trusted configuration from request data | Missing and ordinary own fields take documented paths |
| Browser state or UI options | Client schema validation before state composition | Isolated state containers and dependency updates | Clean-profile baseline matches expected behavior |
| Worker or configuration ingestion | Validate at each ingestion boundary | Immutable configuration and dependency inventory | Authorized test configuration loads only declared fields |

Use the control nearest the untrusted composition boundary. Record dependency advisories and framework-specific guidance in the implementation ticket rather than this reusable resource.
