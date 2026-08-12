# OS Syntax and Behavior Lookup

Use only after the workflow establishes a supported platform and execution-model hypothesis. This lookup describes parser categories for safe differential selection. It deliberately omits runnable commands and payloads.

| Environment hypothesis | Relevant behavior | Safe assessment focus | Common confounders | Required limit |
| --- | --- | --- | --- | --- |
| Direct process API | Input may remain one argument; shell grammar may be irrelevant | Argument validation, normalization, and fixed-value acceptance | Framework encoding, application validation | Do not test shell syntax without shell evidence |
| Unix-like shell construction | Tokenization, quoting, expansion, control operators, and redirection may change parsing | One inert syntax-boundary comparison matching the observed context | Shell variant, wrapper scripts, WAF normalization | No utilities, reads, writes, or output capture |
| Windows command interpreter construction | Quoting, percent-style expansion, control operators, and caret escaping can affect parsing | One inert syntax-boundary comparison matching command-interpreter context | Service wrappers, endpoint controls, framework encoding | No utilities, reads, writes, or output capture |
| PowerShell-like construction | Quoting, interpolation, and pipeline semantics differ from command interpreter behavior | Establish interpreter evidence before considering syntax behavior | Module policy, constrained language, host wrappers | No interpreter-specific testing without evidence |
| Unknown platform | No parser assumptions are safe | Return to inline baseline or approved blind observation | Error messages, CDN/WAF, asynchronous processing | Do not spray platform variants |

## Selection Rules

- Read [Unix behavior](../references/unix.md) or [Windows behavior](../references/windows.md) before platform-specific comparison.
- Read the matching confirmation constraints only after that behavior reference supports a shell/interpreter hypothesis.
- Treat accepted characters, blocked characters, and response errors as signals to investigate, not proof of execution.
- Never escalate to command invocation, output capture, filesystem artifacts, or data-bearing callbacks.

## Source

- PortSwigger: <https://portswigger.net/web-security/os-command-injection>
