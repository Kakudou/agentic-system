# Constraint Recovery

A constraint limits when or how otherwise valid behavior may occur.

## Observed Constraint Types

Use this closed vocabulary when possible:

- `invalid_input`
- `boundary`
- `security`
- `concurrency`
- `performance`
- `implicit_rule`
- `data_validation`
- `sequencing`
- `state_transition`
- `side_effect`

A constraint is `observed` only when source/tests/configuration encode it.

## Gap Types

Use:

- `undefined_failure`
- `partial_implementation`
- `implicit_precondition`
- `missing_boundary`
- `entangled_behavior`
- `side_effect_unspecified`
- `unreachable_code`
- `contradictory_behavior`

For each gap record:

- description;
- location;
- evidence;
- likely impact;
- recommendation:
  - `address_now`
  - `defer_to_trap_analysis`
  - `accept_undefined`

A recommendation is not a requirement.

## Important Distinction

Example:

```text
Code assumes account exists and dereferences it without validation.
```

This supports:

```text
gap: implicit_precondition
```

It does **not** support a Gherkin scenario claiming:

```text
Given the account exists ...
```

as an approved business rule unless the source/test contract establishes that requirement.
