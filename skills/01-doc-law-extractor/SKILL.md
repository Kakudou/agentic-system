---
name: 01-doc-law-extractor
description: "Evaluate completed or implemented work for durable engineering laws, then create, update, supersede, or explicitly decline law records from actual evidence. Use after meaningful work when architecture, interfaces, dependencies, persistence, security, performance, or cross-cutting conventions may have established a reusable rule future work should follow."
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Law Extractor

Evaluate whether completed work forged a durable law worth preserving. If it did, write or update the appropriate law record. If not, explain why no law is warranted.

A law is **normative and reusable**. It captures a rule, boundary, convention, or governing choice that future work is expected to respect. It is not a changelog entry or ceremonial record of every feature.

## Usage

`/01-doc-law-extractor {completed-work-or-feature}`

When no explicit source is supplied, use the completed or inspectable work in the current context.

## Resources

Always read:

- [Law trigger policy](references/law-trigger-policy.md)
- [Evidence contract](references/evidence-contract.md)

Read when needed:

- [Identifier and storage](references/identifier-and-storage.md) before creating a law.
- [Lifecycle and supersession](references/lifecycle-and-supersession.md) when an existing law is affected.
- [Law writing guide](references/law-writing-guide.md) before drafting a law body.

Use [law template](assets/law-template.md) for each new law unless the repository already defines an authoritative law template. When a repository template exists, it wins.

## Hard Rules

- Evaluate law worthiness explicitly; never create a law merely because work completed.
- Never create a law merely because an implementation detail exists.
- Never invent rationale, alternatives, tradeoffs, incidents, constraints, or lessons.
- Ground every material law statement in available evidence.
- Inspect relevant existing laws before creating a potentially overlapping law.
- Keep one law centered on one quotable governing rule.
- Prefer updating an existing governing law over creating a near-duplicate.
- Preserve the authoritative law template's frontmatter keys and section order.
- Use current `law` terminology for new records.
- Do not turn law extraction into broader narrative documentation.

## Workflow

### 1. Reconstruct the completed work

Inspect the strongest available evidence: accepted behavior, implementation, tests, review findings, operational evidence, and relevant existing laws.

Do not infer a law from a feature name or completion status alone.

### 2. Evaluate law worthiness

Apply [law trigger policy](references/law-trigger-policy.md).

Classify the result as one of:

- `LAW_REQUIRED`
- `LAW_UPDATE_REQUIRED`
- `LAW_SUPERSESSION_REQUIRED`
- `NO_LAW`
- `BLOCKED`

A candidate must describe a durable rule future work should obey, not a local fact about the current implementation.

### 3. Resolve overlap

Search the repository's law records for:

- the same rule stated differently;
- a broader law that already governs the case;
- a conflicting or obsolete law;
- a law that should be amended rather than duplicated.

### 4. Create or update records

For a new law:

1. allocate a collision-free identifier according to [identifier and storage](references/identifier-and-storage.md);
2. instantiate the authoritative law template;
3. populate only evidence-supported content;
4. preserve template structure;
5. include a concrete mutation trigger;
6. write the record to the configured/canonical law location.

For changes to existing laws, follow [lifecycle and supersession](references/lifecycle-and-supersession.md).

### 5. Validate

Before completion verify:

- one clear governing statement per law;
- every factual or historical claim is supported;
- no alternative or lesson was invented;
- the rule is durable beyond the feature that exposed it;
- overlapping laws were checked;
- supersession metadata is reciprocal when applicable;
- identifiers and paths are valid;
- template structure is preserved.

## Output

Return a concise human-readable result containing:

- classification;
- laws created, updated, or superseded, with paths;
- the governing rule/trigger for each affected law;
- non-empty reasoning when no law is required;
- blocker and missing evidence when the evaluation cannot complete.

Do not require a versioned result envelope solely for downstream orchestration.
