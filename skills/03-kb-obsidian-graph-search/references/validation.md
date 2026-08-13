# Graph Validation

## Configuration

- requested/default vault resolved through the overview;
- no hardcoded fallback entered the operation;
- every required semantic selector is configured.

## Scope

- target is exactly `<vault_root>/<config_root>/graph.json`;
- normalized target remains beneath `vault_root`;
- no alternate root or directory creation entered the operation.

## Current State

- target exists as a regular file;
- current JSON parses before mutation;
- the approved proposal is based on the current state or mutation is stopped for drift.

## Proposal

- only requested supported fields change;
- semantic paths come only from overview configuration;
- untouched values are preserved;
- final proposed JSON parses;
- exact changed fields are visible before approval.

## Execution

- no mutation occurred before explicit approval;
- the applied object equals the approved proposal;
- no temp file, Git operation, unrelated vault file, or external side effect was introduced.

## Read-Back

After write:

- file can be read;
- JSON parses;
- approved changed fields match;
- untouched fields still match the pre-write object;
- no additional field changed.

Only successful read-back verification supports a success claim.
