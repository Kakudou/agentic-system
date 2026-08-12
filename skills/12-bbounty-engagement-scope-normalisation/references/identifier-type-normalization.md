# Identifier and Type Normalization

## Purpose and Preconditions

Represent source-declared identifiers consistently while retaining their exact source form. Work only from admitted scope evidence. Normalization is a documentation operation, never a claim that two identifiers resolve to, are owned by, or authorize one another.

## Documentation Methodology

Assign each literal source identifier one type: hostname or domain pattern, network range, URL, application/package identifier, API identifier, cloud/resource identifier, third-party service, or `other`. Record the source literal, a conservative presentation-normalized form, type, qualifiers, and source citation in the identifier/restriction matrix. Preserve significant syntax such as wildcard markers, paths, ports, schemes, version labels, and case where the source treats it as significant.

Use a normalization note only for mechanical presentation decisions, such as trimming accidental surrounding whitespace or consistent field separation. Mark any non-mechanical interpretation as unresolved rather than rewriting it.

## Uncertainty and Scope Controls

Do not enumerate patterns, derive hosts from URLs, translate names to addresses, collapse aliases, or add endpoints, ports, versions, packages, or cloud resources. When type cannot be determined from the source, classify it as `other` and request clarification. Do not use formatting normalization to change inclusion status.

## Evidence and Handoff

Provide a one-to-one mapping from each normalized row to its source literal and quotation. Include every preservation note and every unclassified identifier in the handoff.

## Authoritative Sources

- Admitted engagement scope evidence.
- IETF RFC 3986 for URI component terminology: https://www.rfc-editor.org/rfc/rfc3986
- IANA protocol and identifier registries when terminology needs clarification: https://www.iana.org/protocols
