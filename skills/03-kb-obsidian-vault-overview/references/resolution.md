# Resolution Rules

Use these rules when a consumer needs concrete configured locations.

## Vault Selection

1. If a known `vault-id` is supplied, select that exact registry entry.
2. Otherwise select `default_vault`.
3. Unknown IDs fail closed.

## Named Root

Given `root:<name>`:

1. read `named_roots.<name>`;
2. if missing, return `UNKNOWN_ROOT`;
3. if `null`, return `UNCONFIGURED_ROOT`;
4. otherwise return the configured absolute path exactly.

Do not search for a similarly named directory.

## Root Group

Given `root-group:<name>`:

1. read `root_groups.<name>`;
2. fail if the group is unknown;
3. resolve each member through the named-root rule;
4. if any required member is unconfigured, report the exact member rather than guessing.

## Template

Given `template:<name>`:

1. read `templates.<name>`;
2. if missing, return `UNKNOWN_TEMPLATE`;
3. if `null`, return `UNCONFIGURED_TEMPLATE`;
4. otherwise resolve the vault-relative path beneath `vault_root`.

A consumer needing template semantics must read the actual configured template. The overview never
guesses frontmatter from the template name.

## Vault-Relative Conversion

A consumer may convert a configured absolute named root into a vault-relative path only when:

- the root is lexically beneath `vault_root`;
- path normalization does not escape `vault_root`.

If containment fails, return a configuration error.

This conversion is especially useful for Obsidian query syntax such as `path:<relative-root>`.

## No Existence Claim

Resolution returns configured identity. It does not imply that the file or directory currently
exists. A consumer that needs existence evidence must check the literal resolved target within its
own contract.
