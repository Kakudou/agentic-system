# Reconstruction and Coverage

Reconstruction is the acceptance test for decomposition.

## Goal

Rebuild the source's informational shape primarily from derived/domain-bound zettel embeds.

A reader expanding the embeds should recover almost all substantive source content.

## Preserve

- source title;
- section hierarchy;
- ordering;
- important tables;
- code;
- quotes;
- examples;
- warnings;
- citations.

Replace substantive prose with embeds when that knowledge is now represented by zettels.

## Decoration Budget

Decoration may include headings, short transitions, formatting, non-durable local detail, and
literal code/quote/table material better preserved than atomized.

Decoration must not carry an unzettelized durable claim.

## Coverage States

- `COVERED_GENERIC_DERIVED`
- `COVERED_DOMAIN_BOUND`
- `DECORATION_JUSTIFIED`
- `STRUCTURE_PRESERVED`
- `UNMAPPED`
- `CONFLICT`

## Default Coverage Bar

For substantive units:

```text
mapped substantive units / total substantive units >= 0.95
```

Also require:

- 100% coverage of critical/normative/technical/exception units;
- zero unexplained omissions;
- zero invented claims.

The 95% floor is not permission to omit meaningful content. Small sources may effectively require
100%.

## Semantic Equivalence Check

Conceptually expand the embeds and compare source vs reconstruction for facts, definitions, rules,
relationships, causality, caveats, exceptions, material examples, technical literals, and meaningful
order.

If reconstruction feels materially thinner, assume missing zettels until proven otherwise.

## Failure Loop

List uncovered units, re-atomize them, create/reuse/update missing candidates, rebuild, and recheck.
Never lower the threshold to manufacture a pass.
