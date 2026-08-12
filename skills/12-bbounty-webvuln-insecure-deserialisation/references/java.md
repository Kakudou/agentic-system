# Java Boundary Review

## Purpose And Preconditions

Use only for an authorized Java target when existing evidence indicates native Java serialization or framework type binding. Obtain source, configuration, approved logs, or owner testimony; do not submit or construct serialized content.

## Inert Bounded Methodology

Map the documented input to the receiving parser. In source review, note whether untrusted input reaches native object deserialization, framework polymorphic binding, or a data-transfer-object mapper. Record validation order and explicit type restrictions.

## Observations And Interpretation

Native object deserialization across a trust boundary is a design concern. A data-only schema with explicit field types is a stronger boundary. A library on the dependency list alone does not establish that an input path reaches it.

## False-Positive Controls

Distinguish server-to-server trusted messages from user-controlled input, encoding from deserialization, and logging/type names from actual parser configuration. Require a second evidence source before reporting a reachable boundary.

## Evidence And Remediation

Capture redacted locators for the input, parser, validation, and type policy. Recommend replacing native object serialization at trust boundaries, restricting type resolution, and enforcing schema validation before typed binding.

Source: [PortSwigger: Insecure deserialization](https://portswigger.net/web-security/deserialization)
