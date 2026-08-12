# Evidence and Severity

Severity describes **material consequence**, not emotional intensity.

## Severity levels

### CRITICAL

A demonstrated issue means the submission cannot safely or successfully fulfill a core stated purpose, violates a non-negotiable constraint, causes severe harm, or makes the central approach untenable.

Examples:
- exploitable authentication bypass in a security-sensitive service,
- central factual premise disproven,
- required output cannot be produced,
- unsafe procedure with credible severe consequence.

### MAJOR

A material requirement, quality dimension, structural property, or intended use is substantially deficient, but the core approach remains repairable.

Examples:
- architecture cannot support a stated required workflow,
- report omits a required evidentiary section,
- UX blocks an important user path,
- plan ignores a dependency that makes the timeline infeasible.

### MINOR

A real defect exists but has limited impact and does not undermine the core result.

Examples:
- inconsistent naming,
- localized redundancy,
- weak transition,
- small usability friction.

### NOTE

An observation, preference, opportunity, question, or stretch idea without demonstrated material defect.

A NOTE must never be presented as blocking.

## Finding contract

Every CRITICAL or MAJOR finding must identify:

- **Claim** — what is wrong.
- **Evidence** — concrete observation, test, requirement, reference, or reasoning chain.
- **Consequence** — why it materially matters.
- **Confidence** — high / medium / low.

MINOR findings should include evidence when practical. NOTES may be lighter but must remain clearly non-blocking.

Recommended shape:

```yaml
seat: Keima
severity: major
claim: Retry behavior can duplicate a transaction.
evidence: The operation retries after timeout without an idempotency key.
consequence: A timed-out successful write can be executed twice.
confidence: high
```

## Evidence classes

Prefer, roughly in this order:

1. **Verified result** — test, measurement, runtime behavior, authoritative fact.
2. **Direct artifact observation** — visible behavior, explicit text/code/structure.
3. **Explicit requirement/reference** — documented bar, constraint, standard, rubric.
4. **Strong inference** — reasoning whose premises are supported.
5. **Domain convention** — accepted pattern or practice relevant to the goal.
6. **Preference** — taste, stylistic inclination, optional alternative.

Higher-ranked evidence does not automatically win if it is irrelevant; relevance and materiality still matter.

## Unverified claims

Use `UNVERIFIED` when a material judgment depends on evidence that is absent or inaccessible.

Do not transform:

> “I cannot test whether this handles 10k requests/sec.”

into:

> “Performance is bad.”

Instead say the performance claim is unverified and state what evidence would resolve it.

## Evidence hygiene

- Do not cite tests that were not run.
- Do not claim an external standard says something unless it was actually consulted or supplied.
- Do not treat the author's explanation as proof of artifact behavior.
- Prefer inspecting the artifact over trusting a description of it.
- Distinguish direct evidence from inference.
