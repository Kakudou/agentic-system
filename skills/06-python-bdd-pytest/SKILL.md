---
name: 06-python-bdd-pytest
description: "Implement approved Gherkin behavior as raw pytest tests using a raw pytest _given/_when/_then helper style. Use during Python BDD RED work to translate scenarios, outlines, backgrounds, and constraints into behavior-focused pytest without pytest-bdd, step-definition files, placeholder assertions, or implementation-coupled tests."
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Python BDD with pytest

Translate approved Gherkin into ordinary pytest.

The Gherkin is the behavior contract. Pytest is the executable representation.

Do **not** introduce `pytest-bdd`, runtime `.feature` bindings, or step-definition modules.

## Usage

`/06-python-bdd-pytest {approved-gherkin-or-scenario-scope}`

## Load Order

Always read:

- [Gherkin to pytest mapping](references/gherkin-mapping.md)
- [Test design rules](references/test-design.md)

When fixtures, external dependencies, or shared setup are involved, also read:

- [Fixtures and boundaries](references/fixtures-and-boundaries.md)

## Core Shape

Prefer one test function per scenario:

```python
def test_<observable_behavior>(...):
    context = _given_<precondition>(...)
    result = _when_<action>(context)
    _then_<observable_outcome>(result)
```

The helper names describe domain behavior, not implementation mechanics.

## Hard Rules

- Use raw pytest only.
- Never require `pytest-bdd`.
- Never create runtime `.feature` bindings or step-definition files.
- Never use `pass`, `assert True`, or placeholder failures.
- Never make RED happen through an unrelated import or collection error.
- Never weaken approved Gherkin to make implementation easier.
- Never test private implementation details when observable behavior is available.
- Never hide meaningful assertions inside opaque generic helpers.
- Follow the repository's existing test layout, fixture style, naming, markers, factories, and async conventions when compatible with this doctrine.
- Preserve one observable outcome per scenario.
- Constraint scenarios are first-class tests, not comments.
- Test authoring does not prove RED. A distinct test execution must provide actual RED evidence.

## Workflow

### 1. Read Approved Behavior

Extract only approved:

- Feature intent;
- Background;
- Scenarios;
- Scenario Outlines and Examples;
- identified constraint scenarios.

Do not invent missing behavior.

### 2. Inspect Nearby Test Conventions

Inspect the relevant existing test surface before writing:

- test directory/layout;
- naming;
- fixtures;
- factories;
- markers;
- async style;
- mocking/patching conventions;
- assertion conventions.

Repository pytest configuration remains authoritative for discovery and layout.

### 3. Map Gherkin to pytest

Follow `references/gherkin-mapping.md`.

Default mapping:

```text
Feature            → test module / behavioral grouping
Scenario           → one test function
Given / And        → _given_* helper(s)
When / And         → _when_* helper(s)
Then / And / But   → _then_* helper(s) with real assertions
Scenario Outline   → @pytest.mark.parametrize
Examples           → parameter rows
Background         → shared fixture/helper only when truly shared
Constraints        → dedicated scenario tests
```

### 4. Keep Helpers Behavioral

`_given_*` establishes scenario preconditions.

`_when_*` performs the behavior under test.

`_then_*` contains observable assertions.

Prefer explicit small helpers over one generic scenario engine.

### 5. Write Tests

Place tests according to repository structure.

When practical, create a focused test module for the new behavior rather than rewriting unrelated tests.

Do not modify production code in this skill.

### 6. Predict RED

State the concrete behavior reason the test is expected to fail.

Good:

```text
Expected RED: create_user currently accepts an already-used email instead of rejecting it.
```

Bad:

```text
Expected RED: module does not exist.
```

unless the approved behavior explicitly introduces that public module/API.

### 7. Handoff for Actual RED Evidence

Return the exact focused pytest target to run next.

The BDD pipeline executes that target separately. Do not claim RED from source generation alone.

## Output

Return:

- created or updated test files;
- scenarios represented;
- pytest target(s);
- expected RED reason for each new behavior;
- ambiguity that prevented faithful translation;
- explicit statement that RED remains unproven until the focused test target actually runs.

Do not report the behavior as implemented.
