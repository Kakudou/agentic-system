# Unix Confirmation Constraints

## Purpose and Preconditions

Read after the [Unix behavior](unix.md) reference supports a Unix shell hypothesis and before choosing a confirmation. It defines constraints, not command payloads or operating-system discovery steps.

## Safe Confirmation Rules

- Use a single syntax-boundary differential suited to the observed quoting or tokenization context.
- Do not invoke utilities, read files, access environment variables, enumerate processes or networking, redirect output, or create artifacts.
- Keep input short, unique, and reversible. Compare one variation against an adjacent control and stop after a reproducible parser-boundary observation.

## Interpretation

Unix shell grammar varies by shell and by invocation mode. A rejected separator or altered quote is not proof that an application is safe, and an error alone does not prove execution. Consider command construction, escaping, encoding, framework normalization, and WAF behavior.

## Evidence and Remediation

Capture the supported platform clue, context, paired observations, and controls. Recommend removal of the shell layer, fixed executable/argument invocation, strict allowlists, least-privileged service accounts, and restricted egress.

## Source

- PortSwigger: <https://portswigger.net/web-security/os-command-injection>
