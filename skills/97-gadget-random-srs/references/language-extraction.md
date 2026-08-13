# Language Extraction

The drop teaches language through concepts already present in the main response.

It does not need the main response itself to have already contained Japanese or German.

## Candidate Selection

Prefer:

- concrete nouns;
- useful verbs;
- compact idiomatic phrases;
- domain-relevant terms;
- one grammar construction that naturally fits the contextual examples.

Avoid:

- obscure words chosen only because they are exotic;
- proper nouns unless linguistically useful;
- vocabulary unrelated to the response;
- ten near-synonyms for the same concept.

## Japanese

For each item, provide only what is known confidently:

- Japanese spelling;
- reading when useful;
- concise English meaning;
- short contextual sentence;
- English translation.

Pitch accent is optional and should be omitted unless reliably known.

Do not fabricate readings.

## German

For nouns, include article when useful.

For verbs/phrases, give the useful dictionary/base form.

Provide:

- German item;
- concise English meaning;
- short contextual sentence;
- English translation.

Explain grammar only when the example genuinely demonstrates it.

## Grammar

Maximum one grammar point.

A grammar explanation should answer:

> What reusable construction is the learner seeing here?

Do not turn ordinary inflection into a grand grammar lesson when it adds no value.

## Context Fidelity

The target-language example may translate or naturally rephrase a concept from the main response.

It must not introduce a new factual claim.

Example:

Main response:

```text
The retry is safe because duplicate writes are prevented.
```

Valid German learning example:

```text
Der erneute Versuch verhindert doppelte Schreibvorgänge.
```

The language changes; the factual content does not.

## Duplicate Items

Within one invocation, teach an item only once.
