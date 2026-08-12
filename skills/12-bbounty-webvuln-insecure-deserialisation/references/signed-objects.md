# Signed Objects

## Purpose And Preconditions

Use when an authorized target uses a signature, MAC, or similar integrity marker around serialized state. Review documented design, approved configuration, or owner-provided observations only.

## Inert Bounded Methodology

Record where integrity verification occurs relative to decoding and typed binding, the key-management owner, and whether verification failure is handled before the object is used. Do not alter, strip, forge, replay, or submit signed values.

## Observations And Interpretation

Integrity controls can establish origin or detect modification, but they do not make unsafe object handling safe by themselves. A valid internal producer may still send an out-of-policy type; type and schema constraints remain separate controls.

## False-Positive Controls

Do not infer weak verification from a token-like appearance, an error, or an undocumented field name. Confirm the effective verification path and distinguish transport authentication from object integrity.

## Evidence And Remediation

Preserve redacted design/configuration locators and verification order. Recommend verification before parsing, key separation and rotation, strict schema/type controls, and data-only formats at trust boundaries.

Source: [PortSwigger: Insecure deserialization](https://portswigger.net/web-security/deserialization)
