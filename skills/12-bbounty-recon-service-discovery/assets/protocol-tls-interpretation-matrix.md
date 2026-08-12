# Protocol/TLS Interpretation Matrix

| Observed evidence | Permitted interpretation | Do not infer | False-positive control | Handoff action |
| --- | --- | --- | --- | --- |
| Program inventory labels an HTTP endpoint | Documented HTTP-facing boundary | Product, version, current reachability | Preserve inventory date and asset ID | Validate only if separately authorized |
| Public documentation labels a non-HTTP service | Documented service class | Public exposure, authentication state, implementation | Confirm source controls the asset | Request ownership/scope review |
| Authorized artifact contains certificate hostname metadata | Hostname association clue | Ownership, tenant relationship, protocol support | Check scope and shared-infrastructure context | Record as likely or unverified |
| Authorized artifact names a TLS/protocol version | Historical observed transport metadata | Current configuration or complete support set | Preserve artifact date and collection method | Ask owner whether current validation is needed |
| Sources disagree or lack detail | Unknown | A service identity or exposure claim | Keep competing explanations | Stop and hand off |
