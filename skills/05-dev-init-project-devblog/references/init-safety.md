# Initialization Safety

## Why a Linked Worktree

A developer may have dirty work on the primary branch.

A linked orphan worktree allows `gh-pages` to start empty without switching or clearing the primary
worktree.

Never use force flags to bypass Git's worktree protections.

## Existing Branch

Initialization is not an update workflow.

If `gh-pages` already exists locally or remotely:

- do not reset it;
- do not create a replacement orphan branch;
- report `ALREADY_INITIALIZED`.

A future dedicated devblog-maintenance workflow can own updates.

## Main Worktree

Never:

- stash;
- reset;
- clean;
- checkout files;
- switch branches;
- alter index state

in the main developer worktree.

## Publishing

This skill ends with a local commit.

It does not:

- push `gh-pages`;
- configure Pages repository settings;
- create a remote;
- create a GitHub repository;
- configure a custom domain.

Those are separate explicit external actions.
