# Fixtures and Boundaries

## Fixtures

Use fixtures for reusable environment/dependency setup, not to hide business behavior.

Good fixture candidates include database/session lifecycle, test client, fake clock, configured adapter, external client fake, or temporary filesystem root.

Scenario-specific business state usually belongs in `_given_*`.

## conftest.py

Use the repository's existing `conftest.py` structure when it already centralizes reusable fixtures.

Do not add placeholder fixtures with TODO patching. A fixture written during RED must be executable enough for the test to reach the intended behavioral failure.

## External Dependencies

Avoid real destructive/external effects. Use the project's established mechanism: fake adapter, stub server, monkeypatch, mock, dependency injection, or test container.

Do not over-mock the unit under test.

## Async

Follow existing async pytest conventions. Do not add a new async plugin merely because domain language is asynchronous.

## Time

Prefer a controllable clock/fake-time mechanism over wall-clock sleeps.

## Persistence

Assert the externally meaningful state transition. Do not merely assert that a repository method was called if the contract is about persisted state.
