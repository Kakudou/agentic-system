# Gherkin Drafting

Draft Gherkin from evidence, not implementation syntax.

## Domain Translation

Before writing steps:

1. extract implementation noun clusters;
2. map them to domain vocabulary;
3. prefer vocabulary already used in tests/docs/UI;
4. use the mapping consistently.

Do not write scenarios directly from class/function/enum names when a domain term exists.

## Scenario Rules

- one observable outcome per scenario;
- `Given` expresses source-supported preconditions/context;
- `When` expresses the observable trigger/action;
- `Then` expresses observable behavior;
- no internal method calls or private state names in steps unless those are themselves the public
  domain contract.

## Constraints

Source-supported constraints may be drafted after:

```text
# ---- Constraints identified ----
```

Each constraint scenario retains evidence references in the structured result even though raw
Gherkin syntax does not carry `file:line` metadata naturally.

## Gaps

Undefined behavior remains in the gap report.

Never write the behavior you wish the code had.

## Draft Status

Every generated feature is `draft-recovered`.

It becomes an accepted behavior contract only through a later explicit approval/planning process.
