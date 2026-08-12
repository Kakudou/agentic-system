# Windows Confirmation Constraints

## Purpose and Preconditions

Read after [Windows behavior](windows.md) supports a command-interpreter hypothesis. This resource intentionally contains no commands, execution recipes, or discovery catalog.

## Safe Confirmation Rules

- Select one syntax-boundary differential that matches the observed quoting and interpreter hypothesis.
- Never invoke system utilities, inspect users, files, services, environment variables, processes, or networking.
- Do not use redirection, file artifacts, delayed execution, or data-bearing callbacks.
- Use a unique inert marker, a nearby control, a small request budget, and a clear stop condition.

## Interpretation

Command-interpreter behavior differs from PowerShell and direct process execution. Input transformations, endpoint controls, and framework validation can produce similar symptoms. Attribute a result only after paired repetition rules out these alternatives.

## Evidence and Remediation

Capture platform evidence, context, comparison results, and false-positive controls. Recommend direct APIs with fixed argument lists, strict allowlists, least privilege, and outbound-network restrictions.

## Source

- PortSwigger: <https://portswigger.net/web-security/os-command-injection>
