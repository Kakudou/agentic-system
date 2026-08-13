---
name: 05-dev-dual-code-review
description: "Run two genuinely independent expert reviews of the same bounded code scope, seal both before cross-exposure, then reconcile agreements, unique findings, and conflicts by evidence into one merged review. Use when a single review is not enough and independent second eyes materially improve confidence."
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Dual Expert Code Review

Use two independent eyes, then reconcile by evidence.

The value comes from **independence before comparison**.

## Usage

`/05-dev-dual-code-review {scope}`

## Review Capability

Each arm must perform the same expert-review discipline defined by `05-dev-code-review` or an equivalent independent review capability.

The two reviewers/contexts must be independent until both reviews are sealed.

## Load Order

- [independence protocol](references/independence.md)
- [merge and adjudication](references/merge.md)

## Hard Rules

- Both arms review the same bounded scope and repository state.
- Start both arms without exposing either review to the other.
- Neither arm receives the other's findings, verdict, framing, severity choices, or omissions before sealing.
- Both arms remain read-only.
- Agreement is not proof; evidence remains authoritative.
- Preserve a unique finding when its evidence holds.
- Discard unsupported assumptions even when both reviewers repeat them.
- Merge duplicate findings into one stronger finding.
- Preserve unresolved reviewer disagreement explicitly.

## Workflow

### 1. Freeze Shared Inputs

Give both arms the same:

- scope;
- repository/diff state;
- relevant source/tests/config;
- applicable review bar.

### 2. Run Two Independent Reviews

Run the two reviews separately.

At least one arm should use the canonical `05-dev-code-review` procedure when it is available. The second arm must start from fresh context rather than the first review.

Seal each complete review before comparison.

### 3. Reconcile

Only after both are sealed:

1. normalize equivalent findings;
2. group genuine agreements;
3. preserve evidence-backed unique findings;
4. identify contradictions;
5. adjudicate contradictions against code/test/config evidence;
6. assign final severity/confidence from evidence;
7. derive one final verdict.

Follow [merge and adjudication](references/merge.md).

## Final Verdict

Use:

- `APPROVE`
- `APPROVE_WITH_NOTES`
- `CHANGES_REQUIRED`
- `BLOCK`

The verdict is not a vote. One well-evidenced critical defect can override an approving second review.

## Output

Present the merged review first, not two duplicated full reports.

For each retained finding state provenance as:

- both reviews;
- review A only;
- review B only;
- disputed then resolved;
- disputed and unresolved.

Include a compact disagreement section and residual risks when relevant.

Do not require another skill's versioned output fields; reconcile findings by their semantic content and evidence.
