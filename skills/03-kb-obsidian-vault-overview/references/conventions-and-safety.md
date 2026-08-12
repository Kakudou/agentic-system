# Vault Conventions and Safety

These are stable conventions extracted from the configured vault contract.

## Content Model

- Raw notes are byte-for-byte evidence and are not rewritten or given frontmatter.
- Zettels are atomic notes: one idea per file.
- Resources curate and link existing zettels rather than inventing zettel-grade claims.
- The configured template registry is the source of truth for note-type structure and frontmatter.
- Template field casing must be preserved exactly.

## Template Discipline

Before a consumer searches, filters, links, generates, or edits a typed note, it should read the
relevant configured template when that task depends on template-defined fields.

Do not infer frontmatter keys from filenames or note-type names.

## Defaults

Configured defaults:

- `Author: カクドウ ~ Kakudou`
- `Lang: EN`
- dates: `YYYY/MM/DD HH:mm:ss`

These are defaults, not permission to overwrite explicit note values.

## Git and Encryption

The configured vault uses encrypted Git storage while the working tree is plaintext.

Vault work must not:

- push decrypted vault content;
- commit or transmit decrypted material unless a separate explicit workflow authorizes it;
- write outside `vault_root`.

## Submodules

Configured submodule roots must be disclosed when a mutation would touch them.

## Unconfigured Values

A `null` root or template remains unconfigured.

Consumers must return a configuration error rather than create or invent a replacement.
