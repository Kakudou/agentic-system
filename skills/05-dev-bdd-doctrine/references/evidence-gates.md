# Evidence Gates

The doctrine distinguishes **authored artifacts** from **observed execution evidence**.

## RED Gate

Valid RED evidence contains:

- exact test command;
- actual run result;
- failing test/scenario identity;
- failure reason showing the approved behavior is not yet satisfied.

Not RED evidence:

- generated test source;
- "this should fail";
- import/collection failure unrelated to the behavior;
- a test run from before the current test change.

## GREEN Gate

Valid GREEN evidence contains:

- exact test command;
- actual run result after implementation;
- passing identity of the previously RED behavior;
- no weakening/removal of the approved assertion.

Not GREEN evidence:

- source inspection;
- expected success;
- stale previous run;
- skipping the failing test.

## Refactor Gate

Each atomic refactor must be followed by focused GREEN evidence before another refactor begins.

If preservation fails, repair/revert that atomic refactor before proceeding. Do not stack more
changes on top of a broken preservation state.

## Quality Gate

Quality closure requires observed evidence from the repository's applicable checks.

Ginshō's closure verdict is independent of the implementer.

Missing capability or unavailable tooling is reported as unavailable evidence, never as a pass.
