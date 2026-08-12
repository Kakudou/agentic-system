# Knowledge Model

The corpus uses three knowledge layers plus one proof artifact.

## Generic Zettel

One reusable idea independent of incidental business context.

It should remain useful in another project without rewriting its core claim.

Rules:

- one atomic claim;
- natural reusable language;
- no unnecessary project/company/product names;
- no invented abstraction;
- source provenance retained;
- stable target for many derived zettels.

## Derived Zettel

Binds one generic idea to one concrete business/domain context.

```text
generic principle
      ↓
derived application A
derived application B
derived application C
```

The generic note's incoming links become the reuse graph. No reciprocal parent mutation is required.

Within the actual vault template:

- link the generic parent;
- embed `![[generic-parent]]` near the beginning;
- add only the domain-specific delta;
- preserve source provenance.

Do not duplicate the generic body.

## Intrinsically Domain-Bound Zettel

Some knowledge loses meaning when stripped of its domain, for example a literal law, exact protocol
field, historical fact, or product-specific command.

Do not create a vague generic parent just to preserve symmetry.

## Reconstruction Artifact

Not an atomic canonical zettel.

It is a source-shaped proof artifact composed primarily from derived/domain-bound embeds plus
non-zettel structure and decoration.

Its question is simple:

> If the source is rebuilt from the knowledge graph, did we lose anything important?

## Reuse Signal

Derived notes point to generic parents. Backlink fan-out therefore shows how broadly a generic idea
is reused without requiring counter writes or reciprocal links.
