# Identifier and Storage

## Canonical Directory

Current law records live under:

`docs/laws/`

Do not create new records under the retired `docs/decisions/` path.

## Identifier

Use:

`003.XXX.<law-name>.law`

File path:

`docs/laws/003.XXX.<law-name>.law.md`

Where:

- `003` is the law document family;
- `XXX` is a zero-padded three-digit sequence;
- `<law-name>` is a concise lowercase kebab-case slug describing the governing rule.

Example:

`003.013.api-errors-use-problem-details.law`

## Allocating XXX

Before creating a law:

1. scan `docs/laws/` for existing `003.*.law.md` records;
2. parse valid numeric sequence components;
3. select the highest existing sequence;
4. allocate the next integer;
5. zero-pad to three digits;
6. verify the target path does not already exist immediately before writing.

Ignore malformed filenames when calculating the maximum, but report them if they make allocation
ambiguous.

Never guess the next index from conversation context.

## Naming

The slug should describe the rule, not the feature that exposed it.

Prefer:

`api-errors-use-problem-details`

Avoid:

`feature-123-cleanup`

Keep the slug stable across later wording edits unless repository policy explicitly supports renames.

## Multiple New Laws

When one invocation creates multiple laws:

1. determine the starting next index once;
2. assign consecutive identifiers deterministically;
3. verify all target paths before writing any of them.

If a collision appears, rescan before continuing.
