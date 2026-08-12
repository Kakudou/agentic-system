# Lifecycle and Supersession

The canonical template exposes these lifecycle states:

- `draft`
- `accepted`
- `superseded`
- `revoked`

Follow repository authority for state transitions. Do not mark a law accepted merely because this
skill created it unless the workflow explicitly grants that authority.

## Update Existing Law

Update an existing law instead of creating a new one when:

- the governing rule remains the same;
- scope or examples need clarification;
- implementation evidence has evolved without changing the rule;
- mutation triggers or resources need maintenance.

Record the mutation in the caller result.

## Supersede

Create a new law when the governing rule itself changes materially and historical continuity matters.

When law B supersedes law A:

1. set law A `status` to `superseded`;
2. set law A `superseded_by` to law B's identifier;
3. set law B `supersedes` to law A's identifier;
4. state the relationship in law B's body where context makes it useful;
5. return law B in `laws_written`;
6. return law A in `laws_updated`.

The relationship must be reciprocal.

## Revoke

Use `revoked` when a law no longer governs and no replacement law takes its place.

Do not use supersession merely to archive an obsolete statement with no successor.

## Conflicting Existing Laws

If two accepted laws conflict and the available evidence does not establish which one governs:

- do not invent a resolution;
- return a blocked result;
- identify both records and the unresolved conflict.

## Mutation Trigger

Every useful law explains when it should be questioned.

Mutation triggers should describe changes in assumptions, environment, scale, interfaces, risk, or
requirements that would make the rule no longer appropriate.

Avoid vague triggers such as "when requirements change."
