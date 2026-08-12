# SSRF Decision Matrix

| Observation | Read | Permitted next action | Stop condition |
|---|---|---|---|
| URL-like input is accepted | [Basic SSRF](../references/basic-ssrf.md) | Establish normal behavior with a controlled endpoint. | Scope does not authorize testing. |
| No response content is available | [Blind SSRF](../references/blind-ssrf.md) | Use one authorized passive callback. | Callback is uncorrelated or ambiguous. |
| Validation and fetch behavior differ | [Parser confusion](../references/parser-confusion.md) | Compare benign controlled parsing or redirects. | Test would require a bypass catalog. |
| Scheme policy is unclear | [Protocol handling](../references/protocol-handling.md) | Verify HTTP(S)-only enforcement. | Non-HTTP testing would be required. |
| Internal boundary validation is approved | [Controlled services](../references/controlled-internal-services.md) | Use one named fixture. | Any discovery or live service access. |
| Cloud deployment is indicated | [Cloud metadata safety](../references/cloud-metadata-safety.md) | Review controls or use a dedicated fixture. | Metadata endpoint access is not explicitly authorized. |

Use the [test matrix](test-matrix.md) to record the approved minimum test set.
