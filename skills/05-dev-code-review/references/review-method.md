# Review Method

## High-Signal Checklist

Use as prompts, not a quota:

- wrong or incomplete behavior;
- invalid state transition;
- missing authorization;
- secret/data leakage;
- unsafe input handling;
- race/ordering bug;
- lost update or duplicate side effect;
- error swallowed or misclassified;
- weak retry/timeout behavior;
- resource leak;
- pathological query/algorithm;
- bad ownership boundary;
- leaky abstraction;
- duplicated domain rule;
- overengineering;
- underengineering;
- dead/unreachable logic;
- missing observability for important failure;
- fragile or missing regression tests.

## Changed Code Is Not the Whole Scope

A diff can violate a contract defined elsewhere.

Read:

- called/calling code;
- interface/port definitions;
- data models;
- error types;
- relevant tests;
- configuration;
- persistence schema;
- concurrency primitives;

only as far as needed to validate the change.

## Context Beats Generic Rules

Examples:

- duplication can be safer than an abstraction that couples unrelated domains;
- a long function is not automatically wrong;
- a dependency injection layer is not automatically architecture;
- a micro-optimization is irrelevant unless the path matters;
- a test mock is not automatically bad.

Explain the repository-specific consequence.

## Strengths

A strength should identify a concrete engineering property worth preserving, such as:

- invariant encoded at the correct boundary;
- failure path tested realistically;
- side effect made idempotent;
- abstraction removes repeated policy rather than repeated syntax.

Do not include generic compliments.
