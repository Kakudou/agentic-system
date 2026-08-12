# Graph Validation

## Overview

- descriptor is valid `ObsidianVaultOverview/v1`;
- requested/default vault was resolved by the overview skill;
- no hardcoded fallback entered the proposal;
- all required semantic selectors are configured.

## Scope

- target is exactly `<vault_root>/<config_root>/graph.json`;
- normalized target stays beneath `vault_root`;
- Graph View is closed;
- no alternate root entered the proposal.

## Current State

- target exists;
- current bytes came from the literal target;
- current JSON parses;
- no directory creation is required.

## Proposal

- only requested supported fields changed;
- no unrequested field changed;
- no group/path/tag came from vault crawling;
- semantic paths came only from the overview;
- template evidence came only from exact overview-resolved files;
- untouched values are preserved;
- final bytes exist and parse;
- exact changed fields and diff are available.

## Inventory

- finite and ordered;
- every future manifest file is already closed;
- no discovery remains;
- formal limits can be respected.

## Execution Boundary

Before activation, no write, move, temp file, command, test, Git operation, or external
communication may have occurred.

## Reporting

Proposal says execution has not occurred.

Successful execution is reported only from `FormalWorkflowReceipt/v1`.

After success, remind controller to reopen Graph View.
