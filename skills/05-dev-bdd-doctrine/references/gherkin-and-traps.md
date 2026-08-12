# Gherkin and Trap Rules

## Gherkin

Use:

- `Feature`
- `Background` only for genuinely shared setup
- `Scenario`
- `Scenario Outline`
- `Examples`
- `Given / When / Then / And / But`

Rules:

- one feature boundary per feature specification;
- one observable outcome per scenario;
- business/domain language, not implementation language;
- `Then` describes an observable result;
- parameterized repetition becomes `Scenario Outline`;
- shared setup used by at least two scenarios may become `Background`.

When an accepted requirements contract exists, scenarios derive from it rather than expanding scope.

## Scenario Approval

Present behavior through Ōshō for explicit approval.

Rejected scenarios remain visible as rejected work with rationale; do not silently delete them from
the planning record.

Do not advance meaningful behavior work to trap analysis until the intended behavior is accepted.

## Seven Trap Families

Every standard/high-risk behavior change interrogates all seven.

| Trap | Question |
|---|---|
| `invalid_input` | What is missing, malformed, wrong-type, or unsupported? |
| `boundary` | What happens at empty/min/max/singleton/limit conditions? |
| `security` | What unauthorized use, privilege misuse, leakage, or abuse is possible? |
| `concurrency` | What races, duplicate actions, or ordering conflicts exist? |
| `performance` | What slow-path, volume, timeout, or resource-saturation behavior matters? |
| `implicit_rule` | What unstated business rule is being assumed? |
| `data_validation` | What format, uniqueness, cross-field, or referential constraints exist? |

Marking one `N/A` requires a concrete reason.

## Trap Promotion

Order traps by severity.

A trap becomes a required constraint only when accepted.

Accepted critical/major traps must be represented in the behavior contract before RED so tests can
encode them.

Two accepted traps is a useful minimum for a normal non-trivial behavior change; three or more is
preferred when the surface warrants it. Do not invent weak traps merely to hit a count.
