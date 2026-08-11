# Source adapter contract

Every source adapter in this directory must use the same headings and semantics. The Markdown file is the adapter layer; there is no code interface.

## Required headings

Each `references/<source>.md` file contains, in this order:

1. `Purpose`
2. `When to use`
3. `Entity resolution`
4. `Preferred access`
5. `Fallback access`
6. `Query recipes`
7. `Evidence to extract`
8. `Freshness validation`
9. `Quality traps`
10. `Coverage semantics`

A section may say “none required” when genuinely not applicable, but should not be omitted.

## Adapter responsibilities

A source adapter must explain:

- what unique signal the source contributes
- when the source is worth the cost/context
- identities that must be resolved before searching
- the best host-native/direct way to reach the source
- safe fallback discovery strategies
- query shapes that work for that source
- which fields/metrics are legitimate evidence
- which date represents freshness
- known sampling/access/manipulation biases
- how to classify `covered`, `covered-no-results`, `partial`, or `unavailable`

## Adapter boundaries

Adapters must not:

- require package installation, credentials, local services, or bundled scripts
- assume a host has a capability that was not actually exposed
- promise complete platform coverage from ordinary web indexing
- treat snippets as full content
- invent metrics or historical deltas
- override the global requested time window
- define a universal numeric ranking score

## Maintenance rule

When a platform changes, update only its adapter unless the change alters a global evidence or coverage rule.

When adding a source:

1. create exactly one direct `references/<source>.md` adapter
2. follow this contract
3. add one row to `source-map.md`
4. add it to the relevant intent routes
5. add at least one scenario or assertion to `test-matrix.md` if it introduces a new evidence type or failure mode

Do not add a runtime merely because a source is difficult to access. Represent the limitation honestly through coverage semantics.
