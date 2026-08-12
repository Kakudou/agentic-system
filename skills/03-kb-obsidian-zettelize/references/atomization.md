# Atomization and Genericization

## Atomize by Idea, Not Sentence

One sentence may contain several ideas. Several sentences may support one idea.

A candidate is atomic when it can be titled as one idea and changed independently of neighboring
candidates.

## ZETTEL_GRADE

Use for durable knowledge such as claims, definitions, rules, constraints, relationships, causal
explanations, procedures, architectural principles, decision logic, reusable examples, and
exceptions.

## DECORATION

Use only when a unit has no independent durable knowledge: transition, rhetorical framing, repeated
restatement, layout glue, or anecdotal flourish.

If removing the unit changes what the source teaches, it was not decoration.

## STRUCTURE

Title, heading hierarchy, ordering, table layout, list grouping, separators.

Preserve in reconstruction, but do not zettelize by itself.

## Genericization Test

Ask:

> What remains true if I remove the current project's/business's proper nouns and incidental local
> implementation details?

The result must still preserve the source's core semantics.

### Good

Source-bound:

> ConnectorFlow retries timed-out OCTI writes with an idempotency key to prevent duplicates.

Generic:

> Retryable writes should carry an idempotency key when duplicate side effects are unsafe.

Derived:

> ConnectorFlow applies that rule to timed-out OCTI writes.

### Bad

Source:

> GDPR Article 17 establishes a right to erasure under defined conditions.

Bad genericization:

> Rules sometimes let people delete things.

That destroys the knowledge. Keep it domain-bound unless a genuinely useful source-supported generic
principle exists.

## Preserve Modality

Do not change must/should/may, always/usually, causal/correlated, guaranteed/likely, or exception
scope while genericizing.
