---
name: 05-dev-dual-code-review
description: "Run two genuinely independent expert reviews of the same bounded code scope in parallel: one through 05-dev-code-review and one fresh-context review orchestrated by Kakugyō. Seal both before cross-exposure, then evidence-adjudicate agreements, unique findings, and conflicts into one merged DualCodeReview/v1."
metadata:
  version: 1.0
  opencode/slash: "true'
---

# Dual Expert Code Review

Use two independent eyes, then reconcile by evidence.

The value comes from **independence before comparison**.

```text
                 same scope snapshot
                 /               \
                /                 \
05-dev-code-review         Kakugyō-orchestrated
      Arm A                  expert Arm B
                \                 /
                 \               /
                  sealed reviews
                       ↓
                 adjudicated merge
```

## Usage

`/05-dev-dual-code-review {scope}`

## Load Order

Always read:

- [Independence protocol](references/independence.md)
- [Merge and adjudication](references/merge.md)

Use [Dual review schema](assets/dual-review-schema.yaml).

## Hard Rules

- Both arms review the same bounded scope and repository state.
- Start both arms before either review is exposed to the other.
- Arm B must not receive Arm A's findings, verdict, framing, or severity choices.
- Arm A must not receive Arm B's work.
- Both arms remain read-only.
- Do not count agreement as proof; evidence remains authoritative.
- Do not discard a unique finding merely because only one arm found it.
- Do not preserve a finding merely because both arms repeated the same unsupported assumption.
- Merge duplicate findings into one stronger finding.
- Preserve unresolved reviewer disagreement explicitly.

## Arm A — Canonical Review

Invoke `05-dev-code-review` on the exact bounded scope.

Require a complete `CodeReview/v1`.

Seal it.

## Arm B — Independent Kakugyō Review

In parallel, Kakugyō orchestrates a fresh expert review using the same scope snapshot.

The second arm:

- receives the code/diff/repository evidence needed to review;
- does not receive Arm A output;
- challenges behavior-critical paths independently;
- returns the same finding fields used by `CodeReview/v1`;
- records its own verdict and coverage limits.

Kakugyō may delegate read-only repository evidence gathering, but must preserve reviewer independence.

Seal Arm B before comparison begins.

## Reconciliation

Only after both reviews are sealed:

1. normalize equivalent findings;
2. group agreements;
3. preserve evidence-backed unique findings;
4. identify contradictions;
5. adjudicate each contradiction against code/test/config evidence;
6. merge severity/confidence to what the evidence justifies;
7. derive one final verdict.

Follow `references/merge.md`.

## Final Verdict

Use the same verdict vocabulary:

- `APPROVE`
- `APPROVE_WITH_NOTES`
- `CHANGES_REQUIRED`
- `BLOCK`

The final verdict is not a vote.

One well-evidenced critical defect can override an approving second review.

## Output

Return one `DualCodeReview/v1`.

The user should see the merged review first, not two giant duplicated reports.

Keep provenance per finding so it remains visible whether a finding was:

- found by both;
- unique to Arm A;
- unique to Arm B;
- disputed then resolved;
- disputed and unresolved.
