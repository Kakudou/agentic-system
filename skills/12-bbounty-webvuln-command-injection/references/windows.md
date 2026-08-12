# Windows Behavior

## Purpose and Preconditions

Read only after deployment documentation, error behavior, or a safe prior observation supports a Windows execution environment. Windows process APIs, `cmd`-style parsing, and PowerShell parsing have different quoting and expansion rules. Do not assume that a Windows host implies a particular interpreter.

## Behavior to Assess Safely

Determine whether input appears to be a direct process argument, part of a command-interpreter string, or rejected before execution. Metacharacters, quoting, variable expansion, and pipelines only matter when the relevant interpreter is actually involved. Test one minimal parsing hypothesis at a time and use an ordinary invalid-input control.

## Interpretation and Controls

Framework encoding, command wrappers, service configuration, endpoint protection, and WAFs can mimic or suppress parser behavior. A Windows-style error or status code is a lead only. Require repeatable paired observations and do not gather host, account, process, network, or configuration data.

## Evidence and Limits

Record the platform clue, interpreter hypothesis, input context, baseline/comparison result, and confounders. Stop once a command-construction boundary is supported or any behavior is unstable.

## Remediation Direction

Avoid interpreter invocation, use fixed executables and argument lists, allowlist bounded options, run services with least privilege, and restrict egress.

## Source

- PortSwigger: <https://portswigger.net/web-security/os-command-injection>
