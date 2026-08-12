---
name: 01-doc-law-extractor
description: "Evaluate completed or implemented work for durable engineering laws, then create, update, supersede, or explicitly decline law records from actual repository evidence. Use after feature work, review, or acceptance when architecture, interfaces, dependencies, persistence, security, performance, or cross-cutting conventions may have established a reusable rule future work must follow."
metadata:
  version: 1.0
  opencode/slash: "true"
---

# Doc - Law Extractor

Evaluate whether completed work forged a durable law the repository should preserve. If it did,
write or update the appropriate law records. If it did not, return explicit no-law reasoning.

A law is **normative and reusable**. It captures a rule, boundary, convention, or governing choice
that future work is expected to respect. It is not a changelog entry, implementation summary, or
ceremonial record of every feature.

This skill is optional post-close work unless an approved acceptance contract explicitly requires
law evidence. It does not create another delivery phase.

## Usage

`/01-doc-law-extractor {feature-name}`

When no feature name is supplied, evaluate the completed or available work in the current context.

## Canonical Resources

Always read:

- [Law trigger policy](references/law-trigger-policy.md)
- [Evidence contract](references/evidence-contract.md)

Read when needed:

- [Identifier and storage](references/identifier-and-storage.md) before creating a new law.
- [Lifecycle and supersession](references/lifecycle-and-supersession.md) when an existing law is
  affected, contradicted, replaced, revoked, or superseded.
- [Law writing guide](references/law-writing-guide.md) before drafting a law body.
- [Migration notes](references/migration-from-decisions.md) when updating callers, paths, schemas,
  or older records that still use the previous decision terminology.

Use:

- [Canonical law template](assets/law-template.md) for every new law.
- [Result schema](assets/law-result-schema.yaml) for the caller-facing result.

## Hard Rules

- MUST evaluate law worthiness explicitly. Never silently skip the evaluation.
- NEVER create a law merely because work was completed.
- NEVER create a law merely because a dependency, interface, or implementation detail exists.
- NEVER invent rationale, alternatives, tradeoffs, incidents, constraints, or lessons.
- MUST ground every material law statement in repository or workflow evidence.
- MUST return either one or more law changes or non-empty `no_law_reasoning`.
- MUST inspect relevant existing laws before creating a potentially overlapping law.
- MUST keep one law centered on one quotable governing rule.
- MUST preserve the canonical law template's frontmatter keys and section order.
- MUST use `law` terminology in current outputs and paths. Do not emit the retired decision schema.
- Fuhyō executes this skill atomically. Hisha owns broader narrative documentation outside this
  skill's scope.

## Workflow

### 1. Reconstruct what actually happened

Inspect the strongest available evidence for the completed work: behavior contracts, implementation,
tests, review findings, operational evidence, and relevant existing laws.

Do not infer a law from a feature name or completion status alone.

### 2. Evaluate law worthiness

Apply the trigger policy.

A candidate law must describe a durable rule future work should obey, not merely a local fact about
the current implementation.

Classify each candidate as:

- `LAW_REQUIRED`
- `LAW_UPDATE_REQUIRED`
- `LAW_SUPERSESSION_REQUIRED`
- `NO_LAW`

### 3. Resolve overlap with existing laws

Before creating a new law, search the canonical law directory for:

- the same rule stated differently;
- a broader law that already governs the case;
- a conflicting or obsolete law;
- a law that should be amended rather than duplicated.

Prefer updating the governing law over creating near-duplicates.

### 4. Create or mutate records

For a new law:

1. allocate the next identifier using the identifier reference;
2. instantiate `assets/law-template.md`;
3. populate only evidence-supported content;
4. preserve the template's structure;
5. include a concrete mutation trigger;
6. write the record to the canonical law directory.

For changes to existing laws, follow the lifecycle and supersession reference.

### 5. Validate

Before returning success, verify:

- every law has a single clear governing statement;
- every factual or historical claim is supported;
- no alternative or lesson was invented;
- the law is durable beyond the feature that caused it;
- overlapping existing laws were checked;
- supersession metadata is reciprocal when applicable;
- identifiers and paths are valid;
- the canonical template structure is preserved;
- caller result matches `assets/law-result-schema.yaml`.

If no candidate survives validation, return `law_required: false` with non-empty reasoning.

## Output

Return only the structured result required by `assets/law-result-schema.yaml`, plus concise error
context when execution is blocked.

Do not paste full law bodies into the caller result unless explicitly requested.
