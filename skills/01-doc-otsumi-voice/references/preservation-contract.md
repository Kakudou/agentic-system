# Preservation Contract

This reference defines what "voice only" means.

The rewrite is allowed to change expression. It is not allowed to change the document's semantic or
structural contract.

## Structural Invariants

Preserve:

- section order;
- heading levels;
- heading count;
- paragraph-to-section ownership;
- list count;
- list item count;
- list item order;
- list nesting;
- table row and column structure;
- blockquote placement;
- code-block placement;
- horizontal-rule placement;
- frontmatter shape;
- link and citation placement where moving them could change meaning.

Do not introduce new structural elements.

### Heading Text

Natural-language heading wording may receive a voice treatment only when all of the following hold:

- its semantic meaning remains identical;
- it is not a stable identifier, API name, file name, command, schema field, anchor contract, or
  externally referenced title;
- changing it does not break links, automation, documentation references, or user constraints.

When uncertain, preserve heading text exactly.

## Immutable Technical Material

Preserve exactly unless the user explicitly requests modification:

- fenced code;
- inline code;
- commands and flags;
- file and directory paths;
- URLs and link destinations;
- citation targets;
- identifiers;
- API names;
- class, function, variable, field, and schema names;
- configuration keys and literal values;
- version numbers;
- hashes;
- dates;
- numeric values;
- units;
- quoted text attributed to another source;
- YAML/frontmatter keys and machine-consumed values;
- Gherkin keywords and technical examples where wording is executable or contract-bearing.

Surrounding prose may change.

## Semantic Invariants

Every source claim must survive with the same:

- truth conditions;
- scope;
- subject;
- object;
- modality;
- certainty;
- negation;
- exception;
- dependency;
- causal relationship;
- temporal relationship.

Be especially careful with words such as:

- must;
- should;
- may;
- can;
- never;
- always;
- only;
- optional;
- required;
- recommended;
- possible;
- proven;
- likely.

Voice transfer must not silently strengthen or weaken these.

## Stance

Preserve the source's stance.

If the source is already angry, skeptical, approving, dismissive, urgent, or confident, Ōtsumi may
express that stance more sharply.

If the source is neutral, do not invent hostility, praise, sarcasm, or a new verdict. Strong Ōtsumi
voice can come from precision, rhythm, directness, and diction without adding a new opinion.

## Examples and Metaphors

Do not invent substantive examples.

A figurative phrase is allowed only when it:

- does not introduce a new factual proposition;
- does not imply a new requirement;
- does not alter the source's stance;
- remains obviously rhetorical.

When in doubt, keep the expression concrete.

## Preservation Test

For every rewritten span, ask:

1. Could a reasonable reader infer a new fact?
2. Could a reasonable reader miss a fact that was present?
3. Did certainty, obligation, or scope move?
4. Did any technical literal change?
5. Did the span move to a different structural role?

Any `yes` is a defect.
