# Bundle and Source-Map Metadata Interpretation

## Purpose

Interpret build-related metadata already visible in an authorized browser without retrieving, decoding, or expanding referenced artifacts.

## Preconditions

- The artifact is in scope and recorded with provenance.
- Metadata is visible in an already delivered artifact, page markup, or browser tooling.
- The engagement permits recording the relevant non-sensitive metadata.

## Method

Record observed filename patterns, script attributes, content type, cache validators, integrity attributes, and any declared source-map reference as metadata only. Note a build marker only when it is directly visible. Do not fetch source maps, request additional chunks, decode mappings, reconstruct source, or enumerate framework manifests.

## Interpretation and Scope Controls

A source-map reference indicates only that a reference was declared; it does not establish that the map is accessible, current, in scope, or contains source code. Filenames and framework markers can be transformed by CDNs, caches, proxies, and deployment tooling. Treat all version, framework, module, and source-location inferences as low-confidence interpretations until corroborated by approved evidence.

## Stop and Redaction

Do not preserve embedded source content, local paths, user identifiers, credentials, or configuration values. If visible metadata itself is sensitive or exceeds scope, stop collection, retain a minimal category-level note, and follow the [sensitive-data controls](sensitive-data-handling.md).

## Evidence and Handoff

Link each metadata observation to its artifact-inventory row and timestamp. State what was directly observed, what was inferred, and whether follow-up would require authorization. Use the [handoff template](../assets/recon-handoff-template.md).

## Sources

- [Source Map Revision 3 Proposal](https://sourcemaps.info/spec.html)
- [MDN: Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity)
