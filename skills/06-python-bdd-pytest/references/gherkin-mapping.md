# Gherkin to pytest Mapping

Gherkin describes behavior. pytest executes the same behavior without a Gherkin runtime.

## Feature

A `Feature` normally maps to a focused test module or coherent group of test modules. Do not force one file when the repository already organizes tests differently.

## Scenario

One scenario maps to one test function.

Example:

```gherkin
Scenario: Reject an already-used email
  Given an account exists with email "alice@example.test"
  When another account is created with that email
  Then the creation is rejected as a duplicate
```

Preferred shape:

```python
# Scenario: Reject an already-used email
def test_rejects_an_already_used_email(account_factory):
    # Given an account exists with email "alice@example.test"
    existing = _given_account_with_email(account_factory, "alice@example.test")

    # When another account is created with that email
    result = _when_account_is_created_with_email(existing.email)

    # Then the creation is rejected as a duplicate
    _then_creation_is_rejected_as_duplicate(result)
```

The exact API calls belong inside helpers and follow the real public surface.

## Given

Map meaningful preconditions to `_given_*`.

A Given may create domain state, configure an accepted dependency response, establish authorization context, or construct valid input. Do not perform the action under test in Given.

## When

Map the trigger/action to `_when_*`. Usually there is one primary `_when_*` per scenario.

## Then

Map each observable outcome to `_then_*` with real assertions: result, exception, persisted state, emitted event, external interaction, or absence of a forbidden side effect.

Do not assert private intermediary state merely because it is convenient.

## And / But

Attach `And` or `But` to the semantic phase it extends.

## Scenario Outline

Use `pytest.mark.parametrize` and map `Examples` rows to parameter rows. Preserve readable IDs when useful.

## Background

Translate Background into a fixture or shared `_given_*` only when at least two scenarios truly share it. Do not hide scenario-specific setup in broad fixtures.

## Constraints

Scenarios under `# ---- Constraints identified ----` are normal executable tests. Their special status is conceptual, not optional.
