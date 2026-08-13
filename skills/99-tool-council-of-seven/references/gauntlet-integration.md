# Gauntlet Integration

When the Council is used as an independent gate inside a larger iterative workflow, keep the Council independent from the builder history.

## Input Packet

The consuming workflow should provide:

- fixed goal/bar/constraints;
- actual candidate;
- criterion-level evidence;
- known failures or unverified criteria;
- reference material needed for comparison.

Do not provide builder identity, internal reasoning, attempt count, prior Council verdicts, or persuasive excuses unless needed to investigate a specific regression.

## Council Output

The Council returns its normal semantic report:

- verdict;
- confidence;
- material findings;
- dissent;
- alternatives;
- evidence limits.

The consuming workflow translates findings into its own gate states.

A Council finding is blocking for the consuming workflow only when it maps to:

- the fixed goal;
- a mandatory criterion;
- a fixed constraint;
- a necessary property of successful operation.

Other suggestions remain stretch work.

The Council does not rewrite the consuming workflow's contract.
