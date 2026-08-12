# Schema, Role, And Action Coverage Worksheet

Complete one row before testing. Use labels for accounts and controlled objects; do not place secrets or unnecessary personal data in the worksheet.

## Surface Record

| Target | Endpoint | Method/content type | Auth context label | Scope reference | Stop contact |
|---|---|---|---|---|---|
| | | | | | |

## Schema Mapping

| Root operation | Type/field | Arguments or input | Relationship | Source | Relevance | Metadata permitted |
|---|---|---|---|---|---|---|
| | | | | normal client / documentation / authorized metadata | | yes / no |

## Role, Object, And Action Coverage

| ID | Operation class | Object label | Related object label | Actor role label | Expected decision | Minimal fields/result | Permission | Outcome | Evidence reference |
|---|---|---|---|---|---|---|---|---|---|
| | read / relationship / write | | | | allow / deny / redact | | scope ref | pending | |

## Cost-Control Coverage

| Technique | Explicit limit | Baseline defined | One comparison authorized | Stop conditions | Outcome | Evidence reference |
|---|---|---|---|---|---|---|
| alias / batch / nesting | | yes / no | yes / no | | pending | |

## Validation Notes

Record expected policy source, session/tenant checks, cache or gateway controls considered, cleanup status for writes, and unresolved ambiguity.
