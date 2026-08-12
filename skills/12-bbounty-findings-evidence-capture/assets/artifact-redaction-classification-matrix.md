# Artifact and Redaction Classification Matrix

| Class | Directly supports | Does not establish alone | Default handling |
|---|---|---|---|
| Request record | Recorded request representation | Receipt, server processing, or complete session state | Restrict headers, bodies, and identifiers; redact before routine handoff |
| Response record | Recorded response representation | Request origin, browser behavior, or complete exchange | Restrict bodies and headers; retain only necessary context |
| Browser observation | Visible rendering or browser-visible state | Full network exchange, server processing, or repeatability | Record page/context and time; redact visible personal or account data |
| Terminal observation | Local displayed output in its stated context | Complete environment, prior state, or remote effect | Remove paths, identifiers, and values not needed for review |
| Derivative | The stated transformation of a linked original | Byte identity with original or omitted content | Label transformation and redactions; preserve original only in approved restricted storage |

## Sensitivity Classes

| Class | Examples | Handling |
|---|---|---|
| Restricted | Credentials, session material, personal data, payment data, private source, customer content | Stop broad sharing; use approved restricted channel or escalate |
| Internal review | Non-public configuration or operational context | Limit recipients and retain per program rules |
| Shareable derivative | Irreversibly redacted minimum context | Confirm no sensitive value remains before handoff |
