# Evidence Gates

The doctrine distinguishes authored artifacts from observed execution evidence.

## RED Gate

Valid RED evidence contains:

- exact test command/target;
- actual run result;
- failing behavior identity;
- failure reason showing the accepted behavior is not yet satisfied.

Not RED:

- generated test source;
- "this should fail";
- unrelated import/collection failure;
- a stale run from before the current test change.

## GREEN Gate

Valid GREEN evidence contains:

- exact test command/target;
- actual run result after implementation;
- passing identity of the previously RED behavior;
- no weakening/removal of the accepted assertion.

Not GREEN:

- source inspection;
- expected success;
- stale previous run;
- skipping the failing test.

## Refactor Gate

Each atomic refactor must be followed by focused GREEN evidence before another refactor begins.

If preservation fails, repair or revert that refactor before proceeding.

## Quality Gate

Quality closure requires observed evidence from applicable repository checks and an independent judgment against the accepted bar.

Missing capability or unavailable tooling is reported as unavailable evidence, never as a pass.
