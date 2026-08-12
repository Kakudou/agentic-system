# Format And Framework Handling Worksheet

## Purpose

Record what existing authorized evidence shows about an input boundary without decoding, constructing, or submitting serialized content.

## Use

Complete one row per input boundary. Mark unknown rather than inferring.

| Field | Record |
|---|---|
| Target and route | |
| Authorization reference | |
| Evidence locator and date | |
| Input location | body, cookie, header, message, or other documented boundary |
| Claimed media type or protocol | |
| Observed format family | JSON-like, XML-like, binary envelope, PHP serialization, signed container, or unknown |
| Basis for observation | documentation, source review, approved log, or captured authorized traffic |
| Runtime/framework indication | Java, .NET, PHP, framework, or unknown |
| Handling stage observed | transport decode, schema validation, typed binding, persistence, or unknown |
| Data-only control present | schema, allowlist, DTO, signature verification, or unknown |
| Confidence and alternative explanation | |

## Guardrails

- Do not copy sensitive values into the worksheet.
- Do not alter, replay, decode, or create inputs.
- Escalate if evidence implies processing beyond the approved boundary.
