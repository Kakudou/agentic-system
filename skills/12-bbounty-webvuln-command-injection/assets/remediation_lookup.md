# Command Injection Remediation Lookup

| Observed construction risk | Primary remediation | Defense in depth | Verification question |
| --- | --- | --- | --- |
| User value concatenated into a shell command | Remove the shell; invoke a fixed executable through a direct process API with a fixed argument vector | Least-privileged service account; restrictive working directory | Can untrusted input reach a command interpreter string? |
| User selects an operation or option | Map a small fixed allowlist to server-controlled operations and arguments | Type, length, and canonical-form validation | Is every accepted value mapped rather than concatenated? |
| Existing wrapper requires shell behavior | Redesign the wrapper interface to accept structured fields; isolate the wrapper if migration is staged | Sandbox/container restrictions and audit logging | Are separators, expansions, and redirections irrelevant to input? |
| External utility must remain | Pin executable path and fixed arguments; pass data through supported APIs or files owned by the application, not command text | Timeouts, resource limits, least privilege | Does the utility receive data as an argument value rather than code? |
| Blind/OAST confirmation indicates worker egress | Remove command construction first | Deny unnecessary outbound network and DNS, segment workers | Can the worker initiate only required destinations? |

Escaping and blacklists are not durable primary controls because behavior depends on the interpreter, platform, encoding, and context. Regression tests should cover rejected control syntax, valid allowlisted values, and direct API invocation without a shell.

## Source

- PortSwigger prevention: <https://portswigger.net/web-security/os-command-injection#how-to-prevent-os-command-injection-vulnerabilities>
