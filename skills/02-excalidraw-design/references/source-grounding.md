# Source Grounding

Use this reference during `GROUND` and `MODEL`.

The board must be a transformation of evidence, not an aesthetic guess.

## Truth hierarchy

Use information in this order:

1. Explicit user instructions
2. User-provided sources
3. Inspected project files or existing Excalidraw scenes
4. Authoritative sources deliberately retrieved for the task
5. High-confidence general knowledge, only when the request permits knowledge-assisted work

User instructions control objective and style. Source evidence controls factual content.

When sources conflict, preserve the conflict or ask a focused question. Do not silently select the version that produces the easiest diagram.

## Evidence ledger

Maintain an internal ledger:

| Item | Evidence | Class | Confidence | Board use |
|---|---|---|---|---|
| Claim, entity, or relationship | File/section/path or user statement | explicit / derived / uncertain | high / medium / low | node / edge / note / omitted |

Definitions:

- **Explicit**: directly stated or directly visible in inspected material.
- **Derived**: follows from explicit evidence through a short, defensible inference.
- **Uncertain**: plausible but not established, ambiguous, contradicted, or incomplete.

Rules:

- Ordinary nodes and edges may use `explicit` and defensible `derived` content.
- `Uncertain` content must be visibly qualified or omitted.
- Never convert absence of evidence into a negative fact.
- Never create a connector because two concepts appear near each other.
- Preserve conditions, exceptions, scope, directionality, and uncertainty when summarizing.

## Arbitrary-source inspection

The user may provide prose, documentation, folders, code, data, existing diagrams, images, or mixed material.

Inspect according to relevance, not file count.

### Folder and repository protocol

1. Inventory the relevant path.
2. Identify likely entry points: README, index, manifest, table of contents, architecture docs, source entrypoints, configuration, tests, or domain glossaries.
3. Search for the user's key concepts and terminology.
4. Read the smallest set of files that establishes the model.
5. Follow references only when they can materially change the board.
6. Ignore generated output, caches, vendor trees, binaries, and duplicate exports unless explicitly relevant.
7. Record what was inspected, used, and excluded.

Do not claim to have analyzed an entire repository when only a subset was inspected.

### Existing Excalidraw scenes

Inspect:

- frames and their names
- element IDs and types
- established color and shape semantics
- bindings and connector direction
- repeated entities
- hidden/deleted elements when relevant
- current defects versus intentional irregularity

Preserve unknown fields and stable IDs during edits.

## Domain safeguards

### Code and architecture

- Represent only inspected components.
- Verify imports, calls, dependencies, protocols, and data flow before drawing edges.
- Distinguish runtime flow from build-time dependency and deployment topology.
- Do not infer a service merely from a directory name.
- Mark planned or hypothetical architecture as such.

### Books and long-form material

- Separate author claims, narrative events, themes, and interpretation.
- Preserve chapter or chronology only when it matters.
- Do not present interpretation as canon.
- Quote only when the exact wording is supplied or verified.

### Science and chemistry

- Preserve notation, units, stoichiometry, directionality, conditions, and phase/state.
- Do not fabricate mechanisms, values, or causal claims.
- Distinguish simplified teaching models from precise scientific representation.
- Use uncertainty and assumptions visibly.

### RPG and worldbuilding

- Separate supplied canon, system rules, character knowledge, rumors, and interpretation.
- Preserve faction perspective and chronology where relevant.
- Do not normalize deliberate contradictions unless asked.
- Label speculative connections.

### Security and threat modeling

- Separate assets, identities, trust boundaries, controls, threats, and attack paths.
- Do not claim exploitability without evidence.
- Mark hypothetical paths and assumptions.
- Never expose secrets found in source material unless the user explicitly requires them in the artifact.

## Summarization discipline

A visual summary may compress wording, not meaning.

For every compression, preserve:

- the subject
- the action or relationship
- direction
- conditions
- exceptions
- uncertainty
- domain terminology that carries technical meaning

Prefer several precise short labels over one misleading sentence.

## Clarification threshold

Ask a question only when one of these is true:

- two plausible objectives would produce materially different boards
- the intended audience changes the required abstraction
- contradictory sources cannot coexist honestly
- sensitive or secret content may be exposed
- the requested scope cannot fit any usable artifact
- a required file/path cannot be accessed

Otherwise state assumptions and continue.

Maximum: three focused questions in one turn.
