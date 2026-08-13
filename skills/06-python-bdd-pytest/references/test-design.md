# Test Design Rules

## Behavior Over Implementation

A behavior test should survive an internal refactor that preserves the same public contract.

Prefer public functions, services, routes, CLI commands, or event surfaces over private helpers and incidental internal data shapes.

## One Observable Outcome

A scenario has one dominant observable outcome. Several assertions are valid when they jointly prove that outcome.

## Helpers Are Not a Mini Framework

Avoid opaque helpers such as `run_scenario(...)` or `assert_expected_behavior(...)`.

Prefer domain helpers such as `_given_funded_account`, `_when_transfer_is_requested`, and `_then_transfer_is_rejected`.

## Assertions

Use real assertions with useful failures. Use the repository's established pytest idioms such as `pytest.raises` for exception behavior when appropriate.

## Test Names

Name the behavior, not the implementation branch.

Prefer `test_rejects_duplicate_email` over `test_create_user_branch_2`.

## RED Quality

The first meaningful run should fail because approved behavior is absent or incorrect.

Syntax, fixture, import, and collection failures are test-harness failures, not behavioral RED. Fix the harness until the test reaches the intended behavioral failure.

## Existing Tests

Do not rewrite unrelated tests merely to impose this style.

## Test Data

Use explicit behavior-relevant values. Factories may provide irrelevant defaults, but scenario-critical values remain visible in the test.
