# Proposal and Mutation Boundary

The proposal is a complete, reviewable future Graph View configuration. It is not authorization by itself.

## Bounded Inputs

Accept concrete requests such as:

- literal search expression;
- search reset;
- finite explicit color groups;
- overview-resolved semantic roots/groups;
- explicit supported display values;
- explicit supported force values.

Reject unbounded discovery requests such as:

- "scan the vault and pick good groups";
- "discover my projects";
- "organize everything intelligently";
- "find all useful tags".

Those require a different retrieval/discovery capability.

## Proposal

Build the proposed complete JSON object from the current parsed object.

Record the exact changed fields and their old/new values. Preserve every untouched value.

## Approval Boundary

Before mutation:

1. show the exact field-level diff;
2. state the literal target file;
3. obtain explicit approval;
4. re-read the target before writing;
5. stop if current state drifted from the proposal basis.

The write must not reinterpret the proposal or choose additional changes.
