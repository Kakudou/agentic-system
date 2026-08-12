# Evidence and Severity

Every finding must be auditable.

## Confidence

Use:

- `HIGH` — direct structural evidence or strong semantic equivalence;
- `MEDIUM` — evidence is meaningful but interpretation is required;
- `LOW` — plausible smell requiring human review.

Do not emit a low-confidence finding as a hard failure.

## Severity

Use:

### HIGH

Corpus integrity or meaning is at risk.

Examples:

- broken derived parent;
- malformed required template/frontmatter;
- conflicting duplicate canonical claims.

### MEDIUM

Reuse, maintainability, or conceptual integrity is materially degraded.

Examples:

- overloaded zettel;
- duplicate/near-duplicate ownership;
- generic contamination;
- strong missing-generic abstraction.

### LOW

Discoverability or graph quality could improve, but knowledge remains usable.

Examples:

- weak linkage;
- minor relationship smell.

## Evidence Requirements

A finding should include the smallest useful evidence.

Possible evidence:

- zettel titles/paths;
- exact frontmatter keys;
- small claim summaries;
- literal wikilinks;
- parent/derived relationship;
- short semantic comparison.

Do not dump entire zettel bodies.

## Semantic Findings

For `ZL001`, `ZL002`, `ZL003`, `ZL005`, and `ZL006`, explain the reasoning.

Example:

```text
ZL006 missing-generic-abstraction
Affected:
- [[Stripe retry protection]]
- [[OCTI retry protection]]
- [[Worker retry protection]]

Evidence:
All three independently state that retryable side effects must prevent duplicates.

Why it matters:
The reusable principle is repeated across domain-specific notes instead of existing once as a stable
generic parent.
```

## No Style Policing

The linter does not flag:

- voice;
- profanity;
- sentence length;
- paragraph rhythm;
- heading aesthetics;
- prose elegance.

Those are not corpus-health defects.
